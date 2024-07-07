<template>
  <section class="md:py-120px py-5" style="width: 100%">
    <p
      :style="{
        'justify-content': datas.location,
      }"
      class="flex flex-wrap s-title w-full mb-30px font-semibold"
    >
      {{ datas.text }}
    </p>
    <div
      class="wh-full flex-wrap flex justify-between mx-auto md:justify-center items-center gap-5 max-md:(gap-x-3.5 gap-y-7.5 )"
    >
      <div
        :style="{
          flex: `0 0 ${100 / (datas.columns + 1)}%`,
        }"
        class="aspect-square dd max-md:(w-[calc((100%-1.87rem)/2)] flex-[unset]!) pos-relative transition-all-1000 overflow-hidden bg-opacity-50 md:w-165px md:w-224px"
        v-for="(item, index) in datas.content"
        :key="index"
      >
        <NuxtLink :to="item.handle ? '/collections/' + item.handle : '/'" class="aspect-square block">
          <section
            :class="`${datas.style == 1 ? 'rounded-50% ' : 'rounded-0 '}`"
            class="group aspect-square md:w-full flex transition-all-1000 overflow-hidden relative flex-col items-center justify-center text-sm leading-5 text-black whitespace-nowrap aspect-square"
          >
            <sps-img
              :src="item.image"
              class="md:object-cover group-hover:scale-180 transition-all-1000 object-c absolute inset-0"
            />
            <div
              class="md:px-3 md:py-3.5 md:mt-11 bg-white shadow-sm md:rounded-[30px] group-hover:block hidden absolute"
            >
              {{ item.name }}
            </div>
          </section>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Content {
  image: string
  name: string
  handle: string
}

interface CustomType {
  content: Content[]
  name: string
  text: string
  columns: number
  location: any
  style: number
  buttonText: string
  slide: boolean
}

defineOptions({
  /**  分类列表2 */
  name: 'ProductCategory2',
})

defineProps<{
  datas: CustomType
}>()
</script>

<style lang="scss" scoped>
.dd {
  & > a:hover section {
    -webkit-animation: flip-in-diag-2-br 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: flip-in-diag-2-br 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
}

@keyframes flip-in-diag-2-br {
  0% {
    -webkit-transform: rotate3d(-1, 1, 0, -80deg);
    transform: rotate3d(-1, 1, 0, -80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate3d(1, 1, 0, 0deg);
    transform: rotate3d(1, 1, 0, 0deg);
    opacity: 1;
  }
}
</style>
