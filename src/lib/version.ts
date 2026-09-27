/**
 * 版本与仓库元信息单点。
 *
 * APP_VERSION 只是**回退值**：页面实际展示与下载的版本由 useLatestRelease
 * 在运行时从更新清单读取，所以持续构建发了新版也不用改这里。
 * 取不到清单时才用这个内置值兜底。
 */
export const APP_VERSION = "0.1.0"

export const RELEASE_TAG = `v${APP_VERSION}`

export const REPO_URL = "https://github.com/haishishushu/cc-usage"

/** 发行版列表页；始终指向最新一版，不绑定具体标签 */
export const RELEASES_URL = `${REPO_URL}/releases/latest`

/** 安装包下载基址的回退值（正常情况由清单里的地址反推，见 useLatestRelease） */
export const DOWNLOAD_BASE_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}`

/** 自动更新清单：与桌面端自更新同一份数据，允许跨域读取 */
export const UPDATE_MANIFEST_URL = "https://haishishushu.github.io/cc-usage/latest.json"

/** 官网部署地址（GitHub Pages 项目页，HashRouter 路由） */
export const SITE_URL = "https://haishishushu.github.io/cc-usage-website"
