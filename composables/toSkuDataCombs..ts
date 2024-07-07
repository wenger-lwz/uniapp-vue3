interface Data1 {
  [key: string]: {
    [key: string]: {
      title: string
    }
  }
}

interface Data2 {
  [key: string]: {
    [key: string]: {
      combsPrice: number
      quantity: number
      [key: string]: any
    }
  }
}

interface Product {
  p: string
  vs: {
    [key: string]: number
  }
  sku: {
    [key: string]: {
      combsPrice: number
      stock: number
      id: string
      sku_attrs: {
        [key: string]: string
      }
    }
  }[]
}

interface ClonedData {
  product: Product[]
}

export default function toSkuDataCombs(data1: Data1, data2: Data2, data: ClonedData[]): ClonedData[] {
  const clonedData: ClonedData[] = JSON.parse(JSON.stringify(data))
  const titles: string[] = Object.values(data1).flatMap((obj) => Object.values(obj).map((item) => decodeURIComponent(item.title)))

  Object.values(data2).forEach((obj) => {
    clonedData.forEach((item) => {
      item.product.forEach((product) => {
        product.sku = JSON.parse(JSON.stringify(data2[product.p]))

        Object.entries(product.vs).forEach(([vs, value]) => {
          const skuAttrs: { [key: string]: string } = Object.fromEntries(
            titles
              .map((element, index) => {
                if (product.sku[vs][`opt${index + 1}`]) {
                  return [element, decodeURIComponent(product.sku[vs][`opt${index + 1}`])]
                }
              })
              .filter(Boolean) as [string, string][]
          )

          product.sku[vs].combsPrice = value
          product.sku[vs].stock = product.sku[vs].quantity
          product.sku[vs].id = vs
          product.sku[vs].sku_attrs = skuAttrs
        })

        product.sku = Object.values(product.sku)
      })
    })
  })

  return clonedData
}
