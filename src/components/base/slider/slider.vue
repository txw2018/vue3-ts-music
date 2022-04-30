<script setup lang='ts'>
import useSlider from './use-slider'
import type { Slider } from '~/service/recommend.type'
const { sliders = [] } = defineProps< {
  sliders: Slider[]
}>()
const rootRef = ref<HTMLDivElement|null>(null)
const { currentPageIndex } = useSlider(rootRef)

</script>
<template>
  <div
    ref="rootRef"
    min-h-1px text-0px touch-pan-y
  >
    <div
      relative overflow-hidden whitespace-nowrap
    >
      <div
        v-for="item in sliders"
        :key="item.id"
        inline-block
        translate-x-0
        translate-y-0
        translate-z-0
      >
        <a
          :href="item.link"
          block w-full
        >
          <img
            :src="item.pic"
            block w-full
          >
        </a>
      </div>
    </div>
    <div
      absolute bottom-12px lh-12px class="left-1/2 -translate-x-1/2"
    >
      <span
        v-for="(item, index) in sliders"
        :key="item.id"
        inline-block my-0 mx-4px w-8px h-8px translate-z-1px bg-l
        class="rounded-1/2"
        :class="{'w-20px rounded-5px bg-ll': currentPageIndex === index}"
      />
    </div>
  </div>
</template>
