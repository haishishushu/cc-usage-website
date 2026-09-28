import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Download, Github, Languages, Menu, Moon, Sun, X } from "lucide-react"
import { NavLink, Link, useLanguage, useText } from "@/lib/locale"
import { AppLogo } from "@/components/Logo"
import { useTheme } from "@/lib/useTheme"
import { cn } from "@/lib/cn"
import { REPO_URL } from "@/lib/version"

const NAV_ITEMS = [
  { to: "/", zh: "首页", en: "Home" },
  { to: "/docs", zh: "文档", en: "Docs" },
  { to: "/changelog", zh: "更新日志", en: "Changelog" },
  { to: "/sponsors", zh: "赞助商", en: "Sponsors" },
] as const

export function Navbar() {
  const { theme, toggle } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = useText()
  const [languageOpen, setLanguageOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const languageMenu = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (!languageOpen) return
    const onOutsideClick = (event: MouseEvent) => {
      if (!languageMenu.current?.contains(event.target as Node)) setLanguageOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false)
    }
    document.addEventListener("click", onOutsideClick)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("click", onOutsideClick)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [languageOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border-base bg-bg">
      <nav className="relative mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-6">
        <div className="flex items-center gap-11">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
            <AppLogo size={32} />
            <span className="text-base font-semibold text-text-primary">CC Usage</span>
          </Link>
          <div className="hidden items-center gap-[30px] lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn("text-sm transition-colors", isActive ? "font-medium text-text-primary" : "text-text-secondary hover:text-text-primary")
                }
              >
                {t(item.zh, item.en)}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[18px]">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? t("切换到浅色模式", "Switch to light mode") : t("切换到深色模式", "Switch to dark mode")}
            title={theme === "dark" ? t("切换到浅色模式", "Switch to light mode") : t("切换到深色模式", "Switch to dark mode")}
            className="motion-button flex size-[34px] items-center justify-center rounded-btn border border-border-base bg-bg text-text-primary hover:bg-surface-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t("GitHub 仓库", "GitHub repository")}
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <Github size={19} />
          </a>
          <div ref={languageMenu} className="relative">
            <button type="button" onClick={() => setLanguageOpen((open) => !open)}
              aria-label={t("选择网站语言", "Choose website language")}
              aria-expanded={languageOpen} aria-haspopup="menu"
              className="motion-button flex h-10 items-center gap-1.5 rounded-btn border border-border-base bg-bg px-2.5 text-xs font-semibold text-text-primary hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Languages size={17} aria-hidden="true" />
              <span className="hidden sm:inline">{language === "zh" ? "中文" : "EN"}</span>
              <ChevronDown size={13} aria-hidden="true" className={cn("hidden transition-transform sm:block", languageOpen && "rotate-180")} />
            </button>
            {languageOpen ? (
              <div role="menu" aria-label={t("网站语言", "Website language")}
                className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-lg border border-border-base bg-surface p-1.5 shadow-card">
                {([{"code":"zh","label":"简体中文"},{"code":"en","label":"English"}] as const).map((option) => (
                  <button key={option.code} type="button" role="menuitemradio" aria-checked={language === option.code}
                    onClick={() => { setLanguage(option.code); setLanguageOpen(false); setMenuOpen(false) }}
                    className={cn("flex min-h-10 w-full items-center justify-between gap-4 rounded-md px-3 text-left text-sm transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent", language === option.code ? "font-semibold text-accent" : "text-text-primary")}
                  >{option.code === "zh" ? t("简体中文", "Chinese") : option.label}{language === option.code ? <Check size={15} aria-hidden="true" /> : null}</button>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            to="/download"
            className="motion-button hidden items-center gap-2 rounded-btn bg-accent px-[17px] py-[9px] text-sm font-semibold text-white sm:flex"
          >
            <Download size={15} />
            {t("免费下载", "Free download")}
          </Link>
          {/* 移动端汉堡菜单：小屏导航项不再凭空消失 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("关闭菜单", "Close menu") : t("打开菜单", "Open menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="motion-button flex size-[34px] items-center justify-center rounded-btn border border-border-base bg-bg text-text-primary lg:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
        {menuOpen ? (
          <div
            id="mobile-nav"
            className="absolute inset-x-0 top-full z-40 flex flex-col gap-1 border-b border-border-base bg-bg px-6 pb-5 pt-2 lg:hidden"
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
                {t(item.zh, item.en)}
              </NavLink>
            ))}
            <Link
              to="/download"
              onClick={closeMenu}
              className="motion-button mt-2 flex items-center justify-center gap-2 rounded-btn bg-accent px-[17px] py-[10px] text-sm font-semibold text-white"
            >
              <Download size={15} />
              {t("免费下载", "Free download")}
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
