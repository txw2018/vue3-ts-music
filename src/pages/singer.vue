<script setup lang='ts'>
import { getSingerList } from '~/service/singer'
import indexList from '~/components/base/index-list/index-list.vue'
import type { Singer, SingerList } from '~/service/singer.types'
const router = useRouter()
const singers = ref<SingerList[]>([])
const selectedSinger = ref<Singer | null>(null)

const loading = computed(() => singers.value.length === 0)

const selectSinger = (singer: Singer) => {
  selectedSinger.value = singer
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
    <router-view :singer="selectedSinger" />
  </div>
</template>

<style scoped>
</style>
