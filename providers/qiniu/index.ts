import { joinURL, parseURL, withQuery } from 'ufo'
import type { ImageCTX, ImageOptions, ProviderGetImage, ResolvedImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

import { formatter } from './formatter'
import { keyMap } from './keyMap'
import { valueMap } from './valueMap'

interface PreprImageOptions extends ImageOptions {
  qiniu: string
}

type PreprProviderGetImage = (src: string, options: PreprImageOptions, ctx: ImageCTX) => ResolvedImage

const operationsGenerator = createOperationsGenerator({
  formatter,
  keyMap,
  valueMap,
})

const QINIU_URL = parseURL('https://imgs.chuhai-bang.com').host
const SHOPIFY_URL = parseURL('http://cdn.shopify.com').host

export const getImage: PreprProviderGetImage = (src, options, _ctx) => {
  /**  判断是否为七牛云oss */
  if (parseURL(src)?.host == QINIU_URL) {
    /**  svg图片 跳过优化 */
    if (src.endsWith('.svg')) {
      return {
        url: src,
      }
    }
    const operations = operationsGenerator(options.modifiers)
    /**  返回七牛云oss优化地址 */
    return {
      url: joinURL(src + '?imageView2/0/' + (operations ? operations : '')),
    }
  }

  /**  判断是否为shopify */
  if (parseURL(src)?.host == SHOPIFY_URL) {
    if (options.modifiers) {
      /**  返回SHOPIFY oss优化地址 */
      return {
        url: withQuery(src, options.modifiers),
      }
    }
  }
  return {
    url: src,
  }
}
