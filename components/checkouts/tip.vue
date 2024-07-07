<template>
  <n-modal
    v-model:show="payNow"
    class="custom-card zf_dia bg-#F7F7F7 md:pt40px md:pb80px p-15px rd-24px w-70% md:w-790px"
    preset="card"
    size="huge"
    :bordered="false"
  >
    <div class="w-100% flex flex-col justify-center items-center text-24px font-600">{{ msg?.stateTitle }}</div>
    <div class="md:py-80px py-20px flex flex-col justify-center items-center">
      <n-progress :status="msg.status" type="circle" :percentage="msg?.percentage" :processing="true" />
    </div>
    <div class="color-#677586 text-16px flex flex-col justify-center items-center">
      <a href="" class="text-blue-500">{{ $t('checkout.refresh') }}</a>
    </div>
    <div class="w-100% flex flex-col justify-center items-center text-16px font-600 text-slate-500 text-base">
      {{ msg?.stateTitleMsg }}
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import type { Status } from 'naive-ui/es/progress/src/interface'

const payNow = defineModel<boolean>()
defineProps<{
  /**  提示消息 */
  msg: {
    /**  标题 */
    stateTitle: string
    /**  信息 */
    stateTitleMsg: string
    /**  进度 */
    percentage: number
    /**  状态 */
    status: Status
  }
}>()
</script>

<style></style>
