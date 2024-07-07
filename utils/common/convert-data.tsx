/** 数据转换函数 */
export const convertData = (data: any[]): any[] => {
  return data.map((item: any) => {
    const children = item.son && item.son.length > 0 ? convertData(item.son) : null
    const label = () => {
      if (item.url) {
        return (
          <NuxtLink target={item.target} href={item.url}>
            {item.name}
          </NuxtLink>
        )
      }
      return item.name
    }
    return {
      label,
      key: item.name.toLowerCase().replace(/\s/g, '-'),
      ...(children && { children }),
    }
  })
}
