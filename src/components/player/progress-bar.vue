<script setup lang='ts'>
import { range } from '~/asstes/js/util'

interface Touch {
  x1?: number
  beginWidth?: number
}
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits<{
  (e: 'progress-changing', progress: number): void
  (e: 'progress-changed', progress: number): void
}>()
const progressBtnWidth = 16
const touch: Touch = {}
const offset = ref(0)
const progressRef = ref<HTMLDivElement | null>(null)
const progressBarRef = ref<HTMLDivElement | null>(null)

const progressStyle = computed(() => `width:${offset.value}px`)
const btnStyle = computed(() => `transform:translate3d(${offset.value}px,0,0)`)

const setOffset = (progress: number) => {
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  offset.value = barWidth * progress
}

const onTouchStart = (e: TouchEvent) => {
  touch.x1 = e.touches[0].pageX // 初始touch的位置
  touch.beginWidth = progressRef.value?.clientWidth // 初始时进度条长度
}
const onTouchMove = (e: TouchEvent) => {
  const delta = e.touches[0].pageX - touch.x1! // 拖动的长度
  const tempWidth = touch.beginWidth! + delta // 计算拖动后进度条的长度
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth // 获取进度条总长度
  const progress = range(tempWidth / barWidth, 0, 1)
  offset.value = barWidth * progress
  emit('progress-changing', progress)
}
const onTouchEnd = (e: TouchEvent) => {
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  const progress = progressRef.value!.clientWidth / barWidth
  emit('progress-changed', progress)
}
const onClick = (e: MouseEvent) => {
  const rect = progressBarRef.value!.getBoundingClientRect()
  const offsetWidth = e.pageX - rect.left
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  const progress = offsetWidth / barWidth
  emit('progress-changed', progress)
}

watch(() => props.progress, (newProgress) => {
  setOffset(newProgress)
})
</script>
<template>
  <div ref="progressBarRef" h-30px @click="onClick">
    <div relative top-13px h-4px bg-dark-d>
      <div ref="progressRef" absolute h-full bg-theme :style="progressStyle" />
      <div
        absolute left--8px top--13px w-30px h-30px :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div
          relative top-7px left-7px box-border w-16px h-16px b-3 dark:border-light-base border-dark-base bg-theme class="rounded-1/2"
        />
      </div>
    </div>
  </div>
</template>
