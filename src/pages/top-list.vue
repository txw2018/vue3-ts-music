<script setup lang='ts'>
import { topListStorage } from '~/composables/storage'
import { getTopList } from '~/service/top-list'
import type { TopList } from '~/service/top-list.types'
const router = useRouter()
const loading = ref(true)
const topList = ref<TopList[]>([])
const selectedTop = ref<TopList>()

const cacheTop = (top: TopList) => {
  topListStorage.value = top
}
const selectItem = (item: TopList) => {
  selectedTop.value = item
  cacheTop(item)
  router.push({
    path: `/top-list/${item.id}`,
  })
}
onMounted(async() => {
  const result = await getTopList()
  topList.value = result!.topList
  loading.value = false
})

</script>
<template>
  <div v-loading="loading" fixed w-full top-88px bottom-0>
    <scroll h-full overflow-hidden>
      <ul>
        <li
          v-for="item in topList"
          :key="item.id"
          flex my-0 mx-20px pt-20px h-100px box-content
          last:pb-20px
          @click="selectItem(item)"
        >
          <div class="flex-[0_0_100px] w-100px h-100px">
            <img
              v-lazy="item.pic"
              inline-block
              width="100"
              height="100"
            >
          </div>
          <ul flex-1 flex="~ col " justify-center py-0 px-20px h-100px overflow-hidden dark:bg-dark-highlight bg-light-highlight  text-xs dark:text-dark-d  text-light-d>
            <li
              v-for="(song, index) in item.songList"
              :key="song.id"
              no-wrap lh-26px
            >
              <span>{{ index + 1 }}. </span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>
