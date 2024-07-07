<template>
  <main class="h-full bg-bgColor color-textColor">
    <n-notification-provider>
      <NConfigProvider :theme-overrides="themeOverrides" class="h-full" preflight-style-disabled inline-theme-disabled>
        <Suspense>
          <n-message-provider>
            <NDialogProvider>
              <NuxtLoadingIndicator />
              <NuxtLayout :datas="layout">
                <NuxtPage
                  :transition="{
                    name: 'slide-right',
                    mode: 'out-in',
                  }"
                />
                <custompluginGdprCookie :remote-data="gdprCookie" v-if="gdprCookie" />
                <custompluginCustomizeCode
                  :customize-code-data="customizeCodeData"
                  v-if="customizeCodeData"
                ></custompluginCustomizeCode>
              </NuxtLayout>
              <PreviewTip />
            </NDialogProvider>
          </n-message-provider>
          <template #fallback>
            <div class="w-100vw h-100vh flex-center">
              <n-spin size="large" />
            </div>
          </template>
        </Suspense>
      </NConfigProvider>
    </n-notification-provider>
  </main>
  <div id="addons_plugin"></div>
  <div id="google_translate_element" />
  <!-- 服务端渲染改成客户端暂停开发 -->
  <!-- <div class="h-500px bg-pink"> -->
  <!-- <MarketingSales></MarketingSales> -->
  <!-- <MarketingPopupnotice></MarketingPopupnotice> -->
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { setRedirectRoute } from '@/components/customplugin/redirectRoute'
import _ from 'lodash'
import type { GlobalThemeOverrides, NConfigProvider } from 'naive-ui'
import { NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
import { getPagesAPI, getSettingsAPI } from './services/api'
import { loadFonts, loadFontsSSR } from './utils/common/load-font'
const { themeKey, paymentIcons, storeName, pageRouter, page, head_data } = storeToRefs(useThemeEditorStore())

const route = useRoute()
const { locale } = useI18n()

/**  颜色设置 */
const styles = computed(() => page.value?.settings?.global?.color)

/**  增加 css变量 */
const styleColor = computed(() => {
  if (styles.value) {
    const result = Object.keys(styles.value).map((key: any) => {
      return `--${_.kebabCase(key)}:${styles.value[key]}`
    })
    return `:root{${result.join(';')}}`
  }
  return {}
})
/**  增加 css变量 */
const styleFonts = computed(() => {
  return `
  :root {
    --button:${_.startCase(fontFamily.value?.button?.family)};
    --content:${_.startCase(fontFamily.value?.content?.family)};
    --title:${_.startCase(fontFamily.value?.title?.family)};
    --subTitle:${_.startCase(fontFamily.value?.subTitle?.family)};
    --content-font-size:${fontFamily.value?.content?.size}px;
    --title-font-size:${fontFamily.value?.title?.size}px;
    --subTitle-font-size:${fontFamily.value?.subTitle?.size}px;
    --button-font-size:${fontFamily.value?.button?.size}px;
}
`
})

/**  按钮设置 圆角/方形 */
const btn = computed(() => page.value?.settings?.global?.button)

/**  字体设置 */
const fontFamily = computed(() => page.value?.settings?.global?.fontFamily)

/**  naive-ui 主题配置 */
const themeOverrides = computed<GlobalThemeOverrides>(() => {
  if (styles.value && btn.value) {
    return {
      common: {
        primaryColor: styles.value?.primaryColor || '#047857',
        heightLarge: '48px',
        primaryColorHover: styles.value?.primaryColor || '#047857',
        fontFamily: fontFamily.value?.content?.family,
        fontSize: fontFamily.value?.content?.size,
      },

      Pagination: {
        itemColorActive: styles.value?.primaryColor || '#047857',
        itemTextColor: '#047857',
        itemColorActiveHover: styles.value?.primaryColor,
      },
      Button: {
        colorPrimary: styles.value?.buttonBgColor || styles.value?.primaryColor,
        textColorPrimary: styles.value?.buttonColor,
        // colorFocus: styles.value?.buttonBgColor || styles.value?.primaryColor,
        colorFocusPrimary: styles.value?.buttonBgColor || styles.value?.primaryColor,
        borderPrimary: 0,
        common: {
          fontWeight: fontFamily.value?.button?.weight,
          fontSizeMedium: fontFamily.value?.button?.size + 'px',
          borderRadius: btn.value?.style + 'px',
        },
      },
    }
  }
  return {}
})

useHead({
  style: [() => styleColor.value, () => styleFonts.value],
})

/**  进度条 */
useProgressBar()

/**  判断是否位于预览/编辑模式 */
if (route.query?.isPreview) {
  /**  加载预览 */
  useRenderPreview()

  /**  挂载后加载字体 */
  onMounted(() => {
    watchEffect(() => {
      loadFonts(fontFamily.value)
    })
  })
}

const layout = ref()
const gdprCookie = ref()
const customizeCodeData = ref([])

/**
 * @description 配置设置函数
 */
async function setting() {
  /**  获取远程数据 动态设置 */
  const { data: remoteData } = await useAsyncData('settings', () => getSettingsAPI(route.query), {
    transform({ data }) {
      return data
    },
    server: true,
  })
  if (!remoteData.value) return

  /**  获取页面路由 */
  const { data } = await useAsyncData('router', () => getPagesAPI(route.query), {
    transform(data: any) {
      return data?.data?.data?.templates
    },
  })

  /**  301链接跳转 */
  setRedirectRoute(remoteData.value.head_data?.urlredirect || [], route.path)

  pageRouter.value = data.value

  /**  设置语言 */
  const language = useCookie('language', {
    maxAge: 60 * 60 * 60 * 7,
  })

  /**  设置货币 */
  const currency = useCookie('currency_code', {
    maxAge: 60 * 60 * 60 * 7,
  })
  
  /**  设置布局 */
  layout.value = remoteData.value.data

  /**  设置SEO */
  seoHeader(remoteData.value)

  /**  设置插件 */
  plugins(remoteData.value)

  /**  设置默认语言 */
  locale.value = language.value ?? remoteData.value?.head_data?.langs

  /**  设置语言 */
  language.value ??= remoteData.value?.head_data?.langs

  /**  设置货币符号 */
  currency.value ??= remoteData.value?.head_data?.currency

  /**  判断主题模式 */
  themeKey.value = remoteData.value?.data?.template?.key

  /**  支付图标 */
  paymentIcons.value = remoteData.value?.head_data?.payment_icon

  /**  店铺名字 */
  storeName.value = remoteData.value?.head_data?.title

  /**  存储数据 pinia -page*/
  page.value = remoteData.value?.data

  /**  存储数据 pinia -head_data */
  head_data.value = remoteData.value?.head_data

  /**  自定义代码 */
  customizeCodeData.value = remoteData.value.head_data?.codes

  /**  设置gdprCookie插件 */
  gdprCookie.value = remoteData.value.head_data?.gdprcookie

  /**  加载字体 */
  loadFontsSSR(fontFamily.value)
}

await setting()

onMounted(() => {
  addEventListener('popstate', () => {
    setTimeout(() => {
      window?.scrollTo({
        top: 0,
      })
    }, 500)
  })
})
</script>
