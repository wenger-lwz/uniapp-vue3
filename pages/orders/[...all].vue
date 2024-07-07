<template>
  <div class="md:max-w-1200px m-a w-100% pb-100px md:px-20px" v-if="orderDetail && Object.keys(orderDetail).length">
    <div class="flex justify-between items-center p-15px block md:hidden b-b-1 b-#E1E3E5">
      <svg-icon class="mr-15px w18px h18px" name="back" />
      <div class="text-center text-black text-lg font-normal">{{ $t('myOrder.order') }}</div>
      <svg-icon class="mr-15px w18px h18px" name="" />
    </div>
    <div class="p-x-20px md:p-x-0" v-if="Object.keys(orderDetail).length">
      <n-space
        justify="space-between"
        align="center"
        class="w100% mt24px md:mt-54px md:mb-24px pb-20px md:b-b-1 b-#E1E3E5"
      >
        <div class="text-black text-base font-medium leading-normal tracking-wide">{{ $t('myOrder.order') }}</div>
        <div class="text-neutral-400 text-12px md:text-sm font-normal leading-tight">
          {{ $t('myOrder.order_id') }}：{{ orderDetail.order_sn }}
        </div>
      </n-space>
      <div class="flex items-center mb20px" v-for="(item, index) in orderDetail.product" :key="index">
        <sps-img class="w-[118px] rounded aspect-ratio-1/1" style="aspect-ratio: 1/1" :src="item.pro_thumbs" />
        <div class="grow ml-16px flex-col h-100% justify-between">
          <n-ellipsis :line-clamp="1" class="text-neutral-800 text-base font-medium leading-normal">
            {{ item.pro_title }}
          </n-ellipsis>
          <n-ellipsis :line-clamp="2" class="text-neutral-600 text-sm font-normal leading-normal mt-10px mb-10px">
            {{ item.attrs_title }}
          </n-ellipsis>
          <div class="flex justify-between items-center">
            <span class="text-neutral-400 text-sm font-normal leading-normal tracking-wide">X{{ item.quantity }}</span>
            <span class="text-zinc-900 text-base font-medium leading-normal tracking-wide">
              {{ orderDetail.currencys.symbol_left + item.total + orderDetail.currencys.symbol_right }}
            </span>
          </div>
        </div>
      </div>
      <n-card class="bg-stone-50 mb-20px mt-38px text-14px px-16px" style="box-shadow: none; border: none">
        <div class="flex justify-between items-center" v-if="orderDetail.shipp_price != 0">
          <span>{{ $t('myOrder.freight') }}</span>
          <span>
            {{ orderDetail.currencys.symbol_left + orderDetail.shipp_price + orderDetail.currencys.symbol_right }}
          </span>
        </div>
        <div class="flex justify-between items-center my-20px" v-if="orderDetail.insurance != 0">
          <span>{{ $t('myOrder.freightInsurance') }}</span>
          <span>
            {{ orderDetail.currencys.symbol_left + orderDetail.insurance + orderDetail.currencys.symbol_right }}
          </span>
        </div>
        <div class="flex justify-between items-center my-20px" v-if="orderDetail.tips != 0">
          <span>{{ $t('myOrder.tip') }}</span>
          <span>{{ orderDetail.currencys.symbol_left + orderDetail.tips + orderDetail.currencys.symbol_right }}</span>
        </div>
        <div class="flex justify-between items-center my-20px" v-if="orderDetail.coupon_price != 0">
          <span>{{ $t('checkout.discount') }}</span>
          <span>
            {{ orderDetail.currencys.symbol_left + orderDetail.coupon_price + orderDetail.currencys.symbol_right }}
          </span>
        </div>
        <div class="flex justify-between items-center" v-if="orderDetail.tax != 0">
          <span>{{ $t('myOrder.tax') }}</span>
          <span>{{ orderDetail.currencys.symbol_left + orderDetail.tax + orderDetail.currencys.symbol_right }}</span>
        </div>
      </n-card>
      <n-card style="box-shadow: none; border: none" class="px16px bg-stone-50 mb-30px text-16px font-600">
        <div class="flex justify-between items-center">
          <span class="text-16px">{{ $t('myOrder.goods_total_price') }}</span>
          <span class="text-16px">
            {{ orderDetail.currencys.symbol_left + orderDetail.total_price + orderDetail.currencys.symbol_right }}
          </span>
        </div>
      </n-card>
      <div class="text-black text-base font-600 leading-normal tracking-wide">{{ $t('myOrder.order_confirm') }}</div>
      <n-card style="box-shadow: none; border: none" class="bg-stone-50 mt-20px mb-30px px-6px">
        <div class="text-stone-500 text-sm font-normal leading-normal tracking-wide">
          {{ $t('myOrder.order_tips') }}
        </div>
      </n-card>
      <OrdersLogistics />
      <div class="text-black text-base font-600 leading-normal tracking-wide">{{ $t('myOrder.coustomer') }}</div>
      <n-grid :x-gap="19" :y-gap="8" cols="1 750:3">
        <n-grid-item class="h100%">
          <n-card
            style="box-shadow: none; border: none; height: 83%"
            size="medium"
            content-style="display: flex;flex-direction: column;justify-content: space-between;"
            class="bg-stone-50 mt-20px md:mb-30px md:py20px md:px16px px-6px"
          >
            <div class="text-black text-base font-normal py5px mb-5px md:mb10px leading-normal tracking-wide">
              {{ $t('myOrder.contacInfor') }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              {{ $t('goodsOrder.name') }}：{{ orderDetail.contact.last_name + ' ' + orderDetail.contact.first_name }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              {{ orderDetail.contact.email }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              {{ orderDetail.contact.tel }}
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item class="h100%">
          <n-card
            style="box-shadow: none; border: none; height: 83%"
            size="medium"
            content-style="display: flex;flex-direction: column;justify-content: space-between;"
            class="bg-stone-50 mt10px md:mt-20px md:mb-30px md:py20px md:px16px px-6px"
          >
            <div class="text-black text-base font-normal py5px mb-5px md:mb10px leading-normal tracking-wide">
              {{ $t('myOrder.order_address') }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              {{ orderDetail.contact.address }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide w-100%">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-ellipsis :line-clamp="1">
                    {{
                      orderDetail.contact.country +
                      '/' +
                      orderDetail.contact.province +
                      orderDetail.contact.city +
                      '/' +
                      orderDetail.contact.zipcode
                    }}
                  </n-ellipsis>
                </template>
                <span>
                  {{
                    orderDetail.contact.country +
                    '/' +
                    orderDetail.contact.province +
                    orderDetail.contact.city +
                    '/' +
                    orderDetail.contact.zipcode
                  }}
                </span>
              </n-popover>
            </div>
            <div class="text-stone-500 text-sm font-normal py5px flex justify-between items-center w-100%">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-ellipsis :line-clamp="1">
                    {{ orderDetail.contact.email }}
                  </n-ellipsis>
                </template>
                <span>{{ orderDetail.contact.email }}</span>
              </n-popover>
              <!-- <span>{{orderDetail.contact.email}}</span> -->
              <span class="inline-block w50% text-right">{{ orderDetail.contact.tel }}</span>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item class="h100%">
          <n-card
            style="box-shadow: none; border: none; height: 83%"
            size="medium"
            content-style="display: flex;flex-direction: column;justify-content: space-between;"
            class="bg-stone-50 mt10px md:mt-20px mb-30px md:py20px md:px16px px-6px"
          >
            <div class="text-black text-base font-normal py5px mb-5px md:mb10px leading-normal tracking-wide">
              {{ $t('goodsOrder.billingAddress') }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              {{ orderDetail.bill.address }}
            </div>
            <div class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-ellipsis :line-clamp="1">
                    {{
                      orderDetail.bill.country +
                      '/' +
                      orderDetail.bill.province +
                      orderDetail.bill.city +
                      '/' +
                      orderDetail.bill.zipcode
                    }}
                  </n-ellipsis>
                </template>
                <span>
                  {{
                    orderDetail.bill.country +
                    '/' +
                    orderDetail.bill.province +
                    orderDetail.bill.city +
                    '/' +
                    orderDetail.bill.zipcode
                  }}
                </span>
              </n-popover>
            </div>
            <div
              class="text-stone-500 text-sm font-normal py5px leading-normal tracking-wide flex justify-between items-center w-100%"
            >
              <!--   隐藏billing 的邮箱 -->
              <!-- <n-popover trigger="hover">
                <template #trigger>
                  <n-ellipsis :line-clamp="1">
                    {{ orderDetail.bill.email }}
                  </n-ellipsis>
                </template>
                <span>{{ orderDetail.bill.email }}</span>
              </n-popover> -->
              <span class="block">{{ orderDetail.bill.tel }}</span>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
      <div class="text-black text-base font-600 leading-normal tracking-wide">{{ $t('myOrder.contactUs') }}</div>
      <!-- <n-card style="box-shadow: none; border: none" class=" bg-stone-50 mt-20px mb-30px px6px">
        <div class=" text-stone-500 text-sm font-normal leading-normal tracking-wide" v-html="datas.dec"></div>
      </n-card> -->
      <div class="flex-center justify-around h-100%" v-if="orderDetail.status == '0' || 0">
        <n-button size="large" tag="a" type="success" :href="'/checkouts/' + orderDetail.okey" class="p-x24px p-y9px">
          {{ $t('payNow') }}
        </n-button>
      </div>
      <!-- 旧主题去除后,需要更改调整为spa -->
      <NuxtLink
        v-else
        :to="goBackToHome"
        :external="theme.themeKey.includes('theme')"
        replace
        style="
          margin-top: 20px;
          box-shadow: rgb(18, 18, 18) 0px 0px 0px 2px;
          font-size: 15px;
          letter-spacing: 1px;
          line-height: 18px;
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 9px 30px 11px;
          text-decoration: none solid rgb(255, 255, 255);
          border: 1px solid rgba(0, 0, 0, 0);
          border-radius: 0px;
          background-color: rgb(18, 18, 18);
          color: rgb(255, 255, 255);
          min-width: 120px;
          min-height: 45px;
          transition: box-shadow 0.1s ease 0s;
          appearance: none;
          outline: rgb(255, 255, 255) none 0px;
        "
      >
        {{ goBackToHome == '/' ? $t('goBackHome') : $t('checkout.Return') }}
      </NuxtLink>
    </div>
    <div v-else>
      <n-empty :show-description="false" class="py60px w-full">
        <template #icon style="width: 80px; height: 80px">
          <sps-img src="/image/emptyicon.png" alt="" />
        </template>
        <template #extra>
          <div class="text-center text-neutral-800 text-18px md:text-[32px] font-medium">
            {{ $t('myOrder.noData') }}
          </div>
        </template>
      </n-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrderDetailAPI } from '~/services/api'
const theme = useThemeEditorStore()

defineOptions({
  name: 'Orders',
})
const { t } = useI18n()
const create_err = useError()
const route = useRoute()
const { data } = await useAsyncData(() => getOrderDetailAPI(route.fullPath), {
  transform(data) {
    return data?.data
  },
})

// const language = useCookie('language')

// /**  设置默认语言 */
// locale.value = language.value ?? data.value?.head_data?.langs
if (data.value?.state != 'ok') {
  create_err.value = {
    statusCode: 404,
    message: 'Error page',
    statusMessage: t('checkout.noFind'),
    name: 'Error',
  }
}
const orderDetail = ref<any>([])

/**  服务端数据获取||客户端数据获取 返回数据结构不同处理 */
orderDetail.value = data.value?.data?.order_info || data.value?.order_info

if (orderDetail.value.url) {
  location.href = orderDetail.value.url
}

const router = useRouter()

/**  判断是否为订单详情页进入 */
const goBackToHome = computed(() => {
  return router.options.history.state.back != '/account/orders' ? '/' : '/account/orders'
})
</script>

<style scoped>
:deep(.n-form-item.n-form-item--top-labelled .n-form-item-label) {
  position: absolute;
  top: 18px;
  left: 20px;
  z-index: 1;
  color: #929292;
}
:deep(.n-form.n-form--inline .n-form-item) {
  position: relative;
}
:deep(.n-radio-group .n-radio-group__splitor) {
  width: 0;
}
:deep(.n-radio-group .n-radio-button.n-radio-button--checked) {
  background-color: rgba(0, 128, 96, 0.04);
  border-color: rgba(0, 128, 96, 0.2);
}
:deep(.n-form-item .n-form-item-feedback-wrapper) {
  display: none;
}
</style>
