---
title: 先進封裝產業全解析
date: "2026-09-20"
description: "從 SoC 到 Chiplet，看懂晶片背後的封裝戰爭"
tags: ["產業分析", "股票", "投資"]
marp: true
category: 產業分析
image: /images/Analysis_Advanced_Packaging_Industry/01-iceberg.webp
published: true
---



## 前言

半導體製程的複雜程度，就像一座冰山：浮在水面上的，是我們平常看新聞就能聽到的詞彙——先進製程、奈米節點、異質整合，看似簡單好懂；但水面下，卻是成千上百道微影、蝕刻、鍍膜、封裝、測試等專業工序，每一道都牽涉極高的技術門檻與專有名詞。

![半導體製程的冰山比喻](/images/Analysis_Advanced_Packaging_Industry/01-iceberg.webp)

但對投資人來說，我們的目標不是成為半導體製程工程師，去搞懂每一道工序的技術細節，而是要看清楚一間公司在這整條供應鏈裡，究竟卡在哪個位置、扮演什麼角色。換句話說，重要的不是「這道製程怎麼做」，而是「這間公司在這道製程裡提供了什麼、可以被誰取代、又難以被誰取代」——這才是投資與交易上真正值得花時間鑽研的地方。

這篇文章想做的，就是把「先進封裝」這個領域的脈絡整理出來，不管是新手還是老手，都能在其中找到可以依循的邏輯。

---

## 第一章：一體成型 vs. 拆開重組，晶片設計的選擇

### 什麼是 SoC？

傳統做法是把 CPU 運算核心、繪圖處理（GPU）、記憶體控制、I/O 介面等所有功能，全部直接用光罩蝕刻在同一塊矽晶圓上，用同一套先進製程一次做完，這就叫做 **SoC（System on Chip，系統單晶片）**。

從半導體製造的前段（Front-End）來看，晶圓代工廠做的事情，就是在一片圓形矽晶圓上，透過光罩、曝光、蝕刻、鍍膜等步驟，一層一層把電晶體和金屬線路「印」在整塊晶圓上，最後在晶圓上刻出成千上百顆完整的晶粒。

![SoC 內部結構：各區塊皆蝕刻於同一片矽晶圓，位置固定不可拆分](/images/Analysis_Advanced_Packaging_Industry/02-soc.webp)

### 為什麼要「切分」？

SoC 裡不是每個功能區塊都需要最先進的製程。例如運算核心對效能要求高，值得花大錢用最先進的 3 奈米、2 奈米製程去微縮；但 I/O 介面、類比電路這類區塊，用先進製程反而效益不高、成本卻很貴。

於是 **Chiplet（小晶片）** 的做法，就是把 SoC 拆成好幾個獨立的小晶粒（die），只對真正需要高效能的區塊用最先進製程，其他區塊用比較成熟、便宜的製程來做，整體成本更划算。

![拆分前：單一晶粒全部只能用同一套製程；拆分後：多顆獨立晶粒，各自搭配適合的製程節點](/images/Analysis_Advanced_Packaging_Industry/03-chiplet-split.webp)

### 拆開之後，要怎麼「組回去」？

晶粒拆開做完之後，還是要重新組合成一顆完整可用的晶片，這時候就需要 **先進封裝** 技術，把不同製程做出來的多顆晶粒放進同一個封裝裡，讓它們能像原本的 SoC 一樣互相溝通、協同運作——這就是所謂的「異質整合」。

![封裝前：4 顆各自獨立的晶粒；封裝後：透過中介層與封裝基板整合成一顆完整晶片](/images/Analysis_Advanced_Packaging_Industry/04-heterogeneous-integration.webp)

### 異質整合的兩種型態：2.5D 與 3D

- **2.5D 封裝**：晶粒本身沒有真的堆疊起來，而是把好幾顆晶粒並排放在同一片中介層上，彼此是水平相鄰的關係。中介層本身是一片刻好精細線路的矽或玻璃基板，負責把相鄰晶粒的訊號互相連通，之後整片中介層再固定到最下面的封裝基板上。台積電的 CoWoS 就是 2.5D 封裝的最好範例。

- **3D 封裝**：以 HBM（High Bandwidth Memory，高頻寬記憶體）為代表性應用。AI 模型訓練與推論需要處理器頻繁跟記憶體交換巨量資料，傳統記憶體（DDR）的頻寬根本不夠用，傳統的走線方式也負擔不起 HBM 所需的高頻寬，功耗損耗、延遲等問題隨之而來。3D 封裝不採用走線方式，而是直接一顆疊一顆垂直堆起來，中間靠 **矽穿孔（Through-Silicon Via, TSV）** 技術，在每顆晶粒上鑽出極細小的垂直通孔，填入導電材料，讓上下相鄰晶粒直接打通電訊號，達到高頻寬、低延遲、低功耗的效果。

