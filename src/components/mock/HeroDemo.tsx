import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { Chip, Pulse } from "@/components/ui"
import { PlatformLogo } from "@/components/Logo"
import { CODEX_QUOTAS, CLAUDE_QUOTAS, RUNNING_SESSION_TEXT, TOTAL_DELTA_TEXT } from "@/mock/data"

type Quota = { v: number; reset: string }
type DemoPlatform = "claude" | "codex"

/** 展开态与收缩态的初始水位（同 IslandInteractive 的设计样例，不编造数值）。 */
const BASE: Record<DemoPlatform, { h5: Quota; d7: Quota; token: string }> = {
  claude: {
    h5: { v: CLAUDE_QUOTAS[0].usedPercent, reset: CLAUDE_QUOTAS[0].resetCountdown },
    d7: { v: CLAUDE_QUOTAS[1].usedPercent, reset: CLAUDE_QUOTAS[1].resetCountdown },
    token: TOTAL_DELTA_TEXT,
  },
  codex: {
    h5: { v: CODEX_QUOTAS[0].usedPercent, reset: CODEX_QUOTAS[0].resetCountdown },
    d7: { v: CODEX_QUOTAS[1].usedPercent, reset: CODEX_QUOTAS[1].resetCountdown },
    token: "—",
  },
}

const clamp = (n: number) => Math.min(96, Math.max(1, n))

/** 刷新柔光：与 IslandMock 同一套 veil 裁剪层 + 斜向光带（动画定义见 index.css）。 */
function RefreshVeil() {
  return (
    <div className="island-refresh-veil">
      <div className="island-refresh-shimmer" />
    </div>
  )
}

/**
 * 首屏自动演示剧本 —— 让访问者在零操作下看懂灵动岛的完整交互循环：
 * 收缩贴边 → 双击涟漪 → 展开成卡 → 切换平台 → 刷新柔光与水位微涨 → 收回，约 10s 无缝循环。
 *
 * 实现约束：
 * - 状态机只改 class 与数据，所有运动走 transform/opacity（合成器线程，不占主线程）；
 * - 滚出视口即停表并重置回剧本开头，滚回来从头演，避免后台空转；
 * - prefers-reduced-motion 直接给静态展开态，不做任何自动运动。
 */
