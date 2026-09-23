import {
  AlignHorizontalJustifyCenter,
  BadgeCheck,
  BookOpen,
  Braces,
  ChartColumn,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Cpu,
  Database,
  Download,
  Flame,
  FolderSearch,
  Gauge,
  Github,
  KeyRound,
  Layers,
  Monitor,
  Moon,
  MousePointerClick,
  Move,
  Pin,
  Plug,
  Scale,
  ScrollText,
  Settings2,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Terminal,
  Waves,
  X,
  RefreshCw,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { cn } from "@/lib/cn"
import { SectionHeading, PrimaryButton, GhostButton, Chip } from "@/components/ui"
import { PlatformLogo } from "@/components/Logo"
import { PanelMock } from "@/components/mock/PanelMock"
import { IslandInteractive, IslandDock } from "@/components/mock/IslandMock"
import { HeroDemo } from "@/components/mock/HeroDemo"
import { TrendChartMock, RequestLogMock } from "@/components/mock/ChartMock"
import { CLAUDE_QUOTAS, CODEX_QUOTAS } from "@/mock/data"
import { RELEASE_TAG, RELEASES_URL } from "@/lib/version"
import { PLATFORMS } from "@/lib/platforms"

function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 bg-bg px-6 pb-[64px] pt-[76px] text-center">
      <Link
        to="/changelog"
        className="flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium text-accent transition-opacity hover:opacity-90"
      >
        <Sparkles size={14} />
        {RELEASE_TAG} 首个公开版本已发布
      </Link>
      <h1 className="text-[44px] font-bold leading-[1.2] tracking-tight text-text-primary sm:text-[62px]">
        让 AI 用量，一眼看得见
      </h1>
      <p className="max-w-[700px] text-[17px] leading-[1.8] text-text-secondary">
        常驻桌面的灵动岛 + 完整主面板，统一查看 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy。数据全部留在本机。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <PrimaryButton to="/download">
          <Download size={17} />
          免费下载
        </PrimaryButton>
        <GhostButton to="/docs">
          <BookOpen size={17} />
          查看文档
        </GhostButton>
      </div>
      {/* 首屏自动演示：零操作看懂灵动岛的完整交互循环 */}
      <div className="flex w-full justify-center pt-6">
        <HeroDemo />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-[18px] pt-2 text-[13px] text-text-muted">
        {[
          { icon: Monitor, label: "支持 Windows 10+" },
          { icon: Database, label: "本地 SQLite 存储" },
          { icon: BadgeCheck, label: "MIT 开源免费" },
        ].map((m) => (
          <span key={m.label} className="flex items-center gap-1.5">
            <m.icon size={14} />
            {m.label}
          </span>
        ))}
      </div>
    </section>
  )
}

const ISLAND_POINTS = [
  { icon: MousePointerClick, title: "双击展开 / 收起", desc: "展开看当前平台明细，收起只留关键水位" },
  { icon: Move, title: "四边吸附", desc: "拖到屏幕边缘自动贴靠，位置记忆" },
  { icon: AlignHorizontalJustifyCenter, title: "停靠条常驻", desc: "贴边缩为一条细带，占位最小" },
  { icon: Settings2, title: "托盘一键开关", desc: "随时隐藏或唤回，不抢焦点" },
]

