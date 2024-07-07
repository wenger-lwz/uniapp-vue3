<script setup lang="ts">
import { shopAddcar, shopGoodsbuynow } from '~/services/api'
import { useMessage } from 'naive-ui'
const message = useMessage()
const { t } = useI18n()
const router = useRouter()
const nuxtApp = useNuxtApp()
const { productsresult, isProductShow } = storeToRefs(useProductsresult())
const optionsColor = computed(() => {
  if (productsresult.value?.options?.[0]?.values) {
    return productsresult.value.options[0].values.map((item: any) => ({
      label: item,
      value: item,
    }))
  }
  return []
})
const optionsSize = computed(() => {
  if (productsresult.value?.options?.[1]?.values) {
    return productsresult.value.options[1].values.map((item: any) => ({
      label: item,
      value: item,
    }))
  }
  return []
})

const productVal = ref()
const productSizeVal = ref()
const productNumVal = ref(1)
const maxQuantity = ref(1)
const varid = ref('')

const handleChange = () => {
  let str = `${productVal.value}/${productSizeVal.value}`
  let cunterARR = productsresult.value?.variants.filter((i: { title: string }) => i.title == str)
  maxQuantity.value = cunterARR[0]?.available_quantity
  varid.value = cunterARR[0]?.id
}

const isAddCardShow = ref(isProductShow)
const loadingBtn = ref(false)
const addPluginCar = async () => {
  handleChange()
  loadingBtn.value = true
  let params
  params = {
    prod: productsresult.value?.id,
    varid: varid.value,
    num: productNumVal.value,
  }
  let data
  if (productsresult.value.add_to_cart?.buttonActivity == 1) {
    params = {
      ...params,
      source: 'xfproduct',
    }
    data = await shopAddcar(params)
  }
  if (productsresult.value.add_to_cart?.buttonActivity == 2) {
    data = await shopGoodsbuynow(params)
  }
  try {
    resultNext(data?.data, productsresult.value.add_to_cart?.buttonActivity)
  } finally {
    DLayers('add_cart')
    loadingBtn.value = false
  }
}

const resultNext = (data: unknown, flag: number) => {
  if (data?.code === 200 && data.state == 1 && flag == 1) {
    if (typeof nuxtApp.$addCart === 'function') {
      nuxtApp.$addCart()
    }
    /**  进入购物车页 */
    message?.success(t('product.addSuccess'))
    router.push('/cart')
  }

  if (data && data?.state == 'ok' && flag == 2) {
    navigateTo('/checkouts/' + data.okey)
  }
}

const getInventoryQuantityInit = (arrName: string, flag: number, key: string) => {
  let arr = productsresult?.value?.[arrName]
  if (arr?.length > 0) {
    varid.value = arr[0]?.id
  }
  return arr[0][key]
}

