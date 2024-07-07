<template>
  <div class="bg-gray-100 md:max-w-100%! w-full!">
    <div v-if="product" class="flex-center flex-col mx-auto max-w-[750px] w-full bg-white px-10px pb-10">
      <!-- 轮播图 -->
      <ProductCarousel v-model="thumbsSwiper1" class="w-full md:pos-static" :images="product.images" />
      <p class="text-sm color-#1C1C1C font-600 break-all text-left w-full">{{ product?.title }}</p>
      <p class="text-sm color-#8A8A8A mt10px mb-2 w-full">{{ product?.alias }}</p>
      <!-- 价格 -->
      <ProductPrice v-if="select_sku" class="px-0 w-full" :select_sku="select_sku" />

      <div class="w-full">
        <div v-for="item in pluginsHtml?.data?.market" class="justify-start" v-html="item"></div>
      </div>
      <!-- 商品详情 -->
      <ProductInfoHtml class="px-0" :description="product.conts" />
      <CodSku
        v-if="product?.variants && product?.variants?.length && product?.variants[0]?.id != -1"
        :variants="product.variants"
        @sku-change="skuChange"
      />
      <!-- 商品评价 -->
      <ProductComments class="px-0" :gooddata="product" />

      <!-- sku选择 -->
      <!-- <SkuGeekSku class=" w-full" :data="skus" @sku-change="skuChange" @num-change="numChange" /> -->
      <!-- 地址支付信息表单 -->
      <ProductForm ref="formPay" :buy_now="buy_now" :data="product" :codset="codset" class="mt-2 bg-white pb-10" />
      <!-- 底部按钮 -->
      <div class="w-100%">
        <n-button class="rounded" size="large" block type="error" :loading="buyLoading" @click="onSubmit">
          {{ $t('cod.checkout.buy_now') }}
        </n-button>
      </div>
      <ProductCartbundles v-if="codset.enabled_cart_bundles" :id="product.id" />
      <!-- 绑定销售 -->
      <ProductBundleSales v-if="codset.enabled_prod_bundles" :id="product.id" />
      <!-- 捆绑组合 -->
      <!-- 推荐商品 -->
      <CodRecommend v-if="codset.recommend_prod" :data="codset.recommend_prod" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createOrder, getMarketsPlugsAPI, shopGoodsbuynow } from '~/services/api'

import type { Swiper } from 'swiper'
import { useDialog } from 'naive-ui'
const { t } = useI18n()
const dialog = useDialog()
const props = defineProps<{
  codset: COD.Codset
  product: COD.Product
}>()
const { locale } = useI18n()
const skus = ref()
onBeforeUnmount(() => {
  renderType.value = null
})
provide('cod', true)

const route = useRoute()
const formPay = ref()
const buyLoading = ref(false)

/** 选择的sku 商品信息 */
const select_sku = ref({})

/**  用户唯一标识 */
const key_o = useCookie('okey')
if (!key_o.value) {
  key_o.value = Math.random().toString(8).substr(2)
  if (key_o.value.length > 16) {
    key_o.value = key_o.value.substring(0, 16)
  }
}

/**  表单 */
const buy_now = ref({
  proid: route.params.all[1] || null,
  varid: select_sku.value.varid || null,
  num: select_sku.value.num,
  source: 'buy_now',
  key_o: +key_o.value,
})

/**  提交订单 */
const onSubmit = async () => {
  try {
    buyLoading.value = true
    await formPay?.value?.onSubmit()
    await buyNow()
    await submitOrder(formPay?.value.form)
  } catch (error) {
  } finally {
    buyLoading.value = false
  }
}

/**  加载状态 */

/**  html */
const html = ref()
/**  创建订单 */
const buyNow = async () => {
  const { data } = await shopGoodsbuynow(buy_now.value)
  if (data.code == 200) {
    return
  }
  throw new Error(t('checkout.code_valid'))
}

/**  提交订单 */
const submitOrder = async (form: any) => {
  const { data } = await createOrder(form)
  if (data?.state == 'ok') {
    if (data.url) {
      location.href = data.url
    } else if (data.view) {
      html.value = data.view
    }
  } else {
    dialog.error({
      title: data.msg,
      content: () => data.msg,
      positiveText: t('cod.s'),
    })
  }
}

/**  插件中立即购买 */
const pluginOnSubmit = async (fn: () => Promise<any>) => {
  try {
    const { warnings } = await formPay?.value?.onSubmit()
    if (warnings) {
      throw new Error('error')
    }
    await fn()
    await submitOrder(formPay?.value.form)
  } catch (error) {
    console.log(error)
  } finally {
  }
}
provide('pluginOnSubmit', pluginOnSubmit)

/**  设置布局 */
const { renderType } = storeToRefs(useThemeEditorStore())
renderType.value = 'cod'

/**  结构props */
const { codset, product } = toRefs(props)
// setPageLayout('blank')
/**  设置主题 */
// const com = ref(data.value?.codset?.tpl?.split('/').join('-'))

/**  设置语言 */
locale.value = codset.value.langs

/**  设置货币 */
provide('currency', toRef(codset.value.currency))
/**  设置skus */
// skus.value = toSkuData(product.value?.options, product.value?.variants)

provide('loading', buyLoading)

/**  商品详情插件 */
const { data: pluginsHtml } = await useAsyncData(() => getMarketsPlugsAPI(product.value?.id), {
  lazy: true,
})

/**  轮播图实例对象 */
const thumbsSwiper1 = ref<Swiper | null>(null)

/**  sku改变
 * @param sku sku商品属性
 * @param num 购买数量
 * @returns {*}
 * */
const skuChange = (sku: any, num: number): void => {
  select_sku.value = { ...sku, proid: product.value.id, varid: sku.id, num }
  buy_now.value = Object.assign({}, buy_now.value, { varid: sku.id, num })
  if (process.client && thumbsSwiper1.value) {
    thumbsSwiper1.value.slideTo(product.value.images?.findIndex((i: any) => i.src == sku?.image?.src))
  }
}

defineOptions({
  /**  cod单页 */
  name: 'ProductCod',
})
</script>
