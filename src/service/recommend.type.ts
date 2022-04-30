export interface Album {
  id: number
  username: string
  title: string
  pic: string
}
export interface Slider {
  id: string
  pic: string
  link: string
}
export interface Recommend{
  albums: Album[]
  sliders: Slider[]
}
