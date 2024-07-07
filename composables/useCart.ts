import { shopAddcar, shopCarbuynow, shopCarlist } from '~/services/api'

import { useMessage } from 'naive-ui'
/**
 * 组合式 购物车函数
 * @returns
 */
export function useCart() {
  const { t } = useI18n()
  const message = useMessage()

  /**  购物车列表 */
  const carList = ref<any>([])

  /**  加载状态 */
  const loading = ref(false)

  /**  获取购物车列表 */
  const getcarlist = async () => {
    loading.value = true
    try {
      const { data } = await shopCarlist({ source: 'xfproduct' })
      carList.value = data?.cart
    } finally {
      loading.value = false
    }
  }

  /**  选择商品 */
  const carIds = ref<number[]>([])
  const handleCheckedChange = (checked: number) => {
    if (carIds.value.includes(checked)) {
      carIds.value.splice(carIds.value.indexOf(checked), 1)
    } else {
      carIds.value.unshift(checked)
    }
  }

  /**  购物车增加减少 */
  const changeGoodsNum = async (item: any, value: any) => {
    item.quantity += value
    debouncedPostCartData(item, value)
  }

  /**  传输购物车数据 */
  const postCartData = async (item: any, value: any) => {
    await shopAddcar({
      source: '',
      proid: item.product_id,
      car_id: item.id,
      varid: item.variant_id,
      num: item.quantity,
    })
    await getcarlist()
    DLayers('remove_from_cart')
  }

  /**  防抖函数 */
  const debouncedPostCartData: (item: any, value: any) => void = debounce(postCartData, 350)

  /**  立即购买按钮状态 */
  const buynowloading = ref(false)
  /**  立即购买 */
  const buyNow = async () => {
    buynowloading.value = true
    var data = {
      source: '',
      key_o: '',
    }
    if (carList.value.line_items.length) {
      if (!carIds.value.length) {
        buynowloading.value = false
        return message.info(t('headers.selectError'))
      }
      data.vids = carIds.value.join(',')
      const res = await shopCarbuynow(data)
      DLayers('add_cart')
      if (res.data.code == 200 && res.data.state == 'ok') {
        buynowloading.value = false

        navigateTo('/checkouts/' + res.data.okey)
        // location.href = '/checkouts/' + res.data.okey
      }
      buynowloading.value = true
      return
    }
    message.error('The shopping cart is empty')
  }

  /**  计算购物车总价 */
  const cartotalprice = computed(() => {
    if (carList.value?.line_items) {
      return carList.value?.line_items
        .filter((item: any) => {
          return carIds.value.includes(item.id)
        })
        .reduce((total: any, item: any) => {
          return total + item.quantity * item.price
        }, 0)
    }
    return []
  })

  return {
    /** 计算购物车总价  */
    cartotalprice,
    /**  立即购买 */
    buyNow,
    /**  立即购买按钮状态 */
    buynowloading,
    /**  购物车增加减少 */
    changeGoodsNum,
    /**  选择商品 */
    handleCheckedChange,
    /**  购物车列表 */
    carList,
    /**  列表加载状态 */
    loading,
    /**  选择商品id */
    carIds,
    /**  获取购物车列表 */
    getcarlist,
  }
}
