<script lang="ts">
export default {
  name: 'Loading',
}
</script>
<script setup lang='ts'>

const title = ref('正在加载中...')
const setTitle = (val: string) => {
  title.value = val
}

defineExpose({
  setTitle,
})

</script>
<template>
  <div absolute class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-0">
    <div text-center>
      <img inline-block width="24" height="24" src="./loading.gif">
      <p lh-20px text-xs text-light-l>
        {{ title }}
      </p>
    </div>
  </div>
</template>
