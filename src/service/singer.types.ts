import exp from 'constants'

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
