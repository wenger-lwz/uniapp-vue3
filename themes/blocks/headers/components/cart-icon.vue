<template>
  <icon-bag v-if="cart?.icon" class="w-20px h-20px cursor-pointer" />
  <icon-shop-car v-else class="w-20px h-20px cursor-pointer" />
</template>

<script lang="ts" setup>
const { page } = storeToRefs(useThemeEditorStore())
const cart = computed(() => page.value?.settings?.global?.cart)
</script>

<style></style>
