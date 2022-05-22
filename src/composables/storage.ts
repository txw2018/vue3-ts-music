import type { Singer, Song } from '~/service/singer.types'

export const SINGER_KEY = '__singer__'
export const FAVORITE_KEY = '__favorite__'

export const singerStorage = useSessionStorage<Singer>(SINGER_KEY, null)

export const favoriteStorage = useStorage<Song[]>(FAVORITE_KEY, null)
