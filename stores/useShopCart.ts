import { getShopCarcount } from '~/services/api'

/**
 * 使用购物车
 */
export const useShopCart = defineStore('shopCart', () => {
  const count = ref(0)
  const showCart = ref(false)
  return {
    count,
    showCart,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShopCart, import.meta.hot))
}
