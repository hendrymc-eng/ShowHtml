# OpulnX V1.0 · Prototype 交付包

> 移动端优先（iOS 375×812）高保真 HTML 原型
> **不写代码，不连数据库** — 仅原型演示
> 配套文档：`docs/PRD-OpulnX-V1.0.md` / `docs/IA-OpulnX-V1.0.md` / `docs/Design-System-OpulnX-V1.0.md`

---

## 📁 文件清单

### 入口页（PC 视角）
| 文件 | 用途 | 大小 |
|---|---|---|
| `index.html` | PC 端 5 tab sidebar + iframe 切换（含 5 tab 主页 + 17 子页 + 3 文档 卡片导航） | 37KB |

### 5 tab 主页（iPhone 375×812）
| Tab | 文件 | -full.html | 状态 | 内容 |
|---|---|---|---|---|
| ① 首页（资产总览） | `home.html` | `home-full.html` | ✅ DONE | 深蓝 Hero（$328,562.47 + 今日 P&L）+ 充值/提现/兑换 + 6 中心入口 2x3 + X-Shield 状态卡 + 为你推荐 3 张 |
| ① 全球投资 | `global-investment.html` | `global-investment-full.html` | ✅ DONE | 限时开户福利 banner 轮播（富途/老虎/辉立）+ 4 核心入口 2x2（港/美/IPO/ETF）+ 4 工具 + 我的券商账户 |
| ② POE 金融（核心） | `poe-finance.html` | `poe-finance-full.html` | ✅ DONE | POE Hero（$1.2345 + 24h +2.18%）+ 我的 POE 持仓 + 4 大产品类 2x2 + 精选 Dealer 3 卡 × 1-2 产品 |
| ③+OTC+④ 资产市场 | `asset-market.html` | `asset-market-full.html` | ✅ DONE | 3 块分布（Web3/OTC/实体 RWA）+ **业务隔离红色警示 banner** + 数字资产 4 入口 + 行情深色表 + OTC + RWA 大卡 |
| ⑤ 我的 | `me.html` | `me-full.html` | ✅ DONE | 顶部个人信息（4 徽章 MN/NP3/KYC L2/合格投资者）+ NP 进度 + 资产总览 + 金融保障 + KYC + 会员 + 资产记录 + 设置 |

