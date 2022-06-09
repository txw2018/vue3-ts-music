import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import LazyPlugin from 'vue3-lazy'
import routes from 'virtual:generated-pages'
import VConsole from 'vconsole'
import App from './App.vue'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/no-result/directive'
import lazyDefaultImg from './asstes/images/default.png'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import.meta.env.DEV && new VConsole()
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(createPinia())
app.use(LazyPlugin, {
  loading: lazyDefaultImg,
  error: lazyDefaultImg,
})
app.directive('loading', loadingDirective)
app.directive('noResult', noResultDirective)
app.mount('#app')
