<script setup lang='ts'>
import { scrollEmits, scrollProps } from './scroll'
import useScroll from './use-scroll'
const props = defineProps(scrollProps)
const emit = defineEmits(scrollEmits)
const rootRef = ref<HTMLDivElement>()
const scroll = useScroll(rootRef, props, emit)

defineExpose({
  scroll,
})
</script>
<template>
  <div ref="rootRef">
    <slot />
  </div>
</template>
