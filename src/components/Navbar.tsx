import { useRef, useState } from "react"
import { Download, Github, Languages, Moon, Sun } from "lucide-react"
import { NavLink, Link } from "react-router"
import { AppLogo } from "@/components/Logo"
import { useTheme } from "@/lib/useTheme"
import { cn } from "@/lib/cn"

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/docs", label: "文档" },
  { to: "/changelog", label: "更新日志" },
  { to: "/sponsors", label: "赞助商" },
] as const

/** 源码仓库（GitHub，与应用「关于」页同源） */
export const REPO_URL = "https://github.com/haishishushu/cc-usage"
export const RELEASES_URL = `${REPO_URL}/releases/tag/v0.1.0`

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [langHint, setLangHint] = useState(false)
  const langTimer = useRef<number | undefined>(undefined)
  const showLangHint = () => {
    setLangHint(true)
    window.clearTimeout(langTimer.current)
    langTimer.current = window.setTimeout(() => setLangHint(false), 2000)
  }
  return (
    <header className="sticky top-0 z-40 border-b border-border-base bg-bg">
      <nav className="relative mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-6">
        <div className="flex items-center gap-11">
          <Link to="/" className="flex items-center gap-2.5">
            <AppLogo size={32} />
            <span className="text-base font-semibold text-text-primary">CC Usage</span>
          </Link>
          <div className="hidden items-center gap-[30px] md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn("text-sm transition-colors", isActive ? "font-medium text-text-primary" : "text-text-secondary hover:text-text-primary")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[18px]">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            className="motion-button flex size-[34px] items-center justify-center rounded-btn border border-border-base bg-bg text-text-primary hover:bg-surface-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <Github size={19} />
          </a>
          <button
            type="button"
            onClick={showLangHint}
            aria-label="切换语言（中文）"
            title="中文"
            className="hidden text-text-secondary transition-colors hover:text-text-primary sm:block"
          >
            <Languages size={19} />
          </button>
          <Link
            to="/download"
            className="motion-button hidden items-center gap-2 rounded-btn bg-accent px-[17px] py-[9px] text-sm font-semibold text-white sm:flex"
          >
            <Download size={15} />
            免费下载
          </Link>
        </div>
        {langHint ? (
          <div className="absolute top-full right-6 mt-2 rounded-lg border border-border-base bg-surface px-3.5 py-2 text-xs text-text-secondary shadow-card">
            英文版筹备中，敬请期待
          </div>
        ) : null}
      </nav>
    </header>
  )
}
