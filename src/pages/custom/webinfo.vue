<template>
  <view class="w-full h-screen flex flex-col">
    <diy-top></diy-top>
    <iframe v-if="url" class="flex-1" :webview-styles="wbStyles" :src="url" :fullscreen="false"/>
  </view>

</template>

<script setup lang="ts">
import {
  onLoad, onReady
} from '@dcloudio/uni-app';
import {
  ref
} from 'vue';

const url = ref(''),
    title = ref('')

onLoad((e: any) => {
  const data = JSON.parse(decodeURIComponent(e.url))
  url.value = data
  title.value = e.title
})

/*
  获取顶部安全区域的高度 安卓的顶部区域为0 ios的是实际大小
*/
let safeTopArea = uni.getSystemInfoSync().platform == 'ios' ? uni.getSystemInfoSync().safeAreaInsets.top : 0;
//获取底部安全区域的高度
let safeBoottom = uni.getSystemInfoSync().safeAreaInsets.bottom;

const wbStyles = {
  progress: {
    color: '#FF3333',
  },
  top: safeTopArea,  //ios的位置上移安全区域的高度
  height: uni.getSystemInfoSync().windowHeight - safeBoottom - safeTopArea,  //高度+安全区域的高度
}
//  document.addEventListener('jsLogin', function() {
// 	console.log("login");
// });
</script>
