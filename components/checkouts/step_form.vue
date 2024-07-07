<template>
  <n-form
    style="--n-height: 48px"
    ref="formRef"
    v-if="goodsOverview?.length"
    class="px-10px md:px-0 w-full md:w-45% pb0px pt10px md:pt50px md:pb68px w620px"
    require-mark-placement="left"
    inline
    :label-width="80"
    :model="formValue"
    :rules="checkoutRules"
    size="large"
  >
    <n-flex vertical x-gap="20" y-gap="8" class="w-full">
      <p class="text-18px font-600 mb-5">{{ $t('checkout.address') }}</p>
      <!-- 送货地址 -->

      <!-- 步骤条-面包屑 -->
      <n-form-item v-if="!checkoutData.single" class="h50px">
        <div class="flex gap-2 text-sm leading-6 text-black whitespace-nowrap">
          <n-button text @click="current = 1">{{ $t('checkout.addr') }}</n-button>
          <span>></span>
          <n-button text :disabled="current <= 2" @click="current = 2">{{ $t('checkout.shipping') }}</n-button>
          <span>></span>
          <n-button text :disabled="current <= 3">{{ $t('checkout.payment') }}</n-button>
        </div>
      </n-form-item>

      <!-- 顶部信息 -->
      <Top_info
        v-if="checkoutData.single && current != 1"
        :mailing_method="mailing_method"
        v-model:current="current"
        :form-value="formValue"
      />

      <!-- 步骤：填写基础信息 -->
      <CheckoutsInfomationForm
        v-if="checkoutData.single || current == 1"
        v-model="formValue"
        @update:address="updateAddress"
      />

      <!-- 步骤：选择物流信息 -->
      <CheckoutsShippingForm
        v-if="checkoutData.single || current == 2"
        v-model="formValue"
        :postway="postway"
        :price="price"
        :insurance="insurance"
      />

      <!-- 步骤：选择支付方式等 -->
      <Finally_form
        v-model:paymentType="paymentType"
        v-if="checkoutData.single || current == 3"
        v-model="formValue"
        :tip_list="tip_list"
        :payment_list="payment_list"
      />

      <!-- 底部按钮 -->
      <n-form-item class="hidden md:block">
        <n-space justify="space-between" align="center" class="w-100%">
          <n-button
            text
            @click="prevCheck"
            class="hidden md:block cursor-pointer text-black text-base font-normal leading-normal tracking-wide"
          >
            &lt; {{ $t('checkout.Return') }}
          </n-button>
          <n-button
            :disabled="!payment_list.length && (checkoutData.single || current == 3)"
            type="primary"
            @click="nextCheck"
          >
            {{ checkoutData.single || current == 3 ? $t('checkout.confirmOrder') : $t('checkout.Next') }}
          </n-button>
        </n-space>
      </n-form-item>
    </n-flex>

    <!-- 选择地址-模态框 -->
    <CheckoutsSelectAddress @update:address="updateAddress" v-model="showAddressSelect" />

    <!-- 订单提示 -->
    <CheckoutsTip v-model="payNow" :msg="msg" />

    <div v-html="payHtml"></div>

    <iframe
      v-if="iframe_src"
      id="pay_jump"
      :src="iframe_src"
      name="pay_jump"
      width="0"
      height="0"
      border="0"
      frameborder="0"
      scrolling="no"
      rel="noreferrer"
      referrerpolicy="no-referrer"
      style="frameborder: 0; position: absolute; top: 0; left: 0; z-index: 99999"
    />
  </n-form>
</template>

<script setup lang="ts">
import { createOrder, createOrder2, orderTip, saveCheckout, shopOverview } from '@/services/api'
import { useEventListener } from '@vueuse/core'
import { useMessage, type FormInst } from 'naive-ui'
import type { Status } from 'naive-ui/es/progress/src/interface'
import { checkoutRules } from '~/utils/form'
import Finally_form from './finally_form.vue'
import Top_info from './top_info.vue'
const { t } = useI18n()
const { price, country, current, checkoutData } = storeToRefs(useCheckoutsStore())
const { allcountry } = useCheckoutsStore()
const { getAllFee, isSingle_execute } = useCheckoutsStore()
/**  邮寄方式 */
const mailing_method = computed(() => {
  return postway.value.find((item: any) => item?.key == formValue.value?.logistics?.shipping_method)?.title
})

/**  语言 */
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
    currency: monely.value ?? 'USD',
  }).format(price)
}

/**  订单提示 */
const msg = ref<{
  status: Status
  stateTitle: string
  stateTitleMsg: string
  percentage: number
}>({
  stateTitle: '',
  stateTitleMsg: '',
  percentage: 0,
  status: 'default',
})

