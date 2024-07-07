
// 屏蔽Google、Bing、Yahoo搜索引擎的收录
export const setSeoshielding = (row: Array<String>) => {
  // 'googlebot':'noindex', 'msvalidate.01':'NOINDEX, NOFOLLOW', 'robots':'noindex'
  if (!row) return
  const newObj = {}
  for (const [key, value] of Object.entries(row)) {
    // 检查值是否为数字，并且键是 'google', 'bing', 或 'yahoo'
    if (Number.isInteger(value) && ['google', 'bing', 'yahoo'].includes(key)) {
      // 根据键设置 newObj 的属性
      newObj[key === 'google' ? 'googlebot' : 'robots'] = 'noindex'
    }
  }
  return useSeoMeta(newObj as object)
}
