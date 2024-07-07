import { request } from '~/services/request'

/**
 * 获取博客详情
 * @param {*} handle
 */
export const getBlogDetailAPI = (handle: any) => {
  return request.get(`/blog/${handle}`, {
    transformRequest(data, hearder) {
      delete hearder['x-requested-with']
    },
  })
}

/**
 * 获取博客专辑列表
 * @param {*} handle
 */
export const getBlogDetailListAPI = (handle: any, params: any) => {
  return request.get(`/blog/cat/${handle}`, {
    params,
  })
}
