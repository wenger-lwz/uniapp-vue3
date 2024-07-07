// middleware/redirect.js

/**
 * 黑名单功能 - 待定
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const clientIp = useRequestHeader('x-forwarded-for')

  // 检查条件，例如 IP 地址或其他条件
  if (clientIp === '192.168.128.34') {
    // 如果满足条件，重定向到指定的 URL
    navigateTo('https://www.baidu.com', {
      replace: true,
      external: true,
      redirectCode: 302,
    })
  }

  // 如果不满足条件，正常继续
})
