<!-- 精品商品 -->
<template>
  <section class="py-65px" style="width: 100%">
    <div class="s-title mb-30px font-semibold">{{ datas.text }}</div>
    <!-- <n-grid :x-gap="12" :y-gap="12" :cols="`2 750:3 1000:${datas.pcColumns}`"> -->
    <div class="w100% hidden md:block">
      <n-grid :x-gap="20" :y-gap="20" :cols="datas.pcColumns">
        <n-grid-item :key="index" v-for="(item, index) in datas.content">
          <nuxt-link v-if="item" :to="item?.handle ? '/products/' + item?.handle : '#'">
            <sps-img
              class="hover:scale-103 transition-500 cursor-pointer"
              :src="item?.thumbs"
              style="border-radius: 4px; object-fit: cover; width: 100%; aspect-ratio: 3/4"
            />
            <n-space>
              <n-ellipsis
                :line-clamp="productListStyle"
                class="w100% m-t18px color-productTitleColor text-base font-600 leading-normal tracking-tight"
              >
                {{ item?.title }}
              </n-ellipsis>
            </n-space>
            <div class="text-base leading-normal tracking-tight">
              <span class="color-price text-[16px] mb-4px">{{ formatPrice(item?.price) }}</span>
              <span
                v-if="expandOriginalPrice"
                class="text-14px color-originalPrice"
                style="text-decoration: line-through; margin-left: 10px"
              >
                {{ formatPrice(item?.marketPrice || item?.market_price) }}
              </span>
            </div>
          </nuxt-link>
        </n-grid-item>
      </n-grid>
    </div>
    <!-- 移动端 -->
    <div class="w100% block md:hidden">
      <!-- 移动端换行版 -->
      <n-grid :x-gap="12" :y-gap="12" :cols="datas.mobColumns + ' 750:' + datas.pcColumns" v-if="datas.slide == false">
        <n-grid-item :key="index" v-for="(item, index) in datas.content">
          <nuxt-link v-if="item" :to="item?.handle ? '/products/' + item?.handle : '#'">
            <sps-img
              class="cursor-pointer"
              :src="item.thumbs"
              style="width: 100%; border-radius: 4px; aspect-ratio: 3/4"
            />
            <n-space class="w-full">
              <n-ellipsis
                :line-clamp="productListStyle"
                class="w-full m-t1.37 color-productTitleColor text-14px font-600 leading-normal tracking-tight"
              >
                {{ item?.title }}
              </n-ellipsis>
            </n-space>
            <div class="m-t1.37 m-b2.5 text-base leading-normal tracking-tight">
              <span class="color-price text-[16px]">{{ formatPrice(item.price) }}</span>
              <span
                v-if="expandOriginalPrice"
                class="text-[14px] color-originalPrice"
                style="text-decoration: line-through; margin-left: 10px"
              >
                {{ formatPrice(item.marketPrice || item.market_price) }}
              </span>
            </div>
          </nuxt-link>
        </n-grid-item>
      </n-grid>
      <!-- 移动滑动版 -->
      <n-carousel
        :show-dots="false"
        class="w100%"
        v-if="datas.slide == true"
        :slides-per-view="datas.mobColumns"
        :space-between="15"
        :loop="false"
        draggable
      >
        <n-carousel-item :key="index" v-for="(item, index) in datas.content">
          <nuxt-link v-if="item" :to="item.id ? '/products/' + item.id : '#'">
            <sps-img class="cursor-pointer" :src="item.thumbs" style="border-radius: 4px; aspect-ratio: 3/4" />
            <n-space class="w-full">
              <n-ellipsis
                :line-clamp="productListStyle"
                class="w-full m-t1.37 color-productTitleColor text-14px font-600"
                style="overflow-wrap: break-word"
              >
                {{ item.title }}
              </n-ellipsis>
            </n-space>
            <div class="m-t1.37 m-b2.5 text-base leading-normal tracking-tight">
              <span class="color-price text-[16px]">{{ formatPrice(item.price) }}</span>
              <span
                v-if="expandOriginalPrice"
                class="text-[14px] color-originalPrice"
                style="text-decoration: line-through; margin-left: 10px"
              >
                ${{ formatPrice(item.marketPrice || item.market_price) }}
              </span>
            </div>
          </nuxt-link>
        </n-carousel-item>
      </n-carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
const { expandOriginalPrice, productListStyle } = storeToRefs(useThemeEditorStore())

defineOptions({
  name: 'BoutiqueProducts',
})
defineProps<{
  datas: any
}>()
// const getgoodsdatail = (id: number) => {
//   if (!id) return

//   router.push({ path: '/products/' + id })
// }
</script>
