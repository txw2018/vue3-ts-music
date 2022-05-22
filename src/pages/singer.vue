<script setup lang='ts'>
import { getSingerList } from '~/service/singer'
import indexList from '~/components/base/index-list/index-list.vue'
import type { Singer, SingerList } from '~/service/singer.types'
import { singerStorage } from '~/composables/storage'
const router = useRouter()
const singers = ref<SingerList[]>([])
const selectedSinger = ref<Singer | null>(null)

const loading = computed(() => singers.value.length === 0)
const cacheSinger = (singer: Singer) => {
  singerStorage.value = singer
}
const selectSinger = (singer: Singer) => {
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/singer/${singer.mid}`,
  })
}

onMounted(async() => {
  const result = await getSingerList()
  singers.value = result?.singers ?? []
})
</script>
<template>
  <div v-loading="loading" fixed w-full top-88px bottom-0>
    <index-list :data="singers" @select="selectSinger" />
    <router-view v-slot="{Component}">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>
