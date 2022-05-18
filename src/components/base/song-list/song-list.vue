<script setup lang='ts'>
import type { PropType } from 'vue'
import type { Song } from '~/service/singer.types'

defineProps({
  songs: {
    type: Array as PropType<Song[]>,
    default: () => [],
  },
  rank: Boolean,
})
const emit = defineEmits<{
  (e: 'select', val: {}): void
}>()

const selectItem = (song: Song, index: number) => {
  emit('select', { song, index })
}

const getRankCls = (index: number) => {
  if (index <= 2)
    return `icon icon${index}`

  else
    return 'text-theme text-sm'
}
const getRankText = (index: number) => {
  if (index > 2)
    return index + 1
}
const getDesc = (song: Song) => {
  return `${song.singer}·${song.album}`
}

</script>
<template>
  <ul>
    <li
      v-for="(song, index) in songs"
      :key="song.id"
      flex
      items-center box-border h-64px text-xl
      @click="selectItem(song, index)"
    >
      <div
        v-if="rank"
        w-25px mr-20px
        text-center
        class="flex-[0_0_25px]"
      >
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
      </div>
      <div flex-1 lh-20px overflow-hidden>
        <h2
          text-dark dark:text-light text-ellipsis overflow-hidden whitespace-nowrap text-sm
        >
          {{ song.name }}
        </h2>
        <p
          text-ellipsis overflow-hidden whitespace-nowrap mt-4px text-14px text-dark-d dark:text-light-d
        >
          {{ getDesc(song) }}
        </p>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.icon{
    display: inline-block;
    width: 25px;
    height: 24px;
    background-size: 25px 24px;
}
.icon0{
    background-image: url('./first@2x.png');
}
.icon1{
    background-image: url('./second@2x.png');
}
.icon2{
    background-image: url('./third@2x.png');
}
</style>
