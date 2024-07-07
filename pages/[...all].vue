<script setup lang="tsx">
const route = useRoute()
const { themeKey } = storeToRefs(useThemeEditorStore())

defineOptions({
  name: 'PageResolver',
})
</script>

<template>
  <main class="wh-full flex-1">
    <LiquidPage v-if="themeKey?.includes('theme')" :url="route.fullPath" />
    <TempateRender v-else />
  </main>
</template>
