---
title: HTML5 WEB APP程式設計第五周心得
date: "2026-10-21"
description: "使用 Google Visualization API 串接 Google 試算表，完成商品列表與詳細介紹頁。"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## 作業：使用 Google 試算表 API 製作商品網站

網站：[精選商品資訊平台](https://onlineshopwithapi.netlify.app/)

這次的作業是把商品資料放在[Google 試算表](https://docs.google.com/spreadsheets/d/1Cw2FuugvCqCOss6yV-76Cy2o7NkgWOVJaDeLGHqcTK0/edit?usp=sharing)  
再使用 Google Visualization API 讀取資料，製作商品列表頁與商品詳細介紹頁  
和前幾次直接把資料寫在 JavaScript 陣列裡相比  
只要修改試算表內容，重新整理網頁就能取得最新資料，不需要再次修改HTML

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

試算表欄位如下：

| 欄位 | 用途 |
| --- | --- |
| id | 商品編號，例如 P001 |
| name | 商品名稱 |
| desc | 商品說明 |
| price | 商品價格 |
| img | 商品圖片網址 |

`encodeURIComponent()` 可以把工作表名稱轉換成適合放在網址中的格式  
避免中文或特殊字元造成查詢錯誤  

參考連結：
[MDN - encodeURIComponent()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## Google Visualization API

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

如果 Visualization API 查詢失敗，程式會改用 `fetch()` 讀取 GViz JSON  
直接讀取時，回傳內容可能包在其他文字裡，要先找出 JSON 的範圍，再使用 `JSON.parse()` 解析

參考連結：
[Google Visualization API - Query Language](https://developers.google.com/chart/interactive/docs/querylanguage)

## 非同步讀取與錯誤處理

讀取試算表需要等待網路回應，因此畫面先顯示 loading 狀態  
資料成功解析後才產生商品卡片  
如果連線失敗，則在畫面顯示錯誤提示或使用預設資料  
讓使用者知道目前的狀態，而不是看到空白頁面

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

參考連結：
[MDN - Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)

## 動態產生商品卡片

API 回傳的每一列資料會先整理成商品物件，再使用迴圈產生卡片  
每張卡片包含圖片、商品編號、名稱、說明、價格和詳細頁連結  

```JavaScript
href = "detail.html?id=" + encodeURIComponent(p.id);
```

詳細頁使用 `URLSearchParams` 取得網址中的商品編號：

```JavaScript
var productId = new URLSearchParams(window.location.search).get("id");
```

同一個 `detail.html` 就能依照不同的 `id` 顯示不同商品  
不需要為每件商品建立一個新的 HTML 檔案

參考連結：
[MDN - URLSearchParams](https://developer.mozilla.org/zh-TW/docs/Web/API/URLSearchParams)

## 搜尋、價格與圖片處理

搜尋框的 `input` 事件會執行搜尋函式  
使用 `filter()` 比對商品編號、名稱和說明  
只保留符合關鍵字的資料價格資料先移除逗號等非數字字元  
再使用 `toLocaleString()` 顯示千分位  
圖片載入失敗時則改用預設圖片  
避免畫面出現破圖

商品文字會被放進 `innerHTML`，所以程式使用 `escapeHtml()` 處理特殊字元  
避免試算表內容直接被當成 HTML 或腳本執行
