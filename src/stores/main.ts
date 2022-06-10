import { acceptHMRUpdate, defineStore } from 'pinia'
import { PLAY_MODE } from '~/asstes/js/constant'
import { shuffle } from '~/asstes/js/util'
import { searchHistoryStorage } from '~/composables/storage'
import type { Song } from '~/service/singer.types'

export const useMainStore = defineStore('main', () => {
  // state
  const sequenceList = ref<Song[]>([]) // 歌曲列表
  const playlist = ref<Song[]>([]) // 播放列表
  const playing = ref<boolean>(false) // 播放状态
  const playMode = ref<PLAY_MODE>(PLAY_MODE.sequence)// 播放状态
  const currentIndex = ref<number>(0) // 当前播放歌曲索引
  const fullScreen = ref<boolean>(false)// 播放模式 全局 or 收缩
  const favoriteList = ref<Song[]>([]) // 收藏列表
  const searchHistory = ref<string[]>(searchHistoryStorage.value)
  const playHistory = ref<Song[]>([]) // 播放历史列表

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
  const setSearchHistory = (searches: string[]) => {
    searchHistory.value = searches
  }
  const setPlayHistory = (songs: Song[]) => {
    playHistory.value = songs
  }

  const findIndex = (list: Song[], song: Song) => {
    return list.findIndex((item) => {
      return item.id === song.id
    })
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

  const removeSong = (song: Song) => {
    const sequenceListVal = sequenceList.value.slice()
    const playlistVal = playlist.value.slice()
    const sequenceIndex = findIndex(sequenceListVal, song)
    const playIndex = findIndex(playlistVal, song)
    if (sequenceIndex < 0 || playIndex < 0)
      return

    sequenceListVal.splice(sequenceIndex, 1)
    playlistVal.splice(playIndex, 1)

    let currentIndexVal = currentIndex.value
    if (playIndex < currentIndexVal || currentIndexVal === playlistVal.length)
      --currentIndexVal

    setSequenceList(sequenceListVal)
    setPlaylist(playlistVal)
    setCurrentIndex(currentIndexVal)

    if (!playlist.value.length)
      setPlayingState(false)
  }

  const clearSongList = () => {
    setSequenceList([])
    setPlaylist([])
    setCurrentIndex(0)
    setPlayingState(false)
  }

  const addSong = (song: Song) => {
    const playlistVal = playlist.value.slice()
    const sequenceListVal = sequenceList.value.slice()
    let currentIndexVal = currentIndex.value
    const playIndex = findIndex(playlistVal, song)
    if (playIndex > -1) {
      currentIndexVal = playIndex
    }
    else {
      playlistVal.push(song)
      currentIndexVal = playlistVal.length - 1
    }
    const sequenceIndex = findIndex(sequenceListVal, song)
    if (sequenceIndex === -1)
      sequenceListVal.push(song)

    setSequenceList(sequenceListVal)
    setPlaylist(playlistVal)
    setCurrentIndex(currentIndexVal)
    setPlayingState(true)
    setFullScreen(true)
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
    searchHistory,
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
    setSearchHistory,
    setPlayHistory,
    // action
    selectPlay,
    randomPlay,
    changeMode,
    removeSong,
    clearSongList,
    addSong,

  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
