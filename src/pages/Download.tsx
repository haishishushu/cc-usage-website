import { AppWindow, Download, Github, HardDrive, Laptop, Package, ShieldCheck, Terminal } from "lucide-react"
import { Link } from "react-router"
import { GhostButton, PrimaryButton } from "@/components/ui"
import { RELEASES_URL } from "@/components/Navbar"

function InstallSteps() {
  const steps = [
    { title: "下载安装包", desc: "点击上方「下载安装包」，约 8 MB，几秒完成。" },
    { title: "运行安装向导", desc: "双击运行，中文 NSIS 向导一路下一步，WebView2 自动处理。" },
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
            { icon: Cpu2, label: "x64 架构处理器" },
            { icon: Globe2, label: "WebView2 运行时（安装向导自动处理）" },
            { icon: ShieldCheck, label: "无需管理员权限之外的额外依赖" },
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
            ["版本号", "v0.1.0"],
            ["发布日期", "2026-09-19"],
            ["安装器", "NSIS · 中文向导"],
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
  return (
    <>
      <section className="flex flex-col items-center gap-[18px] bg-bg px-6 pb-14 pt-[72px] text-center">
        <span className="flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium text-accent">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5L8 13.8 2 9.2h7.6z" />
          </svg>
          最新稳定版 v0.1.0 · 2026-09-19
        </span>
        <h1 className="text-[40px] font-bold tracking-tight text-text-primary sm:text-[52px]">免费下载 CC Usage</h1>
        <p className="max-w-[640px] text-base leading-[1.8] text-text-secondary">
          基于 MIT 协议开源，永久免费。下载即用，数据全程留在本机。
        </p>
      </section>

      <section className="flex flex-col gap-5 bg-bg px-6 lg:px-[200px]">
        <div className="grid gap-5 md:grid-cols-3">
          {/* Windows 主卡 */}
          <div className="flex flex-col gap-4 rounded-card border-[1.5px] border-accent bg-surface p-[26px] shadow-card md:col-span-1">
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
              { icon: Package, label: "安装包 CCUsage_0.1.0_x64-setup.exe" },
              { icon: HardDrive, label: "约 8 MB · NSIS 中文安装向导" },
              { icon: ShieldCheck, label: "已内置 WebView2 引导，装完即用" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[13px] text-text-secondary">
                <s.icon size={14} className="shrink-0 text-text-muted" />
                <span className="tnum">{s.label}</span>
              </div>
            ))}
            <div className="mt-auto flex flex-col gap-2.5 pt-1">
              <PrimaryButton href={RELEASES_URL} className="w-full justify-center px-0 py-3 text-sm">
                <Download size={16} />
                下载安装包
              </PrimaryButton>
              <GhostButton href={RELEASES_URL} className="w-full justify-center px-0 py-3 text-sm">
                <Github size={16} />
                GitHub Releases
              </GhostButton>
            </div>
          </div>

          {/* macOS / Linux 敬请期待 */}
          {[
            { name: "macOS", icon: Laptop, note: "macOS / Linux 支持在路线图里，欢迎到 GitHub 提 Issue 催更。" },
            { name: "Linux", icon: Terminal, note: "AppImage / deb 打包形式调研中，欢迎到 GitHub 提 Issue 催更。" },
          ].map((p) => (
            <div key={p.name} className="flex flex-col gap-4 rounded-card border border-border-base bg-surface-2 p-[26px]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-11 items-center justify-center rounded-[11px] bg-neutral-soft text-text-muted">
                  <p.icon size={22} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-bold text-text-secondary">{p.name}</span>
                  <span className="text-xs text-text-muted">规划中</span>
                </div>
              </div>
              <p className="text-[13px] leading-[1.8] text-text-muted">{p.note}</p>
              <span className="mt-auto flex w-full items-center justify-center rounded-btn bg-surface-3 py-3 text-sm font-semibold text-text-muted">
                敬请期待
              </span>
            </div>
          ))}
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
