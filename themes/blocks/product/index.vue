<template>
  <section class="py-65px" style="width: 100%">
    <div class="graphic_box flex-col md:flex-row w-100%">
      <div class="flex-center md:w-500px w-100%">
        <sps-img class="h-500px rd-4px hover:scale-103 transition-500" :src="datas.content?.image?.src" />
      </div>
      <div class="w-full md:w-53/100 gap-2 justify-center flex-col p-0 md:p-35px">
        <!-- 标题 -->
        <div class="md:text-xl text-base text-start mt-2">
          {{ datas.content.title }}
        </div>
        <!-- 描述 -->
        <div class="text-#545454 text-start sm:hidden block">
          <n-ellipsis
            class="text-left text-14px md:text-16px"
            expand-trigger="click"
            :tooltip="false"
            :line-clamp="datas.mob_lineHeight ? 2 : ''"
          >
            <p v-html="datas.content.description"></p>
          </n-ellipsis>
        </div>

        <!-- 浏览数据 -->
        <div class="hidden sm:block m-t12px m-b20px">
          <div class="flex gap-2 items-center">
            <n-rate readonly :default-value="4" />
            <span class="text-#969696">{{ datas.content.viewNum }} {{ $t('product.reviews') }}</span>
          </div>
        </div>
        <!-- 价格 -->
        <div class="flex m-b16px">
          <p
            v-if="(gooddata.compare_at_price || gooddata.marketPrice) - datas.content.price > 0"
            class="price hidden sm:block"
          >
            Save{{ formatPrice((gooddata.compare_at_price || gooddata.marketPrice || 888.88) - datas.content.price) }}
          </p>
          <div class="favorable">
            <p class="sm:text-black text-red-6 text-18px md:text-20px" style="font-weight: 500; margin-right: 10px">
              {{ formatPrice(datas.content.price) }}
            </p>
            <p
              v-if="gooddata.compare_at_price || gooddata.marketPrice > 0"
              class="text-14px"
              style="text-decoration: line-through; color: #000; letter-spacing: 0.28px"
            >
              {{ formatPrice(gooddata.compare_at_price || gooddata.marketPrice) }}
            </p>
          </div>
        </div>
        <!-- 描述 -->
        <div class="text-#545454 text-left hidden sm:block w-100%">
          <n-ellipsis
            expand-trigger="click"
            :tooltip="false"
            :line-clamp="datas.pc_lineHeight ? 3 : ''"
            style="overflow-wrap: break-word"
            class="w-100%"
          >
            <div v-html="datas.content.description"></div>
          </n-ellipsis>
        </div>

        <SkuGeekSku
          v-if="skus?.length"
          @sku-change="skuChange"
          @num-change="gooddata.num = Number($event)"
          :data="skus"
        />

        <div class="flex-col m-t1px m-b1px"></div>

        <div class="flex justify-center md:flex-justify-start">
          <nuxt-link :href="datas.content.buttonLink">
            <n-button
              :disabled="addCartLoading || !gooddata.id"
              type="primary"
              @click="buynow"
              class="hover:scale-103 transition-500"
              :style="'background:' + datas.content.color + ';padding:8px 39px;'"
            >
              {{ $t('product.shopping') }}
            </n-button>
          </nuxt-link>
          <nuxt-link :href="datas.content.buttonLink" class="m-l15px">
            <n-button
              :disabled="addCartLoading || !gooddata.id"
              type="primary"
              :loading="addCartLoading"
              @click="addcar"
              class="hover:scale-105 transition-300 hover:bg-#cccc"
              :style="'background:' + datas.content.color + ';padding:8px 39px;'"
              ghost
            >
              {{ $t('product.addCart') }}
            </n-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shopAddcar, shopGoodsbuynow } from '@/services/api/index'
import { useMessage } from 'naive-ui'

const message = useMessage()
const { t } = useI18n()

const okey = useCookie('okey')

defineOptions({
  name: 'GoodsModule',
})
const product = defineProps<{
  datas: any
}>()

const gooddata = ref({
  price: 0,
  color: '',
  active: '',
  num: 1,
  inventory: 100,
  varid: '',
  proid: '',
  source: '',
  key_o: okey.value,
  ctype: '0',
  sell_num: '0',
  ...product.datas.content,
})

/**  立即购买 */
const buyLoading = ref()
const buynow = async () => {
  buyLoading.value = true

  try {
    const res: any = await shopGoodsbuynow({
      num: gooddata.value.num,
      varid: gooddata.value.varid,
      proid: gooddata.value.id,
      source: gooddata.value.source,
      key_o: gooddata.value.key_o,
    })

    if (res.data.code == 200 && res.data.state == 'ok') {
      gooddata.value.key_o = res.data.okey
      navigateTo('/checkouts/' + res.data.okey)
      // location.href = '/checkouts/' + gooddata.value.key_o
    }
  } finally {
    buyLoading.value = false
  }
}

/**  选择商品属性 */
const skuChange = (sku: any) => {
  const { id: varid, ...data } = product.datas.content.variants.find((item: any) => item.id == sku.id)
  gooddata.value = { ...gooddata.value, varid, ...data }
}

/**  sku 数据 */
const skus = computed(() => {
  return toSkuData_index(product.datas?.content?.options, product?.datas?.content?.variants)
})

/**  添加购物车 */
const addCartLoading = ref(false)
const addcar = async () => {
  //判断没id就不执行
  if (!gooddata.value.id) return
  addCartLoading.value = true
  try {
    const { data } = await shopAddcar({
      proid: gooddata.value.id,
      varid: gooddata.value.varid,
      num: gooddata.value.num,
      source: 'xfproduct',
    })
    if (data.state) {
      message.success(t('product.addSuccess'))
    }
  } finally {
    addCartLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.graphic_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* padding: 34px 20px; */
}

.price {
  color: #fc0808;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  border-radius: 4px;
  padding: 4px 16px;
  background: rgba(237, 0, 0, 0.1);
}
.favorable {
  padding: 0 10px;
  display: flex;
  align-items: last baseline;
}
</style>
