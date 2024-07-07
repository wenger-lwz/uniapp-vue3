import axios from 'axios'
import { getCountry } from '~/services/api'

/**  国家省份城市 三级联动 */
export const useAreaData = (form: Ref<any>) => {
  /**  获取所有国家 */
  const { data: country } = useAsyncData(getCountry, {
    server: false,
    lazy: true,
  })

  /** 国家列表 */
  const countriesOptions = computed(() => {
    if (country.value?.data) {
      delete country.value?.data?.code
      return Object.keys(country.value?.data).map((key) => {
        return {
          ...country.value?.data[key],
          code: key,
        }
      })
    }
  })

  /** 省份列表 */
  const provideOptions = computed(() => {
    /**  数据装换 */
    if (form.value.country) {
      const result = countriesOptions.value?.find((k) => {
        return form.value.country == k.name
      })
      if (result) {
        return Object.keys(result.states).map((k) => {
          return {
            label: result.states[k],
            value: k,
          }
        })
      }
    }
  })

  /** 城市列表 */
  const cityOptions = ref<any>([])

  /** 市区列表 */
  const areaOptions = computed(() => {
    if (cityOptions.value) {
      return cityOptions.value?.find((item: any) => {
        return form.value.city == item.name
      })
    }
    return []
  })

  /** 地区改变 */
  const apartmentOptions = ref<any>([])

  /**  更新表单值 */
  const updateFormValues = () => {
    form.value.provide = null
    form.value.provide_code = null
    form.value.city = null
    form.value.apartment = null
    cityOptions.value = null
    form.value.addr = null
  }

  /**  查找国家code并赋值 */
  const findCountryCode = (val: string) => {
    /**  数据转换 */
    const result = countriesOptions.value?.find((k) => k.name == val)
    if (result) {
      form.value.country_code = result.code
    }
  }

  /** 国家修改 */
  const countriesChange = (val: any) => {
    updateFormValues()
    findCountryCode(val)
  }

  /** '国家联动api'
   * rtype: 2:城市，code:string[国家id] pid:'省份id'
   * rtype: 3：区域，code:string[国家id] pid:'城市id'
   * rtype:  4：全家 pid:'区域id'
   * rtype: 5：711 pid:'区域id'
   */

  /** 省份改变 */
  const provideChange = async (val: string) => {
    form.value.city = null
    form.value.apartment = null
    form.value.addr = null
    cityOptions.value = null

    if (val) {
      await axios
        .get('/api/home/get_regions', {
          params: {
            code: form.value.country_code,
            rtype: 2,
            pid: val,
          },
        })
        .then((res) => {
          const { code, ...data } = res.data
          if (data) {
            cityOptions.value = Object.keys(data).map((i) => {
              return data[i]
            })
          } else {
            cityOptions.value = []
          }
        })
    }
  }

  /** 城市选项改变 */
  const cityChange = () => {
    form.value.apartment = null
    form.value.addr = null
    axios('/api/home/get_regions', {
      params: {
        rtype: form.value.cargo,
        pid: form.value.provide,
      },
    }).then((res) => {
      const { code, ...data } = res.data
      if (data) {
        apartmentOptions.value = Object.keys(data).map((i) => {
          return data[i]
        })
      } else {
        apartmentOptions.value = []
      }
    })
  }

  /** 送货方式修改 */
  watch(
    () => form.value.cargo,
    () => {
      form.value.apartment = null
      apartmentOptions.value = null
      form.value.addr = null
      axios
        .get('/api/home/get_regions', {
          params: {
            rtype: form.value.cargo,
            pid: areaOptions.value.id,
          },
        })
        .then((res) => {
          const { code, ...data } = res.data
          if (data) {
            apartmentOptions.value = Object.keys(data).map((i) => {
              return data[i]
            })
          } else {
            apartmentOptions.value = []
          }
        })
    }
  )

  return {
    /**  国家列表 */
    countriesOptions,
    /**  省份列表 */
    provideOptions,
    /**  城市列表 */
    cityOptions,
    /**  市区列表 */
    areaOptions,
    /**  地区列表 */
    apartmentOptions,

    /**  国家改变 */
    countriesChange,
    /**  省份改变 */
    provideChange,
    /**  城市选项改变 */
    cityChange,
  }
}
