<template>
  <section
    :style="{
      height: datas.height * 8 + 'px',
    }"
    class="box max-md:h-74.75!"
    style="width: 100%; max-width: 100%; padding-left: 0; padding-right: 0"
  >
    <swiper :modules="modules" pagination :loop="true"   
        :autoplay="{
          delay: Number(datas.times)>100?Number(datas.times):Number(datas.times)*1000,
          disableOnInteraction: false,
        }"
        :slidesPerView="1" class="h-100%">
      >
      <swiper-slide v-for="(item, index) in datas.blocks" :key="index">
        <sps-img class="md:block! h-full hidden! object-cover" :src="item.settings.pc_img" />
        <sps-img class="md:hidden! block! h-full object-cover" :src="item.settings.mob_img" />
        <div class="carousel_content md:w-43.5% md:h-60% wh-full">
          <n-ellipsis
            :line-clamp="2"
            class="text-center w-full s-title"
            :style="'font-size:' + item.settings.font_size + ';'"
          >
            {{ item.settings.title }}
          </n-ellipsis>
          <n-ellipsis
            :line-clamp="1"
            class="text-center m-b12px m-t12px w-full s-sub-title"
            v-html="item.settings.dec"
          ></n-ellipsis>
          <n-space justify="space-around" size="large">
            <nuxt-link class="max-w-full" v-for="button in item.settings.buttonlist" :href="button.link">
              <n-button type="primary" :color="button.color" block>{{ button.name }}</n-button>
            </nuxt-link>
          </n-space>
        </div>
      </swiper-slide>
    </swiper>

    <!-- <n-carousel v-if="datas.blocks.length" autoplay :interval="+datas.times * 1000" draggable loop>
      <n-carousel-item class="p-0" v-for="(item, index) in datas.blocks" :key="index">
        <sps-img class="md:block! h-full hidden! object-cover" :src="item.settings.pc_img" />
        <sps-img class="md:hidden! block! h-full object-cover" :src="item.settings.mob_img" />
        <div class="carousel_content md:w-43.5% md:h-60% wh-full">
          <n-ellipsis
            :line-clamp="2"
            class="text-center w-full s-title"
            :style="'font-size:' + item.settings.font_size + ';'"
          >
            {{ item.settings.title }}
          </n-ellipsis>
          <n-ellipsis
            :line-clamp="1"
            class="text-center m-b12px m-t12px w-full s-sub-title"
            v-html="item.settings.dec"
          ></n-ellipsis>
          <n-space justify="space-around" size="large">
            <nuxt-link class="max-w-full" v-for="button in item.settings.buttonlist" :href="button.link">
              <n-button type="primary" :color="button.color" block>{{ button.name }}</n-button>
            </nuxt-link>
          </n-space>
        </div>
      </n-carousel-item>
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <n-button text class="custom-arrow--left bg-none color-white" @click="prev">
            <icon-left class="w-56px h-56px" />
          </n-button>
          <n-button text class="custom-arrow--right bg-none color-white" @click="next">
            <icon-right class="w-56px h-56px" />
          </n-button>
        </div>
      </template>
    </n-carousel> -->
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
let modules = ref([Pagination, Autoplay])
import 'swiper/css'
import 'swiper/css/pagination'
defineOptions({
  name: 'Arousal',
})
defineProps<{
  datas: any
}>()
</script>

<style scoped lang="scss">
// :deep(.n-button__content) {
//   mix-blend-mode: difference;
// }
.carousel_img_box {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-img {
  /* position: absolute;
  left: 0;
  top: 0; */
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel_content {
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 50%;
  /* width: 43.5%;
  height: 60%; */
  // background: rgba(0, 0, 0, 0.5);
  // color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
}
/* 轮播图底部指示点位置 */
:deep(.n-carousel.n-carousel--bottom .n-carousel__dots) {
  bottom: 18px;
  left: 50%;
}

.custom-arrow {
  display: flex;
  /* position: absolute;
  bottom: 25px;
  right: 10px; */
}
@media (max-width: 750px) {
  .custom-arrow {
    display: none;
  }
}

.custom-arrow--left {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}
.custom-arrow--right {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;

  /* color: #fff; */
  /* background-color: rgba(12, 11, 11, 0.1); */
  border-width: 0;
  padding: none;
  border-radius: 50%;
  /* transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1); */
  cursor: pointer;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3)
}
:deep(.swiper-pagination-bullet-active) {
  background: rgba(255, 255, 255,1);
}
</style>
