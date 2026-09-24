import { useEffect } from "react"

/**
 * SPA 每页独立 <title> —— 搜索结果与浏览器标签都以标题区分页面，
 * 不设置的话所有路由共用 index.html 里的同一个标题。
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
