<script setup lang="ts">
import { useMainStore } from './stores/main'

const mainStore = useMainStore()

const playlist = computed(() => mainStore.playlist)
const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : '0'
  return {
    bottom,
  }
})
</script>
<template>
  <main font-sans>
    <Header />
    <Tab />
    <router-view :style="viewStyle" />
    <player />
  </main>
</template>
