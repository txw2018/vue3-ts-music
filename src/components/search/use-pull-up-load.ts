import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import type { Ref } from 'vue'
BScroll.use(PullUp)
BScroll.use(ObserveDOM)
export default function usePullUpLoad(requestData: () => Promise<void>, preventPullUpLoad: Ref<boolean>) {
  const scroll = ref<BScrollConstructor>()
  const rootRef = ref<HTMLDivElement>()
  const isPullUpLoad = ref(false)
  const pullingUpHandler = async() => {
    const scrollVal = scroll.value!

    if (preventPullUpLoad.value) {
      scrollVal.finishPullUp()
      return
    }
    isPullUpLoad.value = true
    await requestData()
    scrollVal.finishPullUp()
    scrollVal.refresh()
    isPullUpLoad.value = false
  }
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(rootRef.value!, {
      pullUpLoad: true,
      observeDOM: true,
      click: true,
    })
    scrollVal.on('pullingUp', pullingUpHandler)
  })

  onUnmounted(() => {
    scroll.value!.destroy()
  })

  onActivated(() => {
    scroll.value!.enable()
    scroll.value!.refresh()
  })

  onDeactivated(() => {
    scroll.value!.disable()
  })
  return {
    isPullUpLoad,
    rootRef,
    scroll,
  }
}
