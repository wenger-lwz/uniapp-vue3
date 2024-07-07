/**
 * 递归数据
 *
 * @export
 * @param {Array<Category.Data>} categories
 * @param {number} [parentId=0]
 * @return {Category.Data[]}
 */
export function processCategories(categories: Array<Category.Data>, parentId: number = 0): Category.Datum[] {
  const result: Category.Datum[] = []

  categories.forEach((category) => {
    if (category.pid === parentId) {
      const children = processCategories(categories, category.id)

      result.push({
        id: category.id,
        pid: category.pid,
        handle: category.handle,
        tuijian: category.tuijian,
        name: category.name,
        image: category.image,
        sort: category.sort,
        conditionT: category.conditionT,
        conditions: category.conditions,
        sid: category.sid,
        children: children.length > 0 ? children : null,
      })
    }
  })

  return result.sort((a, b) => a.sort - b.sort)
}

/**
 * 生成随机id
 *
 * @export
 */
export function generateRandomId(length: number = 6): string {
  const numbers = '0123456789'
  let id = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    id += numbers[randomIndex]
  }
  return id
}

/**
 * 判断某个原生DOM元素是否不在屏幕可见区内
 * @param {*} el 原生DOM元素
 */
const isElementNotInViewport = function (el: any) {
  let rect = el.getBoundingClientRect()
  return rect.top >= (window.innerHeight || document.documentElement.clientHeight) || rect.bottom <= 0
}

export { isElementNotInViewport }
