<script setup lang="ts">
import { useMainStore } from './stores/main'
import { favoriteStorage, playHistoryStorage } from './composables/storage'
import { processSongs } from './service/song'


const mainStore = useMainStore()

const playlist = computed(() => mainStore.playlist)
const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : '0'
  return {
    bottom,
  }
})
onMounted(() => {
  const favoriteSongs = favoriteStorage.value
  if (favoriteSongs.length > 0) {
    processSongs(favoriteSongs).then((songs) => {
      mainStore.setFavoriteList(songs)
      favoriteStorage.value = songs
    })
  }
  const historySongs = playHistoryStorage.value
  if (historySongs.length > 0) {
    processSongs(historySongs).then((songs) => {
      mainStore.setPlayHistory(songs)
      playHistoryStorage.value = songs
    })
  }
})
</script>
<template>
  <main font-sans>
    <Header />
    <Tab />
    <router-view
      :style="viewStyle"
      v-slot="{ Component,route }"
    >
      <template v-if="route.name ==='user'">
        <transition  appear name="slide">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </template>
      <template  v-else>
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </template>
    </router-view>
    <player />
  </main>
</template>
