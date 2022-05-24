import { useMainStore } from '~/stores/main'

export default function useCd() {
  const mainStore = useMainStore()
  const cdRef = ref<HTMLDivElement>()
  const cdImageRef = ref<HTMLDivElement>()

  const playing = computed(() => mainStore.playing)

  const cdCls = computed(() => {
    return playing.value ? 'animate-cd' : ''
  })

  const syncTransform = (wrapper: HTMLDivElement, inner: HTMLDivElement) => {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
  }

  watch(playing, (newPlaying) => {
    if (!newPlaying)
      syncTransform(cdRef.value!, cdImageRef.value!)
  })
  return {
    cdCls,
    cdRef,
    cdImageRef,
  }
}
