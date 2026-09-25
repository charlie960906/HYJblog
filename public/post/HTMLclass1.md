---
title: HTML5 WEB APP程式設計第一周心得
date: "2026-09-17"
description: "前端後端比較、按鈕切換圖片及超連結實作"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
---

## 前端後端比較

| 比較項目 | 前端 | 後端 |
| -------- | -------- | -------- |
|   面向   |  用戶端：打造介面與視覺體驗    |   伺服器端：處理邏輯與資料庫儲存  |
|   主要功能   |   畫面佈局、動態效果、表單驗證、使用者體驗(UX) |  API 開發、資料庫操作、身份驗證、系統效能與安全  |
|   常用程式語言   |   HTML, CSS, JavaScript  |   Node.js, Python, Java, Go, C#, PHP 等  |
|   常用框架/工具   |  React, Vue.js, Angular, Tailwind CSS  |   Express, Django, FastAPI, ASP.NET  |
|   關注焦點  |   介面美觀、響應式設計(RWD)、流暢度  |  資料正確性、高併發處理、安全性、架構擴充性   |

> 高併發處理:能夠同時處理大量請求的能力


## 作業

### 課後學習內容

```html
<html lang="zh-Hant">
```
設定這行的用意:
  1. 搜尋引擎優化(SEO)：告訴搜尋引擎這個網頁是給看「繁體中文」的使用者看的，有助於精準投放搜尋結果。
  2. 無障礙螢幕閱讀器(Screen Readers)：幫助視障人士使用的朗讀軟體切換成正確的「繁體中文發音與語調」來讀出網頁內容。
  3. 瀏覽器自動翻譯：瀏覽器（如 Chrome）會依據這個設定判斷是否需要跳出「翻譯網頁」的提示。
  4. 字體渲染：幫助瀏覽器選擇正確的繁體中文字型顯示，避免出現簡繁混用或部分文字字型不齊的問題。

參考連結:
[W3Schools - att_lang](https://www.w3schools.com/tags/att_lang.asp)
[html lang="zh-Hant" 解釋](https://www.google.com/search?q=%3Chtml%20lang=%22zh-Hant%22%3E%20%E8%A7%A3%E9%87%8B)

---

```html
    <a id="photoLink" href="https://hyjblog.hyjdevelop.com" target="_blank">
        <img id="photo" src="https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp" alt="f1圖片" width="500" height="300">
    </a>
```
這個是使用超連結把圖片包起來，實現點選圖片可以跳轉連結的功能

參考連結:
[在圖片上再加上超連結方法](https://www.google.com/search?q=如何在圖片上再加上超連結html)
[W3Schools - html_links](https://www.w3schools.com/html/html_links.asp)
[W3Schools - html_images](https://www.w3schools.com/html/html_images.asp)

---

程式碼2中的
```JavaScript
 const imageData = {
            1: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得'
            },
            2: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic2.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得'
            },
            3: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic3.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得'
            }
        };
```
是物件屬性與巢狀物件(JavaScript Object Properties)  
這樣子寫可以避免重複寫函式  
在添加第4第5個的時候可以直接加上去  
不用在寫函式

參考連結:
[W3Schools - JS Object Properties](https://www.w3schools.com/js/js_object_properties.asp)
[W3Schools - JS const](https://www.w3schools.com/jsref/jsref_const.asp)

---

程式碼2中的函式
```JavaScript
        function changeImage(imageNumber) {
            const currentData = imageData[imageNumber] || imageData[1];
            photo.src = currentData.imgSrc;
            photoLink.href = currentData.linkUrl;
        }
```
這裡使用了中括號存取、OR 邏輯運算子以及 DOM 屬性修改  

- OR 運算子:可以防止程式因為找不到資料而報錯崩潰  

- photo.src = currentData.imgSrc
修改圖片來源：photo 是前面取得的 < img > 元素。這行把圖片的位置，換成從 currentData 物件裡拿到的 imgSrc 網址。

- photoLink.href = currentData.linkUrl
修改超連結網址：photoLink 是外層包住圖片的 < a > 標籤。這行把超連結的網址，換成 currentData 裡的 linkUrl 網址。

相關連結:
[W3Schools - JS Object Properties](https://www.w3schools.com/js/js_object_properties.asp)
[W3Schools - JS Comparison and Logical Operators](https://www.w3schools.com/js/js_comparisons.asp)

---

### 程式碼1(根據上課內容完成)

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>HTML5 第一周作業</title>
</head>
<body>

    <!-- 畫面呈現：圖片包在超連結裡面 -->
    <a id="photoLink" href="https://hyjblog.hyjdevelop.com" target="_blank">
        <img id="photo" src="https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp" alt="f1圖片" width="500" height="300">
    </a>

    <br><br>

    <!-- 按鈕 -->
    <button onclick="changeToPic1()">圖片 1</button>
    <button onclick="changeToPic2()">圖片 2</button>
    <button onclick="changeToPic3()">圖片 3</button>

    <!-- 控制函數，按鈕的各自切換功能 -->
    <script>
        function changeToPic1() {
            document.getElementById('photo').src = 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp';
            document.getElementById('photoLink').href = 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得';
        }

        function changeToPic2() {
            document.getElementById('photo').src = 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic2.webp';
            document.getElementById('photoLink').href = 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得';
        }

        function changeToPic3() {
            document.getElementById('photo').src = 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic3.webp';
            document.getElementById('photoLink').href = 'https://hyjblog.hyjdevelop.com/folder/HTML5課程心得';
        }
    </script>

</body>
</html>
```

---

### 程式碼2(詢問AI更好的做法)

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>第一堂課作業</title>
</head>
<body>

    <a id="photoLink" href="https://hyjblog.hyjdevelop.com" target="_blank">
        <img id="photo" src="https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp" alt="f1圖片" width="500" height="300">
    </a>

    <br><br>
    <button onclick="changeImage(1)">圖片 1</button>
    <button onclick="changeImage(2)">圖片 2</button>
    <button onclick="changeImage(3)">圖片 3</button>

    <script>
        // 取得 HTML 元素
        const photoLink = document.getElementById('photoLink');
        const photo = document.getElementById('photo');

        // 定義資料庫：管理圖片路徑與點擊後的跳轉網址
        const imageData = {
            1: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic1.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com'
            },
            2: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic2.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com'
            },
            3: {
                imgSrc: 'https://hyjblog.hyjdevelop.com/images/f1_movie_pic3.webp',
                linkUrl: 'https://hyjblog.hyjdevelop.com'
            }
        };

        // 切換圖片與連結的函式
        function changeImage(imageNumber) {
            // 從 imageData 中取出對應數字的資料，若不存在則預設顯示第 1 組
            const currentData = imageData[imageNumber] || imageData[1];

            // 更改 <img> 標籤的 src 屬性（更換圖片）
            photo.src = currentData.imgSrc;

            // 更改 <a> 標籤的 href 屬性（更換點擊跳轉網址）
            photoLink.href = currentData.linkUrl;
        }
    </script>

</body>
</html>
```


