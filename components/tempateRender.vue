<template>
  <article class="flex-col h-full min-h-300px flex-1">
    <template v-if="Data">
      <component
        v-for="(element, index) in Data"
        :key="element.id || index"
        :is="`blocks-${element.component}`"
        :id="element.id"
        :datas="element.settings"
        class="md:max-w-100% lg:max-w-1200px max-w-100% md:mx-auto px-20px"
        :data-type="element.type"
      />
    </template>
    <routing-not-found v-else />
  </article>
</template>

<script setup lang="ts">
import picomatch from 'picomatch'
import RoutingNotFound from './errors/RoutingNotFound.vue'
// const ThemeEditor = useThemeEditor()
const { pageRouter, page } = storeToRefs(useThemeEditorStore())
// const props = defineProps<{
//   pageData: any
// }>()

const route = useRoute()
const Data = computed(() => {
  if (route.query.isPreview) {
    return page.value?.templates?.props?.blocks
  }
  return pageRouter.value?.find((item: any) => picomatch.isMatch(route.path, item?.path || ''))?.props?.blocks
})
</script>
