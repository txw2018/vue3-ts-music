import { get } from './base'
import type { AlbumParams, Recommend } from './recommend.type'
import type { SongResult } from './singer.types'

export function getRecommend() {
  return get<Recommend>('/api/getRecommend')
}

export function getAlbum(album: AlbumParams) {
  return get<SongResult>('/api/getAlbum', {
    id: album.id,
  })
}
