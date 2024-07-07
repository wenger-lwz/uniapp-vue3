/**
 * 格式会货币
 *
 * @param {number|string} price
 * @param {string} currency
 * @return {string}
 */
export const formatPrice = (price = 88.8, finance = 1, currency = 'CNY'): string => {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency }).format(price * finance)
}
