<template>
  <view class="up p-2 pr-0 text-white text-xs">
    <view class="flex flex-row items-center">
<!--      <navigator :delta="1" open-type="navigateBack" hover-class="navigator-hover">-->
      <navigator url="/pages/view/anchor/index" open-type="switchTab" hover-class="navigator-hover">
        <image class="w-6 h-6 p-1 mr-2 rounded-full bg-gray-800 " src="@img/19.png" alt=""/>
      </navigator>
      <div class="flex flex-row items-center">
        <diy-image class="w-8 h-8 mr-1 rounded-full object-scale-down overflow-hidden"
                   :src="model.avatar"
                   alt="/static/img/default.png"
        />
        <div class="info-box-text">
          <div class="info-box-text-name omit">{{ model.anchorUserName }}</div>
          <div class="info-box-text-fans">
            粉丝{{
              Number(model.attentionTotal) > 9999 ?
                  (Math.floor(model.attentionTotal / 1000) / 10) + 'w' :
                  model.attentionTotal
            }}
          </div>
        </div>
        <div class="bg-red-500 rounded-full px-2 py-0.5 ml-1 whitespace-nowrap" @click="setAttention"
             v-if="userInfo&&isAttent !== 1 && userInfo.id !== roomId ">
          {{ !isAttent ? '关注' : '已关注' }}
        </div>
      </div>
      <!-- 守护位-->
      <div class="ml-1  relative text-center w-7 h-7 " @click="topNavClick('守护位')">
        <image class="w-6 h-6   rounded-full bg-gray-800 " src="@img/20.png" alt=""/>
        <image class="w-4 h-2 absolute -top-1.5 object-scale-down left-1.5  " src="@img/21.png" alt=""/>
        <image class="w-7 h-3  absolute bottom-0  object-scale-down   left-0  " src="@img/22.png" alt=""/>
      </div>
      <!-- 小助手 -->
      <div class="ml-1">
        <uni-link :href="configUrlObj.littleHelperUrl" text="" showUnderLine="false"
                  color="red">
        <image class="w-20 h-8 object-scale-down" v-if="configUrlObj.liveRoomHelperIcon"
               :src="configUrlObj.liveRoomHelperIcon" alt="" mode="aspectFit"/>
        <image class="w-8 h-8 object-scale-down" v-else src="@img/23.png" alt=""/>
        </uni-link>
      </div>
      <div class="text-center ml-1 bg-gray-800 rounded-2xl px-3">
        <div class="whitespace-nowrap">热度</div>
        <div>
          {{ Number(model.heat) > 9999 ? (Math.floor(model.heat / 1000) / 10) + '万' : model.heat }}
        </div>
      </div>
    </view>
    <view class="flex items-center justify-between  whitespace-nowrap">
      <div class="flex overflow-x-scroll py-0.5">
        <div :class="`item${index}`" v-for="(item, index) in navList" :key="index"
             @click="topNavClick(item.name)" class="flex items-center mr-1 py-1 px-2 rounded-xl">
          <image v-if="item.icon&&index===1" class="w-4 h-3 object-scale-down  rounded-full  mr-0.5"
                 :src="getImg(item.icon)" alt=""/>
          <image v-if="item.icon&&index>1" class="w-4 h-4 object-scale-down  rounded-full  mr-0.5"
                 :src="getImg(item.icon)" alt=""/>
          {{ item.title }}
          <uni-icons type="bottom" v-if="!item.icon" size="12"/>
        </div>
      </div>
      <div class="bg-gray-800 text-white rounded-tl-xl rounded-bl-xl flex items-center py-1 pl-1 ml-2"
           @click="openDrawer">
        <image class="w-3 h-3 " src="@img/27.png" alt=""/>
        <span class="mx-1">热门直播</span>
        <uni-icons type="right" color="white" size="12"/>
      </div>
    </view>


  </view>
</template>

<script setup lang="ts">

import {ref, toRefs} from 'vue'
import session from "@/stores";
import {checkedLogin, getImg} from "@/utils";
import {apiPublic} from '@/api'

const {userInfo, configUrlObj} = toRefs(session())
const {model, roomId} = defineProps(['model', 'roomId'])
const emit = defineEmits(['changeShowDrawer', 'openDrawer','changePopupType'])
let isAttent = ref(model.attentionMark)//是否关注主播

/*打开守护位*/


function openDrawer() {
  emit('openDrawer', true)
}

/*关注主播*/
function setAttention() {
  apiPublic(
      {
        'service': 'User.setAttent',
        'uid': userInfo.value.id,
        'touid': roomId,
      }).then((res: any) => {
    if (res.data.info[0].isattent == 0) {
      uni.showToast({
        icon: 'none',
        title: "取消关注成功！"
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: "关注成功！"
      })
    }
    isAttent.value = +res.data.info[0].isattent;
  });
}


const navList = [
  {name:'指数',title: '指数&赛况', icon: ''},
  {name:'粉丝团',title: '粉丝团', icon: '24.png'},
  {name:'贡献榜',title: '贡献榜', icon: '25.png'},
  {name:'主播预约',title: '主播预约', icon: '26.png'},
]


function topNavClick(name:String) {
  emit('changePopupType',name)
}

</script>

<style scoped>
.up {
  background: linear-gradient(to bottom right, #01032b, #090038);
}

.item0 {
  color: #825300;
  background: linear-gradient(139deg, #FDF1BA 0%, #FBCE80 100%);
}

.item1 {
  background: linear-gradient(147deg, #FF8282 0%, #EB3333 100%);


}

.item2 {
  background: linear-gradient(334deg, #83CC83 0%, #33B033 100%);


}

.item3 {
  background: linear-gradient(139deg, #569FFF 0%, #2FE0FC 100%);


}
</style>