<template>
<view class="w-full pt-10 absolute top-0 left-0 " v-if="damuList.length">
  <diy-time-out-hide v-for="(item,index) in damuList" :key="index" @end="onFinished" :model="item" />
</view>

</template>

<script setup >
import socketFunc from '@/utils/socketFunc'
const {damuList} = socketFunc
function onFinished() {
  damuList.shift()
}
</script>

<style scoped>

</style>