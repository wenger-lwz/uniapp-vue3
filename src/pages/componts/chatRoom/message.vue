<template>
  <template v-if="showMessageFlag">
    <!--聊天消息体-->
    <scroll-view :scroll-top="scrollTop" :scroll-y="true" class="h-full">
      <view v-for="(item,index) in messageList" :key="index" >
        <view v-if="item['msgtype']==='4'||+roomId===+item['uid']"
              class="bg-black bg-opacity-60 p-1 rounded blur-3xl  max-w-max mt-1 flex flex-row  flex-wrap leading-5">
          <text class="text-red-400">直播间消息：</text>
          <diy-msgess :model="item"/>
        </view>
        <view v-if="(item['msgtype']==='2'||item['msgtype']==='1')&&+roomId!==+item['uid']"
              class="bg-black bg-opacity-60 p-1 rounded blur-3xl mt-1 w-full flex flex-row  flex-wrap leading-5 break-all">
          <diy-image class="w-4 h-4 mr-1 inline-block object-scale-down overflow-hidden"
                     v-if="item['voteTeamIcon']"
                     :src="item['voteTeamIcon']"
                     alt="/static/img/default.png"/>
          <text class="px-2 mr-1 h-4 rounded-xl text-white  whitespace-nowrap" :class="`level_${item['level']}`">
            LV{{ item['level'] }}
          </text>
          <image v-if="item['isAnchor']" class="w-4 h-4 mr-1" src="@img/56.png" alt=""/>
          <image v-if="item['vipLevel']>0" class="w-14 h-5 mr-1" :src="getImg(`vipLevel/${item['vipLevel']}.png`)"
                 alt=""/>
          <view class="inline w-max mr-1 " v-if="item['fansLevel']>1">
            <view class="flex flex-row w-max items-center ">
              <image class="w-4 h-4 -mr-1.5 object-scale-down align-bottom" src="@img/48.png" alt=""/>
              <text class="pl-2 pr-0.5  text-white bg-red-500 rounded-tl-xl rounded-bl-xl">
                {{ item['groupName'] || '粉丝团' }}
              </text>
              <text class="px-1 bg-white text-red-500">{{ item['fansLevel'] }}</text>
            </view>
          </view>
          <text v-if="item['rankingLevel'] > 0 && item['rankingLevel'] < 10"
                class="rankingLevel mr-1 whitespace-nowrap px-2 h-4 leading-4 rounded-xl text-white border border-white">
            周榜{{
              item['rankingLevel']
            }}:
          </text>
          <text class="mr-1 " :class="`username_level_${item['level']}`">{{ item['unameAfterReplace'] }}:</text>
          <text class="mr-1 " :class="`username_level_${item['level']}`" v-if="item['atUser']">
            @{{ item['atUser']['uname'] }}
          </text>
          <diy-msgess :model="item"/>
        </view>
      </view>
    </scroll-view>
  </template>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import socketFunc from "@/utils/socketFunc";
import {getImg, nextDom} from "@/utils";
const {roomId}=defineProps(['roomId'])

let showMessageFlag = ref(false);//显示聊天消息开关
let scrollTop = ref(0);//滚动高度
const {messageList} = socketFunc
/*滚动置底*/
function toNext() {
  scrollTop.value = 999999
  nextTick(() => {
    scrollTop.value = 9999999
  })
}
nextDom(showMessageFlag)
/*直播间 直播状态*/
watch(() => messageList, (e) => {
  showMessageFlag.value = false
  nextTick(() => {
    showMessageFlag.value = true
    if(e.length){
      toNext()
    }
  })
}, {deep: true})
onMounted(()=>{
  toNext()
})
</script>

<style scoped>

.rankingLevel {
  background: linear-gradient(143deg, #6457E6 0%, #F02ACF 100%);
}


</style>