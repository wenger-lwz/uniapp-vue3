import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePlugins = defineStore('plugins', () => {
  const loaded = ref(false)
  const headers = ref()
  const setLoaded = (value: boolean) => {
    loaded.value = value
  }
  const setHeaders = (value: any) => {
    headers.value = value
  }
  return {
    loaded,
    setLoaded,
    headers,
    setHeaders,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlugins, import.meta.hot))
}
