<template>
  <diy-full :isFull="isFull" :isFullClick="isFullClick">
    <template v-slot:default>
      <ls-dom-video
          v-if="src"
          @click="fullClick"
          class="z-0"
          :class="[isFull?'bg-black':'h-52',]"
          ref="domVideo"
          @videoEvent="videoEvent"
          :src="src"
      />
      <diy-danmu/>
      <view class="absolute bottom-5 left-8  z-10 h-60 w-1/4 overflow-hidden">
      <Message v-if="showDom" class="" :roomId="roomId"/>
      </view>
      <view v-if="showPlay"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-red-500 z-50">
<!--        <text @click="videoF('play')">播放</text>-->
        <u-icon name="pause" color="#fff" size="28" @click="videoF('play')"/>
      </view>
      <view class="w-full text-red-500  absolute bottom-0  z-50" v-if="showControls"
      >
        <view class="grid  grid-cols-3 place-items-center transform">
<!--          <text @click="videoF('play')">播放</text>-->
          <u-icon  v-if="showPlay" name="play-circle" color="#fff" size="28" @click="videoF('play')"/>
          <u-icon  v-else  name="pause-circle" color="#fff" size="28" @click="videoF('pause')"/>



          <view v-if="isFull" class="flex items-center h-10 w-full bt-btn">
            <image  class="w-5 h-5 object-scale-down    mx-3 " src="@img/41.png" alt=""/>
            <input ref="sendInput" :adjust-position="false" type="text"
                   class="uni-input flex-1 px-2 text-white h-full"
                   placeholder="弹幕走一波～～">
            <text class="px-3 text-center  text-white h-full leading-10 bg-gray-800 ">发送
            </text>
          </view>
          <view v-else></view>

<!--          <text @click="videoF('pause')">暂停</text>-->

<!--          <text @click="videoF('fullScreen')">{{ isFull ? '退出全屏' : '全屏' }}</text>-->
          <u-icon v-if="isFull" name="minus-square-fill" color="#fff" size="28" @click="videoF('fullScreen')"/>
          <u-icon v-else name="plus-square-fill" color="#fff" size="28" @click="videoF('fullScreen')"/>

        </view>
      </view>

      <view v-if="!isFull" class="absolute right-2 top-2 text-white font-bold" @click="toTouPing">
        投屏
      </view>
    </template>
  </diy-full>
</template>

<script setup lang="ts">
import {isFull, isFullClick} from '@/config'
import {nextTick, ref,} from "vue";
import {
  onHide,
  onShow
} from '@dcloudio/uni-app';
import Message from "@/pages/componts/chatRoom/message.vue";
import {nextDom} from '@/utils'

const {src, roomId} = defineProps(['src', 'roomId'])
let domVideo = ref()//视频dom
let showControls = ref(false)//视频控制器
let time1 = 0;//首次显示控制器定时器
let showPlay = ref(false)//显示继续播放按钮
let showDom=ref(false)
function videoF(e: string) {
  if (e === 'fullScreen') {
    isFullClick.value = !isFull.value
    isFull.value = !isFull.value
    if(isFull.value){
      nextDom(showDom)
    }else{
      showDom.value=false
    }
  } else {
    domVideo.value[e]()
  }
}
function toTouPing() {
  videoF('pause')
  uni.navigateTo({
    url: `/pages/view/touping/index?url=${encodeURIComponent(JSON.stringify(src))}`
  });
}
function timeHideControls() {
  if (time1) {
    clearTimeout(time1)
    time1 = 0
  }
  time1 = setTimeout(() => {
    showControls.value = false
    if (time1) {
      clearTimeout(time1)
      time1 = 0
    }
  }, 2500)
}

function fullClick() {
  showControls.value = !showControls.value
  if (showControls.value) {
    timeHideControls()
  }
}

function videoEvent(e: any) {
  console.log(e,105)
  nextTick(()=>{
    if (e === 'pause') {
      showPlay.value = true
    } else {
      showPlay.value = false
    }
  })
}

onShow(() => {
  isFull.value = false
  isFullClick.value = false
  showControls.value = true
  timeHideControls()
})
onHide(() => {
  if (time1) {
    clearTimeout(time1)
    time1 = 0
  }
})
</script>

<style scoped>

</style>