import type BScrollConstructor from '@better-scroll/core'
import BScroll from '@better-scroll/core'

import Slide from '@better-scroll/slide'

import { type Ref, onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef: Ref<HTMLDivElement | null>) {
  const slider = ref<BScrollConstructor | null>(null)
  const currentPageIndex = ref(0)

  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapperRef.value!, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    })

    sliderVal.on('slideWillChange', (page: any) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  onActivated(() => {
    slider.value?.enable()
    slider.value?.refresh()
  })

  onDeactivated(() => {
    slider.value?.disable()
  })

  return {
    slider,
    currentPageIndex,
  }
}