![2.5D 封裝（晶粒水平並排、透過中介層互連）vs. 3D 封裝（TSV 垂直堆疊、直接打通）](/images/Analysis_Advanced_Packaging_Industry/05-2.5d-3d.webp)

---

## 第二章之一：組回去的方式——先進封裝技術的首要選擇 CoWoS

理解了晶片拆開的必要性後，接下來看各種把晶片「組回去」的封裝技術選擇。

### CoWoS 是什麼

**CoWoS（Chip on Wafer on Substrate）** 是台積電發展的先進封裝技術，也是目前 AI 晶片最主要採用的封裝方式。名稱本身就把製程步驟講得很清楚：

- **上半部「Chip on Wafer」**：先準備一片用晶圓做成的中介層（interposer），上面刻有極細密的線路，接著把設計好的多顆晶粒（例如 GPU 邏輯晶粒，旁邊搭配好幾顆 HBM 記憶體晶粒）精準對位、固定到這片中介層上，讓晶粒透過中介層線路互相連通——這就是前面提到的 2.5D 封裝概念。
- **下半部「on Substrate」**：把已經組裝好晶粒的整片中介層，再固定到下面的封裝基板上，基板負責對外接出接腳，最後變成可以焊到電路板上使用的完整晶片。

![CoWoS 的三層結構：第一層邏輯/HBM、第二層中介層、第三層封裝基板](/images/Analysis_Advanced_Packaging_Industry/06-three-layers.webp)

CoWoS 之所以重要，是因為它解決了 AI 晶片的關鍵痛點：GPU 運算核心需要跟旁邊的 HBM 記憶體用極寬的匯流排高速溝通，CoWoS 透過中介層把 GPU 跟多顆 HBM 緊密排列在一起，讓訊號路徑最短、最密集，才能撐得起 AI 運算所需的超高頻寬。

### CoWoS 的市場地位

CoWoS 目前是先進封裝領域「最主流、產能最大、但也最緊繃」的技術。NVIDIA 的 GPU（從 A100、H100 到 Blackwell、Rubin）、AMD 的 MI 系列 AI 加速器，幾乎都靠 CoWoS 把運算晶片和 HBM 記憶體整合在一起，可以說是 AI 加速器封裝的預設選項——業界估計 NVIDIA 一家就拿走 CoWoS 產能約六成左右。

但由於台積電擴產謹慎，資本支出的重心又放在新的先進製程上（佔比約 70%–80%），先進封裝僅佔 10%–20%，導致 CoWoS 持續處在供不應求的狀態，這也給了其他先進封裝廠商許多切入機會。

### CoWoS 的三種世代

| 技術 | 全稱 | 特色 | 現況 |
|---|---|---|---|
| **CoWoS-S** | Silicon（矽）| CoWoS 最初代 | 2026 年市佔僅剩約三成，主要用於 Hopper 架構的 H100、H200 |
| **CoWoS-R** | RDL（Re-Distribution Layer）| 為解決 CoWoS-S 矽中介層易裂的問題而生的過渡方案 | 目前市佔低 |
| **CoWoS-L** | LSI（Local Silicon Interconnect，局部矽互聯）| 在 RDL 中加入 LSI，讓晶粒之間可做到快速的 Die to Die 傳輸；同時讓 RDL 面積可以做得更大，單一封裝能裝入更多顆 die | 目前市佔近七成，GB、Rubin 系列伺服器皆採用 |

![各家業者採用的 CoWoS 技術（CoWoS-L / CoWoS-S / CoWoS-R）與對應晶片](/images/Analysis_Advanced_Packaging_Industry/07-cowos-adoption-table.webp)

CoWoS-S 的架構是在矽中介層（Silicon Interposer）上，透過高密度佈線與嵌入式深溝槽電容（eDTC），整合邏輯小晶片與 HBM，自 2012 年起已投入量產，矽中介層尺寸最高可達 3.3 倍光罩：

![CoWoS-S 架構圖：邏輯晶片與高頻寬記憶體透過矽中介層整合](/images/Analysis_Advanced_Packaging_Industry/08-cowos-s.webp)

CoWoS-R 則是用多層線路重佈層（RDL）中介層取代矽中介層，RDL 由聚合物與銅導線組成，相對具有韌性，能增強 C4 焊點的完整性、支援較大尺寸封裝，自 2023 年起投入量產：

![CoWoS-R 架構圖：RDL 中介層連接 SoC 與 HBM](/images/Analysis_Advanced_Packaging_Industry/09-cowos-r.webp)

---

## 第二章之二：組回去的方式——其他先進封裝技術選擇

### 從晶圓級封裝（WLP）走向面板級封裝（PLP）

