<template>
  <header
    v-if="datas?.settings?.header?.settings"
    id="nova-header"
    class="color-headerColor bg-headerBgColor md:mb-0 pos-sticky top-0 z-999 backdrop-blur-md bg-opacity-70"
  >
    <div id="shopify-section-header" class="shopify-section hidden md:block">
      <div data-section-id="header" data-section-type="header-section">
        <!-- 模版一 -->
        <header v-if="datas.settings.header.settings.nav == 1" class="site_header" role="banner">
          <!-- logo -->
          <div class="banner_left">
            <nuxt-link v-if="datas.settings.header.settings.pc_logo" href="/">
              <sps-img width="150" class="banner_logo" :src="datas.settings.header.settings.pc_logo" alt="" />
            </nuxt-link>
            <nuxt-link v-else href="/">
              <p class="font-500 text-30px color-primary">{{ datas.data?.shop?.name || ThirdLevelDomain }}</p>
            </nuxt-link>

            <!-- 导航菜单 -->
            <div v-if="datas.settings.header.settings.pc_menu" class="m-auto">
              <div class="flex gap-35px ml-40px">
                <n-menu mode="horizontal" :options="menuOptions_PC" />
              </div>
            </div>
          </div>

          <!-- 右侧组件框 -->
          <div class="right_box">
            <!-- 搜索 -->
            <!-- 搜索 -->
            <n-input
              v-if="datas.settings.header.settings.resch"
              :placeholder="$t('headers.search')"
              style="width: 206px"
              @change="reseachIpt"
            >
              <template #prefix>
                <icon-resch class="w-16px h-16px opacity-50 color-[--search-color]" />
              </template>
            </n-input>
            <!-- {{ datas.settings.header.settings }} -->
            <!-- 语言、国家、货币 -->
            <div class="more_box">
              <div class="fist_box">
                <div class="flex items-center gap-5">
                  <template v-if="datas?.settings?.header?.settings?.Language">
                    <!-- <GoogleTranslateSelect
                      v-if="head_data.langs_auto"
                      class="max-w-300px"
                      :default-language-code="language"
                      :fetch-browser-language="false"
                      :languages="languageOptionsAuto"
                      @select="handleGoogleTranslateSelect"
                      trigger="hover"
                    /> -->
                    <n-popselect class="notranslate" v-model:value="language" scrollable :options="languageOptions">
                      {{ activeLanguage?.name || language }}
                    </n-popselect>
                  </template>
                  <n-popselect
                    v-if="datas?.settings?.header?.settings?.currency"
                    v-model:value="currency_code"
                    @update:value="handleSelectFinance"
                    :render-label="renderLabelcurrencyOptions"
                    scrollable
                    :options="currencyOptions"
                  >
                    {{ currency_code }}
                  </n-popselect>
                  <!-- <n-select :options="languageOptions" trigger="hover" class=" w-100px" v-if="datas?.settings?.header?.settings?.Language">{{ $t('headers.language') }}</n-select>
                  <n-select :options="currencyOptions" trigger="hover" class=" w-100px" v-if="datas?.settings?.header?.settings?.currency" /> -->
                  <!-- <icon-daosanjiao v-if="datas.settings.header.settings.currency || datas.settings.header.settings.Language" /> -->
                </div>
                <!-- <n-dropdown placement="bottom-start" trigger="click" size="small" :options="menuOptions" @select="handleSelect"></n-dropdown> -->
              </div>
            </div>
            <!-- 购物车 -->
            <n-button v-if="datas.settings.header.settings.shop_car" text style="margin: 0 0 0 15px" @click="showcar">
              <n-badge color="rgba(198, 156, 109, 1)" :offset="[2, -2]" :value="count">
                <cartIcon />
              </n-badge>
            </n-button>
            <!-- 个人中心 -->
            <n-dropdown
              trigger="hover"
              style="margin: 0 0 0 15px"
              :options="personnelOptions"
              @select="personnelHandleSelect"
            >
              <n-button text>
                <icon-peoper v-if="datas.settings.header.settings.self_content" class="w-22px h-22px ml-15px" />
              </n-button>
            </n-dropdown>
          </div>
        </header>
        <!-- 模版二 -->
        <header v-else role="banner" class="site_header2">
          <div class="banner2_top">
            <!-- 搜索 -->
            <n-input
              v-if="datas.settings.header.settings.resch"
              :placeholder="$t('headers.search')"
              style="width: 206px"
              @change="reseachIpt"
            >
              <template #prefix>
                <icon-resch class="w-16px h-16px opacity-50 color-[--search-color]" />
              </template>
            </n-input>
            <!-- logo -->
            <div class="banner_left">
              <nuxt-link v-if="datas.settings.header.settings.pc_logo" href="/">
                <sps-img class="banner_logo" :src="datas.settings.header.settings.pc_logo" alt="" />
              </nuxt-link>
              <nuxt-link v-else href="/">
                <p class="font-500 text-30px color-primary header_title">
                  {{ datas.data?.shop?.name || ThirdLevelDomain }}
                </p>
              </nuxt-link>
            </div>
            <!-- 右侧组件框 -->
            <div class="right_box">
              <!-- 语言、国家、货币 -->
              <div
                v-if="datas.settings.header.settings.currency || datas.settings.header.settings.Language"
                class="more_box"
              >
                <div class="flex gap-5">
                  <!-- 语言 -->
                  <template v-if="datas?.settings?.header?.settings?.Language">
                    <!-- <GoogleTranslateSelect
                      v-if="head_data.langs_auto"
                      class="max-w-300px"
                      :default-language-code="language"
                      :languages="languageOptionsAuto"
                      @select="handleGoogleTranslateSelect"
                      trigger="hover"
                    /> -->
                    <n-popselect class="notranslate" v-model:value="language" scrollable :options="languageOptions">
                      {{ activeLanguage?.name || language }}
                    </n-popselect>
                  </template>
                  <!-- 货币 -->
                  <n-popselect
                    v-if="datas?.settings?.header?.settings?.currency"
                    v-model:value="currency_code"
                    :render-label="renderLabelcurrencyOptions"
                    :width="150"
                    scrollable
                    :options="currencyOptions"
                  >
                    {{ currency_code }}
                  </n-popselect>
                  <!-- <n-dropdown placement="bottom-start" trigger="click" size="small" :options="menuOptions" @select="handleSelect">
                    <div class=" flex-center items-center">
                      <!== <sps-img class=" more_img" src="" alt="" /> ==>
                      <span v-if="datas.settings.header.settings.Language">{{ $t('headers.language') }}</span>
                      <span v-if="datas.settings.header.settings.currency && datas.settings.header.settings.Language">-</span>
                      <span v-if="datas.settings.header.settings.currency">{{ symbol }}</span>
                      <!== <span>{{ $t('language') }}-{{ symbol }}</span> ==>
                      <icon-daosanjiao />
                      <!== <ul class=" absolute right-0 top-30px bg-#fff py-15px px0 z-99">
                        <li class=" w100% pb-10px px15px b-b-1px b-color-#ccc relative">
                          <div>123</div>
                          <ul class=" absolute right-80px top-0px bg-#fff py-15px px0 z-99">
                            <li>aaaa</li>
                          </ul>
                        </li>

                      </ul> ==>
                    </div>
                  </n-dropdown> -->
                </div>
              </div>
              <!-- 购物车 -->
              <n-button v-if="datas.settings.header.settings.shop_car" text @click="showcar">
                <n-badge
                  style="margin: 0 0 0 15px"
                  color="rgba(198, 156, 109, 1)"
                  :offset="[2, -2]"
                  size
                  :value="count"
                >
                  <cartIcon />
                </n-badge>
              </n-button>

              <n-dropdown
                trigger="hover"
                style="margin: 0 0 0 15px"
                :options="personnelOptions"
                @select="personnelHandleSelect"
              >
                <n-button text>
                  <icon-peoper v-if="datas.settings.header.settings.self_content" class="w-22px h-22px ml-15px" />
                </n-button>
              </n-dropdown>
            </div>
          </div>
          <!-- 导航菜单 -->
          <div v-if="datas.settings.header.settings.pc_menu" class="menu_box2">
            <n-menu
              v-model:value="activeKey"
              collapsed
              :collapsed-width="240"
              :collapsed-icon-size="22"
              :options="menuOptions_PC"
              :indent="40"
              class="text-base"
              mode="horizontal"
            />
          </div>
        </header>
      </div>
      <!-- {{ device }} -->
    </div>

    <!-- 移动端页头 -->
    <div class="flex justify-between items-center p-3 block md:hidden">
      <!-- logo -->
      <div class="flex gap-5 transition-all">
        <n-button v-show="$route.path != '/'" class="transition-all" text @click="router.go(-1)">
          <IconBack class="w-18px h-18px" />
        </n-button>
        <nuxt-link v-if="datas.settings.header.settings.mob_logo" to="/">
          <sps-img :width="150" class="banner_logo" :src="datas.settings.header.settings.mob_logo" alt="" />
        </nuxt-link>
        <nuxt-link v-else to="/">
          <p class="font-500 text-30px color-primary">{{ datas.data?.shop?.name || ThirdLevelDomain }}</p>
        </nuxt-link>
      </div>
      <!-- 工具菜单 -->
      <div class="flex justify-end items-center">
        <!-- 搜索 -->
        <nuxt-link to="/search">
          <icon-resch
            v-if="datas.settings.header.settings.resch"
            class="color-#000 h-18px w-18px"
            style="margin: 0 0 0 15px"
          />
        </nuxt-link>
        <!-- 购物车 -->
        <n-button text style="margin: 0 0 0 15px">
          <NuxtLink v-if="datas.settings.header.settings.shop_car" to="/cart">
            <n-badge color="rgba(198, 156, 109, 1)" :offset="[2, -2]" :value="count">
              <cartIcon />
            </n-badge>
          </NuxtLink>
        </n-button>
        <n-button type="primary" text>
          <icon-mobmenu v-if="datas.settings.header.settings.mob_menu" class="w25px h25px m-l12px" @click="activate" />
        </n-button>
      </div>
      <!-- 弹出菜单列表 -->
      <n-drawer v-model:show="active" width="70%">
        <n-drawer-content :title="$t('hearder.menu')" closable>
          <template #footer>
            <n-space vertical class="w-100%">
              <n-menu
                v-model:value="activeKey"
                style="padding: 0 5px; width: 100%"
                :options="menuOptionsMobile"
                @select="handleSelect"
              />
              <!-- 登录按钮 -->
              <n-button v-show="!ukey" class="w100%" @click="goLogin">
                <span class="m-l15px">{{ $t('headers.login') }}</span>
              </n-button>
              <n-button v-show="ukey" class="w100%" @click="logout">
                <span class="m-l15px">{{ $t('headers.logout') }}</span>
              </n-button>
            </n-space>
          </template>

          <template #default>
            <n-menu
              v-model:value="activeKey"
              dropdown-placement="bottom"
              :root-indent="10"
              :options="menuOptions_Mob"
              style="padding: 0px"
            />
          </template>
        </n-drawer-content>
      </n-drawer>
    </div>
    <Cart v-model:car-show="showCart" />
  </header>
