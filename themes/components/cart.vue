<template>
  <!-- 侧边栏购物车 -->
  <div class="w-full">
    <n-drawer
      v-model:show="show"
      :on-after-enter="getcarlist"
      placement="right"
      class="md:!w550px !w-100% pt44px px26px color-#000 md:color-#FFF bg-#FFF md:bg-#000"
    >
      <n-drawer-content footer-style="border:none;" header-style="border:none;" closable>
        <template #header>
          <p class="md:color-#FFF color-#000">{{ $t('headers.cart') }}{{ show }}</p>
        </template>
        <n-spin :show="loading">
          <div class="w-100%">
            <div
              class="w-100% flex py10px md:py17px items-center"
              v-for="(item, index) in carList.line_items"
              :key="index"
            >
              <n-checkbox :disabled="item.status != 1" @update:checked="handleCheckedChange(item.id)" />
              <sps-img
                class="w80px mr-15px ml-15px flex-center b-1 b-#cccc"
                style="aspect-ratio: 4/5"
                :src="item.status != 1 ? '' : item.image.src"
                :alt="$t('failure')"
                @click="$router.push('/products/' + item.product_id)"
              />
              <div class="text-14px grow-1 flex-col h100px justify-between">
                <p @click="$router.push('/products/' + item.product_id)">{{ item.product_title }}</p>
                <p class="flex color-#8D8D8D" @click="$router.push('/products/' + item.product_id)">
                  <span v-for="i in item.options" :key="i.name" class="m-r15px">{{ i.value }}</span>
                  <!-- <span class=" m-l15px">256G</span> -->
                </p>
                <div class="flex justify-between items-center">
                  <n-space align="center" class="b-b b-#cccc" style="gap: 12px 14px">
                    <n-button
                      text
                      size="large"
                      @click="changeGoodsNum(item, -1)"
                      style="color: #969696"
                      class="text-32px"
                    >
                      -
                    </n-button>
                    <span>{{ item.quantity }}</span>
                    <n-button
                      text
                      size="large"
                      @click="changeGoodsNum(item, 1)"
                      style="color: #969696"
                      class="text-25px"
                    >
                      +
                    </n-button>
                  </n-space>
                  <p>{{ formatPrice(item.line_price) }}</p>
                </div>
              </div>
            </div>
          </div>
        </n-spin>

        <template #footer class="w100%">
          <div class="w100%">
            <div class="flex justify-between items-center text-16px mb-30px">
              <span>{{ $t('headers.total') }}</span>
              <span>{{ formatPrice(cartotalprice) }}</span>
            </div>
            <n-button
              :disabled="!carIds.length"
              :loading="buynowloading"
              @click="buyNow"
              style="height: 50px; --n-text-color-disabled: #fff"
              class="p-12px text-14px md:text-16px cursor-pointer md:border bg-#18a058 md:bg-#000 color-#FFF w-100% text-center"
            >
              {{ $t('headers.buynow') }}
            </n-button>
            <nuxt-link
              to="/cart"
              @click="setCarShow"
              style="height: 50px"
              class="hidden md:block p-12px text-16px cursor-pointer border w-100% text-center bg-#FFF color-#000 mt-20px"
            >
              {{ $t('headers.checkcart') }}
            </nuxt-link>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  carShow: boolean
}>()
const {
  buyNow,
  loading,
  getcarlist,
  buynowloading,
  carList,
  cartotalprice,
  changeGoodsNum,
  handleCheckedChange,
  carIds,
} = useCart()
/**  显示/隐藏 购物车 */
const show = defineModel<boolean>('carShow')

onBeforeMount(() => {
  show.value && getcarlist()
})

const setCarShow = () => {
  show.value = false
  
}
</script>
