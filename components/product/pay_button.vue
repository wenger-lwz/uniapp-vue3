<template>
  <!-- 购买按钮 -->
  <n-space vertical>
    <div class="w-100% flex justify-between items-center mb-10px" ref="el">
      <n-button
        :loading="buyLoading"
        size="large"
        :disabled="!gooddata?.proid"
        type="primary"
        @click="buynow"
        class="w-49% rd-4px overflow-hidden"
      >
        {{ $t('product.buyNow') }}
      </n-button>
      <n-button
        :loading="addCartLoading"
        style="--n-border: 1px solid var(--primary-color)"
        size="large"
        :disabled="!gooddata?.proid"
        type="tertiary"
        @click="addcar"
        class="w-49% rd-4px overflow-hidden"
      >
        {{ $t('product.addcart') }}
      </n-button>
    </div>
    <div :class="gooddata?.proid ? '' : 'hidden'" class="placeholder-paypal-express-button-container mb-10px"></div>
  </n-space>
</template>

<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import { useMessage } from 'naive-ui'
import { quickPayment, shopAddcar, shopGoodsbuynow } from '~/services/api'
const message = useMessage()
const { t } = useI18n()
const { showCart } = storeToRefs(useShopCart())
const { page } = storeToRefs(useThemeEditorStore())
const props = defineProps<{
  gooddata: any
}>()
const nuxtApp = useNuxtApp()

/**  全局配置 加购按钮逻辑 */
const cart = computed(() => page.value?.settings?.global?.cart)

const router = useRouter()
/**  添加到购物车 */
const addCartLoading = ref(false)
const addcar = async () => {
  addCartLoading.value = true
  try {
    const { data } = await shopAddcar({
      proid: props.gooddata.proid,
      varid: props.gooddata.varid,
      num: props.gooddata.num || 1,
      source: 'xfproduct',
    })

    if (data.code === 200 && data.state == 1) {
      if (typeof nuxtApp.$addCart === 'function') {
        nuxtApp.$addCart()
      }
      /**  全局配置-0提示 / 1侧边购物车 /2进入购物车 */
      switch (cart.value.buyNow) {
        /**  默认不跳转，提示加购成功 */
        case 0:
          message?.success(t('product.addSuccess'))
          break

        /**  侧边购物车 */
        case 1:
          showCart.value = true
          break

        /**  进入购物车页 */
        case 2:
          router.push('/cart')
          break

        default:
          break
      }
    }
  } finally {
    DLayers('add_cart')
    addCartLoading.value = false
  }
}

/**  立即购买 */
const buyLoading = ref(false)
const buynow = async () => {
  var data = {
    num: props.gooddata.num || 1,
    varid: props.gooddata.varid,
    proid: props.gooddata.proid,
    source: props.gooddata.source,
    key_o: props.gooddata.key_o,
  }
  try {
    buyLoading.value = true

    DLayers('add_cart')
    const { data: res } = await shopGoodsbuynow(data)
    if (res && res?.state == 'ok') {
      // props.gooddata.key_o = res.okey
      navigateTo('/checkouts/' + res.okey)
      // location.href = '/checkouts/' + res.okey
    }
  } finally {
    buyLoading.value = false
  }
}

const currencyCode = useCookie('currency_code')

/**  获取快捷支付按钮 */
const paybutton = async () => {
  let params = {
    render: '.placeholder-paypal-express-button-container',
    proid: props.gooddata.proid,
    num: props.gooddata.num,
    varid: props.gooddata.varid,
  }
  const { error }: { error: any } = await quickPayment({
    s: 'product',
    k: props.gooddata.key_o,
    t: props.gooddata.price,
  })
  if (error?.code == 1) {
    var paypal_style: any = pp_style()
    paypal_style.shape = 'rect'
    paypal_style.height = 50
    paypal_style.label = 'buynow'
    load_pp_btn(
      {
        render_btn: params.render,
        burl: '/',
        okey: props.gooddata.key_o,
        env: error?.data?.env,
        client_id: error?.data?.client_id,
        intent: error?.data?.intent,
        style: paypal_style,
        currency_code: currencyCode?.value,
        funding: 'all',
      },
      function () {
        var tprice = 0
        var formData = new FormData()
        formData.append('proid', params.proid)
        formData.append('varid', params.varid)
        formData.append('num', params.num)
        formData.append('source', 'product_pp')
        formData.append('key_o', props.gooddata.key_o)
        formData.append('handling_fee', 0)
        formData.append('insurance_fee', 0)
        formData.append('combos', '')
        return formData
      },
      error?.data?.mchid
    )
    $(params.render).show()
  } else if (error?.code == 2) {
    $(params.render).html(error.html)
    $(params.render).show()
  }
}
/**  防抖获取快捷支付 */
const debouncePayBtn = debounce(paybutton, 1000)

const el = ref(null)
const isVisible = useElementVisibility(el)
const productsresult = useProductsresult()
watch(
  () => isVisible.value,
  () => {
    // 判断是否在可视区
    productsresult.changProductShow(!isVisible.value)
  }
)

/**  暴露方法 */
defineExpose({ debouncePayBtn })

onMounted(() => {
  paybutton()
})
</script>

<style></style>
