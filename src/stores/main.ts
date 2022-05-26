import { acceptHMRUpdate, defineStore } from 'pinia'
import { PLAY_MODE } from '~/asstes/js/constant'
import { shuffle } from '~/asstes/js/util'
import { favoriteStorage } from '~/composables/storage'
import type { Song } from '~/service/singer.types'

export const useMainStore = defineStore('main', () => {
  // state
  const sequenceList = ref<Song[]>([]) // 歌曲列表
  const playlist = ref<Song[]>([]) // 播放列表
  const playing = ref<boolean>(false) // 播放状态
  const playMode = ref<PLAY_MODE>(PLAY_MODE.sequence)// 播放状态
  const currentIndex = ref<number>(0) // 当前播放歌曲索引
  const fullScreen = ref<boolean>(false)// 播放模式 全局 or 收缩
  const favoriteList = ref<Song[]>(favoriteStorage.value || []) // 收藏列表
  const playHistory = ref<Song[]>([])// 播放历史列表

  // getters
  const currentSong = computed(() => playlist.value[currentIndex.value] || {})
  // mutation
  const setPlayingState = (playingVal: boolean) => playing.value = playingVal
  const setSequenceList = (list: Song[]) => sequenceList.value = list
  const setPlaylist = (list: Song[]) => playlist.value = list
  const setPlayMode = (mode: PLAY_MODE) => playMode.value = mode
  const setCurrentIndex = (index: number) => currentIndex.value = index
  const setFullScreen = (fullScreenVal: boolean) => fullScreen.value = fullScreenVal
  const setFavoriteList = (list: Song[]) => { favoriteList.value = list }

  const addSongLyric = (song: Song, lyric: string) => {
    for (const item of sequenceList.value) {
      if (item.mid === song.mid) {
        item.lyric = lyric
        return
      }
    }
  }

  // action
  const selectPlay = ({ list, index }: { list: Song[]; index: number }) => {
    setPlayMode(PLAY_MODE.sequence)
    setSequenceList(list)
    setPlayingState(true)
    setFullScreen(true)
    setPlaylist(list)
    setCurrentIndex(index)
  }

  const randomPlay = (list: Song[]) => {
    setPlayMode(PLAY_MODE.random)
    setSequenceList(list)
    setPlayingState(true)
    setFullScreen(true)
    setPlaylist(shuffle(list))
    setCurrentIndex(0)
  }

  const changeMode = (mode: PLAY_MODE) => {
    const currentId = currentSong.value.id
    if (mode === PLAY_MODE.random)
      setPlaylist(shuffle(sequenceList.value))
    else
      setPlaylist(sequenceList.value)

    const index = playlist.value.findIndex((song) => {
      return song.id === currentId
    })
    setCurrentIndex(index)
    setPlayMode(mode)
  }

  return {
    // state
    sequenceList,
    playlist,
    playing,
    playMode,
    currentIndex,
    fullScreen,
    favoriteList,
    playHistory,
    // getter
    currentSong,
    // mutation
    setPlayingState,
    setSequenceList,
    setPlaylist,
    setPlayMode,
    setCurrentIndex,
    setFullScreen,
    setFavoriteList,
    addSongLyric,
    // action
    selectPlay,
    randomPlay,
    changeMode,

  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
