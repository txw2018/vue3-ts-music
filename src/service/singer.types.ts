export interface Singer {
  id: number
  mid: string
  name: string
  pic: string
}

export interface SingerList {
  title: string
  list: Singer[]
}
export interface SingerResult {
  singers: SingerList[]
}

export interface SingerDetailParams {
  mid: string
}
export interface Song {
  id: number
  mid: string
  name: string
  singer: string
  url: string
  duration: number
  pic: string
  album: string
}
export interface SongResult {
  songs: Song[]
}
