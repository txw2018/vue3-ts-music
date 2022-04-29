<script setup lang='ts'>
const tabs = reactive([
  {
    name: '推荐',
    path: '/recommend',
  },
  {
    name: '歌手',
    path: '/singer',
  },
  {
    name: '排行',
    path: '/top-list',
  },
  {
    name: '搜索',
    path: '/search',
  },
])
</script>
<template>
  <div flex h-44px lh-44px text-sm>
    <router-link
      v-for="tab in tabs" v-slot="{isActive }"
      :key="tab.path"
      :to="tab.path"
      flex-1 text-center
    >
      <span
        :class="[isActive ? 'text-theme':'text-dark dark:text-light']"
        pb-5px
      >{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<style scoped >
.dddd{
  color: red!important;
}
</style>
