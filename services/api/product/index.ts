import { request } from '~/services/request'
import { handleFormData } from '~/utils/service'

/**
 * 获取插件市场列表
 *
 * @export
 * @param {Number} params
 * @return {*} 返回html片段
 */
export const getMarketsPlugsAPI = (params: Number) => {
  return request.get<Market.Market_API_TYPE>('/products/markets/' + params)
}

/**
 * 获取插件市场列表
 *
 * @export
 * @param {Number} params
 * @returns {*} 返回json数据
 */
export const getMarketsPlugsJsonAPI = () => {
  return request.get<Market.Market_API_TYPE>('products/markets/json')
}

/**
 * 商品列表
 *
 * @param {*} data
 * @return {*}
 */
export const shopLogin1 = (data: any): any => {
  return request.get('/collections/all', data)
}

/**
 * 商品评论
 *
 * @param {*} params
 * @return {*}
 */
export const shopremark = (params: any): any => {
  return request.get('/products/comments', { params })
}

/**
 * 商品详情
 *
 * @param {*} params
 * @return {*}
 */
export const goodsDatail = (params: any): any => {
  return request.get('/products/' + params, { params: { source: 'api' } })
}

/**
 *  专辑列表
 *
 * @return {*}
 */
export const getAlbumlist = (): any => {
  return request.get('/products/category')
}

/**
 * 获取组合销售 的信息
 */
export const getBundleSalesAPI = (id: number | string) => {
  return request.get(`addon/bundle/${id}`)
}

/**
 * 捆绑组合加购 立即购买
 */
export const BundleBuyAPI = (data: Product.BuyNowAPI) => {
  const fd = handleFormData(data)
  return request.post<{
    msg: string
    code: number
    data: {
      [key: string]: any
    }
  }>(`/cart/bundles`, fd)
}

/**
 * 获取组合加购 的信息
 */
export const getCartBundleAPI = (id: number | string) => {
  return request.get(`addon/cbundle/${id}`)
}
