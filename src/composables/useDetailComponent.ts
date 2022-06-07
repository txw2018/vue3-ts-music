import type { Ref } from 'vue'
import type { PromiseFn } from '~/asstes/js/basic'
import type { Song, SongResult } from '~/service/singer.types'
import { processSongs } from '~/service/song'
interface Props {
  data: Record<string, any>
  id: string
}

export default function useDetailComponent(props: Props, storage: Ref<any>, fetch: PromiseFn<SongResult>) {
  const route = useRoute()
  const router = useRouter()
  const songs = ref<Song[]>([])
  const loading = ref(true)
  const computedData = computed(() => {
    let ret = null
    const data = props.data
    if (data) {
      ret = data
    }
    else {
      const cached = storage.value
      if (cached && (cached.mid || `${cached.id}`) === props.id)
        ret = cached
    }
    return ret
  })
  const pic = computed(() => {
    const singer = computedData.value
    return singer?.pic
  })
  const title = computed(() => {
    const singer = computedData.value
    return singer?.name || singer?.title
  })

  onMounted(async() => {
    if (!computedData.value) {
      const path = route.matched[0].path
      router.push({
        path,
      })
      return
    }

    const result = await fetch(computedData.value)
    songs.value = await processSongs(result!.songs)
    loading.value = false
  })

  return {
    songs,
    pic,
    title,
    loading,
  }
}