### 17 子页（iPhone 375×812，已 OK 通过 PM Review）
| 子页 | 文件 | -full.html | 状态 | 内容 |
|---|---|---|---|---|
| A1 POE 借贷产品列表 | `poe-lending-list.html` | `poe-lending-list-full.html` | ✅ DONE | 币种/期限/利率筛选 + 5 张借贷产品卡（L1-L4 Dealer 等级 + LTV 抵押率 + 80%/100% milestone） |
| A2 港美股开户 | `global-account-open.html` | `global-account-open-full.html` | ✅ DONE | 4 步进度 + 港/美 切换 + 富途/老虎/辉立 3 家券商差异化对比 |
| A3 OTC 发布卖单 | `otc-order-create.html` | `otc-order-create-full.html` | ✅ DONE | 限价/市价 toggle + 卖家信任度卡片 + escrow 4 步可视化时间线 + 3 处强调"仅托管不担保法币" |
| A4 RWA 项目详情 | `rwa-project-detail.html` | `rwa-project-detail-full.html` | ✅ DONE | KYB 7 重靠前 + 6 月营收柱状图 + 4 方项目方介绍（戴德梁行/普华永道/海棠湾国宾馆/香港 Web3 律所） |
| A5 OTC 接单大厅（买方） | `otc-order-book.html` | `otc-order-book-full.html` | ✅ DONE | 搜索/筛选 + 4 排序 tab + 5 张卖单卡（卖家 L1-L4 + 信任度 + 支付方式 + 立即接单）— 与 A3 形成完整交易闭环 |
| A6 数字资产现货详情 | `digital-asset-detail.html` | `digital-asset-detail-full.html` | ✅ DONE | 业务隔离 banner + 币种 Hero + K 线 SVG 折线 + 订单簿 + 最近成交 + 我的持仓 + 浮动盈亏 |
| A7 金融保障产品详情 | `insurance-product-detail.html` | `insurance-product-detail-full.html` | ✅ DONE | 仅展示不自营 banner + 3 险种切换 + 保障 4 维 + 保障范围 3 类 + 理赔 4 步 + 持牌机构 + 免责说明 |
| A8 POE 借贷履约保障险 | `poe-insurance-detail.html` | `poe-insurance-detail-full.html` | ✅ DONE | POE 金融中心专属险 · 保费 POE 计价 / 赔付 USDT · 太平洋保险承保 · Dealer 跑路/抵押清算/合约漏洞 3 类保障 |
| A9 POE 期权详情 | `poe-option-detail.html` | `poe-option-detail-full.html` | ✅ DONE | CALL/PUT 期权 + Greeks 4 维 + 盈亏曲线 SVG + 欧式行权 + 名词速查 |
| A10 POE 收益理财 | `poe-wealth-detail.html` | `poe-wealth-detail-full.html` | ✅ DONE | 海棠湾月月派 + 9.2% 年化 + 30 天锁定 + 月分红 + 资金流向图（用户→POE 池→Dealer） |
| A11 港股个股详情 | `hk-stock-detail.html` | `hk-stock-detail-full.html` | ✅ DONE | 00700 腾讯 + 实时行情 + K 线 + 五档盘口（港股红涨绿跌）+ 港股交易时段 |
| A12 美股个股详情 | `us-stock-detail.html` | `us-stock-detail-full.html` | ✅ DONE | AAPL Apple + 实时行情 + 盘前盘后 + 财报日历 + 公司信息 |
| A13 港股 IPO 新股详情 | `hk-ipo-detail.html` | `hk-ipo-detail-full.html` | ✅ DONE | 海蓝集团 0xxxx.HK + 招股期倒计时 + 招股进度 65% + 财务摘要 3 年柱状图 + 4 档申购档位 + 已申购 1 手记录 |
| A14 ETF 详情 | `etf-detail.html` | `etf-detail-full.html` | ✅ DONE | 沪深 300 + 跟踪指数 + 偏离度 + 持仓前 10 + 分红记录 |
| A15 KYC 实名认证 | `kyc-verification.html` | `kyc-verification-full.html` | ✅ DONE | L1-L4 等级 + 升级 L3 流程 + 资料上传（身份证+人脸+资产证明）+ 审核时长 |
| A16 充值 | `deposit.html` | `deposit-full.html` | ✅ DONE | 银行卡/微信/支付宝/数字资产 4 种方式 + 快捷金额 + 通道费明细 + 走合作支付通道 |
| A17 提现 | `withdraw.html` | `withdraw-full.html` | ✅ DONE | 银行卡/USDT 链上 2 种方式 + 2FA 验证（短信+邮箱）+ 手续费明细 + 走合作支付通道 |

### 8 三级流程页（详情页下一步操作）
| 三级页 | 文件 | -full.html | 状态 | 内容 |
|---|---|---|---|---|
| B1 POE 借贷申请 | `poe-lending-apply.html` | `poe-lending-apply-full.html` | ✅ DONE | 期限 chip + 数量 slider + 抵押率 70% + 履约险 toggle + 风险提示 + 协议 |
| B2 POE 期权购买 | `poe-option-buy.html` | `poe-option-buy-full.html` | ✅ DONE | CALL/PUT 切换 + 行权价 3 档 + 到期日 4 档 + Greeks Δ/Γ/Θ/ν + 盈亏曲线 + 4 步行权流程 |
| B3 POE 收益申购 | `poe-wealth-subscribe.html` | `poe-wealth-subscribe-full.html` | ✅ DONE | 9.2% 年化 + 30 天锁定 + 资金流向 4 步 + 历史收益柱状图 + 申赎规则 |
| B4 POE 保险投保 | `poe-insurance-buy.html` | `poe-insurance-buy.html` | ✅ DONE | 履约险 0.15%/月 + 受益人 2 选 + 保障范围 5 类 + 太平洋承保 |
| B5 OTC 撮合确认 | `otc-deal.html` | `otc-deal-full.html` | ✅ DONE | 卖家 Michael Chen L4 + 信任度 98 + Escrow 4 步 + 3 种支付方式 + 30 分钟锁定 |
| B6 港美股下单 | `hk-us-order.html` | `hk-us-order-full.html` | ✅ DONE | 限价/市价 4 档 + 数量快捷 + 止盈止损 + 4 项费用明细 |
| B7 KYC 升级 L3 | `kyc-upgrade.html` | `kyc-upgrade-full.html` | ✅ DONE | L2 状态 + 4 资料上传（已上传 2 + 待办 2）+ L3 特权 4 项 |
| B8 充值确认 | `deposit-confirm.html` | `deposit-confirm-full.html` | ✅ DONE | 4 支付方式 + 银行卡选择 + 实名验证 + KYC L2 限额 |

