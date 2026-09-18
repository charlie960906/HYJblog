# ⚡ HYJblog

> "聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度。"
>
> "BUT 感謝你發現了我的 BLOG，期待我會努力寫它也會努力創業。"

---

## 🌟 關於本站

**HYJblog** 是基於 **Next.js**、**TypeScript** 與 **Tailwind CSS** 打造的高效能個人技術部落格。

專案採用靜態優化與響應式設計，所有文章皆以 **Markdown / MDX** 進行管理與撰寫。  

👉 **網址：** [hyjblog.hyjdevelop.com](https://hyjblog.hyjdevelop.com)

---

## ✨ 核心特點

- 🚀 **高效能架構**：基於 Next.js App Router 進行靜態生成（SSG）優化，極速載入與渲染。
- 🎨 **現代化 UI/UX 設計**：
  - 首頁 Hero 區段支援 **動態打字機特效**。
  - 全響應式設計（Responsive Design），針對行動裝置調整字體，確保不意外換行與極佳排版。
  - 支援 **深色模式（Dark Mode）** 與淺色模式切換，貼心護眼。
- 📝 **Markdown / MDX 文章系統**：
  - 輕量化文章管理，支援代碼高亮（Syntax Highlighting）與自訂元件擴充。
- 🔍 **完整 SEO 與 Syndication 支援**：
  - 自動產出 **Sitemap** (`sitemap.xml`) 強化搜尋引擎索引。
  - 自動生成 **RSS Feed** (`rss.xml`) 與 **Atom Feed** (`atom.xml`)，方便技術社群訂閱。
- 🤖 **全自動 CI/CD 流水線**：整合 GitHub Actions，完成語法檢查、構建、動態資源生成與自動化部署。

---

## 🛠️ 技術架構與實作原理

為了兼顧開發者體驗 (DX) 與最終使用者的瀏覽體驗 (UX)，本專案在技術選型與架構設計上進行了以下考量與實作：

### 1. 渲染策略 (Next.js App Router)
全面採用 **Next.js App Router** 架構。針對技術部落格「讀多寫少」的特性，高度依賴 **SSG (靜態網站生成)**。所有文章頁面在 Build 階段即預先編譯為靜態 HTML，大幅降低伺服器回應時間 (TTFB)，實現極致的首屏載入速度與最佳的 SEO 表現。

### 2. 嚴格型別安全 (TypeScript)
專案全面導入 **TypeScript**。透過靜態型別定義（如文章的 Front Matter 資料結構定義），在開發階段即可攔截潛在的資料傳遞錯誤或未定義變數。這不僅提升了程式碼的健壯性 (Robustness)，也讓系統具有極高的可維護性與擴展性。

### 3. 樣式與響應式系統 (Tailwind CSS)
捨棄傳統 CSS 檔案，採用 **Tailwind CSS** 的 Utility-first 樣式系統，避免全局樣式污染：
- **動態打字機與流式排版**：首頁 Hero 區塊的打字機特效，結合 Tailwind 的響應式斷點 (Breakpoints)，精準控制各螢幕尺寸下的字級縮放，確保在行動裝置上的視覺完整性。
- **無閃爍深色模式**：利用 Tailwind 的 `dark:` 修飾子配合狀態管理，實現平滑且無閃爍 (FOUC-free) 的深/淺色主題切換。

### 4. 輕量化內容解析系統 (Markdown / MDX)
摒棄繁重的關聯式資料庫，採用基於檔案系統的無頭式架構 (File-based CMS)：
- 透過 Node.js 讀取 `public/post/` 目錄。
- 使用 `gray-matter` 精準解析 Markdown 頂部的 Front Matter（標題、日期、標籤）。
- 結合 `remark` 與 `rehype` 生態系進行 AST（抽象語法樹）轉換，並外掛代碼高亮模組，將純文字完美渲染為具備高讀取性的技術文章。

### 5. 自動化 SEO 與聚合內容生成
在 CI/CD 流水線中整合自訂腳本。每當執行建置時，系統會自動遍歷所有 Markdown 檔案，動態組裝並寫入最新的 `sitemap.xml`、`rss.xml` 與 `atom.xml`，確保搜尋引擎爬蟲能第一時間索引最新內容。

---

## ✍️ 新增文章指南

文章統一儲存於 `public/post/` 資料夾下。新增文章時，請建立 `.md` 檔案並填寫頂部的 **Front Matter** 元資料：

```markdown
---
title: "文章標題"
date: "YYYY-MM-DD"
description: "文章簡短描述"
tags: ["Tag1", "Tag2"]
category: "分類名稱"
---

這裡開始撰寫文章內容...
支援 **Markdown** 語法、[外部連結](https://hyjblog.hyjdevelop.com) 以及程式碼區塊高亮。

## 🤖 CI/CD 自動化部署流程

本專案全面整合 **GitHub Actions** 進行自動化持續整合與部署。每當你推送（Push）原始碼或新文章到 GitHub 儲存庫時，工作流程會自動執行以下步驟：

1. **環境檢查**：安裝 Node.js 依賴並進行 TypeScript 靜態類型檢查。
2. **專案編譯**：執行 `npm run build` 進行生產環境打包。
3. **動態資源生成**：自動執行腳本，動態產出包含最新文章清單的 `rss.xml`、`atom.xml` 與 `sitemap.xml`。
4. **自動部署**：將編譯完畢的靜態網頁與資源安全地發布至伺服器上。

---

## 📄 開源授權條款

本專案採用 **[MIT License](https://zh.wikipedia.org/zh-tw/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)** 授權條款。你可以自由地複製、修改或轉發此專案的原始碼，但請務必保留原作者的版權聲明。

---

*powered by [HUANG YOU JYUN](https://github.com/charlie960906)
