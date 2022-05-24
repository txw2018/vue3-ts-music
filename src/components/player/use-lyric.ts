import Lyric from 'lyric-parser'
import { getLyric } from '~/service/song'
import { useMainStore } from '~/stores/main'
export default function useLyric() {
  const mainStore = useMainStore()

  const currentLyric = ref<Lyric>()

  const currentSong = computed(() => mainStore.currentSong)

  const handleLyric = () => {
    console.log(123)
  }
  watch(currentSong, async(newSong) => {
    if (!newSong.url || !newSong.id)
      return
    const lyric = await getLyric(newSong)

    mainStore.addSongLyric(newSong, lyric)

    if (currentSong.value.lyric !== lyric)
      return

    currentLyric.value = new Lyric(lyric, handleLyric)
  })
}
