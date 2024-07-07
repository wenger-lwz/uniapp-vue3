<template>
  <div class="md:pos-sticky mx-auto md:mx-0 top-127px w-full">
    <swiper
      @swiper="setThumbsSwiper1"
      :loop="true"
      :space-between="10"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[FreeMode, Navigation, Thumbs]"
      class="w-full"
    >
      <swiper-slide v-for="img in images">
        <sps-img class="aspect-14/16 w-full" fit="cover" :src="img?.src" />
      </swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :space-between="10"
      :slides-per-view="4"
      :free-mode="true"
      :watch-slides-progress="true"
      class="w-full mySwiper"
    >
      <swiper-slide space-between="10px" v-for="img in images">
        <sps-img class="aspect-14/16 object-cover wh-full md:h-130px cursor-pointer" :src="img?.src" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import type { Swiper } from 'swiper'
const thumbsSwiper = ref<Swiper | null>(null)
const thumbsSwiper1 = defineModel<Swiper | null>()

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper
}
// const { width } = useWindowSize()

const setThumbsSwiper1 = (swiper: Swiper) => {
  thumbsSwiper1.value = swiper
}

defineProps<{
  images: COD.Images
}>()
</script>

<style scoped lang="scss">
@import 'swiper/css';
@import 'swiper/css/free-mode';
@import 'swiper/css/navigation';
@import 'swiper/css/thumbs';
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  align-items: flex-start;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  cursor: pointer;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper {
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
