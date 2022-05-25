import Lyric from 'lyric-parser'
import type { Ref } from 'vue'
import { getLyric } from '~/service/song'
import { useMainStore } from '~/stores/main'
import type Scroll from '~/components/base/scroll/scroll.vue'

interface Params {
  songReady: Ref<boolean>
  currentTime: Ref<number>
}
export default function useLyric({ songReady, currentTime }: Params) {
  const mainStore = useMainStore()
  const currentLineNum = ref(0)
  const playingLyric = ref('')
  const currentLyric = ref<Lyric | null>(null)
  const lyricListRef = ref<HTMLDivElement>()
  const lyricScrollRef = ref<InstanceType<typeof Scroll>>()

  const currentSong = computed(() => mainStore.currentSong)

  // 获取当前播放的一行歌词 lineNum：行数  txt：当行歌词
  const handleLyric = ({ lineNum, txt }: { lineNum: number; txt: string }) => {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value!
    const listEl = lyricListRef.value!
    if (!listEl)
      return

    if (lineNum > 5) { // 让歌词滚动在中间位置
      const lineEl = listEl.children[lineNum - 5] as HTMLElement
      scrollComp.scroll!.scrollToElement(lineEl, 1000, 0, 0)
    }
    else {
      scrollComp.scroll!.scrollTo(0, 0, 1000)
    }
  }

  const playLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal)
      currentLyricVal.seek(currentTime.value * 1000)// 播放歌词
  }

  const stopLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal)
      currentLyricVal.stop()
  }

  watch(currentSong, async(newSong) => {
    if (!newSong.url || !newSong.id)
      return

    // 切换歌曲的时候清掉上一首歌曲的信息
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    playingLyric.value = ''

    const lyric = await getLyric(newSong)
    mainStore.addSongLyric(newSong, lyric)

    if (currentSong.value.lyric !== lyric)
      return

    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value)// 歌曲缓冲完成 存在歌曲还没缓冲完成情况，需要在audio ready执行playLyric
        playLyric()
    }
  })
  return {
    currentLyric,
    currentLineNum,
    lyricListRef,
    lyricScrollRef,
    playingLyric,
    playLyric,
    stopLyric,
  }
}
