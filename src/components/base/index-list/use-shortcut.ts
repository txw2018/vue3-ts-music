import type { Ref } from 'vue'
import type { IndexListProps } from './index-list'
import type Scroll from '~/components/base/scroll/scroll.vue'

export default function useShortcut(props: IndexListProps, groupRef: Ref<HTMLUListElement | null>) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref<InstanceType<typeof Scroll> | null>(null)
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const scrollTo = (index: number) => {
    if (isNaN(index))
      return
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value!.children[index] as HTMLElement
    const scroll = scrollRef.value!.scroll!
    scroll.scrollToElement(targetEl, 0, 0, 0)
  }

  const touch: Record<string, any> = {}
  const onShortcutTouchStart = (e: TouchEvent) => {
    if (e !== null && e.target instanceof HTMLElement) {
      const anchorIndex = parseInt(e.target.dataset.index!)
      touch.y1 = e.touches[0].pageY
      touch.anchorIndex = anchorIndex
      scrollTo(anchorIndex)
    }
  }

  const onShortcutTouchMove = (e: TouchEvent) => {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove,
  }
}
