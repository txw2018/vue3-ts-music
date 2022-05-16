<script setup lang='ts'>
import { getSingerDetail } from '~/service/singer'
import type { Singer } from '~/service/singer.types'

const props = defineProps<{
  singer: Singer
}>()

onMounted(async() => {
  const result = await getSingerDetail(props.singer)
  console.log(result)
})
</script>
<template>
  <div fixed z-10 top-0 left-0 right-0 bottom-0 dark:bg-dark bg-light />
</template>

<style scoped lang='scss'>
</style>
