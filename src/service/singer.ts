import { get } from './base'
import type { SingerDetailParams, SingerResult } from './singer.types'
export function getSingerList() {
  return get<SingerResult>('/api/getSingerList')
}

export function getSingerDetail(singer: SingerDetailParams) {
  return get('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
