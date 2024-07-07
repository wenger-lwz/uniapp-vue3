type Data = {
  [key: string]: {
    [key: string]: {
      title: string
      price: number
      quantity: number
      image_src: string
      [key: string]: string | number
    }
  }
}

export function toSkuData(a: Data, b: Data) {
  if (Array.isArray(b) && b.length) {
    const c = b.map((item) => {
      const sku_attrs = {}

      Array.isArray(item.options) &&
        item.options.length &&
        item.options.forEach((option) => {
          sku_attrs[option.name] = option.value
        })
      console.log(sku_attrs)

      return {
        id: item.id,
        price: parseFloat(item.price),
        stock: item.available_quantity,
        image: item.image,
        sku_attrs,
      }
    })
    console.log(c)

    return c
  }

  return []
}
export function toSkuData_index(a: Data, b: Data) {
  if (Array.isArray(b) && b.length) {
    const c = b.map((item) => {
      const sku_attrs = {}

      Array.isArray(item.options) &&
        item.options.length &&
        item.options.forEach((option) => {
          sku_attrs[option.name] = option.value
        })

      return {
        id: item.id,
        price: parseFloat(item.price),
        stock: item.available_quantity,
        sku_attrs,
      }
    })
    return c
  }

  return []
}
