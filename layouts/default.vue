<script setup lang="ts">
const props = defineProps<{
  datas: any
}>()

const { renderType, themeKey, page } = storeToRefs(useThemeEditorStore())

const route = useRoute()

const Data = computed(() => {
  if (route.query.isPreview) {
    return page.value
  }
  return props.datas
})

const isShow = computed(() => {
  return (
    renderType.value != 'cod' &&
    !themeKey.value.includes('theme') &&
    !['checkouts-all', 'orders-all'].includes(route.name as string)
  )
})

const { productsresult } = storeToRefs(useProductsresult())
</script>
<template>
  <div class="flex flex-col min-h-100vh h-100%" :class="productsresult?.add_to_cart?.enabled == 1 ? 'pb-96px' : ''">
    <component :is="`blocks-announcement`" v-if="isShow" :datas="Data" />
    <component :is="`blocks-headers`" v-if="isShow" :datas="Data" />
    <suspense><slot class="flex-1" /></suspense>
    <component :is="`blocks-footer`" v-if="isShow" class="order-9999" :datas="Data" />
    <n-back-top :bottom="100" :visibility-height="300"></n-back-top>
  </div>
</template>
