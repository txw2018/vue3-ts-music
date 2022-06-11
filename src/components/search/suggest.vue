<script setup lang='ts'>
import usePullUpLoad from './use-pull-up-load'
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
const emit = defineEmits<{
  (e: 'select-song', val: Song): void
  (e: 'select-singer', val: Singer): void
}>()
const singer = ref<Singer>()
const songs = ref<Song[]>([])
const hasMore = ref(true)
const page = ref(1)
// @ts-ignore
const loadingText = ref('')
// @ts-ignore
const noResultText = ref('抱歉，暂无搜索结果')
const manualLoading = ref(false)
const loading = computed(() => {
  return !singer.value && !songs.value.length
})

const noResult = computed(() => {
  return !singer.value && !songs.value.length && !hasMore.value
})
const preventPullUpLoad = computed(() => {
  return loading.value || manualLoading.value
})
const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(searchMore, preventPullUpLoad)

const selectSinger = (singer: Singer) => {
  emit('select-singer', singer)
}
const selectSong = (song: Song) => {
  emit('select-song', song)
}
async function makeItScrollable() {
  if (scroll.value!.maxScrollY >= -1) {
    manualLoading.value = true
    await searchMore()
    manualLoading.value = false
  }
}
async function searchFirst() {
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
  await nextTick()
  await makeItScrollable()
}

async function searchMore() {
  if (!hasMore.value || !props.query)
    return

  page.value++
  const result = await search(props.query, page.value, props.showSinger)
  songs.value = songs.value.concat(await processSongs(result!.songs))
  hasMore.value = result!.hasMore
  await nextTick()
  await makeItScrollable()
}

const pullUpLoading = computed(() => {
  return isPullUpLoad.value && hasMore.value
})
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
        <div class="flex-[0_0_30px] w-30px text-light-d">
          <div class="i-carbon:user" />
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
        <div class="flex-[0_0_30px] w-30px dark:text-dark-d text-light-d">
          <div class="i-carbon:music" />
        </div>
        <div flex-1 text-sm dark:text-dark-d text-light-d  overflow-hidden>
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
