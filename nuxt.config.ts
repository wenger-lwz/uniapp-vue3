// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
/**  路由配置 */
// import i18n from './config/i18n'
// import NuxtImg from './config/NuxtImg'
import { routeRules } from './config/route-rules'
export default defineNuxtConfig({
  /**
   * nuxt3-image 配置
   */
  image: {
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
    domains: ['https://imgs.chuhai-bang.com'],
    providers: {
      qiniu: {
        provider: '~/providers/qiniu/index',
      },
    },
  },

  /**
   * 实验性特征
   */
  experimental: {
    componentIslands: true, //启用实验性的组件岛支持，使用 <NuxtIsland> 和 .island.vue 文件。
    asyncEntry: true, //启用 Vue 捆绑包的异步入口点生成，以支持模块联邦。
    asyncContext: true, //启用原生异步上下文以便在 Nuxt 和 Nitro 中的嵌套组合式中访问。这样可以在异步组合式中使用组合式并减少出现 Nuxt 实例不可用 错误的几率
    // restoreState: true, //在重新加载页面后，允许从 sessionStorage 恢复 Nuxt 应用程序状态，以解决块错误或手动 reloadNuxtApp() 调用。
    // clientFallback: true, //在 SSR 中发生错误时，在客户端使用实验性的 <NuxtClientFallback> 组件渲染内容。
    // writeEarlyHints: true, //在使用 Node 服务器时启用写入提前提示。
    // typedPages: true, //启用新的实验性类型化路由器，使用 unplugin-vue-router。
  },

  /**
   * 功能标识
   */
  features: {
    inlineStyles: false, //或用于确定内联的函数
  },

  /**
   * 全局导入
   */
  imports: {
    dirs: ['./stores'],
  },

  /**
   * 开发者工具
   */
  devtools: {
    enabled: true,
  },

  /**
   * 开发者服务器
   */
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  /**
   * nitro 服务器配置
   */
  nitro: {
    // compressPublicAssets: true,
    devProxy: {
      '/api': {
        target: process.env.BASE_URL,
        changeOrigin: true,
        autoRewrite: false,
        prependPath: true,
      },
      '/vipapi': {
        target: 'http://192.168.130.244:8080/adminapi',
        changeOrigin: true,
        autoRewrite: false,
        prependPath: true,
      },
    },
    // routeRules:
    //   process.env.NODE_ENV === 'development'
    //     ? {
    //         '/api/**': {
    //           proxy: process.env.BASE_URL + '/**',
    //         },
    //       }
    //     : {},

    // esbuild: {
    //   options: {
    //     drop: ['console'],
    //   },
    // }
  },

  /**
   * 打包配置
   */
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
    // 添加 jQuery 到全局变量
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //   }),
    // ],
  },

  /**
   * vite 配置
   */
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone'] : [],
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ],
    ssr: {
      noExternal: ['naive-ui'],
    },
    build: {
      chunkSizeWarningLimit: 1500,
    },

    // esbuild: process.env.NODE_ENV === 'production' ? { pure: ['console.log'] } : {},
  },

  /**
   * 运行时配置信息
   */
  runtimeConfig: {
    baseUrl: process.env.BASE_URL,
    public: {},
  },

  /**
   * 路由配置信息
   */
  routeRules,

  /**
   * redis 缓存配置
   */
  elasticCache: {
    enabled: false,
    storage: {
      type: 'redis',
      redis: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PWD,
        db: 10,
      },
    },
    pages: ['/', '/blog/*', '/pages/*', '/products/*'],
    key: (req, crypto) => {
      if (!req.url) {
        return false
      }
      const path = req.url.includes('?') ? req.url.split('?')[0] : req.url
      const hearderKey =
        (((req.headers['fc-shopname'] as any) + req.headers['fc-shopid']) as any) +
        '_' +
        crypto.createHash('shake256', { outputLength: 8 }).update(path).digest('hex')
      return hearderKey
    },
  },

  /**
   * 由于StackBlitz错误而发表评论
   * Issue: https://github.com/shopware/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    // strict: false,
    shim: false,
  },

  /**
   * 压缩插件配置
   */
  // compression: {
  //   // options
  //   viteCompression: {
  //     algorithm: 'gzip',
  //   },
  // },

  /**
   * 模块信息
   */
  modules: [
    'nuxt-lodash',
    // '@averjs/nuxt-compression',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@nuxt/image',
    '@artmizu/nuxt-prometheus',
  ],
  // '@bluesyoung/nuxt3-lazy-load': {
  //   native: true,
  //   OSSProvider: 'qiniu',
  //   OSSProcess: 'imageView2/0/format/webp/interlace/1/q/50',
  // },
  // delayHydration: {
  //   // enables nuxt-delay-hydration in dev mode for testing
  //   // NOTE: you should disable this once you've finished testing, it will break HMR
  //   debug: process.env.NODE_ENV === 'development',
  // },

  /**
   * nuxt-svgo 配置
   */
  svgo: {
    defaultImport: 'component',
    componentPrefix: 'icon',
  },
  // components: true,

  /**
   * lodash 配置
   */
  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => stringToCamelCase
      ['kebabCase', 'stringToKebab'], // => stringToKebab
      ['isDate', 'isLodashDate'], // => _isLodashDate
    ],
  },

  /**
   * vueuse 配置
   */
  vueuse: {
    ssrHandlers: true,
  },

  /**
   * 全局组件配置
   */
  components: {
    dirs: [
      {
        path: './components',
        priority: 2,
      },
      {
        path: './themes',
        priority: 1,
      },
    ],
    global: true,
  },

  /**
   * 全局css 配置
   */
  css: [
    '@unocss/reset/tailwind-compat.css', // needed to reset styles see https://unocss.dev/guide/style-reset (@unocss/reset)
    '@/styles/css/global.css',
  ],

  /**
   * 全局路由配置
   */
  router: {
    options: {
      linkExactActiveClass: 'text-brand-primary',
    },
  },

  /**
   * 国际化语言信息
   */
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
  },

  /**
   * 全局实例配置
   */
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' }, { src: '/js/comfn.js' }],
      meta: [
        {
          'http-equiv': 'Content-Type',
          content: 'text/html; charset=utf-8',
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge,chrome=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-touch-fullscreen',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black',
        },
        {
          name: 'MobileOptimized',
          content: '320',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },

        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no',
        },
        process.env.NODE_ENV === 'production'
          ? {
              'http-equiv': 'content-security-policy',
              content: 'upgrade-insecure-requests',
            }
          : {},
      ],
    },
  },
})
