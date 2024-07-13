<template>
  <view class="qlLiveRoom  h-screen flex flex-col text-xs">
    <diy-top/>
    <RoomVideo ref="videoDom" v-if="socketShowVideoType === '1'&&showVideo" :model="anchorRoomInfoModel"/>
    <NoVideo v-if="socketShowVideoType==='0'&&!showVideo" :otherLive="otherLive"/>
    <view class="flex flex-row justify-between items-center">
<!--      <navigator url="/pages/view/anchor/index" class="bg-red-500 text-white p-2" open-type="switchTab"-->
<!--                 hover-class="other-navigator-hover">返回首页-->
<!--      </navigator>-->
      <view class="flex-1 overflow-x-scroll flex flex-nowrap " @click="checkOne">
        <text v-for="(item,index) in playArr" :data-id="index"
              class="py-0.5 px-2 rounded-xl bg-white text-red-500 mx-1 whitespace-nowrap border-red-500 border"
              :class="{'selectIndex':selectIndex===index}"
        >{{ item['name'] }}
        </text>
      </view>
      <view class="flex flex-row items-center justify-center p-2 text-white">
        <image class=" w-4 h-4  object-scale-down " src="@img/52.png" alt=""/>
        <text>刷新</text>
      </view>
    </view>
    <view class="bg-gray-800 bg-opacity-30 py-2 px-4 text-xs text-white">
      <view class="grid grid-cols-2  gap-10 ">
        <image class=" w-full h-8  object-scale-down " src="@img/54.png" alt=""/>
        <image class=" w-full h-8  object-scale-down " src="@img/55.png" alt=""/>
      </view>
<!--      <view class="py-1">光直播解说不过瘾，可以点击下方主播进行观看哦～</view>-->
<!--      <view><text>本场主播：</text> <text class="py-0.5 px-1.5 bg-red-500 rounded-xl">食神唐牛</text></view>-->
    </view>
    <view class="flex-1  overflow-hidden">
      <ChatRoom
          v-if="socketShowVideoType === '1'"
          :roomType="false"
          :model="anchorRoomInfoModel"
          :socketLiveType="socketLiveType"
          :roomId="roomData['uid']"
          :otherLive="otherLive"
          @addDanMu="addDanMu"
          @changePopupType="changePopupType"/>
    </view>
    <!--弹窗-->
    <uni-popup ref="showPopup6">
      <Zhuboyuyue :anchorRoomInfoModel="anchorRoomInfoModel"/>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {getPhp, getQlInfo, get_qingliu_bulletin} from "@/api";
import RoomVideo from '@/pages/componts/video/video.nvue'
import NoVideo from '../../componts/noVideo'
import ChatRoom from '../../componts/chatRoom'
import {nextTick, reactive, ref, watch} from "vue";
import Zhuboyuyue from '../anchorLiveRoom/shouhuPopup/zhuboyuyue.vue'
import socketFunc from "@/utils/socketFunc";
let videoDom = ref()
let showVideo = ref(true)
let socketLiveType = ref(false)//直播间状态

const {liveType} = socketFunc
/*直播间 直播状态*/
watch(() => liveType.value, (e) => {
  socketLiveType.value = e
  console.log('直播间 直播状态', e)
}, {deep: true})
function addDanMu(e: any) {
  videoDom.value.addDanMu(e)
}
let showPopup6 = ref();
function changePopupType(e: string) {
  console.log(e, 48)
  switch (e) {
    case '守护位':
      break
    default :
      showPopup6.value.open('bottom')
  }
}

let roomData = reactive({})

//获取信号源集合
let playArr = reactive([]);
let anchorRoomInfoModel = reactive({})

let socketShowVideoType = ref('')

/*获取其他推荐直播间*/
let otherLive = reactive([])


//切换信号源
let selectIndex = ref(0)

function checkOne(e: any) {
  let id = e.target.dataset.id.toString();
  if (id) {
    showVideo.value = false
    selectIndex.value = e.target.dataset.id
    anchorRoomInfoModel = {...anchorRoomInfoModel, ...playArr[e.target.dataset.id]}
    nextTick(() => {
      showVideo.value = true
    })
  }
}

function init({id, qtlsId}) {
  let serve1 = getPhp({'g': 'front', 'm': 'show', 'a': 'endRecommend'});
  let serve2 = getPhp({'g': 'Wwapi', 'm': 'User', 'a': 'getLiveAnchor'});
  let serve3 = getQlInfo({id});
  let serve4 = get_qingliu_bulletin({})
  let roomObj = {};
  Promise.all([serve1, serve2, serve3, serve4]).then((res: any) => {
    if (res[0]['data']) {//获取其他热门直播间
      otherLive = res[0]['data']
    }
    if (res[1]['status'] === 200) {//获取房间号
      roomObj = res[1]['data']
    }
    if (res[2]['status'] === 0) {//获取清流房间信息
      playArr = Object.values(res[2]['data']['detail']['play_url']).map((item: any) => {
        item.pullm3u8 = item.pCode.m3u8
        return item
      }).sort((a: any, b: any) => {
        return a.lcOrd - b.lcOrd
      })
      roomObj = {...roomObj, ...playArr[0]}
    }
    if (res[3]['success'] && res[3]['data']['bulletin']) {//获取清流房间信息
      roomObj['livePost'] = res[3]['data']['bulletin']
    }
    console.log(roomObj,116)
    anchorRoomInfoModel = roomObj
    socketShowVideoType.value = '1'
  })

}


onLoad((e: any) => {
  init(e)

})


</script>

<style scoped>
.qlLiveRoom {
  background-image: url("@/static/img/53.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.selectIndex {
  border: none;
  background-color: #FF3D48;
  color: #fff;
}
</style>