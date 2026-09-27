import { useEffect, useState } from "react"
import { APP_VERSION, DOWNLOAD_BASE_URL, RELEASE_TAG, UPDATE_MANIFEST_URL } from "@/lib/version"

/**
 * 当前可下载版本 —— 运行时从自动更新清单读取。
 *
 * 为什么不写死版本号：持续构建每次提交都会发新版本，写死的话官网会越来越旧，
 * 而且指向的安装包地址会随旧发行版被清理而失效。清单由发布流水线生成，
 * 与桌面端自动更新用的是同一份数据，天然保持一致。
 *
 * 取不到时（离线、清单尚未发布）回退到构建期内置的版本，页面始终可用。
 */
export interface LatestRelease {
  version: string
  /** 安装包下载基址，形如 .../releases/download/<tag> */
  downloadBase: string
  /** true 表示用的是内置回退值，不是线上最新 */
  fallback: boolean
}

const BUILTIN: LatestRelease = {
  version: APP_VERSION,
  downloadBase: DOWNLOAD_BASE_URL,
  fallback: true,
}

/** 从清单里任一平台的下载地址反推基址，避免把发行版标签名二次写死。 */
export function parseManifest(raw: unknown): LatestRelease | null {
  if (typeof raw !== "object" || raw === null) return null
  const manifest = raw as { version?: unknown; platforms?: Record<string, { url?: unknown }> }
  if (typeof manifest.version !== "string" || !manifest.version) return null

  const url = Object.values(manifest.platforms ?? {})
    .map((entry) => entry?.url)
    .find((value): value is string => typeof value === "string" && value.includes("/releases/download/"))
  if (!url) return null

  const base = url.slice(0, url.lastIndexOf("/"))
  return { version: manifest.version, downloadBase: base, fallback: false }
}

/** 按发布流水线的命名规则拼安装包地址（assetNamePattern: CC-Usage-v[version]-…）。 */
export function assetUrl(release: LatestRelease, suffix: string): string {
  return `${release.downloadBase}/CC-Usage-v${release.version}-${suffix}`
}

export function useLatestRelease(): LatestRelease {
  const [release, setRelease] = useState<LatestRelease>(BUILTIN)

  useEffect(() => {
    const controller = new AbortController()
    fetch(UPDATE_MANIFEST_URL, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((raw) => {
        const parsed = parseManifest(raw)
        if (parsed) setRelease(parsed)
      })
      .catch(() => {
        // 取不到就继续用内置版本，不打扰访客
      })
    return () => controller.abort()
  }, [])

  return release
}

export { RELEASE_TAG }
