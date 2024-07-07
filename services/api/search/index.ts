import { request } from '~/services/request'

/**
 * 搜索列表
 *
 * @param {*} params
 * @return {*}
 */
export const getSeachlist = (params: any): any => {
  return request.get('/search', { params })
}
