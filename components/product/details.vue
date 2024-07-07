<template>
  <div v-if="gooddata?.product" class="flex flex-col md:flex-row flex-wrap gap-x-[40px] gap-y-[12px]">
    <!-- 轮播图 -->
    <div class="relative w-full md:w-1/2">
      <ProductCarousel v-model="thumbsSwiper1" :images="gooddata.product?.images" />
    </div>
    <!-- 右侧区域 -->
    <div class="product-info__header flex flex-col flex-1 md:flex-[11_11_0%] px-5px md:px-0px">
      <!-- 头部 -->
      <div class="product-info__header">
        <div class="text-14px md:text-36px color-productTitleColor font-500 break-all">
          {{ gooddata.product.title }}
        </div>
        <div class="text-14px color-subProductTitleColor mt10px mb-2">{{ gooddata?.product?.alias }}</div>
        <!-- <div class=" text-14px color-#8A8A8A mt10px mb-2">{{ $t('product.sell') }}{{ gooddata.product?.sales }}</div> -->
        <HtmlAppend v-for="item in pluginsHtml?.data?.market" :key="item" class="xfpmks" :html="item" />
      </div>
      <!-- 价格 -->
      <ProductPrice v-if="select_sku" :select_sku="select_sku" />
      <!-- sku选择 -->
      <!-- <SkuGeekSku :data="skus" @sku-change="skuChange" @num-change="select_sku.num = Number($event)" /> -->
      <CodSku
        v-if="
          gooddata?.product?.variants && gooddata?.product?.variants?.length && gooddata?.product?.variants[0]?.id != -1
        "
        :variants="gooddata?.product?.variants"
        @sku-change="skuChange"
      />
      <p id="product_id" class="hidden">{{ gooddata.product.id }}</p>
      <!-- 支付按钮 -->
      <ProductPayButton ref="pay_buttons" :gooddata="select_sku" />
      <ProductCartbundles :id="gooddata.product?.id" />
      <!-- 分享 -->
      <n-space justify="space-between" align="center" class="m-t16px">
        <p>{{ $t('product.Share') }}</p>
        <div class="flex justify-end items-center">
          <nuxt-link :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareurl" target="_blank">
            <icon-facebook class="mr-15px w18px h18px" />
          </nuxt-link>
          <nuxt-link :href="'https://twitter.com/intent/tweet?url=' + shareurl" target="_blank">
            <icon-twitter class="mr-15px w18px h18px" />
          </nuxt-link>
          <nuxt-link :href="'https://pinterest.com/pin/create/button/?url=' + shareurl" target="_blank">
            <icon-pinterest class="mr-15px w18px h18px" />
          </nuxt-link>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProductDetails',
})
import type { Swiper } from 'swiper'
import { getMarketsPlugsAPI } from '~/services/api'
import { useMarkets } from '~/stores/useMarkets'
const gooddata = defineModel<any>()
const thumbsSwiper1 = ref<Swiper | null>(null)

/**  分享地址 */
const shareurl = computed(() => {
  if (process.server) return useRequestURL().href
  return location?.href
})

const nuxtApp = useNuxtApp()

/**  商品详情插件 */
const { data: pluginsHtml } = await useAsyncData('pluginsHtml', () => getMarketsPlugsAPI(gooddata.value?.product?.id), {
  lazy: process.client,
  getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
})

// /**  sku信息 */
// const skus = toSkuData(gooddata.value.product?.options, gooddata.value.product?.variants)

/**  插槽实例对象 */
const pay_buttons = ref<{
  debouncePayBtn: () => void
} | null>(null)

/** 选择的sku 商品信息 */
const select_sku: any = ref({
  proid: gooddata.value?.product?.id,
  num: 1,
  ...gooddata.value?.product,
})
// /**  选择商品属性 */
// const skuChange = (sku: any) => {
//   const { id: varid, ...skuData } = gooddata.value.product?.variants.find((item: any) => item.id == sku.id)
//   select_sku.value = { proid: gooddata.value.product.id, varid, inventory_quantity: skuData.inventory_quantity, ...skuData }
//   if (process.client && thumbsSwiper1.value) {
//     thumbsSwiper1.value.slideTo(gooddata.value.product.images.findIndex((i: any) => i.src == skuData?.image?.src))
//   }

//   process.client && pay_buttons.value?.debouncePayBtn()
// }
/**  sku改变
 * @param sku sku商品属性
 * @param num 购买数量
 * @returns {*}
 * */
const skuChange = (sku: any, num: number): void => {
  // const { id: varid, ...skuData } = gooddata.value.product?.variants.find((item: any) => item.id == sku.id)
  select_sku.value = {
    ...sku,
    proid: gooddata.value.product.id,
    varid: sku.id,
    inventory_quantity: sku.inventory_quantity,
    num,
  }
  if (process.client && thumbsSwiper1.value) {
    thumbsSwiper1.value.slideTo(gooddata.value.product.images.findIndex((i: any) => i.src == sku?.image?.src))
  }

  process.client && pay_buttons.value?.debouncePayBtn()
}
const { getMarketsData } = useMarkets()
// const data = getMarketsData()
</script>
