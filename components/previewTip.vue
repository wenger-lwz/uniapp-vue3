<template>
  <n-drawer
    v-model:show="active"
    placement="bottom"
    :mask-closable="false"
    height="60px"
    :show-mask="false"
    width="100%"
    :block-scroll="false"
  >
    <n-drawer-content header-class="hidden">
      <n-flex>
        <n-text class="text-center flex-1 text-lg font-black">当前店铺正处于预览模式</n-text>
        <IconClose @click="active = false" class="w-18px cursor-pointer" />
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
const route = useRoute()
const active = ref(false)
onMounted(() => {
  /**  设置预览模式底部提示 */
  if (window.top == window.self && route.query.theme_id) {
    active.value = true
  }
})
</script>

<style></style>