</template>

<script setup lang="tsx">
import type { RouteLocationRaw } from '#vue-router'
import { getShopCarcount, loginOut } from '@/services/api/index'
import { type DropdownOption, type SelectGroupOption, type SelectOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { useRouter } from 'vue-router'
import { useGoogleTranslate } from '~/components/translate'
import Cart from '~/themes/components/cart.vue'
import { convertData } from '~/utils/common/convert-data'
import { getThirdLevelDomain } from '~/utils/common/getDomain'
import cartIcon from './components/cart-icon.vue'
const { showCart } = storeToRefs(useShopCart())
const { head_data } = storeToRefs(useThemeEditorStore())
const ThirdLevelDomain = getThirdLevelDomain()

const { languageList } = useLanguageList()
const { locale, t } = useI18n()
const router = useRouter()
defineOptions({
  name: 'HeadersSection',
})
const props = defineProps<{
  datas?: any
}>()

/**  登录令牌 */
const ukey = computed(() => {
  return useCookie('ukey').value
})
/**  PHPSESSID */
const PHPSESSID = useCookie('PHPSESSID')

/** * 设置cookie */
const language = useCookie('language', {
  maxAge: 60 * 60 * 60 * 7,
})
const symbol = useCookie('symbol', {
  maxAge: 60 * 60 * 60 * 7,
})
const currency_code = useCookie('currency_code', {
  maxAge: 60 * 60 * 60 * 7,
})
const finance = useCookie('finance', {
  maxAge: 60 * 60 * 60 * 7,
})
const { handleTranslate } = useGoogleTranslate()
/**  侦听语言 */
watch(
  language,
  (val: any) => {
    // setLocale(val)
    locale.value = val
    handleTranslate(val)
  }
  // {
  //   immediate: true,
  // }
)

/** * 国家语言 * */
const languageOptions = computed(() => {
  if (languageList.value?.langs) {
    return languageList.value?.langs
      ?.filter((i: any) => i.code)
      .map((i: any) => {
        i.key = i.title
        return { value: i.code, label: i.name, ...i }
      })
  }
  return []
})

// /**  自动翻译语言选项 */
// const languageOptionsAuto = computed(() => {
//   if (languageList.value?.langs) {
//     return languageList.value?.langs
//       ?.filter((i: any) => i.code)
//       .map((i: any) => {
//         return {
//           code: i.code,
//           cname: i.title,
//           ename: i.name,
//           name: i.name,
//         }
//       })
//   }
//   return [
//     {
//       code: 'en',
//       cname: 'English',
//       ename: 'English',
//       name: 'English',
//     },
//   ]
// })

// /**  选择语言 */
// const handleGoogleTranslateSelect = (val: any) => {
//   console.log(val)
//   language.value = val.code
//   locale.value = val.code
// }

/** * 显示激活国家 */
const activeLanguage = computed(() => {
  return languageOptions.value?.find((i: any) => i.code == language.value)
})

/** * 获取货币 */
const currencyOptions = computed(() => {
  if (languageList.value?.currency) {
    return languageList.value?.currency?.map((i: any) => {
      i.key = i.title
      return { value: i.code, label: i.name, ...i }
    })
  }
  return []
})

const menuOptions = computed(() => {
  return [
    {
      label: t('headers.currency'),
      key: '1',
      show: props.datas.settings.header.settings.currency,
      children: languageList.value?.currency?.map((i: any) => {
        return { label: i.name, key: i.code, type: 'currency' }
      }),
    },
    {
      label: t('headers.language'),
      key: '2',
      show: props.datas.settings.header.settings.Language,
      children: languageList.value?.langs
        ?.filter((i: any) => i.code)
        .map((i: any) => {
          i.key = i.title
          return { key: i.code, label: i.name, type: 'langs' }
        }),
    },
  ]
})

/**  移动端菜单 */
const menuOptionsMobile = computed(() => {
  if (ukey.value) {
    return [
      ...menuOptions.value,
      {
        label: () => (
          <NuxtLink
            onClick={() => {
              active.value = false
              {
                /* router.push('/account/orders') */
              }
            }}
            to="/account/orders">
            {t('headers.orders')}
          </NuxtLink>
        ),
        key: '/account/orders',
      },
      {
        label: () => (
          <NuxtLink
            onClick={() => {
              active.value = false
              {
                /* router.push('/account/address') */
              }
            }}
            to="/account/address">
            {t('headers.address')}
          </NuxtLink>
        ),
        key: '/account/address',
      },
    ]
  }
  return menuOptions.value
})

/**  打开购物车 */
const showcar = () => {
  showCart.value = true
}

/**  移动端菜单 */
const active = ref(false)
const seach = ref(false)
const activate = () => {
  active.value = true
}

/**  语言列表自定义渲染函数 */
const renderLabelcurrencyOptions = (option: SelectOption | SelectGroupOption): VNodeChild => {
  return (
    <div class=" flex gap-2">
      <sps-img src={`https://imgs.chuhai-bang.com/public/image/currency/${option.label}.png`} />
      <span>{option.label}</span>
    </div>
  )
}

/**  选择语言货币 */
const handleSelect = (key: string, option: DropdownOption) => {
  if (option.type == 'langs') {
    // setLocale(key)
    locale.value = key
    language.value = key
  } else {
    languageList.value?.currency?.forEach((item: any) => {
      if (item.code == key) {
        symbol.value = item.symbol
        currency_code.value = item.code
        finance.value = item.finance
      }
    })
  }
  active.value = false
}

/**  选择语言货币 */
const handleSelectFinance = (key: string, option: DropdownOption) => {
  finance.value = option.finance
}

/**  登录 */
const goLogin = () => {
  router.push('/account/login')
  active.value = false
}

/**  菜单 */
const activeKey = ref('1')

/** PC 菜单数据转换 */
const menuOptions_PC = computed(() => {
  if (props.datas?.settings?.header?.pc_menu_content?.id) {
    // const menu = props.datas.settings.header.pc_menu_content
    // return [
    //   {
    //     label: () => (
    //       <NuxtLink target={menu.target} href={menu.url}>
    //         {menu.name}
    //       </NuxtLink>
    //     ),
    //     key: menu.name,
    //     children: convertData(props.datas.settings.header.pc_menu_content.son),
    //   },
    // ]
    return convertData(props.datas.settings.header.pc_menu_content.son)
  }
  return []
})

/** Mobile 菜单数据转换 */
const menuOptions_Mob = computed(() => {
  if (props.datas?.settings?.header?.mob_menu_content?.id) {
    // const menu = props.datas.settings.header.pc_menu_content
    // return [
    //   {
    //     label: () => (
    //       <NuxtLink target={menu.target} href={menu.url}>
    //         {menu.name}
    //       </NuxtLink>
    //     ),
    //     key: menu.name,
    //     children: convertData(props.datas.settings.header.mob_menu_content.son),
    //   },
    // ]
    return convertData(props.datas.settings.header.mob_menu_content.son)
  }
  return []
})

/**
 *  前往搜索页判断模板1 2的值问题
 *  一个用的元素input   一个是 n-input
 */
const reseach = (event: any) => {
  // 模板一
  router.push('/search?keyword=' + event?.target.value)
}
const reseachIpt = (event: any) => {
  // 模板2
  router.push('/search?keyword=' + event)
}

/**  个人中心下拉菜单 */
const personnelOptions = computed(() => {
  return !ukey.value
    ? [
        {
          label: t('headers.login'),
          key: '/account/login',
        },
        // {
        //   label: t('headers.register'),
        //   key: '/account/register',
        // },
      ]
    : [
        {
          label: t('headers.orders'),
          key: '/account/orders',
        },
        {
          label: t('headers.address'),
          key: '/account/address',
        },
        {
          label: t('headers.logout'),
          key: 'logout',
        },
      ]
})

/** 个人中心菜单点击事件处理  */
const personnelHandleSelect = (key: RouteLocationRaw) => {
  if (key == 'logout') {
    logout()
    return
  }
  router.push(key)
}

/**  退出登录 */
const logout = async () => {
  await loginOut()
  useCookie('ukey').value = null
  PHPSESSID.value = null
  active.value = false
  router.push('/')
  return
}

/**  获取购物车数量 */
const { data: count, refresh } = await useAsyncData('useShopCart', getShopCarcount, {
  default: () => 0,
  lazy: true,
  transform({ data }) {
    return data?.count
  },
})

/**  注入数据 方便组件传值 */
const nuxtApp = useNuxtApp()
if (typeof nuxtApp.$addCart != 'function') {
  nuxtApp.provide('addCart', refresh)
}
</script>

<style scoped lang="scss">
.shopify-section {
  // /* background-color: rgba(0, 128, 96, 0.08); */
  padding: 19px 40px 7px;
}

.header_title {
  // color: #22ac35;
  font-feature-settings:
    'clig' off,
    'liga' off;
  // font-family: PingFang SC;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 66.667% */
}

.site_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner_left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.banner_logo {
  height: 100%;
  width: 50px;
}

.right_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.more_box {
  margin-left: 20px;
  cursor: pointer;
}

.fist_box {
  display: flex;
  align-items: center;
}

.more_img {
  width: 26px;
  height: 18px;
}

.site_header2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu_box2 {
  margin-top: 17px;
}

.banner2_top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site_header:deep(.n-menu.n-menu--horizontal .n-menu-item-content:not(.n-menu-item-content--disabled):hover) {
  border-bottom: 2px solid transparent;
}

.site_header2:deep(.n-menu.n-menu--horizontal .n-menu-item-content:not(.n-menu-item-content--disabled):hover) {
  border-bottom: 2px solid transparent;
}

:deep(.custom-menu-item:hover) {
  color: red; //改变字体颜色为红色
  //添加其他所需的样式
}

:deep(.custom-hover) {
  color: red;
  //添加其他鼠标悬停时的样式
}

:deep(.n-checkbox .n-checkbox-box) {
  background-color: transparent;
}

:deep(.n-checkbox.n-checkbox--checked .n-checkbox-box) {
  background-color: var(--n-color-checked);
}

:deep(.n-menu.n-menu--horizontal .n-menu-item-content:not(.n-menu-item-content--disabled):hover) {
  // border-bottom: 2px solid #22c55e;
  // color: #18a058;
}

:deep(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content-header) {
  opacity: 1;
}

// :deep(.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled).n-menu-item-content--selected:hover .n-menu-item-content-header){
//   color: #18a058;
// }

:deep(.__input-m) {
  --n-border: 1px solid transparent;
}

:deep(.n-dropdown-menu-wrapper > .n-dropdown-menu) {
  max-height: 100px;
  overflow-y: scroll;
}

// 输入框
:deep(.n-input) {
  background-color: var(--search-bg-color);
}
:deep(.n-input .n-input__input-el) {
  color: var(--search-color) !important;
}
</style>

<style>
.v-binder-follower-container .v-binder-follower-content .n-dropdown-menu {
  padding: 0;
  .n-dropdown-option .n-dropdown-option-body::before {
    left: 0;
    right: 0;
  }

  .n-dropdown-option .n-dropdown-option-body:hover::before {
    background-color: var(--n-option-color-active);
  }

  .n-dropdown-option .n-dropdown-option-body:hover {
    /* color: var(--n-option-text-color-active); */
  }
}

.n-dropdown-menu-wrapper > .n-dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
