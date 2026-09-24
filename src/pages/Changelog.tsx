import { Bell, Github, History, Laptop, Plug, Terminal, FlaskConical, Plus, Sparkles, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { RELEASES_URL } from "@/lib/version"
import { Chip } from "@/components/ui"
import { usePageTitle } from "@/lib/usePageTitle"

const FEATURES: string[] = [
  "灵动岛常驻桌面：无边框透明窗口、四边吸附、双击展开、拖动即停",
  "主面板总览：额度水位、本地 Token 统计、趋势图与请求日志",
  "本地会话增量采集：读取 ~/.claude/projects 与 ~/.codex/sessions，按 message.id / response_id 去重",
  "SQLite 存储与统计：今日 / 本周 / 本月 / 累计，按小时或按日趋势",
  "编程套餐额度查询：智谱 GLM、Kimi、MiniMax、ZenMux、OpenCode Go、火山方舟、Grok 直连",
  "系统托盘：左键打开主面板，主面板关闭只隐藏不退出",
  "应用内自更新：启动自动检测新版本，绿色按钮一键下载安装并自动重启",
  "连接管理升级：供应商手动接入（GLM / Kimi / DeepSeek 等 10+ 预设一键填入端点）",
  "思考强度按模型获取：调官方 /v1/models 解析 capabilities.effort 并存入本机，下拉按模型过滤",
  "连接检测：用保存的凭证对上游做一次轻量验证并显示延迟",
  "启用即切换：点「启用」把连接写入 Claude Code / Codex 配置（写前自动备份）",
  "请求日志：状态列显示上游真实响应码，未上报时按「成功」展示",
]

const MISC: string[] = [
  "连接管理覆盖 Claude、Codex、Gemini、Grok、Zcode、Trae、Qoder 与 Workbuddy",
  "中文 NSIS 安装向导",
  "浅色 / 深色双主题",
  "平台扩展：Gemini / Grok / Zcode / Trae / Qoder / Workbuddy 按各自真实本机来源接入",
  "编辑连接全量回填：API Key 密文显示、小眼睛切换明文",
]

const ROADMAP: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Laptop, title: "macOS 支持", desc: "Apple Silicon 与 Intel 适配在规划中" },
  { icon: Terminal, title: "Linux 支持", desc: "AppImage / deb 打包形式调研中" },
  { icon: Plug, title: "更多编程套餐适配", desc: "按社区反馈逐步扩展直连的服务商列表" },
  { icon: FlaskConical, title: "真实账号联调完善", desc: "各套餐额度接口的真实账号验证持续进行" },
]

function TimelineItem({ icon: Icon, title, items, tone }: { icon: LucideIcon; title: string; items: string[]; tone: string }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <Icon size={15} className={tone} />
        <span className="text-sm font-bold text-text-primary">{title}</span>
      </div>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2.5">
          <Plus size={13} className="mt-[5px] shrink-0 text-green" />
          <span className="text-[13px] leading-[1.8] text-text-secondary">{item}</span>
        </div>
      ))}
    </section>
  )
}

export default function ChangelogPage() {
  usePageTitle("更新日志 — CC Usage 版本发布记录")
  return (
    <>
      <section className="flex flex-col items-center gap-3 bg-bg px-6 pb-12 pt-16 text-center">
        <h1 className="text-[40px] font-bold tracking-tight text-text-primary">更新日志</h1>
        <p className="text-[15px] text-text-secondary">记录 CC Usage 的每一次演进</p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="motion-button inline-flex items-center gap-2 rounded-btn bg-text-primary px-[18px] py-[9px] text-[13px] font-semibold text-bg"
          >
            <Bell size={14} />
            订阅更新
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="motion-button inline-flex items-center gap-2 rounded-btn border border-border-strong bg-bg px-[18px] py-[9px] text-[13px] font-semibold text-text-primary hover:bg-surface-2"
          >
            <Github size={14} />
            GitHub Releases
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-[800px] px-6 pb-20">
        {/* v0.1.0 */}
        <div className="relative flex flex-col gap-[18px] border-l border-border-base pb-2 pl-[26px]">
          <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent" />
          <div className="flex items-center gap-2.5">
            <span className="tnum font-mono text-[22px] font-bold text-text-primary">v0.1.0</span>
            <span className="rounded-full bg-accent px-2.5 py-[3px] text-[11px] font-semibold text-white">最新</span>
            <span className="tnum font-mono text-[13px] text-text-muted">2026-09-19</span>
          </div>
          <div className="flex flex-col gap-4 rounded-card border border-border-base bg-surface p-[22px]">
            <TimelineItem icon={Sparkles} title="新功能" items={FEATURES} tone="text-text-primary" />
            <TimelineItem icon={Wrench} title="其他" items={MISC} tone="text-text-secondary" />
            <div className="flex items-center gap-2 rounded-lg bg-surface-2 px-3.5 py-3">
              <History size={14} className="text-text-muted" />
              <span className="text-xs text-text-muted">更早版本为项目内部迭代，未对外发布。</span>
            </div>
          </div>
        </div>

        {/* 路线图 */}
        <div className="relative mt-2 flex flex-col gap-[18px] border-l border-border-base pl-[26px] pt-2">
          <span className="absolute -left-[5px] top-3 size-2.5 rounded-full bg-border-strong" />
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-text-secondary">路线图</span>
            <Chip tone="amber">规划中</Chip>
          </div>
          <div className="flex flex-col gap-3 rounded-card border border-border-base bg-surface p-[22px]">
            {ROADMAP.map((r) => (
              <div key={r.title} className="flex items-start gap-2.5">
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-muted">
                  <r.icon size={14} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-semibold text-text-secondary">{r.title}</span>
                  <span className="text-xs leading-[1.7] text-text-muted">{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