### 8 三级流程页（第二批 · POE 之外的交易/流程闭环）
| 三级页 | 文件 | -full.html | 状态 | 内容 |
|---|---|---|---|---|
| B9 OTC 卖单发布确认 | `otc-order-create-confirm.html` | `otc-order-create-confirm-full.html` | ✅ DONE | 限价/市价切换 + 收款方式 3 选 + Escrow 4 步时间线 + 风险告知 |
| B10 RWA 投资申请 | `rwa-invest.html` | `rwa-invest-full.html` | ✅ DONE | 业务隔离 banner + KYB 7 重审核 + 12% 年化 + 持有期 + 受控转让规则 |
| B11 现货下单 | `spot-order.html` | `spot-order-full.html` | ✅ DONE | 业务隔离 + 限价/市价 4 档 + 杠杆 5 档 + 强平价预估 |
| B12 金融保障投保 | `insurance-apply.html` | `insurance-apply-full.html` | ✅ DONE | 险种切换 + 投保金额 + 受益人 + 持牌机构承保 |
| B13 IPO 申购提交 | `ipo-subscribe.html` | `ipo-subscribe-full.html` | ✅ DONE | 海蓝集团 09999 + 申购档位 1-3 手 + 融资/现金选择 |
| B14 ETF 申购 | `etf-buy.html` | `etf-buy-full.html` | ✅ DONE | 沪深 300ETF 03100 + 1,000 股 + 跟踪指数对比 + 分红方式 |
| B15 提现确认 | `withdraw-confirm.html` | `withdraw-confirm-full.html` | ✅ DONE | 2FA 验证（短信+邮箱）+ 银行卡/USDT 链上 + 手续费明细 |
| B16 港美股开户填写 | `account-open-form.html` | `account-open-form-full.html` | ✅ DONE | 个人资料 + 投资经验 + 视频见证 + 风险揭示 |

### 共享资源
| 文件 | 用途 |
|---|---|
| `shared/tokens.css` | 设计 token（颜色/字体/圆角/阴影/间距）+ 通用组件样式 |

### 文档
| 文档 | 路径 | 说明 |
|---|---|---|
| **PRD V1.0** | `../../docs/PRD-OpulnX-V1.0.md` | 产品需求（12 章 · 799 行） |
| **IA V1.0** | `../../docs/IA-OpulnX-V1.0.md` | 信息架构（5 tab + 6 中心/市场 · 420 行） |
| **Design V1.0** | `../../docs/Design-System-OpulnX-V1.0.md` | 设计系统（Style A · 深蓝 + 金 · 497 行） |

**合计**：77 个 HTML（39 主页 = 5 tab + 17 子页 + 16 流程 + 1 入口，38 -full 完整截图变体）+ 1 共享 CSS + 3 文档

---

## 🚀 怎么打开

### 方式 1（推荐）：PC 端入口
直接双击 `index.html`（file:// 协议）
- 左侧 sidebar：项目导览(HERE) + 5 tab 主页 + 17 子页
- 主区：欢迎页（5 tab 主页 + 17 子页 + 3 文档 卡片）— 每个卡片"在新窗口打开"直达原 HTML
- 顶部 toolbar：PRD V1.0 / IA V1.0 / Design V1.0 / README 文档快捷链接

### 方式 2：起本地 HTTP server（iframe 嵌入更顺）
```bash
cd /Users/Admin/minimax_project/project_04_OpulnX-app/prototype/v1
python3 -m http.server 8080
```
浏览器访问 `http://localhost:8080/index.html`
- 侧栏点 tab → 右栏 iframe 嵌入对应 iPhone 视口页（375×812）
- 看到完整 5 tab 切换效果

### 方式 3：直接打开 mobile HTML
每张 mobile HTML 都是独立 375×812 iPhone 视口，Chrome DevTools 切到 iPhone 12 Pro 看真实效果

---

## ✅ PRD 合规自检

5 tab 主页 + 4 子页均通过 PRD V1.0 硬规则检查：

