import { request } from '~/services/request'

/**
 * 支付成功订单详情
 *
 * @param {*} params
 * @return {*}
 */
export const payOrderdatail = (params: any) => {
  return request.get('/orders/' + params.osn + '/' + params.okey)
}

/**
 * 支付（提交订单）
 *
 * @param {*} params
 * @return {*}
 */
export const createOrder = (params: any) => {
  return request.get('/payment/createOrder', { params })
}

/**
 * 支付（提交订单ab模式）
 *
 * @param {*} params
 * @return {*}
 */
export const createOrder2 = (params: any) => {
  return request.get('/payment/createOrder?source=ab', { params })
}

/**
 * 选择运费险//账单地址信息//收货地址//邮寄方式
 *
 * @param {*} params
 * @return {*}
 */
export const saveCheckout = (params: any) => {
  return request.get('/payment/saveCheckout', { params })
}

/**  获取快捷支付 */
export const quickPayment = (params: any) => {
  return request.get('/payment/get_pp_account', { params })
}
