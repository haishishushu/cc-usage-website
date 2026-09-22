import assert from "node:assert/strict"
import test from "node:test"

import {
  PLATFORM_IDS,
  platformConfig,
  platformDemoAvailability,
} from "./platforms.ts"

test("官网平台选择器完整覆盖桌面端八个平台并保持相同顺序", () => {
  assert.deepEqual(PLATFORM_IDS, [
    "claude",
    "codex",
    "gemini",
    "grok",
    "zcode",
    "trae",
    "qoder",
    "workbuddy",
  ])

  assert.deepEqual(
    PLATFORM_IDS.map((id) => platformConfig(id).name),
    ["Claude", "Codex", "Gemini", "Grok", "Zcode", "Trae", "Qoder", "Workbuddy"],
  )
})

test("没有官网演示额度的平台不会回退显示其他平台的虚构数据", () => {
  assert.equal(platformDemoAvailability("claude"), "quota")
  assert.equal(platformDemoAvailability("codex"), "quota")

  for (const id of ["gemini", "grok", "zcode", "trae", "qoder", "workbuddy"]) {
    assert.equal(platformDemoAvailability(id), "source-only")
  }
})