- ✅ 平台不持有资产 / 不刚性兑付 / 不靠价差盈利
- ✅ 资金隔离（6 池独立）
- ✅ 业务隔离（Web3 ⇍⇨ 实体 RWA 完全分割）— 资产市场红色警示 banner 显式提示
- ✅ Dealer 4 级体系（L1-L4）+ MB 荣创准入硬门槛
- ✅ 4 大产品类（借贷/保险/期权/收益理财）
- ✅ X-Shield 风险回馈（仅 ②④ 中心指定产品 + 仅平台净收益）
- ✅ 6 大公共能力层**完全不可见**（前台不出现任何相关字眼）
- ✅ Dealer 工作台**条件渲染**（MN 尊享不显示，需 MB 荣创才显示）
- ✅ 金融保障市场 = 持牌保险机构展示渠道（不自营/不承保）
- ✅ OTC 仅托管数字资产（不担保法币收付）— OTC 卖单页 3 处强调
- ✅ RWA 红色业务隔离 banner + KYB 7 重审核 + 受控转让规则
- ✅ AI 资讯助手标"不提供个性化投顾"（合规免责）

---

## 🎨 视觉系统同源（Style A 锁定）

- **主色**：深蓝 `#0A2540`（专业、可信）
- **强调色**：金 `#D4AF37`（价值、Dealer 等级徽章、POE 金融核心标识）
- **数据色**：涨绿 `#16A34A` / 跌红 `#DC2626`（仅数据涨跌，不作品牌色）
- **业务隔离色**：红 `#DC2626` + 浅红 `#FEE2E2`（RWA ⇍⇨ Web3 业务隔离警示专用）
- **中性色**：白 / 浅灰 / 深灰
- **字体**：SF Pro Display / PingFang SC
- **圆角**：12px 卡片 / 16px 大卡 / 999px 胶囊
- **阴影**：3 档克制阴影

**绝不在 OpulnX 出现**：
- ❌ 蓝紫渐变（Web3 廉价感）
- ❌ 红涨绿跌作为品牌主色
- ❌ 编辑/不对称排版
- ❌ "后台 / 手动设定 / 运营 / 比赛池" 等技术字眼
- ❌ 暗色模式默认（V1.0 仅浅色）

---

## 📐 iPhone 视口规格

每张 mobile HTML 固定 375×812：
- **Status bar**：44px（9:41 + 信号/Wi-Fi/电池）
- **Top nav**：44px（标题 + 左侧返回 + 右侧操作）
- **Sub-tab**（部分页有）：38px（横向二级切换）
- **Content**：可滚动（`-webkit-overflow-scrolling: touch`）
- **Tabbar**：56px（5 tab 底栏）
- **Home area**：34px（iPhone Home Indicator）

---

## 🎯 5 tab 主页设计要点

### Tab 1 ① 首页（资产总览）
- 顶部 Hero（深蓝 + 金渐变光晕）：OpulnX logo + 通知 + 搜索
- 资产总览 $328,562.47 + 今日 +$2,840.16 (+0.87%)
- 快速操作 3 按钮：充值（金）/ 提现 / 兑换
- **6 中心 2x3 入口**（POE 金融带"核心"tag，RWA 企业带"隔离"tag）
- X-Shield 状态卡（深蓝 + 3/3 激活徽章）
- 为你推荐 3 张（POE 借贷 / 港股打新 / RWA 海棠湾酒店）

### Tab 2 ① 全球投资
- 限时开户福利 banner 轮播 3 张（富途橙 / 老虎红 / 辉立蓝）
- 4 核心入口 2x2：港股开户 / 美股开户（HOT）/ IPO 打新（NEW）/ ETF 产品
- 4 工具 1x4：行情 / AI 资讯（**标"不提供个性化投顾"**）/ 风险测评 / 路演报告
- 我的券商账户：富途 / 老虎 / 辉立 — 品牌色 + 中文 logo

### Tab 3 ② POE 金融（核心）
- 顶部 Nav：POE 金融 + **金色"核心"徽章**
- POE Hero（深蓝 + 金色）：$1.2345 + LIVE + 24h +2.18% + 买入/卖出 CTA
- 横向二级 Tab：产品市场 / Dealer 排行（156）/ 风险仪表盘 / 我的持仓
- 我的 POE 持仓卡（金色背景 + 金色 accent 边）
- 4 大产品类 2x2：借贷（绿）/ 保险（紫）/ 期权（橙）/ 收益理财（蓝）
- 精选 Dealer 产品 3 个 × 1-2 个产品（L3 金 / L4 深蓝 accent 边）
- 跟投产品标"历史收益不代表未来"

