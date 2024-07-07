import {
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData,
} from '@/utils/service/index'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { useBaseUrl } from '~/composables/useBaseUrl'
type RefreshRequestQueue = (config: AxiosRequestConfig) => void

/**
 * 封装axios请求类
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance

  backendConfig: Service.BackendResultConfig

  isRefreshing: boolean

  retryQueues: RefreshRequestQueue[]

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code' /**  响应码字段 */,
      dataKey: 'data' /**  响应数据 */,
      msgKey: 'msg' /**  响应消息 */,
      code: 200 /**  响应成功代码 */,
    }
  ) {
    this.backendConfig = backendConfig
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
    this.isRefreshing = false
    this.retryQueues = []
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    /**  请求拦截 */
    this.instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        // const hearders = useRequestHeaders()
        // const { ssrContext } = useNuxtApp()
        const hearders = useReqHearder()
        const handleConfig: AxiosRequestConfig = {
          baseURL: process.server ? useBaseUrl() : '/api',
          ...config,
          headers: {
            'x-requested-with': 'xmlhttprequest',
            // ...ssrContext?.event.node.req.headers,
            ...hearders,
          },
          maxRedirects: 0, // 阻止自动处理重定向
          // transformRequest: (data: any, headers: any) => {
          //   if ((process.server && !config.url?.includes('collections')) || !config.url?.includes('blog')) {
          //     delete headers['x-requested-with']
          //     // headers = Object.assign(headers, useRequestHeaders())
          //   }

          //   return data
          // },
        }

        if (handleConfig.headers) {
          /**  数据转换 */
          const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType
          handleConfig.data = await transformRequestData(handleConfig.data, contentType)
        }

        return handleConfig as any
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
        // return axiosError
      }
    )
    /**  响应拦截 */
    this.instance.interceptors.response.use(
      /**  响应成功拦截 */
      (async (response: AxiosResponse<any, any>) => {
        const { status, config } = response

        /**  处理响应码匹配【浏览器响应码】 */
        if (status === 200 || status < 300 || status === 304) {
          /**  处理后端返回302 */
          if (config.url?.includes('account') && typeof response.data == 'string') {
            navigateTo('/account/login')
            return handleServiceResult(null, null)
          }

          const backend = response.data
          const { codeKey, code, dataKey } = this.backendConfig

          /**  业务代码不匹配：返回data */
          if (backend[codeKey] == 200) {
            return handleServiceResult(null, backend)
          }

          /** 业务代码不匹配：返回error */
          const error = handleBackendError(backend, this.backendConfig)
          return handleServiceResult(error, null)
        }

        /**  处理响应码不匹配【浏览器响应码】 */
        const error = handleResponseError(response)
        return handleServiceResult(error, null)
      }) as unknown as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,

      /**  响应失败错误捕获 */
      (axiosError: AxiosError) => {
        /**  处理后端返回302状态码 */
        const { response } = axiosError

        if (response?.status == 302) {
          navigateTo(response.headers.location)
        }

        /**  打印错误 */
        console.log(axiosError)

        /**  错误处理 */
        const error = handleAxiosError(axiosError)

        return handleServiceResult(error, null)
      }
    )
  }
}
