<template>
  <diy class="video-not">
  <div  class="video-not grid place-items-center text-white text-xs bg-black">
    <view class="py-2">
      <view class="text-center mb-1">
        <p class="regret">很抱歉，暂时无法获取直播画面</p>
        <p class="regret">请您观看其他精彩高清赛事！</p>
      </view>
      <navigator :url="`/pages/view/anchorLiveRoom/index?uid=${otherLive[0].uid}`"
                 hover-class="navigator-hover"
                 class="relative w-52 h-32"
                 v-if="otherLive.length" target="_self">
        <diy-image class="absolute  w-52 h-32   object-scale-down overflow-hidden"
                   :src="otherLive[0].cover"
                   alt="/static/img/default.png"
        />
        <image class="absolute w-6 h-6  object-scale-down top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="@img/28.png" alt=""/>
        <div class="absolute top-3 bg-red-500 py-0.5 pl-1 pr-2 rounded-tr-xl rounded-br-xl"><span
            class="live_ico"></span><span>正在直播</span></div>
        <i class="triangle"></i>
        <p class="absolute bottom-0 bg-gray-800 w-full p-1">{{ otherLive[0].title }}</p>
      </navigator>
    </view>
  </div>
  </diy>
</template>

<script setup lang="ts">
const {otherLive} = defineProps(['otherLive'])
</script>

<style scoped>
.video-not {
  height: 400rpx;
}
</style>