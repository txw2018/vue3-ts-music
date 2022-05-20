<script setup lang='ts'>
import type { PropType } from 'vue'
import Scroll from '../base/scroll/scroll.vue'
import SongList from '../base/song-list/song-list.vue'
import type { Pos } from '../base/scroll/scroll'
import type { Song } from '~/service/singer.types'
import { useMainStore } from '~/stores/main'

const RESERVED_HEIGHT = 40
const props = defineProps({
  songs: {
    type: Array as PropType<Song[]>,
    default() {
      return []
    },
  },
  title: String,
  pic: String,
  loading: Boolean,
  noResultText: {
    type: String,
    default: '抱歉，没有找到可播放的歌曲',
  },
  rank: Boolean,
})
const mainStore = useMainStore()
const router = useRouter()
const bgImage = ref<HTMLDivElement | null>(null)
const scrollY = ref(0)
const maxTranslateY = ref(0)
const imageHeight = ref(0)

const bgImageStyle = computed(() => {
  let zIndex = 0
  let paddingTop: string|number = '70%'
  let height: string|number = 0
  let translateZ = 0
  const scrollYVal = scrollY.value
  const maxTranslateYVal = maxTranslateY.value
  const imageHeightVal = imageHeight.value

  if (scrollYVal > maxTranslateYVal) {
    zIndex = 10
    paddingTop = 0
    height = `${RESERVED_HEIGHT}px`
    translateZ = 1
  }
  // 下拉滚动值少于0，放大图片
  let scale = 1
  if (scrollYVal < 0)
    scale = 1 + Math.abs(scrollYVal / imageHeightVal)

  return {
    zIndex,
    paddingTop,
    height,
    backgroundImage: `url(${props.pic})`,
    transform: `scale(${scale})translateZ(${translateZ}px)`,
  }
})
const playBtnStyle = computed(() => {
  let display = ''
  if (scrollY.value >= maxTranslateY.value)
    display = 'none'

  return {
    display,
  }
})
const filterStyle = computed(() => {
  let blur = 0
  const scrollYVal = scrollY.value
  const imageHeightVal = imageHeight.value
  const maxTranslateYVal = imageHeight.value
  if (scrollYVal >= 0)
    blur = Math.min(maxTranslateYVal / imageHeightVal, scrollYVal / imageHeightVal) * 20

  return {
    backdropFilter: `blur(${blur}px)`,
  }
})
const scrollStyle = computed(() => {
  return {
    top: `${imageHeight.value}px`,

  }
})
const noResult = computed(() => !props.loading && !props.songs.length)

const onScroll = (pos: Pos) => {
  scrollY.value = -pos.y
}
const goBack = () => {
  router.back()
}

const random = () => {
  mainStore.randomPlay(props.songs)
}
const selectItem = ({ song, index }: { song: Song; index: number }) => {
  mainStore.selectPlay({ list: props.songs, index })
}

onMounted(() => {
  imageHeight.value = bgImage.value!.clientHeight
  maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
})
</script>
<template>
  <div relative h-full>
    <div
      absolute top-10px left-6px z-20 translate-z-2px
      @click="goBack"
    >
      <i block p-10px text-theme i-carbon:arrow-left />
    </div>
    <h1
      absolute top-0 z-20 translate-z-2px text-center lh-40px text-xl text-base text-light
      class="left-1/10 w-4/5"
    >
      {{ title }}
    </h1>
    <div
      ref="bgImage"
      relative w-full origin-top bg-cover
      :style="bgImageStyle"
    >
      <div
        absolute bottom-20px z-10 w-full
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          box-border w-135px py-7px px-0 my-0 mx-auto text-center border-1px border-solid border-theme text-theme rounded-100px text-0px
          @click="random"
        >
          <i inline-block align-middle mr-6px text-sm class="i-carbon:play-outline" />
          <span inline-block align-middle text-sm>
            随机播放全部
          </span>
        </div>
      </div>
      <div
        absolute top-0 left-0 w-full h-full
        style=" background: rgba(7, 17, 27, 0.4);" :style="filterStyle"
      />
    </div>
    <scroll
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      absolute bottom-0 w-full
      z-0
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div
        py-20px px-30px dark:bg-dark bg-light
      >
        <song-list :songs="songs" @select="selectItem" />
      </div>
    </scroll>
  </div>
</template>
