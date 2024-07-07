// Declare the dLayers property
declare global {
  interface Window {
    dLayers: {
      event: 'event' | 'checkout' | 'pay_success' | 'add_cart' | 'remove_from_cart' | 'view_product'
      eid?: string
      value?: string
      currency?: string
      price?: string
      label?: string
      combos?: string
    }[]
  }
}

// 立即购买 加入购物车 购物车数量 增加 减少 source add_cart buy_it_nnow
export function DLayers(
  event: 'event' | 'checkout' | 'pay_success' | 'add_cart' | 'remove_from_cart' | 'view_product',
  key_o?: string,
  proid?: string,
  varid?: string,
  source?: string,
  num?: string,
  cur_code?: string,
  combos?: string
) {
  window?.dLayers?.push({
    event,
    eid: '2' + key_o + proid + varid,
    label: source + '-p' + proid + '-v' + varid + '-n' + num + '-k' + key_o,
    currency: cur_code,
    combos: combos,
  })
}

// 删除购物车：
//  dLayers.push({'event':'remove_from_cart','eid':'1'+key_o+proid+varid,'label':source+'-p'+proid+'-v'+varid+'-n'+num+'-k'+key_o,'currency':cur_code,'combos':combos});
// 立即购买 加入购物车 购物车数量增加 减少
//  dLayers.push({'event':'add_cart','eid':'2'+key_o+proid+varid,'label':source+'-p'+proid+'-v'+varid+'-n'+num+'-k'+key_o,'currency':cur_code,'combos':combos});
// 进入到checkouts 下单页面
//  dLayers.push({'event':'checkout','eid':'{$key_o}','label':'{$key_o}','price':'{$total_price}','currency':cur_code});
// 下单成功页面(订单详情页面)返回字段success == 1
//  dLayers.push({'event':'pay_success','eid':"{$order_info['order_sn']}",'value':"{$order_info['total_price']}",'currency':"{$order_info['currency']}"});
