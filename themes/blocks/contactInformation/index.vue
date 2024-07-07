<!-- 邮箱订阅不可删除 -->
<template>
  <section class="flex gap-5 w-36 flex-col text-left">
    <div class="font-bold font-medium leading-tight s-sub-title">{{ datas.title }}</div>
    <div class="font-normal leading-tight">{{ datas.address }}</div>
    <div class="font-normal leading-tight">{{ datas.telephone }}</div>
    <div class="font-normal leading-tight">{{ datas.email }}</div>
    <div class="font-normal leading-tight">{{ datas.wechat }}</div>
    <div class="font-normal leading-tight">{{ datas.twitter }}</div>
    <div class="font-normal leading-tight">{{ datas.custom }}</div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ContactInformation',
})
defineProps<{
  datas: any
}>()
</script>
