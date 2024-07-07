const entityList: string[] = ['account']
const entityList1: string[] = ['products', 'checkouts', 'orders']

/**
 * 根据提供的路径解析并返回规范化的路径
 * @param path 要解析的路径
 * @returns 规范化的路径
 */
export function useResolvePath(path: string): string {
  if (path === '/') return 'index'

  const matchedEntity = matchPath(path, entityList)
  if (matchedEntity) return convertURLToFormat(path)

  const matchedEntity1 = matchPath(path, entityList1)
  if (matchedEntity1) return convertURLToDetail(path)

  return path.substring(1)
}

/**
 * 将URL地址转换为指定形式
 * @param url URL地址
 * @returns 转换后的形式
 */
function convertURLToFormat(url: string): string {
  const trimmedURL = url.replace(/^\//, '')
  const convertedURL = trimmedURL.replace(/\//g, '_')
  return convertedURL
}

/**
 * 将URL地址转换为_detail
 * @param url URL地址
 * @returns 转换后的形式
 */
function convertURLToDetail(url: string): string {
  const trimmedURL = url.replace(/^\//, '')
  const segments = trimmedURL.split('/')
  const firstSegment = segments[0]
  return `${firstSegment}_detail`
}

/**
 * 匹配路径
 *
 * @param path 要匹配的路径
 * @param entityList 匹配的实体列表
 * @returns 匹配结果
 */
function matchPath(path: string, entityList: string[]): string | null {
  const regexPattern = new RegExp(`^\/(?:${entityList.join('|')})\/(.*)`)
  const matchResult = path.match(regexPattern)
  return matchResult ? matchResult[1] : null
}

/**
 * 根据路由配置动态匹配路径，不使用match字段
 * @param {string} path - 要检查的路
 * @returns {boolean} 匹配结果
 */
export function matchPathFromConfigWithoutMatch(path: string) {
  return router.find((route) => {
    // 检查是否为前缀匹配模式
    if (route.path.endsWith('*')) {
      // 创建用于前缀匹配的正则表达式，移除末尾的*并替换为匹配任意字符的正则表达式
      const pattern = new RegExp(`^${route.path.replace('*', '.+')}?$`)
      return pattern.test(path)
    } else {
      // 严格匹配
      return route.path === path
    }
  })
}

const router = [
  {
    path: '/checkouts',
    template_name: 'checkouts',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '订单',
            text_aling: 'center',
            title: '订单',
            buttonTextheight: 'center',
          },
          component: 'goodsOrder',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          index: '1',
          style: '',
          text: '订单',
          id: 'order1699598524847',
          type: '1-3',
          key: 1699598524849,
        },
      ],
    },
  },
  {
    path: '/album',
    template_name: 'album',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '专辑列表',
            text_aling: 'center',
            title: '专辑列表',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'albumList',
          child_data: [],
          childDetail: '',
          style: '',
          text: '专辑列表',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
    id: null,
  },
  {
    path: '/account/login',
    template_name: 'loginSetting',

    templates: {
      blocks: [
        {
          settings: {
            dec: 'Making it easier for cross-border industries to go global with one-stop integrated service solutions',
            blocks: [],
            name: '登录',
            logo: '',
            title: 'Cross border one-stop service',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'loginPage',
          child_data: [],
          childDetail: '',
          style: 'loginSetting',
          text: '登录',
          id: 'loginSetting1699998523018',
          key: 1699508523412,
        },
      ],
    },
    disableGlobal: true,
  },
  {
    path: '/',
    tplkey: 'index',

    templates: {
      settings: {
        PC: 0,
        display: 'horizontal',
        show: true,
        pc_display: 'horizontal',
        mob_display: 'horizontal',
        Mobile: 0,
      },
      blocks: [
        {
          settings: {
            times: '2000',
            blocks: [
              {
                settings: {
                  sec: 'Atypical leather goods',
                  dec: '',
                  mob_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
                  font_size: '12px',
                  pc_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
                  buttonlist: [
                    {
                      color: '#22AC35',
                      name: 'QUICK VIEW',
                      link: '',
                    },
                  ],
                  title: 'Industrial design meets fashion',
                },
                component: 'arousel',
                name: '轮播图',
                active: false,
                style: 'arouseldatail_Setting',
                id: 'arousel1699433602613',
                text: '轮播图',
                type: '1-4',
              },
              {
                settings: {
                  sec: 'Atypical leather goods',
                  dec: '',
                  mob_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
                  font_size: '12px',
                  pc_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
                  buttonlist: [
                    {
                      color: '#22AC35',
                      name: 'QUICK VIEW',
                      link: '',
                    },
                  ],
                  title: 'Industrial design meets fashion',
                },
                component: 'arousel',
                name: '轮播图',
                active: false,
                style: 'arouseldatail_Setting',
                id: 'arousel1699433602613',
                text: '轮播图',
                type: '1-4',
              },
            ],
            name: '图片',
            height: '60vh',
            imgList: [],
          },
          component: 'arousel',
          child_data: {
            sec: 'Atypical leather goods',
            dec: '',
            mob_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
            font_size: '12px',
            pc_img: 'https://imgs.chuhai-bang.com/oss/untitled.svg',
            buttonlist: [
              {
                color: '#22AC35',
                name: '按钮',
                link: '',
              },
            ],
            title: 'Industrial design meets fashion',
          },
          childDetail: 'arouseldatail_Setting',
          active: true,
          style: 'arouselSetting',
          id: 'arousel1699433602613',
          text: '轮播图',
          type: '1-4',
        },
        {
          settings: {
            buttonText: 'View More',
            blocks: [],
            columns: 3,
            slide: true,
            name: '商品分类',
            text: 'Tote Bags',
            content: [
              {
                image: 'https://imgs.chuhai-bang.com/oss/0647bf3b13.svg',
                name: 'Hobo Small',
              },
              {
                image: 'https://imgs.chuhai-bang.com/oss/2fdgff1e50c8.svg',
                name: 'Bo Soft Strap',
              },
              {
                image: 'https://imgs.chuhai-bang.com/oss/44613f1sd54f.svg',
                name: 'Hobo Large',
              },
            ],
          },
          component: 'productCategory',
          child_data: [],
          hidden: true,
          childDetail: 'productCategorysetting',
          active: false,
          style: 'productCategorysetting',
          id: 'productCategory1699433602613',
          text: '商品分类',
          type: '1-3',
        },
        {
          settings: {
            buttonText: 'View More',
            pcColumns: 3,
            maxnumber: 6,
            mobColumns: 3,
            blocks: [],
            slide: true,
            name: '精品商品',
            text: 'A new kind of bag',
            content: [
              {
                markPrice: '203',
                price: '100',
                title: 'Hobo Small',
                thumbs: 'https://imgs.chuhai-bang.com/oss/5643xcrwee3.svg',
              },
              {
                markPrice: '203',
                price: '230',
                title: 'Bo Soft Strap',
                thumbs: 'https://imgs.chuhai-bang.com/oss/643f7b6086.svg',
              },
              {
                markPrice: '303',
                price: '120',
                title: 'Storml',
                thumbs: 'https://imgs.chuhai-bang.com/oss/b657a71de7.svg',
              },
            ],
          },
          component: 'boutiqueProducts',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          style: 'boutiqueProductsSetting',
          id: 'boutiqueProducts1699433602613',
          text: '精品商品',
          type: '1-3',
        },
        {
          settings: {
            buttonText: 'View More',
            pcColumns: 3,
            maxnumber: 6,
            mobColumns: 3,
            blocks: [],
            slide: true,
            name: '精品商品',
            text: 'A new kind of bag',
            content: [
              {
                markPrice: '203',
                price: '100',
                title: 'Hobo Small',
                thumbs: 'https://imgs.chuhai-bang.com/oss/b657a71de7.svg',
              },
              {
                markPrice: '203',
                price: '230',
                title: 'Bo Soft Strap',
                thumbs: 'https://imgs.chuhai-bang.com/oss/643f7b6086.svg',
              },
              {
                markPrice: '303',
                price: '120',
                title: 'Storml',
                thumbs: 'https://imgs.chuhai-bang.com/oss/5643xcrwee3.svg',
              },
            ],
          },
          component: 'boutiqueProducts',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          style: 'boutiqueProductsSetting',
          id: 'boutiqueProducts1699433602614',
          text: '精品商品',
          type: '1-3',
        },
        {
          settings: {
            buttonName: 'QUICK VIEW',
            img: '',
            dec: 'Hobo Small Hobo SmallHobo',
            blocks: [],
            columns: 3,
            name: '图文模块',
            link: '',
            title: 'Off-White Odsy-1000 Low-Top Sneakers',
            content: {
              buttonName: 'QUICK VIEW',
              dec: 'Virgil Abloh’s Off-White is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown Odsy-1000 low-top sneakers.',
              color: '',
              mob_img: 'https://imgs.chuhai-bang.com/oss/r34w343e24c.svg',
              buttonLink: '',
              pc_img: 'https://imgs.chuhai-bang.com/oss/r34w343e24c.svg',
              title: 'Industrial design meets fashion',
            },
          },
          component: 'graphic',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          style: 'graphic_Setting',
          id: 'graphic1699433602613',
          text: '图文模块',
          type: '1-4',
        },
        {
          settings: {
            buttonName: 'QUICK VIEW',
            pc_lineHeight: true,
            dec: '<p>A sentence or two introducing your brand, what you sell, and what makes your brand compelling to customers.</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '富文本',
            text_aling: 'center',
            title: 'New Arrivals',
            buttonTextheight: 'center',
          },
          component: 'richText',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          style: 'richTextSetting',
          id: 'richText1699433602613',
          text: '富文本',
          type: '1-3',
        },
        {
          settings: {
            buttonName: '按钮',
            img: '',
            dec: 'Hobo Small Hobo SmallHobo',
            blocks: [],
            columns: 3,
            name: '图文列表',
            link: '',
            title: 'Off-White Odsy-1000 Low-Top Sneakers',
            content: [
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/0647bf3b13.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/2fdgff1e50c8.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/44613f1sd54f.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
            ],
          },
          component: 'imgList',
          child_data: {
            buttonName: '按钮',
            img: '',
            dec: 'Hobo Small Hobo SmallHobo',
            link: '',
            title: 'Off-White Odsy-1000 Low-Top Sneakers',
          },
          hidden: true,
          childDetail: 'imagelist_Setting',
          active: false,
          style: 'imagelist_Setting',
          id: 'imgList1699433602613',
          text: '图文列表',
          type: '1-4',
        },
        {
          settings: {
            buttonName: '按钮',
            img: '',
            dec: 'Hobo Small Hobo SmallHobo',
            blocks: [],
            columns: 3,
            name: '图文列表',
            link: '',
            title: 'Off-White Odsy-1000 Low-Top Sneakers',
            content: [
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/5643xcrwee3.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/643f7b6086.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
              {
                buttonName: 'QUICK VIEW',
                img: 'https://imgs.chuhai-bang.com/oss/b657a71de7.svg',
                dec: 'Hobo Small Hobo SmallHobo',
                link: '',
                title: 'Off-White Odsy-1000 Low-Top Sneakers',
              },
            ],
          },
          component: 'imgList',
          child_data: {
            buttonName: '按钮',
            img: '',
            dec: 'Hobo Small Hobo SmallHobo',
            link: '',
            title: 'Off-White Odsy-1000 Low-Top Sneakers',
          },
          hidden: true,
          childDetail: 'imagelist_Setting',
          active: false,
          style: 'imagelist_Setting',
          id: 'imgList1699433602623',
          text: '图文列表',
          type: '1-4',
        },
        {
          settings: {
            subTitle: 'Signup for our newsletter to stay up to date on sales and events.',
            blocks: [],
            name: '邮件订阅',
            title: 'Subscribe to our newsletter',
          },
          component: 'mailSubscription',
          child_data: [],
          hidden: true,
          childDetail: null,
          active: false,
          style: 'mailSubscriptionSetting',
          id: 'mailSubscription1699433602613',
          text: '邮件订阅',
          type: '1-3',
        },
      ],
      type: 'sections',
    },
  },
  {
    path: '/cart',
    tplkey: 'cart',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '购物车',
            text_aling: 'center',
            title: '购物车',
            buttonTextheight: 'center',
          },
          component: 'shoppingCart',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          style: '',
          text: '购物车',
          id: 'carts1699598523018',
          type: '1-3',
          key: 1699598523020,
        },
      ],
    },
  },
  {
    path: '/products/*',
    template_name: 'productDatail',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '商品详情',
            text_aling: 'center',
            title: '商品详情',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'productDatail',
          child_data: [],
          childDetail: '',
          style: '',
          text: '商品详情',
          id: 'productDatail1699998523018',
          key: 1699508523412,
        },
      ],
    },
  },
  {
    path: '/search',
    template_name: 'search',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '搜索结果',
            text_aling: 'center',
            title: '搜索结果',
            buttonTextheight: 'center',
          },
          component: 'search',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          index: '1',
          style: '',
          text: '搜索结果',
          id: 'orderList1699998523018',
          type: '1-3',
          key: 1699508523412,
        },
      ],
    },
    id: null,
  },

  {
    path: '/pages/*',
    tplkey: 'pages',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '自定义页面',
            text_aling: 'center',
            title: '自定义页面',
            buttonTextheight: 'center',
          },
          component: 'pages',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          index: '1',
          style: '',
          text: '自定义页面',
          id: 'pages1699598523018',
          key: 1699598523025,
        },
      ],
    },
  },
  {
    path: '/collections',
    template_name: 'album',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '专辑列表',
            text_aling: 'center',
            title: '专辑列表',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'albumList',
          child_data: [],
          childDetail: '',
          style: '',
          text: '专辑列表',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
  },
  {
    path: '/account/orders',
    template_name: 'orderList',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '订单列表',
            text_aling: 'center',
            title: '订单列表',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'myOrder',
          child_data: [],
          childDetail: '',
          style: '',
          text: '订单列表',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
    id: null,
  },
  {
    path: '/checkouts/*',
    template_name: 'checkouts',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '订单',
            text_aling: 'center',
            title: '订单',
            buttonTextheight: 'center',
          },
          component: 'goodsOrder',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          index: '1',
          style: '',
          text: '订单',
          id: 'order1699598524847',
          type: '1-3',
          key: 1699598524849,
        },
      ],
    },
  },
  {
    path: '/account/address',
    template_name: 'address',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '收货地址',
            text_aling: 'center',
            title: '收货地址',
            buttonTextheight: 'center',
          },
          component: 'address',
          child_data: [],
          hidden: true,
          childDetail: '',
          active: false,
          index: '1',
          style: '',
          text: '收货地址',
          id: 'address1699598523018',
          type: '1-3',
          key: 1699598523020,
        },
      ],
    },
  },
  {
    path: '/orders',
    template_name: 'orderList',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '订单列表',
            text_aling: 'center',
            title: '订单列表',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'myOrder',
          child_data: [],
          childDetail: '',
          style: '',
          text: '订单列表',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
  },
  {
    path: '/collections/*',
    template_name: 'album',

    templates: {
      blocks: [
        {
          settings: {
            blocks: [],
            name: '专辑详情',
            title: '专辑详情',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'albumdatail',
          child_data: [],
          childDetail: '',
          style: '',
          text: '专辑详情',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
  },
  {
    path: '/orders/*',
    template_name: 'orderList',

    templates: {
      blocks: [
        {
          settings: {
            buttonName: 'click',
            pc_lineHeight: true,
            dec: '<p>Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo Hobo Small Hobo SmallHobo</p>',
            mob_lineHeight: true,
            buttonColor: '',
            blocks: [],
            buttonLink: '',
            name: '订单详情',
            text_aling: 'center',
            title: '订单详情',
            buttonTextheight: 'center',
          },
          rightcom: '',
          hidden: true,
          active: false,
          index: '1',
          type: '1-3',
          component: 'orderDatail',
          child_data: [],
          childDetail: '',
          style: 'orderDatail',
          text: '订单详情',
          id: 'orderList1699998523018',
          key: 1699508523412,
        },
      ],
    },
  },
]