---
title: HTML5 WEB APP程式設計第七周心得
date: "2026-11-15"
description: "DaisyUI Input Components 自主學習，製作最新消息資訊編輯頁面"
tags: ["課程心得"]
marp: true
category: HTML5課程心得
image: /images/html.webp
published: true
showInHomePage: false
---

## DaisyUI Input Components 自主學習

### Input（文字輸入欄）

`Input` 用於讓使用者輸入單行文字，例如編號、標題、帳號、搜尋關鍵字和電子郵件。  


```html
<input type="text" class="input input-bordered w-full"
  placeholder="請輸入公告標題" required />

<input type="url" class="input input-bordered w-full"
  placeholder="https://example.com" />
```

重要屬性包括 `type`、`placeholder` 和 `required`。  
`type="url"` 可提示瀏覽器檢查網址格式；`required` 表示送出表單前不可留空。

實際應用：
在「最新訊息」編輯頁中，文字輸入欄輸入公告編號和標題以及網址輸入欄輸入連結與圖片網址。


參考連結：
[DaisyUI - Input](https://daisyui.com/components/input/)

---

### Textarea（多行文字輸入欄）

`Textarea` 用於輸入較長、可能跨越多行的文字，例如公告內容、商品描述、評論和訂單備註。  


```html
<textarea class="textarea textarea-bordered min-h-32 w-full"
  placeholder="請輸入公告內容" required></textarea>
```

實際應用：
作業使用 `textarea textarea-bordered` 接收最新訊息的詳細內容。


參考連結：
[DaisyUI - Textarea](https://daisyui.com/components/textarea/)

---

### Select（下拉選單）

`Select` 選單適合讓使用者從有限的選項中選擇一項，例如商品分類、配送方式、訂單狀態或發布平台。  
它比顯示一排選項節省版面空間，也能避免使用者輸入不一致的分類名稱。

```html
<select class="select select-bordered w-full">
  <option disabled selected>請選擇商品分類</option>
  <option>美食</option>
  <option>旅遊住宿</option>
  <option>購物優惠</option>
</select>
```

實際應用：
最新消息分類：活動、維修、會員或新品
訂單狀態：處理中、已出貨、已完成
地址表單中的縣市與地區

參考連結：
[DaisyUI - Select](https://daisyui.com/components/select/)

---

### Checkbox（核取方塊）

`Checkbox` 可以讓使用者選擇零個、單個或多個選項。  
HTML 使用 `type="checkbox"` 建立核取方塊；如果多個選項名稱相同，通常使用不同的 `value`。

```html
<label class="label cursor-pointer justify-start gap-3">
  <input type="checkbox" class="checkbox checkbox-primary" />
  <span class="label-text">顯示在首頁</span>
</label>
```

實際應用：
公告是否顯示在首頁或寄送電子郵件通知
商品規格中的多項配件
註冊表單中的服務條款和優惠資訊同意項目

參考連結：
[DaisyUI - Checkbox](https://daisyui.com/components/checkbox/)

---

### Radio（單選按鈕）

`Radio` 只能從一組互斥選項中選擇一項。  
同一組選項需要相同的 `name`，瀏覽器才會知道它們彼此互斥。

```html
<input type="radio" name="news-status"
  class="radio radio-primary" value="published" />
<span>立即發布</span>

<input type="radio" name="news-status"
  class="radio radio-primary" value="draft" />
<span>儲存草稿</span>
```

實際應用：
最新消息的發布、草稿或排程狀態
商品尺寸、小、中、大的選擇
結帳時選擇信用卡或超商付款

參考連結：
[DaisyUI - Radio](https://daisyui.com/components/radio/)

---

### Toggle（開關）

`Toggle` 是視覺化的開關控制，常用於只需開啟或關閉的設定。  
雖然本質上仍可使用 `Checkbox` 實作，但開關樣式較適合設定面板和管理後台。

```html
<input type="checkbox" class="toggle toggle-primary" />
```

實際應用：
啟用或停用最新消息
開關深色模式或電子郵件通知
商品上下架或庫存警示

參考連結：
[DaisyUI - Toggle](https://daisyui.com/components/toggle/)

---

### Range（數值範圍滑桿）

`Range` 可讓使用者拖曳滑桿設定數值或選擇數值範圍。  
可搭配 `min`、`max` 和 `step` 限制可選值。

```html
<input type="range" min="0" max="100" value="40"
  class="range range-primary" />
```

實際應用：
商品價格區間篩選
設定優惠折扣或圖片透明度
調整音量、亮度或服務評分

參考連結：
[DaisyUI - Range](https://daisyui.com/components/range/)

---

### File Input（檔案上傳）

`File Input` 用於讓使用者選擇圖片、文件或其他檔案。  
可使用 `accept="image/*"` 限制只能選擇圖片，也可使用 `multiple` 允許多選。

```html
<input type="file" accept="image/*"
  class="file-input file-input-bordered w-full" />
```

實際應用：
上傳最新消息的代表圖片
商品主圖、證明文件或履歷附件
上傳個人資料和會員大頭照

參考連結：
[DaisyUI - File Input](https://daisyui.com/components/file-input/)

---

## 作業：製作最新消息資訊編輯頁面

作業展示：[最新消息資訊編輯頁面](https://onlineshopwithapi.netlify.app)

### 表單版面實作

編輯頁面使用 DaisyUI 的卡片、輸入欄、文字區塊和主要按鈕組合：  

```html
<section class="card bg-base-100 shadow-sm border border-emerald-100 p-6">
  <h2 class="text-xl font-bold">更新最新訊息</h2>

  <form id="latestNewsForm" class="space-y-4">
    <input id="newsIdInput" type="text"
      class="input input-bordered w-full" required />

    <input id="newsTitleInput" type="text"
      class="input input-bordered w-full" required />

    <input id="newsDateInput" type="date"
      class="input input-bordered w-full" required />

    <textarea id="newsContentInput"
      class="textarea textarea-bordered min-h-32 w-full" required></textarea>

    <button type="submit" class="btn btn-primary w-full">
      送出更新
    </button>
  </form>
</section>
```

版面使用手機優先的響應式設計：編號與標題在小螢幕會各占一列，在較寬螢幕則排列成兩欄。  
DaisyUI 的 `input-bordered`、`textarea-bordered` 和 `btn-primary` 能統一表單外觀；  
Tailwind CSS 的 `grid-cols-1`、`sm:grid-cols-2` 和 `w-full` 則負責調整欄位排列與寬度。

參考連結：
[DaisyUI - Components](https://daisyui.com/components/)
[Tailwind CSS - Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns)

### 表單送出

表單送出時先使用 `preventDefault()` 阻止瀏覽器跳轉頁面，再建立 `FormData()` 將欄位對應到 Google 表單的 entry 編號：

```JavaScript
document.getElementById("latestNewsForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var formData = new FormData();
  formData.append("entry.643911397", newsIdInput.value.trim());
  formData.append("entry.791199789", newsTitleInput.value.trim());
  formData.append("entry.1244574031", newsDateInput.value);
  formData.append("entry.412099180", newsContentInput.value.trim());

  fetch("https://docs.google.com/forms/d/e/表單編號/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData
  });
});
```

送出期間按鈕會暫時停用並顯示「送出中...」；送出成功後會清空表單並提示重新同步後即可查看。  
使用 `required` 可以阻止必填欄位為空，使用 `type="date"` 可以讓瀏覽器提供日期選擇介面，使用 `type="url"` 剛好適合連結欄位。

參考連結：
[MDN - HTML Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
[MDN - FormData](https://developer.mozilla.org/zh-TW/docs/Web/API/FormData)
[MDN - Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)


