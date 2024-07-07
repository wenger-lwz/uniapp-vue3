<template>
  <section class="max-w-full! w-full! p-0!">
    <template v-if="pending">
      <n-spin class="flex-center w-full mt-10%" />
    </template>
    <template v-else-if="!pending">
      <div
        v-if="!gooddata?.codset && gooddata?.data?.product?.id"
        class="md:px10 max-w-1200px mx-auto px-10px w-100%"
        style=""
      >
        <!-- 头部 -->
        <!-- <header class=" flex justify-between items-center py-5px block md:hidden">
         <n-button text><icon-back class=" mr-15px w18px h18px" @click="router.back" /></n-button>
         <div class=" text-center text-black text-lg font-normal">{{ $t('product.goods_datail') }}</div>
       </header> -->

        <!-- 内容区域 -->
        <main class="w-100% pt-0 md:p-t98px">
          <!-- 商品sku -->
          <ProductDetails v-model="gooddata.data" />
          <!-- 捆绑销售 -->
          <ProductBundleSales v-if="gooddata?.data?.product?.id" :id="gooddata?.data?.product.id" />
          <!-- 商品详情 -->
          <ProductInfoHtml :description="gooddata?.data?.product?.description || ''" />
          <!-- 商品评价 -->
          <ProductComments v-if="head_data.review" :gooddata="gooddata?.data" />
        </main>
      </div>
      <cod v-else-if="gooddata?.codset" :codset="gooddata.codset" :product="gooddata.data.product" />
      <ErrorsRoutingNotFound v-else />

      <custompluginAddToCart></custompluginAddToCart>
    </template>
  </section>
</template>

<script setup lang="ts">
const { head_data } = storeToRefs(useThemeEditorStore())

defineOptions({
  /**  商品详情 */
  name: 'ProductDatail',
})
import { goodsDatail } from '~/services/api'

defineProps<{
  datas: any
}>()

/**  获取路由 */
const route = useRoute()

const nuxtApp = useNuxtApp()

/**
 * @description 获取商品信息
 */
const { data: gooddata, pending } = await useAsyncData(route.fullPath, () => goodsDatail(route.params?.all[1]), {
  transform({ data }) {
    return data
  },
  lazy: process.client,
  getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
})

/** 保存商品信息 */
const productsresult = useProductsresult()

/**  加载底部加购插件 */
const stop = watchEffect(() => {
  if (gooddata.value?.data?.product) {
    productsresult.setResult(gooddata.value?.data?.product)
  }
})
/**  去除副作用 */
onUnmounted(stop)

/**  商品seo数据 */
gooddata.value?.data?.seo && useSeoMeta(gooddata.value?.data?.seo)

/**  组件挂载 */
onMounted(() => {
  DLayers('view_product')

  useHead({
    script: [
      {
        innerHTML: `var proid = ${gooddata.value?.products?.id};
        if(proid && $('.product-info__header .xfpmks').length <=0){
                $.getJSON(shop_url+"products/markets/"+proid,function(res){$('.product-info__header .xfpmks').remove();$('.product-info__header').append('<span class=" xfpmks"></span>');$('.product-info__header_title').after(res.market.djst);$('.product-info__header_title').after(res.market.sold);$('.product-info__body').before(res.market.dzgz);$('.product-info__body').before(res.market.view);$('.product-info__body').before(res.market.ships);$('.product-info__body').before(res.market.btime);$('.product-info__body').before(res.market.showt);$('.product-info__body').before(res.market.coupon);$('.product-info__qty_container').after(res.market.inventory);});
        }`,
      },
    ],
  })
})
</script>
