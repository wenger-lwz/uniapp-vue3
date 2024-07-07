<template>
  <div class="p-4">
    <n-radio-group class="w-full" v-model:value="radio">
      <div class="m-2 w-full space-y-2" v-for="(item, index) in sku" :key="index">
        <div class="flex flex-col gap-2 w-full rounded-lg bg-white p-5 text-black border">
          <div class="flex cursor-pointer w-full items-center justify-between">
            <n-radio class="w-full" :label="index" size="large">
              <div class="flex justify-between">
                <h1 class="w-full text-lg font-bold box text-black mr-5">
                  {{ item.title }}
                </h1>
                <clientOnly>
                  <div class="w-full text-2xl font-bold text-red-600">
                    {{ formatPrice(theOriginalPrice[index].combsPrice) }}
                  </div>
                  <div class="w-full text-xs line-through font-bold text-black">
                    {{ formatPrice(theOriginalPrice[index].price) }}
                  </div>
                  <div class="ml-10 w-full text-base font-bold text-black">
                    {{ $t('cod.jie-sheng') }}
                    <span class="text-4xl text-orange-600 leading-6">
                      {{
                        (1 - theOriginalPrice[index].combsPrice / theOriginalPrice[index].price).toFixed(2) * 100 + '%'
                      }}
                    </span>
                  </div>
                </clientOnly>
              </div>
            </n-radio>
          </div>
          <Transition v-bind="htmlListeners">
            <div class="transition overflow-hidden" v-show="radio == index">
              <div class="body-content" v-for="(i, indx) in item.product" :key="i">
                <skuGeekSkuComb
                  @sku-data="skuData($event, index, indx)"
                  :default-cover="data.product.thumbs"
                  :currency="data?.codset?.currency || data.head_data.currency"
                  :market_price="data.product.market_price"
                  :title="data.product.title"
                  :data="i.sku"
                  :number-combs="Number(i.n)"
                ></skuGeekSkuComb>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </n-radio-group>
  </div>
</template>

<script setup>
const { data } = defineProps(['data'])
const radio = ref(0)
const sku = toSkuDataCombs(data.options, data.variant, data.combos.data)
/** 多语言 */
const { t: $t, locale } = useI18n()
/** 已选择sku信息 */
const skuInfo = ref(Array.from({ length: sku.length }, () => []))
const skuData = (val, i, indx) => {
  skuInfo.value[i][indx] = val
}

/** 计算原价价格 */
const theOriginalPrice = computed(() => {
  return skuInfo.value.map((item) => {
    return {
      price: item.reduce((p, c) => {
        return (
          p +
          c.reduce((p1, c1) => {
            return p1 + Number(c1.price)
          }, 0)
        )
      }, 0),
      combsPrice: item.reduce((p, c) => {
        return (
          p +
          c.reduce((p1, c1) => {
            return p1 + Number(c1.combsPrice)
          }, 0)
        )
      }, 0),
    }
  })
})

/** 格式化货币 */
const formatPrice = (price) => {
  return new Intl.NumberFormat(data.codset.langs, {
    style: 'currency',
    currency: data.codset.currency,
  }).format(price)
}

/** 计算后端需要的数据 */
const combos = computed(() => {
  return skuInfo.value[radio.value]
    .map((indx, index) => {
      return indx.map((i) => {
        return {
          c: sku[radio.value].id,
          p: data.combos.data[radio.value].product[index].p,
          v: i.id,
        }
      })
    })
    .flat()
})

const emit = defineEmits(['skuDataBuyNow'])
/** 侦听数据变化，传递数据到父组件 */
watch(
  () => combos.value,
  () => {
    emit('skuDataBuyNow', {
      num: 1,
      combos: combos.value,
    })
  }
)
</script>

<style scoped>
:deep(.el-radio) {
  display: inline-flex;
}
.box {
  line-height: 2;
}
</style>
