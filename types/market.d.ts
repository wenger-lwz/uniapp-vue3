declare namespace Market {
  interface Market_API_TYPE {
    state: number
    msg: string
    market: Market_TYPE
    code: number
  }
  interface Market_TYPE {
    coupon: string
    sold: string
    djst: string
    dzgz: string
    view: string
    ships: string
    inventory: string
    btime: string
    showt: string
  }
}
