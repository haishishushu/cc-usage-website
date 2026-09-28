/** Website-only translation for the same-origin desktop demo. The product bundle is not modified. */
import { PREVIEW_EXTRA_EN } from "./preview-extra"

const phrases: Record<string, string> = {
  ...PREVIEW_EXTRA_EN,
  "前端预览 · 数据均为设计示例": "Frontend preview · Example data",
  "画布对照": "Canvas comparison", "主面板": "Dashboard",
  "官方账号": "Official account", "API 连接": "API connection",
  "发现 v0.2.0": "Version v0.2.0 available",
  "该平台暂无连接": "No connection for this platform",
  "全部模型": "All models", "事件驱动": "Event driven",
  "本机 Claude CLI 会话记录": "Local Claude CLI sessions",
  "演示：": "Demo:", "演示:": "Demo:", "演示": "Demo", "双击": "Double-click", "展开": "Expand", "收缩": "Collapse",
  "已停靠": "Docked", "悬停探出": "Hover to reveal", "解除": "Undock",
  "切换主题": "Switch theme", "本轮任务已执行": "Current task runtime",
  "该会话实时采集的新增 Token": "New tokens collected live for this session",
  "该选项当前不可配置": "This option cannot be changed currently",
  "来源未提供该字段": "This field is unavailable from the source",
  "按公开 API 价目表乘 Token 数推算；订阅用户的实际支出是月费，不是该金额": "Estimated from public API prices and token counts; subscribers pay a monthly fee instead of this amount",
  "页码": "Page number",
  "吸附到": "Snap to", "吸附区": "snap zone",
  "当前统计来自本平台本机会话记录，无法按具体账号或 API Key 区分；「真实消耗」含缓存重读（每次请求都会重复计入上下文），因此大于灵动岛实时数——灵动岛与 Claude Code 终端一致，只计新鲜 Token（输入+输出）。「新增输入」已扣除缓存重读，是与灵动岛口径一致的那部分。「缓存创建」与「缓存命中」按会话记录中的对应字段统计。Codex Auth 的缓存创建零值无法证明实际创建量为零，显示「—」；其他来源记录为 0 时显示 0，字段缺失时显示「—」。缓存命中量不能反推创建量。": "These statistics come from local sessions for this platform and cannot be attributed to a specific account or API key. Total consumption includes cached rereads, so it exceeds the island's fresh-token figure. New input excludes cached rereads; cache creation and hits follow the session records. Missing values remain unknown, and cache hits do not imply cache creation.",
  "上格纵轴为 Token 用量，下格为按价目表估算的费用，两格共用同一根时间轴。成本单独成格而不是叠在同一绘图区上：两种量纲共用一个绘图区时，线条的交叉点由各自的缩放比例决定，不代表任何真实关系。当前分桶粒度：": "The upper chart shows tokens and the lower chart shows estimated cost on a shared time axis. They use separate scales because crossing lines in different units do not imply a real relationship. Current bucket size:",
  "切换周期后趋势图与请求日志同步更新，旧请求返回不得覆盖新选择的数据。": "Changing the period updates the chart and logs together; stale responses cannot overwrite the current selection.",
  "来源：": "Source: ", "按时间桶估算的费用趋势": "Estimated cost by time bucket",
  "Token 趋势：": "Token trend: ", "、": ", ",
  "整理接口文档与第三方鉴权流程说明与回归测试清单": "Document APIs, third-party authentication, and regression checks",
  "修复登录问题": "Fix login issue", "编写单元测试": "Write unit tests",
  "统计来源：本地会话记录（本机 Claude CLI 记录）· 最近更新": "Source: local Claude CLI sessions · Updated",
  "本机 Claude CLI 记录": "Local Claude CLI records",
  "统计来源：": "Source: ", "本地会话记录": "Local session records", "最近更新": "Updated",
  "个会话运行中": "sessions running", "运行中的会话": "Active sessions", "会话列表，可滚动查看全部会话": "Session list; scroll to see all sessions",
  "本轮已执行": "In progress", "耗时未知": "Duration unknown", "本地今日 Token": "Today's local tokens",
  "查看完整统计来源说明": "View data source details", "切换连接": "Switch connection",
  "官方订阅额度": "Official subscription quota", "已连接": "Connected", "尚未添加连接": "No connection added",
  "当前平台：": "Current platform:", "当前连接：": "Current connection:", "未选择连接": "No connection selected",
  "当前连接": "Current connection", "添加连接": "Add connection", "额度来源：账号额度接口": "Quota source: account API",
  "Claude 官方订阅": "Claude subscription", "5 小时窗口": "5-hour window", "7 天窗口": "7-day window",
  "重置倒计时": "Resets in", "已用": "Used", "正常": "Normal", "消息": "messages",
  "本地 Token 统计": "Local token statistics", "统计来源": "Data source", "模型筛选": "Model filter",
  "刷新方式": "Refresh mode", "今日": "Today", "本周": "This week", "本月": "This month",
  "累计": "All time", "自定义时间": "Custom dates", "采集起点": "Collection started",
  "真实消耗 Token": "Total tokens consumed", "请求数": "Requests", "平均每次": "Average per request",
  "估算费用": "Estimated cost", "估算成本": "Estimated cost", "估算": "Estimated",
  "新增输入": "New input", "输出": "Output", "缓存创建": "Cache creation", "缓存命中率": "Cache hit rate",
  "缓存命中": "Cache hits", "复用上方统计周期与模型筛选": "Uses the time range and model filter above",
  "复用上方统计周期、自定义时间范围与模型筛选": "Uses the time range, custom dates, and model filter above",
  "Token 趋势图": "Token trends", "请求日志": "Request logs", "设计示例": "Example data",
  "下格": "lower chart", "上格": "upper chart", "纵轴": "vertical axis", "时间轴": "time axis",
  "当前分桶粒度": "Current bucket size", "小时": "hour", "天": "day",
  "时间": "Time", "计费模型": "Billed model", "思考强度": "Reasoning effort",
  "输入": "Input", "总成本": "Total cost", "用时 / 首字": "Duration / first token",
  "用时": "Duration", "首字": "First token", "状态": "Status", "成功": "Success",
  "条记录": "records", "共": "Total", "上一页": "Previous", "下一页": "Next", "跳转": "Go",
  "总览": "Overview", "设置": "Settings", "最小化": "Minimize", "最大化": "Maximize",
  "关闭主面板": "Close dashboard", "仅桌面端可用": "Desktop app only",
  "发现新版本": "New version available", "点击下载": "Click to download",
  "双击展开": "Double-click to expand", "双击收缩": "Double-click to collapse",
  "解除停靠": "Undock", "显示灵动岛": "Show island", "重置窗口位置": "Reset window position",
  "使用中": "Active", "无额度来源": "No quota source", "已过期": "Expired",
  "无数据": "No data", "未知": "Unknown", "刷新": "Refresh", "筛选": "Filter",
  "清空": "Clear", "关闭": "Close", "取消": "Cancel", "确定": "Confirm", "保存": "Save",
  "连接管理": "Connections", "套餐查询": "Coding plans", "灵动岛": "Desktop island",
  "常规": "General", "代理": "Proxy", "外观": "Appearance", "数据": "Data",
  "浅色": "Light", "深色": "Dark", "跟随系统": "System",
  "暂停提醒": "Pause alerts", "开机启动": "Launch at login", "自动刷新": "Auto-refresh",
  "退出": "Quit", "本地": "Local", "账号": "Account", "额度": "Quota",
  "（": "(", "）": ")", "「": "“", "」": "”", "；": ";",
  "。": ".", "，": ", ", "：": ": ", "／": "/",
}

