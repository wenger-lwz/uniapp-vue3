<template>
  <div v-if="data?.length" class="flex gap-5 flex-wrap mt-10">
    <nuxt-link
      :to="`/products/${item.handle}`"
      v-for="(item, index) in data"
      :key="index"
      class="w-[165px] h-[211px] justify-start items-start"
    >
      <div class="flex-col justify-start items-start gap-14px flex">
        <sps-img class="w-[165px] h-[153px] rounded-sm" :src="item.thumbs" />
        <n-ellipsis :tooltip="false" class="text-neutral-800 text-sm font-normal leading-normal tracking-wide">
          {{ item.title }}
        </n-ellipsis>
      </div>
      <div class="w-[165px] text-red-600 text-sm font-medium leading-tight tracking-wide">
        {{ formatPrice(Number(item.price)) }}
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  /**  推荐商品 */
  name: 'CodRecommend',
})

defineProps<{
  data: COD.Recommend[]
}>()
</script>

<style></style>
