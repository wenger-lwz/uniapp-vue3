import { request } from '@/services/request'

/**
 * 登录
 *
 * @param {*} params
 * @return {*}
 */
export const shopLogin = (params: any): any => {
  return request.get('/account/login', { params })
}

/**
 *  注册
 *
 * @param {*} params
 * @return {*}
 */
export const shopRegister = (params: any): any => {
  return request.get('/account/register', { params })
}

/**
 * 退出
 *
 * @return {*}
 */
export const loginOut = (): any => {
  return request.get('/account/logout')
}

/**
 * 重置密码
 *
 * @param {*} params
 * @return {*}
 */
export const shopResetPassword = (params: any): any => {
  return request.get('/account/resetpw', { params })
}

/**
 * 收货地址列表
 *
 * @param {*} params
 * @return {*}
 */
export const shopAddress = (params: any): any => {
  return request.get('/account/address', { params })
}

/**
 * 订单列表
 *
 * @return {*}
 */
export const shopOrderlist = (): any => {
  return request.get<any>('/account/orders')
}

/**
 * 订单详情
 *
 * @param {*} params
 * @return {*}
 */
export const shopOrderdatail = (params: any): any => {
  return request.get('/account/order_detail', { params })
}
