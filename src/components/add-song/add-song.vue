<script setup lang='ts'>
import type { SelectEmitType } from '../base/song-list/song-list'
import type scroll from '../base/scroll/scroll.vue'
import useSearchHistory from '../search/use-search-history'
import type message from '../base/message/message.vue'
import type { Song } from '~/service/singer.types'
import { useMainStore } from '~/stores/main'

const mainStore = useMainStore()
const query = ref('')
const visible = ref(false)
const currentIndex = ref(0)
const scrollRef = ref<InstanceType<typeof scroll>>()
const messageRef = ref<InstanceType<typeof message>>()

const playHistory = computed(() => mainStore.playHistory)
const searchHistory = computed(() => mainStore.searchHistory)

const { saveSearch } = useSearchHistory()

const refreshScroll = () => {
  scrollRef.value!.scroll?.refresh()
}
const showMessage = () => {
  messageRef.value!.show()
}
const show = async() => {
  visible.value = true

  await nextTick()
  refreshScroll()
}

const hide = () => {
  visible.value = false
}
const addSong = (song: Song) => {
  mainStore.addSong(song)
  showMessage()
}
const selectSongSuggest = (song: Song) => {
  addSong(song)
  saveSearch(query.value)
}
const selectSongBySongList = ({ song }: SelectEmitType) => {
  addSong(song)
}
const addQuery = (s: string) => {
  query.value = s
}

watch(query, async() => {
  if (!query.value) {
    await nextTick()
    refreshScroll()
  }
})

defineExpose({
  show,
})
</script>
<template>
  <teleport to="body">
    <transition name="slide">
      <div
        v-show="visible"
        fixed top-0 bottom-0 w-full z-300 dark:bg-dark bg-light
      >
        <div relative h-44px text-center>
          <h1 lh-44px text="xl" dark:text-dark text-light>
            添加歌曲列表
          </h1>
          <div absolute top-0 right-8px @click="hide">
            <div
              w-44px h-44px
              p-12px text="size-20px theme"
              class="i-carbon:close"
            />
          </div>
        </div>
        <div m-20px>
          <search-input v-model="query" placeholder="搜索歌曲" />
        </div>
        <div v-show="!query">
          <switches v-model="currentIndex" :items="['最近播放','搜索历史']" />
          <div absolute top-165px bottom-0 w-full>
            <scroll
              v-if="currentIndex === 0"
              ref="scrollRef"
              h-full overflow-hidden
            >
              <div py-20px px-30px>
                <song-list
                  :songs="playHistory" @select="selectSongBySongList"
                />
              </div>
            </scroll>
            <scroll
              v-if="currentIndex === 1"
              ref="scrollRef"
              h-full overflow-hidden
            >
              <div py-20px px-30px>
                <search-list
                  :searches="searchHistory"
                  :show-delete="false"
                  @select="addQuery"
                />
              </div>
            </scroll>
          </div>
        </div>

        <div v-show="query" fixed top-124px bottom-0 w-full>
          <Suggest
            :query="query"
            :show-singer="false"
            @select-song="selectSongSuggest"
          />
        </div>
        <message ref="messageRef">
          <div flex justify-center py-18px px-0 text-0px>
            <div text="sm theme" class="i-carbon:checkmark" />
            <span text="sm light">1首歌曲已经添加到播放列表</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>
