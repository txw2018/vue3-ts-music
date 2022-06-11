<script setup lang='ts'>
import type { SelectEmitType } from '~/components/base/song-list/song-list'
import scroll from '~/components/wrap-scroll/wrap-scroll.vue'
import { useMainStore } from '~/stores/main'

const router = useRouter()
const mainStore = useMainStore()

const currentIndex = ref(0)

const favoriteList = computed(() => mainStore.favoriteList)
const playHistory = computed(() => mainStore.playHistory)
const noResult = computed(() => {
  return currentIndex.value === 0 ? !favoriteList.value.length : !playHistory.value.length
})
// @ts-ignore
const noResultText = computed(() => {
  return currentIndex.value === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
})
const currentList = computed(() => {
  return currentIndex.value === 0 ? favoriteList.value : playHistory.value
})

const selectSong = ({ song }: SelectEmitType) => {
  mainStore.addSong(song)
}
const back = () => {
  router.back()
}
const random = () => {
  mainStore.randomPlay(currentList.value)
}
</script>
<script lang="ts">
export default{
  name:'user'
}
</script>
<template>
  <div
    v-no-result:[noResultText]="noResult"
    fixed top-0 bottom-0 z-100 w-full dark:bg-dark bg-light
  >
    <div absolute top-0 left-6px top-15px z-50 @click="back">
      <div w-30px text-theme i-carbon:arrow-left />
    </div>
    <div mt-10px mx-0 mb-30px>
      <switches
        v-model="currentIndex"
        :items="['我喜欢的', '最近播放']"
      />
    </div>
    <div
      v-if="currentList.length"
      box-border w-135px py-7px px-0 my-0 mx-auto text-center b-1px dark:border-dark-l border-light-l dark:text-dark-l text-light-l text="size-0" rounded-100px
      @click="random"
    >
      <i vertical-middle mr-6px text-sm class="icon-play" />
      <span inline-block vertical-middle text-sm>随机播放全部</span>
    </div>
    <div absolute top-110px bottom-0 w-full>
      <scroll v-if="currentIndex===0" h-full overflow-hidden>
        <div py-20px px-30px>
          <song-list
            :songs="favoriteList"
            @select="selectSong"
          />
        </div>
      </scroll>
      <scroll v-if="currentIndex===1" h-full overflow-hidden>
        <div py-20px px-30px>
          <song-list
            :songs="playHistory"
            @select="selectSong"
          />
        </div>
      </scroll>
    </div>
  </div>
</template>

