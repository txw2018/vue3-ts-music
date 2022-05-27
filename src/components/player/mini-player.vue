<script setup lang='ts'>
import type { PropType } from 'vue'
import useCd from './use-cd'
import useMiniSlider from './use-mini-slider'
import type Playlist from './playlist.vue'
import { useMainStore } from '~/stores/main'
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
  togglePlay: Function as PropType<(payload: MouseEvent) => void>,
})
const playlistRef = ref<InstanceType<typeof Playlist> >()
const mainStore = useMainStore()
const { cdCls, cdImageRef, cdRef } = useCd()

const fullScreen = computed(() => mainStore.fullScreen)
const currentSong = computed(() => mainStore.currentSong)
const playing = computed(() => mainStore.playing)
const playlist = computed(() => mainStore.playlist)
const miniPlayIcon = computed(() => playing.value ? 'i-carbon:pause' : 'i-carbon:play')

const { sliderWrapperRef } = useMiniSlider()

const showNormalPlayer = () => {
  mainStore.setFullScreen(true)
}

const showPlaylist = () => {
  playlistRef.value!.show()
}
</script>
<template>
  <transition name="mini">
    <div
      v-show="!fullScreen"
      flex items-center fixed left-0 bottom-0 z-180 w-full h-60px bg-dark-highlight
      @click="showNormalPlayer"
    >
      <div class=" box-content flex-[0_0_40px] w-40px h-40px py-0px pr-10px pl-20px">
        <div
          ref="cdRef"
          h-full w-full
        >
          <img
            ref="cdImageRef"
            class="rounded-1/2 inline-block"
            width="40"
            height="40"
            :src="currentSong.pic"
            :class="cdCls"
          >
        </div>
      </div>
      <div
        ref="sliderWrapperRef"
        flex="~ col justify-center flex-1"
        lh-20px overflow-hidden
      >
        <div relative overflow-hidden whitespace-nowrap>
          <div
            v-for="song in playlist"
            :key="song.id"
            inline-block w-full
            translate-x-0 translate-y-0 translate-z-0
            backface-hidden
          >
            <h2 mb-2px no-wrap text="size-sm light-base">
              {{ song.name }}
            </h2>
            <p no-wrap text="text-sm light-d">
              {{ song.singer }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-[0_0_30px] w-52px py-0 px-10px">
        <progress-circle
          :radius="32"
          :progress="progress"
        >
          <div
            absolute left-2px top-0 right-0 bottom-0 m-auto text="theme-d"
            :class="miniPlayIcon"
            @click.stop="togglePlay"
          />
        </progress-circle>
      </div>
      <div
        class="flex-[0_0_30px] w-52px py-0 px-10px"
        @click.stop="showPlaylist"
      >
        <div
          class="i-carbon:query-queue relative top--2px" text="size-28px theme-d"
        />
      </div>
      <Playlist ref="playlistRef" />
    </div>
  </transition>
</template>
<style scoped>
.mini-enter-active, .mini-leave-active {
  transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
}
.mini-enter-from, .mini-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0)
}
</style>
