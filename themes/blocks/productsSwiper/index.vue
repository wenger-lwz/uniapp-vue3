<template>
  <section
    class="overflow-hidden bg-cover bg-blend-multiply md:py-76px"
    :style="{
      'background-image': `url(${datas.background})`,
      maxWidth: '100%',
      width: '100%',
      backgroundColor: `rgb(0 0 0 / ${datas.mask}%)`,
    }"
  >
    <div class="md:(max-w-1200px h-163.75) mx-auto h-95">
      <div class="w-full h-[57px] my-6.5 flex md:(max-w-1200px mt-78px mb-70px p-0) justify-between p-2">
        <span
          class="flex items-center font-medium s-title text-[#000] text-left capitalize md:whitespace-nowrap text-ellipsis line-clamp-1"
        >
          {{ datas.title }}
        </span>
        <div class="flex justify-between items-center gap-40px">
          <div class="flex">
            <n-button
              text
              :disabled="swiperRef?.isBeginning"
              @click="swiperRef?.slidePrev()"
              class="stage-featured-collection__blank-arrow"
            >
              <icon-arrow class="w-20px" />
            </n-button>
            <n-button
              text
              :disabled="swiperRef?.isEnd"
              @click="swiperRef?.slideNext()"
              class="stage-featured-collection__blank-arrow"
            >
              <icon-arrow class="w-20px" />
            </n-button>
          </div>
        </div>
      </div>
      <swiper
        class="overflow-unset w-full"
        :breakpoints="{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }"
        :update-on-window-resize="true"
        space-between="20"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="i in datas.content"
          :key="i"
          class="bg-white w-40 md:(w-267px) aspect-160/255 md:aspect-267/400 rounded py-26px flex px-20px mx-auto hover:scale-105 transition-all"
        >
          <nuxt-link
            :to="i.handle ? '/products/' + i.handle : '#'"
            class="flex-col justify-between w-full items-center"
          >
            <sps-img class="w-30 h-30 md:(w-[227px] h-[227px]) object-cover" :src="i.thumbs" />
            <div class="flex-col justify-start items-center md:mt-28px mt-5.5 gap-[11px] inline-flex w-full">
              <div class="text-3.5 md:text-base font-normal leading-relaxed text-center ellipsis-text">
                {{ i.title }}
              </div>
              <hr class="w-full color-#D7D7D7" />
              <div class="color-price text-base font-medium leading-relaxed">{{ formatPrice(i.price) }}</div>
            </div>
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Swiper } from 'swiper'

defineProps<{
  datas: {
    title: string
    background: string
    ids: any[]
    content: any[]
    mask: number
  }
}>()

const swiperRef = ref<Swiper | null>(null)
const onSwiper = (swiper: Swiper) => {
  swiperRef.value = swiper
}
</script>

<style lang="scss" scoped>
.stage-featured-collection__blank-arrow {
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: center;
  position: relative;
  width: 60px;
  &::after {
    border: 1px solid;
    border-radius: 50%;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
  }
  &:first-child {
    margin-right: 20px;
    transform: rotate(180deg);
  }
}

@media (max-width: 749.98px) {
  .stage-featured-collection__blank-arrow {
    height: 40px;
    width: 40px;
  }
  .stage-featured-collection__blank-arrow:first-child {
    margin-right: 10px;
  }
}
.swiper {
  overflow: unset;
}
</style>
