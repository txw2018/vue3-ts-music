<script setup lang='ts'>
import type Scroll from '../base/scroll/scroll.vue'
import { useMainStore } from '~/stores/main'

const mainStore = useMainStore()
const scrollRef = ref<InstanceType<typeof Scroll>>()

const scroll = computed(() => {
  return scrollRef.value!.scroll
})
const playlist = computed(() => mainStore.playlist)

watch(playlist, async() => {
  await nextTick()
  scroll.value!.refresh()
})

defineExpose({
  scroll,
  scrollRef,
})

</script>
<template>
  <Scroll
    ref="scrollRef"
    v-bind="$attrs"
  >
    <slot />
  </Scroll>
</template>
