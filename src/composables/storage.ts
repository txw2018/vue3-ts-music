import type { Album } from '~/service/recommend.types'
import type { Singer, Song } from '~/service/singer.types'
import type { TopList } from '~/service/top-list.types'

export const SINGER_KEY = '__singer__'
export const FAVORITE_KEY = '__favorite__'
export const ALBUM_KEY = '__album__'
export const TOP_KEY = '__top__'
export const SEARCH_KEY = '__search__'

export const singerStorage = useSessionStorage<Singer>(SINGER_KEY, {} as Singer)

export const favoriteStorage = useStorage<Song[]>(FAVORITE_KEY, [])

export const albumStorage = useStorage<Album>(ALBUM_KEY, {} as Album)

export const topListStorage = useStorage<TopList>(TOP_KEY, {} as TopList)

export const searchHistoryStorage = useStorage<string[]>(SEARCH_KEY, [])
