<script setup lang='ts'>
import useMode from './use-mode'
import useFavorite from './use-favorite'
import type progressBar from './progress-bar.vue'
import useCd from './use-cd'
import useLyric from './use-lyric'
import useMiddleInteractive from './use-middle-interactive'
import useAnimation from './use-animation'
import usePlayHistory from './use-play-history'
import { useMainStore } from '~/stores/main'
import { formatTime } from '~/asstes/js/util'
import { PLAY_MODE } from '~/asstes/js/constant'
const mainStore = useMainStore()
let progressChanging = false

const audioRef = ref<HTMLAudioElement>()
const barRef = ref<InstanceType< typeof progressBar>>()
const songReady = ref(false)
const currentTime = ref(0)

const fullScreen = computed(() => mainStore.fullScreen)
const currentSong = computed(() => mainStore.currentSong)
const playing = computed(() => mainStore.playing)
const currentIndex = computed(() => mainStore.currentIndex)
const playMode = computed(() => mainStore.playMode)
const playlist = computed(() => mainStore.playlist)
const playIcon = computed(() => {
  return playing.value ? 'i-carbon:pause-outline' : 'i-carbon:play-outline'
})
const disableCls = computed(() => {
  return songReady.value ? '' : 'text-theme-d'
})
const progress = computed(() => {
  return currentTime.value / currentSong.value.duration
})

// hooks
const { cdCls, cdRef, cdImageRef } = useCd()
const { modeIcon, changeMode } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()
const {
  currentLyric,
  currentLineNum,
  playingLyric,
  lyricListRef,
  lyricScrollRef,
  playLyric,
  stopLyric,
} = useLyric({ songReady, currentTime })
const {
  currentShow,
  middleLStyle,
  middleRStyle,
  onMiddleTouchStart,
  onMiddleTouchMove,
  onMiddleTouchEnd,
} = useMiddleInteractive()
const { cdWrapperRef, enter, afterEnter, leave, afterLeave } = useAnimation()
const { savePlay } = usePlayHistory()

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
  playLyric() // 缓冲之后播放歌词
  savePlay(currentSong.value)
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

const updateTime = (e: Event) => {
  // 正在拖动进度的时候，防止currentTime被改
  if (!progressChanging)
    currentTime.value = (e.target as HTMLAudioElement).currentTime
}

const end = () => {
  currentTime.value = 0
  if (playMode.value === PLAY_MODE.loop)
    loop()
  else
    next()
}
const onProgressChanging = (progress: number) => {
  progressChanging = true
  currentTime.value = currentSong.value.duration * progress
  playLyric() // 拖动歌词的时候同步歌词位置 然后暂停歌词，等拖动完再播放歌词
  stopLyric()
}
const onProgressChanged = (progress: number) => {
  progressChanging = false
  audioRef.value!.currentTime = currentTime.value = currentSong.value.duration * progress
  if (!playing.value)
    mainStore.setPlayingState(true)

  playLyric()// 拖动完再播放歌词
}
// watch 切换歌曲
watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url)
    return
  currentTime.value = 0
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
  const audioEl = audioRef.value!
  if (newPlaying) {
    audioEl.play()
    playLyric() // 播放歌词
  }
  else {
    audioEl.pause()
    stopLyric() // 暂停歌词
  }
})
watch(fullScreen, async(newFullScreen) => {
  if (newFullScreen) {
    await nextTick()
    barRef.value!.setOffset(progress.value)
  }
})
</script>
<template>
  <div v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
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
          <div class="top" relative mb-25px>
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
          <div
            fixed w-full top-80px bottom-170px whitespace-nowrap text-0
            @touchstart.prevent="onMiddleTouchStart"
            @touchmove.prevent="onMiddleTouchMove"
            @touchend.prevent="onMiddleTouchEnd"
          >
            <div
              inline-block align-top relative w-full h-0 class="pt-4/5"
              :style="middleLStyle"
            >
              <div
                ref="cdWrapperRef"
                class="absolute left-1/10 top-0 w-4/5 box-border h-full"
              >
                <div ref="cdRef" class="w-full h-full rounded-1/2">
                  <img
                    ref="cdImageRef"
                    :src="currentSong.pic" alt="" absolute left-0 top-0 w-full h-full box-border b-10px
                    class="rounded-1/2 border-white/10"
                    :class="cdCls"
                  >
                </div>
              </div>
              <div
                class="w-4/5"
                mt-30px mb-0px mx-auto overflow-hidden text-center
              >
                <div h-20px lh-20px text="sm light-l">
                  {{ playingLyric }}
                </div>
              </div>
            </div>
            <scroll
              ref="lyricScrollRef"
              inline-block align-top w-full h-full
              overflow-hidden
              :style="middleRStyle"
            >
              <div
                class="4/5 my-0 mx-auto overflow-hidden text-center"
              >
                <div v-if="currentLyric" ref="lyricListRef">
                  <p
                    v-for="(line,index) in currentLyric.lines"
                    :key="line.time"
                    lh-32px text-sm
                    :class="[currentLineNum === index ? 'text-light-base':'text-light-l']"
                  >
                    {{ line.txt }}
                  </p>
                </div>
              </div>
            </scroll>
          </div>
          <div class="bottom" absolute bottom-50px w-full>
            <div text-center text-0>
              <span
                inline-block align-middle my-0 mx-4px h-8px
                class="rounded-1/2"
                :class="[currentShow ==='cd'? 'w-20px rounded-5px bg-light-ll':' w-8px bg-light-l']"
              />
              <span
                inline-block align-middle my-0 mx-4px h-8px
                class="rounded-1/2"
                :class="[currentShow==='lyric'? 'w-20px rounded-5px bg-light-ll':' w-8px bg-light-l']"
              />
            </div>
            <div flex items-center my-0px mx-auto py-10px px-0 class="w-4/5">
              <span inline-block dark:text-light-base text-dark-base text-xs lh-30px w-40px text-left class="flex-[0_0_40px]">
                {{ formatTime(currentTime) }}
              </span>
              <div flex-1>
                <progress-bar
                  ref="barRef"
                  :progress="progress"
                  @progress-changing="onProgressChanging"
                  @progress-changed="onProgressChanged"
                />
              </div>
              <span inline-block dark:text-light-base text-dark-base text-xs lh-30px w-40px text-right class="flex-[0_0_40px]">
                {{ formatTime(currentSong.duration) }}</span>
            </div>
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
    </transition>
    <mini-player
      :progress="progress"
      :toggle-play="togglePlay"
    />
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    />
  </div>
</template>
<style scoped>
.normal-enter-active , .normal-leave-active{
  transition: all .6s;
}
.normal-enter-active .bottom , .normal-leave-active  .bottom {
 transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
}
.normal-enter-active .top , .normal-leave-active .top {
 transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
}

.normal-enter-from, .normal-leave-to{
  opacity: 0;
}
.normal-enter-from .top, .normal-leave-to .top{
   transform: translate3d(0, -100px, 0);
}
.normal-enter-from .bottom, .normal-leave-to .bottom{
   transform: translate3d(0, 100px, 0)
}
</style>
