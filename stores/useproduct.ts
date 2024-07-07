import { defineStore } from 'pinia'
export const useProductsresult = defineStore('productsresult', () => {
  const productsresult: any = ref({})
  const isProductShow = ref(false)
  const setResult = (value: any) => {
    productsresult.value = value
  }

  const changProductShow = (val: boolean) => {
    isProductShow.value = val
  }

  return {
    productsresult,
    isProductShow,
    setResult,
    changProductShow,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsresult, import.meta.hot))
}
