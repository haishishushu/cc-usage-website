/**
 * 文档内容 —— 依据 cc-usage 的界面、README 与实现维护，
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
  | { t: "image"; src: string; alt: string; caption: string }

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
        text: "CC Usage 是一款支持 Windows、macOS 和 Linux 的桌面 AI 用量监控工具：灵动岛显示当前用量，主面板用于查看统计、日志和连接。它支持 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy；每个平台只展示实际取得的会话、Token、缓存、积分或额度字段。采集结果存放在本机。",
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
        text: "桌面端基于 Tauri 2 构建：Rust 负责窗口、托盘、会话采集与本机 SQLite 存储；前端使用 React 19、TypeScript、Vite 与 Tailwind CSS 4。Windows 提供中文 NSIS 安装向导，其他系统提供对应安装包。",
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
    slug: "features",
    group: "快速开始",
    title: "完整功能与支持范围",
    subtitle: "按桌面端现有能力梳理每个入口、数据口径与限制。首页嵌入真实前端组件，数字为设计示例。",
    toc: [
      { label: "桌面入口", id: "desktop" },
      { label: "平台与连接", id: "platforms" },
      { label: "额度与统计", id: "usage" },
      { label: "日志与代理", id: "logs" },
      { label: "设置与数据", id: "settings" },
      { label: "演示边界", id: "demo" },
    ],
    blocks: [
      { t: "h2", text: "桌面入口", id: "desktop" },
      {
        t: "table",
        head: ["入口", "可用功能"],
        rows: [
          ["灵动岛", "收缩 / 双击展开、当前连接与额度、运行会话、今日 Token、连接切换、四边吸附与停靠、位置记忆；右键菜单可开启 / 销毁分身，每个分身独立选连接与停靠"],
          ["系统托盘", "左键打开主面板；右键菜单打开主面板、切换连接、调整位置与偏好；悬停显示当前额度摘要"],
          ["主面板", "八平台切换、连接选择、订阅额度、本地统计、趋势、日志与设置；关闭主面板后进程和后台采集继续运行"],
        ],
      },
      { t: "h2", text: "平台与连接", id: "platforms" },
      {
        t: "p",
        text: "八个平台支持的字段不同：Claude / Codex 覆盖本机会话、Token、缓存和官方订阅额度；Gemini 为本机 CLI 会话与用量；Grok 为本机 OAuth 积分；Zcode、Qoder、Workbuddy 按各自本机来源展示已取得的 Token、缓存、积分或会话；Trae 提供本机来源检测与连接管理。平台卡片的能力标签表示可用来源，并不保证每个账户都有全部字段。",
      },
      {
        t: "ul",
        items: [
          "连接管理：添加、发现本机凭证、CLI 授权、更换、启用、断开、编辑和移除；连接失效、离线与过期各自显示状态。",
          "官方 Auth 与 API Key 分开显示：订阅窗口不套用到 API Key；余额只在服务商确实提供且成功读取时展示。",
          "编程套餐：智谱 GLM、Kimi、MiniMax、ZenMux、OpenCode Go、火山方舟和 Grok，按连接地址识别；服务商要求的附加字段须单独配置。",
          "只有明确点击启用时才切换受支持的 Claude Code / Codex CLI 配置；切换前保留备份。",
        ],
      },
      { t: "h2", text: "额度与统计", id: "usage" },
      {
        t: "table",
        head: ["能力", "展示与口径"],
        rows: [
          ["额度与余额", "按来源显示 5 小时、7 天、月等窗口的已用比例与重置时间；余额区分可用、无权限、不支持、失败与未知；提醒阈值可配置"],
          ["本地统计", "今日、本周、本月、累计及自定义日期；新增输入、输出、缓存创建、缓存命中、请求数、缓存命中率和费用估算"],
          ["趋势", "按时间分桶绘制 Token 与估算费用；图例可控制系列，悬停查看同一时间点；时间与模型筛选和日志共用"],
          ["采集", "按各平台真实文件或数据库来源增量读取与去重；缺失值为未知，不把积分、Token、金额或上下文占用互相换算"],
        ],
      },
      { t: "h2", text: "日志与代理", id: "logs" },
      {
        t: "ul",
        items: [
          "请求日志：时间、计费模型、思考强度、输入 / 输出、成本、总耗时 / 首字延迟与状态；支持分页、跳页和异常状态定位。没有可信状态码时保留未知。",
          "本地代理：可选接管 CLI 网关流量并计时；连续不可达时自动还原直连配置。官方订阅流量不纳入此代理。",
        ],
      },
      { t: "h2", text: "设置与数据", id: "settings" },
      {
        t: "table",
        head: ["类别", "可用设置"],
        rows: [
          ["灵动岛", "显示、置顶、尺寸、透明度、勿扰、贴边位置及刷新反馈"],
          ["常规与外观", "开机启动、启动时是否打开主面板、1 / 5 / 15 / 30 分钟自动刷新、浅色 / 深色 / 跟随系统"],
          ["数据管理", "JSON 导入去重、按范围导出、历史保留时间及清理预览；导出不含连接或凭证"],
          ["更新", "检测到新版本后可在应用内下载安装并重启"],
        ],
      },
      { t: "h2", text: "演示边界", id: "demo" },
      {
        t: "callout",
        tone: "info",
        title: "页面里的数字仅供演示",
        text: "官网不会读取访客的本机文件、凭证或额度。首页使用桌面端真实前端与其内置设计示例数据；安装桌面端后显示的是该设备可验证的来源。",
      },
    ],
  },
  {
    slug: "installation",
    group: "快速开始",
    title: "安装与运行",
    subtitle: "先选对系统安装包，再按步骤启动；开发者也可以从源码运行。",
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
          "Windows 10+ x64、macOS（Apple Silicon / Intel）或 Linux x64",
          "Windows 需要 WebView2 运行时；安装向导会处理引导",
          "想看到本机 Token 记录，需先在对应 AI 工具里产生会话；额度还需要该平台可用的登录或套餐连接",
          "从源码运行桌面端需要 Rust 工具链与 pnpm；只看界面则不需要 Rust",
        ],
      },
      { t: "h2", text: "从安装包安装（推荐）", id: "installer" },
      {
        t: "steps",
        items: [
          { title: "选对安装包", desc: "打开本站「免费下载」，核对系统与处理器架构，再下载 Windows EXE、对应架构的 macOS DMG，或 Linux AppImage / DEB。不要把不同系统的文件混用。" },
          { title: "按系统安装", desc: "Windows 双击 EXE 并完成安装向导；macOS 打开 DMG 后将应用拖入「应用程序」；Linux 可安装 DEB，或为 AppImage 添加执行权限后直接运行。" },
          { title: "打开并检查", desc: "从桌面快捷方式或系统应用列表启动。手动启动时会先显示加载窗口，再打开主面板；托盘和灵动岛会继续在后台运行。若暂无数据，先完成「首次配置」。" },
        ],
      },
      { t: "image", src: "docs/panel-overview.png", alt: "CC Usage 主面板总览，包含平台切换、连接和额度区域", caption: "安装后主面板的大致位置。图中数字是界面示例，不代表你的实际额度。" },
      { t: "callout", tone: "info", title: "开机启动和手动启动不同", text: "在设置中开启「静默启动」后，开机自启不主动打开主面板；再次点击快捷方式会唤起已运行的程序，不会重复打开多个进程。" },
      { t: "h2", text: "从源码运行", id: "source" },
      {
        t: "p",
        text: "在 cc-usage 仓库根目录运行以下命令。只看界面不需要 Rust，前端预览中的用量和额度为设计示例，不能读取当前电脑的真实会话。",
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
        text: "启动完整桌面端还需要 Rust 工具链和对应系统的 Tauri 构建依赖。在 Windows 上安装 rustup 后重开终端，用 rustc --version 确认可用；首次编译会下载并构建依赖，耗时取决于网络和机器。",
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
          ["安装后没有用量", "先确认已在目标 CLI 中产生本机会话，再在主面板切换到对应平台；额度查询还需要该平台可用的连接。"],
        ],
      },
    ],
  },
  {
    slug: "first-run",
    group: "快速开始",
    title: "首次配置",
    subtitle: "从空白主面板开始，选平台、确认数据来源，再把灵动岛放到合适位置。",
    toc: [
      { label: "选择平台", id: "platform" },
      { label: "添加连接", id: "connection" },
      { label: "开启灵动岛", id: "island" },
    ],
    blocks: [
      { t: "h2", text: "选择平台", id: "platform" },
      { t: "steps", items: [
        { title: "打开主面板", desc: "首次安装后启动，主面板会自动在屏幕中央打开。以后最小化或关闭后，左键点击系统托盘的 CC Usage 图标即可回到上次的位置。" },
        { title: "选择要查看的平台", desc: "在主面板右上角选择 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 或 Workbuddy。这里改变的是主面板正在查看的平台，不会自动改变灵动岛的平台。" },
        { title: "先看数据来源", desc: "检查卡片上的来源与状态。没有本机会话时统计可能为空；没有可查询的账号或套餐时，额度会显示未知或暂不支持。" },
      ] },
      { t: "image", src: "docs/panel-overview.png", alt: "主面板平台切换和连接入口的位置", caption: "右上角切换平台；连接选择与「添加连接」在总览上方。图中为界面示例。" },
      { t: "h2", text: "添加连接", id: "connection" },
      { t: "steps", items: [
        { title: "进入连接管理", desc: "打开「设置 → 连接管理」，按平台查看当前连接；也可以从总览右侧的「添加连接」进入。" },
        { title: "选择连接来源", desc: "Claude / Codex 区分官方 Auth 与 API 连接；其他平台按实际支持的本机来源、官方凭证或套餐连接添加。按界面提示填写信息，不需要为本地 Token 统计虚构一个 API Key。" },
        { title: "确认状态", desc: "添加后查看「已连接」「过期」「无额度来源」等状态。只有真实返回的额度窗口才会显示水位；选择「使用中」的连接后再观察灵动岛。" },
      ] },
      { t: "image", src: "docs/panel-settings.png", alt: "设置中的连接管理和添加连接按钮", caption: "连接管理位于设置页第一组。示意图展示空连接状态。" },
      {
        t: "callout",
        tone: "info",
        title: "读取凭证需要什么权限？",
        text: "本机来源只读取所选平台的配置或数据文件；需要远程检测时，凭证仅发送到该平台或你明确配置的服务地址，不会上传到 CC Usage 自有服务器。",
      },
      { t: "h2", text: "开启灵动岛", id: "island" },
      { t: "steps", items: [
        { title: "显示灵动岛", desc: "首次安装时，灵动岛在屏幕上方居中展示 5 秒，然后自动贴到上边缘；期间主动拖动会取消自动贴边。以后可在「设置 → 灵动岛」或托盘右键菜单控制显示。" },
        { title: "选择灵动岛平台", desc: "在灵动岛设置中选择要常驻显示的平台或连接；它和总览页的当前查看平台分别控制。" },
        { title: "调整位置", desc: "双击小岛展开或收起；按住拖到屏幕边缘可吸附，停靠位置会记住。" },
        { title: "开启分身", desc: "右键灵动岛选择「开启分身」，可同时盯多个连接；每个分身在右键菜单各自切换连接与位置，重启后原样恢复。至少保留一个灵动岛，菜单右上角的数字是当前灵动岛总数。" },
      ] },
      { t: "image", src: "docs/island-expanded.png", alt: "灵动岛展开后的额度、会话和 Token 区域", caption: "展开态显示可用的额度窗口、运行会话与今日 Token；示例数字不是实时数据。" },
    ],
  },
  {
    slug: "panel",
    group: "使用指南",
    title: "主面板",
    subtitle: "知道每个区域看什么、在哪里切换平台，以及关闭窗口后会发生什么。",
    toc: [
      { label: "总览", id: "overview" },
      { label: "设置", id: "settings" },
      { label: "窗口行为", id: "window" },
    ],
    blocks: [
      { t: "h2", text: "总览", id: "overview" },
      { t: "image", src: "docs/panel-overview.png", alt: "主面板总览布局和额度卡", caption: "总览页：平台选择、连接入口、额度卡与本地统计按顺序排列。图中为设计示例。" },
      {
        t: "ul",
        items: [
          "连接行：显示当前平台与当前连接，可快速添加或切换连接",
          "订阅额度卡：5 小时 / 7 天窗口的已用百分比、进度条与重置倒计时，右上角显示额度来源",
          "本地 Token 统计：真实消耗 Token 总量、新增输入 / 输出 / 缓存创建 / 缓存命中分项、请求数与缓存命中率",
          "时间范围：今日 / 本周 / 本月 / 累计 / 自定义时间，趋势图与请求日志共用同一套筛选",
        ],
      },
      { t: "steps", items: [
        { title: "先选平台和连接", desc: "在右上角选择要查看的平台，再在总览顶部确认当前连接。平台的本地统计与连接状态要分别看，不能把本地 Token 当作账号剩余额度。" },
        { title: "查看时间范围", desc: "切换「今日 / 本周 / 本月 / 累计 / 自定义时间」，确认统计卡、趋势和请求日志随筛选更新。" },
        { title: "定位单次请求", desc: "往下滚动到请求日志；如需排查异常，结合时间、模型、状态与用时查看，不要只看总 Token。" },
      ] },
      { t: "image", src: "docs/panel-stats.png", alt: "主面板 Token 统计卡和时间筛选", caption: "统计卡展示新增输入、输出、缓存等分项；图中数值是示例。" },
      { t: "h2", text: "设置", id: "settings" },
      {
        t: "p",
        text: "点击主面板顶部「设置」，再在分区导航选择连接管理、套餐查询、灵动岛、常规、代理、外观或数据。常用操作：连接管理用于添加或切换来源；灵动岛设置决定常驻显示的平台、尺寸和位置；常规设置开机启动与刷新间隔；数据页查看数据库位置、导入导出与清理预览。修改后按控件提示保存。",
      },
      { t: "image", src: "docs/panel-settings.png", alt: "主面板设置分区导航", caption: "设置页的分区导航，先选类别再操作具体项目。" },
      { t: "h2", text: "窗口行为", id: "window" },
      {
        t: "p",
        text: "首次安装时主面板自动水平、垂直居中打开。最小化后点击托盘图标会在原位置恢复；点击右上角关闭按钮会销毁主面板窗口，但不退出 CC Usage，托盘、灵动岛和后台采集继续运行。再次左键点击托盘图标会按上次位置和尺寸重新打开；原显示器不可用时会回到可见区域。要完全退出，请使用托盘右键菜单的退出项。",
      },
    ],
  },
  {
    slug: "island",
    group: "使用指南",
    title: "灵动岛",
    subtitle: "收缩、展开、贴边停靠与显示设置，按真实连接状态查看用量。",
    toc: [
      { label: "形态", id: "forms" },
      { label: "拖动与吸附", id: "drag" },
      { label: "右键菜单与分身", id: "clones" },
      { label: "刷新反馈", id: "refresh" },
    ],
    blocks: [
      { t: "h2", text: "形态", id: "forms" },
      { t: "image", src: "docs/island-collapsed.png", alt: "灵动岛收缩态", caption: "收缩态只保留最关键的当前连接与水位信息。" },
      {
        t: "ul",
        items: [
          "收缩态（默认）：单行胶囊，显示当前平台与两根水位条",
          "展开态：双击切换，按当前平台展示可用的额度、Token 或积分明细",
          "停靠条：贴边后缩为一条细带，只保留最关键的水位",
        ],
      },
      { t: "image", src: "docs/island-expanded.png", alt: "灵动岛展开态", caption: "双击后可查看当前连接的额度、运行会话与今日 Token；数字仅为示例。" },
      { t: "h2", text: "拖动与吸附", id: "drag" },
      {
        t: "p",
        text: "在灵动岛可拖动区域按住鼠标移动，靠近屏幕四边时会吸附；停靠位置会记忆。若小岛看不见，先检查「设置 → 灵动岛」的显示开关和托盘右键菜单，再尝试重置窗口位置。",
      },
      { t: "h2", text: "右键菜单与分身", id: "clones" },
      {
        t: "p",
        text: "右键任一灵动岛弹出菜单：打开主面板、立即刷新、切换连接、显示位置、始终置顶，以及「开启分身」「销毁分身」。菜单右上角的纯数字是当前灵动岛总数（含本体）。",
      },
      {
        t: "ul",
        items: [
          "开启分身：以右键所在岛的连接为初始值，新岛在它右下方以自由态出现；每个分身在自己的右键菜单里切换连接与位置，互不影响。",
          "销毁分身：销毁右键所在的岛；只剩一个时该项禁用，至少保留一个灵动岛。销毁本体时由第一个分身接任本体。",
          "各岛的连接、停靠边与位置分别保存，重启后原样恢复；始终置顶、透明度 / 大小、免打扰、显示 / 隐藏对所有岛同时生效。",
          "托盘摘要、主面板默认连接与「设置 → 灵动岛」只跟随本体；分身上限 8 个。",
        ],
      },
      { t: "h2", text: "刷新反馈", id: "refresh" },
      {
        t: "p",
        text: "刷新后额度水位和今日增量会更新；可在「设置 → 常规」选择自动刷新间隔。勿扰模式暂停增量提示、水位变色提醒与通知，后台采集和统计仍继续。",
      },
      {
        t: "callout",
        tone: "info",
        title: "托盘一键开关",
        text: "托盘菜单可随时隐藏或唤回灵动岛，无需进入设置页。",
      },
      { t: "image", src: "docs/tray-menu.png", alt: "系统托盘右键菜单，包含显示灵动岛和重置窗口位置", caption: "右键托盘图标可切换显示状态、重置位置或完全退出应用。" },
    ],
  },
  {
    slug: "connections",
    group: "使用指南",
    title: "连接与额度",
    subtitle: "按入口添加连接，分清本机会话、官方订阅额度和编程套餐额度。",
    toc: [
      { label: "连接方式", id: "methods" },
      { label: "支持的平台", id: "platforms" },
      { label: "支持的服务商", id: "providers" },
      { label: "额度窗口", id: "windows" },
    ],
    blocks: [
      { t: "h2", text: "连接方式", id: "methods" },
      { t: "image", src: "docs/panel-settings.png", alt: "设置页连接管理入口与添加连接按钮", caption: "进入「设置 → 连接管理」，选择平台后使用右侧「添加连接」。图示为空状态。" },
      {
        t: "table",
        head: ["想看什么", "先准备什么", "结果在哪里"],
        rows: [
          ["本地 Token / 会话", "在对应 CLI 或桌面工具里产生本机会话；无需凭空添加 API Key", "总览的本地统计、趋势与请求日志"],
          ["官方订阅额度", "使用受支持的官方 Auth 连接并完成验证", "额度卡与灵动岛的真实额度窗口"],
          ["API / 编程套餐额度", "按服务商要求配置连接地址、Key；部分套餐需额外查询凭证", "服务商返回的余额或窗口，缺失时显示未知"],
        ],
      },
      { t: "steps", items: [
        { title: "选择平台", desc: "在「设置 → 连接管理」选择 Claude、Codex 等目标平台。连接管理按平台列出连接，总览顶部则显示当前使用的连接。" },
        { title: "添加或发现连接", desc: "点击「添加连接」，按界面选择官方 Auth、本机发现或 API 方式；有现成 CLI 登录时优先使用对应本机来源。" },
        { title: "验证并启用", desc: "检查连接状态和额度来源。只有你明确点击启用、且该平台支持切换时，程序才会修改对应 CLI 配置；切换前会留备份。" },
        { title: "核对结果", desc: "返回总览查看额度卡的来源、窗口和重置时间。没有额度接口返回时不会自动补一个百分比。" },
      ] },
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
        text: "支持的编程套餐连接会按 base_url 识别服务商，并使用该服务商已实现的额度查询方式。不同服务商返回字段不同，不保证每个账号都有相同窗口。",
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
      { t: "image", src: "docs/panel-overview.png", alt: "主面板额度卡中的 5 小时与 7 天窗口", caption: "额度卡示意：先看右上角来源，再读百分比和重置倒计时。示例值不是账号实况。" },
      { t: "callout", tone: "warn", title: "有本地 Token，却没有额度？", text: "这是两条独立的数据链路。本地统计来自会话文件；额度需要官方账号或服务商接口。先检查连接类型、验证状态和额度来源，再判断是否为采集故障。" },
    ],
  },
  {
    slug: "stats",
    group: "使用指南",
    title: "统计与请求日志",
    subtitle: "按平台和时间查看本机 Token，再用趋势与逐条日志定位具体请求。",
    toc: [
      { label: "统计口径", id: "ranges" },
      { label: "趋势图", id: "chart" },
      { label: "请求日志", id: "logs" },
    ],
    blocks: [
      { t: "h2", text: "统计口径", id: "ranges" },
      { t: "steps", items: [
        { title: "先选平台", desc: "在总览右上角选择目标平台，避免把 Claude 与 Codex 等不同来源混在一起看。" },
        { title: "再选时间与模型", desc: "在本地统计区域选择今日、本周、本月、累计或自定义时间；需要排查某个模型时再使用模型筛选。" },
        { title: "核对统计来源", desc: "看清卡片标注的是本机会话、代理请求还是其他来源。筛选变化会同步影响趋势和日志。" },
      ] },
      {
        t: "p",
        text: "Token 按新增输入、输出、缓存创建和缓存命中分别计量。「真实消耗」包含缓存重读；灵动岛的今日增量强调新增加的 Token，因此不能直接拿两处不同口径的数字相减。费用依据已知价目表估算，不等同于服务商最终账单。",
      },
      { t: "image", src: "docs/panel-stats.png", alt: "Token 统计分项和时间筛选", caption: "先看时间范围与统计来源，再看 Token 分项。图中数字是设计示例。" },
      { t: "h2", text: "趋势图", id: "chart" },
      {
        t: "p",
        text: "趋势图按小时或按日分组，上格为 Token 用量、下格为按价目表估算的费用。两组共用同一时间轴；切换周期后趋势图与请求日志同步刷新。",
      },
      { t: "h2", text: "请求日志", id: "logs" },
      { t: "image", src: "docs/panel-logs.png", alt: "请求日志的模型、Token、用时与状态列", caption: "示例请求日志：可结合时间、模型、用时和状态排查；缺失字段在真实数据中可能显示「—」。" },
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
          ["状态", "有可信响应信息时显示 200 / 429 / 500 等结果；本机会话无法证明状态码时保留未知"],
        ],
      },
      {
        t: "callout",
        tone: "info",
        title: "联动筛选",
        text: "自定义时间范围与模型筛选对趋势图、请求日志同时生效，两边数据严格同源。",
      },
      { t: "callout", tone: "info", title: "日志里的用时为何是「—」？", text: "本机会话记录不一定包含总耗时或首字延迟。本地代理只有在用户主动启用且请求经过代理时，才可能补充这类计时；不应把空值理解为零耗时。" },
    ],
  },
  {
    slug: "data-sources",
    group: "数据与隐私",
    title: "数据来源",
    subtitle: "弄清本机统计从哪里来，以及为什么不同平台能显示的字段不同。",
    toc: [
      { label: "采集目录", id: "dirs" },
      { label: "增量与去重", id: "dedupe" },
    ],
    blocks: [
      { t: "h2", text: "采集目录", id: "dirs" },
      { t: "p", text: "CC Usage 读取你电脑上相关工具已经写出的会话文件或本地数据库。安装 CC Usage 本身不会生成历史会话；需要先在目标工具中使用过对应账号或 CLI。" },
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
      { t: "table", head: ["屏幕上的数字", "主要来源", "需要额外连接吗"], rows: [
        ["本地会话 / Token", "对应 CLI 的会话文件或本机数据库", "通常不需要额度连接，但必须有实际会话"],
        ["订阅额度 / 重置时间", "支持平台的官方账号接口", "需要有效 Auth 或账号来源"],
        ["套餐额度 / API 余额", "所配置服务商的额度接口", "需要该服务商支持并返回数据"],
      ] },
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
    subtitle: "如何查看数据目录、理解导入导出与历史清理。",
    toc: [
      { label: "存储位置", id: "location" },
      { label: "导入、导出与清理", id: "backup" },
      { label: "Schema 迁移", id: "migration" },
    ],
    blocks: [
      { t: "h2", text: "存储位置", id: "location" },
      {
        t: "p",
        text: "统计记录保存在本机应用数据目录的 usage.db，偏好与部分查询设置存放在同目录的配置文件中。不同系统、安装方式的数据目录可能不同；最可靠的查法是打开「设置 → 数据」，查看数据库位置并点击打开数据目录。不要在应用运行时直接编辑 SQLite 文件。",
      },
      { t: "h2", text: "导入、导出与清理", id: "backup" },
      { t: "steps", items: [
        { title: "备份统计", desc: "在「设置 → 数据」选择导出范围与保存位置。导出的 JSON 包含统计记录和会话标题，不包含连接凭证。" },
        { title: "导入旧记录", desc: "选择此前导出的 JSON；程序按稳定标识去重。导入完成后回到总览核对平台与时间范围。" },
        { title: "清理历史", desc: "先查看清理预览，再设置保留期。默认不自动删除；清理后采集偏移仍保留，旧日志不会因重新扫描而恢复。" },
      ] },
      { t: "h2", text: "Schema 迁移", id: "migration" },
      {
        t: "p",
        text: "应用启动时会对自己的 SQLite 数据库执行所需的结构迁移。升级前若希望留一份可恢复的副本，先从托盘菜单完全退出，再复制设置页显示的数据目录；不要只复制 JSON 导出文件来备份连接与偏好。",
      },
    ],
  },
  {
    slug: "privacy",
    group: "数据与隐私",
    title: "隐私说明",
    subtitle: "区分本机保存、额度查询和主动启用的本地代理。",
    toc: [
      { label: "不上传", id: "no-upload" },
      { label: "只读采集", id: "read-only" },
      { label: "开源审计", id: "audit" },
    ],
    blocks: [
      { t: "h2", text: "不上传", id: "no-upload" },
      {
        t: "p",
        text: "CC Usage 没有自有账号或会话上传服务。会话记录、统计结果与配置保存在本机；额度查询会访问对应平台或你配置的服务商接口，应用更新会访问发行源。不要把「数据保存在本机」理解为这些联网功能完全没有网络请求。",
      },
      { t: "h2", text: "只读采集", id: "read-only" },
      {
        t: "p",
        text: "本机会话采集只读，不修改第三方会话文件。连接切换和本地代理是独立的主动操作：只有明确启用且平台受支持时才可能写入对应 CLI 配置，切换前会留备份；未启用代理时不会接管正常请求。",
      },
      { t: "h2", text: "开源审计", id: "audit" },
      {
        t: "p",
        text: "项目基于 MIT 协议开源，以上承诺都可以在源码里逐行验证；欢迎社区审计与反馈。",
      },
    ],
  },
  {
    slug: "troubleshooting",
    group: "帮助",
    title: "常见问题与排查",
    subtitle: "按现象检查平台、连接、数据来源和窗口状态。",
    toc: [
      { label: "没有本地统计", id: "empty-stats" },
      { label: "额度显示未知", id: "unknown-quota" },
      { label: "找不到灵动岛", id: "missing-island" },
      { label: "日志缺少字段", id: "missing-fields" },
      { label: "更新与退出", id: "updates" },
    ],
    blocks: [
      { t: "h2", text: "没有本地统计", id: "empty-stats" },
      { t: "steps", items: [
        { title: "确认平台", desc: "总览右上角选择你实际使用的工具；不同平台的统计不会自动混合。" },
        { title: "确认有会话", desc: "在对应 CLI 或桌面工具中完成一次实际会话。新安装 CC Usage 并不会自己产生历史用量。" },
        { title: "确认时间范围", desc: "先切换到「累计」并取消模型筛选，再看是否有记录；若只有旧会话，今日可能为空。" },
        { title: "检查来源", desc: "看统计卡标注的来源；若目标工具没有本机可读的用量来源，该平台会明确显示限制。" },
      ] },
      { t: "h2", text: "额度显示未知", id: "unknown-quota" },
      { t: "p", text: "本地 Token 有值并不代表官方订阅额度一定可查询。打开「设置 → 连接管理」，核对当前连接是官方 Auth、API 还是本机来源，查看是否过期及是否有额度接口。编程套餐还要核对 base_url 和服务商要求的附加查询凭证。" },
      { t: "callout", tone: "warn", title: "别用旧值冒充当前额度", text: "查询失败、无权限或服务商不提供窗口时，应保持未知状态；稍后重试或检查账号，不要将本地 Token 换算为剩余额度。" },
      { t: "h2", text: "找不到灵动岛", id: "missing-island" },
      { t: "steps", items: [
        { title: "检查显示开关", desc: "右键系统托盘图标，确认「显示灵动岛」已勾选；设置页也有相同开关。" },
        { title: "重置窗口位置", desc: "仍看不到时，在托盘菜单选择「重置窗口位置」，尤其适用于显示器数量或分辨率刚变化的情况。" },
        { title: "检查置顶与勿扰", desc: "小岛被其他窗口遮住时检查置顶；勿扰只暂停提示，不会停止采集。" },
      ] },
      { t: "image", src: "docs/tray-menu.png", alt: "托盘菜单中的显示灵动岛和重置窗口位置", caption: "右键托盘图标后，优先检查「显示灵动岛」与「重置窗口位置」。" },
      { t: "h2", text: "日志缺少字段", id: "missing-fields" },
      { t: "p", text: "本机会话来源可能只有模型、Token 和时间，没有可靠 HTTP 状态码、总耗时或首字延迟；界面会显示「—」或未知。只有主动启用本地代理且请求确实经过代理时，才可能得到额外的网络计时。费用按已知定价估算，以服务商账单为准。" },
      { t: "h2", text: "更新与退出", id: "updates" },
      { t: "table", head: ["现象", "处理"], rows: [
        ["关闭主面板后程序还在", "这是托盘常驻行为。左键托盘图标重新打开主面板；要完全结束请在右键菜单选择「退出」。"],
        ["再次点击快捷方式", "已运行时会唤起同一个程序，不应创建多个实例。开机静默启动后也可这样打开主面板。"],
        ["发现新版本", "点击主面板的绿色更新提示，等待下载安装包与签名校验完成，再点击「安装」。下载失败时按提示重试。"],
      ] },
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
