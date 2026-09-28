import { ArrowRight, ChevronRight, Copy, Lightbulb, TriangleAlert, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { DOCS, DOC_GROUPS, getDoc, type Block } from "@/docs/docs"
import { DOCS_EN } from "@/docs/docs.en"
import { Link, NavLink, useLanguage, useText } from "@/lib/locale"
import { cn } from "@/lib/cn"
import { usePageTitle } from "@/lib/usePageTitle"

function CodeBlock({ label, lines }: { label?: string; lines: { cmd: string; comment?: string }[] }) {
  const t = useText()
  return (
    <div className="overflow-hidden rounded-card border border-border-base bg-surface-2">
      <div className="flex items-center justify-between border-b border-border-base bg-surface-3 px-4 py-2.5">
        <span className="font-mono text-xs text-text-secondary">{label ?? t("终端", "Terminal")}</span>
        <Copy size={14} className="text-text-muted" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {lines.map((l) => (
          <div key={l.cmd} className="flex flex-wrap items-center gap-3">
            <ChevronRight size={13} className="shrink-0 text-accent" />
            <span className="tnum font-mono text-[13px] text-text-primary">{l.cmd}</span>
            {l.comment ? <span className="text-xs text-text-muted">{l.comment}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

type ImageBlock = Extract<Block, { t: "image" }>

function ImagePreview({ image, onClose }: { image: ImageBlock; onClose: () => void }) {
  const t = useText()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${t("图片预览", "Image preview")}: ${image.alt}`}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-24px)] w-[min(96vw,1400px)] max-w-none overflow-hidden rounded-card border border-border-base bg-surface p-0 text-text-primary shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop:bg-black/75"
    >
      <div className="flex max-h-[calc(100dvh-24px)] flex-col">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-base px-4 py-3 sm:px-5">
          <span className="min-w-0 truncate text-sm font-semibold">{image.alt}</span>
          <button type="button" onClick={onClose} aria-label={t("关闭图片预览", "Close image preview")} className="flex size-9 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-surface-2 p-3 sm:p-5">
          <img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} className="max-h-[calc(100dvh-130px)] max-w-full object-contain" />
        </div>
        <p className="shrink-0 border-t border-border-base px-4 py-2.5 text-xs leading-[1.6] text-text-secondary sm:px-5">{image.caption} · {t("按 Esc 或点击空白处关闭", "Press Esc or click outside to close")}</p>
      </div>
    </dialog>
  )
}

function BlockView({ b, onPreview }: { b: Block; onPreview: (image: ImageBlock) => void }) {
  const t = useText()
  switch (b.t) {
    case "h2":
      return (
        <h2 id={b.id} className="scroll-mt-24 text-xl font-bold text-text-primary">
          {b.text}
        </h2>
      )
    case "p":
      return <p className="text-sm leading-[1.9] text-text-secondary">{b.text}</p>
    case "ul":
      return (
        <ul className="flex flex-col gap-2.5">
          {b.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-sm leading-[1.8] text-text-secondary">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
              {it}
            </li>
          ))}
        </ul>
      )
    case "code":
      return <CodeBlock label={b.label} lines={b.lines} />
    case "image":
      return (
        <figure className="overflow-hidden rounded-[10px] border border-border-base bg-surface-2">
          <button type="button" onClick={() => onPreview(b)} aria-label={`${t("放大图片", "Enlarge image")}: ${b.alt}`} className="block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-accent">
            <img src={`${import.meta.env.BASE_URL}${b.src}`} alt={b.alt} loading="lazy" className="block h-auto w-full" />
          </button>
          <figcaption className="border-t border-border-base px-4 py-2.5 text-xs leading-[1.6] text-text-secondary">{b.caption} · {t("点击查看大图", "Click to enlarge")}</figcaption>
        </figure>
      )
    case "callout": {
      const warn = b.tone === "warn"
      return (
        <div className={cn("flex items-start gap-3 rounded-[10px] p-4", warn ? "bg-amber-soft" : "bg-accent-soft")}>
          {warn ? (
            <TriangleAlert size={16} className="mt-0.5 shrink-0 text-amber" />
          ) : (
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" />
          )}
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-bold text-text-primary">{b.title}</span>
            <span className="text-[13px] leading-[1.7] text-text-secondary">{b.text}</span>
          </div>
        </div>
      )
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-[10px] border border-border-base">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-base bg-surface-2 text-xs text-text-secondary">
                {b.head.map((h) => (
                  <th key={h} className="px-4 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr key={row[0]} className="border-b border-border-base last:border-b-0">
                  {row.map((cell, i) => (
                    <td key={i} className={cn("px-4 py-2.5 align-top leading-[1.7]", i === 0 ? "font-medium text-text-primary" : "text-text-secondary")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "steps":
      return (
        <ol className="flex flex-col gap-3">
          {b.items.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-bold text-accent">
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-text-primary">{s.title}</span>
                <span className="text-[13px] leading-[1.7] text-text-secondary">{s.desc}</span>
              </div>
            </li>
          ))}
        </ol>
      )
  }
}

export default function DocsPage() {
  const { language } = useLanguage()
  const t = useText()
  const { slug } = useParams()
  const docs = language === "en" ? DOCS_EN : DOCS
  const groups = language === "en" ? docs.reduce<{ group: string; docs: typeof docs }[]>((acc, item) => {
    const existing = acc.find((group) => group.group === item.group)
    if (existing) existing.docs.push(item)
    else acc.push({ group: item.group, docs: [item] })
    return acc
  }, []) : DOC_GROUPS
  const doc = (language === "en" ? docs.find((item) => item.slug === slug) : getDoc(slug)) ?? docs[0]
  const [previewImage, setPreviewImage] = useState<ImageBlock | null>(null)
  usePageTitle(`${doc.title} — CC Usage ${t("使用文档", "Documentation")}`)
  const index = docs.findIndex((d) => d.slug === doc.slug)
  const prev = index > 0 ? docs[index - 1] : null
  const next = index < docs.length - 1 ? docs[index + 1] : null

  // 路由变化回到页顶
  useEffect(() => {
    setPreviewImage(null)
    window.scrollTo(0, 0)
  }, [doc.slug])

  useEffect(() => { setPreviewImage(null) }, [language])

  return (
    <>
      {/* 页头 */}
      <section className="border-b border-border-base bg-surface-2 px-6 pb-9 pt-14">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">{t("文档", "Documentation")}</h1>
          <p className="text-[15px] text-text-secondary">{doc.subtitle}</p>
          {language === "en" ? <p className="text-xs text-text-muted">Screenshots show the current Chinese desktop application; example figures are illustrative.</p> : null}
        </div>
      </section>

      {/* 正文三栏 */}
      <div className="mx-auto flex max-w-[1240px] items-start gap-11 px-6 pb-[72px] pt-9">
        {/* 侧边栏 */}
        <aside className="hidden w-[230px] shrink-0 flex-col gap-[22px] lg:flex">
          {groups.map((g) => (
            <div key={g.group} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-text-primary">{g.group}</span>
              {g.docs.map((d) => (
                <NavLink
                  key={d.slug}
                  to={`/docs/${d.slug}`}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                      isActive ? "bg-accent-soft font-semibold text-accent" : "text-text-secondary hover:text-text-primary",
                    )
                  }
                >
                  {d.title}
                </NavLink>
              ))}
            </div>
          ))}
        </aside>

        {/* 正文 */}
        <main className="flex min-w-0 flex-1 flex-col gap-[22px]">
          <nav aria-label={t("移动端文档目录", "Mobile documentation navigation")} className="flex flex-wrap gap-2 lg:hidden">
            {docs.map((item) => (
              <NavLink key={item.slug} to={`/docs/${item.slug}`} className={({ isActive }) => cn("rounded-md border border-border-base px-2.5 py-1.5 text-xs", isActive ? "bg-accent-soft font-semibold text-accent" : "text-text-secondary")}>
                {item.title}
              </NavLink>
            ))}
          </nav>
          <nav className="flex items-center gap-1.5 text-xs">
            <Link to={`/docs/${docs[0].slug}`} className="text-text-muted hover:text-text-primary">
              {t("文档", "Docs")}
            </Link>
            <ChevronRight size={12} className="text-text-muted" />
            <span className="text-text-muted">{doc.group}</span>
            <ChevronRight size={12} className="text-text-muted" />
            <span className="font-semibold text-text-primary">{doc.title}</span>
          </nav>
          <h2 className="text-[32px] font-bold text-text-primary">{doc.title}</h2>
          {doc.blocks.map((b, i) => (
            <BlockView key={i} b={b} onPreview={setPreviewImage} />
          ))}

          {/* 上下篇 */}
          <div className="mt-2 flex items-start justify-between border-t border-border-base pt-4">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="group flex flex-col gap-1">
                <span className="text-[11px] text-text-muted">← {t("上一篇", "Previous")}</span>
                <span className="text-[13px] font-semibold text-text-secondary group-hover:text-accent">{prev.title}</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-text-muted">← {t("上一篇", "Previous")}</span>
                <span className="text-[13px] font-semibold text-text-secondary">{t("没有了", "None")}</span>
              </div>
            )}
            {next ? (
              <Link to={`/docs/${next.slug}`} className="group flex flex-col items-end gap-1">
                <span className="text-[11px] text-text-muted">{t("下一篇", "Next")} →</span>
                <span className="text-[13px] font-semibold text-accent group-hover:underline">{next.title}</span>
              </Link>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-text-muted">{t("下一篇", "Next")} →</span>
                <span className="text-[13px] font-semibold text-text-secondary">{t("没有了", "None")}</span>
              </div>
            )}
          </div>
        </main>

        {/* 本页目录 */}
        <aside className="hidden w-[176px] shrink-0 flex-col gap-2.5 border-l border-border-base pl-[18px] xl:flex">
          <span className="text-xs font-bold text-text-primary">{t("本页目录", "On this page")}</span>
          {doc.toc.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" })}
              className={cn("text-left text-[13px] transition-colors", i === 0 ? "font-semibold text-accent" : "text-text-secondary hover:text-text-primary")}
            >
              {t.label}
            </button>
          ))}
        </aside>
      </div>

      {/* 底部引导 */}
      <section className="border-t border-border-base bg-bg px-6 py-10 text-center">
        <Link to="/download" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          {t("准备好了？免费下载 CC Usage", "Ready? Download CC Usage for free")}
          <ArrowRight size={15} />
        </Link>
      </section>
      {previewImage ? <ImagePreview image={previewImage} onClose={() => setPreviewImage(null)} /> : null}
    </>
  )
}
