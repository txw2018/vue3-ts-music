import BScroll from '@better-scroll/core'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import Slide from '@better-scroll/slide'
import { useMainStore } from '~/stores/main'
BScroll.use(Slide)
export default function useMiniSlider() {
  const mainStore = useMainStore()
  const sliderWrapperRef = ref<HTMLDivElement>()
  const slider = ref<BScrollConstructor>()

  const fullScreen = computed(() => mainStore.fullScreen)
  const playlist = computed(() => mainStore.playlist)
  const currentIndex = computed(() => mainStore.currentIndex)

  const sliderShow = computed(() => {
    return !fullScreen.value && playlist.value.length > 0
  })

  onMounted(() => {
    let sliderVal: BScrollConstructor
    watch(sliderShow, async(newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value!, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          })
          sliderVal.on('slidePageChanged', ({ pageX }: any) => {
            mainStore.setCurrentIndex(pageX)
          })
        }
        else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })

    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value)
        sliderVal.goToPage(newIndex, 0, 0)
    })

    // 监听歌曲删除之后要重新refresh
    watch(playlist, async(newList) => {
      if (sliderVal && sliderShow.value && newList.length > 0) {
        await nextTick
        sliderVal.refresh()
      }
    })
  })
  onUnmounted(() => {
    if (slider.value)
      slider.value.destroy()
  })

  onActivated(() => {
    if (slider.value) {
      slider.value.enable()
      slider.value.refresh()
    }
  })

  onDeactivated(() => {
    if (slider.value)
      slider.value.disable()
  })
  return {
    sliderWrapperRef,
    slider,
  }
}
