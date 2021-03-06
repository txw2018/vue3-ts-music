import { PLAY_MODE } from '~/asstes/js/constant'
import { useMainStore } from '~/stores/main'

export default function useMode() {
  const mainStore = useMainStore()

  const playMode = computed(() => mainStore.playMode)

  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? 'i-carbon:repeat'
      : playModeVal === PLAY_MODE.random
        ? 'i-carbon:movement'
        : 'i-carbon:repeat-one'
  })

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? '顺序播放'
      : playModeVal === PLAY_MODE.random
        ? '随机播放'
        : '单曲循环'
  })
  const changeMode = () => {
    const mode = (playMode.value + 1) % 3
    mainStore.changeMode(mode)
  }
  return {
    modeIcon,
    modeText,
    changeMode,
  }
}
