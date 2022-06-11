<script setup lang='ts'>
import { albumStorage } from '~/composables/storage'
import useDetailComponent from '~/composables/useDetailComponent'
import { getAlbum } from '~/service/recommend'
import type { Album } from '~/service/recommend.types'
const props = defineProps<{
  data: Album
  id: string
}>()
const { songs, title, pic, loading } = useDetailComponent(props, albumStorage, getAlbum)
</script>
<template>
  <div fixed z-10 top-0 bottom-0 left-0 right-0 dark:bg-dark bg-light>
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    />
  </div>
</template>
