<template>
  <n-spin class="w-100% px-0" :show="loading">
    <!-- pc -->
    <div class="text-black mt-86px text-[28px] font-medium leading-snug hidden md:block">
      {{ $t('myOrder.myorder') }}
    </div>
    <!-- 移动 -->
    <div class="mt26px block md:!hidden px20px md:px0">
      <div class="w100% font-500 text-center text-black text-18px">{{ $t('myOrder.myorder') }}</div>
    </div>
    <!-- PC端 -->
    <div class="w-full">
      <div class="px-25px m-y20px md:m-y40px">
        <n-tabs class="md:flex-center" v-model:value="ordernav" type="line">
          <n-tab v-for="i in tagList" :name="i.value">{{ i.label }}</n-tab>
        </n-tabs>
      </div>
      <!-- 表头 -->
      <div class="w-full hidden md:block">
        <n-table :bordered="false" :bottom-bordered="false" :single-column="true" :single-line="true" class="mb-20px">
          <thead>
            <tr>
              <th class="w-20% !text-center" style="background-color: transparent">{{ $t('myOrder.goodsinfo') }}</th>
              <th class="w-15% !text-center" style="background-color: transparent">{{ $t('myOrder.goods_num') }}</th>
              <th class="w-15% !text-center" style="background-color: transparent">{{ $t('myOrder.goods_price') }}</th>
              <th class="w-15% !text-center" style="background-color: transparent">{{ $t('myOrder.goods_total') }}</th>
              <th class="w-15% !text-center" style="background-color: transparent">{{ $t('myOrder.order_status') }}</th>
              <th class="w-20% !text-center" style="background-color: transparent">
                {{ $t('myOrder.transactionOperation') }}
              </th>
            </tr>
          </thead>
        </n-table>
        <!-- 列表内容 -->
        <n-list bordered class="!rd-6px w-full hidden md:block mb-20px" :key="item.osn" v-for="item in orderlist">
          <template #header class="w-full" style="padding-top: 8px; padding-bottom: 8px">
            <div class="w-full flex justify-between">
              <div class="text-black text-14px font-normal leading-normal tracking-wide">
                {{ $t('myOrder.order') }}：{{ item?.osn }}
              </div>
              <div class="text-black text-14px font-normal leading-normal tracking-wide">{{ item?.time }}</div>
            </div>
          </template>
          <n-list-item class="w-full !p-x0">
            <n-grid :cols="100" class="w-full">
              <n-grid-item :span="50">
                <n-grid :cols="50" class="w-full py15px" v-for="i in item?.products" :key="i.id">
                  <n-grid-item :span="20">
                    <div class="flex justify-between p-l20px">
                      <div class="w-60px h-60px">
                        <sps-img class="wh-full rounded" :src="i.thumbs" />
                      </div>
                      <div class="w-60% flex-col flex-grow ml-10px justify-around">
                        <n-ellipsis
                          :line-clamp="1"
                          class="w100% text-neutral-800 text-sm font-normal leading-normal tracking-wide"
                        >
                          {{ i.pro_title ? i.pro_title : i.title }}
                        </n-ellipsis>
                        <div class="text-neutral-400 text-sm font-normal leading-normal tracking-wide">
                          {{ i.opt_title }}
                        </div>
                      </div>
                    </div>
                  </n-grid-item>
                  <n-grid-item :span="15">
                    <div class="text-black text-sm font-normal flex-center h-100% leading-normal tracking-wide">
                      X{{ i.quantity ? i.quantity : i.num }}
                    </div>
                  </n-grid-item>
                  <n-grid-item :span="15">
                    <div class="text-black text-sm font-normal flex-center h-100% leading-normal tracking-wide">
                      {{ item?.currency?.symbol_left + i.price + item?.currency?.symbol_right }}
                    </div>
                  </n-grid-item>
                </n-grid>
              </n-grid-item>
              <n-grid-item :span="50">
                <n-grid :cols="50" class="wh-full">
                  <n-grid-item span="15" class="h-full">
                    <div class="flex-center flex-col h-full">
                      <div class="text-black text-sm font-normal mb-4px flex-center leading-normal tracking-wide">
                        {{ item?.total }}
                      </div>
                      <!-- 暂时没有字段不显示，后续对接后台给了字段再加上 -->
                      <!-- <n-popover trigger="hover">
                        <template #trigger>
                          <div class=" color-#8D8D8D text-14px py-2px">{{ $t('myOrder.detailsExpenses') }}</div>
                        </template>
                        <div>
                          <div class=" color-#8D8D8D text-14px py-2px">{{ $t('myOrder.tip') }}：$12</div>
                          <div class=" color-#8D8D8D text-14px py-2px">{{ $t('myOrder.freight') }}：$12</div>
                          <div class=" color-#8D8D8D text-14px py-2px">{{ $t('myOrder.freightInsurance') }}：$12</div>
                        </div>
                      </n-popover> -->
                    </div>
                  </n-grid-item>
                  <n-grid-item span="15">
                    <div class="flex-center gap-5 h-100% flex-col">
                      <div
                        v-if="item?.status == 0"
                        class="text-red-600 text-sm font-normal leading-normal tracking-wide"
                      >
                        {{ $t('myOrder.pendingPayment') }}
                      </div>
                      <div
                        v-if="item?.status == 1"
                        class="text-#0D5FFF text-sm font-normal leading-normal tracking-wide"
                      >
                        {{ $t('myOrder.delivere') }}
                      </div>
                      <div
                        v-if="item?.status == 2"
                        class="text-#008060 text-sm font-normal leading-normal tracking-wide"
                      >
                        {{ $t('myOrder.delivered') }}
                      </div>
                      <div
                        v-if="item?.status == 3"
                        class="text-#008060 text-sm font-normal leading-normal tracking-wide"
                      >
                        {{ $t('myOrder.done') }}
                      </div>
                      <div
                        v-if="item?.status == -1"
                        class="text-#008060 text-sm font-normal leading-normal tracking-wide"
                      >
                        {{ $t('myOrder.closed') }}
                      </div>
                      <n-button
                        size="small"
                        type="tertiary"
                        @click="checkorder(item)"
                        text
                        class="text-stone-300 mt-4px"
                        v-if="item?.status"
                      >
                        {{ $t('myOrder.details') }}
                      </n-button>
                    </div>
                  </n-grid-item>
                  <n-grid-item span="20">
                    <div class="flex-center justify-around h-100%">
                      <n-button
                        text
                        tag="a"
                        strong
                        secondary
                        type="success"
                        v-if="item?.status == 0"
                        class="p-x24px p-y9px"
                      >
                        <nuxt-link :href="'/checkouts/' + item?.okey">
                          {{ $t('myOrder.payNow') }}
                        </nuxt-link>
                      </n-button>
                      <n-button
                        strong
                        size="small"
                        secondary
                        type="primary"
                        @click="router.push('/')"
                        v-if="item?.status != 0"
                        class="p-x24px p-y9px"
                      >
                        {{ $t('myOrder.moregoods') }}
                      </n-button>
                    </div>
                  </n-grid-item>
                </n-grid>
              </n-grid-item>
            </n-grid>
          </n-list-item>
        </n-list>
      </div>
    </div>
    <!-- 移动端 -->
    <div class="block md:hidden w-full px20px md:px0">
      <n-card v-for="item in orderlist" :key="item.okey" style="box-shadow: none; border: 0" class="mb-15px">
        <div class="w-full justify-between items-center inline-flex" @click="checkorder(orderlist)">
          <div class="text-zinc-500 text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.order') }}：{{ item?.osn }}
          </div>
          <div v-if="item?.status == 0" class="text-red-600 text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.payNow') }}
          </div>
          <div v-if="item?.status == 1" class="text-#0D5FFF text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.payed') }}
          </div>
          <div v-if="item?.status == 2" class="text-#008060 text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.delivered') }}
          </div>
          <div v-if="item?.status == 3" class="text-#008060 text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.done') }}
          </div>
          <div v-if="item?.status == -1" class="text-#008060 text-xs font-normal leading-normal tracking-wide">
            {{ $t('myOrder.cancelled') }}
          </div>
        </div>
        <div
          @click="checkorder(item)"
          class="w-100% justify-between items-center inline-flex pb-20px b-b b-b-color-#E1E3E5 my-12px"
          v-for="i in item?.products"
          :key="i.id"
        >
          <div class="self-stretch justify-start items-center gap-2 flex">
            <div class="w-[46px] h-[46px]">
              <sps-img class="w-[46px] h-[46px] rounded" :src="i.thumbs" />
            </div>
            <div class="flex-col justify-start items-start gap-0.5 inline-flex">
              <div class="text-neutral-800 text-sm font-normal leading-normal tracking-wide">
                {{ i.pro_title ? i.pro_title : i.title }}
              </div>
              <div class="text-neutral-400 text-xs font-normal leading-normal tracking-wide">{{ i.opt_title }}</div>
            </div>
          </div>
          <div class="flex-col justify-start items-end gap-1.5 inline-flex">
            <div class="text-black text-sm font-normal leading-normal tracking-wide">
              X{{ i.quantity ? i.quantity : i.num }}
            </div>
            <div class="text-black text-sm font-normal leading-normal tracking-wide">
              {{ item?.currency.symbol_left + i.price + item?.currency?.symbol_right }}
            </div>
          </div>
        </div>
        <div class="w-full justify-between items-center inline-flex">
          <div class="text-black text-sm font-normal tracking-wide">{{ $t('myOrder.goods_total') }}</div>
          <div class="text-black text-sm font-normal tracking-wide">{{ item?.total }}</div>
        </div>
        <div class="w-full justify-between items-center inline-flex pt14px">
          <div class="text-stone-300 text-xs font-normal leading-normal tracking-wide">{{ item?.time }}</div>
          <n-button
            text
            tag="a"
            :href="'/checkouts/' + item?.okey"
            strong
            secondary
            size="large"
            type="primary"
            v-if="item?.status == 0"
            style="height: 30px"
            class="p-x13px"
          >
            {{ $t('myOrder.payNow') }}
          </n-button>
          <n-button
            strong
            secondary
            size="large"
            type="primary"
            v-if="item?.status != 0"
            @click="router.push('/')"
            style="height: 30px"
            class="p-x13px"
          >
            {{ $t('myOrder.moregoods') }}
          </n-button>
        </div>
      </n-card>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import { shopOrderlist } from '@/services/api/index'
