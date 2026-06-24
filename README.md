# HYJblog

歡迎來到老黃的BLOG
這是使用 **Next.js**、**TypeScript** 與 **Tailwind CSS** 打造的靜態部落格
所有文章皆透過 Markdown / MDX 管理與撰寫。

> "聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度。"
> "BUT 感謝你發現了我的 BLOG 期待我會努力寫它也會努力創業"

## 部落格特點

- **高效能架構**：基於 Next.js App Router 進行靜態優化，載入速度快。
- **動態打字機特效**：首頁 Hero 區段有動態打字效果，並支援全響應式設計，小螢幕下字體會自動縮小且絕不換行。
- **Markdown 寫作系統**：文章全面採用 Markdown 格式管理，支援代碼高亮與自訂元件。
- **SEO 與自動化整合**：
  - 自動生成指向自訂網域的 **RSS Feed** (`rss.xml`)
  - 自動生成 **Atom Feed** (`atom.xml`)
  - 自動生成 **Sitemap** (`sitemap.xml`)，完美符合搜尋引擎最佳化。
- **深色模式**：支援切換深色（Dark Mode）與淺色（Light Mode）模式，提供舒適的閱讀體驗。

## 🌐 官方網站網址

本部落格目前部署於自訂網域：
👉 **[hyjblog.hyjdevelop.com](https://hyjblog.hyjdevelop.com)**

---

## 🛠️ 本機開發與建置指南

### 1. 複製專案
```bash
git clone [https://github.com/charlie960906/hyjblog.git](https://github.com/charlie960906/hyjblog.git)
cd hyjblog

```

### 2. 安裝套件依賴

```bash
npm install

```

### 3. 啟動開發伺服器

```bash
npm run dev

```

啟動後，在瀏覽器打開 [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) 即可即時預覽網站。

### 4. 編譯與打包生產版本

```bash
npm run build

```

---

## ✍️ 如何新增文章？

所有的部落格文章都存放在 `public/post/` 目錄下。若要撰寫新文章，只需建立一個新的 `.md` 檔案（例如 `my-new-post.md`），並在檔案頂部加入 Front Matter 格式的中介資料：

```markdown
---
title: "我的新技術筆記"
date: "2026-06-24"
description: "這是一篇關於前端開發或學習心得的介紹。"
tags: ["Next.js", "TypeScript", "學習筆記"]
category: "技術"
---

這裡開始寫你的文章內容...
支援 **粗體**、[連結](https://hyjblog.hyjdevelop.com) 以及標準的代碼區塊。

```

---

## 🤖 CI/CD 自動化部署流程

本專案全面整合 **GitHub Actions** 進行自動化持續整合與部署。每當你推送（Push）原始碼或新文章到 GitHub 儲存庫時，工作流程會自動執行以下步驟：

1. **環境檢查**：安裝 Node.js 依賴並進行 TypeScript 靜態類型檢查。
2. **專案編譯**：執行 `npm run build` 進行生產環境打包。
3. **動態資源生成**：自動執行腳本，動態產出包含最新文章清單的 `rss.xml`、`atom.xml` 與 `sitemap.xml`。
4. **自動部署**：將編譯完畢的靜態網頁與資源安全地發布至伺服器上。

---

## 📄 開源授權條款

本專案採用 **[MIT License](https://www.google.com/search?q=LICENSE)** 授權條款。你可以自由地複製、修改或轉發此專案的原始碼，但請務必保留原作者的版權聲明。

---

*Made with ❤️ by [charlie960906*](https://www.google.com/search?q=https://github.com/charlie960906)

```

### 💡 調整提示：
這份 README 已經幫你整合了：
1. **你的首頁經典名言**。
2. **你新改好的自訂網域** (`hyjblog.hyjdevelop.com`)。
3. 新增文章時的前置格式教學（Front Matter）。
4. 自動化生成 RSS / Atom / Sitemap 的功能描述。

直接複製貼上就能讓你的 GitHub 專案首頁看起來非常完整且有專業架構！

```