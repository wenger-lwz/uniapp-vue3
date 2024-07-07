import { request } from '~/services/request'

/**
 * 获取路由模板数据
 * @export
 * @param {*} url
 * @return {*}
 */
export function getTemplateData(url: string): Promise<any> {
  /**  获取请求头 */
  const getReqHeaders = () => {
    const headers = useRequestHeaders()
    return {
      xi: headers['fc-shopid'],
      xn: headers['fc-shopname'],
      xk: headers['fc-key'],
    }
  }
  if (url == '/true' || url.includes('nuxt')) return Promise.resolve(undefined)
  let headers = {}
  /**  如果处于开发模式 */
  if (import.meta.dev) {
    headers = { 'Fc-Key': 'dev', 'Fc-Shopid': 171, 'Fc-Shopname': 'shopssea' }
  } else {
    /**  如果处于生产模式 */
    headers = getReqHeaders()
  }

  /**  查询参数 */
  const params = headers
  return request.get(url, {
    params,
    headers,
    transformRequest(data, hearder) {
      delete hearder['x-requested-with']
    },
  })
}

/**
 * 获取全局设置信息
 *
 * @return {*}
 */
export const getSettingsAPI = (params: any): any => {
  /**  获取请求头 */
  const getReqHeaders = () => {
    const headers = useRequestHeaders()
    return {
      xi: headers['fc-shopid'],
      xn: headers['fc-shopname'],
      xk: headers['fc-key'],
    }
  }
  const query = getReqHeaders()

  return request.get('/index/settings', {
    params: { ...query, ...params },
    transformRequest(data, hearder) {
      delete hearder['x-requested-with']
    },
  })
}
/**
 * 获取全局设置信息
 *
 * @return {*}
 */
export const getPagesAPI = (params: any): any => {
  /**  获取请求头 */
  const getReqHeaders = () => {
    const headers = useRequestHeaders()
    return {
      xi: headers['fc-shopid'],
      xn: headers['fc-shopname'],
      xk: headers['fc-key'],
    }
  }
  const query = getReqHeaders()

  return request.get('/index/pages', {
    params: { ...query, ...params },
    transformRequest(data, hearder) {
      delete hearder['x-requested-with']
    },
  })
}
