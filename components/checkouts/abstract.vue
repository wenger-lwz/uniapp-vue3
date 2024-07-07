<template>
  <div
    v-if="goodsOverview.length"
    class="px-20px md:bg-#F9F9F9 w-100% md:w-75% md:pt50px md:pb68px md:pl58px md:pr58px md:ml50px"
  >
    <div class="text-black text-[16px] font-semibold capitalize">{{ $t('checkout.orderSummary') }}</div>
    <div
      class="flex w-100% border-b border-color-#E1E3E5 pb-20px pt15px md:py28px"
      v-for="item in goodsOverview"
      :key="item.pid"
    >
      <div class="w-[100px]">
        <sps-img :width="100" class="w-[100px] rounded aspect-[100/133]" :src="item.thumbs" />
      </div>
      <div class="ml-14px flex-col flex-grow-1 justify-between">
        <div class="flex-col justify-start w-100%">
          <n-ellipsis
            class="text-zinc-800 text-sm font-normal leading-normal tracking-wide break-all"
            :tooltip="false"
            :line-clamp="2"
          >
            {{ item.title }}
          </n-ellipsis>
          <div class="text-neutral-400 mt8px text-sm font-normal leading-normal tracking-wide">
            {{ item.opt_title }}
          </div>
        </div>
        <div class="flex justify-between w-100%">
          <div class="text-neutral-400 text-sm font-normal leading-normal tracking-wide">x{{ item.num }}</div>
          <div class="text-black text-sm font-normal leading-normal tracking-wide">{{ priceFormat(item.price) }}</div>
        </div>
      </div>
    </div>
    <div class="flex-col w-100% border-b border-color-#E1E3E5 py20px">
      <!-- 小计 -->
      <n-space justify="space-between" class="w-100% mb20px">
        <span class="text-black text-sm font-normal leading-normal tracking-wide">{{ $t('checkout.subtotal') }}</span>
        <span>{{ priceFormat(price?.product_price) }}</span>
      </n-space>

      <!-- 折扣 -->
      <n-space v-if="price?.coupon_price" justify="space-between" class="w-100% mb20px">
        <span class="text-black text-sm font-normal leading-normal tracking-wide">{{ $t('checkout.discount') }}</span>
        <span>-{{ priceFormat(price?.coupon_price) }}</span>
      </n-space>

      <!-- 运费 -->
      <n-space justify="space-between" class="w-100% mb20px">
        <span class="text-black text-sm font-normal leading-normal tracking-wide">{{ $t('checkout.freight') }}</span>
        <span>{{ priceFormat(price?.shipp_price) }}</span>
      </n-space>

      <!-- 货运保险 -->
      <n-space v-if="price?.insurance != '0' && price?.insurance > 0" justify="space-between" class="w-100% mb20px">
        <span class="text-black text-sm font-normal leading-normal tracking-wide">
          {{ $t('checkout.freightInsurance') }}
        </span>
        <span>{{ priceFormat(price?.insurance) }}</span>
      </n-space>

      <!-- 小费 -->
      <n-space v-if="price?.tips != '0' && price?.tips > 0" justify="space-between" class="w-100% mb20px">
        <span class="text-black text-sm font-normal leading-normal tracking-wide">{{ $t('checkout.addTip') }}</span>
        <span>{{ priceFormat(price.tips) }}</span>
      </n-space>
    </div>

    <!-- 优惠券 -->
    <n-space :wrap-item="false" vertical align="start" class="w-100% border-b border-color-#E1E3E5 py-30px">
      <span class="text-black text-sm font-normal leading-normal tracking-wide min-w-50px">
        {{ $t('checkout.coupon') }}
      </span>
      <div class="flex w-100%">
        <n-input-group>
          <n-input
            class="w-full"
            size="large"
            v-model:value="couponsCode.code"
            :placeholder="t('checkout.discount_code_input')"
            wrapper-class="grow"
          />
          <n-button
            size="large"
            type="primary"
            :disabled="!couponsCode.code"
            :loading="validationCodeLoading"
            @click="validationCode"
          >
            {{ t('checkout.apply') }}
          </n-button>
        </n-input-group>
      </div>
    </n-space>

    <!-- 总计 -->
    <n-space justify="space-between" class="w-100% mt20px">
      <span class="text-black font-500 leading-normal md:text-16px md:font-600 text-14px">
        {{ $t('checkout.total') }}
      </span>
      <span class="text-black font-500 leading-normal md:text-16px md:font-600 text-14px">
        {{ priceFormat(price.total_price) }}
      </span>
    </n-space>
    <n-space justify="space-between" class="w-100% mt20px rich">
      <p v-html="checkouttips"></p>
    </n-space>

    <!-- 完成订单按钮 -->
    <div class="flex-center w-100% mt-37px px-10px">
      <n-button type="primary" @click="$emit('submitOrder')" style="width: 100%" class="block md:hidden flex">
        {{ current == 3 ? $t('checkout.confirmOrder') : $t('checkout.Next') }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'
import { verificationCodeAPI } from '~/services/api'
const { t } = useI18n()
const notification = useNotification()
const emit = defineEmits<{
  (e: 'initData'): void
  (e: 'submitOrder'): void
}>()
const { price } = storeToRefs(useCheckoutsStore())
const props = defineProps<{
  /**  订单信息 */
  goodsOverview: any
  /**  自定义订单HTML */
  checkouttips: string | undefined
  /**  货币符 */
  monely: string | undefined
  /**  当前步骤 */
  current: number | undefined
}>()

/**  优惠码code */
const couponsCode = ref({
  code: '',
  key_o,
})

/**  优惠码按钮状态 */
const validationCodeLoading = ref(false)

/**
 * 验证优惠码
 */
const validationCode = async () => {
  validationCodeLoading.value = true
  try {
    const { data } = await verificationCodeAPI(couponsCode.value)
    if (data?.state == 'ok') {
      notification.success({
        title: t('checkout.tip'),
        content: t('checkout.success'),
        duration: 1500,
      })
      price.value = data?.prices
      // 重新获取数据
      // emit('initData')
      // goodDetail()
    } else {
      notification.error({
        title: t('checkout.tip'),
        content: t('checkout.code_valid'),
        duration: 1500,
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    validationCodeLoading.value = false
  }
}

/**  用户语言 */
const langauge = useCookie('langauge')

/**
 *   封装价格函数
 *  @description  价格
 *  @param {string} price 价格
 *  @return {string}
 *
 */
const priceFormat = (price: number): string => {
  return new Intl.NumberFormat(langauge.value || 'en', {
    style: 'currency',
    currency: props.monely ?? 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(price)
}
</script>

<style></style>
