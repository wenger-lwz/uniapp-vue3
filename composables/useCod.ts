export function useCod(data: any) {
  const route = useRoute()
  const formPay = ref()
  const buyLoading = ref(false)

  const key_o = useCookie('okey')
  if (!key_o.value) {
    key_o.value = Math.random().toString(8).substr(2)
    if (key_o.value.length > 16) {
      key_o.value = +key_o.value.substring(0, 16)
    }
  }

  provide('loading', buyLoading)

  /**  表单 */
  const buy_now = ref({
    proid: +data?.product?.id || null,
    varid: route.params.all[1] || null,
    num: 1,
    car_id: null,
    source: 'buy_now',
    key_o: +key_o.value,
    virtual: [],
    combos: '',
  })

  const skuDataBuyNow = (val) => {
    buy_now.value = Object.assign({}, buy_now.value, val)
  }

  return {
    buy_now,
    formPay,
    buyLoading,
    skuDataBuyNow,
    formatPrice,
  }
}
