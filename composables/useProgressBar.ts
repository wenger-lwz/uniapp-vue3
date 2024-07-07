export const useProgressBar = () => {
  const nuxtApp = useNuxtApp()
  const loading = ref(true)
  /**  页面加载-加载条 */
  nuxtApp.hook('page:start', () => {
    loading.value = true
  })
  nuxtApp.hook('page:finish', () => {
    loading.value = false
  })
}
