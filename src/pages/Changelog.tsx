import { useEffect, useState } from "react"
import { ArrowUpRight, Bell, Github, Plus, Sparkles, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { RELEASES_URL, REPO_URL } from "@/lib/version"
import { Chip } from "@/components/ui"
import { usePageTitle } from "@/lib/usePageTitle"
import { useDictionary, useText } from "@/lib/locale"
import { CHANGELOG_EN } from "@/i18n/changelog"

type ChangeGroup = { icon: LucideIcon; title: string; items: string[]; tone: string }
type ReleaseEntry = {
  title: string
  badge: string
  date: string
  summary: string
  url: string
  groups: ChangeGroup[]
  commits: string[]
}

const RELEASES: ReleaseEntry[] = [
  {
    title: "v0.1.20", badge: "正式版", date: "2026-10-01",
    summary: "右键灵动岛即可开启或销毁分身，同时盯多个连接。",
    url: `${REPO_URL}/releases/tag/v0.1.20`,
    groups: [
      { icon: Sparkles, title: "新功能", tone: "text-text-primary", items: [
        "灵动岛右键菜单新增「开启分身」「销毁分身」；至少保留一个灵动岛，菜单右上角以纯数字显示当前灵动岛总数。",
        "每个分身各自选择连接、独立停靠与定位，重启后原样恢复；置顶、透明度与显示开关对所有岛同时生效。",
        "销毁本体时由第一个分身接任；托盘摘要与主面板默认连接继续跟随本体。",
      ] },
      { icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
        "额度展示的测试期望同步改为「剩余」口径，持续构建恢复通过。",
      ] },
    ],
    commits: ["d499c93", "50a2923"],
  },
  {
    title: "v0.1.19", badge: "正式版", date: "2026-09-29",
    summary: "额度显示统一为「剩余」口径。",
    url: `${REPO_URL}/releases/tag/v0.1.19`,
    groups: [{ icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
      "灵动岛、停靠条、主面板额度卡片、连接预览与托盘摘要统一显示剩余百分比，水位条长度随剩余额度变短。",
      "修正 Grok / Zcode 托盘摘要与其他界面口径不一致的问题；告警阈值换算为剩余 25% 与 10%，与原「已用 75% / 90%」完全等价。",
    ] }],
    commits: ["25f426f"],
  },
  {
    title: "v0.1.18", badge: "正式版", date: "2026-09-28",
    summary: "读写分离并削减采集与界面刷新开销，会话运行期间统计查询与灵动岛不再卡顿。",
    url: `${REPO_URL}/releases/tag/v0.1.18`,
    groups: [{ icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
      "统计、日志与实时快照改走只读连接池，采集写入按文件持锁，查询不再等待采集完成。",
      "实时推送区分数据变化与心跳续期，总览、费用与积分只在数据变化时刷新；额度、余额与 API 用量按最大缓存年龄刷新，减少重复上游请求。",
      "本机来源按行增量续读并按戳记跳过未变化文件；灵动岛追数改为叶子订阅，不再整树重渲染。",
      "字体改为 woff2 子集并预加载，连接切换器按需加载，灵动岛首屏体积明显下降。",
    ] }],
    commits: ["a01982a"],
  },
  {
    title: "v0.1.17", badge: "正式版", date: "2026-09-28",
    summary: "项目介绍顶图替换为灵动岛展示。",
    url: `${REPO_URL}/releases/tag/v0.1.17`,
    groups: [{ icon: Wrench, title: "文档更新", tone: "text-text-secondary", items: [
      "中英文项目介绍的顶图改为灵动岛截图，首屏直接展示核心入口。",
    ] }],
    commits: ["cbcf1f9"],
  },
  {
    title: "v0.1.16", badge: "正式版", date: "2026-09-28",
    summary: "重写中英文使用指南并补齐安装配置与数据说明。",
    url: `${REPO_URL}/releases/tag/v0.1.16`,
    groups: [{ icon: Wrench, title: "文档更新", tone: "text-text-secondary", items: [
      "重写中文使用指南并同步英文版，整理安装配置、首次使用、日常操作、统计口径与数据保留说明。",
    ] }],
    commits: ["1cacc2a"],
  },
  {
    title: "v0.1.15", badge: "正式版", date: "2026-09-28",
    summary: "修复更新或重启后灵动岛未恢复上次连接的问题。",
    url: `${REPO_URL}/releases/tag/v0.1.15`,
    groups: [{ icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
      "读取旧版本设置时，缺失字段单独补充默认值，保留已保存的灵动岛平台、连接和名称。",
      "后台数据初始化完成后，自动刷新连接列表与灵动岛设置，恢复上次选择的连接，无需手动重新切换。",
      "修复启动时连接刷新先后顺序导致的异常，避免较早失败的请求覆盖后来成功读取的连接状态。",
    ] }],
    commits: ["2e4abf6"],
  },
  {
    title: "v0.1.14", badge: "正式版", date: "2026-09-28",
    summary: "每个版本独立发布，安装包与更新清单对应同一版本。",
    url: `${REPO_URL}/releases/tag/v0.1.14`,
    groups: [{ icon: Wrench, title: "发布与质量", tone: "text-text-secondary", items: [
      "新版本使用独立的版本标签与发行页，历史安装包保留在各自版本下，不再混放到同一个发行页。",
      "发布更新清单前校验 Windows、macOS 与 Linux 安装包是否齐全，并检查文件名、版本号和下载地址一致。",
      "v0.1.9 至 v0.1.13 的原始安装包已分别归档到对应发行页；官网可按版本查看并下载。",
    ] }],
    commits: ["0a06adc"],
  },
  {
    title: "v0.1.13", badge: "正式版", date: "2026-09-28",
    summary: "优化启动体验，记住主面板位置，并加入首次使用引导。",
    url: `${REPO_URL}/releases/tag/v0.1.13`,
    groups: [
      { icon: Sparkles, title: "新功能", tone: "text-text-primary", items: [
        "启动时显示加载过渡，主面板就绪后再进入界面，减少启动等待时的空白感。",
        "重复点击快捷方式会唤起已有程序，始终保持单实例运行。",
        "首次启动自动打开主面板并水平、垂直居中；之后恢复上次保存的位置与尺寸。",
        "首次使用时，灵动岛先在桌面上方居中显示 5 秒，再自动贴边，帮助用户找到入口。",
      ] },
      { icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
        "从主面板启用连接后，灵动岛自动刷新该连接的额度与本机会话。",
        "更新提示与安装确认统一采用绿色状态样式。",
        "避免把最小化时的异常坐标记为窗口位置；显示器或分辨率变化后，主面板仍保持在可见区域。",
      ] },
    ],
    commits: ["d3e4af3"],
  },
  {
    title: "v0.1.12", badge: "正式版", date: "2026-09-28",
    summary: "统一自动发行的版本递增规则。",
    url: `${REPO_URL}/releases/tag/v0.1.12`,
    groups: [{ icon: Wrench, title: "发布与质量", tone: "text-text-secondary", items: [
      "按已发布版本递增修订号，避免工作流运行次数影响版本编号。",
      "修订号从 99 递增到 100，下一版次版本加 1、修订号归零，例如 0.1.100 → 0.2.0。",
    ] }],
    commits: ["8837fe6"],
  },
  {
    title: "v0.1.11",
    badge: "历史版本",
    date: "2026-09-27",
    summary: "修复持续构建的发行标题与最新版本标记。",
    url: `${REPO_URL}/releases/tag/v0.1.11`,
    groups: [{ icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
      "修复旧持续构建流程发布后标题仍停留在旧版本的问题，并同步最新发行标记。",
    ] }],
    commits: ["adf6ceb"],
  },
  {
    title: "v0.1.10", badge: "历史版本", date: "2026-09-27",
    summary: "修正最新发行版识别与更新回退地址。",
    url: `${REPO_URL}/releases/tag/v0.1.10`,
    groups: [{ icon: Wrench, title: "改进与修复", tone: "text-text-secondary", items: [
      "持续构建不再标为预发布，修正最新发行版徽章及回退下载地址指向旧版本的问题。",
    ] }],
    commits: ["0e83998"],
  },
  {
    title: "v0.1.9", badge: "历史版本", date: "2026-09-27",
    summary: "完善应用内自动更新，新增 ZCode 额度查询与连接用量展示。",
    url: `${REPO_URL}/releases/tag/v0.1.9`,
    groups: [
      {
        icon: Sparkles, title: "新功能", tone: "text-text-primary",
        items: [
          "自动更新打通检查、下载、签名校验、安装与重启；下载完成后由用户点击安装，失败时可重试。",
          "ZCode 读取本机 BigModel Coding Plan API Key 查询套餐剩余额度；未配置该 Key 时明确提示，账号登录额度不冒充可查询。",
          "连接列表新增额度 / 用量列，显示各连接可取得的额度、余额或本机统计，检测连接后可刷新当前行。",
          "灵动岛、主面板与托盘摘要补充剩余额度及来源说明；不支持在线查询时展示原因，避免把本机消耗当成余额。",
        ],
      },
      {
        icon: Wrench, title: "改进与修复", tone: "text-text-secondary",
        items: [
          "更新检查支持系统代理，下载进度与签名校验状态在应用内可见。",
        ],
      },
    ],
    commits: ["749f3de"],
  },
  {
    title: "使用文档与展示资料",
    badge: "文档更新",
    date: "2026-09-23",
    summary: "补齐面向用户的说明与真实界面截图。",
    url: `${REPO_URL}/commits/main/`,
    groups: [{
      icon: Wrench, title: "改进", tone: "text-text-secondary",
      items: [
        "重写中文使用文档并新增英文说明，整理安装、连接、额度来源及使用步骤。",
        "补充灵动岛收缩 / 展开、主面板、设置、请求日志和托盘菜单的界面截图。",
        "新增发行说明模板，并将本地数据库与凭证文件加入忽略规则。",
      ],
    }],
    commits: ["7b9ff43", "c1e9179"],
  },
  {
    title: "v0.1.0",
    badge: "正式版",
    date: "2026-09-22",
    summary: "首个带正式版本标签的桌面端发行版。",
    url: `${REPO_URL}/releases/tag/v0.1.0`,
    groups: [
      {
        icon: Sparkles, title: "核心功能", tone: "text-text-primary",
        items: [
          "灵动岛常驻桌面：无边框透明窗口、四边吸附、双击展开与停靠条。",
          "主面板展示额度水位、本地 Token 统计、趋势图、请求日志与连接设置。",
          "增量读取 Claude 与 Codex 本机会话，分别按 message.id / response_id 去重；统计存入本地 SQLite。",
          "支持今日、本周、本月、累计及自定义日期统计，趋势图和请求日志可按模型筛选。",
          "接入 Claude / Codex 官方额度，以及智谱 GLM、Kimi、MiniMax、ZenMux、OpenCode Go、火山方舟与 Grok 编程套餐查询；无法验证的额度保留未知状态。",
          "连接管理覆盖 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy，按各平台本机来源展示可用信息。",
          "连接支持本机凭证发现、编辑、检测与余额提醒；手动接入时可从 GLM、Kimi、DeepSeek 等供应商预设填入服务地址。",
          "编辑连接时回填已保存字段，API Key 默认密文显示并可切换明文；检测连接会用已保存的凭证做轻量验证并展示延迟。",
          "按模型获取官方能力信息并筛选思考强度；启用连接时写入已支持的 Claude Code / Codex 配置，写入前自动备份。",
          "请求日志按状态显示上游真实响应码，未上报响应码时按成功状态展示。",
          "系统托盘提供窗口开关和用量摘要；主面板关闭时隐藏窗口，后台采集继续运行。",
          "提供浅色 / 深色主题、中文 NSIS 安装向导和应用内更新入口。",
        ],
      },
      {
        icon: Wrench, title: "发布与质量", tone: "text-text-secondary",
        items: [
          "加入前端状态与交互测试、桌面验收脚本和资源生成脚本。",
          "建立主分支持续构建流程，生成多平台安装包并统一发行文件命名。",
          "修复 macOS 透明窗口编译与焦点事件兼容问题。",
        ],
      },
    ],
    commits: ["c1fc059"],
  },
]

