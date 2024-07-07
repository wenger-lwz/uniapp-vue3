<!-- <script setup lang="ts">
import axios from 'axios'
const route = useRoute()
const html = ref(null)
const headers = useRequestHeaders()
const baseUrl = `${headers.scheme}://${headers.host}/`
/* ---------------------------------- 获取数据 ---------------------------------- */
let result = ''
try {
  result = await axios(`/api/products/markets/${route.params.all[1]}`, {
    baseURL: process.server ? baseUrl : null,
    withCredentials: true,
    headers: headers,
  })
} catch (error) {
  console.log('%c Line:38 🥓 error', 'color:#465975', error)
}
if (result?.data?.msg == 'ok') {
  html.value = result.data.market
}
</script>

<template>
  <div v-for="(item, index) in html" :key="index">
    <div v-html="item"></div>
  </div>
</template> -->
<template>
  <div></div>
</template>

<script lang="ts" setup></script>

<style></style>
