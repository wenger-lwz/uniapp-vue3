<template>
<!--  <text class="text-white break-all " >{{ParseFace(model['ct'])}}</text>-->
  <view class="text-white  " v-html="rawHtml"></view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import emotion from "@/static/js/emotion";
const {model}=defineProps(['model'])
let rawHtml=ref('')
if(typeof model['ct'] === 'string'){
  rawHtml.value=  model['ct'].replace(/\[[\u4e00-\u9fa5]{1,4}\]/g, (match:unknown): any => {
    let arr = emotion.filter(item => item['text'] === match)
    return arr.length ? `<img class='w-5 h-5 inline' src="https://c11-dev-web.kf66.live/public/front/images/face/${emotion[0].id}.png"/>` :  model['ct']
  });
}else{
  rawHtml.value= `赠送了 <img class='w-4 h-4 inline' src="${model.ct.gifticon}"/>
    <span style="color:red">X${model.ct.giftcount}</span>`
}


</script>

<style scoped>

</style>