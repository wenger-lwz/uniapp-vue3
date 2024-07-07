<template>
  <div v-if="LogisticsData?.data" class="mb-30px">
    <div class="text-black text-base font-600 leading-normal tracking-wide mb-20px">
      {{ $t('goodsOrder.logistics') }}
    </div>
    <div class="flex flex-col justify-center text-sm leading-6 text-black">
      <section class="flex flex-col items-start p-5 w-full rounded bg-stone-50 max-md:max-w-full overflow-hidden">
        <p>
          {{ $t('goodsOrder.logisticsName') }}：{{ LogisticsData.data.trackInfo.tracking.providers[0].provider?.name }}
        </p>
        <p class="mt-5">{{ $t('goodsOrder.logisticsNumber') }}：{{ LogisticsData.data.number }}</p>
        <div class="flex gap-3.5 justify-center mt-5 tracking-wide whitespace-nowrap text-stone-500">
          <p>{{ $t('goodsOrder.logisticsTime') }}</p>
          <n-button text @click="show = !show">
            <icon-arrow
              class="shrink-0 my-auto w-4 aspect-square transition-transform duration-300 ease-in-out"
              :style="{
                transform: `rotate(${show ? 90 : 0}deg)`,
              }"
            />
          </n-button>
        </div>
        <n-collapse-transition :show="show">
          <div class="overflow-hidden mt-6 pb-12">
            <div class="flex gap-2.5 leading-[171%]">
              <div class="shrink-0 my-auto w-2 h-2 rounded-full bg-zinc-600 line" aria-hidden="true"></div>
              <p class="flex-auto">
                {{ formatted(LogisticsData.data.trackInfo.latestEvent.timeIso as unknown as number) }}
                {{ LogisticsData.data.trackInfo.latestEvent.location }}
                {{ LogisticsData.data.trackInfo.latestEvent.description }}
              </p>
            </div>
            <div
              v-for="item in LogisticsData.data.trackInfo.tracking.providers[0].events"
              :key="item.timeIso"
              class="flex gap-2.5 pt-8 leading-[171%] text-neutral-400"
            >
              <div class="shrink-0 my-auto w-2 h-2 rounded-full bg-neutral-300 line" aria-hidden="true"></div>
              <p class="flex-auto">
                {{ formatted(item.timeIso) }}
                {{ item.location }}
                {{ item.description }}
              </p>
            </div>
          </div>

          <n-button @click="toggle" size="large" text class="tracking-wide text-stone-500 max-md:mt-10">
            {{ $t('goodsOrder.more') }}
          </n-button>
        </n-collapse-transition>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { getLogisticsAPI } from '~/services/api'
const { locale } = useI18n()
const formatted = (date: number) => useDateFormat(date, 'YYYY-MM-DD HH:mm:ss', { locales: locale.value }).value
defineComponent({
  name: 'LogisticsTracking',
})

const storeShop = useThemeEditorStore()

const route = useRoute()

/**  获取物流 */
const { data: LogisticsData } = await getLogisticsAPI({
  storeId: storeShop.page?.shop.id,
  orderNo: route.params.all[0],
})

/**  是否展开状态 */
const show = ref(false)

/**  展开/折叠 */
const toggle = () => {
  show.value = !show.value
}
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 2px;
    height: 9999px;
    background: #d9d9d9;
    transform: translate(-50%);
  }
}
</style>
