<script setup lang='ts'>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})
const progressBtnWidth = 16
const offset = ref(0)
const progressBarRef = ref<HTMLDivElement | null>(null)

const progressStyle = computed(() => `width:${offset.value}px`)
const btnStyle = computed(() => `transform:translate3d(${offset.value}px,0,0)`)

const setOffset = (progress: number) => {
  const barWidth = progressBarRef.value!.clientWidth - progressBtnWidth
  offset.value = barWidth * progress
}

watch(() => props.progress, (newProgress) => {
  setOffset(newProgress)
})
</script>
<template>
  <div ref="progressBarRef" h-30px>
    <div relative top-13px h-4px bg-dark-d>
      <div absolute h-full bg-theme :style="progressStyle" />
      <div
        absolute left--8px top--13px w-30px h-30px :style="btnStyle"
      >
        <div
          relative top-7px left-7px box-border w-16px h-16px b-3 dark:border-light-base border-dark-base bg-theme class="rounded-1/2"
        />
      </div>
    </div>
  </div>
</template>
