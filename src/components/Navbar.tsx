import { useEffect, useRef, useState } from "react"
import { Download, Github, Languages, Menu, Moon, Sun, X } from "lucide-react"
import { NavLink, Link } from "react-router"
import { AppLogo } from "@/components/Logo"
import { useTheme } from "@/lib/useTheme"
import { cn } from "@/lib/cn"
import { REPO_URL } from "@/lib/version"

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/docs", label: "文档" },
  { to: "/changelog", label: "更新日志" },
  { to: "/sponsors", label: "赞助商" },
] as const

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [langHint, setLangHint] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const langTimer = useRef<number | undefined>(undefined)
  const showLangHint = () => {
    setLangHint(true)
    window.clearTimeout(langTimer.current)
    langTimer.current = window.setTimeout(() => setLangHint(false), 2000)
  }
  // 路由变化时导航面板保持打开会遮挡内容，任何跳转后收起
  const closeMenu = () => setMenuOpen(false)

  // Esc 关闭移动端菜单
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

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
          {/* 移动端汉堡菜单：小屏导航项不再凭空消失 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="motion-button flex size-[34px] items-center justify-center rounded-btn border border-border-base bg-bg text-text-primary md:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
        {menuOpen ? (
          <div
            id="mobile-nav"
            className="absolute inset-x-0 top-full z-40 flex flex-col gap-1 border-b border-border-base bg-bg px-6 pb-5 pt-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    "rounded-btn px-3 py-2.5 text-sm transition-colors",
                    isActive ? "bg-surface-2 font-medium text-text-primary" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/download"
              onClick={closeMenu}
              className="motion-button mt-2 flex items-center justify-center gap-2 rounded-btn bg-accent px-[17px] py-[10px] text-sm font-semibold text-white"
            >
              <Download size={15} />
              免费下载
            </Link>
          </div>
        ) : null}
        {langHint ? (
          <div className="absolute top-full right-6 mt-2 rounded-lg border border-border-base bg-surface px-3.5 py-2 text-xs text-text-secondary shadow-card">
            英文版筹备中，敬请期待
          </div>
        ) : null}
      </nav>
    </header>
  )
}
