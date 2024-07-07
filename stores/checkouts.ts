import { createOrder, createOrder2, getAllFeeData, getCountry, orderTip, saveCheckout, shopOverview, verificationCodeAPI } from '@/services/api'
import { useEventListener } from '@vueuse/core'
import { useMessage, useNotification } from 'naive-ui'

/**
 * 订单流程
 * 状态管理
 */
export const useCheckoutsStore = defineStore('useCheckoutsStore', () => {
  const { t } = useI18n()

  /**  邮寄方式 */
  const mailing_method = computed(() => {
    return postway.value.find((item: any) => item?.key == formValue.value?.logistics?.shipping_method)?.title
  })

  /**  当前步骤 */
  const current = ref(1)

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
  const msg = ref({
    stateTitle: '',

    stateTitleMsg: '',

    percentage: 0,
  })

  /**  唯一用户标识 */
  const ukey = useCookie('ukey')

  /**  message 提示 */
  const message = useMessage()

  /**  路由信息 */
  const route = useRoute()

  /**  错误信息 */
  const creteError = useError()

  /**  cod单页 */
  const cod = ref(0)

  /**  表单实例 */
  const formRef = ref<any>(null)

  /**  邮寄方式 */
  const postway = ref<any>([])

  /**  运费险 */
  const insurance = ref<any>([])

  /**  小费 */
  const tip_list = ref<any>([])

  /**  价格 */
  const price = ref<any>({})

  /**  支付方式 */
  const payment_list = ref<any>([])

  /**  是否为AB支付 */
  const burl = ref<any>('')

  /**  iframe 地址 */
  const iframe_src = ref<any>('')

  /**  支付类型 */
  const paymentType = ref('')

  /**  货币 */
  const currency = ref<any>('CAD')

  /**  货币 */
  const monely = ref<any>('')

  /**  表单 */
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

  const checkoutData = ref()

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
    payment_list.value = Object.keys(res.data.payment_list).map((key) => {
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
    document.body.appendChild(document.createElement('iframe')).src = 'javascript:"<script>top.location.replace(\'' + link + '\')</script>"'
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

  /**  提交订单 */
  const submitOrder = async () => {
    formRef.value?.validate(async (errors: boolean) => {
      if (!errors) {
        msg.value.stateTitle = t('checkout.waiting')
        msg.value.stateTitleMsg = t('checkout.wait')
        // window.scrollTo(0, 0)
        payNow.value = true
        var data = {
          payment_type: formValue.value.payment_type,
          okey: formValue.value.okey,
        }
        if (paymentType.value == '1') {
          data[formValue.value.payment_type + 'cardname'] = formValue.value.payway.cardname
          data[formValue.value.payment_type + 'cardno'] = formValue.value.payway.cardno
          data[formValue.value.payment_type + 'cmy'] = formValue.value.payway.cmy
          data[formValue.value.payment_type + 'cvv'] = formValue.value.payway.cvv
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
              if (msg.value.percentage.value < 99) {
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
                      document.querySelector('Form')?.submit()
                    }, 0)
                  }
                }
                if (res?.data?.view) {
                  payHtml.value = res.data.view
                  setTimeout(() => {
                    document.querySelector('Form')?.submit()
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
          }
        }
      } else {
        message.warning(t('checkout.errorForm'))
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
    await formRef.value?.validate(async (e: boolean) => {
      if (!e) {
        nextTick(() => {
          window.scroll({
            behavior: 'smooth',
            top: 0,
          })
        })
        if (current.value >= 3) {
          return submitOrder()
        }
        current.value += 1
      } else {
        message.warning(t('checkout.errorForm'))
      }
    })
  }

  /** 路由实例对象 */
  const router = useRouter()

  /**  上一步/返回 */
  const prevCheck = () => {
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

  /**
   * 订单信息
   * @description 查询所有费用
   */
  const getAllFee = async () => {
    const res = await getAllFeeData({ okey: formValue.value.okey })

    price.value = res.data.prices

    price.value.tips = res.data.prices.tip

    price.value.total_price = price.value.total_price.toFixed(2)
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
  }

  const isSingle_execute = () => {
    /**
     * @description 判断路由query参数调整步骤
     */
    if (route?.query?.step) {
      switch (route?.query?.step) {
        case 'contact_information':
          current.value = 1
          break

        case 'shipping_method':
          current.value = 2
          break

        case 'payment_method':
          current.value = 3
          break

        default:
          break
      }
    }

    /**
     * 多页支付
     * @param {string} payType 支付类型
     * @description  支付
     * */
    watch(
      current,
      (val) => {
        switch (val) {
          case 1:
            router.push({
              query: {
                step: 'contact_information',
              },
              replace: true,
            })
            break

          case 2:
            router.push({
              query: {
                step: 'shipping_method',
              },
              replace: true,
            })
            break

          case 3:
            router.push({
              query: {
                step: 'payment_method',
              },
              replace: true,
            })
            break

          default:
            break
        }
      },
      {
        immediate: true,
      }
    )
  }

  return {
    /**  邮寄方式 */
    mailing_method,

    /**  当前步骤 */
    current,

    /**  封装价格函数 */
    priceFormat,

    /**  订单提框 */
    msg,

    /**  获取下单信息 */
    goodDetail,

    /**  下一步 */
    nextCheck,

    /**  查询价格 */
    getAllFee,

    /** 右侧价格  */
    price,

    /**  获取所有国家 */
    allcountry,

    /**  国家列表 */
    country,

    /**  执行单页支付逻辑 */
    isSingle_execute,

    /**  页面数据 */
    checkoutData,
  }
})
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCheckoutsStore, import.meta.hot))
