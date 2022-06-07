<script setup lang='ts'>
import { watchDebounced } from '@vueuse/core'
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: '搜索歌曲、歌手',
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const query = ref(props.modelValue)

const clear = () => {
  query.value = ''
}
watch(() => props.modelValue, (newVal) => {
  query.value = newVal
})

watchDebounced(
  query,
  (newQuery) => {
    emit('update:modelValue', newQuery!.trim())
  },
  { debounce: 300, maxWait: 800 },
)

</script>
<template>
  <div flex items-center w-full py-0 px-6px h-32px bg-dark-highlight rounded-6px>
    <div class="i-carbon:search" />
    <input
      v-model="query"
      flex-1 my-0 mx-5px lh-18px bg-dark-highlight text="base sm" outline-0
      :placeholder="placeholder"
    >
    <div
      v-show="query"
      class="i-carbon:close"
      text-light-d
      @click="clear"
    />
  </div>
</template>
