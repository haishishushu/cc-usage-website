import { useEffect, useRef } from "react"
import { cn } from "@/lib/cn"
import { useLanguage } from "@/lib/locale"
import { localizePreview } from "@/i18n/preview"

type PreviewFocus = "autoplay" | "collapsed" | "expanded" | "panel" | "trend" | "logs" | "quota"

/** 从 cc-usage/frontend 构建的真实浏览器预览。官网只提供容器，不重画产品界面。 */
export function ActualFrontendFrame({ focus, title, className }: { focus: PreviewFocus; title: string; className?: string }) {
  const { language } = useLanguage()
  const languageRef = useRef(language)
  languageRef.current = language
  const frameRef = useRef<HTMLIFrameElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const windowName = focus === "autoplay" || focus === "collapsed" || focus === "expanded" ? "island" : "panel"

  useEffect(() => {
    const syncTheme = () => {
      frameRef.current?.contentDocument?.documentElement.classList.toggle("dark", document.documentElement.classList.contains("dark"))
    }
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      observer.disconnect()
      cleanupRef.current?.()
    }
  }, [])

  useEffect(() => {
    const doc = frameRef.current?.contentDocument
    if (doc?.body) localizePreview(doc, language)
  }, [language])

  const ready = (frame: HTMLIFrameElement) => {
    cleanupRef.current?.()
    const doc = frame.contentDocument
    const win = frame.contentWindow
    if (!doc || !win) return

    const style = doc.createElement("style")
    style.textContent = `
      html, body, #root, #root > div { background: transparent !important; }
      #root > div > header { display: none !important; }
      #root > div > main { padding: 0 !important; }
      ${windowName === "island" ? `
        #root > div > main > div { min-height: 0 !important; padding-top: 24px !important; }
        #root > div > main > div > div > div:last-child { display: none !important; }
        ${focus === "autoplay" ? `
          html, body { overflow: hidden !important; }
          #root > div > main > div > div { transition: transform 420ms ease; transform-origin: top center; }
          body.hero-expanded #root > div > main > div > div { transform: scale(.76); }
        ` : ""}
      ` : ""}
    `
    doc.head.appendChild(style)
    doc.documentElement.classList.toggle("dark", document.documentElement.classList.contains("dark"))

    let prepared = false
    let modeTimer: number | undefined
    let translationPending = false
    let disposed = false
    let islandObserver: IntersectionObserver | undefined
    const syncTranslation = () => {
      if (translationPending || disposed) return
      translationPending = true
      win.queueMicrotask(() => {
        translationPending = false
        if (disposed) return
        localizePreview(doc, languageRef.current)
      })
    }
    const clickControl = (label: string) => {
      const button = [...doc.querySelectorAll("button")].find((item) =>
        (item.dataset.previewOriginalLabel || item.textContent?.trim()) === label,
      )
      button?.click()
      return Boolean(button)
    }
    const stopAutoplay = () => {
      if (modeTimer !== undefined) win.clearTimeout(modeTimer)
      modeTimer = undefined
      doc.body.classList.remove("hero-expanded")
      if ([...doc.querySelectorAll("button")].some((item) => item.dataset.previewOriginalLabel === "双击收缩")) clickControl("双击收缩")
      if ([...doc.querySelectorAll("button")].some((item) => item.dataset.previewOriginalLabel === "解除停靠")) clickControl("解除停靠")
    }
    const startAutoplay = () => {
      if (modeTimer !== undefined || win.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const steps: Array<{ wait: number; label: string; expanded: boolean }> = [
        { wait: 1800, label: "双击展开", expanded: true },
        { wait: 3300, label: "双击收缩", expanded: false },
        { wait: 1700, label: "上", expanded: false },
        { wait: 2000, label: "解除停靠", expanded: false },
      ]
      const play = (index: number) => {
        const step = steps[index]
        modeTimer = win.setTimeout(() => {
          const didSwitch = clickControl(step.label)
          if (didSwitch) doc.body.classList.toggle("hero-expanded", step.expanded)
          play((index + 1) % steps.length)
        }, step.wait)
      }
      play(0)
    }
    const configure = () => {
      if (prepared) return
      if (focus === "autoplay") {
        if (![...doc.querySelectorAll("button")].some((item) => (item.dataset.previewOriginalLabel || item.textContent?.trim()) === "双击展开")) return
        prepared = true
        islandObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) startAutoplay()
          else stopAutoplay()
        }, { threshold: 0.2 })
        islandObserver.observe(frame)
      } else if (focus === "expanded") {
        const label = "双击展开"
        const button = [...doc.querySelectorAll("button")].find((item) => (item.dataset.previewOriginalLabel || item.textContent?.trim()) === label)
        if (!button) return
        prepared = true
        // 等产品预览的设置加载与 React 事件处理器完成挂载，再切到目标形态。
        modeTimer = win.setTimeout(() => {
          const currentButton = [...doc.querySelectorAll("button")].find((item) => (item.dataset.previewOriginalLabel || item.textContent?.trim()) === label)
          currentButton?.click()
        }, 350)
      } else if (focus === "trend" || focus === "logs") {
        const heading = [...doc.querySelectorAll("h1,h2,h3")].find((item) =>
          item.textContent?.includes(focus === "trend" ? "Token 趋势图" : "请求日志"),
        )
        const section = heading?.closest("section")
        if (!section) return
        prepared = true
        win.requestAnimationFrame(() => win.scrollTo(0, section.getBoundingClientRect().top + win.scrollY - 12))
      } else if (doc.querySelector("main")) {
        prepared = true
      }
      if (prepared) observer.disconnect()
    }
    const observer = new MutationObserver(configure)
    observer.observe(doc.body, { childList: true, subtree: true })
    configure()
    const translationObserver = new MutationObserver(syncTranslation)
    translationObserver.observe(doc.body, { childList: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "title", "placeholder"], subtree: true })
    syncTranslation()
    const cleanup = () => {
      disposed = true
      observer.disconnect()
      translationObserver.disconnect()
      islandObserver?.disconnect()
      if (modeTimer !== undefined) win.clearTimeout(modeTimer)
    }
    cleanupRef.current = cleanup
    win.addEventListener("pagehide", cleanup, { once: true })
  }

  return (
    <iframe
      key={language}
      ref={frameRef}
      src={`${import.meta.env.BASE_URL}desktop-preview/index.html?window=${windowName}`}
      title={title}
      loading={focus === "autoplay" || focus === "collapsed" ? "eager" : "lazy"}
      onLoad={(event) => ready(event.currentTarget)}
      className={cn("block w-full border-0 bg-transparent", className)}
    />
  )
}
