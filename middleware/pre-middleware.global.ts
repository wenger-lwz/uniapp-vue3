/**
 * 全局中间件文件：pre-middleware.global.ts
 * 定义了一个默认的Nuxt路由中间件
 * @param to - 跳转的目标路由
 * @param from - 跳转前的路由
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // 如果跳转前的路由有theme_id参数，而跳转后的路由没有theme_id参数
  if (from.query.theme_id && !to.query.theme_id) {
    // 跳转到目标路由，并将跳转前的路由的query参数复制给目标路由的query参数
    return navigateTo({
      ...to,
      query: from.query,
    })
  }
  // 如果跳转前的路由有local参数，而跳转后的路由没有local参数
  if (from.query.local && !to.query.local) {
    // 获取跳转前的路由的local参数
    const { local } = from.query
    // 跳转到目标路由，并将跳转前的路由的local参数添加到目标路由的query参数中
    return navigateTo({
      ...to,
      query: { ...to.query, local },
    })
  }
  // 如果在客户端跳转前的路由有isPreview参数，禁止跳转
  if (from.query.isPreview) {
    if (process.server) return
    return abortNavigation()
  }
})
