<template>
  <n-form-item span="6" class="h50px mt20px">
    <div class="text-16px font-600 w-100%">{{ $t('checkout.information') }}</div>
    <n-button text>
      <span
        @click="ukey ? to_logout() : to_login()"
        class="min-w-[47px] color-primary text-sm font-semibold leading-normal"
      >
        {{ ukey ? $t('login.logout') : $t('login.login') }}
      </span>
    </n-button>
  </n-form-item>

  <n-form-item span="6" :label="$t('checkout.email')" path="addres.email">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.email" placeholder="" />
  </n-form-item>

  <n-form-item span="6">
    <n-checkbox>
      <span class="text-zinc-400 text-sm font-normal leading-normal">{{ $t('checkout.Newsletter') }}</span>
    </n-checkbox>
  </n-form-item>
  <n-form-item span="6" v-if="ukey">
    <div
      @click="showAddressSelect = true"
      class="cursor-pointer flex w-full gap-5 justify-between pb-5 text-sm leading-6 border-b-dashed border-b-2px text-black whitespace-nowrap max-w-[617px] max-md:flex-wrap"
    >
      <CheckoutsSelectAddress @update:address="updateAddress" v-model="showAddressSelect" />

      <p class="flex gap-4 justify-between px-5 max-md:flex-wrap flex-nowrap">
        <icon-location class="w-24px aspect-square" />
        <n-ellipsis class="md:max-w-[400px]! max-w-[100px]!">{{ $t('checkout.select_address') }}</n-ellipsis>
      </p>
      <icon-checkout-right class="w-20px" />
    </div>
  </n-form-item>
  <n-form-item span="6" class="h50px">
    <div class="text-16px font-600 w-100%">{{ $t('checkout.shipping_address') }}</div>
  </n-form-item>
  <n-form-item span="6 500:3" :label="$t('checkout.first_name')" path="addres.first_name">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.first_name" placeholder="" />
  </n-form-item>
  <n-form-item span="6 500:3" :label="$t('checkout.last_name')" path="addres.last_name">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.last_name" placeholder="" />
  </n-form-item>

  <n-form-item span="6" v-if="!isloqate" :label="$t('checkout.addr')" path="addres.addr">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.addr" placeholder="" />
  </n-form-item>

  <LoqateInfomationForm v-else v-model="formValue" />
  
  <n-form-item span="6" :label="$t('checkout.apart')" path="">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.apartment" placeholder="" />
  </n-form-item>
  <n-form-item span="6 500:2" :label="$t('checkout.country')" path="addres.country_code">
    <n-select
      v-model:value="formValue.addres.country_code"
      placeholder=""
      label-field="name"
      @update:value="getArea(formValue.addres.country_code, 'addr')"
      value-field="key"
      :options="country"
    />
  </n-form-item>
  <n-form-item v-if="provinceList?.length" span="6 500:2" :label="$t('checkout.province')" path="addres.province">
    <n-select
      v-model:value="formValue.addres.province_code"
      placeholder=""
      label-field="name"
      @update:value="getProvince(formValue.addres.province_code, 'addr')"
      value-field="key"
      :options="provinceList"
    />
  </n-form-item>
  <n-form-item span="6 500:2" :label="$t('checkout.city')" path="addres.apartment">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.city" placeholder="" />
    <!-- <n-select v-model:value="formValue.addres.apartment" placeholder="" label-field="name" @update:value="setaddress('', 'addr')" value-field="key" :options="provincelist" /> -->
  </n-form-item>
  <n-form-item span="6 500:3" :label="$t('checkout.postal')" path="addres.postal">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.postal" placeholder="" />
  </n-form-item>
  <n-form-item span="6 500:3" :label="$t('checkout.phone')" path="addres.phone">
    <n-input @change="setAddress('', 'addr')" v-model:value="formValue.addres.phone" placeholder="" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { getCountry, loginOut } from '~/services/api'
import LoqateInfomationForm from './loqate_infomation_form.vue'
const { checkoutData } = storeToRefs(useCheckoutsStore())
const isloqate = ref(0)
isloqate.value = checkoutData.value?.loqate

const formValue = defineModel<any>()

/** 选择地址 */
const showAddressSelect = ref(false)

/**  选择地址事件 */
const updateAddress = (e: any) => {
  formValue.value.addres = Object.assign(formValue.value.addres, e)
}
/**  用户唯一标识 */
const ukey = useCookie('ukey')

const emit = defineEmits(['getAllFee'])

/**  选择运费险//账单地址信息//收货地址//邮寄方式 */
const setAddress = inject<any>('setAddress')
 
/**  选择国家 */
const provinceList = ref([])
const billprovinceList = ref([])
const getArea = (value: any, type: any) => {
  country.value.forEach((item) => {
    if (item.key == value) {
      if (type == 'addr') {
        // provincelist.value = []
        formValue.value.addres.province = ''
        formValue.value.addres.province_code = ''
        // formValue.value.addres.apartment = ''
        formValue.value.addres.country = item.name
        provinceList.value = Object.entries(item.states).map(([key, value]) => {
          return { name: value, key: key }
        })
      } else {
        // billprovincelist.value = []
        formValue.value.bill.bprovince = ''
        formValue.value.bill.bprovince_code = ''
        // formValue.value.bill.bapartment = ''
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
/**  所有国家 */
const country = ref<Country[]>([])

/**  获取所有国家 */
const allcountry = async () => {
  let res = await getCountry()
  delete res.data['code']
  country.value = Object.keys(res.data).map((key: any) => {
    res.data[key].key = key
    return res.data[key]
  })
  if(formValue.value.addres.country_code){
    getArea(formValue.value.addres.country_code, 'addr')
  }
  
}

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

/**  选择县 */
const getProvince = (value: any, type: any) => {
  if (type == 'addr') {
    // formValue.value.addres.apartment = ''
    provinceList.value.forEach((item) => {
      if (item.key == value) {
        formValue.value.addres.province = item.name
        setAddress('', 'addr')
        return
      }
    })
  } else {
    // formValue.value.bill.bapartment = ''
    billprovinceList.value.forEach((item) => {
      if (item.key == value) {
        formValue.value.bill.bprovince = item.name
        setAddress('', 'bill')
        return
      }
    })
  }
}
const route = useRoute()

/**  去登录 */
const to_login = () => {
  window.location.href = `/account/login?redirect=${route.path}`
}

/**  退出 */
const to_logout = async () => {
  await loginOut()

  ukey.value = null
}
allcountry()


</script>
