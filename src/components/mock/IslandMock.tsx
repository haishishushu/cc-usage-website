import { useRef, useState } from "react"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/cn"
import { Chip, Pulse } from "@/components/ui"
import { PlatformLogo } from "@/components/Logo"
import { CODEX_QUOTAS, CLAUDE_QUOTAS, RUNNING_SESSION_TEXT, TOTAL_DELTA_TEXT, TRAY_TOOLTIP, type Platform } from "@/mock/data"

type Quota = { v: number; reset: string }
type DemoPlatform = Extract<Platform, "claude" | "codex">

const BASE: Record<DemoPlatform, { h5: Quota; d7: Quota; sessions: string; token: string }> = {
  claude: {
    h5: { v: CLAUDE_QUOTAS[0].usedPercent, reset: CLAUDE_QUOTAS[0].resetCountdown },
    d7: { v: CLAUDE_QUOTAS[1].usedPercent, reset: CLAUDE_QUOTAS[1].resetCountdown },
    sessions: RUNNING_SESSION_TEXT,
    token: TOTAL_DELTA_TEXT,
  },
  codex: {
    h5: { v: CODEX_QUOTAS[0].usedPercent, reset: CODEX_QUOTAS[0].resetCountdown },
    d7: { v: CODEX_QUOTAS[1].usedPercent, reset: CODEX_QUOTAS[1].resetCountdown },
    sessions: "—",
    token: "—",
  },
}

const clamp = (n: number) => Math.min(96, Math.max(1, n))

/** island 原版刷新柔光：veil 裁剪层 + 45% 宽斜向光带（1100ms linear 无限循环，刷新期渲染）。 */
function RefreshVeil() {
  return (
    <div className="island-refresh-veil">
      <div className="island-refresh-shimmer" />
    </div>
  )
}

function QuotaRow({ w, q, barClass }: { w: string; q: Quota; barClass: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Chip tone="purple">{w}</Chip>
      <div className="h-[5px] flex-1 rounded-full bg-track">
        <div className={cn("motion-quota-bar h-full rounded-full", barClass)} style={{ width: `${q.v}%` }} />
      </div>
      <Pulse value={`${q.v}%`} className="tnum w-9 text-right font-mono text-xs font-semibold text-text-primary" />
      <span className="tnum font-mono text-[11px] text-text-muted">{q.reset}</span>
    </div>
  )
}

function MiniQuota({ w, q }: { w: string; q: Quota }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] text-text-muted">{w}</span>
      <span className="h-1 w-10 overflow-hidden rounded-full bg-track">
        <span className="motion-quota-bar block h-full rounded-full bg-green" style={{ width: `${q.v}%` }} />
      </span>
      <Pulse value={`${q.v}%`} className="tnum font-mono text-[10px] font-semibold text-text-primary" />
    </span>
  )
}

/**
 * 灵动岛交互 mock —— 与 island 同款交互与动效：
 * 双击在展开态 / 收缩态之间切换（带 dock-contract 收缩动画）；
 * 刷新触发原版柔光掠过并微调水位（水位 420ms 过渡、数字亮度脉冲）；
 * 官网仅为 Claude / Codex 提供静态额度样例；完整八平台入口见主面板演示。
 */
