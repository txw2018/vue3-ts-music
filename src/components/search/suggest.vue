<script setup lang='ts'>
   const singer = ref(null)
  const songs = ref([])
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

  const selectSinger = () =>{

  }
  const selectSong = () => {

  }
</script>
<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-if="singer"
        @click="selectSinger(singer)"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{song.singer}}-{{song.name}}
          </p>
        </div>
      </li>
      <div
        class="suggest-item"
        v-loading:[loadingText]="pullUpLoading"
      ></div>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
</style>