<script setup lang='ts'>
import type { ComponentPublicInstance } from 'vue'
import type scroll from '../base/scroll/scroll.vue'
import { Dialog } from '../base/dialog'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import { useMainStore } from '~/stores/main'
import type { Song } from '~/service/singer.types'
const mainStore = useMainStore()
const visible = ref(false)
const removing = ref(false)
const scrollRef = ref<InstanceType<typeof scroll>>()
const listRef = ref<ComponentPublicInstance<HTMLUListElement>>()
// const addSongRef = ref(null)

const playlist = computed(() => mainStore.playlist)
const sequenceList = computed(() => mainStore.sequenceList)
const currentSong = computed(() => mainStore.currentSong)

const { modeIcon, modeText, changeMode } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()
const getCurrentIcon = (song: Song) => {
  if (song.id === currentSong.value.id)
    return 'i-carbon:pause-outline'
}

const scrollToCurrent = () => {
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.value.id === song.id
  })
  if (index === -1)
    return
  const target = listRef.value!.$el.children[index]

  scrollRef.value?.scroll?.scrollToElement(target, 300, 0, 0)
}
const refreshScroll = () => {

}
const show = async() => {
  visible.value = true
  await nextTick()
  refreshScroll()
  scrollToCurrent()
}
const hide = () => {
  visible.value = false
}
const showConfirm = () => {
  Dialog.confirm({
    message: '是否清空播放列表？',
  }).then(() => {
    mainStore.clearSongList()
    hide()
  }).catch(() => {

  })
}
const selectItem = (song: Song) => {
  const index = playlist.value.findIndex((item) => {
    return song.id === item.id
  })
  mainStore.setCurrentIndex(index)
  mainStore.setPlayingState(true)
}
const removeSong = (song: Song) => {
  mainStore.removeSong(song)
}
const showAddSong = () => {

}

watch(currentSong, async(newSong) => {
  if (!visible.value || !newSong.id)
    return

  await nextTick()
  scrollToCurrent()
})

defineExpose({
  show,
})

</script>
<template>
  <teleport to="body">
    <transition name="list-fade">
      <div
        v-show="visible && playlist.length"
        fixed left-0 right-0 top-0 bottom-0 z-200 bg-dark-d
        @click="hide"
      >
        <div
          class="list-wrapper"
          fixed left-0 bottom-0 z-210 w-full bg-dark-highlight
          @click.stop
        >
          <div relative pt-20px pr-30px pb-10px pl-20px>
            <h1 flex="~ items-center">
              <div
                mr-10px text="size-16px theme-d"
                :class="modeIcon"
                @click="changeMode"
              />
              <span flex-1 text="sm light-l">{{ modeText }}</span>
              <span @click="showConfirm">
                <div class="i-carbon:trash-can " text="sm light-d" />
              </span>
            </h1>
          </div>
          <scroll
            ref="scrollRef"
            max-h-240px overflow-hidden
          >
            <transition-group
              ref="listRef"
              name="list"
              tag="ul"
            >
              <li
                v-for="song in sequenceList"
                :key="song.id"
                flex="~ items-center"
                h-40px py-0 pr-30px pl20px overflow-hidden
                @click="selectItem(song)"
              >
                <i
                  class="flex-[0_0_20px] w-20px" text="sm theme-d"
                  :class="getCurrentIcon(song)"
                />
                <span flex-1 no-wrap text="sm light-d">{{ song.name }}</span>
                <span mr-15px text="sm theme" @click.stop="toggleFavorite(song)">
                  <div :class="getFavoriteIcon(song)" />
                </span>
                <span
                  text="sm"
                  :class="[removing?'text-theme-d' :'text-theme']"
                  @click.stop="removeSong(song)"
                >
                  <div class="i-carbon:close" />
                </span>
              </li>
            </transition-group>
          </scroll>
          <div w-140px mt-20px mb-30px mx-auto>
            <div
              flex="~ items-center"
              py-8px px-16px b-1px border-light-l rounded-100px text-light-l
              @click="showAddSong"
            >
              <i class="icon-add" mr-5px text-xs />
              <span text-sm>添加歌曲到队列</span>
            </div>
          </div>
          <div text-center lh-50px bg-dark text="xm light-l" @click="hide">
            <span>关闭</span>
          </div>
        </div>
        <!-- <ConfirmCom
          v-model:show="isShow"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
          @confirm="confirmClear"
        /> -->
        <!-- <add-song ref="addSongRef" /> -->
      </div>
    </transition>
  </teleport>
</template>

<style scope >
.list-fade-enter-active, .list-fade-leave-active {
 transition: opacity 0.3s;
}
.list-fade-enter-active .list-wrapper , .list-fade-leave-active .list-wrapper {
 transition: all  0.3s;
}
.list-fade-enter-from, .list-fade-leave-to {
  opacity: 0;
}
.list-fade-enter-from  .list-wrapper, .list-fade-leave-to .list-wrapper {
  transform: translate3d(0, 100%, 0);
}
</style>