watch(
  () => isAddCardShow.value,
  () => {
      productVal.value = getInventoryQuantityInit('variants', 0, 'option1')
    productSizeVal.value = getInventoryQuantityInit('variants', 0, 'option2')
    maxQuantity.value = getInventoryQuantityInit('variants', 0, 'available_quantity')
    // stopWatch()
  },
  { immediate: true }
)
</script>
<template>
  <!-- pc端 -->
  <div v-if="isAddCardShow">
    <div
      class="md:block w-100% hidden position-fixed z-9999"
      :class="`${productsresult?.add_to_cart?.position == 2 ? 'bottom-0px' : 'top-0px'}`"
      :style="{
        background: productsresult?.add_to_cart?.backgroundColour,
      }"
      v-if="productsresult?.add_to_cart?.enabled && productsresult?.add_to_cart?.terminalType !== 3"
    >
      <!-- 样式一 -->
      <div
        class="flex h-96px max-w-1200px ma items-center flex-justify-between"
        v-if="productsresult?.add_to_cart.pcStyle == 1"
      >
        <div>
          <n-space>
            <n-image class="position-relative top-3.5px h-64px" width="64px" :src="productsresult?.image?.src" />
            <n-ellipsis
              style="max-width: 80px"
              class="lh-71px"
              :style="{
                color: productsresult?.add_to_cart?.productTitleColour,
              }"
            >
              {{ productsresult?.title }}
            </n-ellipsis>

            <span
              class="flex-justify-between lh-71px"
              :style="{
                color: productsresult?.add_to_cart?.salePriceTextColour,
              }"
            >
              {{ formatPrice(productsresult?.price) }}
            </span>
            <del
              class="flex-justify-between lh-71px"
              :style="{
                color: productsresult?.add_to_cart?.comparePriceTextColour,
              }"
            >
              {{ formatPrice(productsresult?.price) }}
            </del>
          </n-space>
        </div>
        <div class="flex justify-around gap-2.5">
          <n-select
            :to="false"
            class="w-120px"
            v-model:value="productVal"
            :placeholder="productsresult?.options?.[0]?.name"
            :options="optionsColor"
          />
          <n-select
            :to="false"
            class="w-120px"
            filterable
            v-model:value="productSizeVal"
            :placeholder="productsresult?.options?.[1]?.name"
            :options="optionsSize"
          />
          <n-input-number
            class="w-120px"
            :min="1"
            :max="maxQuantity"
            filterable
            :disabled="productNumVal >= maxQuantity"
            v-model:value="productNumVal"
            button-placement="both"
          />
          <n-button
            @click="addPluginCar"
            :loading="loadingBtn"
            :bordered="false"
            :style="{
              background: productsresult?.add_to_cart?.buttonColour,
              color: productsresult?.add_to_cart?.buttonTextColour,
            }"
          >
            {{ productsresult?.add_to_cart.buttonText }}
          </n-button>
        </div>
      </div>
      <!-- 样式二 -->
      <div
        class="flex h-96px max-w-1200px ma items-center flex-justify-between"
        v-if="productsresult?.add_to_cart.pcStyle == 2"
      >
        <div class="flex">
          <n-space>
            <n-select
              :to="false"
              filterable
              class="w-120px"
              v-model:value="productVal"
              :placeholder="productsresult?.options?.[0]?.name"
              :options="optionsColor"
            />
            <n-select
              :to="false"
              class="w-120px"
              filterable
              v-model:value="productSizeVal"
              :placeholder="productsresult?.options?.[1]?.name"
              :options="optionsSize"
            />
            <n-input-number
              class="w-120px"
              :min="1"
              :max="maxQuantity"
              :disabled="productNumVal >= maxQuantity"
              v-model:value="productNumVal"
              button-placement="both"
            />
          </n-space>
        </div>
        <div class="flex">
          <span class="flex-justify-between lh-48px mr-18px color-#ff4041">
            {{ formatPrice(productsresult?.price) }}
          </span>
          <del class="flex-justify-between lh-48px mr-18px color-#fff">{{ formatPrice(productsresult?.price) }}</del>

          <n-button
            @click="addPluginCar"
            class="w-100%"
            size="large"
            :style="{
              background: productsresult?.add_to_cart?.buttonColour,
              color: productsresult?.add_to_cart?.buttonTextColour,
            }"
          >
            {{ productsresult?.add_to_cart.buttonText }}
          </n-button>
        </div>
      </div>
    </div>
    <!-- h5端 -->
    <div
      :class="`${productsresult?.add_to_cart?.position == 2 ? 'bottom-0px' : 'top-0px'}`"
      class="bg-#fff md:hidden w-100% position-fixed z-9999"
      v-if="productsresult?.add_to_cart?.enabled && productsresult?.add_to_cart?.terminalType !== 2"
    >
      <div class="w-100%">
        <div class="flex w-100%" v-if="productsresult?.add_to_cart?.mobileStyle == 2">
          <n-select
            :to="false"
            class="w-33.3%"
            size="large"
            filterable
            v-model:value="productVal"
            :placeholder="productsresult?.options?.[0]?.name"
            :options="optionsColor"
          />
          <n-select
            :to="false"
            class="w-33.3%"
            size="large"
            filterable
            v-model:value="productSizeVal"
            :placeholder="productsresult?.options?.[1]?.name"
            :options="optionsSize"
          />
          <n-input-number
            class="w-33.3%"
            size="large"
            :min="1"
            :max="maxQuantity"
            :disabled="productNumVal >= maxQuantity"
            v-model:value="productNumVal"
            button-placement="both"
          />
        </div>
        <div>
          <n-button
            @click="addPluginCar"
            class="h-60px w-100%"
            :style="{
              background: productsresult?.add_to_cart?.buttonColour,
              color: productsresult?.add_to_cart?.buttonTextColour,
            }"
          >
            {{ productsresult?.add_to_cart.buttonText }}
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
