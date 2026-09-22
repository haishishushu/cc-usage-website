# CC Usage 官网 · 实现清单

> 设计稿：[`website.pen`](./website.pen)（浅色 / 深色双主题画布，左列浅色 5 页 + 右列深色 5 页）
> 品牌名：CC Usage · 主行动色：`#2563EB`（取自 ai-usage-island 前端 `--accent-blue`）
> 技术栈与 ai-usage-island 的 `frontend/` 保持同源，仅去掉 Tauri 桌面壳，新增路由。

## 一、技术栈

- [x] 确定技术栈：React 19 + TypeScript 5.7 + Vite 6 + Tailwind CSS 4
- [x] 确定与 island 前端同源的依赖版本（对照 `ai-usage-island/frontend/package.json`）
- [x] `react-router` v7（`BrowserRouter` / `Routes` / `NavLink`，唯一新增依赖）
- [x] `lucide-react`（图标，island 同款）
- [x] `clsx` + `tailwind-merge`（`cn()` 工具，island 同款）

## 二、工程初始化

- [x] Vite + React + TS 脚手架（`ai-usage-website/` 根目录）
- [x] `tsconfig.json`（`@/*` 路径别名，对齐 island 写法）
- [x] Tailwind CSS 4 接入（`@tailwindcss/vite` + `@import "tailwindcss"`）
- [x] 目录结构：`src/pages/`、`src/components/`、`src/lib/`
- [x] 字体本地分发：Inter + JetBrains Mono（`@font-face` 照搬 island），中文回退 Microsoft YaHei UI

## 三、设计令牌与主题

- [x] `src/index.css` 落地画布双主题变量（`:root` 浅色 / `.dark` 深色，逐项取自 website.pen 变量）：
  bg `#FFFFFF/#0D0D0D`、surface `#FFFFFF/#181818`、surface-2 `#F7F7F8/#1F1F1F`、
  text `#111111/#F5F5F5` 系、accent `#2563EB/#4F86F7`、accent-soft `#EAF0FE/#16263F`、
  语义色 success / warn / danger / purple、border `#E8E8E8/#292929`、track、chart-grid 等
- [x] 圆角令牌：card 14 / island 18 / btn 8
- [x] `useTheme` hook：`<html>.dark` class 切换 + `localStorage` 持久化 + 跟随系统（照搬 island `App.tsx` 思路）
- [x] 导航栏「主题切换」按钮：浅色显月亮 / 深色显太阳（对应画布 `Button / 主题切换` 与深色预览条）

## 四、公共组件

- [x] `Navbar`：CC Usage 品牌（App 图标：白底板 + 深色岛胶囊 + 绿色水位条）+ 首页/文档/更新日志/赞助商 + 主题切换/GitHub/语言 + 「免费下载」CTA
- [x] 路由高亮：当前页导航项深色文字（对应画布 `descendants` 覆盖逻辑）
- [x] `Footer`：品牌栏 + 产品/资源/社区/关于四列 + 分隔线 + 版权行
- [x] 通用样式件：主/次按钮、徽章（Chip）、卡片、区块标题（SectionHeading）

## 五、页面（对照画布逐区实现）

- [x] **首页**：Hero（v0.1.0 徽章、大标题、双 CTA、三 meta）
- [x] 首页：灵动岛展示区（第一卖点：展开态大图 + 收缩态 + 停靠条 + 4 功能点卡）
- [x] 首页：主面板展示区（第二：窗口 mock，含订阅额度条 + Token 统计）
- [x] 首页：数据一览（2 / 7 / 100% / 0 四个数字）
- [x] 首页：核心能力 6 卡
- [x] 首页：界面一览（Token 趋势图 SVG + 请求日志表格，图例色用 chart 令牌）
- [x] 首页：技术栈区（数据路径代码卡 + 技术标签）
- [x] 首页：八平台支持卡（Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder、Workbuddy）+ 额度服务商 9 卡
- [x] 首页：FAQ 6 条 + 三步上手 + 底部 CTA
- [x] **免费下载页**：Windows 主卡（推荐徽章 + 下载按钮）+ macOS/Linux 敬请期待 + 安装三步 + 系统要求 + 版本信息
- [x] **文档页**：左侧分组侧边栏 + 简介（面包屑/代码卡/提示框/翻页）+ 本页目录 + 「接下来」卡
- [x] **更新日志页**：订阅按钮行 + v0.1.0 时间线（新功能/其他）+ 路线图卡
- [x] **赞助商页**：金牌/普通「虚位以待」占位 + 「成为赞助商」卡片

## 六、收尾

- [x] 路由接线：`/`、`/docs`、`/changelog`、`/sponsors`、`/download` 五条 + 404
- [ ] 下载按钮接真实 GitHub Releases 地址（当前为占位 `github.com/cc-usage/cc-usage/releases`，集中在 `src/components/Navbar.tsx` 的 `GITHUB_URL` 常量）
- [ ] 响应式补完：网格降列已做，移动端导航折叠（汉堡菜单）未做
- [ ] SEO 补完：`index.html` 已有全站 title/description，各页路由级 title / OG 标签未做
- [x] 浅深双主题全页走查（对照深色列画板，一键切换已验证）
- [ ] 构建部署（GitHub Pages / Vercel / Cloudflare Pages 任选；`pnpm build` 已通过，产物在 `dist/`）