function IslandShowcase() {
  return (
    <section className="flex flex-col items-center gap-[30px] bg-bg px-6 pb-[84px] pt-[76px]">
      <span className="rounded-full bg-accent-soft px-3 py-[5px] text-xs font-semibold text-accent">灵动岛</span>
      <h2 className="text-4xl font-bold tracking-tight text-text-primary sm:text-[44px]">桌面角落的用量仪表台</h2>
      <p className="max-w-[620px] text-center text-base leading-[1.8] text-text-secondary">
        不切窗口、不占任务栏，5 小时 / 7 天窗口的水位随取随看，刷新时有一道柔光掠过。
      </p>
      <div className="w-full max-w-[1240px]">
        <MockLabel>灵动岛交互演示 · 双击切换形态，点 ⟳ 刷新</MockLabel>
        <div className="flex justify-center">
          <IslandInteractive />
        </div>
      </div>
      <div className="w-full max-w-[1240px]">
        <MockLabel>停靠条 · 贴边常驻</MockLabel>
        <div className="flex justify-center">
          <IslandDock />
        </div>
      </div>
      <div className="grid w-full max-w-[1240px] gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {ISLAND_POINTS.map((p) => (
          <div key={p.title} className="flex flex-col items-center gap-2 rounded-card bg-surface-2 p-4 text-center">
            <span className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-base bg-surface text-accent">
              <p.icon size={16} />
            </span>
            <span className="text-[13px] font-bold text-text-primary">{p.title}</span>
            <span className="text-[11px] leading-[1.7] text-text-secondary">{p.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function MockLabel({ children }: { children: string }) {
  return (
    <div className="mb-2 flex w-full items-center gap-2 pt-3">
      <span className="font-mono text-[11px] text-text-muted">{children}</span>
      <span className="h-px flex-1 bg-border-base" />
    </div>
  )
}

function PanelShowcase() {
  return (
    <section className="flex justify-center bg-bg px-6 pb-[90px]">
      <PanelMock className="max-w-[1160px]" />
    </section>
  )
}

function Stats() {
  const stats = [
    { value: "8", label: "Claude / Codex / Gemini 等八个平台" },
    { value: "7", label: "编程套餐额度直连查询" },
    { value: "100%", label: "统计存于本地 SQLite" },
    { value: "0", label: "数据上传 · 不出本机" },
  ]
  return (
    <section className="grid grid-cols-2 gap-8 bg-bg px-6 pb-16 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
          <span className="tnum font-mono text-[38px] font-bold tracking-tight text-text-primary">{s.value}</span>
          <span className="text-[13px] text-text-secondary">{s.label}</span>
        </div>
      ))}
    </section>
  )
}

const FEATURES: { icon: LucideIcon; tone: string; title: string; desc: string }[] = [
  { icon: Pin, tone: "bg-accent-soft text-accent", title: "常驻灵动岛", desc: "桌面角落常驻的一枚小岛，四边吸附、双击展开、拖动即停。不切窗口就能看到额度水位。" },
  { icon: Gauge, tone: "bg-green-soft text-green-text", title: "额度窗口实时可见", desc: "5 小时 / 7 天 / 月窗口的用量百分比与重置倒计时一屏看全，覆盖 Claude、Codex 与多家编程套餐。" },
  { icon: FolderSearch, tone: "bg-purple-soft text-purple-text", title: "多平台本机来源采集", desc: "按平台读取本机会话、用量、缓存或积分来源；缺失字段保持未知，不用其他平台的数据猜测补齐。" },
  { icon: ChartColumn, tone: "bg-accent-soft text-accent", title: "Token 与成本分项统计", desc: "新增输入、输出、缓存创建与缓存命中分开计量，可按日期范围与模型筛选，费用依价目表估算。" },
  { icon: ScrollText, tone: "bg-amber-soft text-amber", title: "请求日志可追溯", desc: "每次请求的计费模型、思考强度、用时、首字延迟与状态码分页可查，异常请求一眼定位。" },
  { icon: ShieldCheck, tone: "bg-neutral-soft text-text-primary", title: "数据留在本机", desc: "配置与记录存本地 SQLite，带完整 Schema 迁移；本机凭证只读发现，绝不上传。" },
  { icon: RefreshCw, tone: "bg-green-soft text-green-text", title: "应用内自更新", desc: "有新版本时标题栏亮起绿色更新按钮，点击即下载安装并自动重启，全程无需手动操作。" },
  { icon: Plug, tone: "bg-amber-soft text-amber", title: "启用即切换渠道", desc: "点一下「启用」就把连接写入 Claude Code / Codex 配置，切换供应商像切输入法一样简单。" },
]

