/* 301链接跳转 */
export const setRedirectRoute = (arr: any[], path: string) => {
  const nuxtApp = useRequestURL()
  let Domain = `${nuxtApp.origin}${path}`
  if(Array.isArray(arr)){
    let cunt = arr.filter((i) => i.oldUri == Domain && i.enabled == 1)
    if (cunt.length > 0) {
      navigateTo(cunt[0].newUrl, {
        redirectCode: 301,
        external: true,
      })
    }
  }

}
