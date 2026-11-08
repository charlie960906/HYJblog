---
title: HTML5 WEB APP程式設計第六周心得
date: "2026-11-08"
description: "使用 DataTables 讀取 Google 試算表，完成可搜尋、排序與分頁的最新消息列表。"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## 作業：使用 DataTables 製作最新消息列表

網站：[精選商品列表與最新消息（讀取 Google 試算表）](https://onlineshopwithapi.netlify.app/)

延續上週讀取 Google 試算表的作法  
將「最新消息」工作表的資料改用 DataTables 呈現  

資料來源是課程指定的[Google 試算表](https://docs.google.com/spreadsheets/d/1GOosTuqGX2kcSTHGDELpyzWyNldirx5spKvO5BNTmwE/edit?usp=sharing)  
網頁透過 Google Visualization API 讀取資料，再把資料轉換成表格列

## DataTables CDN

直接使用 CDN 載入 DataTables 的 CSS 和 JavaScript：  

```html
<link
  href="https://cdn.datatables.net/2.3.4/css/dataTables.dataTables.min.css"
  rel="stylesheet"
>
<script src="https://cdn.datatables.net/2.3.4/js/dataTables.min.js"></script>
```

使用 CDN 設定簡單；DataTables 載入後  
就能對既有的 HTML `<table>` 加上分頁、排序和搜尋  

參考連結：
[DataTables - Installation](https://datatables.net/manual/installation)

## Google 試算表資料

程式使用試算表 ID 和「最新消息」工作表名稱建立 GViz 查詢網址：

```JavaScript
var SHEET_ID = "1GOosTuqGX2kcSTHGDELpyzWyNldirx5spKvO5BNTmwE";
var SHEET_NAME_NEWS = "最新消息";

var baseUrl =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?sheet=" +
  encodeURIComponent(SHEET_NAME_NEWS);
```

每筆消息會整理成 `id`、`title`、`date`、`content`、`link` 和 `img` 等欄位  
再由 JavaScript 動態產生 `<tr>` 和 `<td>`  
這樣修改 Google 試算表後，重新整理網站就能顯示新的公告

參考連結：
[Google Visualization API - Query Language](https://developers.google.com/chart/interactive/docs/querylanguage)

## 初始化 DataTable

資料列產生完成後，使用 `new DataTable()` 將 `#newsTable` 轉成互動式表格：

```JavaScript
newsDataTable = new DataTable("#newsTable", {
  pageLength: 5,
  lengthMenu: [5, 10, 25, 50],
  order: [[1, "desc"]],
  columnDefs: [
    { orderable: false, targets: [2, 5] }
  ]
});
```

`pageLength` 設定每頁顯示 5 筆資料  
`lengthMenu` 讓使用者選擇每頁筆數  
`order` 讓公告日期預設由新到舊排列  
縮圖和操作按鈕不是適合排序的資料  
因此使用 `columnDefs` 停用這兩欄的排序

參考連結：
[DataTables - Reference](https://datatables.net/reference/)

## 搜尋與分頁

DataTables 會自動產生搜尋輸入框、分頁按鈕、資料筆數選擇器和目前頁數資訊  
網站另外保留自訂搜尋欄，將輸入文字交給 DataTables：

```JavaScript
function filterNewsTable() {
  var query = document.getElementById("newsSearchInput").value.trim();
  newsDataTable.search(query).draw();
}
```

`search()` 會設定搜尋關鍵字，`draw()` 會重新繪製表格  
不需要自己重新建立所有資料列

## 資料載入與備援

網站先使用 Google Visualization API 讀取資料  
如果 API 查詢失敗，再用 `fetch()` 讀取 GViz JSON  
若網路或試算表暫時無法連線，就使用預設的最新消息資料  
並保留 loading 和錯誤提示，避免頁面只顯示空白表格

每次重新產生表格前，程式會先呼叫 DataTables 的 `destroy()`，避免同一個 HTML table 被重複初始化：

```JavaScript
if (newsDataTable) {
  newsDataTable.destroy();
  newsDataTable = null;
}
```

參考連結：
[MDN - Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)
