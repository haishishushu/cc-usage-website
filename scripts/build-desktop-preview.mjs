import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const websiteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)))
const frontendRoot = resolve(process.env.CC_USAGE_FRONTEND_DIR ?? resolve(websiteRoot, "../cc-usage/frontend"))
const outputDir = resolve(websiteRoot, "public/desktop-preview")
const viteBin = resolve(frontendRoot, "node_modules/vite/bin/vite.js")

if (!outputDir.startsWith(`${websiteRoot}${sep}`) || !existsSync(resolve(frontendRoot, "src/views/IslandWindow.tsx"))) {
  throw new Error("桌面端源码目录无效；设置 CC_USAGE_FRONTEND_DIR 指向 cc-usage/frontend。")
}
if (!existsSync(viteBin)) {
  throw new Error(`桌面端依赖未安装：${frontendRoot}。先在该目录运行 pnpm install。`)
}

execFileSync(process.execPath, [
  viteBin,
  "build",
  "--base=/cc-usage-website/desktop-preview/",
  "--outDir", outputDir,
  "--emptyOutDir",
], { cwd: frontendRoot, stdio: "inherit" })
