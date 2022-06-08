import type { Singer, Song } from './singer.types'

export interface HotKey {
  key: string
  id: number
}

export interface HotKeyResult {
  hotKeys: HotKey[]
}
export interface SearchResult {
  songs: Song[]
  hasMore: boolean
  singer?: Singer
}
