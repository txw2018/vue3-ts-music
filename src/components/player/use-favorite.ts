import { remove, save } from '~/asstes/js/array-store'
import { favoriteStorage } from '~/composables/storage'
import type { Song } from '~/service/singer.types'
import { useMainStore } from '~/stores/main'

export default function useFavorite() {
  const mainStore = useMainStore()
  const favoriteList = computed(() => mainStore.favoriteList)
  const maxLen = 100

  const isFavorite = (song: Song) => {
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  const getFavoriteIcon = (song: Song) => {
    return isFavorite(song) ? 'i-carbon:favorite-filled text-sub-theme' : 'i-carbon:favorite'
  }
  const toggleFavorite = (song: Song) => {
    let list: Song[]
    if (isFavorite(song))
      list = remove(favoriteStorage, compare)
    else
      list = save(song, favoriteStorage, compare, maxLen)

    mainStore.setFavoriteList(list)
    function compare(item: Song) {
      return item.id === song.id
    }
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  }
}
