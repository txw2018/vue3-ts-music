<script setup lang='ts'>
import Scroll from '~/components/base/scroll/scroll.vue'
import type { Singer, SingerList } from '~/service/singer.types'

const { data } = defineProps<{
  data: SingerList[]
}>()

const onScroll = () => {

}

const onItemClick = (item: Singer) => {

}
</script>
<template>
  <Scroll
    ref="scrollRef"
    :probe-type="3"
    relative w-full h-full overflow-hidden bg-light dark:bg-dark
    @scroll="onScroll"
  >
    <ul ref="groupRef">
      <li
        v-for="group in data"
        :key="group.title"
        pb-30px
      >
        <h2 h-30px lh-30px pl-20px text-sm dark:text-light-l dark:bg-dark-highlight-background bg-light-highlight-background>
          {{ group.title }}
        </h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            flex items-center pt-20px pr-0 pb-0 pl-30px
            @click="onItemClick(item)"
          >
            <img v-lazy="item.pic" w-50px h-50px class="rounded-1/2" inline-block>
            <span ml-20px dark:text-light-l text-sm>{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<style scoped lang='scss'>
</style>
