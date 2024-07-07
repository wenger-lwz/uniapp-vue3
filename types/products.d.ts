declare namespace Product {
  interface Variants {
    id: string
    prod_id: string
    title: string
    price: string
    image_src: string
  }

  interface Products {
    id: string
    title: string
    handle: string
    price: number
    market_price: string
    thumbs: string
    variants: Variants[]
    [key: string]: any
  }

  /**  组合捆绑销售 api 返回接口 */
  type BundleSales = {
    enabled: number
    title: string
    productIds: number[]
    mainProductId: number
    canShowProduct: number
    discountType: number
    discountValue: number
    buyType: number
    placementType: number
    id: string
    products: Products[]
    [key: string]: any
  }

  /**  组合加购，捆绑销售 立即购买 api */
  interface BuyNowAPI {
    /**  pbundle捆绑;cbundles组合 */
    source: 'pbundle' | 'cbundles'
    /**  捆绑和销售数据返回的id值 */
    okey: string
    inum: string
    /**  {"产品1ID","属性ID","产品2ID","属性ID"} */
    pvids: {
      [key: sting]: any
    }
    /** source=cbundles时必填{"产品1ID","数量","产品2ID","数量"}  */
    pnids?: {
      [key: sting]: any
    }
  }
}
