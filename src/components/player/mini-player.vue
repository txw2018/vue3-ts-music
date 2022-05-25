<script setup lang='ts'>
import type { PropType } from 'vue'
import useCd from './use-cd'
import { useMainStore } from '~/stores/main'
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
  togglePlay: Function as PropType<(payload: MouseEvent) => void>,
})
const mainStore = useMainStore()
const { cdCls, cdImageRef, cdRef } = useCd()

const fullScreen = computed(() => mainStore.fullScreen)
const currentSong = computed(() => mainStore.currentSong)
const playing = computed(() => mainStore.playing)
const miniPlayIcon = computed(() => playing.value ? '' : '')

const showNormalPlayer = () => {

}

</script>
<template>
  <transition name="mini">
    <div
      v-show="!fullScreen"
      flex items-center fixed left-0 bottom-0 z-180 w-full h-60px bg-light-highlight-background
      @click="showNormalPlayer"
    >
      <div class="flex-[0_0_40px] w-40px h-40px py-0px pr-10px pb-20px">
        <div
          ref="cdRef"
          h-full w-full
        >
          <img
            ref="cdImageRef"
            class="rounded-1/2"
            width="40"
            height="40"
            :src="currentSong.pic"
            :class="cdCls"
          >
        </div>
      </div>
      <div class="control">
        <progress-circle
          :radius="32"
          :progress="progress"
        >
          <i
            class="icon-mini"
            :class="miniPlayIcon"
            @click.stop="togglePlay"
          />
        </progress-circle>
      </div>
    </div>
  </transition>
</template>

<style scoped lang='scss'>
</style>
