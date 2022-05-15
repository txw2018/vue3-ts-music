import { get } from './base'
import type { SingerResult } from './singer.types'
export function getSingerList() {
  return get<SingerResult>('/api/getSingerList')
}

export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
