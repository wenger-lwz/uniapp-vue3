<template>
  <div class="product-info__body">
    <n-space justify="space-between" align="center" class="mb-26px">
      <div class="flex justify-start items-center">
        <p class="text-24px md:text-32px font-700 color-price">{{ formatPrice(select_sku.price) }}</p>
        <p
          class="text-12px md:text-16px font-700 color-originalPrice ml-15px"
          style="text-decoration: line-through"
          v-if="select_sku.price != select_sku.compare_at_price"
        >
          {{ formatPrice(select_sku.compare_at_price) }}
        </p>
      </div>
      <div class="text-12px color-#8A8A8A md:text-14px">{{ select_sku.sell_num }}{{ $t('product.sellNum') }}</div>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  select_sku: any
}>()
</script>

<style></style>