/**  注入格式化货币函数 */
provide('priceFormat', priceFormat)

/**  订单摘要 */
const goodsOverview = defineModel<[]>()

/**  唯一用户标识 */
const ukey = useCookie('ukey')

const message = useMessage()

const route = useRoute()

const creteError = useError()

const cod = ref(0)

const formRef = ref<FormInst | null>(null)

/**  邮寄方式 */
const postway = ref<any>([])

/**  运费险 */
const insurance = ref<any>([])

/**  小费 */
const tip_list = ref<any>([])

/**  支付方式 */
const payment_list = ref<any>([])

/**  是否为AB支付 */
const burl = ref<any>('')

const iframe_src = ref<any>('')

const paymentType = ref('')

const currency = ref<any>('CAD')

const monely = ref<any>('')

const formValue = ref({
  payment_type: null,
  okey: route.params?.all[0] || '',
  // fc_token:null,
  // ipm:null,
  // Expiry:null,
  // securityCode:null,
  // site_pay:1,

  landmark: null,
  saveaddress: null,
  addres: {
    //收货地址
    okey: '',
    email: '',
    first_name: '',
    last_name: '',
    addr: '',
    apartment: '', //市
    city: '',
    country: '',
    country_code: '',
    province: '',
    province_code: '',
    postal: '',
    phone: '',
    ukey: ukey.value || '',
  },
  insurance: {
    //运费险
    okey: '',
    insurance: 1, //1有、0无
    source: 'insurance',
  },
  // 小费
  tips: {
    okey: '',
    tip: '',
  },
  bill: {
    //账单地址
    okey: '',
    email: '',
    billing_address: '0',
    bfirst_name: '',
    blast_name: '',
    baddr: '',
    bcountry: '',
    bprovince: '',
    bpostal: '',
    bphone: '',
    bprovince_code: '',
    bcountry_code: '',
    bapartment: '',
  },
  logistics: {
    //物流方式
    okey: '',
    shipping_method: null, //shipp key值
  },
  payway: {
    cardname: null,
    cardno: null,
    cmy: null,
    cvv: null,
  },
})

/**  商品详情 */
const goodDetail = async () => {
  const res: any = await shopOverview(formValue.value.okey)
  checkoutData.value = res.data
  /**  设置默认语言 */
  // locale.value = language.value ?? res?.data?.head_data?.langs
  if (res?.data?.state == 'error' || !res?.data?.state) {
    return (creteError.value = {
      statusCode: 404,
      statusMessage: t('checkout.noFind'),
      message: '',
      name: '',
    })
  }
  // plugins(res.data)
  // seoHeader(res.data)

  /**  执行多页逻辑 */
  if (!res.data.single) {
    isSingle_execute()
  }

  if (res.data.contact.country_code) {
    getArea(res.data.contact.country_code, 'addr')
  }
  formValue.value.landmark = res.data.contact.landmark
  formValue.value.saveaddress = res.data.contact.saveaddress
  formValue.value.addres = res.data.contact
  formValue.value.addres.email = res.data.contact.email
  formValue.value.addres.first_name = res.data.contact.first_name
  formValue.value.addres.last_name = res.data.contact.last_name
  formValue.value.addres.addr = res.data.contact.addr
  formValue.value.addres.apartment = res.data.contact.apartment
  formValue.value.addres.city = res.data.contact.city
  formValue.value.addres.country = res.data.contact.country
  formValue.value.addres.country_code = res.data.contact.country_code
  formValue.value.addres.province = res.data.contact.province
  formValue.value.addres.province_code = res.data.contact.province_code
  formValue.value.addres.postal = res.data.contact.postal
  formValue.value.addres.phone = res.data.contact.phone
  if (res.data.bill) {
    // 自定义地址回显赋值
    formValue.value.bill.bfirst_name = res.data.bill.first_name
    formValue.value.bill.blast_name = res.data.bill.last_name
    formValue.value.bill.baddr = res.data.bill.addr
    formValue.value.bill.bcountry = res.data.bill.country
    formValue.value.bill.bprovince = res.data.bill.province
    formValue.value.bill.bcountry_code = res.data.bill.country_code
    formValue.value.bill.bprovince_code = res.data.bill.province_code
    formValue.value.bill.bapartment = res.data.bill.apartment
    formValue.value.bill.bpostal = res.data.bill.postal
    formValue.value.bill.bphone = res.data.bill.phone
  }

  burl.value = res.data.burl
  cod.value = res.data.cod
  goodsOverview.value = res.data.products

  /**  处理邮寄方式 */
  if (res.data.shipp) {
    postway.value = Object.keys(res.data.shipp).map((key) => {
      res.data.shipp[key].key = key
      return res.data.shipp[key]
    })
  }

  /**  处理航运方式 */
  postway.value?.forEach((item: any) => {
    if (item.title == res.data.cshipps.title) {
      formValue.value.logistics.shipping_method = item.key
    }
  })

  insurance.value = res.data.insurance
  currency.value = res.data.currency
  price.value = res.data.price

  tip_list.value = res.data.tip_list

  /**  处理支付方式 */
  payment_list.value =
    res.data.payment_list &&
    Object.keys(res.data.payment_list).map((key) => {
      res.data.payment_list[key].key = key
      return res.data.payment_list[key]
    })
  formValue.value.tips.tip = res.data.price.tips
  monely.value = res.data.head_data.cdatas[0].code || 'CNY'
}

