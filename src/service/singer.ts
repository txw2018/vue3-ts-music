import { get } from './base'
import type { SingerResult } from './singer.types'
export function getSingerList() {
  return get<SingerResult>('/api/getSingerList')
}
