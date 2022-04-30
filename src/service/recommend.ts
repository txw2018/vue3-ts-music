import { get } from './base'
import type { Recommend } from './recommend.type'

export function getRecommend() {
  return get<Recommend>('/api/getRecommend')
}
