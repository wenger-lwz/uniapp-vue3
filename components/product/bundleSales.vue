<template>
  <div v-if="data" v-for="(bundle, index) in data" :key="index" class="mt-40px w-full">
    <ProductBundleSalesItem :bundle="bundle" />
  </div>
</template>
<script lang="ts" setup>
import { getBundleSalesAPI, BundleBuyAPI } from '~/services/api'

defineOptions({
  /**  捆绑组合销售 */
  name: 'BundleSales',
})

const props = defineProps<{
  /**  商品id */
  id: number | string
}>()

/**  获取数据 */
const {
  data,
}: {
  data: Ref<Product.BundleSales[]>
} = await useAsyncData(() => getBundleSalesAPI(props.id), {
  lazy: true,
  server: false,
  transform(data: any) {
    /**  处理默认选项 */
    if (data?.data?.data) {
      data.data.data.forEach((item: any) => {
        item.products.forEach((i: any) => {
          if (i.variants && i.variants.length > 0) {
            i.vid = i.variants[0].id
          }
        })
      })
    }

    return data?.data?.data
  },
})
</script>

<style lang="scss" scoped>
:deep(.n-scrollbar > .n-scrollbar-container > .n-scrollbar-content) {
  display: flex;
  gap: 1.5rem;
}
</style>
