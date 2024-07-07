/**
 * @description 加载字体函数
 * @param fonts 需要加载的字体
 *
 *  */
export async function loadFonts(fonts: { family: string; weight: number }[]): Promise<void> {
  const fontPromises = Object.keys(fonts).map((f) => {
    return new Promise<void>((resolve, reject) => {
      const fontId = `font-${fonts[f].family.replace(/\s+/g, '-').toLowerCase()}-${fonts[f].weight}`
      if (!document.getElementById(fontId)) {
        const head = document.getElementsByTagName('HEAD')[0]
        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = `https://cdn.jsdelivr.net/npm/@fontsource/${fonts[f].family}/${fonts[f].weight}.css`
        link.onload = resolve // 当CSS加载完成时，解决Promise
        link.onerror = reject // 如果加载失败，拒绝Promise
        head.appendChild(link)
      } else {
        resolve() // 如果已加载，直接解决Promise
      }
    })
  })

  return Promise.all(fontPromises).then(() => {})
}

// Nuxt 3中使用useHead来动态添加字体资源
export function loadFontsSSR(fonts: { family: string; weight: number }[]) {
  if (fonts) {
    // 使用Nuxt 3的useHead函数来动态添加<link>标签
    useHead({
      link: Object.keys(fonts).map((f) => ({
        rel: 'stylesheet',
        type: 'text/css',
        href: `https://cdn.jsdelivr.net/npm/@fontsource/${fonts[f].family}/${fonts[f].weight}.css`,
        id: `font-${fonts[f].family.replace(/\s+/g, '-').toLowerCase()}-${fonts[f].weight}`,
      })),
    })
  }
}
