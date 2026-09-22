export type PlatformId =
  | "claude"
  | "codex"
  | "gemini"
  | "grok"
  | "zcode"
  | "trae"
  | "qoder"
  | "workbuddy"

export type PlatformDemoAvailability = "quota" | "source-only"

export interface PlatformConfig {
  id: PlatformId
  name: string
  demoAvailability: PlatformDemoAvailability
  summary: string
  capabilities: readonly string[]
}

export const PLATFORMS: readonly PlatformConfig[] = [
  {
    id: "claude",
    name: "Claude",
    demoAvailability: "quota",
    summary: "官方订阅、API、本地会话与额度统计",
    capabilities: ["订阅额度", "Token", "缓存", "会话"],
  },
  {
    id: "codex",
    name: "Codex",
    demoAvailability: "quota",
    summary: "官方订阅、API、本地会话与额度统计",
    capabilities: ["订阅额度", "Token", "缓存", "会话"],
  },
  {
    id: "gemini",
    name: "Gemini",
    demoAvailability: "source-only",
    summary: "本机 Gemini CLI 会话与实时用量",
    capabilities: ["本机连接", "Token", "会话"],
  },
  {
    id: "grok",
    name: "Grok",
    demoAvailability: "source-only",
    summary: "本机 OAuth 连接与积分额度查询",
    capabilities: ["本机连接", "订阅额度"],
  },
  {
    id: "zcode",
    name: "Zcode",
    demoAvailability: "source-only",
    summary: "本机连接、会话用量与缓存统计",
    capabilities: ["本机连接", "Token", "缓存", "会话"],
  },
  {
    id: "trae",
    name: "Trae",
    demoAvailability: "source-only",
    summary: "读取本机来源并纳入统一连接管理",
    capabilities: ["本机连接"],
  },
  {
    id: "qoder",
    name: "Qoder",
    demoAvailability: "source-only",
    summary: "国内／国际版本的本机会话与积分",
    capabilities: ["本机连接", "Token", "积分", "会话"],
  },
  {
    id: "workbuddy",
    name: "Workbuddy",
    demoAvailability: "source-only",
    summary: "本机用量、缓存、积分与会话统计",
    capabilities: ["本机连接", "Token", "缓存", "积分", "会话"],
  },
]

export const PLATFORM_IDS: readonly PlatformId[] = PLATFORMS.map((platform) => platform.id)

export function platformConfig(id: PlatformId): PlatformConfig {
  return PLATFORMS.find((platform) => platform.id === id) ?? PLATFORMS[0]
}

export function platformDemoAvailability(id: PlatformId): PlatformDemoAvailability {
  return platformConfig(id).demoAvailability
}
