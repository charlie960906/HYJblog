---
title: HTML5 WEB APP程式設計第三周心得
date: "2026-10-09"
description: "使用陣列、迴圈、篩選、搜尋與排序，完成 GOMAJI 優惠卡片仿作。"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## 陣列與 forEach
把每張優惠券的名稱、類別、價格和圖片放在同一個陣列中，之後用 `forEach` 逐筆產生 12 張卡片。  
未來要新增優惠券，只要增加一筆資料，不需要重複撰寫 HTML。  

參考連結：
[W3Schools - JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)  
[W3Schools - JavaScript forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp)

## includes 搜尋與 filter 篩選
搜尋框的 `input` 事件會在輸入文字時執行 `renderProducts()`。  
程式使用 `includes()` 比對優惠券名稱和描述，再使用 `filter()` 保留符合條件的資料。

參考連結：
[W3Schools - JavaScript String includes()](https://www.w3schools.com/jsref/jsref_includes.asp)
[W3Schools - JavaScript Array filter()](https://www.w3schools.com/jsref/jsref_filter.asp)

## sort 排序
排序按鈕會複製一份目前的資料，再使用 `sort()` 依價格由低到高或由高到低排列。  
數字排序提供比較函式，例如 `a.price - b.price`，否則 JavaScript 可能會按照字串順序排序。

參考連結：
[W3Schools - JavaScript Array sort()](https://www.w3schools.com/jsref/jsref_sort.asp)
[本週課程：Vibe Coding 範例](https://sites.google.com/email.nchu.edu.tw/ai4us/vibe-coding#h.e08957bc3d1z)

## RWD 響應式網頁設計
RWD(Responsive Web Design，響應式網頁設計)  
讓同一個網頁可以適應電腦、平板和手機的螢幕大小。

參考連結：
[W3Schools - Responsive Web Design](https://www.w3schools.com/css/css_rwd_intro.asp)
[W3Schools - CSS Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)


## 製作有卡片是瀏覽的網站

### CSS 動畫與使用者體驗優化

使用 CSS 的 `@media` 媒體查詢調整版面：
- 電腦版使用自動換行的 Grid 卡片排版。
- 螢幕寬度小於 700px 時，卡片改成兩欄，縮小圖片、文字和按鈕。
- 螢幕寬度小於 430px 時，卡片改成一欄，方便手機閱讀。
- 使用 `viewport` 設定，讓手機不要用錯誤的縮放比例顯示頁面。


增加 CSS 動畫，讓畫面操作更自然：
- `@keyframes` 讓標題和卡片載入時淡入並往上移動。
- `transition` 讓滑鼠移到卡片時平順地浮起，圖片也會稍微放大。
- `box-shadow` 加強卡片浮起時的層次。
- `prefers-reduced-motion` 尊重使用者的系統設定；如果使用者減少動畫，動畫會縮短到幾乎看不到。

參考連結：
[W3Schools - CSS Animations](https://www.w3schools.com/css/css3_animations.asp)
[W3Schools - CSS Transitions](https://www.w3schools.com/css/css3_transitions.asp)

### 完成的功能
1. 用陣列保存優惠券資料。
2. 用 `forEach` 動態產生優惠卡片。
3. 用分類按鈕篩選美食、旅遊住宿、美容舒壓、健康商城、休閒娛樂和購物優惠。
4. 用搜尋框搜尋優惠券名稱或描述。
5. 用按鈕進行價格升序、降序和回復原始順序。
6. 點擊「查看優惠」後，在頁面下方顯示選到的優惠券名稱。

完整可執行檔案：[gomaji-clone.html](/gomaji-clone.html)

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>好麻吉優惠｜課堂練習</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; color: #333; }
    header { padding: 28px 20px; background: linear-gradient(135deg, #e94737, #f47b4d); color: white; text-align: center; }
    header h1 { margin: 0 0 8px; animation: fadeDown 0.7s ease both; }
    header p { animation: fadeUp 0.7s 0.15s ease both; }
    .tools { max-width: 1000px; margin: 20px auto; padding: 0 20px; }
    input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 16px; }
    button { margin: 8px 4px 0 0; padding: 9px 14px; border: 0; border-radius: 5px; background: white; cursor: pointer; }
    button:hover, button.active { background: #e94737; color: white; }
    .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; max-width: 1000px; margin: auto; padding: 0 20px 30px; }
    .card { overflow: hidden; background: white; border-radius: 8px; box-shadow: 0 2px 8px #0002; animation: cardAppear 0.55s ease both; transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card:hover { transform: translateY(-7px); box-shadow: 0 9px 20px #0003; }
    .card img { width: 100%; height: 130px; object-fit: cover; transition: transform 0.4s ease; }
    .card:hover img { transform: scale(1.06); }
    .card-content { padding: 14px; }
    .card h2 { margin: 0 0 8px; font-size: 19px; }
    .card p { min-height: 42px; color: #666; }
    .price { color: #e94737; font-size: 21px; font-weight: bold; }
    #message { max-width: 1000px; margin: 0 auto 30px; padding: 0 20px; color: #e94737; font-weight: bold; }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes cardAppear { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 700px) {
      header { padding: 22px 16px; }
      header h1 { font-size: 28px; }
      .tools { margin: 14px auto; padding: 0 12px; }
      .tools button { margin-top: 7px; padding: 8px 10px; font-size: 14px; }
      .products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 0 12px 24px; }
      .card img { height: 105px; }
      .card-content { padding: 11px; }
      .card h2 { font-size: 16px; }
      .card p { min-height: 54px; font-size: 14px; }
      .price { font-size: 18px; }
    }
    @media (max-width: 430px) {
      .products { grid-template-columns: 1fr; }
      .card img { height: 160px; }
      .card p { min-height: auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
</head>
<body>
  <header>
    <h1>好麻吉優惠</h1>
    <p>HTML 課堂練習：找到今天適合自己的優惠</p>
  </header>

  <section class="tools">
    <input id="search" type="search" placeholder="搜尋優惠名稱或內容">
    <button class="category active" data-category="全部">全部</button>
    <button class="category" data-category="美食">美食餐廳</button>
    <button class="category" data-category="美容舒壓">美容舒壓</button>
    <button class="category" data-category="旅遊住宿">旅遊住宿</button>
    <button class="category" data-category="健康商城">健康商城</button>
    <button class="category" data-category="休閒娛樂">休閒娛樂</button>
    <button class="category" data-category="購物優惠">購物優惠</button>
    <button id="lowToHigh">價格低到高</button>
    <button id="highToLow">價格高到低</button>
    <button id="original">原始順序</button>
  </section>

  <main id="products" class="products"></main>
  <p id="message">請選擇一個優惠。</p>

  <script>
    const products = [
      { name: "秋季橄欖油特賣", category: "健康商城", price: 399, description: "食安時代的日常健康好物", image: "https://picdn.gomaji.com/uploads/banner/23/540/57540.png" },
      { name: "假期未完待續", category: "旅遊住宿", price: 899, description: "安排下一趟旅行的限時優惠", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/610/57610.jpg" },
      { name: "秋饗美食優惠", category: "美食", price: 250, description: "餐廳美食最高現折優惠", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/563/57563.jpg" },
      { name: "健康 Chill 起來", category: "健康商城", price: 599, description: "保養用品與健康商品優惠", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/583/57583.jpg" },
      { name: "2026 國旅補助", category: "旅遊住宿", price: 1280, description: "國內旅遊住宿優惠活動", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/511/57511.jpg" },
      { name: "臺灣美食行動 GO", category: "美食", price: 299, description: "吃遍臺灣美食還能抽折價券", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/439/57439.jpg" },
      { name: "Q10 熱門保養", category: "美容舒壓", price: 699, description: "熱門保養商品限時優惠", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/561/57561.png" },
      { name: "GOMAJI 防詐提醒", category: "購物優惠", price: 0, description: "購物前先認識安全消費觀念", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/811/54811.jpg" },
      { name: "回鍋消費享回饋", category: "購物優惠", price: 100, description: "核銷登記享每月回饋", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/825/56825.jpg" },
      { name: "美容週年慶", category: "美容舒壓", price: 799, description: "舒壓與保養一起享優惠", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/529/57529.jpg" },
      { name: "橄欖油加碼折扣", category: "健康商城", price: 499, description: "健康商城商品折上再折", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/537/57537.jpg" },
      { name: "熱門商品排行榜", category: "休閒娛樂", price: 349, description: "看看大家最近喜歡的商品", image: "https://picdn.gomaji.com/uploads/banner/1621440000/o/11/603/57603.jpg" }
    ];

    const productArea = document.getElementById("products");
    const search = document.getElementById("search");
    const message = document.getElementById("message");
    let selectedCategory = "全部";
    let currentProducts = [...products];

    function renderProducts() {
      const keyword = search.value.trim().toLowerCase();
      const result = currentProducts.filter(function (product) {
        const sameCategory = selectedCategory === "全部" || product.category === selectedCategory;
        const hasKeyword = product.name.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword);
        return sameCategory && hasKeyword;
      });

      productArea.innerHTML = "";
      result.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="card-content">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">NT$ ${product.price}</span>
            <br><button class="choose">查看優惠</button>
          </div>`;
        card.querySelector(".choose").addEventListener("click", function () {
          message.textContent = "你選擇了：「" + product.name + "」";
        });
        productArea.appendChild(card);
      });
      if (result.length === 0) message.textContent = "找不到符合條件的優惠。";
    }

    document.querySelectorAll(".category").forEach(function (button) {
      button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;
        document.querySelectorAll(".category").forEach(function (item) { item.classList.remove("active"); });
        button.classList.add("active");
        renderProducts();
      });
    });

    search.addEventListener("input", renderProducts);
    document.getElementById("lowToHigh").addEventListener("click", function () {
      currentProducts.sort(function (a, b) { return a.price - b.price; });
      renderProducts();
    });
    document.getElementById("highToLow").addEventListener("click", function () {
      currentProducts.sort(function (a, b) { return b.price - a.price; });
      renderProducts();
    });
    document.getElementById("original").addEventListener("click", function () {
      currentProducts = [...products];
      renderProducts();
    });

    renderProducts();
  </script>
</body>
</html>
```