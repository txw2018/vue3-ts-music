import type { ExtractPropTypes, PropType } from 'vue'
export type DialogAction = 'confirm' | 'cancel'
export const dialogProps = {
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
  confirmBtnText: {
    type: String,
    default: '确定',
  },
  cancelBtnText: {
    type: String,
    default: '取消',
  },
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  callback: Function as PropType<(action?: DialogAction) => void>,
}
export type DialogProps = Partial<ExtractPropTypes<typeof dialogProps>>
