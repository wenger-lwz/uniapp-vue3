// plugins/i18n.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('useI18n', () => {
    // 在这里，你可以根据需要使用可组合函数或访问 Nuxt 实例
    const { t, locale } = useI18n() // 这只是一个示例；根据需要进行调整
    return { t, locale }
  })
})
