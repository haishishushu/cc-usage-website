/**
 * 样例数据 —— 与 ai-usage-island 的 src/mock/data.ts 同源，全部取自
 * pencil-new.pen 画布内容，不自行编造。数值均为设计示例。
 */
import type { PlatformId } from "@/lib/platforms"

export type Platform = PlatformId

export type Connection = {
  id: string
  platform: Platform
  kind: "auth" | "api"
  name: string
  label: string
  masked: string
  status: "connected" | "expired"
  lastSyncText: string
}

export const CONNECTIONS: Connection[] = [
  {
    id: "c1",
    platform: "claude",
    kind: "auth",
    name: "个人账号",
    label: "官方订阅（20x）",
    masked: "",
    status: "connected",
    lastSyncText: "12 秒前",
  },
  {
    id: "c2",
    platform: "claude",
    kind: "api",
    name: "个人 API Key · sk-ant-****3f9a",
    label: "API Key",
    masked: "sk-ant-****3f9a",
    status: "connected",
    lastSyncText: "1 分钟前",
  },
  {
    id: "c3",
    platform: "codex",
    kind: "auth",
    name: "工作账号",
    label: "官方订阅（Plus）",
    masked: "",
    status: "expired",
    lastSyncText: "2 小时前",
  },
]

export type QuotaWindow = { key: string; windowName: string; usedPercent: number; usedText: string | null; resetCountdown: string }

/** Claude 官方账号双额度 */
export const CLAUDE_QUOTAS: QuotaWindow[] = [
  { key: "5h", windowName: "5 小时窗口 · 已用", usedPercent: 10, usedText: "已用 1.2k / 12k 消息", resetCountdown: "4h 51m" },
  { key: "7d", windowName: "7 天窗口 · 已用", usedPercent: 59, usedText: "已用 44.3k / 75k 消息", resetCountdown: "3d 7h" },
]

/** Codex 双额度 */
export const CODEX_QUOTAS: QuotaWindow[] = [
  { key: "5h", windowName: "5 小时窗口 · 已用", usedPercent: 52, usedText: null, resetCountdown: "2h 30m" },
  { key: "7d", windowName: "7 天窗口 · 已用", usedPercent: 72, usedText: null, resetCountdown: "5d 8h" },
]

export const TOTAL_DELTA_TEXT = "+12.4k Token"
export const RUNNING_SESSION_TEXT = "3 个会话运行中"

export type TokenSummary = { period: string; label: string; value: string; hint: string }
export const TOKEN_SUMMARIES: TokenSummary[] = [
  { period: "today", label: "今日", value: "12.84M", hint: "本地会话记录" },
  { period: "week", label: "本周", value: "84.21M", hint: "自周一 00:00 起" },
  { period: "month", label: "本月", value: "301.42M", hint: "自 09/01 起" },
  { period: "total", label: "累计", value: "1.24B", hint: "采集起点 2026/03/02" },
]

/** 今日按小时分桶的 24 点趋势示例；缓存创建第 22 点为 null，验证未知值断线。 */
const DEMO_FRESH_INPUT = [
  1_200, 800, 600, 600, 900, 2_100, 4_800, 12_000, 26_000, 41_000, 58_000, 63_000, 47_000, 38_000, 72_000, 96_000, 118_000,
  102_000, 84_000, 63_000, 48_000, 33_000, 21_000, 11_000,
]
const DEMO_OUTPUT = [
  400, 260, 180, 180, 300, 700, 1_500, 3_800, 8_100, 12_800, 18_000, 19_600, 14_600, 11_800, 22_400, 29_800, 36_600, 31_700,
  26_100, 19_600, 14_900, 10_200, 6_500, 3_400,
]
const DEMO_CACHE_WRITE: Array<number | null> = [
  0, 0, 0, 0, 0, 1_100, 2_600, 6_400, 13_800, 21_700, 30_600, 33_300, 24_800, 20_100, 38_100, 50_700, 62_200, 53_900, 44_300,
  33_300, 25_400, 17_400, null, 5_800,
]
const DEMO_CACHE_READ = [
  18_000, 12_000, 9_000, 9_000, 13_500, 31_500, 72_000, 180_000, 390_000, 615_000, 870_000, 945_000, 705_000, 570_000,
  1_080_000, 1_440_000, 1_770_000, 1_530_000, 1_260_000, 945_000, 720_000, 495_000, 315_000, 165_000,
]

