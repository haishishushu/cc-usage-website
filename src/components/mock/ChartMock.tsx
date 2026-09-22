import { Fragment, useMemo, useRef, useState } from "react"
import type { MouseEvent } from "react"
import { ChevronDown } from "lucide-react"
import { Chip } from "@/components/ui"
import { cn } from "@/lib/cn"
import { DEMO_MODELS, DEMO_TREND, LOG_PAGE_COUNT, LOG_ROWS, LOG_TOTAL_COUNT } from "@/mock/data"

const W = 1080
const H = 200

/** 数值格式化：>=1M 显示 X.XXM，>=1K 显示 XXXK */
const fmtValue = (v: number) => (v >= 1_000_000 ? `${(v / 1_000_000).toFixed(2)}M` : v >= 1_000 ? `${Math.round(v / 1_000)}K` : String(v))
const fmtCost = (v: number) => `$${v.toFixed(2)}`

/** 未知值（null）断线：按段拆分 path */
function toSegmentedLine(values: Array<number | null>) {
  const stepX = W / (values.length - 1)
  const segs: string[] = []
  let current = ""
  values.forEach((v, i) => {
    if (v === null) {
      if (current) segs.push(current)
      current = ""
      return
    }
    const x = Math.round(i * stepX * 10) / 10
    const y = Math.round((H - v) * 10) / 10
    current += `${current ? " L" : "M"}${x},${y}`
  })
  if (current) segs.push(current)
  return segs
}

/** 时长与首字延迟格式化（与画布样例一致：2.1s / 1m4s；340ms / 12.0s） */
const fmtDuration = (ms: number) => {
  const s = ms / 1000
  if (s < 60) return `${s.toFixed(1)}s`
  return `${Math.floor(s / 60)}m${Math.round(s % 60)}s`
}
const fmtFirstToken = (ms: number) => {
  if (ms < 1000) return `首字 ${ms}ms`
  const s = ms / 1000
  if (s < 60) return `首字 ${s.toFixed(1)}s`
  return `首字 ${Math.floor(s / 60)}m${Math.round(s % 60)}s`
}

