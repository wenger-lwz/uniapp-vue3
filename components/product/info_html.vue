<template>
  <!-- 商品详情 -->
  <n-space vertical class="mt60px w-100% px-20px md:px-0px">
    <n-space class="border-b-1px border-color-#E1E3E5 w-100% p-b-14px md:p-b22px">
      <p class="text-16px md:text-22px color-#000 font-600">{{ $t('product.goods_datail') }}</p>
    </n-space>
    <div v-html="description" class="w100% overflow-hidden rich"></div>
  </n-space>
</template>

<script lang="ts" setup>
defineProps<{
  description: string
}>()
</script>
