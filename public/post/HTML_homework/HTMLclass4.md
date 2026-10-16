---
title: HTML5 WEB APP程式設計第四周心得
date: "2026-10-15"
description: "google studio網站"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## 作業：使用Google AI Studio 做網站
作品：[上市公司介紹網站](https://introductioncompanies.netlify.app/)
介紹台灣與全球上市公司的網站
首頁顯示公司卡片，詳細頁介紹更多該公司的資料

### 陣列與物件
每一家公司都是一個物件，所有公司物件放在 `COMPANIES` 陣列中  
物件可以同時保存公司名稱、股票代碼、產業、簡介和產品清單等資料  
這樣新增公司時只要增加一個物件，不需要重新複製整張 HTML 卡片  

```JavaScript
const COMPANIES = [
  {
    id: 'tsmc',
    name: '台灣積體電路製造股份有限公司',
    ticker: '2330',
    market: 'Taiwan',
    flagshipProducts: ['先進製程', '先進封裝']
  }
];
```

### 迴圈產生卡片
`map()` 會逐一處理 `COMPANIES` 裡的資料  
`renderCard()` 再把每家公司轉成一段卡片 HTML  
使用 `join('')` 合併成完整內容，放進 `companyGrid`  
這樣畫面上的卡片和資料內容可以保持一致

```JavaScript
companyGrid.innerHTML = filtered.map(renderCard).join('');
```

### 搜尋與篩選
#### 搜尋
輸入框綁定 `input` 事件  
使用者每輸入一個字  
就會更新 `currentSearch`    
然後再呼叫 `filterAndRender()`  
程式使用 `includes()` 比對公司中文名稱、英文名稱、股票代碼、產業和產品  
只保留符合關鍵字的公司

#### 篩選
按造市場和產業按鈕篩選   
`filter()` 會依照 `matchesSearch`、`matchesSector` 和 `matchesMarket` 三個條件來判斷

```JavaScript
const filtered = COMPANIES.filter(company => {
  const matchesSearch =
    !query || company.name.toLowerCase().includes(query);
  const matchesMarket =
    currentMarket === 'All' || company.market === currentMarket;

  return matchesSearch && matchesMarket;
});
```

### 按鈕
市場按鈕和產業按鈕使用 `addEventListener('click', ...)` 監聽點擊事件  
點擊後會修改目前的篩選狀態  
再重新執行篩選和畫面渲染  
清除搜尋和重設按鈕也使用同樣的方式來判斷

### 詳細介紹頁
詳細頁使用 `URLSearchParams` 讀取 `id`  
再從 `COMPANIES_DATA` 找出對應的公司資料  

### `URLSearchParams`
詳細頁使用 `URLSearchParams` 讀取網址的查詢參數 `?id=tsmc`  
再依照公司編號顯示對應資料  
同一個 `company.html` 可以共用給不同公司  
這樣就不需要建立很多份相同的 HTML 

參考連結：  
[MDN - URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)  
[W3Schools - JavaScript URL](https://www.w3schools.com/js/js_api_url.asp)

### 箭頭函式與模板字串
`company => ...` 是箭頭函式  
可以簡化只有一個參數的函式寫法
程式中的反引號是模板字串  
可以使用 `${}` 把公司名稱、產品和其他資料放入 HTML 字串中  

參考連結：  
[W3Schools - JavaScript Arrow Function](https://www.w3schools.com/js/js_arrow_function.asp)  
[W3Schools - JavaScript Template Strings](https://www.w3schools.com/js/js_string_templates.asp)

### `some()`
搜尋公司時，`some()` 會檢查產品陣列  
只要其中一個產品名稱符合搜尋文字  
就會回傳 `true`  
這樣就能搜尋公司名稱以外的產品資料

參考連結：  
[W3Schools - JavaScript Array some()](https://www.w3schools.com/jsref/jsref_some.asp)

### `classList`
`classList` 可以新增、移除或切換 HTML 元素的 class 用來切換按鈕的顯示樣式

參考連結：  
[W3Schools - JavaScript classList](https://www.w3schools.com/jsref/prop_element_classlist.asp)  
[MDN - HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)



