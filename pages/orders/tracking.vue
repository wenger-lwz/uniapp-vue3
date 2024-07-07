<template>
  <div class="flex-col justify-center items-center py-40">
    <div class="w-100% md:w-[450px] h-[464px] flex-col justify-start items-center">
      <div class="text-black text-[36px] font-semibold capitalize mb-[76px]">{{ $t('tracking.title') }}</div>
      <n-form
        :show-label="false"
        :model="form"
        :rules="ordersTrackRules"
        ref="formRef"
        class="flex-col justify-start items-center flex w-full"
      >
        <n-form-item style="--n-feedback-height: 30px" path="number">
          <div class="flex-col justify-start items-start gap-20px flex w-[303px] md:w-[450px]">
            <p class="text-black text-base font-medium capitalize">{{ $t('tracking.number') }}</p>
            <n-input
              v-model:value="form.number"
              :placeholder="$t('tracking.inputNumber')"
              size="large"
              class="w-full h-[46px] rounded"
            />
          </div>
        </n-form-item>
        <n-form-item style="--n-feedback-height: 30px" path="email_phone">
          <div class="flex-col w-[303px] md:w-[450px] justify-start items-start gap-20px flex">
            <p class="text-black text-base font-medium capitalize">{{ $t('tracking.emailAndPhone') }}</p>
            <n-input
              v-model:value="form.email_phone"
              :placeholder="$t('tracking.inputEmailAndPhone')"
              size="large"
              class="w-full h-[46px] rounded"
            />
          </div>
        </n-form-item>
        <n-button
          @click="orderSearch"
          :loading="loading"
          class="w-[303px] md:w-[450px] h-[46px] bg-emerald-700 rounded border"
          type="primary"
        >
          {{ $t('tracking.search') }}
        </n-button>
        <nuxt-link to="/account/orders" class="text-black text-sm font-normal capitalize mt-30px">
          {{ $t('tracking.history') }}
        </nuxt-link>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage, type FormInst } from 'naive-ui'
import { orderSearchAPI } from '@/services/api'
import { ordersTrackRules } from '@/utils/form'
const message = useMessage()

/**
 *   订单查询按钮loading状态
 */
const loading = ref(false)

/**
 * 订单查询表单
 */
const form = reactive({
  number: '',
  email_phone: '',
})

/**
 * 订单实例对象
 */
const formRef = ref<FormInst>()

/**
 * 查询事件
 *
 */
const orderSearch = async () => {
  formRef.value?.validate(async (error) => {
    if (!error) {
      loading.value = true
      try {
        const { data } = await orderSearchAPI(form)
        if (data?.url) {
          window.open(data.url, '_blank')
        } else {
          message.error(data?.msg)
        }
      } catch (e) {
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style></style>
