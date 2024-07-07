import { isArray } from './common'

/**
 * @description  校验失败滚动到对应的错误位置
 * @export
 */
export function elFormErrorScrollIntoView() {
  // 获取第一个校验错误的元素
  const element = document.querySelectorAll('.n-form-item-feedback__line')[0] as HTMLElement
  // 滚动到错误元素对应位置
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}

/**
 * @description 防抖函数
 * @export
 * @param {Function} fn
 * @param {number} delay
 * @return {void}
 */
export function debounce(fn: Function, delay: number = 200): () => void {
  let timer: NodeJS.Timeout

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * @description 节流函数
 *
 * @export
 * @param {Function} fn
 * @param {number} wait
 * @return {Function}
 */
export function throttle(fn: Function, wait: number = 200): Function {
  let timer: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}

/**
 * @description 格式化货币
 * @export
 * @param {number} [price=88.8]
 * @return {*}
 */
export function formatPrice(price: number = 88.8): string {
  const provideCurrency = inject('currency', null)
  const currency = provideCurrency || useCookie('currency_code')
  const language = useCookie('language')
  const finance = useCookie('finance')
  return new Intl.NumberFormat(language.value || 'zh-CN', {
    style: 'currency',
    currency: currency.value || 'CNY',
  }).format((price * (finance.value || 1)).toFixed(2))
}

/**
 * @description 执行html里面js代码
 * @export
 * @param {string} containerElement
 */
export function executeScriptElements(containerElement: string) {
  const scriptElements = document.querySelector(containerElement)?.querySelectorAll('script')
  if (isArray(scriptElements)) {
    Array.from(scriptElements)?.forEach((scriptElement) => {
      const clonedElement = document.createElement('script')

      clonedElement.text = scriptElement.textArray.from(scriptElement.attributes).forEach((attribute: Attr, index: number, array: Attr[]) => {
        clonedElement.setAttribute(attribute.name, attribute.value)
      })

      scriptElement.parentNode.replaceChild(clonedElement, scriptElement)
    })
  }
}

/**
 * @description 动画
 * 元素显示隐藏动画效果
 * 给 transitions 使用
 */
const listeners = ref({
  // 元素由隐藏变为可见
  onEnter(el: HTMLElement) {
    el.style.height = 'auto' // 将高度设为auto，是为了获取该元素的计算高度
    const endHeight = window.getComputedStyle(el).height // 计算高度
    el.style.height = '0px' // 将高度再设置为0
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = endHeight // 设置为计算高度
  },
  onAfterEnter(el: HTMLElement) {
    el.style.height = '' // 过渡进入之后，将高度恢复为null
  },
  // 元素由可见变为隐藏
  onLeave(el: HTMLElement) {
    el.style.height = window.getComputedStyle(el).height // 计算高度
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = '0px' // 将高度设置为0
  },
  onAfterLeave(el: HTMLElement) {
    el.style.height = '' // 过渡离开之后，将高度恢复为null
  },
})