export function HeroDemo({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { inView, ref } = useInView()
  const [form, setForm] = useState<"capsule" | "card">("capsule")
  const [morph, setMorph] = useState("")
  const [ripple, setRipple] = useState(0)
  const [platform, setPlatform] = useState<DemoPlatform>("claude")
  const [data, setData] = useState(BASE)
  const [refreshing, setRefreshing] = useState(false)

  // 剧本步进：每步等待 wait 毫秒后执行 run；整组走完从头再来。
  useEffect(() => {
    if (!inView || reduced) return
    // 每次进入视口都从干净的收缩态开始，剧本节奏稳定可预期
    setForm("capsule")
    setMorph("")
    setRipple(0)
    setPlatform("claude")
    setData(BASE)
    setRefreshing(false)

    const expand = () => {
      setForm("card")
      setMorph("dock-contract-vertical")
    }
    const collapse = () => {
      setForm("capsule")
      setMorph("dock-contract-horizontal")
    }
    const doRefresh = () => {
      setRefreshing(true)
      setData((prev) => {
        const drift = () => Math.round(Math.random() * 4) - 2
        const step = (q: Quota): Quota => ({ ...q, v: clamp(q.v + drift()) })
        return { claude: { ...prev.claude, h5: step(prev.claude.h5) }, codex: { ...prev.codex, h5: step(prev.codex.h5) } }
      })
    }
    const resetForLoop = () => {
      setPlatform("claude")
      setRefreshing(false)
    }

    const STEPS: { wait: number; run: () => void }[] = [
      { wait: 2400, run: () => setRipple((n) => n + 1) },
      { wait: 700, run: expand },
      { wait: 1500, run: () => setPlatform("codex") },
      { wait: 1300, run: doRefresh },
      { wait: 1600, run: () => setRefreshing(false) },
      { wait: 1600, run: collapse },
      { wait: 1400, run: resetForLoop },
    ]

    // 执行第 i 步，等待该步的 wait 后进入下一步；末步绕回开头形成无缝循环
    let timer = 0
    const tick = (i: number) => {
      STEPS[i].run()
      const next = (i + 1) % STEPS.length
      timer = window.setTimeout(() => tick(next), STEPS[i].wait)
    }
    timer = window.setTimeout(() => tick(0), STEPS[0].wait)
    return () => window.clearTimeout(timer)
  }, [inView, reduced])

  const isClaude = platform === "claude"
  const d = data[platform]

  return (
    // 纯装饰演示，读屏软件跳过；语义信息由周围文字承载
    <div
      ref={ref}
      className={cn("relative flex w-full max-w-[560px] flex-col items-center select-none", className)}
      aria-hidden="true"
    >
      {/* 桌面场景：底部一条「屏幕边缘」，小岛贴在其上方 */}
      <div className="relative flex h-[268px] w-full items-end justify-center pb-[34px]">
        <div className="absolute bottom-[26px] h-px w-[86%] bg-gradient-to-r from-transparent via-border-strong to-transparent" />

        {form === "card" || reduced ? (
          /* 展开态卡片（reduced-motion 时作为静态替代） */
          <div
            className={cn(
              "relative w-full rounded-island border border-border-base bg-surface px-[18px] py-4 shadow-island",
              morph,
            )}
            onAnimationEnd={() => setMorph("")}
          >
            {refreshing ? <RefreshVeil /> : null}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlatformLogo platform={platform} size={15} className={isClaude ? undefined : "text-logo-codex dark:text-[#F0F0F0]"} />
                <span className="text-sm font-bold text-text-primary">{isClaude ? "Claude" : "Codex"}</span>
                <Chip tone="green">Auth</Chip>
              </div>
              <span className="text-[11px] text-text-muted">{RUNNING_SESSION_TEXT}</span>
            </div>

            {/* 平台切换指示器：滑块随剧本在两档间移动 */}
            <div className="mt-3 flex items-center justify-between">
              <div className="relative grid w-[132px] grid-cols-2 rounded-btn bg-surface-2 p-[2px]">
                <span
                  className="motion-indicator absolute inset-y-[2px] left-[2px] w-[calc(50%-2px)] rounded-md bg-surface shadow-sm"
                  style={{ transform: isClaude ? "translateX(0)" : "translateX(100%)" }}
                />
                {(["claude", "codex"] as DemoPlatform[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    tabIndex={-1}
                    className={cn(
                      "relative z-10 rounded-md py-0.5 text-[11px] font-medium transition-colors",
                      p === platform ? "text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {p === "claude" ? "Claude" : "Codex"}
                  </button>
                ))}
              </div>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green" />
                <span className="text-[11px] text-text-muted">实时刷新</span>
              </span>
            </div>

            <QuotaRow label="5h" q={d.h5} barClass={isClaude ? "bg-green" : "bg-accent"} />
            <QuotaRow label="7d" q={d.d7} barClass={isClaude ? "bg-green" : "bg-accent"} />
            <div className="h-px w-full bg-border-base" />
            <div className="flex items-center justify-between pt-2.5">
              <Pulse value={d.token} className="tnum font-mono text-xs font-semibold text-green-text" />
              <span className="font-mono text-[11px] text-text-muted">今日增量 · 本机会话</span>
            </div>
          </div>
        ) : (
          /* 收缩态胶囊：贴边常驻形态 */
          <div
            className={cn(
              "relative flex items-center gap-3 rounded-island border border-border-base bg-surface px-4 py-[11px] shadow-island",
              morph,
            )}
            onAnimationEnd={() => setMorph("")}
          >
            {refreshing ? <RefreshVeil /> : null}
            {ripple > 0 ? <span key={ripple} className="hero-ripple" /> : null}
            <PlatformLogo platform={platform} size={15} className={isClaude ? undefined : "text-logo-codex dark:text-[#F0F0F0]"} />
            <span className="text-[13px] font-semibold text-text-primary">{isClaude ? "Claude" : "Codex"}</span>
            <MiniQuota label="5h" q={d.h5} />
            <MiniQuota label="7d" q={d.d7} />
          </div>
        )}
      </div>
      <span className="text-[12px] text-text-muted">上图为自动演示 · 下滑到「灵动岛」一节可以亲手试</span>
    </div>
  )
}

function QuotaRow({ label, q, barClass }: { label: string; q: Quota; barClass: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-2.5">
      <Chip tone="purple">{label}</Chip>
      <div className="h-[5px] flex-1 rounded-full bg-track">
        <div className={cn("motion-quota-bar h-full rounded-full", barClass)} style={{ width: `${q.v}%` }} />
      </div>
      <Pulse value={`${q.v}%`} className="tnum w-9 text-right font-mono text-xs font-semibold text-text-primary" />
      <span className="tnum font-mono text-[11px] text-text-muted">{q.reset}</span>
    </div>
  )
}

function MiniQuota({ label, q }: { label: string; q: Quota }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] text-text-muted">{label}</span>
      <span className="h-1 w-10 overflow-hidden rounded-full bg-track">
        <span className="motion-quota-bar block h-full rounded-full bg-green" style={{ width: `${q.v}%` }} />
      </span>
      <Pulse value={`${q.v}%`} className="tnum font-mono text-[10px] font-semibold text-text-primary" />
    </span>
  )
}

/** 读取系统「减少动态效果」偏好（与 App.tsx 的 useAutoReveal 同一判断口径）。 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

/** 仅在进入视口后推进剧本；离开视口即停，滚回来重头演。 */
function useInView() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(node)
    return () => io.disconnect()
  }, [])
  return { inView, ref }
}
