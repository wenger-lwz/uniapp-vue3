<template>
  <div>
    <template v-if="loading">
      <div class="wh-full min-h-300px flex-center">
        <n-spin size="large" />
      </div>
    </template>
    <n-empty :show-description="false" v-else class="py60px">
      <template #icon>
        <img src="/image/emptyicon.png" />
      </template>
      <template #extra>
        <div class="text-center text-neutral-800 text-18px md:text-[32px] font-medium">{{ $t('address.noData') }}</div>
        <div class="text-center text-neutral-700 text-12px md:text-14px font-medium leading-normal">
          {{ $t('address.addData') }}
        </div>
      </template>
    </n-empty>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /**  加载状态 */
  loading: boolean
}>()
</script>

<style></style>
