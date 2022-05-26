<script setup lang='ts'>
const props = defineProps({
  radius: {
    type: Number,
    default: 100,
  },
  progress: {
    type: Number,
    default: 0,
  },
})

const dashArray = Math.PI * 100

const dashOffset = computed(() => (1 - props.progress) * dashArray)
</script>
<template>
  <div relative>
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="stroke-8px origin-center scale-90 stroke-theme-d"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="stroke-8px origin-center scale-90 -rotate-90 stroke-theme"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot />
  </div>
</template>