在介紹 CoWoS 以外的方案之前，先理解為什麼封裝技術會從晶圓級封裝（WLP，Wafer-Level Packaging）轉向面板級封裝（PLP，Panel-Level Packaging），主要有兩個原因：

1. **形狀不匹配**：晶圓是圓形，但封裝模組與晶片多為方形，邊角空間難以完全利用。隨著晶片尺寸放大，單片圓形晶圓可切割的晶片數量已從過去 15～20 顆降到約 6 顆，使用效率明顯下滑。

   ![面板尺寸越大，可切割的中介層數量越多、面積利用率越高、成本越低](/images/Analysis_Advanced_Packaging_Industry/10-interposer-size-cost.webp)

2. **曝光範圍限制（reticle limit）**：這是微影製程通用的物理限制，並非 WLP 專屬，但在先進封裝的情境下，封裝模組面積（尤其隨 HBM 顆數與晶片數量增加而持續擴大的 interposer 或封裝基板）遠大於前段製程單顆晶粒的尺寸，更容易超出單次曝光的涵蓋範圍。一旦超出，就必須靠多次曝光後拼接（Stitching）才能完成，直接帶來製程時間拉長、對位誤差增加、成本上升三個後果。

   ![各家先進封裝技術的 reticle size 限制與擴展趨勢（2025-2029）](/images/Analysis_Advanced_Packaging_Industry/11-reticle-size-limits.webp)

### 各家的封裝技術方案

**1. FOPLP（Fan-Out Panel Level Packaging，扇出型面板級封裝）**

FOPLP 是面板級封裝中發展最早、量產進度最快的技術，核心概念是把裸晶排列在方形大面板（而非圓形晶圓）上製作重佈線層（RDL）。所謂 Fan-Out（扇出），指的是把裸晶重新排列在載體上、以環氧樹脂重構塑封成一片更大面積的人造載具後，直接在表面製作多層 RDL，讓晶片間與對外的訊號連接不再受限於原晶粒邊界，藉此在同樣接點數量下取得更寬鬆的線距、更薄的封裝厚度與更短的訊號路徑。

![Fan-In（接點侷限在晶片面積之內）vs. Fan-Out（接點延伸到晶片面積之外）](/images/Analysis_Advanced_Packaging_Industry/12-fanin-fanout.webp)

**2. FOCoS（Fan-Out Chip-on-Substrate）與 FOCoS-Bridge**

FOCoS 是日月光在 VIPack 先進封裝平台下的 Chiplet 整合技術：先用 Fan-Out 製程把多顆裸晶重新排列、透過扇出型 RDL 整合成一個模組，再把整片模組貼裝到基板上——這也是名稱中「Chip-on-Substrate」的由來。

進階版本 **FOCoS-Bridge** 則是在扇出型 RDL 中介層裡，再嵌入一小片「局部矽橋」，只在晶粒之間需要高速、高密度傳輸的區域用次微米級線寬線距互連，其餘電源與低密度訊號則走成本較低的扇出型 RDL。這樣的設計目的，是與傳統 2.5D 封裝（用一整片大面積矽中介層承載所有晶粒，如 CoWoS）做出區隔，大幅減少矽材料用量，降低中介層放大帶來的成本與良率壓力——等於是「一般 FOCoS」與「全尺寸矽中介層 2.5D 封裝」之間的折衷方案。

![2.5D、FOCoS、FOCoS-B 三種封裝配置與中介層互連密度比較](/images/Analysis_Advanced_Packaging_Industry/13-advanced-packaging-si-rdl.webp)

值得注意的是，AMD Instinct MI455X（3.5D 封裝）中，運算晶粒堆疊採用台積電 3D SoIC＋CoWoS-L，主機端 CPU（Venice）卻採用日月光 FOCoS-Bridge，顯示同一機櫃平台可能根據成本與使用情境，同時採用多家封裝技術。

**3. CoPoS（Chip-on-Panel-on-Substrate）**

台積電把 CoWoS 概念「面板化」後的下一代先進封裝技術，核心邏輯是用大型玻璃方形面板取代圓形矽晶圓，作為承載晶片的中介層，面板尺寸、材料（玻璃）與 RDL 架構皆由台積電主導。

![矽、有機材料（環氧樹脂）、玻璃三種基板材料的表面平整度、CTE、吸濕性、熱傳導率等特性比較](/images/Analysis_Advanced_Packaging_Industry/14-substrate-materials.webp)

短期玻璃較可能先以「暫時性載體」形式導入，用來製作 RDL 或承載晶片，製程結束後移除回收；中長期目標則是「永久性基板」（glass core substrate）。但穿玻璃通孔（TGV）製程仍有裂紋控制、金屬覆蓋均勻度、玻璃與金屬附著力等挑戰待克服，目前市場主要預期放量時間為 2H27E～1H28E，商業化時程預估約 2029 年。

