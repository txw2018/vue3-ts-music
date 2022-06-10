import { save } from '~/asstes/js/array-store'
import { playHistoryStorage } from '~/composables/storage'
import type { Song } from '~/service/singer.types'
import { useMainStore } from '~/stores/main'

export default function usePlayHistory() {
  const mainStore = useMainStore()
  const maxLen = 200

  const savePlay = (song: Song) => {
    const songs = save(song, playHistoryStorage, (item) => {
      return item.id === song.id
    }, maxLen)
    mainStore.setPlayHistory(songs)
  }
  return {
    savePlay,
  }
}