function LegendButton({ colorVar, label, visible, dashed, onClick }: { colorVar?: string; label: string; visible?: boolean; dashed?: boolean; onClick?: () => void }) {
  if (!onClick) {
    return (
      <span className={cn("flex items-center gap-1.5", dashed && "opacity-40")}>
        {dashed ? (
          <span className="h-0.5 w-4 rounded-full bg-chart-cost" />
        ) : (
          <span className="size-[7px] rounded-full" style={{ background: `var(${colorVar})` }} />
        )}
        <span className="text-xs text-text-secondary">{label}</span>
      </span>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={visible}
      className={cn("flex items-center gap-1.5 rounded-full px-2 py-1 transition-opacity hover:bg-surface-2", visible ? "opacity-100" : "opacity-40")}
    >
      <span className="size-[7px] rounded-full" style={{ background: `var(${colorVar})` }} />
      <span className={cn("text-xs text-text-secondary", !visible && "line-through")}>{label}</span>
    </button>
  )
}

/** Token 趋势图 mock —— island 的 24 点真实样例：双格（Token 上格 / 估算成本下格）、
    图例点击显隐、悬停联动查看该小时数值；未知值断线。 */
export function TrendChartMock() {
  const [visible, setVisible] = useState<Record<string, boolean>>({ fresh_input: true, output: true, cache_write: true, cache_read: true })
  const [hover, setHover] = useState<number | null>(null)
  const plotRef = useRef<HTMLDivElement>(null)

  const toggle = (key: string) => setVisible((v) => ({ ...v, [key]: !v[key] }))
  const anyVisible = DEMO_TREND.series.some((s) => visible[s.key])

  const maxToken = Math.max(...DEMO_TREND.series.map((s) => Math.max(...(s.values as number[]).filter((v): v is number => v !== null))))
  const maxCost = Math.max(...DEMO_TREND.cost.filter((v): v is number => v !== null))
  const tokenTicks = [maxToken, (maxToken * 2) / 3, maxToken / 3, 0]
  const costTicks = [maxCost, (maxCost * 2) / 3, maxCost / 3, 0]
  const tickFmt = (v: number) => (v === 0 ? "0" : v >= 1_000_000 ? `${(v / 1_000_000).toFixed(2)}M` : `${Math.round(v / 1_000)}K`)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = plotRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setHover(Math.round(ratio * 23))
  }

  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface p-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[15px] font-bold text-text-primary">Claude Token 趋势图</span>
        <span className="text-[11px] text-text-muted">分组粒度 {DEMO_TREND.bucket} · 点击图例显隐 · 悬停查看数值</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {DEMO_TREND.series.map((s) => (
          <LegendButton key={s.key} colorVar={s.colorVar} label={s.label} visible={visible[s.key]} onClick={() => toggle(s.key)} />
        ))}
        <LegendButton dashed label="估算成本（下格）" />
      </div>

      {/* 上格：Token 用量 */}
      <div className="flex gap-2.5">
        <div className="flex h-[200px] w-[58px] flex-col items-end justify-between">
          {tokenTicks.map((v, i) => (
            <span key={i} className="tnum font-mono text-[10px] text-text-muted">
              {tickFmt(v)}
            </span>
          ))}
        </div>
        <div ref={plotRef} className="relative h-[200px] flex-1 cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-px w-full bg-chart-grid" />
            ))}
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
            {visible.cache_read ? (
              <>
                {toSegmentedLine(DEMO_TREND.series[3].values).map((seg, i) => (
                  <path key={i} d={`${seg} L${W},${H} L0,${H} Z`} fill="rgb(5 150 105 / 0.12)" />
                ))}
              </>
            ) : null}
            {DEMO_TREND.series.map(
              (s, si) =>
                visible[s.key] ? (
                  <g key={s.key}>
                    {toSegmentedLine(s.values).map((seg, i) => (
                      <path
                        key={i}
                        d={seg}
                        fill="none"
                        stroke={`var(${s.colorVar})`}
                        strokeWidth={si === 3 ? 2 : 1.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    ))}
                  </g>
                ) : null,
            )}
          </svg>
          {hover !== null && anyVisible ? (
            <HoverLayer
              hover={hover}
              entries={DEMO_TREND.series.filter((s) => visible[s.key]).map((s) => ({
                label: s.label,
                colorVar: s.colorVar,
                text: s.values[hover] === null ? "—" : fmtValue(s.values[hover] as number),
              }))}
              title={hover === null ? "" : `${HOURS(hover)}`}
            />
          ) : null}
        </div>
      </div>

      {/* 下格：估算成本 */}
      <div className="flex gap-2.5">
        <div className="flex h-[64px] w-[58px] flex-col items-end justify-between">
          {costTicks.map((v, i) => (
            <span key={i} className="tnum font-mono text-[10px] text-text-muted">
              {fmtCost(v)}
            </span>
          ))}
        </div>
        <div className="relative h-[64px] flex-1">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-px w-full bg-chart-grid" />
            ))}
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden style={{ height: 64 }}>
            {toSegmentedLine(DEMO_TREND.cost).map((seg, i) => (
              <path key={i} d={seg} fill="none" stroke="var(--chart-cost)" strokeWidth="1.5" strokeDasharray="5 4" />
            ))}
          </svg>
          {hover !== null ? (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute top-0 h-full w-px bg-border-strong" style={{ left: `${(hover / 23) * 100}%` }} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between pl-[66px]">
        {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
          <span key={h} className="tnum font-mono text-[10px] text-text-muted">
            {DEMO_TREND.labels[h]}
          </span>
        ))}
      </div>
    </div>
  )
}

const HOURS = (i: number) => `${String(i).padStart(2, "0")}:00`

