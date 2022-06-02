import type { ExtractPropTypes, PropType } from 'vue'
import type { SingerList } from '~/service/singer.types'

export const indexListProps = {
  data: {
    type: Array as PropType<SingerList[]>,
    default: [],
  },
}
export type IndexListProps = ExtractPropTypes<typeof indexListProps>
