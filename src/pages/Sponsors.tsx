import { Mail, Plus } from "lucide-react"
import { usePageTitle } from "@/lib/usePageTitle"

const GOLD_SLOTS = [1, 2, 3]
const SMALL_SLOTS = [1, 2, 3, 4, 5]

function TierHead({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-text-primary">{label}</span>
      <span className="h-px flex-1 bg-border-base" />
    </div>
  )
}

export default function SponsorsPage() {
  usePageTitle("赞助商 — CC Usage")
  return (
    <>
      <section className="flex flex-col items-center gap-3.5 bg-bg px-6 pb-[52px] pt-16 text-center">
        <h1 className="text-[40px] font-bold tracking-tight text-text-primary">赞助商</h1>
        <p className="max-w-[560px] text-[15px] leading-[1.8] text-text-secondary">
          CC Usage 永久免费开源。赞助商的支持用于服务器与开发投入，也欢迎了解这些伙伴。
        </p>
      </section>

      <div className="mx-auto max-w-[1120px] px-6">
        {/* 金牌赞助 */}
        <section className="flex flex-col gap-[18px]">
          <TierHead label="金牌赞助" />
          <div className="grid gap-5 sm:grid-cols-3">
            {GOLD_SLOTS.map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-card border border-border-strong bg-surface-2 px-5 py-[34px] text-center"
              >
                <Plus size={26} className="text-text-muted" />
                <span className="text-[15px] font-semibold text-text-muted">虚位以待</span>
                <span className="text-xs text-text-muted">logo + 一句话介绍 + 官网链接</span>
              </div>
            ))}
          </div>
        </section>

        {/* 普通赞助 */}
        <section className="flex flex-col gap-[18px] pt-11">
          <TierHead label="普通赞助" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SMALL_SLOTS.map((i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 rounded-btn border border-border-base bg-surface-2 py-[22px]"
              >
                <Plus size={14} className="text-text-muted" />
                <span className="text-xs text-text-muted">虚位以待</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 成为赞助商 */}
      <div className="px-6 pb-[72px] pt-[52px]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-3.5 rounded-card border border-border-base bg-accent-soft px-10 py-10 text-center">
          <h2 className="text-2xl font-bold text-text-primary">成为赞助商</h2>
          <p className="max-w-[520px] text-sm leading-[1.8] text-text-secondary">
            在这里展示你的品牌，触达每一位关注 AI 编程工作流的开发者。
          </p>
          <a
            href="mailto:sponsor@example.com"
            className="motion-button mt-1 inline-flex items-center gap-2 rounded-btn bg-accent px-6 py-[11px] text-sm font-semibold text-white"
          >
            <Mail size={15} />
            联系我们
          </a>
        </div>
      </div>
    </>
  )
}
