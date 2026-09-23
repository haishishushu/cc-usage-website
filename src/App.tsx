import { Route, Routes, Link, useLocation } from "react-router"
import { useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Home from "@/pages/Home"
import DownloadPage from "@/pages/Download"
import DocsPage from "@/pages/Docs"
import ChangelogPage from "@/pages/Changelog"
import SponsorsPage from "@/pages/Sponsors"

/** 路由切换时回到页顶（并处理 #hash 锚点） */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

/** 滚动自动淡入：每个 section 进入视口时上浮显现（尊重 prefers-reduced-motion）。 */
function useAutoReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    sections.forEach((s) => s.classList.add("reveal"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [pathname])
}

function NotFound() {
  return (
    <section className="flex flex-col items-center gap-4 bg-bg px-6 py-32 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-text-primary">404</h1>
      <p className="text-text-secondary">页面不存在或已被移动。</p>
      <Link to="/" className="text-sm font-semibold text-accent hover:underline">
        返回首页
      </Link>
    </section>
  )
}

export default function App() {
  useAutoReveal()
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
