<template>
  <section class="w-full flex-col gap-5 justify-start md:items-center items-start max-w-500px">
    <div class="font-bold max-w-500px s-sub-title">{{ datas.title }}</div>
    <div class="font-normal leading-tight max-w-500px" v-html="HtmlUtil.escape2Html(datas.subTitle)"></div>
  </section>
</template>

<script setup lang="ts">
import { HtmlUtil } from '~/utils/common/htmlDecode'

defineOptions({
  name: 'CustomContentFooter',
})

/**
 * 自定义页尾内容
 */
defineProps<{
  datas: any
}>()
</script>
