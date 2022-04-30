import type{ ExtractPropTypes } from 'vue'
import { isNumber } from '@vueuse/core'
export const scrollProps = {
  click: {
    type: Boolean,
    default: true,
  },
  probeType: {
    type: Number,
    default: 0,
  },
}
export type ScrollProps = ExtractPropTypes<typeof scrollProps>

export const scrollEmits = {
  scroll: (pos: number) => isNumber(pos),
}

export type ScrollEmits = typeof scrollEmits
