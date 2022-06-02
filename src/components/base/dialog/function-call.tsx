import { createApp, getCurrentInstance } from 'vue'
import type{ App, ComponentPublicInstance } from 'vue'
import DialogVue from './dialog.vue'
import type { DialogAction, DialogProps } from './dialog'
let instance: ComponentPublicInstance<{}, any>

function initInstance() {
  const Wrapper = {
    setup() {
      const state = reactive<{
        show: boolean
        [key: string]: any
      }>({
        show: false,
      })
      const toggle = (show: boolean) => {
        state.show = show
      }
      const open = (props: Record<string, any>) => {
        Object.assign(state, props)

        toggle(true)
      }
      const close = () => toggle(false)

      const wrapperInstance = getCurrentInstance()!
      Object.assign(wrapperInstance.proxy, {
        open,
        close,
      })
      // eslint-disable-next-line react/display-name
      return () => <DialogVue {...state} onUpdate:show={toggle}/>
    },
  }
  const app = createApp(Wrapper)
  const root = document.createElement('div')
  document.body.appendChild(root)
  instance = app.mount(root)
}

function Dialog(options: DialogProps) {
  return new Promise((resolve, reject) => {
    if (!instance)
      initInstance()

    instance.open(Object.assign({}, options, {
      callback: (action: DialogAction) => {
        (action === 'confirm' ? resolve : reject)(action)
      },
    }))
  })
}
Dialog.alert = Dialog

Dialog.confirm = (options: DialogProps) => {
  return Dialog(Object.assign({ showCancelButton: true }, options))
}
Dialog.close = () => {
  if (instance)
    instance.close()
}
Dialog.Component = DialogVue

Dialog.install = (app: App) => {
  app.component('Dialog', DialogVue)
  app.config.globalProperties.$dialog = Dialog
}

export {
  Dialog,
}
