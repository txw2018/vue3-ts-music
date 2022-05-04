import BScroll from '@better-scroll/core'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import type{ Ref, SetupContext } from 'vue'
import type { Pos, ScrollEmits, ScrollProps } from './scroll'
BScroll.use(ObserveDOM)

type Emit = SetupContext<ScrollEmits>['emit']

export default function useScroll(wrapperRef: Ref<HTMLDivElement | null>, options: ScrollProps, emit: Emit) {
  const scroll = ref<BScrollConstructor | null>(null)
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value!, {
      observeDOM: true,
      ...options,
    })

    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos: Pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })

  onActivated(() => {
    scroll.value?.enable()
    scroll.value?.refresh()
  })

  onDeactivated(() => {
    scroll.value?.disable()
  })

  return scroll
}
