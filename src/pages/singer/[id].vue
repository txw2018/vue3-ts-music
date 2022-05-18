<script setup lang='ts'>
import { getSingerDetail } from '~/service/singer'
import type { Singer, Song } from '~/service/singer.types'
import { processSongs } from '~/service/song'
import musicList from '~/components/music-list/music-list.vue'
const props = defineProps<{
  singer: Singer
}>()
const songs = ref<Song[]>([])
const loading = ref(true)
const pic = computed(() => props.singer.pic)
const title = computed(() => props.singer.name)

onMounted(async() => {
  const result = await getSingerDetail(props.singer)
  songs.value = await processSongs(result!.songs)
  loading.value = false
})

</script>
<template>
  <div
    fixed z-10 top-0 left-0 right-0 bottom-0 dark:bg-dark bg-light
  >
    <music-list
      :title="title"
      :pic="pic"
      :songs="songs"
      :loading="loading"
    />
  </div>>
</template>
