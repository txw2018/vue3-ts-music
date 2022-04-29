<script setup lang='ts'>
import { getRecommend } from '~/service/recommend'

onMounted(async() => {
  const result = await getRecommend()
  console.log(result)
})

</script>
<template>
  推荐
</template>

<style scoped >
</style>
