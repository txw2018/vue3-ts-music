<script setup lang='ts'>
import { getSingerDetail } from '~/service/singer'
import type { Singer, Song } from '~/service/singer.types'
import { processSongs } from '~/service/song'
import musicList from '~/components/music-list/music-list.vue'
import { singerStorage } from '~/composables/storage'
const props = defineProps<{
  singer: Singer
  id: string
}>()
const route = useRoute()
const router = useRouter()
const songs = ref<Song[]>([])
const loading = ref(true)
const computedSinger = computed(() => {
  let ret = null
  const singer = props.singer
  if (singer) {
    ret = singer
  }
  else {
    const cachedSinger = singerStorage.value
    if (cachedSinger && cachedSinger.mid === props.id)
      ret = cachedSinger
  }
  return ret
})
const pic = computed(() => {
  const singer = computedSinger.value
  return singer?.pic
})
const title = computed(() => {
  const singer = computedSinger.value
  return singer?.name
})

onMounted(async() => {
  if (!computedSinger.value) {
    const path = route.matched[0].path
    router.push({
      path,
    })
    return
  }

  const result = await getSingerDetail(computedSinger.value)
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
  </div>
</template>
