import { get } from './base'
import type { SingerDetailParams, SingerResult, SongResult } from './singer.types'
export function getSingerList() {
  return get<SingerResult>('/api/getSingerList')
}

export function getSingerDetail(singer: SingerDetailParams) {
  return get<SongResult>('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
