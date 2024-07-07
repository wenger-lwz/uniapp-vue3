import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Data } from '~/types/theme-store'

/** 店铺装修数据状态 */
export const useThemeEditorStore = defineStore('useThemeEditorStore', () => {
  /**  单页cod主题 */
  const codTheme = ref()
  type Page = {
    /** 组件名称  */
    component: string
    /**  组件id */
    id: string
    /**  组件名称 */
    name: string
    /**  右侧配置组件名称 */
    style: string
    /** 组件设置  */
    settings: {
      name: string
      blocks: any[]
    }
    [key: string]: any
  }

  /** 页面数据 */
  const page = ref<Data | null>(null)

  /** 选择组件 */
  const choose = ref({
    /**  删除标签显示 */
    deleShow: true,
    /**  当前选中的index */
    index: '',
    /**  右侧组件切换 */
    rightcom: 'decorate', //
    // currentproperties: page.value.pageSetup,
    /**  记录上一次距离父元素高度 */
    offsetY: 0, //
    /**  只能存在一个的组件(组件的type) */
    onlyOne: ['1-5', '1-16'],
    /**  穿透 */
    pointer: { show: false },
    key: 0,
    id: null, //组件id
  })

  /**
   * 调试模式
   */
  const debug = ref(false)

  /**
   * iframe postMessage 赋值
   */
  const setData = (e: any) => {
    const { type, data } = e.data as { type: string; data: any }
    switch (type) {
      case 'debug':
        debug.value = e.data[e.data.type]
        break
      case 'page':
        page.value = e.data[e.data.type]
        break
      case 'choose':
        choose.value = e.data[e.data.type]
        break
      default:
        return
    }
  }

  /**  模板url地址 */
  const url = ref('/?preview=true')

  /** 业务产品数据 */
  const Info = ref()

  /**  渲染模式 */
  const renderType = ref()

  /**  布局 */
  const layout = ref()

  /**  主题名 */
  const themeKey = ref('nova')

  /**  主题图标 */
  const paymentIcons = ref([])

  /**  店铺名字 */
  const storeName = ref('')

  /**  路由页面数据 */
  const pageRouter = ref()

  /**  全局设置 */
  const global = ref()

  /**  商品显示原价 */
  const expandOriginalPrice = computed(() => {
    return page.value?.settings?.global?.product?.expandOriginalPrice
  })

  /**  商品列表标题样式 */
  const productListStyle = computed(() => {
    return page.value?.settings?.global?.product?.style
  })

  /**  head_data */
  const head_data = ref()
  return {
    /** 页面信息*/
    page,

    /** 当前选择*/
    choose,

    /** 调试模式 */
    debug,

    /** iframe 通信赋值*/
    setData,

    /**  模板地址 */
    url,

    /**  单页cod主题 */
    codTheme,

    /** 业务数据 */
    Info,

    /**  渲染模式 */
    renderType,

    /**  布局 */
    layout,

    /**  主题名 */
    themeKey,

    /**  支付图标 */
    paymentIcons,

    /**  店铺名字 */
    storeName,

    /**  路由页面数据 */
    pageRouter,

    /**  全局设置 */
    global,

    /**  商品显示原价 */
    expandOriginalPrice,

    /**  商品列表标题样式 */
    productListStyle,

    /**  头部head_data */
    head_data,
  }
})
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useThemeEditorStore, import.meta.hot))
