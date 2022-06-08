<script setup lang='ts'>
import { getHotKeys } from '~/service/search'
import type { HotKey } from '~/service/search.types'

const query = ref('')
const hotKeys = ref<HotKey[]>([])

const addQuery = (s: string) => {
  query.value = s.trim()
}
onMounted(async() => {
  const result = await getHotKeys()
  hotKeys.value = result!.hotKeys
})

</script>
<template>
  <div fixed w-full top-88px bottom-0 flex="~ col">
    <div m-20px>
      <search-input v-model="query" />
    </div>
    <scroll
      v-show="!query"
      ref="scrollRef"
      flex-1 overflow-hidden
    >
      <div>
        <div mt-0 mb-20px mx-20px>
          <h1 mb-20px text="sm light-l">
            热门搜索
          </h1>
          <ul>
            <li
              v-for="item in hotKeys"
              :key="item.id"
              inline-block py-5px px-10px mt-0 mr-20px mb-10px ml-0 rounded-6px bg-dark-highlight text="sm light-d"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div v-show="query" class="search-result">
      <suggest :query="query" />
    </div>
  </div>
</template>

<style scoped >
</style>
