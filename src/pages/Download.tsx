import { AppWindow, Download, Github, HardDrive, Laptop, Package, ShieldCheck, Terminal } from "lucide-react"
import { Link } from "react-router"
import { GhostButton, PrimaryButton } from "@/components/ui"
import { APP_VERSION, DOWNLOAD_BASE_URL, RELEASE_TAG, RELEASES_URL } from "@/lib/version"
import { usePageTitle } from "@/lib/usePageTitle"

const DOWNLOAD_URLS = {
  windows: `${DOWNLOAD_BASE_URL}/CC-Usage-${RELEASE_TAG}-Windows-x86_64-Setup.exe`,
  macArm64: `${DOWNLOAD_BASE_URL}/CC-Usage-${RELEASE_TAG}-macOS-arm64.dmg`,
  macX64: `${DOWNLOAD_BASE_URL}/CC-Usage-${RELEASE_TAG}-macOS-x86_64.dmg`,
  linuxAppImage: `${DOWNLOAD_BASE_URL}/CC-Usage-${RELEASE_TAG}-Linux-x86_64.AppImage`,
  linuxDeb: `${DOWNLOAD_BASE_URL}/CC-Usage-${RELEASE_TAG}-Linux-x86_64.deb`,
} as const

function InstallSteps() {
  const steps = [
    { title: "选择安装包", desc: "按你的操作系统与处理器架构，直接从 GitHub Releases 下载。" },
    { title: "运行安装包", desc: "Windows 运行 EXE，macOS 打开 DMG，Linux 使用 AppImage 或 DEB。" },
    { title: "启动 CC Usage", desc: "从开始菜单或桌面启动，主面板与灵动岛即刻就位。" },
  ]
  return (
    <section className="flex flex-col items-center gap-7 bg-bg px-6 pb-10 pt-[72px]">
      <h2 className="text-[28px] font-bold tracking-tight text-text-primary">安装只需三步</h2>
      <div className="flex w-full max-w-[1040px] flex-col items-stretch gap-4 sm:flex-row sm:items-start">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-1 items-start gap-3">
            <div className="flex flex-1 flex-col items-center gap-2.5 px-[18px] text-center">
              <span className="flex size-[34px] items-center justify-center rounded-full bg-accent-soft font-mono text-[15px] font-bold text-accent">
                {i + 1}
              </span>
              <span className="text-[15px] font-bold text-text-primary">{s.title}</span>
              <span className="text-xs leading-[1.75] text-text-secondary">{s.desc}</span>
            </div>
            {i < steps.length - 1 ? (
              <div className="hidden pt-2.5 text-border-strong sm:block">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function Requirements() {
  return (
    <section className="flex flex-col gap-5 px-6 pb-[72px] pt-6">
      <div className="mx-auto grid w-full max-w-[1040px] gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-card border border-border-base bg-surface-2 p-[22px]">
          <h3 className="text-[15px] font-bold text-text-primary">系统要求</h3>
          {[
            { icon: Monitor2, label: "Windows 10 及以上版本" },
            { icon: Cpu2, label: "macOS · Apple Silicon 或 Intel" },
            { icon: Globe2, label: "Linux x64 · AppImage 或 DEB" },
            { icon: ShieldCheck, label: "安装包由 GitHub Actions 自动构建并发布" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
              <r.icon size={15} className="text-text-muted" />
              {r.label}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3.5 rounded-card border border-border-base bg-surface-2 p-[22px]">
          <h3 className="text-[15px] font-bold text-text-primary">版本信息</h3>
          {[
            ["版本号", RELEASE_TAG],
            ["发布日期", "2026-09-22"],
            ["安装包", "EXE · DMG · AppImage · DEB"],
            ["开源协议", "MIT"],
            ["获取历史版本", "GitHub Releases"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-[13px] text-text-muted">{k}</span>
              <span className="tnum font-mono text-xs font-semibold text-text-primary">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Monitor2() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}
function Cpu2() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
    </svg>
  )
}
function Globe2() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z" />
    </svg>
  )
}

export default function DownloadPage() {
  usePageTitle("下载 CC Usage — Windows 安装包免费下载（MIT 开源）")
  return (
    <>
      <section className="flex flex-col items-center gap-[18px] bg-bg px-6 pb-14 pt-[72px] text-center">
        <span className="flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium text-accent">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5L8 13.8 2 9.2h7.6z" />
          </svg>
          最新稳定版 {RELEASE_TAG}（{APP_VERSION}） · 2026-09-22
        </span>
        <h1 className="text-[40px] font-bold tracking-tight text-text-primary sm:text-[52px]">免费下载 CC Usage</h1>
        <p className="max-w-[640px] text-base leading-[1.8] text-text-secondary">
          基于 MIT 协议开源，永久免费。下载即用，数据全程留在本机。
        </p>
      </section>

      <section className="flex flex-col gap-5 bg-bg px-6 lg:px-[200px]">
        <div className="grid gap-5 md:grid-cols-3">
          {/* Windows 主卡 */}
          <div className="flex min-w-0 flex-col gap-4 rounded-card border-[1.5px] border-accent bg-surface p-[26px] shadow-card md:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-11 items-center justify-center rounded-[11px] bg-accent-soft text-accent">
                  <AppWindow size={22} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-bold text-text-primary">Windows</span>
                  <span className="text-xs text-text-secondary">Windows 10 及以上 · x64</span>
                </div>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">推荐</span>
            </div>
            {[
              { icon: Package, label: `CC-Usage-${RELEASE_TAG}-Windows-x86_64-Setup.exe` },
              { icon: HardDrive, label: "约 3.8 MB · NSIS 中文安装向导" },
              { icon: ShieldCheck, label: "已内置 WebView2 引导，装完即用" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[13px] text-text-secondary">
                <s.icon size={14} className="shrink-0 text-text-muted" />
                <span className="tnum min-w-0 break-all">{s.label}</span>
              </div>
            ))}
            <div className="mt-auto flex flex-col gap-2.5 pt-1">
              <PrimaryButton href={DOWNLOAD_URLS.windows} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                下载安装包
              </PrimaryButton>
              <GhostButton href={RELEASES_URL} className="w-full justify-center px-0 py-3 text-sm">
                <Github size={16} />
                GitHub Releases
              </GhostButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 rounded-card border border-border-base bg-surface-2 p-[26px]">
            <div className="flex items-center gap-2.5">
              <span className="flex size-11 items-center justify-center rounded-[11px] bg-neutral-soft text-text-muted">
                <Laptop size={22} />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-bold text-text-primary">macOS</span>
                <span className="text-xs text-text-secondary">Apple Silicon / Intel</span>
              </div>
            </div>
            <p className="text-[13px] leading-[1.8] text-text-secondary">DMG 安装包，请按 Mac 的处理器架构选择版本。</p>
            <div className="mt-auto flex flex-col gap-2.5 pt-1">
              <PrimaryButton href={DOWNLOAD_URLS.macArm64} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                Apple Silicon
              </PrimaryButton>
              <GhostButton href={DOWNLOAD_URLS.macX64} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                Intel
              </GhostButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 rounded-card border border-border-base bg-surface-2 p-[26px]">
            <div className="flex items-center gap-2.5">
              <span className="flex size-11 items-center justify-center rounded-[11px] bg-neutral-soft text-text-muted">
                <Terminal size={22} />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-bold text-text-primary">Linux</span>
                <span className="text-xs text-text-secondary">x64</span>
              </div>
            </div>
            <p className="text-[13px] leading-[1.8] text-text-secondary">通用发行版推荐 AppImage，Debian / Ubuntu 可选择 DEB。</p>
            <div className="mt-auto flex flex-col gap-2.5 pt-1">
              <PrimaryButton href={DOWNLOAD_URLS.linuxAppImage} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                下载 AppImage
              </PrimaryButton>
              <GhostButton href={DOWNLOAD_URLS.linuxDeb} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                下载 DEB
              </GhostButton>
            </div>
          </div>
        </div>
      </section>

      <InstallSteps />
      <Requirements />

      <section className="flex flex-col items-center gap-3 bg-bg px-6 pb-[72px] text-center">
        <p className="text-sm text-text-secondary">下载即表示你同意以 MIT 协议使用本软件。</p>
        <Link to="/docs" className="text-sm font-semibold text-accent hover:underline">
          安装遇到问题？查看文档 →
        </Link>
      </section>
    </>
  )
}
