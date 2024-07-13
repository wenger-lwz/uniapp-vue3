<template>
  <view>
    <view class="inline leading-5">
      <image class="w-4 h-4  object-scale-down float-left" src="@img/49.png" alt=""/>
      <text class="ml-1">房间公告：</text>
      <view v-for="(item,index) in noticeArr" :key="index" class="inline">
        <view class="inline" v-if="item.qq" @click="copy(item.qq)">
          <text class="bg-blue-400 text-white px-1  py-0.5 rounded">{{ item['qq'] }}</text>
          <text>(点击复制)</text>
        </view>
        <view class="inline" v-else-if="item.wechat" @click="copy(item.wechat)">
          <text class="bg-green-400  text-white px-1 py-0.5 rounded">{{ item['wechat'] }}</text>
          <text>(点击复制)</text>
        </view>
        <view class="inline" v-else-if="item.url">
            <uni-link :href="item['url']" :text="item['value']" color="#007BFF"></uni-link>
          <text>(点击进入)</text>
        </view>
        <text v-else>{{ item }}</text>
      </view>
      <uni-link class="ml-1 py-0.5 px-1 bg-red-500  rounded"
                :href="configUrlObj.littleHelperUrl" text="小助手" color="#fff" showUnderLine="false" font-size="12"></uni-link>
    </view>
    <view class="h-4 w-4 flex items-center justify-center bg-white
      text-red-500 rounded-full text-sm  absolute  top-0 right-0"
          @click="close" >✕ </view>
  </view>
</template>

<script setup lang="ts">
import {toRefs} from "vue";
import session from "@/stores";

const {livePost} = defineProps(['livePost'])
const emit = defineEmits(['close']);
const {configUrlObj} = toRefs(session())

let treg = /@[^@|\{|\}]+?{[^@|\{|\}]+?}/g, kreg = /\@(.+?)\{/, vreg = /\{(.+?)\}/, key = '', value = ''
let arr: any = [];
let notice = livePost.replace(treg, (res: any) => {
  key = res.match(kreg)[1]
  value = res.match(vreg)[1]
  key = key.toLowerCase()
  switch (key) {
    case 'qq':
      arr.push({'qq': value})
      return '√≈√'
    case 'wechat':
      arr.push({'wechat': value})
      return '√≈√'
    case 'url':
    case 'chatinsite':
      let url = /^http/.test(value) ? value : 'http://' + value;
      arr.push({url, value,})
      return '√≈√'
  }
})

let noticeArr = notice.split('√').map((item: any) => {
  return item === '≈' ? arr.shift() : item
});

function close() {
  emit('close')
}



function copy(e:string) {
  uni.setClipboardData({
    data: e,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: "复制成功"
      })
    }
  });
}
</script>

<style scoped>

</style>