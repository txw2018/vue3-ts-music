import { createApp } from 'vue'

import type {

  Component,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'
import { addClass, removeClass } from '~/asstes/js/dom'
const relativeCls = 'g-relative'

type El = HTMLElement & Record<string, any>
interface CompType {
  setTitle?: (title: string) => void
}
export default function createLoadingLikeDirective<T extends CompType>(Comp: Component): ObjectDirective {
  const name = Comp.name!

  return {
    mounted(el: El, binding: DirectiveBinding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div')) as unknown as T

      if (!el[name])
        el[name] = {}

      el[name].instance = instance
      const title = binding.arg
      if (title)
        instance.setTitle!(title)

      if (binding.value)
        append(el)
    },
    updated(el, binding) {
      const title = binding.arg
      if (title)
        el[name].instance.setTitle(title)
      if (binding.value !== binding.oldValue)
        binding.value ? append(el) : remove(el)
    },

  }

  function append(el: El) {
    const style = getComputedStyle(el)
    if (!['fixed', 'absolute', 'relative'].includes(style.position))
      addClass(el, relativeCls)

    el.appendChild(el[name].instance!.$el)
  }
  function remove(el: El) {
    el.removeChild(el[name].instance!.$el)
    removeClass(el, relativeCls)
  }
}
