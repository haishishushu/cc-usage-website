import assert from "node:assert/strict"
import { test } from "node:test"

/**
 * parseManifest / assetUrl 的纯函数行为。
 * 与 useLatestRelease.ts 保持同一份实现语义：清单结构不合预期时返回 null，
 * 由调用方回退到内置版本，绝不产出半截地址。
 */

function parseManifest(raw) {
  if (typeof raw !== "object" || raw === null) return null
  const manifest = raw
  if (typeof manifest.version !== "string" || !manifest.version) return null

  const url = Object.values(manifest.platforms ?? {})
    .map((entry) => entry?.url)
    .find((value) => typeof value === "string" && value.includes("/releases/download/"))
  if (!url) return null

  const base = url.slice(0, url.lastIndexOf("/"))
  return { version: manifest.version, downloadBase: base, fallback: false }
}

const assetUrl = (release, suffix) => `${release.downloadBase}/CC-Usage-v${release.version}-${suffix}`

const REAL_MANIFEST = {
  version: "0.1.9",
  platforms: {
    "windows-x86_64": {
      url: "https://github.com/haishishushu/cc-usage/releases/download/continuous/CC-Usage-v0.1.9-Windows-x86_64-Setup.exe",
    },
  },
}

test("从真实清单里取出版本与下载基址", () => {
  const release = parseManifest(REAL_MANIFEST)
  assert.equal(release.version, "0.1.9")
  assert.equal(
    release.downloadBase,
    "https://github.com/haishishushu/cc-usage/releases/download/continuous",
  )
  assert.equal(release.fallback, false)
})

test("按平台后缀拼出五个安装包地址", () => {
  const release = parseManifest(REAL_MANIFEST)
  assert.equal(
    assetUrl(release, "macOS-arm64.dmg"),
    "https://github.com/haishishushu/cc-usage/releases/download/continuous/CC-Usage-v0.1.9-macOS-arm64.dmg",
  )
  assert.equal(
    assetUrl(release, "Linux-x86_64.AppImage"),
    "https://github.com/haishishushu/cc-usage/releases/download/continuous/CC-Usage-v0.1.9-Linux-x86_64.AppImage",
  )
})

test("标签换成正式版时下载基址跟着变，不写死 continuous", () => {
  const release = parseManifest({
    version: "0.2.0",
    platforms: {
      "windows-x86_64": {
        url: "https://github.com/haishishushu/cc-usage/releases/download/v0.2.0/CC-Usage-v0.2.0-Windows-x86_64-Setup.exe",
      },
    },
  })
  assert.equal(release.downloadBase.endsWith("/download/v0.2.0"), true)
  assert.equal(assetUrl(release, "Windows-x86_64-Setup.exe").includes("v0.2.0"), true)
})

test("结构异常一律返回 null，交由调用方回退", () => {
  assert.equal(parseManifest(null), null)
  assert.equal(parseManifest("0.1.9"), null)
  assert.equal(parseManifest({}), null)
  assert.equal(parseManifest({ version: "" }), null)
  // 有版本但没有任何可用下载地址
  assert.equal(parseManifest({ version: "0.1.9", platforms: {} }), null)
  assert.equal(parseManifest({ version: "0.1.9", platforms: { x: { url: 123 } } }), null)
})

test("忽略不是发行版下载地址的条目", () => {
  const release = parseManifest({
    version: "0.1.9",
    platforms: {
      weird: { url: "https://example.com/somewhere/else.exe" },
      "windows-x86_64": {
        url: "https://github.com/haishishushu/cc-usage/releases/download/continuous/CC-Usage-v0.1.9-Windows-x86_64-Setup.exe",
      },
    },
  })
  assert.equal(release.downloadBase.includes("/releases/download/"), true)
})
