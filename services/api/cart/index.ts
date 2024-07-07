import { request } from '~/services/request'

/**
 * 购物车列表
 *
 * @param {*} params
 * @return {*}
 */
export const shopCarlist = (params: any) => {
  return request.get('/cart/list', { params })
}

/**
 * 添加到购物车
 *
 * @param {*} params
 * @return {*}
 */
export const shopAddcar = (params: any) => {
  return request.get('/cart/add', { params })
}

/**
 * 购物车立即购买
 *
 * @param {*} params
 * @return {*}
 */
export const shopCarbuynow = (params: any) => {
  return request.get('/cart/checkout', { params })
}

/**
 * 商品立即购买
 *
 * @param {*} params
 * @return {*}
 */
export const shopGoodsbuynow = (params: any) => {
  return request.get('/cart/buy_now', { params })
}

/**
 * 购物车数量
 */
export const getShopCarcount = () => {
  return request.get<{
    code: number
    count: number
    state: 'success' | 'fail'
  }>('/cart/count')
}
