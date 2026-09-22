import { useRef, useState } from "react"
import { RefreshCw } from "lucide-react"
import { AppLogo, PlatformLogo } from "@/components/Logo"
import { Chip, Pulse } from "@/components/ui"
import { cn } from "@/lib/cn"
import { PLATFORMS, platformConfig } from "@/lib/platforms"
import {
  CLAUDE_QUOTAS,
  CODEX_QUOTAS,
  CONNECTIONS,
  DEMO_BREAKDOWN,
  DEMO_MODELS,
  TOKEN_SUMMARIES,
  type Platform,
} from "@/mock/data"

const BREAK_META = [
  { key: "fresh_input" as const, label: "新增输入", color: "var(--chart-input)" },
  { key: "output" as const, label: "输出", color: "var(--chart-output)" },
  { key: "cache_write" as const, label: "缓存创建", color: "var(--chart-write)" },
  { key: "cache_read" as const, label: "缓存命中", color: "var(--chart-read)" },
]

const fmtK = (v: number) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(2)}M` : `${(v / 1_000).toFixed(1)}K`)

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn("relative h-5 w-9 rounded-full motion-toggle", on ? "bg-green" : "bg-track")}
    >
      <span className={cn("motion-toggle-thumb absolute top-0.5 size-4 rounded-full bg-white shadow", on ? "left-[18px]" : "left-0.5")} />
    </button>
  )
}

function QuotaWindow({ tag, windowName, usedText, v, reset }: { tag: string; windowName: string; usedText: string | null; v: number; reset: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Chip tone="purple">{tag}</Chip>
          <span className="text-[13px] text-text-secondary">{windowName}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Chip tone="green">正常</Chip>
          <Pulse value={`${v}%`} className="tnum font-mono text-[13px] font-bold text-text-primary" />
        </div>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-track">
        <div className="motion-quota-bar h-full rounded-full bg-green" style={{ width: `${v}%` }} />
      </div>
      <div className="flex justify-between text-[11px] text-text-muted">
        <span className="tnum">{usedText ?? "—"}</span>
        <span className="tnum">重置倒计时 {reset}</span>
      </div>
    </div>
  )
}

/**
 * 主面板交互 mock —— 对照 ai-usage-island 真实界面与画布样例：
 * 连接为 island mock 的三条真实连接；额度为 Claude 10%/59%、Codex 52%/72%；
 * Token 统计大数字与汇总条同屏（口径不同，与桌面端一致）。数字均为设计示例。
 */
export function PanelMock({ className }: { className?: string }) {
  const [tab, setTab] = useState<"overview" | "settings">("overview")
  const [platform, setPlatform] = useState<Platform>("claude")
  const [rangeIdx, setRangeIdx] = useState(0)
  const [connOpen, setConnOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  const [autoStart, setAutoStart] = useState(true)
  const [dnd, setDnd] = useState(false)
  const [appearance, setAppearance] = useState<"跟随系统" | "浅色" | "深色">("跟随系统")

  const isClaude = platform === "claude"
  const currentPlatform = platformConfig(platform)
  const windows = isClaude ? CLAUDE_QUOTAS : CODEX_QUOTAS
  // 平台下的真实连接（c1/c2 为 Claude，c3 为 Codex）
  const conns = CONNECTIONS.filter((c) => c.platform === platform)
  const [connId, setConnId] = useState<string>("c1")
  const connection = conns.find((c) => c.id === connId) ?? conns[0]

  const refresh = () => {
    if (busy.current) return
    busy.current = true
    setRefreshing(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setRefreshing(false)
      busy.current = false
    }, 1200)
  }

  return (
    <div className={cn("flex w-full flex-col overflow-hidden rounded-card border border-border-base bg-surface shadow-card", className)}>
      {/* 标题栏 */}
      <div className="flex h-11 items-center justify-between border-b border-border-base px-3.5">
        <div className="flex items-center gap-2.5">
          <AppLogo size={20} />
          <span className="text-xs font-semibold text-text-primary">CC Usage</span>
        </div>
        <div className="flex items-center gap-5 text-text-secondary">
          <span className="mt-[3px] block h-[10px] w-[13px] border-b-2 border-current" />
          <span className="block h-[11px] w-[11px] border border-current" />
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="flex h-[58px] items-center justify-between border-b border-border-base px-6">
        <div className="flex gap-0.5 rounded-btn border border-border-base bg-surface-2 p-[3px]">
          {(
            [
              ["overview", "总览"],
              ["settings", "设置"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "rounded-md px-4 py-1.5 text-[13px] transition-colors",
                tab === key ? "border border-border-base bg-surface font-semibold text-text-primary" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex max-w-[72%] flex-wrap items-center justify-end gap-x-1 gap-y-0.5">
          {PLATFORMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPlatform(item.id)
                setConnOpen(false)
                setConnId(CONNECTIONS.find((candidate) => candidate.platform === item.id)?.id ?? "")
              }}
              aria-pressed={platform === item.id}
              className={cn(
                "flex h-8 items-center gap-1.5 border-b-2 px-2 text-[11px] transition-colors",
                platform === item.id
                  ? "border-accent font-semibold text-accent"
                  : "border-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              <PlatformLogo platform={item.id} size={14} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "overview" ? (
        connection ? (
        <div className="flex flex-col gap-[18px] bg-bg p-6">
          {/* 连接行 */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
              <span className="text-text-secondary">当前平台:</span>
              <span className="font-bold text-text-primary">{currentPlatform.name}</span>
              <span className="text-text-secondary">当前连接:</span>
              <span className="font-bold text-text-primary">{connection.label}</span>
              <Chip tone="neutral">{connection.kind === "auth" ? "Auth" : "API"}</Chip>
              {connection.status === "expired" ? (
                <Chip tone="amber">
                  <span className="size-[5px] rounded-full bg-amber" />
                  已过期 · {connection.lastSyncText}
                </Chip>
              ) : null}
            </div>
            <div className="relative flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setConnOpen((v) => !v)}
                className="flex w-[220px] items-center justify-between rounded-btn border border-border-base bg-surface px-3 py-2 text-[13px] text-text-secondary"
              >
                切换连接
                <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden className={cn(connOpen ? "rotate-180 transition-transform" : "transition-transform")}>
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              {connOpen ? (
                <div className="absolute top-full right-0 z-10 mt-1 w-[260px] rounded-[10px] border border-border-base bg-surface p-1 shadow-card">
                  {conns.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setConnId(c.id)
                        setConnOpen(false)
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left hover:bg-surface-2"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-[13px] text-text-primary">{c.name}</span>
                        <span className="text-[11px] text-text-muted">
                          {c.label} · {c.lastSyncText}
                        </span>
                      </span>
                      {connection.id === c.id ? <Chip tone="green">当前</Chip> : c.status === "expired" ? <Chip tone="amber">过期</Chip> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* 平台订阅额度卡（带刷新柔光） */}
          <div className="relative flex flex-col gap-4 rounded-card border border-border-base bg-surface p-5">
            {refreshing ? (
              <div className="island-refresh-veil">
                <div className="island-refresh-shimmer" />
              </div>
            ) : null}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-text-primary">{currentPlatform.name} 官方订阅</span>
                <Chip tone="neutral">Auth</Chip>
                {connection.status === "expired" ? (
                  <Chip tone="amber">
                    <span className="size-[5px] rounded-full bg-amber" />
                    连接已过期
                  </Chip>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-text-muted">额度来源: 账号额度接口</span>
                <button
                  type="button"
                  onClick={refresh}
                  aria-label="刷新额度"
                  className="flex size-6 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary"
                >
                  <RefreshCw size={12} className={refreshing ? "animate-spin" : undefined} />
                </button>
              </div>
            </div>
            {windows.map((w) => (
              <QuotaWindow key={w.key} tag={w.key} windowName={w.windowName} usedText={w.usedText} v={w.usedPercent} reset={w.resetCountdown} />
            ))}
          </div>

          {/* 本地 Token 统计 */}
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[15px] font-bold text-text-primary">{currentPlatform.name} 本地 Token 统计</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-muted">统计来源</span>
                {["本地会话记录", "全部模型", "事件驱动"].map((s, i) => (
                  <span key={s} className="flex items-center gap-5 rounded-lg border border-border-base bg-surface-2 px-2.5 py-1.5 text-xs text-text-primary">
                    {s}
                    {i > 0 ? (
                      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

            {isClaude ? (
              <>
                <div className="flex gap-0.5 self-start rounded-btn border border-border-base bg-surface-2 p-[3px]">
                  {TOKEN_SUMMARIES.map((t, i) => (
                    <button
                      key={t.period}
                      type="button"
                      onClick={() => setRangeIdx(i)}
                      className={cn(
                        "rounded-md px-3.5 py-1.5 text-xs transition-colors",
                        rangeIdx === i ? "border border-border-base bg-surface font-semibold text-text-primary" : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-10 items-center justify-center rounded-[10px] bg-green-soft text-green-text">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                        </svg>
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-text-secondary">真实消耗 Token</span>
                        <span className="tnum font-mono text-3xl font-bold tracking-tight text-text-primary">{DEMO_BREAKDOWN.real_total.toLocaleString("en-US")}</span>
                      </div>
                      <span className="tnum rounded-md bg-green-soft px-2 py-1 text-[11px] text-green-text">≈ 94.90M</span>
                    </div>
                    <div className="flex rounded-[10px] border border-border-base bg-surface-2">
                      {[
                        { label: "请求数", value: String(DEMO_BREAKDOWN.requests) },
                        { label: "平均每次", value: fmtK(DEMO_BREAKDOWN.avg_per_request) },
                        { label: "估算费用", value: "—" },
                      ].map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-[3px] px-4 py-2.5">
                          <span className="text-[11px] text-text-muted">{s.label}</span>
                          <span className="tnum font-mono text-[13px] font-semibold text-text-primary">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {BREAK_META.map((b) => (
                      <div key={b.key} className="flex flex-1 flex-col gap-1.5 rounded-[10px] border border-border-base bg-surface p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full" style={{ background: b.color }} />
                          <span className="text-xs text-text-secondary">{b.label}</span>
                        </div>
                        <span className="tnum font-mono text-base font-semibold text-text-primary">{fmtK(DEMO_BREAKDOWN[b.key])}</span>
                      </div>
                    ))}
                    <div className="flex min-w-[180px] flex-1 flex-col gap-2 rounded-[10px] border border-border-base bg-surface-2 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">缓存命中率</span>
                        <span className="tnum font-mono text-[13px] font-bold text-text-primary">{(DEMO_BREAKDOWN.cache_hit_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-track">
                        <div className="h-full rounded-full bg-green transition-[width] duration-500" style={{ width: `${DEMO_BREAKDOWN.cache_hit_rate * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  {/* 汇总条（与桌面端一致：今日/本周/本月/累计 同屏） */}
                  <div className="tnum flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border-base pt-3 font-mono text-xs text-text-secondary">
                    {TOKEN_SUMMARIES.map((t, i) => (
                      <span key={t.period} title={t.hint} className={cn(i === rangeIdx && "font-semibold text-text-primary")}>
                        {t.label} <span className="text-text-primary">{t.value}</span>
                      </span>
                    ))}
                    <span className="text-text-muted">（{TOKEN_SUMMARIES[3].hint}）</span>
                  </div>
                </div>
              </>
            ) : (
              /* Codex：真实数据未接入时字段显示「—」（与桌面端行为一致） */
              <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border-strong bg-surface p-8 text-center">
                <span className="text-sm font-semibold text-text-secondary">暂无本地统计</span>
                <span className="max-w-[420px] text-xs leading-[1.8] text-text-muted">
                  {currentPlatform.name} 的官网演示未加载本机统计；真实设备数据缺失时，界面以「—」占位，不会以猜测值替代。
                </span>
              </div>
            )}
          </div>
        </div>
        ) : (
          <div className="flex min-h-[430px] flex-col gap-5 bg-bg p-6">
            <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
              <span className="text-text-secondary">当前平台:</span>
              <span className="flex items-center gap-2 font-bold text-text-primary">
                <PlatformLogo platform={platform} size={16} />
                {currentPlatform.name}
              </span>
              <Chip tone="neutral">本机来源</Chip>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border-strong bg-surface px-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-[14px] bg-surface-2">
                <PlatformLogo platform={platform} size={28} />
              </span>
              <div className="flex max-w-[520px] flex-col gap-1.5">
                <span className="text-base font-bold text-text-primary">{currentPlatform.name} 已纳入统一平台管理</span>
                <span className="text-xs leading-[1.8] text-text-secondary">{currentPlatform.summary}</span>
                <span className="text-[11px] leading-[1.8] text-text-muted">
                  官网演示不会读取本机数据；安装桌面端后，界面会按该平台真实提供的字段展示，不以其他平台数据代替。
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {currentPlatform.capabilities.map((capability) => (
                  <Chip key={capability} tone="neutral">{capability}</Chip>
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        /* 设置页（演示） */
        <div className="flex flex-col gap-4 bg-bg p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border-base bg-surface p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-text-primary">外观</span>
              <span className="text-xs text-text-muted">演示项：真实应用中跟随桌面端主题设置</span>
            </div>
            <div className="flex gap-0.5 rounded-btn border border-border-base bg-surface-2 p-[3px]">
              {(["跟随系统", "浅色", "深色"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAppearance(a)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs transition-colors",
                    appearance === a ? "border border-border-base bg-surface font-semibold text-text-primary" : "text-text-secondary",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          {[
            { label: "开机自动启动", desc: "登录 Windows 后在后台启动 CC Usage", on: autoStart, toggle: () => setAutoStart((v) => !v) },
            { label: "勿扰模式", desc: "隐藏灵动岛弹动与刷新柔光，仅保留水位显示", on: dnd, toggle: () => setDnd((v) => !v) },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-card border border-border-base bg-surface p-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-text-primary">{row.label}</span>
                <span className="text-xs text-text-muted">{row.desc}</span>
              </div>
              <Switch on={row.on} onToggle={row.toggle} label={row.label} />
            </div>
          ))}
          <div className="flex items-center justify-between rounded-card border border-border-base bg-surface p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-text-primary">刷新间隔</span>
              <span className="text-xs text-text-muted">额度与 Token 统计的自动刷新频率</span>
            </div>
            <select className="rounded-btn border border-border-base bg-surface-2 px-3 py-1.5 text-xs text-text-primary" defaultValue="30s">
              <option value="15s">15 秒</option>
              <option value="30s">30 秒</option>
              <option value="1m">1 分钟</option>
            </select>
          </div>
          <p className="text-center text-xs text-text-muted">以上为界面演示，设置项以桌面端实际功能为准。</p>
        </div>
      )}
    </div>
  )
}

/** 供趋势图图例使用的真实模型清单 */
export const TREND_MODELS = DEMO_MODELS
