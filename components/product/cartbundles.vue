<template>
  <div class="w-full" v-if="data" v-for="(bundle, index) in data" :key="index">
    <div class="text-black text-base font-normal font-bold leading-none mt-40px mb-5">
      {{ $t('product.additional') }}
    </div>
    <ProductCartbundlesItem :id="id" :bundle="bundle" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  /**  组合加购 */
  name: 'CartBundles',
})

import { getCartBundleAPI } from '~/services/api'
const props = defineProps<{
  /**  商品id */
  id: string | number
}>()

/**  获取数据 */
const {
  data,
}: {
  data: Ref<Product.BundleSales[]>
} = await useAsyncData(() => getCartBundleAPI(props.id), {
  lazy: true,
  server: false,
  transform(data: any) {
    if (data?.data?.data) {
      const bundles = data.data.data
      bundles.forEach((bundle: any) => {
        bundle.products.forEach((product: any) => {
          product.vid = product.variants[0]?.id
          product.checked = true
        })
      })
      return bundles
    }
    return null
  },
})
</script>

<style></style>