**4. EMIB（Embedded Multi-die Interconnect Bridge）**

Intel 的先進封裝技術，設計核心邏輯與日月光的 FOCoS-Bridge 相近，都是在 RDL 的部分放一小片矽橋做局部互連，只在晶粒間需要高速、高密度傳輸的區域使用，其餘電源與低密度訊號走成本較低、線路較寬鬆的傳輸方式。差異在於：EMIB 用有機基板走線，FOCoS-Bridge 用扇出型 RDL。

近期更受矚目的是 **EMIB-T**，T 代表 TSV（矽穿孔）——在矽橋（或晶粒）上額外做穿孔垂直導通，讓訊號、電源能「上下」貫穿晶片堆疊，而不只是「左右」互連。這讓 EMIB-T 具備部分 3D 封裝的能力（垂直堆疊＋水平橋接並存），也是它能支援更大尺寸、更高整合度晶片（例如 Google TPU 這類需要大量 HBM 堆疊＋大面積邏輯晶粒的設計）的關鍵。

![Intel EMIB (M/T) 與 TSMC CoWoS (S/L/R) 在特色、良率、光罩尺寸擴展、HBM 支援能力、客戶等面向的比較](/images/Analysis_Advanced_Packaging_Industry/15-emib-vs-cowos.webp)

根據 Intel 近期法說會，EMIB-T 客戶需求與在手訂單持續增加，公司預計 2027 年開始支援外部客戶高量產，並重申代工業務目標 2027 年達到損益兩平。市場消息指出，Google 的 TPU v8e（代號 Humufish）因晶片尺寸過大，全數採用 EMIB-T 而非 CoWoS。未來不只受惠於 Google 晶片專案（Humufish/Triggerfish）在 2027 下半年至 2028 年間的大規模放量，EMIB 客戶群也預期會擴大，除了 Google，還包括 AWS 等。

---

## 第三章：非零和的封裝市場，下游廠商選擇封裝的邏輯

儘管各家封裝廠都在加速擴建，下游需求仍極為強勁。必須理解的是，**封裝不是零和競爭**，各家公司會依照以下幾個層面來決定自己要採用哪一種封裝規格：

**1. 晶片尺寸／reticle 需求是第一道篩選門檻**

像前面提到的 TPU v8e（Humufish）之所以非用 EMIB-T 不可，就是因為晶片尺寸達到 9.5 倍 reticle，當時 CoWoS 的規格撐不住。所以第一步永遠是先看下一代晶片要整合多少顆 compute die、多少顆 HBM，推算出需要多大的封裝面積，再回頭看哪家供應商的技術世代能滿足這個尺寸——不夠大就直接被排除，根本不需要比價。

**2. 產能與交期是現實面最大的制約**

台積電 CoWoS 產能長期供不應求，訂單被迫外溢到 Amkor、日月光甚至 Intel。CSP（雲端服務供應商）下單時很清楚，即使 CoWoS 技術最成熟，但若台積電產能排不進來、要等一年後才能量產，對於 AI 軍備競賽這種爭分奪秒的節奏來說，退而求其次選一個產能能立刻到位的方案（例如 EMIB-T），反而是更務實的選擇。

**3. 供應鏈韌性／避免單一供應商綁定，是近年新增的策略考量**

CSP 已經學到教訓：如果只綁台積電一家，一旦產能吃緊或漲價，自己完全沒有議價空間。像 Google 同時採用 CoWoS（TPU v8x/Zebrafish）與 EMIB-T（TPU v8e/Humufish），AWS 也開始評估 EMIB-T（AWS T3 專案），本質上就是在分散單一供應商風險，同時利用兩邊供應商互相競爭，來壓低價格、爭取更好的產能保證。

---

## 小結

從 SoC 到 Chiplet，再到 2.5D／3D 封裝的分野，先進封裝的發展其實是一連串「成本 vs. 效能 vs. 產能」的權衡：台積電的 CoWoS 家族仍是主流、Intel 的 EMIB-T 正在攻城掠地、日月光的 FOCoS 系列則卡在中間地帶提供彈性方案，而 CoPoS 這類玻璃基板技術則是更長線的下一步。

市場預估 2025 至 2028 年整體先進封裝產值 CAGR 將達 10%，其中 2.5D／3D 封裝產值 CAGR 更高達 17%，佔比也將從 2025 年的 20% 持續攀升至 2028 年的 24%：

![預估 2025-2028 年先進封裝市場 CAGR 將達 10%，其中 2.5D/3D 封裝 CAGR 達 17%](/images/Analysis_Advanced_Packaging_Industry/16-market-cagr.webp)

對投資人來說，重點不在背熟每個技術名詞，而是看懂每間公司在這條供應鏈裡卡在哪個環節、能不能被取代——這才是真正值得花時間鑽研的地方。
