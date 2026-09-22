import { useCallback, useEffect, useState } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "cc-usage-theme"

function resolveInitial(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {
    /* 私密窗口等场景 localStorage 可能不可用，退回系统偏好 */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * 主题切换：与 island 前端同一机制 —— 在 <html> 上挂 .dark class，
 * CSS 变量随之切换；用户显式选择持久化，未选择时跟随系统。
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("theme-transition")
    root.classList.toggle("dark", theme === "dark")
    const timer = window.setTimeout(() => root.classList.remove("theme-transition"), 200)
    return () => window.clearTimeout(timer)
  }, [theme])

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const changed = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* ignore */
      }
      setTheme(query.matches ? "dark" : "light")
    }
    query.addEventListener("change", changed)
    return () => query.removeEventListener("change", changed)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
