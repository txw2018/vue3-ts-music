<script setup lang='ts'>
import type { PropType, StyleValue } from 'vue'
const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', index: number): void
}>()

const activeStyle = computed<StyleValue>(() => {
  const x = props.modelValue * 120
  return {
    transform: `translate3d(${x}px,0,0)`,
  }
})

const switchItem = (index: number) => {
  emit('update:modelValue', index)
}
</script>
<template>
  <ul
    flex="~ items-center"
    relative w-240px my-0 mx-auto b-1px border-dark-highlight rounded-5px
  >
    <li
      v-for="(item, index) in items"
      :key="item"
      relative z-10 flex-1 h-30px lh-30px text-center
      text="sm light-d"
      :class="[modelValue === index ? 'text-light': '']"
      @click="switchItem(index)"
    >
      <span>{{ item }}</span>
    </li>
    <div absolute left-0 top-0 w-120px h-30px transition transform delay-300 rounded-5px bg-dark-highlight :style="activeStyle" />
  </ul>
</template>
