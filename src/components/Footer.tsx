import { Link, useDictionary } from "@/lib/locale"
import { MonitorCheck, ShieldCheck } from "lucide-react"
import { AppLogo } from "@/components/Logo"
import { REPO_URL } from "@/lib/version"

const LINK_GROUPS: { title: string; links: { label: string; to: string; external?: boolean; anchor?: string }[] }[] = [
  {
    title: "产品",
    links: [
      { label: "功能特性", to: "/docs/features" },
      { label: "免费下载", to: "/download" },
      { label: "常见问题", to: "/docs/troubleshooting" },
    ],
  },
  {
    title: "资源",
    links: [
      { label: "使用文档", to: "/docs" },
      { label: "更新日志", to: "/changelog" },
      { label: "快速上手", to: "/docs/first-run" },
    ],
  },
  {
    title: "社区",
    links: [
      { label: "源码仓库", to: REPO_URL, external: true },
      { label: "问题反馈", to: `${REPO_URL}/issues`, external: true },
      { label: "贡献指南", to: `${REPO_URL}/blob/main/CONTRIBUTING.md`, external: true },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "赞助商", to: "/sponsors" },
      { label: "开源协议", to: `${REPO_URL}/blob/main/LICENSE`, external: true },
      { label: "联系我们", to: `${REPO_URL}/issues`, external: true },
    ],
  },
]

const EN: Record<string, string> = {
  "产品": "Product", "功能特性": "Features", "免费下载": "Free download", "常见问题": "FAQ",
  "资源": "Resources", "使用文档": "Documentation", "更新日志": "Changelog", "快速上手": "Quick start",
  "社区": "Community", "源码仓库": "Source code", "问题反馈": "Report an issue", "贡献指南": "Contributing",
  "关于": "About", "赞助商": "Sponsors", "开源协议": "License", "联系我们": "Contact us",
  "本地存储": "Local storage",
  "常驻灵动岛的 AI 用量监控台，统一查看八个平台的连接、会话、Token、缓存、积分与额度。": "An always-on AI usage monitor for eight platforms. View connections, sessions, tokens, cache, credits, and quotas in one place.",
  "© 2026 CC Usage · 基于 MIT 协议开源": "© 2026 CC Usage · Open source under the MIT License",
  "Made with ❤ by 鼠鼠 & Contributors": "Made with ❤ by haishishushu & contributors",
}

export function Footer() {
  const tr = useDictionary(EN)
  return (
    <footer className="bg-surface-2">
      <div className="mx-auto max-w-[1240px] px-6 pb-8 pt-[60px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex w-full max-w-[330px] flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <AppLogo size={30} />
              <span className="text-base font-semibold text-text-primary">CC Usage</span>
            </div>
            <p className="text-[13px] leading-[1.7] text-text-secondary">
              {tr("常驻灵动岛的 AI 用量监控台，统一查看八个平台的连接、会话、Token、缓存、积分与额度。")}
            </p>
            <div className="flex gap-2">
              {[
                { icon: MonitorCheck, label: "Windows · macOS · Linux" },
                { icon: ShieldCheck, label: "本地存储" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-1.5 rounded-full bg-surface-3 px-2.5 py-1 text-xs text-text-secondary"
                >
                  <b.icon size={13} />
                  {tr(b.label)}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-[76px] gap-y-8">
            {LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3.5">
                <div className="text-[13px] font-semibold text-text-primary">{tr(group.title)}</div>
                {group.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.to}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {tr(link.label)}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={link.anchor ? () => window.setTimeout(() => document.getElementById(link.anchor!)?.scrollIntoView({ behavior: "smooth" }), 0) : undefined}
                      className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {tr(link.label)}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[34px] h-px w-full bg-border-base" />
        <div className="mt-[19px] flex flex-col items-start justify-between gap-2 text-xs text-text-muted sm:flex-row sm:items-center">
          <span>{tr("© 2026 CC Usage · 基于 MIT 协议开源")}</span>
          <span>{tr("Made with ❤ by 鼠鼠 & Contributors")}</span>
        </div>
      </div>
    </footer>
  )
}
