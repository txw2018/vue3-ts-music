import type{ IndexListProps } from './index-list'
import type { Pos } from '~/components/base/scroll/scroll'

export default function useFixed(props: IndexListProps) {
  const TITLE_HEIGHT = 30
  const groupRef = ref<HTMLUListElement>()
  const listHeights = ref<number[]>([])
  const currentIndex = ref(0)
  const scrollY = ref(0)
  const distance = ref(0)
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`,
    }
  })

  const calculate = () => {
    const list = groupRef.value!.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }
  const onScroll = (pos: Pos) => {
    scrollY.value = -pos.y
  }
  const fixedTitle = computed(() => {
    if (scrollY.value < 0)
      return ''
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  watch(() => props.data, async() => {
    await nextTick()
    calculate()
  })

  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY < heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
        break
      }
    }
  })

  return {
    currentIndex,
    groupRef,
    fixedTitle,
    fixedStyle,
    onScroll,
  }
}
