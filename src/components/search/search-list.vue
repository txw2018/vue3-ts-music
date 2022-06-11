<script setup lang='ts'>
import type { PropType } from 'vue'
defineProps({
  searches: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits<{
  (e: 'select', item: string): void
  (e: 'delete', item: string): void
}>()
const selectItem = (item: string) => {
  emit('select', item)
}
const deleteItem = (item: string) => {
  emit('delete', item)
}
</script>
<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="item in searches"
        :key="item"
        flex="~ items-center" h-40px overflow-hidden
        @click="selectItem(item)"
      >
        <span flex-1 dark:text-dark-l text-light-l>{{ item }}</span>
        <span
          v-if="showDelete"
          @click.stop="deleteItem(item)"
        >
          <i class="i-carbon:close" />
        </span>
      </li>
    </transition-group>
  </div>
</template>
