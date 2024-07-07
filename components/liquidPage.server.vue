<template>
  <div>
    <div v-if="html" v-html="html"></div>
    <RoutingNotFound
      v-else
      :error="{
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Data not found',
      }"
    ></RoutingNotFound>
  </div>
</template>

<script setup lang="ts">
import liquidRender from '~/composables/liquidRender.server'
import { getTemplateData } from '~/services/api'
import RoutingNotFound from './errors/RoutingNotFound.vue'

defineOptions({
  name: 'Liquid',
})

const props = defineProps<{
  url: string
}>()

const html = ref()
const { data, pending, error, refresh } = await useAsyncData(() => getTemplateData(props.url), {
  transform: (data) => data?.data,
})
if (data.value) {
  html.value = await liquidRender(data.value, props.url)
}
</script>

<style></style>
