<template>
  <n-form-item v-if="postway.length" label-width="0" path="radioGroupValue">
    <div class="w-full flex-col">
      <div class="text-16px mb-14px md:mb-20px font-600 w-100%">{{ $t('checkout.mailingMethod') }}</div>
      <n-radio-group
        v-model:value="formValue.logistics.shipping_method"
        name="radiogroup1"
        class="w100%"
        @change="setAddress('', 'post')"
      >
        <n-space vertical class="w-100%">
          <!-- 邮寄方式 -->
          <div
            v-for="(Eway, index) in postway"
            class="flex-y-center text-16px mb4px md:mb-15px flex justify-between w-100% border border-#E1E3E5 rd-4px p-13px pl20px pr20px"
            :key="index"
          >
            <n-radio class="flex-y-center" :default-checked="Eway.active == 1" :value="Eway.key">
              {{ Eway.title }}
            </n-radio>
            <p>{{ priceFormat(Eway.price) }}</p>
          </div>
        </n-space>
      </n-radio-group>
      <!-- 运费险 -->
      <div
        v-if="showInsurance"
        class="text-16px mt8px md:mt8px flex justify-between w-100% border border-#E1E3E5 rd-4px p-13px pl20px pr20px"
      >
        <n-checkbox
          :checked-value="1"
          :unchecked-value="0"
          v-model:checked="formValue.insurance.insurance"
          @update:checked="
            (val: any) => {
              setAddress(val, 'ins')
            }
          "
        >
          {{ $t('checkout.freightInsurance') }}
        </n-checkbox>
        <p>{{ priceFormat(insurance.price) }}</p>
      </div>
    </div>
  </n-form-item>
</template>

<script lang="ts" setup>
const formValue = defineModel<any>()
const priceFormat = inject<any>('priceFormat')
const props = defineProps<{
  postway: any[]
  insurance: any
  price: any
}>()
/**  保存表单数据 */
const setAddress = inject<any>('setAddress')

/**  运费险显示展示控制 */
const showInsurance = computed(() => {
  return props?.insurance?.gjs?.includes(formValue.value.addres.country_code) && props.insurance.status == '1'
})
watch(
  () => showInsurance.value,
  () => {
    setAddress(showInsurance.value && props.insurance.status == '1', 'ins')
  }
)
</script>

<style></style>
