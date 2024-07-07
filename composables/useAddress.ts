import { shopAddress } from '~/services/api'
type AddRessList = {
  id: string
  uid: string
  first_name: string
  last_name: string
  tel: string
  email: string
  company: string
  country_code: string
  country: string
  province: string
  province_code: string
  city: string
  area: string
  address: string
  zipcode: string
  taxcode: string
  default: string
  [key: string]: any
}

export const useAddress = () => {
  const addressList = ref<AddRessList[]>([])
  const loading = ref(false)
  /** 获取地址信息  */
  const getAddressList = async () => {
    loading.value = true
    try {
      const res: any = await shopAddress({
        addrid: null,
        source: 'list',
      })
      if (res.data.statue == -1) {
        navigateTo('/account/login')
      }
      addressList.value = res?.data?.data
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return {
    /**  获取地址 */
    getAddressList,
    /**  加载状态 */
    loading,
    /**  地址列表 */
    addressList,
  }
}
