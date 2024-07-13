<template>
  <view class="w-screen h-screen flex flex-col ">
    <diy-top></diy-top>

<!--        <view class="w-full flex-1"  v-if="showVideo">-->
<!--            <diy-video src="https://hls-test.gucuixiang.com/live/4967_3/playlist.m3u8?sign=807c01714402c3aeb73f4739add2e39d&t=646871d0"/>-->
<!--        </view>-->


    <text class="text-center w-full text-blue-400 bg-white text-lg h-16 py-6">快聊</text>
    <iframe v-if="userInfo && userInfo.token" class="flex-1" :webview-styles="wbStyles" :src="chatUrls"
            :fullscreen="false"/>


    <view v-if="userInfo && userInfo.token" class="h-14"></view>
    <view class="w-full h-full bg-gray-100 flex flex-col justify-center items-center"
          v-if="!userInfo">
      <text class="text-base text-black text-center">你还未登录</text>
      <text class="text-sm text-gray-500 text-center mt-2">登录后即可查看消息</text>
      <button class="text-white text-sm bg-red-400 rounded-xl w-12 h-6 mt-2 py-0.5" @click="onCLick">登录</button>
    </view>
  </view>

</template>

<script setup lang="ts">
import {
  onHide,
  onShow
} from '@dcloudio/uni-app';

import {
  ref,
  toRefs
} from 'vue';

import session from "@/stores";

import {
  checkedLogin,
} from "@/utils";

const {
  configUrlObj,
  userInfo
} = toRefs(session())

const chatUrls = ref('')

let showVideo = ref(false)
onHide(() => {
  showVideo.value = false

})


onShow(() => {
  showVideo.value = true
  if (userInfo.value && userInfo.value.token) {
    chatUrls.value = configUrlObj.value.chatUrl
        .replace("[UID]", userInfo.value ? userInfo.value.id : 0)
        .replace("[TOKEN]", userInfo.value.token)
        .replace("[HEIGHT]", 0)
        .replace("[SHOWICO]", 0)
        .replace("[SOURCEFROM]", 1);
  }
})

/*
  获取顶部安全区域的高度 安卓的顶部区域为0 ios的是实际大小
*/
const sysInfo = uni.getSystemInfoSync()
let safeTopArea = sysInfo.platform == 'ios' ? sysInfo.safeAreaInsets.top : 0;
//获取底部安全区域的高度
let safeBoottom = sysInfo.safeAreaInsets.bottom;
const wbStyles = {
  progress: {
    color: '#FF3333',
  },
  top: safeTopArea + 44, //ios的位置上移安全区域的高度
  height: sysInfo.windowHeight - 44 - safeTopArea, //高度+安全区域的高度
}

const onCLick = (() => {
  checkedLogin()
})
</script>

<style>

</style>