/**  选择运费险//账单地址信息//收货地址//邮寄方式 */
const setAddress = async (value: any, type: any) => {
  if (type == 'addr') {
    formValue.value.addres.okey = formValue.value.okey
    await saveCheckout(formValue.value.addres)
  } else if (type == 'post') {
    formValue.value.logistics.okey = formValue.value.okey
    await saveCheckout(formValue.value.logistics)
    getAllFee()
  } else if (type == 'ins') {
    value ? (formValue.value.insurance.insurance = 1) : (formValue.value.insurance.insurance = 0)
    formValue.value.insurance.okey = formValue.value.okey
    await saveCheckout(formValue.value.insurance)
    getAllFee()
  } else if (type == 'bill') {
    formValue.value.bill.okey = formValue.value.okey
    await saveCheckout(formValue.value.bill)
  } else if (type == 'tip') {
    var data = {
      okey: formValue.value.okey,
      tips: formValue.value.tips.tip,
    }
    await orderTip(data)
    getAllFee()
  }
}

/**  注入保存数据函数 */
provide('setAddress', setAddress)

const payNow = ref<boolean>(false)

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

/**  获取是否支持postMessage */
function isPostMessage() {
  return !!window.postMessage
}

/**  结果 */
const result = function (res: any) {
  if (res.state == 'ok') {
    if (res.url && res.url != '' && res.url != 'undefined') {
      setTimeout(function () {
        window.location.href = res.url
      }, 500)
    } else {
      if (isPostMessage()) {
        //支持postMessage
        iframe_src.value = burl.value + '&payment=' + formValue.value.payment_type
        addEvent()
      } else {
        window.location.href = burl.value + '&jsmsg=1&payment=' + formValue.value.payment_type
      }
    }
  } else {
    msg.value.stateTitle = '支付失败'
    msg.value.percentage = 0
  }
}

/**  跳转页面函数 */
function open_page(link: string) {
  document.body.appendChild(document.createElement('iframe')).src =
    'javascript:"<script>top.location.replace(\'' + link + '\')<\/script>"'
}

/** 添加事件  */
function addEvent() {
  useEventListener(
    'error',
    (e: any) => {
      try {
        var data = e.data
        if (data.act == 'go') {
          if (data.view) {
            document.write(data.view)
          }
          if (data.url) {
            open_page(data.url)
          }
        } else if (data.act == 'reset') {
          if (data.msg) {
            msg.value.stateTitle = data.msg
          }
          //resetSubbtn();
        } else if (data.act == 'iframe_update') {
          var h = parseFloat(data.iframe_height)
        } else if (data.act == 'submit') {
          if (data.state == 'ok') {
            if (!data.order_sn || !data.order_id) {
              data.msg = 'error'
            } else {
              open_page('orders/' + data.order_id + '/' + formValue.value.okey)
              return
            }
          }
          if (data.msg) {
            msg.value.stateTitle = data.msg
          }
        }
      } catch (e1) {}
    },
    false
  )
}

const payHtml = ref(null)

interface Payway {
  [key: string]: string | null
}

