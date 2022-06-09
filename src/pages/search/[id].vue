<script setup lang='ts'>
import { getSingerDetail } from '~/service/singer'
import type { Singer } from '~/service/singer.types'
import musicList from '~/components/music-list/music-list.vue'
import { singerStorage } from '~/composables/storage'
import useDetailComponent from '~/composables/useDetailComponent'
const props = defineProps<{
  data: Singer
  id: string
}>()
const { songs, title, pic, loading } = useDetailComponent(props, singerStorage, getSingerDetail)
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
