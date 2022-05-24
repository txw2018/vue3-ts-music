import { get } from './base'
import type { Song } from './singer.types'
import type { LyricResult, SongsUrlResult } from './song.types'

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

const lyricMap: Record<string, any> = {}

export function getLyric(song: Song) {
  if (song.lyric)
    return Promise.resolve(song.lyric)

  const mid = song.mid
  const lyric: string = lyricMap[mid]

  if (lyric)
    return Promise.resolve(lyric)

  return get<LyricResult>('/api/getLyric', {
    mid,
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
