<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>
<template>
  <div h-44px text-center text-0px>
    <div absolute top-0 left-0 w-70px h-44px text-20px flex items-center justify-around>
      <a
        class="icon-btn"
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/txw2018/vue3-ts-music"
        target="_blank"
        title="GitHub"
      />
      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </div>
    <span class="icon" inline-block align-top mt-6px w-30px h-32px mr-9px />
    <h1 inline-block align-top lh-44px text-22px text-theme text-xl>
      Chicken Musci
    </h1>
    <router-link absolute top-10px right-5px to="/user">
      <div text="xl theme" class="i-carbon:user" />
    </router-link>
  </div>
</template>
<style scoped>
.icon{
   background-size: 30px 32px;
   background-image: url('./logo@2x.png');
   image-rendering: -webkit-optimize-contrast;
   image-rendering: crisp-edges;
}
</style>
