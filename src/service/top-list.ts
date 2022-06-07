import { get } from './base'
import type { SongResult } from './singer.types'
import type { TopList, TopListResult } from './top-list.types'

export function getTopList() {
  return get<TopListResult>('/api/getTopList')
}

export function getTopDetail(top: TopList) {
  return get<SongResult>('/api/getTopDetail', {
    id: top.id,
    period: top.period,
  })
}
