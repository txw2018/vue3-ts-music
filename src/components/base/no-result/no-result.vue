<script setup lang='ts'>

const title = ref('抱歉，没有结果')

const setTitle = (val: string) => {
  title.value = val
}

defineExpose({
  setTitle,
})
</script>
<template>
  <div absolute class="top-1/2 left-1/2 translate-z-0 -translate-x-1/2 -translate-y-1/2">
    <div text-center>
      <div
        w-86px h-90px my-0 mx-auto
        class="bg-[length:86px_90px] bg-image"
      />
      <p class="text" mt-30px text-sm dark:text-light-d text-dark-d>
        {{ title }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.bg-image{
  background-image: url('./no-result@2x.png');
}
</style>
