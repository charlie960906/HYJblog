---
title: HTML5 WEB APP程式設計第五周心得
date: "2026-10-21"
description: "使用 Google Visualization API 串接 Google 試算表，完成可搜尋的商品列表與詳細介紹頁。"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## 作業：使用 Google 試算表 API 製作商品網站

作品：[精選商品資訊平台](https://onlineshopwithapi.netlify.app/)

這次的作業是把商品資料放在 [Google 試算表](https://docs.google.com/spreadsheets/d/1Cw2FuugvCqCOss6yV-76Cy2o7NkgWOVJaDeLGHqcTK0/edit?usp=sharing)，再透過 Google Visualization API 讀取資料，製作商品列表頁和商品詳細介紹頁。試算表目前有商品編號、名稱、說明、價格和圖片網址等欄位，共 12 筆商品資料。

和前幾次把資料直接寫在 JavaScript 陣列裡相比，這次只要修改試算表內容，網頁重新整理後就能取得最新資料，不需要再次修改 HTML。

## Google 試算表資料格式

程式使用試算表 ID 和工作表名稱組合出查詢網址：

```JavaScript
var SHEET_ID = "1Cw2FuugvCqCOss6yV-76Cy2o7NkgWOVJaDeLGHqcTK0";
var SHEET_NAME = "工作表1";

var baseUrl =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID + "/gviz/tq?sheet=" +
  encodeURIComponent(SHEET_NAME);
```

資料欄位的順序固定為：

| 欄位 | 用途 |
| --- | --- |
| id | 商品編號，例如 P001 |
| name | 商品名稱 |
| desc | 商品說明 |
| price | 商品價格 |
| img | 商品圖片網址 |

`encodeURIComponent()` 可以把工作表名稱轉換成適合放在網址中的格式，避免中文或特殊字元造成查詢錯誤。

## Google Visualization API 與備援讀取

網站優先使用 `google.visualization.Query` 查詢試算表：

```JavaScript
var query = new google.visualization.Query(baseUrl);
query.setQuery("select *");
query.send(function(response) {
  if (response && !response.isError()) {
    parseDataTable(response.getDataTable());
  } else {
    fetchViaDirectApi(baseUrl + "&tqx=out:json");
  }
});
```

如果 Visualization API 查詢失敗，程式會改用 `fetch()` 讀取 GViz JSON 格式。這樣即使 CDN 載入較慢或查詢方式受到瀏覽器限制，仍然有另一種方式可以取得資料。

直接讀取時，回傳內容不是純 JSON，而是包在其他文字裡，所以程式先找出第一個 `{` 和最後一個 `}`，再使用 `JSON.parse()` 解析：

```JavaScript
var startIdx = text.indexOf("{");
var endIdx = text.lastIndexOf("}") + 1;
var json = JSON.parse(text.substring(startIdx, endIdx));
```

這讓我了解 API 回傳資料時，除了要會呼叫 API，也要先確認實際的回傳格式，才能正確取出資料。

## 非同步程式與載入狀態

讀取試算表需要等待網路回應，因此不能假設資料會立即出現。網頁一開始會顯示 loading spinner，等資料解析完成後，再呼叫 `renderFilteredCards()` 產生商品卡片：

```JavaScript
fetch(url)
  .then(function(response) {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.text();
  })
  .then(function(text) {
    // 解析資料並產生商品卡片
  })
  .catch(function(error) {
    console.error("連線至 Google 試算表失敗：", error);
    showError("無法讀取 Google 試算表資料，請稍後再試。");
  });
```

成功時會隱藏載入畫面，失敗時則顯示明確的錯誤訊息。這比畫面一直停在空白狀態更容易讓使用者知道目前發生什麼事。

## 動態產生商品卡片

API 回傳的每一列資料會先整理成商品物件，再使用迴圈產生卡片 HTML。每張卡片包含圖片、商品編號、名稱、說明、價格和詳細頁連結。

詳細頁的網址會把商品編號放在查詢參數中：

```JavaScript
href = "detail.html?id=" + encodeURIComponent(p.id);
```

商品編號不是寫死在詳細頁，而是由 `URLSearchParams` 讀取：

```JavaScript
var productId = new URLSearchParams(window.location.search).get("id");
```

因此同一個 `detail.html` 就能顯示 P001、P002 或其他商品，不需要為每件商品建立一個新的 HTML 檔案。

## 搜尋功能與資料過濾

搜尋框會在 `input` 事件發生時執行 `handleSearch()`。程式將輸入文字轉成小寫並去除前後空白，再使用 `filter()` 比對商品編號、名稱和說明：

```JavaScript
var filtered = allProducts.filter(function(p) {
  return (
    p.id.toLowerCase().indexOf(query) !== -1 ||
    p.name.toLowerCase().indexOf(query) !== -1 ||
    p.desc.toLowerCase().indexOf(query) !== -1
  );
});
```

這次我練習到，搜尋功能不一定要重新呼叫 API，只要先把資料存放在 `allProducts`，之後的搜尋就能直接在前端完成，反應速度會比較快，也可以減少不必要的網路請求。

## 圖片、價格與安全處理

價格資料從試算表讀出來時可能包含逗號或其他文字，因此先移除非數字字元，再使用 `toLocaleString()` 顯示千分位。圖片載入失敗時，會改用預設圖片，避免卡片出現破圖。

商品名稱和說明會被放進 `innerHTML`，所以程式另外使用 `escapeHtml()` 將 `&`、`<`、`>`、引號等特殊字元轉義，降低外部資料被當成 HTML 執行的風險。這也讓我注意到，來自試算表的資料仍然應該視為外部輸入，不能直接信任。

## 這次的心得

這次作業最有挑戰的地方是第一次把外部資料來源接到自己的網站。剛開始只要試算表欄位順序或公開權限不正確，畫面就可能沒有資料，因此我需要同時檢查 API 網址、工作表名稱、資料格式和瀏覽器主控台錯誤。

完成後我了解到前端網站不只是在 HTML 中排版，也可以透過 API 取得即時資料，並配合非同步處理、載入畫面、錯誤提示和備援方案，讓網站在不同情況下都能維持可用。這次也把之前學過的陣列、迴圈、篩選和 DOM 操作整合在一起，最後再部署到 Netlify，完成一個可以實際使用的商品網站。

## 參考資料

[Google Visualization API - Query Language](https://developers.google.com/chart/interactive/docs/querylanguage)  
[MDN - Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)  
[MDN - URLSearchParams](https://developer.mozilla.org/zh-TW/docs/Web/API/URLSearchParams)  
[MDN - encodeURIComponent()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
