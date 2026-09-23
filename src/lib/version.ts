/**
 * 版本与仓库元信息单点 —— 发新版只改 APP_VERSION，
 * 导航徽章、下载页文件名、更新日志的链接全部从这里派生，
 * 与根 package.json、cc-usage 的 tauri.conf.json 保持同步。
 */
export const APP_VERSION = "0.1.0"

export const RELEASE_TAG = `v${APP_VERSION}`

export const REPO_URL = "https://github.com/haishishushu/cc-usage"

export const RELEASES_URL = `${REPO_URL}/releases/tag/${RELEASE_TAG}`

/** GitHub Releases 产物下载基址（文件名含版本号，见下载页） */
export const DOWNLOAD_BASE_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}`

/** 官网部署地址（GitHub Pages 项目页，HashRouter 路由） */
export const SITE_URL = "https://haishishushu.github.io/cc-usage-website"
