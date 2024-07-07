<template>
  <div class="flex-col gap-10px">
    <div class="text-black text-base font-normal leading-none">{{ bundle.title }}</div>
  </div>
  <!-- 主商品 -->
  <div v-if="mainBundlesProduct" class="flex items-center gap-10px mt-5">
    <n-checkbox class="mt-2" checked :disabled="mainBundlesProduct.id == id" />
    <div class="w-full justify-start items-center gap-3.5 flex">
      <sps-img width="200" height="200" class="w-20 h-20 rounded" :src="mainBundlesProduct?.thumbs" />
      <div class="flex-col justify-start items-start gap-2.5 flex">
        <n-ellipsis :tooltip="false" class="text-black max-w-300px text-sm" :line-clamp="2">
          {{ mainBundlesProduct?.title }}
        </n-ellipsis>
        <n-select
          :consistent-menu-width="false"
          class="w-100px"
          v-model:value="mainBundlesProduct.vid"
          :options="coverSelectData(mainBundlesProduct)"
        />
        <div class="w-[33px] text-red-600 text-sm font-medium leading-snug tracking-wide">
          {{ formatPrice(mainPrice) }}
        </div>
      </div>
    </div>
  </div>
  <p class="text-center text-black text-2xl font-normal leading-snug tracking-wide">+</p>

  <div v-for="(item, index) in bundleProducts" :key="index" class="flex-col gap-20px my-20px">
    <div class="flex items-center gap-10px">
      <n-checkbox class="mt-2" v-model:checked="item.checked" />
      <div class="w-full justify-start items-center gap-3.5 flex">
        <sps-img width="200" height="200" class="w-20 h-20 rounded" :src="item.thumbs" />
        <div class="flex-col justify-start items-start gap-2.5 flex">
          <n-ellipsis :tooltip="false" class="text-black max-w-300px text-sm" :line-clamp="2">
            {{ item.title }}
          </n-ellipsis>
          <n-select
            :consistent-menu-width="false"
            class="w-100px"
            v-model:value="item.vid"
            :options="coverSelectData(item)"
          />
          <div class="w-[33px] text-red-600 text-sm font-medium leading-snug tracking-wide">
            {{ formatPrice(bundle.product.find((i: any) => i.productId == Number(item.id))?.discountPrice) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-justify-end items-center gap-10px flex-wrap">
    <div>
      <span class="text-black text-sm font-normal leading-snug tracking-wide">{{ $t('product.total') }} ：</span>
      <span class="text-red-600 text-sm font-normal leading-snug tracking-wide">
        {{ formatPrice(mainDiscountPrice) }}
      </span>
    </div>
    <div class="text-stone-300 text-xs font-normal line-through leading-tight" v-if="mainDiscountPrice != totalPrice">
      {{ formatPrice(totalPrice) }}
    </div>
    <n-button
      :loading="loading"
      :disabled="!bundleProducts.filter((item) => item.checked).length"
      @click="submitOrder"
      class="w-[220px] h-10 rounded"
      type="primary"
    >
      {{ $t('product.addCart') }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'
import { BundleBuyAPI } from '~/services/api'
const router = useRouter()
defineOptions({
  /**  组合加购 */
  name: 'CartBundlesItem',
})
const notification = useNotification()
const props = defineProps<{
  /**  商品数据 */
  bundle: Product.BundleSales
  /**  主商品id */
  id: string | number
}>()

/**  转换select 选项函数 */
const coverSelectData = (data: Product.Products[]) => {
  return data?.variants.map((item: any) => {
    return {
      label: item.title,
      value: item.id,
    }
  })
}

/**  计算总价，商品总价 */
const totalPrice = computed(() => {
  return Number(mainPrice.value) + Number(bundlePrice.value)
})

/**  过滤组合商品 */
const bundleProducts = computed(() => {
  return props.bundle.products.filter((predicate: any) => {
    return props.bundle.product.some((i: any) => predicate.id == i.productId)
  })
})

/**
 * 过滤组合商品
 * 去除主商品
 */
const filterProducts = computed(() => {
  // 复制原始数组
  const newArr = props.bundle.products.slice()
  const index = newArr.findIndex((i: any) => i.id == props.id)
  if (index != -1) {
    return newArr.splice(index, 1)
  }
  return props.bundle.products
})

/**  计算组合原价 */
const bundlePrice = computed(() => {
  return bundleProducts.value.reduce(
    (pre: any, cur: any) => pre + Number(cur?.variants.find((i: any) => cur.checked && i.id == cur.vid)?.price ?? 0),
    0
  )
})

/**  计算选中优惠的价格 */
const discountPrice = computed(() => {
  return props.bundle.product
    .filter((i: any) => {
      return props.bundle.products.some((predicate) => predicate.checked && predicate.id == i.productId)
    })
    .reduce((pre: any, cur: any) => pre + cur.discountPrice, 0)
})

/**  过滤主商品 */
const mainBundlesProduct = computed(() => {
  return props.bundle.products.find((i: any) => {
    return i.id == props.id
  })
})

/**  主商品价格 */
const mainPrice = computed(() => {
  return mainBundlesProduct.value?.variants.find((item) => {
    return item.id == mainBundlesProduct.value?.vid
  })?.price
})

/**  计算优惠总价 */
const mainDiscountPrice = computed(() => {
  return Number(discountPrice.value) + Number(mainPrice.value)
})

/**  inject */
const cod = inject('cod', false)

const loading = ref(false)
/**  立即购买 */
const buyNow = async () => {
  loading.value = true

  /**  处理数据转换为后端要求格式 */
  let pvids = {}
  let pnids = {}

  pvids[mainBundlesProduct.value?.id] = mainBundlesProduct.value.vid
  pnids[mainBundlesProduct.value?.id] = 1

  bundleProducts.value
    .filter((i) => i.checked)
    .forEach((item) => {
      pvids[item.id] = item.vid
      pnids[item.id] = 1
    })

  try {
    const { data } = await BundleBuyAPI({
      source: 'cbundles',
      okey: useCookie('okey').value as any,
      inum: props.bundle.id,
      pvids: JSON.stringify(pvids),
      pnids: JSON.stringify(pnids),
      st: 'buy_now',
    })

    if (data?.code == 200) {
      /**   "buyType": //购买组合商品方式 1进入结算页 2进入购物车 */
      // return router.push(props.bundle.buyType == 1 ? '/checkouts/' + useCookie('okey').value : '/cart')
      return !cod && router.push('/checkouts/' + useCookie('okey').value)
    }
    notification.error({
      title: data?.msg,
      duration: 3000,
      keepAliveOnHover: true,
      content: () => data?.msg,
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

/**
 * 如何在单页模式下
 * 先验证表单是否填写完整，再提交捆绑组合销售信息，最后创建订单
 */
const pluginOnSubmit = inject<(e: any) => Promise<void>>('pluginOnSubmit', (e: any) => Promise.resolve())

/**  点击立即购买按钮 */
const submitOrder = async () => {
  if (cod) {
    return await pluginOnSubmit(buyNow)
  }
  buyNow()
}
</script>

<style></style>
