import { createApp } from 'vue'

import type {
  DirectiveBinding,
  ObjectDirective,
} from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '~/asstes/js/dom'
const relativeCls = 'g-relative'

type LoadingType = InstanceType<typeof Loading>

declare interface LoadingEl extends HTMLElement {
  instance?: LoadingType
}
const loadingDirective: ObjectDirective = {
  mounted(el: LoadingEl, binding: DirectiveBinding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div')) as LoadingType
    el.instance = instance
    const title = binding.arg
    if (title)
      instance.setTitle(title)

    if (binding.value)
      append(el)
  },
  updated(el, binding) {
    const title = binding.arg
    if (title)
      el.instance.setTitle(title)
    if (binding.value !== binding.oldValue)
      binding.value ? append(el) : remove(el)
  },

}

function append(el: LoadingEl) {
  const style = getComputedStyle(el)
  if (!['fixed', 'absolute', 'relative'].includes(style.position))
    addClass(el, relativeCls)

  el.appendChild(el.instance!.$el)
}

function remove(el: LoadingEl) {
  el.removeChild(el.instance!.$el)
  removeClass(el, relativeCls)
}

export default loadingDirective
