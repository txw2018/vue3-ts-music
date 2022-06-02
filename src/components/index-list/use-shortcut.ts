import type { Ref } from 'vue'
import type { IndexListProps } from './index-list'
import type Scroll from '~/components/base/scroll/scroll.vue'
import { range } from '~/asstes/js/util'

export default function useShortcut(props: IndexListProps, groupRef: Ref<HTMLUListElement | undefined>) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref<InstanceType<typeof Scroll>>()
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const scrollTo = (index: number) => {
    // touch target 可能不是li，就没有index ，所以index可能NAN
    if (isNaN(index))
      return
    index = range(index, 0, shortcutList.value.length - 1)
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
