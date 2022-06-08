import { get } from './base'
import type { HotKeyResult, SearchResult } from './search.types'

export function getHotKeys() {
  return get<HotKeyResult>('/api/getHotKeys')
}

export function search(query: string, page: number, showSinger: boolean) {
  return get<SearchResult>('/api/search', {
    query,
    page,
    showSinger,
  })
}
