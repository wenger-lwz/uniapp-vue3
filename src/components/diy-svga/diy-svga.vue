<template>
  <view class="w-full h-full">
  <view class="relative w-full h-full" >
    <view class="absolute top-0 left-0  w-full  h-full">
    <c-svga ref="cSvgaRef" :canvasId='canvasId'
            :src="src"
            height="100%"
            width="100%"
            :loops='model.loops' :auto-play="true" @frame='onFrame' @finished='onFinished' @percentage='onPercentage'
            @loaded='ed'></c-svga>
    <!--    <view class="content">-->
    <!--      <view>切换图像</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/b3875bda-8de0-476d-8f55-d10b24f16d98.svg'" size="mini">小汽车</button>-->
    <!--        <button @click="src='https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/eebed809-b03e-4b90-88f8-5d6811b65f86.svg'" size="mini">玫瑰花</button>-->
    <!--      </view>-->
    <!--      <view>播放暂停</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="cSvgaRef.call('startAnimation')" size="mini">播放</button>-->
    <!--        <button @click="cSvgaRef.call('startAnimation',true)" size="mini">反向播放</button>-->
    <!--        <button @click="cSvgaRef.call('pauseAnimation')" size="mini">暂停播放</button>-->
    <!--        <button @click="cSvgaRef.call('stopAnimation')" size="mini">停止播放</button>-->
    <!--      </view>-->
    <!--      <view>设置动画的拉伸模式</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="cSvgaRef.call('setContentMode','Fill')" size="mini">Fill</button>-->
    <!--        <button @click="cSvgaRef.call('setContentMode','AspectFill')" size="mini">AspectFill</button>-->
    <!--        <button @click="cSvgaRef.call('setContentMode','AspectFit')" size="mini">AspectFit</button>-->
    <!--      </view>-->
    <!--      <view>强制清空画布</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="cSvgaRef.call('clear')" size="mini">清空画布</button>-->
    <!--      </view>-->
    <!--      <view>跳到指定帧/百分比</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="cSvgaRef.call('stepToFrame',[40,true])" size="mini">跳到40帧</button>-->
    <!--        <button @click="cSvgaRef.call('stepToPercentage',[60,true])" size="mini">跳到60%</button>-->
    <!--      </view>-->
    <!--      <view>设定动态图像/动态文本</view>-->
    <!--      <view class="btnBox">-->
    <!--        <button @click="cSvgaRef.call('setImage',['/static/index/logo.png','06'])" size="mini">动态图像</button>-->
    <!--        <button @click="cSvgaRef.call('setText',[{text:'Hello, World!'},'08'])" size="mini">动态文本</button>-->
    <!--        <button @click="cSvgaRef.call('clearDynamicObjects')" size="mini">清空动态图像和文本</button>-->
    <!--      </view>-->
    <!--    </view>-->
    </view>
  </view>
  </view>
</template>

<script setup>
import {ref} from "vue";
import socketFunc from "@/utils/socketFunc";
const {ovenSvgaList} = socketFunc
const {model}= defineProps(['model'])
const emit = defineEmits(['finished'])


const cSvgaRef = ref(), canvasId = 'myCanvas'
let src = ref(model.src)
//https://c11-pre-img.kf66.live/data/upload/20230407/642fea748bb09.svga//穿云箭
//https://mp-99973cd6-4799-4f4d-8f02-14c480d8a6a2.cdn.bspapp.com/cloudstorage/c22d05d6-54c9-4d88-85b2-5bb00668167f.svga//笑脸
//http://static-user-test.kemiba.cn/gift_ani/341609146206090.svga//过年
const onFinished = () => {
  // console.log('动画停止播放时回调',ovenSvgaList.length);
  emit('finished')
  if(ovenSvgaList.length){
    ovenSvgaList.shift()
  }
}
const onFrame = (frame) => {//动画播放至某帧后回调
  // console.log(frame);
}
const onPercentage = (percentage) => { //动画播放至某进度后回调
                                       // console.log(percentage);
}
const ed = () => {
  console.log('加载完成');
}

</script>

<style lang="scss">

.content {
  padding: 20rpx;
  font-size: 28rpx;
}

.btnBox {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 30rpx;
}
</style>