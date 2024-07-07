import { request } from '~/services/request'

/**
 * 获取 自定义 页面 详情
 * @param {*} handle
 */
export const getPagesDetailAPI = (handle: any) => {
  return request.get(`/pages/${handle}`, {
    transformRequest(data, hearder) {
      delete hearder['x-requested-with']
    },
  })
}
