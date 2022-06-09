import { remove, save } from '~/asstes/js/array-store'
import { searchHistoryStorage } from '~/composables/storage'
import { useMainStore } from '~/stores/main'

export default function useSearchHistory() {
  const maxLen = 200
  const mainStore = useMainStore()

  const saveSearch = (query: string) => {
    const searches = save(query, searchHistoryStorage, (item) => {
      return item === query
    }, maxLen)
    mainStore.setSearchHistory(searches)
  }

  const deleteSearch = (query: string) => {
    const searches = remove(searchHistoryStorage, (item) => {
      return item === query
    })
    mainStore.setSearchHistory(searches)
  }

  const clearSearch = () => {
    searchHistoryStorage.value = []
    mainStore.setSearchHistory([])
  }
  return {
    saveSearch,
    deleteSearch,
    clearSearch,
  }
}
