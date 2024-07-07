import { request } from '~/services/request'

/**
 * 专辑列表详情、商品列表
 *
 * @param {*} params
 * @return {*}
 */
export const getAlbumdatail = (params: any): any => {
  return request.get('/collections/' + params.key, { params: params.data })
}