export function IslandInteractive({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(true)
  const [morph, setMorph] = useState("")
  const [platform, setPlatform] = useState<DemoPlatform>("claude")
  const [data, setData] = useState(BASE)
  const [refreshing, setRefreshing] = useState(false)
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)

  const data0 = data[platform]
  const other: DemoPlatform = platform === "claude" ? "codex" : "claude"
  const otherData = data[other]
  const isClaude = platform === "claude"

  const refresh = () => {
    if (busy.current) return
    busy.current = true
    setRefreshing(true)
    const drift = () => Math.round(Math.random() * 5) - 2
    setData((prev) => {
      const next = { ...prev }
      for (const p of [platform, other] as DemoPlatform[]) {
        const d = prev[p]
        next[p] = {
          ...d,
          h5: { ...d.h5, v: clamp(d.h5.v + drift()) },
          d7: { ...d.d7, v: clamp(d.d7.v + (Math.random() < 0.5 ? 0 : 1)) },
        }
      }
      return next
    })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setRefreshing(false)
      busy.current = false
    }, 1200)
  }

  const toggleForm = () => {
    setExpanded((v) => !v)
    setMorph(expanded ? "dock-contract-horizontal" : "dock-contract-vertical")
  }

  return (
    <div className={cn("w-full max-w-[520px] select-none", className)} onDoubleClick={toggleForm} title="双击切换展开 / 收缩">
      {expanded ? (
        <div
          className={cn(
            "relative flex w-full cursor-pointer flex-col gap-3 rounded-island border border-border-base bg-surface px-[18px] py-4 shadow-island",
            morph,
          )}
          onAnimationEnd={() => setMorph("")}
        >
          {refreshing ? <RefreshVeil /> : null}
          {/* 平台头部 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlatformLogo platform={platform} size={15} className={isClaude ? undefined : "text-logo-codex dark:text-[#F0F0F0]"} />
              <span className="text-sm font-bold text-text-primary">{isClaude ? "Claude" : "Codex"}</span>
              <Chip tone="green">Auth</Chip>
            </div>
            <span className="text-[11px] text-text-muted">{data0.sessions}</span>
          </div>

          {/* 平台切换 + 刷新 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5 rounded-btn bg-surface-2 p-[2px]">
              {(Object.keys(BASE) as DemoPlatform[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPlatform(p)
                  }}
                  className={cn(
                    "motion-button rounded-md px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                    p === platform ? "bg-surface text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {p === "claude" ? "Claude" : "Codex"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                refresh()
              }}
              aria-label="刷新额度"
              className="motion-button flex size-6 items-center justify-center rounded-full text-text-muted hover:bg-surface-2 hover:text-text-primary"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : undefined} />
            </button>
          </div>

          <QuotaRow w="5h" q={data0.h5} barClass="bg-green" />
          <QuotaRow w="7d" q={data0.d7} barClass="bg-green" />
          <div className="h-px w-full bg-border-base" />

          {/* 另一平台摘要行 */}
          <div className="flex items-center gap-2.5">
            <PlatformLogo platform={other} size={15} className={other === "claude" ? undefined : "text-logo-codex dark:text-[#F0F0F0]"} />
            <span className="text-sm font-bold text-text-primary">{other === "claude" ? "Claude" : "Codex"}</span>
            {(["h5", "d7"] as const).map((w) => (
              <span key={w} className="flex items-center gap-1.5">
                <Chip tone="neutral">{w}</Chip>
                <span className="h-[5px] w-[56px] overflow-hidden rounded-full bg-track">
                  <span
                    className={cn("motion-quota-bar block h-full rounded-full", other === "codex" ? "bg-accent" : "bg-green")}
                    style={{ width: `${otherData[w].v}%` }}
                  />
                </span>
                <span className="tnum font-mono text-xs font-semibold text-text-primary">{otherData[w].v}%</span>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Pulse
              value={isClaude ? data0.token : "—"}
              className="tnum font-mono text-xs font-semibold text-green-text"
            />
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green" />
              <span className="text-[11px] text-text-muted">实时刷新</span>
            </span>
          </div>
        </div>
      ) : (
        /* 收缩态胶囊：双击展开 */
        <div
          className={cn(
            "relative mx-auto flex w-fit cursor-pointer items-center gap-3 rounded-island border border-border-base bg-surface px-4 py-[11px] shadow-island",
            morph,
          )}
          onAnimationEnd={() => setMorph("")}
        >
          {refreshing ? <RefreshVeil /> : null}
          <PlatformLogo platform={platform} size={15} className={isClaude ? undefined : "text-logo-codex dark:text-[#F0F0F0]"} />
          <span className="text-[13px] font-semibold text-text-primary">{isClaude ? "Claude" : "Codex"}</span>
          <MiniQuota w="5h" q={data0.h5} />
          <MiniQuota w="7d" q={data0.d7} />
        </div>
      )}
    </div>
  )
}

/** 灵动岛 · 停靠条（贴边常驻细带；文案取自 island 托盘悬停摘要） */
export function IslandDock({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full max-w-[280px] flex-col gap-[7px] rounded-lg border border-border-base bg-surface px-3.5 py-2.5 shadow-island", className)}>
      <span className="text-[11px] text-text-secondary">{TRAY_TOOLTIP.connection}</span>
      <div className="h-[5px] w-full overflow-hidden rounded-full bg-track">
        <div className="motion-quota-bar h-full w-[59%] rounded-full bg-green" />
      </div>
      <span className="tnum text-[10px] text-text-muted">
        {TRAY_TOOLTIP.quotas.map((q) => `${q.key} ${q.value}`).join(" · ")} · {TRAY_TOOLTIP.updated}
      </span>
    </div>
  )
}
