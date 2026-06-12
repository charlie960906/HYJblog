# Personal Blog (Next.js)

這是一個基於 Next.js + TypeScript 的部落格專案範本。

快速啟動：

```bash
# 安裝依賴
npm install

# 開發伺服器（本地）
npm run dev

# 建置並輸出靜態檔案（用於 GitHub Pages 部署）
npm run export
```

將專案部署到 GitHub（簡要步驟）：

1. 在 GitHub 建立新的 repository。
2. 將此專案初始化為 git（如果尚未）並推上遠端：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. 使用「Deploy from a branch（從分支部署）」：

	- 執行下列命令將網站匯出並將靜態輸出放到 `docs/`（GitHub Pages 可設定從 `main` 分支的 `docs/` 資料夾部署）：

```bash
npm run build:pages
```

	- 將 `docs/` 提交到 `main` 分支，然後在 GitHub repository → Settings → Pages，選擇「Branch: main」以及「/docs folder」作為發佈來源。

注意事項：
- 若您要使用動態 Server-side 功能，`next export` 會有限制；推薦使用 Vercel 或其他支援 SSR 的平台來部署。
