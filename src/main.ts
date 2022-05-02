import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import LazyPlugin from 'vue3-lazy'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import loadingDirective from './components/base/loading/directive'
import lazyDefaultImg from './asstes/images/default.png'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/',
      redirect: '/recommend',
    },
  ],
})
app.use(router)
app.use(LazyPlugin, {
  loading: lazyDefaultImg,
  error: lazyDefaultImg,
})
app.directive('loading', loadingDirective)
app.mount('#app')
