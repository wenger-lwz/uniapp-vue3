<template>
  <section v-if="data" class="w100% items-start justify-center flex-col md:items-center" style="">
    <div class="w100% font-600 text-center py-5 s-title">{{ data?.title }}</div>
    <div v-html="data?.content"></div>
  </section>
  <section v-else>
    <ErrorsRoutingNotFound />
  </section>
</template>

<script setup lang="ts">
import { getPagesDetailAPI } from '~/services/api/pages'

defineOptions({
  name: 'Blog',
})
defineProps<{
  datas: any
}>()
const route = useRoute()
const nuxtApp = useNuxtApp()

const { data } = await useAsyncData(route.fullPath, () => getPagesDetailAPI(route.params.all[1]), {
  lazy: process.client,
  transform({ data }) {
    return data?.data?.page
  },
  getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
})
</script>
