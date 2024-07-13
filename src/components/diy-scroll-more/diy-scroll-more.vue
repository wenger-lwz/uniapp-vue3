<template>
  <mescroll-uni  class="h-full" height="100%" :bottom="bottomNum" :safearea="false" :bottombar="false"
                @init="mescrollInit" @up="upCallback" :down="downSet" :up="upSet">
    <slot></slot>
  </mescroll-uni>
</template>

<script setup lang="ts">
import useMescroll from "@/uni_modules/mescroll-uni/hooks/useMescroll";
import {onPageScroll, onReachBottom} from "@dcloudio/uni-app";

const {bNum=160}= defineProps(['bNum'])
const downSet = {use: false, auto: false};
const upSet = {textNoMore: '已加载完数据'};

const {mescrollInit} = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook
const sys: any = uni.getSystemInfoSync();
let bottomNum = bNum + sys.statusBarHeight * 2
const emit = defineEmits(['upCallback'])
// 上拉加载的回调: 其中num:当前页 从1开始, size:每页数据条数,默认10
const upCallback = async (mescroll: any) => {
  emit('upCallback', mescroll)
}

</script>

<style scoped>

</style>