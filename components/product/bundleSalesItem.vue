<template>
  <p class="text-center text-black text-lg font-bold leading-snug text-left">{{ bundle.title }}</p>
  <section
    class="flex gap-5 justify-between pt-30px pb-60px px-40px mt-20px whitespace-nowrap rounded md:border border-solid border-none border-zinc-200 max-md:flex-wrap max-md:px-5"
  >
    <!-- 左侧商品 -->
    <div class="flex flex-col md:flex-row self-start text-sm leading-5 w-full">
      <n-scrollbar x-scrollable class="w-full">
        <article
          v-for="(item, index) in bundle.products"
          :key="index"
          class="w-full flex gap-5 justify-between font-medium text-center text-black"
        >
          <div class="flex-col gap-8px max-w-[143px]">
            <sps-img
              :src="item.thumbs"
              :alt="item.handle"
              loading="lazy"
              class="self-center aspect-[1.11] w-[143px] rounded object-cover"
            />
            <p class="mt-4 max-w-[143px] overflow-hidden text-ellipsis text-nowrap">{{ item.title }}</p>
            <n-select
              :consistent-menu-width="false"
              class="w-full"
              v-model:value="item.vid"
              :options="coverSelectData(item)"
            />
            <div class="flex-auto self-start font-medium tracking-wide text-red-600">
              {{ formatPrice(item.variants.find((i) => i.id == item.vid)?.price as unknown as number) }}
            </div>
          </div>
        </article>
      </n-scrollbar>
      <!-- 右侧编辑 -->
      <div class="flex-col gap-5 justify-center md:flex-row">
        <hr class="w-full color-zinc-200 mt-22px" />
        <div class="flex flex-col my-auto flex-center md:justify-between">
          <p class="text-base tracking-wider leading-6 text-zinc-700 flex-justify-between flex w-full">
            <span>{{ $t('product.preferential') }} ：</span>
            <!--     "discountType":  //优惠类型 1优惠百分比 2优惠固定值 3指定组合总价格 4免组合产品最低价 5免邮费 -->
            <!-- 1优惠百分比 -->
            <span v-if="bundle.discountType == 1" class="text-zinc-700">-{{ bundle.discountValue }}%</span>
            <!-- 2优惠固定值 -->
            <span v-if="bundle.discountType == 2" class="text-zinc-700">{{ formatPrice(bundle.discountValue) }}</span>
            <!-- 3指定组合总价格 -->
            <span v-if="bundle.discountType == 3" class="text-zinc-700">{{ formatPrice(bundle.discountValue) }}</span>
            <!-- 4免组合产品最低价 -->
            <span v-if="bundle.discountType == 4" class="text-zinc-700">{{ formatPrice(minPriceProduct) }}</span>
            <!-- 5免邮费 -->
            <span v-if="bundle.discountType == 5" class="text-zinc-700">{{ $t('product.freeShipping') }}</span>
          </p>
          <div class="flex gap-3 justify-between mt-5 w-full">
            <p class="grow text-base tracking-wider leading-6 text-red-600 flex-justify-between flex w-full">
              {{ $t('product.total') }} ：
              <span v-if="bundle.discountType == 1" class="text-red-600">
                {{ formatPrice((totalPrice * bundle.discountValue) / 100) }}
              </span>
              <span
                v-if="bundle.discountType == 2 || bundle.discountType == 3 || bundle.discountType == 4"
                class="text-red-600"
              >
                {{ formatPrice(totalPrice - bundle.discountValue) }}
              </span>
              <span v-if="bundle.discountType == 5" class="text-red-600">{{ formatPrice(totalPrice) }}</span>
            </p>
            <p v-if="bundle.discountType != 5" class="my-auto text-xs leading-5 text-stone-300 hidden md:block">
              {{ formatPrice(totalPrice) }}
            </p>
          </div>
          <hr class="w-full color-zinc-200 my-12px md:hidden block" />

          <n-button
            :loading="bundle?.loading"
            @click="submitOrder(bundle)"
            type="primary"
            size="large"
            class="justify-center self-center mt-7 text-sm leading-5 text-center text-white rounded w-175px h-40px"
          >
            {{ $t('product.buyNow') }}
          </n-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'
import { BundleBuyAPI } from '~/services/api'

const props = defineProps<{
  bundle: Product.BundleSales
}>()
const cod = inject('cod', false)
const router = useRouter()
const notification = useNotification()
/**  立即购买 */
const buyNow = async (item: Product.BundleSales) => {
  item.loading = true
  let pvids = {}
  item.products?.forEach((item) => {
    pvids[item.id] = item.vid
  })

  try {
    const { data } = await BundleBuyAPI({
      source: 'pbundle',
      okey: useCookie('okey').value as any,
      inum: item.id,
      pvids: JSON.stringify(pvids),
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
  } finally {
    item.loading = false
  }
}

/**
 * 如何在单页模式下
 * 先验证表单是否填写完整，再提交捆绑组合销售信息，最后创建订单
 */
const pluginOnSubmit = inject<(e: any) => Promise<void>>('pluginOnSubmit', (e: any) => Promise.resolve())

/**  点击立即购买按钮 */
const submitOrder = async (item: Product.BundleSales) => {
  if (cod) {
    return await pluginOnSubmit(buyNow.bind(null, item))
  }
  buyNow(item)
}

/**  转换select 选项函数 */
const coverSelectData = (data: Product.Products[]) => {
  return data?.variants.map((item: any) => {
    return {
      label: item.title,
      value: item.id,
    }
  })
}

/**  计算总价 */
const totalPrice = computed(() => {
  return props.bundle.products.reduce((pre, cur) => {
    return pre + +cur?.variants.find((v) => v.id === cur.vid)?.price
  }, 0)
})

/**  计算选择商品中的最低价 */
const minPriceProduct = computed(() => {
  return props.bundle.products.reduce((pre, cur) => {
    return pre < +cur?.variants.find((v) => v.id === cur.vid)?.price
      ? pre
      : +cur?.variants.find((v) => v.id === cur.vid)?.price
  })
})
</script>

<style></style>
