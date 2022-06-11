<script setup lang='ts'>
import { dialogProps } from './dialog'
import type { DialogAction } from './dialog'

const props = defineProps(dialogProps)
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'update:show', value: boolean): void
}>()

const updateShow = (value: boolean) => emit('update:show', value)

const hide = (action: DialogAction) => {
  updateShow(false)
  props.callback?.(action)
}
const open = () => {
  updateShow(true)
}
const confirm = () => {
  emit('confirm')
  hide('confirm')
}
const cancel = () => {
  emit('cancel')
  hide('cancel')
}

defineExpose({
  open,
})
</script>
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div v-show="show" fixed left-0 right-0 top-0 bottom-0 z-998 dark:bg-dark-d bg-light-d>
        <div absolute z-999 class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="confirm-content" w-270px rounded-13px dark:bg-dark-highlight bg-light-highlight>
            <p py-19px px-15px lh-22px text-center text="sm" dark:text-dark-l text-light-l>
              {{ message }}
            </p>
            <div flex="~ items-center" text-center text-sm>
              <div
                flex-1 lh-22px py-10px px-0 b-r-1px b-t-1px dark:border-dark-d  border-light-d  dark:text-light text-dark

                @click="confirm"
              >
                {{ confirmBtnText }}
              </div>
              <div
                v-show="showCancelButton"
                flex-1 lh-22px py-10px px-0 b-t-1px dark:border-dark-d dark:text-dark-l border-light-d text-light-l
                @click="cancel"
              >
                {{ cancelBtnText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<style scoped>
.confirm-fade-enter-active{
  animation: confirm-fadein 0.3s;
}
.confirm-fade-enter-active .confirm-content{
  animation: confirm-zoom-in 0.3s;
}

.confirm-fade-leave-active{
  animation: confirm-fadeout 0.3s;
}
.confirm-fade-leave-active .confirm-content{
  animation: confirm-zoom-out 0.3s;
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
