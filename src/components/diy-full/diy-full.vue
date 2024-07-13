<template>
  <teleport to="body" :disabled="true" >
      <view class="relative flex flex-col z-10 bg-black" :class="{'isFullClick':isFullClick,'h-full':isFull&&!isFullClick}">
        <slot name="default">
        </slot>
      </view>
  </teleport>
</template>

<script setup lang="ts">
import {onUnmounted, watch} from "vue";
import {isFull,isFullClick} from '@/config'
import {onReady} from "@dcloudio/uni-app";
watch(()=>isFull,(e)=>{
  if (e.value) {
    uni.hideTabBar()
  } else {
    uni.showTabBar()
  }
},{immediate:true,deep:true})

// let landscapeOb = uni.createMediaQueryObserver(this)
onReady(() => {
  // console.log(landscapeOb, 26)
  //屏幕方向为纵向/横向 portrait/landscape
  //@ts-ignore
  // landscapeOb.observe({orientation: 'landscape'}, (matches: any) => { //屏幕方向为纵向/横向 portrait/landscape
  //   // isFull.value = matches
  //   // isFullClick.value = false
  //   console.log(matches, 67,isFull.value,isFullClick.value);
  // })
})
onUnmounted(()=>{
  // landscapeOb.disconnect()
  // console.log(4545)
})

</script>

<style scoped>
.isFullClick{
  position: fixed;
  width: 100vh;
  height: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: rotate(90deg);
  transform-origin: left 100%;
  margin-top:-100vw;
  box-sizing: border-box;
}

</style>