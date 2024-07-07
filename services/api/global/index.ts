import { request } from '~/services/request'

/**
 * 下单页国家地区
 *
 * @return {*}
 */
export const getCountry = (): any => {
  return request.get('/home/get_country')
}

/**
 * 语言、国家
 *
 * @return {*}
 */
export const getLanguage = () => {
  return request.get('/home/currencylangs')
}

/**
 * 订阅
 *
 * @param {*} params
 * @return {*}
 */
export const Subscription = (params: any): any => {
  return request.get('/index/subscribe', { params })
}

/**
 *  预览主题
 *
 * @param {*} params
 * @return {*}
 */
export const previewTemplate = (params: any): any => {
  return request.get('/themes/themes/view_theme', { params })
}