/**  提交订单 */
const submitOrder = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      msg.value.stateTitle = t('checkout.waiting')
      msg.value.stateTitleMsg = t('checkout.wait')
      msg.value.status = 'default'
      // window.scrollTo(0, 0)
      payNow.value = true
      var data: any = {
        payment_type: formValue.value.payment_type,
        okey: formValue.value.okey,
      }

      /**  是否需要输入卡号 */
      if (paymentType.value == '1') {
        const payway: Payway = formValue.value.payway
        const fields = ['cardname', 'cardno', 'cmy', 'cvv']
        fields.forEach((field) => {
          data[formValue.value.payment_type + field] = payway[field]
        })
      }
      // AB模式
      if (burl.value != '' && burl.value != null) {
        const res: any = await createOrder2(data)
        result(res.data)
      } else {
        //非AB模式
        const res: any = await createOrder(data)
        if (res.data.code == 200 && res.data.state == 'ok') {
          msg.value.stateTitleMsg = ''
          var timer = setInterval(() => {
            if (msg.value.percentage < 99) {
              msg.value.percentage += 20
            } else {
              clearInterval(timer)
              if (formValue.value.payment_type == 'Cod' || paymentType.value == '1') {
                DLayers('pay_success')
                msg.value.stateTitle = t('checkout.paySuccess')
                msg.value.percentage = 100
                if (res?.data?.url) {
                  let originalUrl = res.data.url
                  window.location.href = originalUrl
                }
                if (res?.data?.view) {
                  payHtml.value = res.data.view
                  setTimeout(() => {
                    ;(document.querySelector('form') as HTMLFormElement).submit()
                  }, 0)
                }
              }
              if (res?.data?.view) {
                payHtml.value = res.data.view
                setTimeout(() => {
                  ;(document.querySelector('form') as HTMLFormElement).submit()
                }, 0)
              }
              if (res.data.url) {
                setTimeout(function () {
                  window.location.href = res.data.url
                }, 0)
              }
            }
          }, 50)
        } else {
          msg.value.stateTitle = t('checkout.error')
          msg.value.stateTitleMsg = res.data.msg
          msg.value.status = 'error'
        }
      }
    } else {
      message.warning(t('checkout.errorForm'))
      elFormErrorScrollIntoView()
      return false
    }
  })
}

/** 选择地址 */
const showAddressSelect = ref(false)

/**  选择地址事件 */
const updateAddress = (e: any) => {
  formValue.value.addres = Object.assign(formValue.value.addres, e)
}

/**  分页下一步 */
const nextCheck = async () => {
  await formRef.value?.validate(async (e) => {
    if (!e) {
      /**  判断是否为单页模式 */
      if (checkoutData.value.single) {
        return submitOrder()
      }

      /**  单页模式逻辑 */
      nextTick(() => {
        window.scroll({
          behavior: 'smooth',
          top: 0,
        })
      })
      if (current.value >= 3) {
        return submitOrder()
      }

      /**  当前步骤+1 */
      current.value += 1
    } else {
      elFormErrorScrollIntoView()
      message.warning(t('checkout.errorForm'))
    }
  })
}

const router = useRouter()

/**  上一步/返回 */
const prevCheck = () => {
  /**  判断是否为单页模式 */
  if (checkoutData.value.single) {
    return router.back()
  }

  /**  单页模式逻辑 */
  if (current.value <= 1) {
    return router.back()
  }

  current.value -= 1
  nextTick(() => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    })
  })
}

goodDetail()
allcountry()
onMounted(() => {
  setTimeout(() => {
    DLayers('checkout')
  }, 500)
})

/**  暴露提交订单方法 */
defineExpose({ nextCheck, current })
</script>

<style scoped lang="scss">
:deep(.n-form-item-label) {
  position: relative;
}
:deep(.__input-l),
:deep(.__internal-selection-l) {
  --n-height: 48px;
}
:deep(.n-form-item) {
  position: relative;
}
:deep(.n-form-item--top-labelled) {
  & .n-form-item-label {
    position: absolute;
    color: #929292;
    background-color: #fff;
    z-index: 22;
    height: 15px;
    font-size: 18px;
    padding: 0;
    line-height: 10px;
    top: 20px;
    left: 20px;
    transition: all 0.3s;
    cursor: text;
    pointer-events: none;
  }
  &:has(.n-input--focus) > label,
  &:has(input:not(:placeholder-shown)) > label,
  &.n-form-item-blank:has(input:not(:placeholder-shown)) > label,
  &:has(.n-base-selection-input__content:not(:empty)) > label {
    position: absolute;
    cursor: text;
    top: -5px;
    left: 10px;
    font-size: 16px;
    transition: all 0.3s;
    transition-duration: all 0.2s;
    transform: translate(0, 0) scale(0.9, 0.9);
  }
}

:deep(.n-radio-group .n-radio-group__splitor) {
  width: 0;
}

:deep(.n-radio-group .n-radio-button.n-radio-button--checked) {
  background-color: rgba(0, 128, 96, 0.04);
  border-color: rgba(0, 128, 96, 0.2);
}

/* :deep(.n-form-item .n-form-item-feedback-wrapper) {
  display: none;
} */
:deep(.n-form-item .n-form-item-label) {
  min-height: auto;
}

:deep(.n-form-item.n-form-item--top-labelled) {
  grid-template-areas:
    'blank'
    'feedback';
}

:deep(.n-breadcrumb .n-breadcrumb-item .n-breadcrumb-item__link) {
  padding-left: 0;
}
</style>
