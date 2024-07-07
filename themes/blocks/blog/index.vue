<template>
  <n-spin :show="pending">
    <div v-if="data?.page" class="w100% items-start justify-center flex-col md:items-center">
      <div class="w100% font-600 text-center py-5 s-title">{{ data?.page?.title || '' }}</div>
      <div v-html="data?.page?.content || ''"></div>
    </div>
    <div v-else>
      <ErrorsRoutingNotFound />
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import { getBlogDetailAPI } from '~/services/api/blog'

defineOptions({
  name: 'Pages',
})
defineProps<{
  datas: any
}>()

const route = useRoute()

const { data, pending, error, refresh } = await useAsyncData(() => getBlogDetailAPI(route.params?.all[1]), {
  transform(data: any) {
    return data?.data?.data
  },
  pick: ['page'],
  lazy: process.client,
})
</script>
