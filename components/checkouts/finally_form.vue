<template>
  <!-- 添加小费 -->
  <n-form-item v-if="tip_list.length" label="" path="radioGroupValue">
    <div class="w-full flex-col">
      <div class="text-16px mb-14px md:mb-20px font-600 w-100%">{{ $t('checkout.addTip') }}</div>
      <n-radio-group
        @change="setAddress('', 'tip')"
        v-model:value="formValue.tips.tip"
        name="radiogroup2"
        class="flex flex-wrap"
        style="height: 100%; width: 100%; margin-bottom: 10px"
      >
        <n-radio-button
          v-for="(tip, index) in tip_list"
          :key="index"
          :value="tip.price"
          style="height: 100%; padding: 20px"
          class="w50% md:w25% text-center border-1px border-color-#E1E3E5"
        >
          <div class="flex-col flex-center h-100%">
            <div class="text-26px font-700 color-#000">{{ tip.option }}%</div>
            <div class="color-#909090 text-14px line-height-12px">{{ priceFormat(tip.price) }}</div>
          </div>
        </n-radio-button>
        <n-radio-button
          value="0"
          style="height: 100%; padding: 20px"
          class="w50% md:w25% text-center border-1px border-color-#E1E3E5"
        >
          <div class="flex-col flex-center h-100%">
            <div class="text-26px font-700 color-#000">0%</div>
            <div class="color-#909090 text-14px line-height-12px">{{ $t('checkout.no') }}</div>
          </div>
        </n-radio-button>
      </n-radio-group>
      <n-input
        class="w-100% m-t-20px"
        @change="setAddress('', 'tip')"
        v-model:value="formValue.tips.tip"
        type="text"
        :placeholder="$t('checkout.customTip')"
      />
    </div>
  </n-form-item>

  <!-- 支付方式 -->
  <n-form-item v-if="checkoutData.cod !== 2" label-width="0" path="payment_type">
    <div class="w-100%">
      <div class="text-16px mb-20px font-600 w-100%">{{ $t('checkout.payWay') }}</div>
      <div v-if="payment_list.length">
        <div class="w-full">
          <n-radio-group v-model:value="formValue.payment_type" name="radiogroup1" class="w100% mb-0">
            <n-table :single-line="false">
              <tbody>
                <tr v-for="payway in payment_list" :key="payway.key">
                  <td
                    class="cursor-pointer"
                    @click="
                      () => {
                        paymentType = payway?.configs?.site
                        formValue.payment_type = payway.key
                      }
                    "
                  >
                    <n-radio :value="payway.key" style="width: 100%">
                      <n-flex justify="space-between">
                        <sps-img class="h-24px" v-if="payway.icon" :src="payway.icon" />
                        <span v-else>{{ payway.title }}</span>
                        <n-flex align="center">
                          <sps-img
                            class="h-24px"
                            v-for="icon in payway.icons"
                            :key="icon"
                            :src="`https://imgs.chuhai-bang.com/public/image/pay_icon/${icon}.png`"
                          />
                        </n-flex>
                      </n-flex>
                    </n-radio>
                    <n-collapse-transition :show="formValue.payment_type == payway.key">
                      <div v-if="payway?.configs?.site == '1'" class="bg-#F8F8F8 w-100% p24px pb0 mt-10px">
                        <n-form-item class="mb-8px" :label="$t('checkout.name')" path="payway.cardname">
                          <n-input placeholder="" v-model:value="formValue.payway.cardname" />
                        </n-form-item>
                        <n-form-item class="mb-8px" :label="$t('checkout.cards')" path="payway.cardno">
                          <n-input placeholder="" v-model:value="formValue.payway.cardno" />
                        </n-form-item>
                        <n-form-item class="mb-8px" :label="$t('checkout.expiration')" path="payway.cmy">
                          <n-input placeholder="" v-model:value="formValue.payway.cmy" />
                        </n-form-item>
                        <n-form-item :label="$t('checkout.securityCode')" path="payway.cvv">
                          <n-input placeholder="" v-model:value="formValue.payway.cvv" />
                        </n-form-item>
                      </div>
                      <div v-else-if="payway.image || payway.descs" class="bg-#F8F8F8 p24px text-center p-2 mt-10px">
                        <sps-img v-if="payway.image" :src="payway.image" />
                        <p>{{ payway.descs }}</p>
                      </div>
                    </n-collapse-transition>
                  </td>
                </tr>
              </tbody>
            </n-table>
          </n-radio-group>
        </div>
      </div>
      <div v-else>
        <n-alert :title="$t('checkout.noPayment')" type="error">
          <p>{{ $t('checkout.noPayment') }}</p>
        </n-alert>
      </div>
    </div>
  </n-form-item>

  <!-- 账单地址 -->
  <n-form-item label-width="0" path="radioGroupValue">
    <div class="w-full">
      <div class="text-16px mb20px font-600 w-100%">{{ $t('checkout.billingAddress') }}</div>
      <n-radio-group
        @change="addBill(formValue.bill.bcountry_code)"
        v-model:value="formValue.bill.billing_address"
        name="radiogroup1"
        class="w100%"
      >
        <n-space vertical class="w-100%">
          <div class="text-16px mb-10px flex justify-between w-100% border border-#E1E3E5 rd-4px py-15px pl20px pr20px">
            <n-radio value="0">{{ $t('checkout.asShipping_address') }}</n-radio>
          </div>
          <div class="text-16px mb-10px flex justify-between w-100% border border-#E1E3E5 rd-4px py-15px pl20px pr20px">
            <n-radio value="1">{{ $t('checkout.customBill') }}</n-radio>
          </div>
        </n-space>
      </n-radio-group>
    </div>
  </n-form-item>

  <!-- 自定义地址 -->
  <n-collapse-transition :show="formValue.bill.billing_address == '1'">
    <template v-if="formValue.bill.billing_address == '1'">
      <!-- 隐藏billing 的邮箱 -->
      <!-- <n-form-item : :label="$t('checkout.email')" path="bill.email">
            <n-input @change="setaddress('', 'bill')" v-model:value="formValue.bill.email" placeholder="" />
          </n-form-item> -->
      <n-form-item span="6 500:3" :label="$t('checkout.first_name')" path="bill.bfirst_name">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.bfirst_name" placeholder="" />
      </n-form-item>
      <n-form-item span="6 500:3" :label="$t('checkout.last_name')" path="bill.blast_name">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.blast_name" placeholder="" />
      </n-form-item>
      <n-form-item :label="$t('checkout.addr')" path="bill.baddr">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.baddr" placeholder="" />
      </n-form-item>
      <!-- <n-form-item span="6 500:2" label="市" path="bill.bprovince">
            <n-input @change="setaddress('', 'bill')" v-model:value="formValue.bill.bprovince" placeholder="" />
          </n-form-item>
          <n-form-item span="6 500:2" label="国家" path="bill.bcountry">
            <n-input @change="setaddress('', 'bill')" v-model:value="formValue.bill.bcountry" placeholder="" />
          </n-form-item> -->

      <n-form-item span="6 500:2" :label="$t('checkout.country')" path="bill.bcountry_code">
        <n-select
          v-model:value="formValue.bill.bcountry_code"
          placeholder=""
          children-field="states"
          label-field="name"
          @update:value="getArea(formValue.bill.bcountry_code, 'bill')"
          value-field="key"
          :options="country"
        />
      </n-form-item>
      <n-form-item span="6 500:2" :label="$t('checkout.province')" path="bill.bprovince">
        <n-select
          v-model:value="formValue.bill.bprovince_code"
          placeholder=""
          label-field="name"
          @update:value="getProvince(formValue.bill.bprovince_code, 'bill')"
          value-field="key"
          :options="billprovinceList"
        />
      </n-form-item>
      <n-form-item span="6 500:2" :label="$t('checkout.city')" path="bill.bapartment">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.bapartment" placeholder="" />
        <!-- <n-select v-model:value="formValue.addres.apartment" placeholder="" label-field="name" @update:value="setaddress('', 'addr')" value-field="key" :options="provincelist" /> -->
      </n-form-item>

      <n-form-item span="6 500:3" :label="$t('checkout.postal')" path="bill.bpostal">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.bpostal" placeholder="" />
      </n-form-item>
      <n-form-item span="6 500:3" :label="$t('checkout.phone')" path="bill.bphone">
        <n-input @change="setAddress('', 'bill')" v-model:value="formValue.bill.bphone" placeholder="" />
      </n-form-item>
    </template>
  </n-collapse-transition>
