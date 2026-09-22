import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { Link } from "react-router"
import { cn } from "@/lib/cn"

/** 区块标题：eyebrow 徽章（可选）+ 标题 + 副标题 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-3.5 text-center">
      {eyebrow ? (
        <span
          className={cn(
            "rounded-full px-3 py-[5px] text-xs font-semibold",
            dark ? "bg-surface-3 text-text-secondary" : "bg-accent-soft text-accent",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-[34px] font-bold leading-[1.3] tracking-tight sm:text-[38px]",
          dark ? "text-text-invert" : "text-text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("max-w-[660px] text-base leading-[1.7]", dark ? "text-text-invert-dim" : "text-text-secondary")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

/** 主按钮（实底蓝），`to` 站内路由 / `href` 外链 */
export function PrimaryButton({
  to,
  href,
  children,
  className,
}: {
  to?: string
  href?: string
  children: ReactNode
  className?: string
}) {
  const cls = cn(
    "motion-button inline-flex items-center gap-2 rounded-btn bg-accent px-[26px] py-[13px] text-[15px] font-semibold text-white",
    className,
  )
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  )
}

/** 次按钮（描边），`to` 站内路由 / `href` 外链 */
export function GhostButton({
  to,
  href,
  children,
  className,
}: {
  to?: string
  href?: string
  children: ReactNode
  className?: string
}) {
  const cls = cn(
    "motion-button inline-flex items-center gap-2 rounded-btn border border-border-strong bg-bg px-[26px] py-[13px] text-[15px] font-semibold text-text-primary hover:bg-surface-2",
    className,
  )
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  )
}

/** 状态小徽章 */
export function Chip({
  tone = "neutral",
  className,
  children,
  ...rest
}: ComponentProps<"span"> & { tone?: "neutral" | "green" | "amber" | "purple" | "blue" }) {
  const tones: Record<string, string> = {
    neutral: "bg-neutral-soft text-text-secondary",
    green: "bg-green-soft text-green-text",
    amber: "bg-amber-soft text-amber",
    purple: "bg-purple-soft text-purple-text",
    blue: "bg-accent-soft text-accent",
  }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded px-[7px] py-[3px] font-mono text-[11px] font-semibold", tones[tone], className)} {...rest}>
      {children}
    </span>
  )
}

/**
 * 数值脉冲 —— 值变化时自动闪一下亮度（island 的 dock-token-pulse，
 * 附录 A.5：等宽数字防抖动，变化用亮度脉冲提示）。
 */
export function Pulse({ value, className }: { value: string; className?: string }) {
  const [pulsing, setPulsing] = useState(false)
  const prev = useRef(value)
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value
      setPulsing(true)
    }
  }, [value])
  return (
    <span className={cn(className, pulsing && "dock-token-pulse")} onAnimationEnd={() => setPulsing(false)}>
      {value}
    </span>
  )
}
