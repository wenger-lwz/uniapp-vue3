namespace COD {
  /**  cod信息  */
  export interface Codset {
    /**  是否为cod */
    isCod: number
    /**  主题名 */
    tpl: string
    /**  单页默认语言*/
    langs: string
    /**  国家 */
    country: string[]
    /**  默认台湾商超 */
    scs: string[]
    /**  单页默认货币 */
    currency: string
    /**  邮箱等表单控制 */
    xd: Xd
    /**  投放单个国家 */
    singc: boolean
    /**  组合加购 */
    enabled_cart_bundles: number
    /**  捆绑销售 */

    enabled_prod_bundles: number

    /**  默认投放国家/地区 */
    codcountry: string[]
    /** 推荐商品  */
    recommend_prod: Recommend[]
  }
  export interface Recommend {
    id: string
    title: string
    handle: string
    price: string
    market_price: string
    thumbs: string
  }
  /**  产品信息 */
  export interface Product {
    [x: string]: any
    id: string
    title: string
    alias: string
    handle: string
    cat_id: string
    thumbs: string
    video_url: any
    price: string
    market_price: string
    shipp_price: string
    tuijian: string
    view_num: string
    sell_num: string
    limit_num: string
    quantity: string
    status: string
    conts: string
    tags: string
    created_at: string
    update_at: string
    sort: string
    vendor: string
    type: string
    sid: string
    gtin: any
    mpn: any
    virtuals: any
    combos: string
    copy_id: any
    images: Images[]
    variantid: number
    variants: VariantsItem[]
  }
  interface Xd {
    /**  邮箱 */
    mail: string
    /**  邮编 */
    postal: string
    /**  区、街道、门牌号 */
    landmark: string
    /**  附近标志性建筑 */
    apart: string
  }
  interface Image {
    src: any
    width: string
    height: string
    alt: string
    path: string
    aspect_ratio: number
  }

  interface Options {
    name: string
    value: string
  }

  export type VariantsItem = {
    id: string
    title: string
    position: string
    price: string
    sell_num: string
    weight: string
    sku: any
    option1: string
    option2: string
    option3: string
    available: boolean
    available_quantity: number
    inventory_quantity: number
    note: string
    image: Image
    compare_at_price: string
    url: string
    weight_unit: string
    off_ratio: number
    flashsale_info: any[]
    sales: number
    options: Options[]
  }

  interface Images {
    id: string
    prod_id: string
    position: any
    alt: any
    src: string
    is_local: string
    sid: string
  }
}
