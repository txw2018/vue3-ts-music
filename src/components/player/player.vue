<script setup lang='ts'>
import useMode from './use-mode'
import useFavorite from './use-favorite'
import { useMainStore } from '~/stores/main'
const mainStore = useMainStore()

const audioRef = ref<HTMLAudioElement | null>(null)
const songReady = ref(false)

const fullScreen = computed(() => mainStore.fullScreen)
const currentSong = computed(() => mainStore.currentSong)
const playing = computed(() => mainStore.playing)
const currentIndex = computed(() => mainStore.currentIndex)
// const playMode = computed(() => mainStore.playMode)
const playlist = computed(() => mainStore.playlist)
const playIcon = computed(() => {
  return playing.value ? 'i-carbon:pause-outline' : 'i-carbon:play-outline'
})
const disableCls = computed(() => {
  return songReady.value ? '' : 'text-theme-d'
})

// hooks
const { modeIcon, changeMode } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()

const goBack = () => {
  mainStore.setFullScreen(false)
}
const loop = () => {
  const audioEl = audioRef.value
  audioEl!.currentTime = 0
  audioEl?.play()
  mainStore.setPlayingState(true)
}
const togglePlay = () => {
  if (!songReady.value)
    return
  mainStore.setPlayingState(!playing.value)
}
const pause = () => {
  mainStore.setPlayingState(false)
}
const ready = () => {
  if (songReady.value)
    return
  songReady.value = true
}
const error = () => {
  songReady.value = true
}
// 上一首
const prev = () => {
  const list = playlist.value
  if (!songReady.value || !list.length)
    return
  if (list.length === 1) {
    loop()
  }
  else {
    let index = currentIndex.value - 1
    if (index === -1)
      index = list.length - 1

    mainStore.setCurrentIndex(index)
  }
}
// 下一首
const next = () => {
  const list = playlist.value
  if (!songReady.value || !list.length)
    return

  if (list.length === 1) {
    loop()
  }
  else {
    let index = currentIndex.value + 1
    if (index === list.length)
      index = 0

    mainStore.setCurrentIndex(index)
  }
}
// watch 切换歌曲
watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url)
    return
  songReady.value = false
  const audioEl = audioRef.value!
  audioEl.src = newSong.url
  audioEl.play()
  mainStore.setPlayingState(true)
})
// watch 播放状态
watch(playing, (newPlaying) => {
  if (!songReady.value)
    return
  const audioEl = audioRef.value
  if (newPlaying)
    audioEl?.play()
  else
    audioEl?.pause()
})

</script>
<template>
  <div>
    <div
      v-show="fullScreen"
      fixed left-0 right-0 top-0 bottom-0 z-150 bg-light dark:bg-dark
    >
      <template v-if="currentSong">
        <div
          absolute left-0 top-0 w-full h-full z--1 opacity-60 blur-20px
        >
          <img
            inline-block w-full h-full
            :src="currentSong.pic"
          >
        </div>
        <div relative mb-25px>
          <div
            class="back"
            absolute
            top-0 left-6px z-50 @click="goBack"
          >
            <i i-carbon:chevron-down block p-9px text-3xl text-theme />
          </div>
          <h1 class="w-7/10" my-0 mx-auto lh-40px text-center text-ellipsis overflow-hidden whitespace-nowrap text-lg text-light-base>
            {{ currentSong.name }}
          </h1>
          <h2 lh-20px text-center text-sm text-light-base>
            {{ currentSong.singer }}
          </h2>
        </div>
        <div absolute bottom-50px w-full>
          <div flex items-center>
            <div flex justify-end flex-1 text-theme>
              <div
                text-25px
                :class="modeIcon"
                @click="changeMode"
              />
            </div>
            <div
              flex justify-end flex-1 text-theme text-right
              :class="disableCls"
            >
              <div
                text-25px
                class="i-carbon:skip-back-outline"
                @click="prev"
              />
            </div>
            <div
              flex justify-center flex-1 text-theme py-0 px-20px text-center
              :class="disableCls"
            >
              <div
                text-35px
                :class="playIcon"
                @click="togglePlay"
              />
            </div>
            <div
              flex justify-start flex-1 text-theme text-left
              :class="disableCls"
            >
              <div
                text-25px
                class="i-carbon:skip-forward-outline"
                @click="next"
              />
            </div>
            <div flex justify-start flex-1 text-theme text-let>
              <div
                text-25px
                :class="getFavoriteIcon(currentSong)"
                @click="toggleFavorite(currentSong)"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
    />
  </div>
</template>
<style scoped>
</style>
