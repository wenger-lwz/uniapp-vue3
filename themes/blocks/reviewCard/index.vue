<template>
  <section class="md:py-60px py-10 w-full">
    <h2
      v-if="datas.showTitle"
      :style="{
        'text-align': datas.alignItems,
      }"
      class="mb-2 font-bold s-title font-medium mx-auto font-leading-[43px]"
    >
      {{ datas.title }}
    </h2>

    <div class="w-full flex-col gap-[18px]">
      <swiper
        @swiper="setThumbsSwiper"
        :modules="modules"
        :initial-slide="1"
        class="h-80 md:h-full w-full"
        :breakpoints="{
          '0': {
            spaceBetween: 20,
            slidesPerView: 1,
          },
          '768': {
            spaceBetween: 40,
            slidesPerView: 3,
            centeredSlides: true,
          },
        }"
      >
        <swiper-slide class="wh-full p-2 md:py-2" v-for="(item, index) in datas.content" :key="index">
          <div
            :class="thumbsSwiper?.activeIndex == index ? 'shadow' : ''"
            class="flex bg-white justify-center flex-col h-full md:h-81.75 w-full items-center px-5 md:max-w-[473px]"
          >
            <n-rate :size="40" color="var(--primary-color)" :value="item.rate" readonly />
            <div
              class="self-stretch mt-5.25 md:mt-9 w-full leading-6 text-center text-ellipsis line-clamp-3"
              v-html="item.desc"
            ></div>
            <div class="mt-5.25 md:mt-9">
              <sps-img :src="item.avatar" alt="Profile picture" class="rounded-full aspect-square w-7.5 md:w-[46px]" />
            </div>
            <p class="mt-4 font-medium leading-6 text-center">
              {{ item.name }}
            </p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="flex-center w-full mt-4">
        <div class="mx-auto h-2.5 justify-start items-start gap-2 inline-flex">
          <div
            v-for="(_, index) in datas.content"
            :key="index"
            :class="thumbsSwiper?.activeIndex == index ? 'bg-primary' : 'bg-gray-200'"
            class="w-2.5 h-2.5 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Import Swiper styles
import type { Swiper } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/pagination'

const thumbsSwiper = ref<Swiper | null>()
const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper
}
const modules = [SwiperPagination, SwiperEffectFade, SwiperNavigation]
interface Props {
  datas: {
    title: string
    alignItems: string
    showTitle: boolean
    content: {
      avatar: string
      rate: number
      name: string
      desc: string
    }[]
  }
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
:deep(.n-base-icon) {
  width: 40px;
  height: 40px;
  & svg {
    width: 40px;
    height: 40px;
  }
}
</style>
