import { createContext, useContext, useEffect, type ComponentProps, type ReactNode } from "react"
import { Link as RouterLink, NavLink as RouterNavLink, useLocation, useNavigate } from "react-router"

export type Language = "zh" | "en"

const STORAGE_KEY = "cc-usage-website-language"
const LanguageContext = createContext<{ language: Language; setLanguage: (next: Language) => void }>({
  language: "zh",
  setLanguage: () => {},
})

function stripEnglishPrefix(pathname: string) {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/"
}

export function localizedPath(path: string, language: Language) {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  const bare = stripEnglishPrefix(path)
  return language === "en" ? `/en${bare === "/" ? "" : bare}` : bare
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const language: Language = /^\/en(?=\/|$)/.test(location.pathname) ? "en" : "zh"

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "zh-CN"
    const english = language === "en"
    const description = english
      ? "CC Usage monitors AI coding usage across eight platforms with a desktop island, quota windows, token statistics, and request logs. Data stays on your device."
      : "常驻灵动岛 + 完整主面板，统一查看八个 AI 编程平台的额度、Token 与请求日志，数据全部留在本机。"
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute("content", description)
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute("content", english ? "CC Usage — AI usage at a glance" : "CC Usage — 常驻灵动岛的 AI 用量监控")
    }
    try {
      if (location.pathname !== "/" || !localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, language)
      }
    } catch { /* private browsing */ }
  }, [language, location.pathname])

  useEffect(() => {
    if (location.pathname !== "/") return
    try {
      if (localStorage.getItem(STORAGE_KEY) === "en") navigate("/en", { replace: true })
    } catch { /* private browsing */ }
  }, [])

  const setLanguage = (next: Language) => {
    if (next === language) return
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* private browsing */ }
    navigate(`${localizedPath(location.pathname, next)}${location.search}${location.hash}`)
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() { return useContext(LanguageContext) }

export function useText() {
  const { language } = useLanguage()
  return (zh: string, en: string) => language === "en" ? en : zh
}

export function useDictionary(entries: Record<string, string>) {
  const t = useText()
  return (zh: string) => t(zh, entries[zh] ?? zh)
}

export function Link({ to, ...props }: ComponentProps<typeof RouterLink>) {
  const { language } = useLanguage()
  return <RouterLink to={typeof to === "string" ? localizedPath(to, language) : to} {...props} />
}

export function NavLink({ to, ...props }: ComponentProps<typeof RouterNavLink>) {
  const { language } = useLanguage()
  return <RouterNavLink to={typeof to === "string" ? localizedPath(to, language) : to} {...props} />
}
