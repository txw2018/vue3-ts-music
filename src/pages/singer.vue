<script setup lang='ts'>
import { getSingerList } from '~/service/singer'
import indexList from '~/components/base/index-list/index-list.vue'
import type { SingerList } from '~/service/singer.types'

const singers = ref<SingerList[]>([])

const loading = computed(() => singers.value.length === 0)
onMounted(async() => {
  const result = await getSingerList()
  singers.value = result?.singers ?? []
})
</script>
<template>
  <div v-loading="loading" fixed w-full top-88px bottom-0>
    <index-list :data="singers" />
  </div>
</template>

<style scoped>
</style>
