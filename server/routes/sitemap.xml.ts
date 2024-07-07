export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const headers = new Headers()
  for (const [key, value] of Object.entries(event.req?.headers)) {
    headers.append(key, value as any)
  }
  const repo = await $fetch(`${config.baseUrl}/home/sitemap`, {
    method: 'get',
    headers: headers,
    params: {
      xi: headers['fc-shopid'],
      xn: headers['fc-shopname'],
      xk: headers['fc-key'],
    },
  })
  event.res.setHeader('Content-Type', 'text/xml')
  return repo
})
