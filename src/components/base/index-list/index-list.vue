<script setup lang='ts'>
import { indexListProps } from './index-list'
import useFixed from './use-fixed'
import useShortcut from './use-shortcut'
import Scroll from '~/components/base/scroll/scroll.vue'
import type { Singer } from '~/service/singer.types'

const props = defineProps(indexListProps)
const emit = defineEmits<{
  (e: 'select', item: Singer): void
}>()

const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
const { shortcutList, onShortcutTouchStart, onShortcutTouchMove, scrollRef } = useShortcut(props, groupRef)

const onItemClick = (item: Singer) => {
  emit('select', item)
}
</script>
<template>
  <Scroll
    ref="scrollRef"
    :probe-type="3"
    relative w-full h-full overflow-hidden
    @scroll="onScroll"
  >
    <ul ref="groupRef">
      <li
        v-for="group in props.data"
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
            <img
              v-lazy="item.pic"
              class="rounded-1/2"
              w-50px h-50px inline-block
            >
            <span ml-20px dark:text-light-l text-sm>{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      v-show="fixedTitle"
      absolute top-0 left-0 w-full
      :style="fixedStyle"
    >
      <div
        h-30px lh-30px pl-20px text-sm dark:text-light-l
        dark:bg-dark-highlight-background bg-light-highlight-background
      >
        {{ fixedTitle }}
      </div>
    </div>
    <div
      absolute right-4px w-20px py-20px rounded-10px text-center
      bg-dark-background-d
      class="top-1/2 -translate-y-1/2"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          p-3px leading-none text-light-l text-sm
          :class="{'text-theme':currentIndex===index}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>
