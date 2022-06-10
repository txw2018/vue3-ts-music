<script setup lang='ts'>
const props = defineProps({
  delay: {
    type: Number,
    default: 2000,
  },
})
let timer: number
const visible = ref(false)
const hide = () => {
  clearTimeout(timer)
  visible.value = false
}
const show = () => {
  visible.value = true
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    hide()
  }, props.delay)
}
defineExpose({
  show,
})
</script>
<template>
  <teleport to="body">
    <transition name="slide-down">
      <div
        v-show="visible"
        fixed top-0 w-full z-400 bg-dialog
        @click="hide"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translate3d(0, -100%, 0)
}
</style>
