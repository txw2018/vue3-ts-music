import type{ ExtractPropTypes } from 'vue'
import { isObject } from '@vueuse/core'
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
  scroll: (pos: { x: number; y: number }) => isObject(pos),
}

export type ScrollEmits = typeof scrollEmits

export interface Pos {
  x: number
  y: number
}
