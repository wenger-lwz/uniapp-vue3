import { getMarketsPlugsJsonAPI } from '~/services/api'

/**  使用市场营销 */
export const useMarkets = defineStore('useMarkets', () => {
  /**  市场插件数据 */
  const markets = ref()

  /**  获取市场插件数据 */
  const getAPiData = async () => {
    const { data } = await getMarketsPlugsJsonAPI()
    if (data) {
      markets.value = data?.data
    }
  }

  /**  获取获取 */
  const getMarketsData = async () => {
    if (markets.value) {
      await getAPiData()
    }
    return markets
  }
  return {
    getMarketsData,
  }
})
