<script setup lang='ts'>
import { getRecommend } from '~/service/recommend'
import type { Album, Recommend, Slider } from '~/service/recommend.type'
import Scroll from '~/components/base/scroll/scroll.vue'
const sliders = ref<Slider[] | null>(null)
const albums = ref<Album[] | null>(null)
const selectedAlbum = ref<Album|null>(null)
const selectItem = (item: Album) => {
  selectedAlbum.value = item
}

onMounted(async() => {
  const result = await getRecommend() as Recommend
  sliders.value = result.sliders
  albums.value = result.albums
})

</script>
<template>
  <div fixed w-full top-88px bottom-0 overflow-scroll>
    <Scroll h-full overflow-hidden>
      <div>
        <div relative w-full h-0 overflow-hidden class="pt-2/5">
          <div absolute left-0 top-0 w-full>
            <Slider
              v-if="sliders?.length"
              :sliders="sliders!"
            />
          </div>
        </div>
        <div>
          <h1 h-65px lh-65px text-center text-dark text-theme>
            热门歌单推荐
          </h1>
          <ul>
            <li
              v-for="item in albums" :key="item.id"
              flex
              items-center pt-0 pb-20px px-20px @click="selectItem(item)"
            >
              <div class="flex-[0_0_60px]" w-60px pr-20px>
                <img loading="lazy" width="60" height="60" :src="item.pic" alt="">
              </div>
              <div text-left flex flex-col justify-center flex-1 lh-20px overflow-hidden text-sm>
                <h2 mb-10px text-dark dark:text-light>
                  {{ item.username }}
                </h2>
                <p text-dark-d dark:text-light-d>
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>