export const DEMO_TREND = {
  labels: Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0")),
  series: [
    { key: "fresh_input", label: "新增输入", colorVar: "--chart-input", values: DEMO_FRESH_INPUT },
    { key: "output", label: "输出", colorVar: "--chart-output", values: DEMO_OUTPUT },
    { key: "cache_write", label: "缓存创建", colorVar: "--chart-write", values: DEMO_CACHE_WRITE },
    { key: "cache_read", label: "缓存命中", colorVar: "--chart-read", values: DEMO_CACHE_READ },
  ],
  /** 倒数第二点无法估算，验证成本线的断线渲染 */
  cost: DEMO_FRESH_INPUT.map((value, index) => (index === 22 ? null : Number(((value * 3 + DEMO_OUTPUT[index] * 15) / 1_000_000).toFixed(4)))),
  bucket: "1 小时",
}

export const DEMO_BREAKDOWN = {
  fresh_input: 2_491_000,
  output: 294_000,
  cache_write: 1_842_000,
  cache_read: 92_119_000,
  real_total: 94_902_897,
  requests: 568,
  cache_hit_rate: 92_119_000 / (2_491_000 + 1_842_000 + 92_119_000),
  avg_per_request: 94_902_897 / 568,
}

export const DEMO_MODELS = ["claude-opus-4-1", "claude-sonnet-4"]

export type RequestLogRow = {
  id: string
  time: string
  date: string
  model: string | null
  effort: string | null
  input: string | null
  output: string | null
  cost: string | null
  costEstimated?: boolean
  durationMs: number
  firstTokenMs: number
  status: { kind: "success" | "rate-limited" | "unknown"; label: string }
}

export const LOG_ROWS: RequestLogRow[] = [
  {
    id: "l1",
    time: "02:18:32",
    date: "09/14",
    model: "claude-sonnet-4-5-20250929",
    effort: "high",
    input: "1,927",
    output: "173",
    cost: "$0.1334",
    durationMs: 2150,
    firstTokenMs: 340,
    status: { kind: "success", label: "200" },
  },
  {
    id: "l2",
    time: "02:17:08",
    date: "09/14",
    model: "claude-opus-4-1-20250805-thinking-high-context",
    effort: "medium",
    input: "1,356",
    output: "1,122",
    cost: "$0.1740",
    durationMs: 64000,
    firstTokenMs: 12000,
    status: { kind: "success", label: "200" },
  },
  {
    id: "l3",
    time: "02:16:45",
    date: "09/14",
    model: "claude-sonnet-4-5-20250929",
    effort: null,
    input: null,
    output: null,
    cost: null,
    durationMs: 190000,
    firstTokenMs: 35000,
    status: { kind: "rate-limited", label: "429" },
  },
  {
    id: "l4",
    time: "02:15:02",
    date: "09/14",
    model: null,
    effort: "low",
    input: "842",
    output: "96",
    cost: "$0.0091",
    costEstimated: true,
    durationMs: 320000,
    firstTokenMs: 72000,
    status: { kind: "unknown", label: "成功" },
  },
]

export const LOG_TOTAL_COUNT = 161
export const LOG_PAGE_COUNT = 17

/** 托盘悬停摘要（停靠条展示采用同一组真实文案） */
export const TRAY_TOOLTIP = {
  app: "CC Usage",
  connection: "Claude · 官方订阅（20x）",
  quotas: [
    { key: "5h", value: "10%" },
    { key: "7d", value: "59%" },
  ],
  updated: "最近更新 12 秒前",
}
