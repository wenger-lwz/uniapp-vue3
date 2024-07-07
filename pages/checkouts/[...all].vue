<template>
  <div
    class="md:max-w-1200px flex-1 w-full h-100% flex-col md:flex-row justify-between mx-auto px-10px pb-100px md:pb0"
  >
    <div class="flex justify-between items-center p-15px block md:hidden b-b-1 b-#E1E3E5">
      <icon-back class="mr-15px w18px h18px" name="back" @click="$router.back()" />
      <div class="text-center text-black text-lg font-normal">{{ $t('checkout.confirmOrder') }}</div>
    </div>

    <!-- 表单 -->
    <CheckoutsStepForm ref="form" v-model="goodsOverview" v-model:data="checkoutData" />

    <!-- 订单摘要 -->
    <CheckoutsAbstract
      :current="form?.current"
      :goods-overview="goodsOverview"
      :price="checkoutData?.price"
      :checkouttips="checkoutData?.checkouttips"
      :monely="checkoutData?.head_data?.currency"
      @submit-order="form?.nextCheck"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Checkouts',
})
const { checkoutData } = storeToRefs(useCheckoutsStore())
const form = ref<any>()

/**  订单商品信息 */
const goodsOverview = ref<any>([])
</script>
