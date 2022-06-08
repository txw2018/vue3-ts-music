<script setup lang='ts'>
import { search } from '~/service/search'
import type { Singer, Song } from '~/service/singer.types'
import { processSongs } from '~/service/song'

const props = defineProps({
  query: String,
  showSinger: {
    type: Boolean,
    default: true,
  },
})
const singer = ref<Singer>()
const songs = ref<Song[]>([])
const hasMore = ref(true)
const page = ref(1)
const loadingText = ref('')
const noResultText = ref('抱歉，暂无搜索结果')
const manualLoading = ref(false)
const loading = computed(() => {
  return !singer.value && !songs.value.length
})

const noResult = computed(() => {
  return !singer.value && !songs.value.length && !hasMore.value
})
const pullUpLoading = () => {}

const selectSinger = (singer: Singer) => {

}
const selectSong = (song: Song) => {

}
const searchFirst = async() => {
  if (!props.query)
    return

  page.value = 1
  songs.value = []
  singer.value = undefined
  hasMore.value = true
  const result = await search(props.query, page.value, props.showSinger)
  songs.value = await processSongs(result!.songs)
  singer.value = result!.singer
  hasMore.value = result!.hasMore
}
watch(() => props.query, async(newQuery) => {
  if (!newQuery)
    return

  await searchFirst()
})

</script>
<template>
  <div
    ref="rootRef"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
    h-full overflow-hidden
  >
    <ul py-0 px-30px>
      <li
        v-if="singer"
        flex items-center pb-20px
        @click="selectSinger(singer!)"
      >
        <div class="flex-[0_0_30px] w-30px">
          <i class="icon-mine" />
        </div>
        <div flex-1 text="sm light-d" overflow-hidden>
          <p no-wrap>
            {{ singer.name }}
          </p>
        </div>
      </li>
      <li
        v-for="song in songs"
        :key="song.id"
        flex items-center pb-20px
        @click="selectSong(song)"
      >
        <div class="flex-[0_0_30px] w-30px">
          <i class="icon-music" />
        </div>
        <div flex-1 text="sm light-d" overflow-hidden>
          <p no-wrap>
            {{ song.singer }}-{{ song.name }}
          </p>
        </div>
      </li>
      <div
        v-loading:[loadingText]="pullUpLoading"
        flex items-center pb-20px
      />
    </ul>
  </div>
</template>