function Features() {
  return (
    <section className="border-y border-border-base bg-surface-2 px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-12">
        <SectionHeading title="为什么选 CC Usage" subtitle="一个窗口盯住所有 AI 编程工具的额度与花销，数据全程不出本机。" />
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface p-[26px]">
              <span className={`flex size-[42px] items-center justify-center rounded-[11px] ${f.tone}`}>
                <f.icon size={21} />
              </span>
              <h3 className="text-[17px] font-bold text-text-primary">{f.title}</h3>
              <p className="text-[13px] leading-[1.85] text-text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const DETAIL_TABS = ["用量趋势", "请求日志", "连接与额度"] as const

/** 「连接与额度」视图：Claude / Codex 额度样例；其他平台不伪造额度数据。 */
function ConnectionQuotaMock() {
  const rows: { name: string; icon: LucideIcon; soft: string; fg: string; windows: { tag: string; v: number; reset: string }[] }[] = [
    {
      name: "Claude 官方订阅（个人账号）",
      icon: Sparkles,
      soft: "bg-accent-soft",
      fg: "text-logo-claude",
      windows: CLAUDE_QUOTAS.map((q) => ({ tag: q.key, v: q.usedPercent, reset: q.resetCountdown })),
    },
    {
      name: "Codex 官方订阅（工作账号 · 已过期）",
      icon: Terminal,
      soft: "bg-neutral-soft",
      fg: "text-text-primary",
      windows: CODEX_QUOTAS.map((q) => ({ tag: q.key, v: q.usedPercent, reset: q.resetCountdown })),
    },
  ]
  return (
    <div className="flex flex-col gap-4 rounded-card border border-border-base bg-surface p-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[15px] font-bold text-text-primary">各平台额度水位</span>
        <span className="text-[11px] text-text-muted">按连接 base_url 自动识别 · 只读查询</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="flex flex-col gap-2.5 rounded-[10px] border border-border-base p-4">
          <div className="flex items-center gap-2">
            <span className={`flex size-6 items-center justify-center rounded-md ${r.soft} ${r.fg}`}>
              <r.icon size={13} />
            </span>
            <span className="text-sm font-semibold text-text-primary">{r.name}</span>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-2.5">
            {r.windows.map((w) => (
              <div key={w.tag} className="flex min-w-[240px] flex-1 items-center gap-2.5">
                <Chip tone="purple">{w.tag}</Chip>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-track">
                  <div className="h-full rounded-full bg-green transition-[width] duration-500" style={{ width: `${w.v}%` }} />
                </div>
                <span className="tnum w-9 text-right font-mono text-xs font-semibold text-text-primary">{w.v}%</span>
                <span className="tnum font-mono text-[11px] text-text-muted">{w.reset}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-text-muted">额度查询为只读网络请求，仅访问各服务商的公开额度接口；编程套餐接入后在此展示。</p>
    </div>
  )
}

function DetailViews() {
  const [tab, setTab] = useState(0)
  return (
    <section className="flex flex-col items-center gap-10 bg-bg px-6 py-[88px]">
      <SectionHeading
        title="每一笔用量，都能查到底"
        subtitle="趋势图看走势，请求日志看单次。同一套时间范围与模型筛选，两边同步联动。"
      />
      <div className="flex gap-[3px] rounded-[10px] border border-border-base bg-surface-2 p-1">
        {DETAIL_TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            className={
              i === tab
                ? "rounded-lg border border-border-base bg-surface px-[18px] py-2 text-[13px] font-semibold text-text-primary"
                : "rounded-lg px-[18px] py-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
            }
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex w-full max-w-[1240px] flex-col gap-5 rounded-card border border-border-base bg-surface-2 p-6">
        {tab === 0 ? <TrendChartMock /> : tab === 1 ? <RequestLogMock /> : <ConnectionQuotaMock />}
      </div>
    </section>
  )
}

const CODE_LINES = [
  { path: "~/.claude/projects/**/*.jsonl", comment: "增量读取 · 按 message.id 去重", color: "text-green-text" },
  { path: "~/.codex/sessions/**/*.jsonl", comment: "增量读取 · 按 response_id 去重", color: "text-green-text" },
  { path: "~/.gemini · ~/.zcode/v2", comment: "按各平台真实格式读取本机来源", color: "text-green-text" },
  { path: "~/.qoder(-cn) · ~/.workbuddy(-ai)", comment: "区分来源实例 · 保留 Token / 积分单位", color: "text-green-text" },
  { path: "%APPDATA%/cc-usage/usage.db", comment: "本地 SQLite · 统计与请求日志", color: "text-accent" },
  { path: "—", comment: "不上传、不回传、无账号体系", color: "text-text-muted" },
]

const TECH_POINTS = [
  { icon: Cpu, title: "Tauri 2 + Rust 后端", desc: "窗口、托盘、采集与 SQLite 只读查询都在 Rust 侧，内存占用低。" },
  { icon: Layers, title: "React 19 + Tailwind CSS 4", desc: "界面基于 shadcn/ui，浅色与深色两套主题逐项取值。" },
  { icon: Database, title: "SQLite 本地库", desc: "带完整 Schema 迁移，今日 / 本周 / 本月 / 累计口径一次算清。" },
]

const STACK_TAGS = [
  ["Tauri 2", "Rust", "SQLite", "Windows 10+"],
  ["React 19", "TypeScript", "Vite 6", "Tailwind CSS 4", "shadcn/ui"],
]

function TechSection() {
  return (
    <section className="border-t border-border-base bg-surface-2 px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[72px] lg:flex-row">
        <div className="flex w-full flex-col gap-[22px] lg:max-w-[480px]">
          <span className="flex items-center gap-[7px] self-start rounded-full bg-surface-3 px-3 py-[5px] text-xs text-text-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 16l4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
            </svg>
            开发者友好
          </span>
          <h2 className="text-[34px] font-bold leading-[1.3] tracking-tight text-text-primary sm:text-[38px]">
            为长期跑在后台而造
          </h2>
          <p className="text-[15px] leading-[1.9] text-text-secondary">
            Rust 负责采集与只读查询，React 只管画面。灵动岛是无边框透明窗口，常驻不抢焦点；主面板关闭只隐藏，托盘随时唤回。
          </p>
          <div className="flex flex-col gap-3.5">
            {TECH_POINTS.map((p) => (
              <div key={p.title} className="flex gap-[13px]">
                <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-accent-soft text-accent">
                  <p.icon size={17} />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-text-primary">{p.title}</span>
                  <span className="text-[13px] leading-[1.8] text-text-secondary">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-[18px]">
          <div className="flex w-full flex-col overflow-hidden rounded-card border border-border-base bg-surface">
            <div className="flex items-center gap-2 border-b border-border-base bg-surface-2 px-4 py-2.5">
              <span className="size-2 rounded-full bg-[#FF5F57]" />
              <span className="size-2 rounded-full bg-[#FEBC2E]" />
              <span className="size-2 rounded-full bg-[#28C840]" />
              <span className="ml-1.5 font-mono text-xs text-text-secondary">数据都在这几个位置</span>
            </div>
            <div className="flex flex-col gap-2.5 px-5 py-[18px]">
              {CODE_LINES.map((l) => (
                <div key={l.path} className="flex flex-wrap items-center justify-between gap-x-5">
                  <span className={`tnum font-mono text-[13px] ${l.color}`}>{l.path}</span>
                  <span className="text-xs text-text-muted">{l.comment}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {STACK_TAGS.map((row, i) => (
              <div key={i} className="flex flex-wrap gap-2">
                {row.map((t) => (
                  <span key={t} className="rounded-lg border border-border-base bg-surface px-[13px] py-[7px] font-mono text-xs text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Platforms() {
  return (
    <section className="border-t border-border-base bg-bg px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-11">
        <SectionHeading
          title="八个平台，一个统一看板"
          subtitle="连接、会话、Token、缓存、积分与额度按平台真实能力展示；没有来源的数据不会被伪装成 0。"
        />
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform) => (
            <div key={platform.id} className="flex min-h-[150px] flex-col gap-3 rounded-card border border-border-base bg-surface p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-[9px] bg-surface-2">
                  <PlatformLogo platform={platform.id} size={19} />
                </span>
                <span className="text-sm font-bold text-text-primary">{platform.name}</span>
                <CircleCheck size={15} className="ml-auto text-green" />
              </div>
              <p className="text-xs leading-[1.7] text-text-secondary">{platform.summary}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {platform.capabilities.map((capability) => (
                  <Chip key={capability} tone="neutral">{capability}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QUOTA_PROVIDERS: { name: string; type: string; icon: LucideIcon; soft: string; fg: string }[] = [
  { name: "Claude 官方订阅", type: "官方直连", icon: Sparkles, soft: "bg-accent-soft", fg: "text-logo-claude" },
  { name: "Codex 官方", type: "官方直连", icon: Terminal, soft: "bg-neutral-soft", fg: "text-text-primary" },
  { name: "智谱 GLM", type: "个人 / 国际 / 团队", icon: Sparkles, soft: "bg-accent-soft", fg: "text-accent" },
  { name: "Kimi", type: "编程套餐", icon: Moon, soft: "bg-purple-soft", fg: "text-purple-text" },
  { name: "MiniMax", type: "编程套餐", icon: Waves, soft: "bg-green-soft", fg: "text-green-text" },
  { name: "ZenMux", type: "编程套餐", icon: Shuffle, soft: "bg-amber-soft", fg: "text-amber" },
  { name: "OpenCode Go", type: "编程套餐", icon: Braces, soft: "bg-neutral-soft", fg: "text-text-secondary" },
  { name: "火山方舟", type: "编程套餐", icon: Flame, soft: "bg-amber-soft", fg: "text-danger" },
  { name: "Grok", type: "编程套餐", icon: X, soft: "bg-neutral-soft", fg: "text-text-primary" },
]

function Providers() {
  return (
    <section className="border-t border-border-base bg-surface-2 px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-11">
        <SectionHeading
          title="额度服务商，自动识别"
          subtitle="平台与额度服务商分开管理；支持的连接按 base_url 识别服务商，并展示其真实返回的额度窗口。"
        />
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTA_PROVIDERS.map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-card border border-border-base bg-surface px-[18px] py-4">
              <span className={`flex size-9 items-center justify-center rounded-[9px] ${p.soft} ${p.fg}`}>
                <p.icon size={17} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-sm font-semibold text-text-primary">{p.name}</span>
                <span className="text-[11px] text-text-muted">{p.type}</span>
              </div>
              <CircleCheck size={15} className="text-green" />
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted">额度查询为只读请求；只有服务商真实提供且已经适配的字段才会展示。</p>
      </div>
    </section>
  )
}

const FAQS = [
  { q: "CC Usage 收费吗？", a: "基于 MIT 协议完全免费开源，可以自由使用、修改和分发，没有付费墙，也没有账号体系。" },
  { q: "支持哪些系统？", a: "目前面向 Windows 10+，桌面端基于 Tauri 2 构建；macOS 与 Linux 支持在规划中。" },
  { q: "我的数据会上传吗？", a: "不会。会话记录从本机目录增量读取，统计结果存放在本地 SQLite，没有任何上传通道。" },
  { q: "额度数据从哪里来？", a: "按平台真实能力读取：Claude / Codex 使用账号额度接口，Grok 使用本机 OAuth 积分来源；编程套餐按连接的 base_url 识别服务商。没有可验证额度来源的平台不会显示虚构百分比。" },
  { q: "会影响这些 AI 工具使用吗？", a: "本机会话与用量采集均为只读，不修改第三方数据、不拦截请求。只有明确点击「启用」时，才会对已支持外部切换的平台写入配置并先行备份。" },
  { q: "遇到问题如何反馈？", a: "欢迎到 GitHub 仓库提 Issue，或按贡献指南提交 PR，社区一起把它打磨得更好。" },
]

function Faq() {
  // 默认全部展开，点击标题可折叠（手风琴）
  const [closed, setClosed] = useState<ReadonlySet<number>>(new Set())
  const toggle = (i: number) =>
    setClosed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  return (
    <section id="faq" className="border-t border-border-base bg-surface-2 px-6 py-[88px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-11">
        <SectionHeading title="常见问题" subtitle="有疑问？我们先答为敬" />
        <div className="grid w-full gap-5 lg:grid-cols-2">
          {FAQS.map((f, i) => {
            const open = !closed.has(i)
            return (
              <div key={f.q} className="flex flex-col gap-2.5 rounded-card border border-border-base bg-surface p-6">
                <button type="button" onClick={() => toggle(i)} className="flex items-center justify-between gap-2 text-left" aria-expanded={open}>
                  <span className="flex items-center gap-2">
                    <CircleHelp size={16} className="text-accent" />
                    <span className="text-[15px] font-bold text-text-primary">{f.q}</span>
                  </span>
                  <ChevronDown size={16} className={cn("shrink-0 text-text-muted transition-transform duration-200", open && "rotate-180")} />
                </button>
                {open ? <p className="text-[13px] leading-[1.85] text-text-secondary">{f.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { num: "01", icon: Download, title: "下载安装", desc: "从 GitHub Releases 获取安装包，中文向导一路下一步，装完即用。" },
  { num: "02", icon: KeyRound, title: "添加连接", desc: "一键读取本机凭证，或从 GLM / Kimi / DeepSeek 等供应商预设快速填入服务地址。" },
  { num: "03", icon: Pin, title: "常驻盯额度", desc: "开启灵动岛，额度水位常驻桌面角落，双击即看明细。" },
]

function Steps() {
  return (
    <section className="flex flex-col items-center gap-11 bg-bg px-6 py-[88px]">
      <SectionHeading title="三步上手" subtitle="从下载到常驻，两分钟搞定。" />
      <div className="grid w-full max-w-[1120px] gap-5 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.num} className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface p-[26px]">
            <div className="flex items-center justify-between">
              <span className="tnum font-mono text-[26px] font-bold text-border-strong">{s.num}</span>
              <span className="flex size-10 items-center justify-center rounded-[11px] bg-accent-soft text-accent">
                <s.icon size={19} />
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-text-primary">{s.title}</h3>
            <p className="text-[13px] leading-[1.85] text-text-secondary">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="flex flex-col items-center gap-6 bg-bg px-6 py-[100px] text-center">
      <h2 className="max-w-[760px] text-4xl font-bold leading-[1.3] tracking-tight text-text-primary sm:text-5xl">
        准备好看清你的 AI 用量了吗？
      </h2>
      <p className="text-base text-text-secondary">下载 CC Usage，让灵动岛替你盯着额度与花销。</p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <PrimaryButton to="/download">
          <Download size={17} />
          立即下载
        </PrimaryButton>
        <GhostButton href={RELEASES_URL}>
          <Github size={17} />
          查看 GitHub
        </GhostButton>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-[18px] text-[13px] text-text-muted">
        {[
          { icon: Monitor, label: "支持 Windows 10+" },
          { icon: Scale, label: "MIT 开源免费" },
          { icon: Database, label: "数据不出本机" },
        ].map((m) => (
          <span key={m.label} className="flex items-center gap-1.5">
            <m.icon size={14} />
            {m.label}
          </span>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <IslandShowcase />
      <PanelShowcase />
      <Stats />
      <Features />
      <DetailViews />
      <TechSection />
      <Platforms />
      <Providers />
      <Faq />
      <Steps />
      <Cta />
    </>
  )
}