### Tab 4 ③+OTC+④ 资产市场
- 顶部 Nav：资产市场
- 横向二级 Tab：数字资产 / OTC / RWA 企业金融
- 资产总览 $184,672.50 + 3 块分布（Web3 资产 / OTC / 实体 RWA，每块顶部 2px 区分色）
- **业务隔离红色警示 banner**（警告三角 + 红色强调 + 3 行详细规则）
- 数字资产 4 入口 2x2：Spot / Swap / Launchpad（NEW）/ 做市商市场
- 行情深色表：POE / UMDT / BTC / ETH / OPX（带 spark 折线）
- 抵押借贷 banner（深色 + 金色点缀）
- OTC 大卡 + RWA 大卡（独立市场入口）

### Tab 5 ⑤ 我的
- 顶部个人信息（深蓝 + 金色）：头像 + 4 徽章（MN 尊享/NP3/KYC L2/合格投资者）
- NP 进度条（NP3 → NP4 62% 进度，金色 fill）
- 资产总览入口（点击回 Tab 1）
- 金融保障市场入口（绿色卡片，2 家持牌机构 pill）
- KYC 与安全 5 行：实名/登录密码/资金密码/2FA/设备管理
- 会员中心 2 行：Opulrich 升级 MB / NP 成长进度
- 资产记录 4 行：充值/提现/交易/**X-Shield 触发记录**（金色）
- 设置 5 行：通知/隐私/语言/关于/客服

---

## 🎬 4 子页设计要点

### A1 POE 借贷产品列表
- 顶部筛选：币种（USDT/UMDT/BTC/ETH）+ 期限（7/30/90 天）+ 利率（< 5% / 5-8% / > 8%）
- 5 张借贷产品卡：币种 + 期限 + 利率 + 抵押率 LTV + 立即借贷 CTA
- 顶部提示："抵押率触及自动清算线"风控说明

### A2 港美股开户
- 4 步进度：① 选券商 → ② 资料上传 → ③ 审核中 → ④ 入金激活
- 3 家券商对比：富途（香港）/ 老虎（新加坡）/ 辉立（香港）— 含开户时长、佣金、管理费
- 提示：港美股账户受当地证监会监管，与 OpulnX 平台账户独立

### A3 OTC 发布卖单
- **escrow 4 步托管流程**：① 创建卖单 → ② 数字资产锁定 → ③ 法币收款确认 → ④ 平台放币
- 3 处强调"仅托管数字资产不担保法币"（顶部 banner + 步骤说明 + 底部免责）
- 卖出数量 + 期望单价 + 收款方式（银行卡/支付宝/微信）

### A4 RWA 项目详情
- 项目：海南·海棠湾度假酒店 RWA
- **KYB 7 重审核**：企业资料/股权核验/资产登记/第三方估值(戴德梁行)/法律结构/退出方案/投资者权限 — 全部 ✓
- 6 月经营数据：入住率 78.4% / ADR $320 / RevPAR $251 / 营收 $1.92M / 净收益 $420K / 复购率 62%
- **受控转让 4 规则** + 违约处置 6 步流程

---

## 🗑️ 旧版处理

> **完全弃用**，不引用：
> - 旧版 V0.1 PRD（5 tab 架构：Quant/PYS/RWA/Real/我的）—— 整组作废
> - 旧版 V0.2 需求重新梳理 —— 作废
> - `exchange/` 60 个 HTML 原型 —— 不引用
> - 旧版 `design.md`（红涨绿跌 / 4 大模块 / iOS 5 tab 视觉）—— 不用
> - 旧版 MCS 统一兑付 / OPX 代币 / 黄金号 / Opulatrix / 4499 联动 —— 不进入 V1.0

---

**编制**：Mavis · 2026-08-17
**项目阶段**：阶段 1 · 需求调研 ✓ → 阶段 2 · 项目设计 ✓ → 阶段 3 · 原型迭代（5/17/16 全集 ✓）
**交付物**：V1.0 PRD + IA + Design System + 39 个 HTML 主页（5 tab + 17 子页 + 16 流程 + 1 入口）+ 38 个 -full.html 完整截图变体 = 77 个 HTML
**进度**：5 / 17 / 16（5 tab 主页 / 17 子页 / 16 三级流程页）
