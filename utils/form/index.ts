import type { FormRules } from 'naive-ui'
import { REGULAR_NUM } from '../config'

/**  订单表单 */
export const checkoutRules: ComputedRef<FormRules> = computed(() => {
  const { t } = useI18n()

  return {
    addres: {
      email: [
        { required: true, message: t('message.email'), trigger: 'blur' },
        { type: 'email', message: t('message.emailError'), trigger: ['blur', 'change'] },
      ],
      first_name: { required: true, message: t('message.firstName'), trigger: 'blur' },
      last_name: { required: true, message: t('message.lastName'), trigger: 'blur' },
      addr: { required: true, message: t('message.address'), trigger: 'blur' },
      city: { required: true, message: t('message.city'), trigger: 'blur' },
      // country: { required: true, message: '国家不能为空', trigger: 'blur' },
      // apartment:{ required: true, message: '市不能为空', trigger: 'blur' },
      country_code: { required: true, message: t('message.countryCode'), trigger: 'blur' },
      // province: { required: true, message: '省份不能为空', trigger: 'blur' },
      // province_code: { required: true, message: '省份代码不能为空', trigger: 'blur' },
      postal: { required: true, message: t('message.postal'), trigger: 'blur' },
      phone: [
        { required: true, message: t('message.phone'), trigger: 'blur' },
        {
          pattern: REGULAR_NUM,
          message: t('message.phoneError'),
          trigger: ['blur', 'change'],
        },
      ],
    },
    // insurance:{
    //   insurance:{required: true,message: '请选择运费险',trigger: 'change',},
    // },
    tips: {
      tip: { required: true, message: t('message.tip'), trigger: 'blur' },
    },
    bill: {
      email: [
        { required: true, message: t('message.email'), trigger: 'blur' },
        { type: 'email', message: t('message.emailError'), trigger: ['blur', 'change'] },
      ],
      bfirst_name: { required: true, message: t('message.firstName'), trigger: 'blur' },
      blast_name: { required: true, message: t('message.lastName'), trigger: 'blur' },
      baddr: { required: true, message: t('message.address'), trigger: 'blur' },
      bcountry: { required: true, message: t('message.country'), trigger: 'blur' },
      // bprovince: { required: true, message: '省份不能为空', trigger: 'blur' },
      bpostal: [
        { required: true, message: t('message.postal'), trigger: 'blur' },
        {
          parter: REGULAR_NUM,
        },
      ],
      bphone: { required: true, message: t('message.phone'), trigger: 'blur' },
      // bprovince_code:{ required: true, message: '省份不能为空', trigger: 'blur' },
      bcountry_code: { required: true, message: t('message.countryCode'), trigger: 'blur' },
    },
    payment_type: { required: true, message: t('message.paymentType'), trigger: ['change'] },
    payway: {
      cardname: { required: true, message: t('message.cardName'), trigger: 'blur' },
      cardno: { required: true, message: t('message.cardNo'), trigger: 'blur' },
      cmy: { required: true, message: t('message.cmy'), trigger: 'blur' },
      cvv: { required: true, message: t('message.cvv'), trigger: 'blur' },
    },
  }
})

/**  地址验证规则 */
export const addressRules: ComputedRef<FormRules> = computed(() => {
  const { t } = useI18n()

  return {
    email: [
      { required: true, message: t('message.email'), trigger: 'blur' },
      { type: 'email', message: t('message.emailError'), trigger: ['blur', 'change'] },
    ],
    // tel: {
    //   required: true,
    //   trigger: ['input'],
    //   validator: (rule: FormItemRule, value: string) => {
    //     return /^[1]+[3,8]+\d{9}$/.test(value)
    //   },
    // },
    tel: { required: true, message: t('message.phone'), trigger: 'blur' },
    first_name: { required: true, message: t('message.firstName'), trigger: ['blur'] },
    last_name: { required: true, message: t('message.lastName'), trigger: ['blur'] },
    address: { required: true, message: t('message.address'), trigger: ['blur'] },
    city: { required: true, message: t('message.city'), trigger: ['blur'] },
    province: { required: true, message: t('message.province'), trigger: ['blur'] },
    country: { required: true, message: t('message.country'), trigger: ['blur'] },
    zipcode: { required: true, message: t('message.postal'), trigger: ['blur'] },
  }
})

/**  地址验证规则 */
export const ordersTrackRules: ComputedRef<FormRules> = computed(() => {
  const { t } = useI18n()

  return {
    number: [{ required: true, message: t('message.ordersNum'), trigger: ['blur', 'change'] }],
    email_phone: { required: true, message: t('message.phone_email'), trigger: ['blur', 'change'] },
  }
})