const router = useRouter()
defineProps<{
  datas: any
}>()
const { t } = useI18n()

const ordernav = ref<string>('all')
const datalist = ref<any>([])

/**  数据过滤列表 */
const orderlist = computed(() => {
  return datalist.value?.filter((i: any) => {
    if (ordernav.value == 'all') {
      return true
    }
    return i.status == ordernav.value
  })
})

/**  加载状态 */
const loading = ref(false)

/**  订单标签 */
const tagList = computed(() => {
  return [
    {
      label: t('myOrder.myorder'),
      value: 'all',
    },
    {
      label: t('myOrder.pending'),
      value: '0',
    },
    {
      label: t('myOrder.delivere'),
      value: '1',
    },
    {
      label: t('myOrder.delivered'),
      value: '2',
    },
    {
      label: t('myOrder.done'),
      value: '3',
    },
    {
      label: t('myOrder.closed'),
      value: '-1',
    },
  ]
})

/**  获取订单数据 */
const getorderlist = async () => {
  loading.value = true
  try {
    const { data } = await shopOrderlist()
    if (data) {
      if (data.statue == -1) {
        navigateTo('/account/login')
      }
      datalist.value = data?.data
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**  选择标签 */
const chooseNav = (type: string) => {
  ordernav.value = type
}

/**  查看订单详情 */
const checkorder = (item: { osn: string; okey: string }) => {
  router.push({ path: '/orders/' + item.osn + '/' + item.okey })
}

/** 初始化数据 */
getorderlist()
</script>

<style scoped>
:deep(.n-list.n-list--bordered .n-list__header) {
  padding: 8px 20px;
}
</style>