const ordered = Object.entries(phrases).sort(([left], [right]) => right.length - left.length)
const textSources = new WeakMap<Text, { source: string; rendered: string }>()
const attributeSources = new WeakMap<Element, Map<string, { source: string; rendered: string }>>()

function translate(source: string): string {
  if (["上", "下", "左", "右"].includes(source.trim())) {
    return source.replace(source.trim(), ({ "上": "top", "下": "bottom", "左": "left", "右": "right" } as Record<string, string>)[source.trim()])
  }
  const hiddenSeries = source.match(/^隐藏(.+?)，纵轴会按剩余系列重新缩放$/)
  if (hiddenSeries) return `Hide ${translate(hiddenSeries[1])}; the vertical axis rescales to the remaining series`
  if (source.includes("当前统计来自本平台本机会话记录")) {
    return "These statistics come from local sessions for this platform and cannot be attributed to a specific account or API key. Total consumption includes cached rereads, so it exceeds the island's fresh-token figure. New input excludes cached rereads; cache creation and hits follow the session records. Missing values remain unknown, and cache hits do not imply cache creation."
  }
  if (source.includes("上格纵轴为 Token 用量") || source.includes("upper chartvertical axis为 Token 用量")) {
    return "The upper chart shows tokens and the lower chart shows estimated cost on the same timeline. Separate scales keep different units from suggesting a false relationship."
  }
  let value = source
  for (const [zh, en] of ordered) value = value.replaceAll(zh, en)
  return value
}

/** Restore original Chinese when switched back; track React replacements without looping on our own writes. */
export function localizePreview(document: Document, language: "zh" | "en") {
  for (const button of document.querySelectorAll("button")) {
    if (!button.dataset.previewOriginalLabel) button.dataset.previewOriginalLabel = button.textContent?.trim() ?? ""
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const text = node as Text
    if (!text.parentElement || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(text.parentElement.tagName)) continue
    const current = text.nodeValue ?? ""
    const previous = textSources.get(text)
    const source = previous && current === previous.rendered ? previous.source : current
    const rendered = language === "en" ? translate(source) : source
    textSources.set(text, { source, rendered })
    if (current !== rendered) text.nodeValue = rendered
  }
  for (const element of document.querySelectorAll("[aria-label],[title],[placeholder]")) {
    let record = attributeSources.get(element)
    if (!record) { record = new Map(); attributeSources.set(element, record) }
    for (const name of ["aria-label", "title", "placeholder"]) {
      const current = element.getAttribute(name)
      if (current === null) continue
      const previous = record.get(name)
      const source = previous && current === previous.rendered ? previous.source : current
      const rendered = language === "en" ? translate(source) : source
      record.set(name, { source, rendered })
      if (current !== rendered) element.setAttribute(name, rendered)
    }
  }
}
