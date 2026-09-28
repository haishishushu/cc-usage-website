**官网：[https://haishishushu.github.io/cc-usage-website/](https://haishishushu.github.io/cc-usage-website/)**

<div align="center">

# CC Usage Website

**CC Usage 官方网站、使用文档与版本下载入口。**

展示桌面灵动岛与主面板，提供中文 / English、图文教程、更新日志及 Windows、macOS、Linux 下载入口。

[访问官网](https://haishishushu.github.io/cc-usage-website/) · [使用文档](https://haishishushu.github.io/cc-usage-website/#/docs) · [下载应用](https://haishishushu.github.io/cc-usage-website/#/download) · [桌面应用源码](https://github.com/haishishushu/cc-usage)

</div>

## 项目定位

本仓库维护 CC Usage 的展示网站。桌面应用的窗口管理、数据采集、连接、额度查询和安装包发行由独立的 [cc-usage](https://github.com/haishishushu/cc-usage) 仓库维护。

官网中的可交互桌面预览由真实桌面前端构建，使用浏览器示例数据，不读取访客的本机凭证与会话记录。文档图片展示操作与布局，图片中的数值不代表实际账户用量。

## 目录

- [页面与功能](#页面与功能)
- [本地启动](#本地启动)
- [常用命令](#常用命令)
- [项目结构](#项目结构)
- [内容与双语维护](#内容与双语维护)
- [桌面预览维护](#桌面预览维护)
- [下载与更新日志维护](#下载与更新日志维护)
- [构建与部署](#构建与部署)
- [验证与常见问题](#验证与常见问题)
- [协作与相关链接](#协作与相关链接)
- [Community 社区](#community-社区)
- [Star History](#star-history)

## 页面与功能

| 页面 | 中文路由 | 英文路由 | 内容 |
| --- | --- | --- | --- |
| 首页 | `#/` | `#/en` | 产品介绍、灵动岛自动演示、主面板、平台与服务商能力 |
| 下载 | `#/download` | `#/en/download` | 系统与架构对应的安装包入口，读取线上更新清单 |
| 文档 | `#/docs` | `#/en/docs` | 入门、功能与操作说明，目录导航和可关闭的大图预览 |
| 文档详情 | `#/docs/:slug` | `#/en/docs/:slug` | 指定文章，例如 `first-run` |
| 更新日志 | `#/changelog` | `#/en/changelog` | 逐版本说明、来源提交、独立发行页与版本索引 |
| 赞助商 | `#/sponsors` | `#/en/sponsors` | 赞助相关展示 |

- **默认中文**：语言切换会保留对应页面，并在浏览器保存选择；再次进入首页时可恢复英文偏好。
- **明暗主题**：网站与嵌入的桌面预览同步主题。
- **双语预览**：网站文字和桌面预览中的可翻译文字随语言切换，截图本身不翻译。
- **动效**：首页灵动岛自动切换展示状态；相关动效尊重系统的减少动态效果偏好。
- **图文教程**：点击文档图片在站内放大，可通过关闭按钮、Esc 或遮罩退出。

## 本地启动

### 1. 准备环境和源码

发布流水线使用 **Node.js 22、pnpm 10**。本仓库是 React + TypeScript + Vite 静态前端，构建官网无需编译 Rust 后端，但需要桌面应用的前端源码和依赖。

推荐将两个仓库放在同一父目录：

```text
workspace/
├─ cc-usage/
│  └─ frontend/          桌面应用真实前端
└─ cc-usage-website/     当前仓库
```

若尚未克隆，在父目录执行：

```bash
git clone https://github.com/haishishushu/cc-usage.git
git clone https://github.com/haishishushu/cc-usage-website.git
cd cc-usage-website
```

### 2. 安装依赖并生成桌面预览

以下命令均在 `cc-usage-website` 根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm --dir ../cc-usage/frontend install --frozen-lockfile
pnpm build:desktop-preview
pnpm dev
```

打开 [http://localhost:5174/cc-usage-website/](http://localhost:5174/cc-usage-website/)。当前配置固定使用端口 `5174`，端口被占用时会报错，不会自动换端口。

`pnpm dev` 只启动官网开发服务器，不会自动生成桌面预览。因此首次启动前需要执行 `pnpm build:desktop-preview`。

### 3. 桌面源码不在相邻目录时

用 `CC_USAGE_FRONTEND_DIR` 指定桌面仓库的 **frontend 目录**，不是仓库根目录。先在该目录安装依赖，再构建预览。

PowerShell 示例（将路径替换成实际位置）：

```powershell
$env:CC_USAGE_FRONTEND_DIR = 'D:/projects/cc-usage/frontend'
pnpm build:desktop-preview
pnpm dev
```

macOS / Linux shell 示例：

```bash
export CC_USAGE_FRONTEND_DIR=/path/to/cc-usage/frontend
pnpm build:desktop-preview
pnpm dev
```

该变量由 Node 构建脚本读取，需在当前 shell 或 CI 环境中设置；不要以为写入 Vite 的 `.env` 就会被此脚本自动加载。

## 常用命令

| 命令 | 用途与前提 |
| --- | --- |
| `pnpm dev` | 启动官网开发服务器；首次使用先生成桌面预览 |
| `pnpm build:desktop-preview` | 读取桌面源码，重新生成 `public/desktop-preview/` |
| `pnpm typecheck` | 检查网站 TypeScript 类型 |
| `pnpm test` | 运行当前平台与发行数据相关的 Node 测试 |
| `pnpm build` | 依次构建桌面预览、检查类型、构建官网，输出到 `dist/` |
| `pnpm preview` | 本地预览已生成的 `dist/`，访问地址以终端输出为准 |

`pnpm build` 不会自动执行 `pnpm test`；线上工作流会先运行测试，再构建。

## 项目结构

```text
cc-usage-website/
├─ src/
│  ├─ pages/                 首页、下载、文档、更新日志、赞助商页面
│  ├─ components/            导航、页脚、真实前端 iframe 与演示组件
│  ├─ docs/
│  │  ├─ docs.ts             中文文档内容
│  │  └─ docs.en.ts          英文文档内容
│  ├─ i18n/                  首页、下载、更新日志、预览的英文映射
│  ├─ lib/                   语言、主题、平台、版本与下载数据逻辑
│  ├─ assets/                平台和服务商图标
│  ├─ App.tsx                中英文页面路由
│  └─ index.css              全局样式与主题
├─ public/
│  ├─ docs/                  文档截图
│  ├─ desktop-captures/      桌面展示素材
│  ├─ desktop-preview/       自动生成的真实前端预览，不纳入 Git
│  ├─ fonts/                 本地字体
│  ├─ og-cover.png           分享封面
│  ├─ robots.txt             搜索爬虫配置
│  └─ sitemap.xml            站点地图
├─ scripts/
│  └─ build-desktop-preview.mjs
├─ .github/workflows/pages.yml
├─ vite.config.ts           基础路径、端口与构建配置
└─ dist/                    官网构建产物，不纳入 Git
```

技术栈：**React 19 · TypeScript · Vite · React Router · Tailwind CSS 4 · Lucide React**。

## 内容与双语维护

### 页面文字

语言状态与带语言前缀的链接封装位于 [locale.tsx](./src/lib/locale.tsx)。新增页面文字时，同步提供中英文；站内链接优先使用这里导出的 `Link` / `NavLink`，以保留当前语言。

| 内容 | 主要维护位置 |
| --- | --- |
| 首页 | `src/pages/Home.tsx`、`src/i18n/home.ts` |
| 下载页 | `src/pages/Download.tsx`、`src/i18n/download.ts` |
| 文档 | `src/docs/docs.ts`、`src/docs/docs.en.ts` |
| 更新日志 | `src/pages/Changelog.tsx`、`src/i18n/changelog.ts` |
| 桌面预览翻译 | `src/i18n/preview.ts`、`src/i18n/preview-extra.ts` |
| 导航、页脚与通用文字 | 对应组件及 `useText` 调用 |

字典查不到英文时会回退原文，因此新增中文后要实际检查英文页面，避免遗漏翻译。图片可以保留原界面，但图片说明、按钮提示和无障碍标签仍应提供对应语言。

### 新增或修改教程

1. 在中英文文档文件中维护对应文章，保持 `slug` 和章节锚点一致。
2. 按“前提 → 操作步骤 → 完成状态 → 常见异常”组织内容。
3. 将截图放到 `public/docs/`，内容中使用 `docs/文件名.png` 这类相对资源路径，并提供图片说明。
4. 通过现有图片内容块展示，复用站内大图预览，不将教程图片直接链接成无法返回的阅读流程。
5. 检查中文、英文页面的目录跳转、图片放大与关闭。

示例截图：[主面板总览](./public/docs/panel-overview.png)、[连接管理](./public/docs/panel-settings.png)。涉及账号或授权时，截图必须隐藏凭证；示例数据应明确其展示用途。

## 桌面预览维护

真实预览由 [构建脚本](./scripts/build-desktop-preview.mjs) 调用桌面前端的 Vite 生成，再由 [ActualFrontendFrame](./src/components/ActualFrontendFrame.tsx) 嵌入。

```text
cc-usage/frontend 源码 + 浏览器示例数据
                  ↓ build:desktop-preview
public/desktop-preview/
                  ↓ iframe、主题同步、翻译、自动演示
官网首页
                  ↓ pnpm build
dist/desktop-preview/
```

- 桌面组件修改后，重新执行 `pnpm build:desktop-preview`，刷新官网查看效果。
- 不要直接修改生成目录；下次构建会清空并重新生成。
- 官网嵌入层处理主题、翻译和演示状态，真实桌面组件本身在桌面仓库维护。
- 修改嵌入层样式或自动播放时，检查收缩、展开、停靠及窄屏状态，避免 iframe 高度不足导致内容被裁切。
- 新增桌面文字后，同时检查预览翻译映射是否需要补齐。

## 下载与更新日志维护

### 当前版本下载

[version.ts](./src/lib/version.ts) 集中保存桌面仓库地址、网站地址、更新清单地址与内置回退版本。[useLatestRelease.ts](./src/lib/useLatestRelease.ts) 在运行时读取桌面应用的更新清单：

```text
桌面应用 latest.json
       ↓ 解析版本及资源 URL
当前版本 + 下载基址
       ↓ 按发布文件命名规则
各系统安装包链接
```

- 正常情况下，线上清单决定当前下载版本；官网 `package.json` 的版本不是桌面应用发行版本。
- 清单不可用时会采用 `APP_VERSION` 等内置回退值。维护时应确认回退版本的安装包仍存在，不能把回退值当作已确认的线上最新版本。
- 桌面发布流程若更改文件命名，要同步检查官网安装包 URL 生成逻辑及相关测试。
- 官网负责展示和链接，不负责构建或上传桌面安装包。

### 逐版本更新记录

更新日志有两部分：**手工维护的详细说明**和**从 GitHub 获取的版本索引**。版本索引出现新版本，不代表对应的详细说明已经自动补齐。

新增一版说明时：

1. 核对桌面仓库实际发布的版本、日期和来源提交。
2. 在 `src/pages/Changelog.tsx` 的 `RELEASES` 中新增条目，保留历史条目。
3. 填写摘要、功能或修复分组、来源提交及该版本的独立发行链接。
4. 在 `src/i18n/changelog.ts` 补齐英文说明。
5. 验证链接指向 `/releases/tag/vX.Y.Z`，不能把所有历史条目指向 `latest` 或 `continuous`。

版本索引请求失败时仍保留 GitHub Releases 入口。不要用未验证的功能描述补足历史记录。

## 构建与部署

### 本地检查产物

```bash
pnpm test
pnpm build
pnpm preview
```

`dist/` 是最终静态站点，包含文档图片和构建后的桌面预览。

### GitHub Pages

[pages.yml](./.github/workflows/pages.yml) 在推送到 `main` 或手动触发时执行：

1. 检出官网仓库和 `haishishushu/cc-usage` 桌面仓库。
2. 安装 Node.js 22、pnpm 10 及两个前端的依赖。
3. 设置 `CC_USAGE_FRONTEND_DIR` 指向检出的桌面前端。
4. 执行测试和完整构建。
5. 上传 `dist/` 并部署到 GitHub Pages。

仓库的 Pages 部署来源应设置为 GitHub Actions。当前工作流没有固定桌面源码的提交，构建时会读取桌面仓库默认分支；桌面前端变更也可能影响官网预览。

### 更换部署地址

当前站点基础路径为 `/cc-usage-website/`，页面使用 HashRouter。迁移到自定义域名或其他子路径时，需要一起核对：

- `vite.config.ts` 的 `base`；
- 桌面预览脚本中的 `--base`；
- `src/lib/version.ts` 的站点与资源地址；
- `index.html`、`public/sitemap.xml`、`public/robots.txt` 的公开地址；
- 文档、iframe 和其他资源引用。

只修改官网 Vite 的 `base` 可能导致桌面预览资源失效。

## 验证与常见问题

内容修改后，优先做相应页面的针对性检查；涉及共享组件、路由或下载逻辑时再运行相关测试与构建。

### 发布前检查

- 中英文页面文字、标题、提示和站内链接对应正确。
- 首页灵动岛各状态完整可见，移动端无横向溢出。
- 文档图片可打开、可退出，目录锚点可跳转。
- 最新下载与历史版本链接指向正确版本和系统。
- 明暗主题及减少动态效果模式下内容仍可读。

### 首页桌面预览空白或报 404

先执行 `pnpm build:desktop-preview`，检查 `public/desktop-preview/index.html` 是否生成。若脚本报路径无效，确认 `CC_USAGE_FRONTEND_DIR` 指向桌面前端，且其中依赖已经安装。

### 桌面源码改了，官网预览没变化

官网开发服务器不会实时构建另一个仓库。重新生成桌面预览，再刷新浏览器；不要手动改生成文件。

### 端口 5174 被占用

确认占用端口的进程。当前 `strictPort` 为 true；可关闭自己不再使用的开发服务，或明确指定其他端口，并按终端地址访问。

### 英文页面还出现中文

检查页面是否使用语言函数、字典是否完整、文档英文内容是否同步。真实前端预览还需要检查两份预览映射；图片中的中文不会自动替换。

### 版本列表有新版，但详细日志没有

版本索引从 GitHub 获取，详细日志人工维护。按“逐版本更新记录”步骤补充该版及英文说明。

### 最新下载版本显示较旧

查看更新清单请求是否成功。如果正在使用内置回退版本，先排查网络与桌面发布清单，不要仅修改网站包版本号。

## 协作与相关链接

- [官网](https://haishishushu.github.io/cc-usage-website/) · [桌面应用源码](https://github.com/haishishushu/cc-usage) · [桌面发行记录](https://github.com/haishishushu/cc-usage/releases)
- [官网问题反馈](https://github.com/haishishushu/cc-usage-website/issues)：提供页面地址、语言、主题、窗口尺寸、复现步骤和截图。
- 修改内容时同步中英文；新增资源使用可追溯的来源，避免提交凭证、真实账户数据和本地调试产物。
- 本仓库目前未提供独立 LICENSE 文件，不能直接将桌面项目的许可证说明视为本仓库的授权文件。

## Community 社区

[linux.do](https://linux.do/) - A thriving developer community.

## Star History

<a href="https://www.star-history.com/?repos=haishishushu%2Fcc-usage-website&amp;type=date&amp;legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=haishishushu/cc-usage-website&amp;type=date&amp;legend=top-left&amp;theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=haishishushu/cc-usage-website&amp;type=date&amp;legend=top-left" />
    <img alt="CC Usage Website Star History" src="https://api.star-history.com/chart?repos=haishishushu/cc-usage-website&amp;type=date&amp;legend=top-left" width="100%" />
  </picture>
</a>
