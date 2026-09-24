/**
 * 文档内容 —— 全部取自 ai-usage-island 的 README 与真实功能，
 * 命令、路径、端口、行为描述均与桌面端实际一致，不含虚构数据。
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string; id: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; label?: string; lines: { cmd: string; comment?: string }[] }
  | { t: "callout"; tone?: "info" | "warn"; title: string; text: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "steps"; items: { title: string; desc: string }[] }

export type Doc = {
  slug: string
  group: string
  title: string
  subtitle: string
  toc: { label: string; id: string }[]
  blocks: Block[]
}

export const DOCS: Doc[] = [
  {
    slug: "intro",
    group: "快速开始",
    title: "简介",
    subtitle: "从安装到进阶，看懂 CC Usage 的每一个角落。",
    toc: [
      { label: "概述", id: "overview" },
      { label: "核心能力", id: "capabilities" },
      { label: "技术栈", id: "stack" },
    ],
    blocks: [
      { t: "h2", text: "概述", id: "overview" },
      {
        t: "p",
        text: "CC Usage 是一款 Windows 桌面 AI 用量监控工具：常驻灵动岛 + 完整主面板，统一管理 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy。各平台按真实可用来源展示连接、会话、Token、缓存、积分或额度，所有采集结果都存放在本机。",
      },
      { t: "h2", text: "核心能力", id: "capabilities" },
      {
        t: "ul",
        items: [
          "灵动岛常驻——四边吸附、双击展开、停靠条，额度水位不切窗即可见",
          "多平台本机来源——按各工具真实格式读取会话、用量、缓存或积分，增量采集并去重",
          "统计与请求日志——今日 / 本周 / 本月 / 累计口径，趋势图与分页日志联动筛选",
          "编程套餐额度直连——智谱 GLM、Kimi、MiniMax、ZenMux、OpenCode Go、火山方舟、Grok",
        ],
      },
      { t: "h2", text: "技术栈", id: "stack" },
      {
        t: "p",
        text: "桌面端基于 Tauri 2 构建：Rust 负责窗口、托盘、会话采集与 SQLite 只读查询；前端使用 React 19 + TypeScript + Vite + Tailwind CSS 4 + shadcn/ui。安装向导为中文 NSIS 界面。",
      },
      {
        t: "callout",
        tone: "info",
        title: "准备好了？",
        text: "前往「免费下载」页获取安装包，或继续阅读「安装与运行」从源码启动。",
      },
    ],
  },
  {
    slug: "installation",
    group: "快速开始",
    title: "安装与运行",
    subtitle: "两种方式：下载安装包，或从源码运行，两分钟装好 Claude Code 用量监控。",
    toc: [
      { label: "前置要求", id: "prereq" },
      { label: "从安装包安装", id: "installer" },
      { label: "从源码运行", id: "source" },
      { label: "常见问题", id: "faq" },
    ],
    blocks: [
      { t: "h2", text: "前置要求", id: "prereq" },
      {
        t: "ul",
        items: [
          "Windows 10 及以上版本，x64 架构",
          "WebView2 运行时（Windows 11 自带；安装向导会自动处理引导）",
          "从源码运行桌面端需要 Rust 工具链与 pnpm；只看界面则不需要 Rust",
        ],
      },
      { t: "h2", text: "从安装包安装（推荐）", id: "installer" },
      {
        t: "steps",
        items: [
          { title: "下载安装包", desc: "在「免费下载」页获取 CCUsage_x64-setup.exe，约 8 MB。" },
          { title: "运行安装向导", desc: "中文 NSIS 向导一路下一步，欢迎页与完成页均由项目内的 installer-art 生成。" },
          { title: "启动", desc: "从开始菜单或桌面启动；打包产物位于 backend/target/release/bundle/nsis/。" },
        ],
      },
      { t: "h2", text: "从源码运行", id: "source" },
      {
        t: "p",
        text: "只看界面（不需要 Rust）：前端预览模式提供 主面板 / 灵动岛 / 画布对照 三个视图，数据为设计示例。",
      },
      {
        t: "code",
        label: "终端 · 只看界面",
        lines: [
          { cmd: "pnpm --dir frontend install", comment: "# 安装前端依赖" },
          { cmd: "pnpm --dir frontend dev", comment: "# http://localhost:5173" },
        ],
      },
      {
        t: "p",
        text: "启动完整桌面端需要 Rust 工具链：从 rustup.rs 下载 rustup-init.exe 并按默认选项安装，装完必须重开终端让 PATH 生效，然后用 rustc --version 验证。首次编译 Rust 依赖需要 3–10 分钟，之后增量编译很快。",
      },
      {
        t: "code",
        label: "终端 · 桌面端",
        lines: [
          { cmd: "pnpm install", comment: "# 仓库根目录，安装 Tauri CLI" },
          { cmd: "pnpm tauri dev", comment: "# 自动先起 Vite，再编译 Rust 并拉起桌面窗口" },
        ],
      },
      { t: "h2", text: "常见问题", id: "faq" },
      {
        t: "table",
        head: ["现象", "原因与处理"],
        rows: [
          ["'tauri' 不是内部或外部命令", "尚未安装根目录的 Tauri CLI，先在仓库根目录跑一次 pnpm install。"],
          ["rustc: not installed", "按上文安装 Rust，装完必须重开终端。"],
          ["首次 pnpm tauri dev 卡很久", "正常。Rust 在编译几百个依赖，只有第一次慢。"],
          ["EACCES: permission denied 绑不上端口", "Windows 会保留若干端口段，可用 netsh interface ipv4 show excludedportrange protocol=tcp 查询；改 frontend/vite.config.ts 的 server.port 与 backend/tauri.conf.json 的 devUrl，两处保持一致。"],
        ],
      },
    ],
  },
  {
    slug: "first-run",
    group: "快速开始",
    title: "首次配置",
    subtitle: "三步完成：选平台、加连接、开灵动岛。",
    toc: [
      { label: "选择平台", id: "platform" },
      { label: "添加连接", id: "connection" },
      { label: "开启灵动岛", id: "island" },
    ],
    blocks: [
      { t: "h2", text: "选择平台", id: "platform" },
      {
        t: "p",
        text: "主面板右上角可在 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy 之间切换。平台的连接、来源与统计相互独立；界面只展示该平台真实提供的字段。",
      },
      { t: "h2", text: "添加连接", id: "connection" },
      {
        t: "p",
        text: "点击「添加连接」后先选择平台与连接方式。Claude / Codex 支持官方 Auth 与 API 连接；Gemini / Grok 支持已经验证的本机或官方 Key 来源；Zcode、Trae、Qoder、Workbuddy 从各自本机应用来源发现连接。界面会明确区分本机读取、远程验证与尚无可用额度来源。",
      },
      {
        t: "callout",
        tone: "info",
        title: "读取凭证需要什么权限？",
        text: "本机来源只读取所选平台的配置或数据文件；需要远程检测时，凭证仅发送到该平台或鼠鼠明确配置的服务地址，不会上传到 CC Usage 自有服务器。",
      },
      { t: "h2", text: "开启灵动岛", id: "island" },
      {
        t: "p",
        text: "在设置或托盘菜单中开启灵动岛。小岛默认以收缩态常驻桌面，双击展开查看当前平台明细；拖到屏幕任意边缘会自动吸附。主面板关闭只是隐藏到托盘，左键托盘图标即可唤回。",
      },
    ],
  },
  {
    slug: "panel",
    group: "使用指南",
    title: "主面板",
    subtitle: "总览、设置与窗口行为。",
    toc: [
      { label: "总览", id: "overview" },
      { label: "设置", id: "settings" },
      { label: "窗口行为", id: "window" },
    ],
    blocks: [
      { t: "h2", text: "总览", id: "overview" },
      {
        t: "ul",
        items: [
          "连接行：显示当前平台与当前连接，可快速添加或切换连接",
          "订阅额度卡：5 小时 / 7 天窗口的已用百分比、进度条与重置倒计时，右上角显示额度来源",
          "本地 Token 统计：真实消耗 Token 总量、新增输入 / 输出 / 缓存创建 / 缓存命中分项、请求数与缓存命中率",
          "时间范围：今日 / 本周 / 本月 / 累计 / 自定义时间，趋势图与请求日志共用同一套筛选",
        ],
      },
      { t: "h2", text: "设置", id: "settings" },
      {
        t: "p",
        text: "设置页提供主题（浅色 / 深色 / 跟随系统）、灵动岛开关、刷新间隔等偏好项。保存后立即生效并持久化。",
      },
      { t: "h2", text: "窗口行为", id: "window" },
      {
        t: "p",
        text: "关闭主面板只是隐藏窗口、进程继续在后台采集；点击系统托盘图标可随时唤回。这样统计不会因为关窗口而中断。",
      },
    ],
  },
  {
    slug: "island",
    group: "使用指南",
    title: "灵动岛",
    subtitle: "桌面角落的用量仪表台。",
    toc: [
      { label: "形态", id: "forms" },
      { label: "拖动与吸附", id: "drag" },
      { label: "刷新反馈", id: "refresh" },
    ],
    blocks: [
      { t: "h2", text: "形态", id: "forms" },
      {
        t: "ul",
        items: [
          "收缩态（默认）：单行胶囊，显示当前平台与两根水位条",
          "展开态：双击切换，按当前平台展示可用的额度、Token 或积分明细",
          "停靠条：贴边后缩为一条细带，只保留最关键的水位",
        ],
      },
      { t: "h2", text: "拖动与吸附", id: "drag" },
      {
        t: "p",
        text: "按住小岛拖动，靠近屏幕四边会自动吸附；位置会被记忆，下次启动恢复。灵动岛是无边框透明窗口，常驻不抢焦点，不会打断当前工作。",
      },
      { t: "h2", text: "刷新反馈", id: "refresh" },
      {
        t: "p",
        text: "每次刷新会有一道斜向柔光掠过整卡（收缩态、展开态与停靠条同一道光、同一节奏）。开启勿扰模式后动效会静音，仅保留水位变化。",
      },
      {
        t: "callout",
        tone: "info",
        title: "托盘一键开关",
        text: "托盘菜单可随时隐藏或唤回灵动岛，无需进入设置页。",
      },
    ],
  },
  {
    slug: "connections",
    group: "使用指南",
    title: "连接与额度",
    subtitle: "八个平台的本机来源、Auth / API 连接与额度服务商。",
    toc: [
      { label: "连接方式", id: "methods" },
      { label: "支持的平台", id: "platforms" },
      { label: "支持的服务商", id: "providers" },
      { label: "额度窗口", id: "windows" },
    ],
    blocks: [
      { t: "h2", text: "连接方式", id: "methods" },
      {
        t: "ul",
        items: [
          "Auth / 本机来源：按平台读取已登录应用的连接或本机数据，不复制第三方会话正文",
          "API：填入服务商 base_url 与密钥，适合中转或编程套餐",
        ],
      },
      { t: "h2", text: "支持的平台", id: "platforms" },
      {
        t: "table",
        head: ["平台", "当前可用来源"],
        rows: [
          ["Claude", "官方订阅、API、本地会话、Token、缓存与额度"],
          ["Codex", "官方订阅、API、本地会话、Token、缓存与额度"],
          ["Gemini", "本机 Gemini CLI 会话与实时用量；在线订阅额度暂不宣称"],
          ["Grok", "本机 OAuth 积分额度；本机会话来源暂不宣称"],
          ["Zcode", "本机会话、用量与缓存；账户剩余额度暂不宣称"],
          ["Trae", "本机来源检测与连接管理"],
          ["Qoder", "国内／国际版本的本机会话、Token 与积分"],
          ["Workbuddy", "本机会话、用量、缓存与积分"],
        ],
      },
      { t: "h2", text: "支持的服务商", id: "providers" },
      {
        t: "p",
        text: "编程套餐额度查询与 cc-switch 全量对齐，按连接的 base_url 域名自动识别服务商：",
      },
      {
        t: "table",
        head: ["服务商", "说明"],
        rows: [
          ["Claude / Codex 官方", "Auth 连接，账号额度接口直连查询"],
          ["智谱 GLM", "个人 / 国际 / 团队"],
          ["Kimi", "编程套餐"],
          ["MiniMax", "编程套餐"],
          ["ZenMux", "编程套餐"],
          ["OpenCode Go", "编程套餐"],
          ["火山方舟", "编程套餐"],
          ["Grok", "编程套餐"],
        ],
      },
      { t: "h2", text: "额度窗口", id: "windows" },
      {
        t: "p",
        text: "服务商真实返回的 5 小时 / 周 / 月窗口会展示在额度卡与灵动岛上，包括已用百分比与重置时间。若平台没有公开或经过验证的额度来源，界面会说明限制，不填默认额度，也不会把旧数据冒充刚同步的结果。",
      },
    ],
  },
  {
    slug: "stats",
    group: "使用指南",
    title: "统计与请求日志",
    subtitle: "Token 用量、费用口径、分项明细与逐条请求日志的联动筛选。",
    toc: [
      { label: "统计口径", id: "ranges" },
      { label: "趋势图", id: "chart" },
      { label: "请求日志", id: "logs" },
    ],
    blocks: [
      { t: "h2", text: "统计口径", id: "ranges" },
      {
        t: "p",
        text: "统计提供 今日 / 本周 / 本月 / 累计 与自定义时间范围。Token 分为新增输入、输出、缓存创建、缓存命中四项分别计量；缓存命中通常占比最高且近乎免费，越省越绿。",
      },
      { t: "h2", text: "趋势图", id: "chart" },
      {
        t: "p",
        text: "趋势图按小时或按日分组，上格为 Token 用量、下格为按价目表估算的费用。两组共用同一时间轴；切换周期后趋势图与请求日志同步刷新。",
      },
      { t: "h2", text: "请求日志", id: "logs" },
      {
        t: "table",
        head: ["列", "说明"],
        rows: [
          ["时间", "请求完成时刻，精确到秒"],
          ["计费模型", "该次请求实际计费的模型名"],
          ["思考强度", "extended thinking 档位（low / medium / high）"],
          ["输入 / 输出", "该次请求的 Token 计量"],
          ["总成本", "依价目表估算，无价目时显示估算标记"],
          ["用时 / 首字", "总耗时与首字延迟"],
          ["状态", "200 / 429 / 500 等结果，异常一眼定位"],
        ],
      },
      {
        t: "callout",
        tone: "info",
        title: "联动筛选",
        text: "自定义时间范围与模型筛选对趋势图、请求日志同时生效，两边数据严格同源。",
      },
    ],
  },
  {
    slug: "data-sources",
    group: "数据与隐私",
    title: "数据来源",
    subtitle: "会话从哪里来，如何去重。",
    toc: [
      { label: "采集目录", id: "dirs" },
      { label: "增量与去重", id: "dedupe" },
    ],
    blocks: [
      { t: "h2", text: "采集目录", id: "dirs" },
      {
        t: "ul",
        items: [
          "Claude / Codex / Gemini：读取各自 CLI 的本机会话与授权来源",
          "Zcode / Qoder / Workbuddy：读取各自真实任务、会话或原生数据库来源",
          "Grok：读取本机 OAuth 积分来源；Trae：检测本机来源",
          "Qoder 国内版与国际版分别采集，不合并为同一来源",
        ],
      },
      { t: "h2", text: "增量与去重", id: "dedupe" },
      {
        t: "p",
        text: "采集按平台格式增量进行：JSONL 追加、快照更新与原生 SQLite 来源分别保存游标和稳定标识，重复事件不会重复计数。Token、积分、金额与上下文占用保留各自单位，不能相互冒充。采集过程只读，不修改第三方数据。",
      },
      {
        t: "callout",
        tone: "warn",
        title: "设计示例说明",
        text: "官网首页主面板中的数字为设计示例；桌面端运行时展示的是本机真实统计。",
      },
    ],
  },
  {
    slug: "storage",
    group: "数据与隐私",
    title: "本地存储",
    subtitle: "SQLite 数据库与 Schema 迁移。",
    toc: [
      { label: "存储位置", id: "location" },
      { label: "Schema 迁移", id: "migration" },
    ],
    blocks: [
      { t: "h2", text: "存储位置", id: "location" },
      {
        t: "p",
        text: "配置与统计存放在本机 SQLite 数据库（Windows 下位于系统应用数据目录的 cc-usage 文件夹内）。数据库只被本机进程读写。",
      },
      { t: "h2", text: "Schema 迁移", id: "migration" },
      {
        t: "p",
        text: "内置完整的 Schema 迁移：升级版本后首次启动会自动把旧表结构迁移到新版本，统计口径与请求日志不会丢失。卸载软件不会自动删除数据库，重装后数据仍在。",
      },
    ],
  },
  {
    slug: "privacy",
    group: "数据与隐私",
    title: "隐私说明",
    subtitle: "数据不出本机，开源可审计。",
    toc: [
      { label: "不上传", id: "no-upload" },
      { label: "只读采集", id: "read-only" },
      { label: "开源审计", id: "audit" },
    ],
    blocks: [
      { t: "h2", text: "不上传", id: "no-upload" },
      {
        t: "p",
        text: "CC Usage 没有账号体系，也没有自有数据上传通道。会话记录、统计结果与配置全部留在本机；远程请求仅用于鼠鼠主动配置的服务连接、平台额度查询与应用更新。",
      },
      { t: "h2", text: "只读采集", id: "read-only" },
      {
        t: "p",
        text: "对八个平台的本机会话、配置或原生数据库来源只做读取，不迁移、不修改第三方数据，也不代理正常请求。外部工具配置只有在鼠鼠明确点击「启用」且该平台支持可靠切换时才会写入，并在写入前备份。",
      },
      { t: "h2", text: "开源审计", id: "audit" },
      {
        t: "p",
        text: "项目基于 MIT 协议开源，以上承诺都可以在源码里逐行验证；欢迎社区审计与反馈。",
      },
    ],
  },
]

/** 文档分组（保持 DOCS 顺序） */
export const DOC_GROUPS: { group: string; docs: Doc[] }[] = DOCS.reduce<{ group: string; docs: Doc[] }[]>((acc, d) => {
  const found = acc.find((g) => g.group === d.group)
  if (found) found.docs.push(d)
  else acc.push({ group: d.group, docs: [d] })
  return acc
}, [])

export function getDoc(slug: string | undefined) {
  return DOCS.find((d) => d.slug === slug)
}