</template>

<script lang="ts" setup>
const formValue = defineModel<any>()
const paymentType = defineModel<any>('paymentType')

const { country, checkoutData } = storeToRefs(useCheckoutsStore())
defineProps<{
  tip_list: any[]
  payment_list: any[]
}>()

const priceFormat = inject<any>('priceFormat')
const setAddress = inject<any>('setAddress')

const billprovinceList = ref<any>([])

/**  选择自定义地址 */
const addBill = (value: any) => {
  country.value.forEach((item) => {
    if (item.key == value) {
      formValue.value.bill.bcountry = item.name
      billprovinceList.value = Object.entries(item.states).map(([key, value]) => {
        return { name: value, key: key }
      })
      setAddress('', 'bill')
      return
    }
  })
}

/**  选择国家 */
const provinceList = ref([])
const getArea = (value: any, type: any) => {
  country.value.forEach((item) => {
    if (item.key == value) {
      if (type == 'addr') {
        // provincelist.value = []
        formValue.value.addres.province = ''
        formValue.value.addres.province_code = ''
        formValue.value.addres.apartment = ''
        formValue.value.addres.country = item.name
        provinceList.value = Object.entries(item.states).map(([key, value]) => {
          return { name: value, key: key }
        })
      } else {
        // billprovincelist.value = []
        formValue.value.bill.bprovince = ''
        formValue.value.bill.bprovince_code = ''
        formValue.value.bill.bapartment = ''
        formValue.value.bill.bcountry = item.name
        billprovinceList.value = Object.entries(item.states).map(([key, value]) => {
          return { name: value, key: key }
        })
      }

      setAddress('', type)
      return
    }
  })
}

/**  选择县 */
const getProvince = (value: any, type: any) => {
  if (type == 'addr') {
    formValue.value.addres.apartment = ''
    provinceList.value.forEach((item) => {
      if (item.key == value) {
        formValue.value.addres.province = item.name
        setAddress('', 'addr')
        return
      }
    })
  } else {
    formValue.value.bill.bapartment = ''
    billprovinceList.value.forEach((item) => {
      if (item.key == value) {
        formValue.value.bill.bprovince = item.name
        setAddress('', 'bill')
        return
      }
    })
  }
}
</script>

<style scoped lang="scss">
:deep(.n-radio__label) {
  width: 100%;
}
</style>
