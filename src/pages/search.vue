<script setup lang='ts'>
import Dialog from '~/components/base/dialog'
import type scroll from '~/components/base/scroll/scroll.vue'
import useSearchHistory from '~/components/search/use-search-history'
import { singerStorage } from '~/composables/storage'
import { getHotKeys } from '~/service/search'
import type { HotKey } from '~/service/search.types'
import type { Singer, Song } from '~/service/singer.types'
import { useMainStore } from '~/stores/main'
const mainStore = useMainStore()
const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()
const router = useRouter()
const query = ref('')
const hotKeys = ref<HotKey[]>([])
const selectedSinger = ref<Singer>()
const scrollRef = ref<InstanceType<typeof scroll>>()

const searchHistory = computed(() => mainStore.searchHistory)

const addQuery = (s: string) => {
  query.value = s.trim()
}
const cacheSinger = (singer: Singer) => {
  singerStorage.value = singer
}
const selectSinger = (singer: Singer) => {
  saveSearch(query.value)
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/search/${singer.mid}`,
  })
}
const selectSong = (song: Song) => {
  saveSearch(query.value)
  mainStore.addSong(song)
}
const showConfirm = () => {
  Dialog.confirm({
    message: '是否清空所有搜索历史',
    confirmBtnText: '清空',
  }).then(() => {
    clearSearch()
  }).catch(() => {

  })
}
const refreshScroll = () => {
  scrollRef.value!.scroll?.refresh()
}
watch(query, async(newQuery) => {
  if (!newQuery) {
    await nextTick
    refreshScroll()
  }
})

onMounted(async() => {
  const result = await getHotKeys()
  hotKeys.value = result!.hotKeys
})

</script>
<template>
  <div fixed w-full top-88px bottom-0 flex="~ col">
    <div m-20px>
      <search-input v-model="query" />
    </div>
    <scroll
      v-show="!query"
      ref="scrollRef"
      flex-1 overflow-hidden
    >
      <div>
        <div mt-0 mb-20px mx-20px>
          <h1 mb-20px text="sm light-l">
            热门搜索
          </h1>
          <ul>
            <li
              v-for="item in hotKeys"
              :key="item.id"
              inline-block py-5px px-10px mt-0 mr-20px mb-10px ml-0 rounded-6px bg-dark-highlight text="sm light-d"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div v-show="searchHistory.length" relative my-0 mx-20px>
          <h1 flex="~ items-center" h-40px text="sm light-l">
            <span flex-1>搜索历史</span>
            <span @click="showConfirm">
              <div text="sm light-d" class="i-carbon:trash-can" />
            </span>
          </h1>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          />
        </div>
      </div>
    </scroll>
    <div v-show="query" flex-1 overflow-hidden>
      <suggest
        :query="query"
        @select-singer="selectSinger"
        @select-song="selectSong"
      />
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>
