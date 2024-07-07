import { request } from '~/services/request'

/**
 * 订单页商品概览
 *
 * @param {*} params
 * @return {*}
 */
export const shopOverview = (params: any): any => {
  return request.get(`/checkouts/${params}`)
}

/**
 * 下单保存用户信息
 *
 * @param {*} params
 * @return {*}
 */
export const userinfo = (params: any): any => {
  return request.get('/checkouts/contact', { params })
}

/**
 * 选择小费  返回最新价格数据
 *
 * @param {*} params
 * @return {*}
 */
export const orderTip = (params: any): any => {
  return request.get('/checkouts/tips', { params })
}

/**
 * 修改订单数据后查询下单所需价格
 *
 * @param {*} params
 * @return {*}
 */
export const getAllFeeData = (params: any): any => {
  return request.get('/checkouts/price', { params })
}

/**
 * 验证优惠码
 *
 * @param {*} data
 * @return {*}
 */
export const verificationCodeAPI = (data: any): any => {
  const fd = new FormData()
  Object.keys(data).forEach((i) => {
    fd.append(i, data[i])
  })
  return request.post('checkouts/discount_check', fd)
}

/**
 * Loqate地址填充
 *
 * @param {*} params
 * @return {*}
 */
export const getloqateautoData = (params: any): any => {
  return request.get('/home/loqateauto', { params })
}


/**
 * sitemap站点
 *
 * @param {*} params
 * @return {*}
 */
export const getSitemap = (params: any): any => {
  return request.get('/home/sitemap', { params })
}
