import type { StyleValue } from 'vue'
import { range } from '~/asstes/js/util'

type ViewPage = 'cd' | 'lyric'
interface Touch {
  startX?: number
  startY?: number
  directionLocked?: 'h'|'v'
  percent?: number
}
export default function useMiddleInteractive() {
  const currentShow = ref<ViewPage>('cd')
  const middleLStyle = ref<StyleValue >()
  const middleRStyle = ref<StyleValue>()
  const touch: Touch = {}
  let currentView: ViewPage = 'cd'

  const onMiddleTouchStart = (e: TouchEvent) => {
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    touch.directionLocked = undefined
  }
  const onMiddleTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].pageX - touch.startX!
    const deltaY = e.touches[0].pageY - touch.startY!

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (!touch.directionLocked)
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'

    if (touch.directionLocked === 'v') { // 手指纵向拖动
      return
    }
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = range(left + deltaX, -window.innerWidth, 0)
    touch.percent = Math.abs(offsetWidth / window.innerWidth) // 获取手指滑动的比例
    if (currentView === 'cd') { // cd页面
      if (touch.percent > 0.2) // 向左滑20%
        currentShow.value = 'lyric'
      else
        currentShow.value = 'cd'
    }
    else { // 歌词页面
      if (touch.percent < 0.8) // 向右滑20%
        currentShow.value = 'cd'
      else
        currentShow.value = 'lyric'
    }
    middleLStyle.value = {
      opacity: 1 - touch.percent,
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
    }
  }
  const onMiddleTouchEnd = () => {
    let offsetWidth: number
    let opacity: number
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    }
    else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }
    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`,
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: `${duration}ms`,
    }
  }
  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  }
}
