import { get } from './base'
import type { HotKeyResult } from './search.type'

export function getHotKeys() {
  return get<HotKeyResult>('/api/getHotKeys')
}

export function search(query, page, showSinger) {
  return get('/api/search', {
    query,
    page,
    showSinger,
  })
}
