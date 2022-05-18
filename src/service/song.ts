import { get } from './base'
import type { Song } from './singer.types'
import type { SongsUrlResult } from './song.types'

export function processSongs(songs: Song[]) {
  if (!songs.length)
    return Promise.resolve(songs)

  return get<SongsUrlResult>('/api/getSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    }),
  }).then((result) => {
    const map = result!.map
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter((song) => {
      return song.url && song.url.includes('vkey')
    })
  })
}
