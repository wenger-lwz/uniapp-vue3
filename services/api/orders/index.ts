import { request } from '~/services/request'

/**
 * 查询订单查询信息
 */
export const orderSearchAPI = (data: any) => {
  const fd = new FormData()
  Object.keys(data).forEach((i) => {
    fd.append(i, data[i])
  })
  console.log(fd)

  return request.post('/orders/search', fd)
}

/**
 * 获取订单详情
 */
export const getOrderDetailAPI = (url: any) => {
  return request.get(url)
}

/**  获取订单物流详情 */
export const getLogisticsAPI = (ordersID: { storeId: number; orderNo: number }) =>
  request.get<ORDERS.Response>('/orders/logistics', {
    baseURL: '/vipapi',
    params: ordersID,
  })
