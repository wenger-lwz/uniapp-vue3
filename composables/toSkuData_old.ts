export default function (data1, data2) {
  const res = Object.keys(data1)
    .map((key) => {
      return Object.keys(data1[key]).map((i) => {
        return decodeURIComponent([data1[key][i].title])
      })
    })
    .flat()
  const res2 = Object.keys(data2).map((key) => {
    return Object.keys(data2[key]).map((i) => {
      return {
        price: data2[key][i].price,
        stock: data2[key][i].quantity,
        id: i,
        sku_attrs: {
          ...Object.assign(
            {},
            ...res.map((element, index) => {
              if (data2[key][i][`opt${index + 1}`]) {
                return {
                  [element]: decodeURIComponent(data2[key][i][`opt${index + 1}`]),
                }
              }
            })
          ),
        },
        image_src: data2[key][i].image_src,
      }
    })
  })
  return res2
}