function HoverLayer({
  hover,
  entries,
  title,
}: {
  hover: number
  entries: { label: string; colorVar: string; text: string }[]
  title: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      <div className="absolute top-0 h-full w-px bg-border-strong" style={{ left: `${(hover / 23) * 100}%` }} />
      {entries.map((e) => (
        <HoverDot key={e.label} hover={hover} colorVar={e.colorVar} />
      ))}
      <div
        className="absolute top-1 min-w-[160px] rounded-lg border border-border-base bg-surface px-3 py-2 text-left shadow-card"
        style={{ left: `clamp(85px, ${(hover / 23) * 100}%, calc(100% - 85px))` }}
      >
        <div className="tnum mb-1 font-mono text-[11px] font-semibold text-text-primary">{title}</div>
        {entries.map((e) => (
          <div key={e.label} className="flex items-center justify-between gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="size-1.5 rounded-full" style={{ background: `var(${e.colorVar})` }} />
              {e.label}
            </span>
            <span className="tnum font-mono text-text-primary">{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HoverDot({ hover, colorVar }: { hover: number; colorVar: string }) {
  const key = DEMO_TREND.series.find((s) => s.colorVar === colorVar)
  if (!key) return null
  const v = key.values[hover]
  if (v === null) return null
  return (
    <span
      className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface"
      style={{ left: `${(hover / 23) * 100}%`, top: `${((H - v) / H) * 100}%`, background: `var(${colorVar})` }}
    />
  )
}

const STATUS_BADGE: Record<string, { bg: string; text: string; prefix: string }> = {
  success: { bg: "bg-green-soft", text: "text-green-text", prefix: "✓" },
  "rate-limited": { bg: "bg-amber-soft", text: "text-amber", prefix: "⚠" },
  unknown: { bg: "bg-neutral-soft", text: "text-text-secondary", prefix: "—" },
}

const FILTERS = ["all", ...(DEMO_MODELS as string[])] as const

/** 请求日志表 mock —— island 的 4 条真实样例行：模型筛选、点击行展开原始字段。 */
export function RequestLogMock() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const rows = useMemo(() => (filter === "all" ? LOG_ROWS : LOG_ROWS.filter((r) => r.model?.startsWith(filter))), [filter])

  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface p-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[15px] font-bold text-text-primary">Claude 请求日志</span>
        <span className="text-[11px] text-text-muted">来源: 本地会话记录 · 支持自定义时间范围与模型筛选 · 点击行查看详情</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-5 rounded-lg border border-border-base bg-surface-2 px-3 py-1.5 text-xs text-text-primary"
          >
            {filter === "all" ? "全部模型" : filter}
            <ChevronDown size={13} className={cn("text-text-muted transition-transform", filterOpen && "rotate-180")} />
          </button>
          {filterOpen ? (
            <div className="absolute top-full left-0 z-10 mt-1 w-[190px] rounded-[10px] border border-border-base bg-surface p-1 shadow-card">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFilter(f)
                    setExpanded(null)
                    setFilterOpen(false)
                  }}
                  className={cn(
                    "tnum block w-full rounded-md px-3 py-2 text-left font-mono text-xs hover:bg-surface-2",
                    filter === f ? "font-semibold text-accent" : "text-text-primary",
                  )}
                >
                  {f === "all" ? "全部模型" : f}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <span className="tnum text-xs text-text-muted">
          共 {LOG_TOTAL_COUNT} 条 · 当前展示最近 {rows.length} 条
        </span>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-border-base">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-base bg-surface-2 text-xs font-medium text-text-secondary">
              {["时间", "计费模型", "思考强度", "输入", "输出", "总成本", "用时 / 首字", "状态"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-center font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <Fragment key={r.id}>
                <tr
                  onClick={() => setExpanded((v) => (v === r.id ? null : r.id))}
                  className={cn("cursor-pointer border-b border-border-base transition-colors hover:bg-surface-2", expanded === r.id && "bg-surface-2")}
                >
                  <td className="px-4 py-3 text-center">
                    <div className="tnum font-mono text-xs text-text-primary">{r.time}</div>
                    <div className="tnum font-mono text-[10px] text-text-muted">{r.date}</div>
                  </td>
                  <td className="tnum max-w-[240px] truncate px-4 py-3 text-center font-mono text-xs text-text-primary">{r.model ?? "—"}</td>
                  <td className="tnum px-4 py-3 text-center font-mono text-xs text-text-secondary">{r.effort ?? "—"}</td>
                  <td className="tnum px-4 py-3 text-center font-mono text-xs text-text-primary">{r.input ?? "—"}</td>
                  <td className="tnum px-4 py-3 text-center font-mono text-xs text-text-primary">{r.output ?? "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="tnum font-mono text-xs text-text-primary">{r.cost ?? "—"}</div>
                    {r.costEstimated ? <div className="text-[10px] text-amber">估算</div> : null}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={r.status.kind === "success" ? "text-green-text" : r.status.kind === "rate-limited" ? "text-amber" : "text-text-secondary"}>
                      <span className="tnum font-mono text-xs">{fmtDuration(r.durationMs)}</span>
                    </div>
                    <div className="tnum font-mono text-[10px] text-text-muted">{fmtFirstToken(r.firstTokenMs)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      {(() => {
                        const badge = STATUS_BADGE[r.status.kind]
                        return (
                          <Chip className={cn(badge.bg, badge.text)}>
                            {badge.prefix} {r.status.label}
                          </Chip>
                        )
                      })()}
                    </div>
                  </td>
                </tr>
                {expanded === r.id ? (
                  <tr className="border-b border-border-base bg-surface-2">
                    <td colSpan={8} className="px-6 py-3">
                      <div className="tnum flex flex-wrap gap-x-10 gap-y-1.5 font-mono text-[11px] text-text-secondary">
                        <span>
                          请求 ID: <span className="text-text-primary">{r.id}</span>
                        </span>
                        <span>
                          完整模型: <span className="text-text-primary">{r.model ?? "—"}</span>
                        </span>
                        <span>
                          总耗时: <span className="text-text-primary">{r.durationMs}ms</span>
                        </span>
                        <span>
                          首字延迟: <span className="text-text-primary">{r.firstTokenMs}ms</span>
                        </span>
                        <span>
                          状态: <span className="text-text-primary">{r.status.label}</span>
                        </span>
                        {r.costEstimated ? <span className="text-amber">成本为估算值</span> : null}
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tnum text-right font-mono text-[11px] text-text-muted">
        第 1 / {LOG_PAGE_COUNT} 页 · 演示仅含最近 {rows.length} 条样本
      </div>
    </div>
  )
}
