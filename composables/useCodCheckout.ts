import { useDialog } from 'naive-ui'
import { createOrder, shopGoodsbuynow } from '~/services/api'

/**
 * 使用cod支付
 * @param {*} buyNowForm
 * @param {*} orderForm
 *
 * */
export const useCodCheckout = (buyNowForm: Ref<any>, loading: Ref<boolean>) => {
  const { t } = useI18n()
  const dialog = useDialog()
  /**  加载状态 */

  /**  html */
  const html = ref()
  /**  创建订单 */
  const buyNow = async () => {
    const { data } = await shopGoodsbuynow(buyNowForm.value)
    if (data.code == 200) {
      return
    }
    throw new Error(t('checkout.code_valid'))
  }

  /**  提交订单 */
  const submitOrder = async (form: any) => {
    const { data } = await createOrder(form)
    if (data?.state == 'ok') {
      if (data.url) {
        location.href = data.url
      } else if (data.view) {
        html.value = data.view
      }
    } else {
      dialog.error({
        title: data.msg,
        content: () => data.msg,
        positiveText: t('cod.s'),
      })
    }
  }
  const OnSubmit = async (form: any) => {
    try {
      loading.value = true
      await buyNow()
      await submitOrder(form)
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return {
    OnSubmit,
    html,
  }
}
