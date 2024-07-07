import { createRequest } from './request'
export const request = createRequest({
  withCredentials: true, // 允许跨域请求传递Cookies
})