type ReleaseVersion = { tag: string }

/** GitHub 的独立发行版是版本列表的权威来源，按版本号排序而非迁移日期。 */
function VersionIndex() {
  const t = useText()
  const [versions, setVersions] = useState<ReleaseVersion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const all: ReleaseVersion[] = []
        for (let page = 1; page <= 10; page += 1) {
          const response = await fetch(`https://api.github.com/repos/haishishushu/cc-usage/releases?per_page=100&page=${page}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          })
          if (!response.ok) throw new Error(`GitHub API: ${response.status}`)
          const batch = await response.json() as Array<{ tag_name?: string }>
          all.push(...batch.filter((item) => /^v\d+\.\d+\.\d+$/.test(item.tag_name ?? "")).map((item) => ({ tag: item.tag_name! })))
          if (batch.length < 100) break
        }
        all.sort((left, right) => {
          const a = left.tag.slice(1).split(".").map(Number)
          const b = right.tag.slice(1).split(".").map(Number)
          for (let index = 0; index < 3; index += 1) if (a[index] !== b[index]) return b[index] - a[index]
          return 0
        })
        if (!controller.signal.aborted) setVersions(all)
      } catch {
        // API 不可用时仍保留 GitHub Releases 列表入口。
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void load()
    return () => controller.abort()
  }, [])

  return (
    <section className="mx-auto w-full max-w-[800px] px-6 pb-12">
      <h2 className="text-xl font-bold text-text-primary">{t("按版本查看", "Browse by version")}</h2>
      <p className="mt-2 text-sm leading-7 text-text-secondary">{t("每个版本都有独立发行页，进入后仅下载该版本的安装包。", "Each version has its own release page with installers for that version only.")}</p>
      {versions.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {versions.map(({ tag }) => (
            <a key={tag} href={`${REPO_URL}/releases/tag/${tag}`} target="_blank" rel="noreferrer"
              className="group flex items-center justify-between rounded-card border border-border-base bg-surface px-4 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
              aria-label={t(`查看 ${tag} 的发行页`, `View release ${tag}`)}>
              <span className="tnum">{tag}</span><ArrowUpRight size={16} className="text-text-muted group-hover:text-accent" />
            </a>
          ))}
        </div>
      ) : (
        <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          {loading ? t("正在读取版本列表…", "Loading versions…") : t("在 GitHub 查看全部版本", "View all versions on GitHub")}
          <ArrowUpRight size={15} />
        </a>
      )}
    </section>
  )
}

function TimelineItem({ icon: Icon, title, items, tone }: ChangeGroup) {
  const tr = useDictionary(CHANGELOG_EN)
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <Icon size={15} className={tone} />
        <span className="text-sm font-bold text-text-primary">{tr(title)}</span>
      </div>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2.5">
          <Plus size={13} className="mt-[5px] shrink-0 text-green" />
          <span className="text-[13px] leading-[1.8] text-text-secondary">{tr(item)}</span>
        </div>
      ))}
    </section>
  )
}

function ReleaseCard({ release, first }: { release: ReleaseEntry; first: boolean }) {
  const tr = useDictionary(CHANGELOG_EN)
  return (
    <div className="relative flex flex-col gap-[18px] border-l border-border-base pb-9 pl-[26px] last:pb-2">
      <span className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full ${first ? "bg-accent" : "bg-border-strong"}`} />
      <div className="flex flex-wrap items-center gap-2.5">
        <a href={release.url} target="_blank" rel="noreferrer" className="tnum font-mono text-[22px] font-bold text-text-primary hover:text-accent">
          {tr(release.title)}
        </a>
        <Chip tone={first ? "blue" : "neutral"}>{tr(release.badge)}</Chip>
        <span className="tnum font-mono text-[13px] text-text-muted">{release.date}</span>
      </div>
      <div className="flex flex-col gap-4 rounded-card border border-border-base bg-surface p-[22px]">
        <p className="text-[13px] leading-[1.8] text-text-secondary">{tr(release.summary)}</p>
        {release.groups.map((group) => <TimelineItem key={group.title} {...group} />)}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-base pt-3 text-xs text-text-muted">
          <span>{tr("来源提交")}</span>
          {release.commits.map((commit) => (
            <a key={commit} href={`${REPO_URL}/commit/${commit}`} target="_blank" rel="noreferrer" className="tnum font-mono text-accent hover:underline">
              {commit}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChangelogPage() {
  const tr = useDictionary(CHANGELOG_EN)
  usePageTitle(tr("更新日志 — CC Usage 版本发布记录"))
  return (
    <>
      <section className="flex flex-col items-center gap-3 bg-bg px-6 pb-12 pt-16 text-center">
        <h1 className="text-[40px] font-bold tracking-tight text-text-primary">{tr("更新日志")}</h1>
        <p className="text-[15px] text-text-secondary">{tr("每个版本单独发布，查看对应的安装包与更新记录。")}</p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="motion-button inline-flex items-center gap-2 rounded-btn bg-text-primary px-[18px] py-[9px] text-[13px] font-semibold text-bg">
            <Bell size={14} />{tr("查看最新发布")}
          </a>
          <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer" className="motion-button inline-flex items-center gap-2 rounded-btn border border-border-strong bg-bg px-[18px] py-[9px] text-[13px] font-semibold text-text-primary hover:bg-surface-2">
            <Github size={14} />GitHub Releases
          </a>
        </div>
      </section>

      <VersionIndex />

      <div className="mx-auto max-w-[800px] px-6 pb-20">
        {RELEASES.map((release, index) => <ReleaseCard key={release.title} release={release} first={index === 0} />)}
      </div>
    </>
  )
}
