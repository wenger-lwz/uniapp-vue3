<template>
  <view class="anchorLiveRoom h-screen flex flex-col ">
    <diy-top/>
    <template v-if="showPlay">
      <Up :model="anchorRoomInfoModel" :roomId="roomId"
          @changePopupType="changePopupType"
          @openDrawer="getAnchorList"/>
      <iframe v-if="showZhiShu"
              :src="`${config.baseUrl9}/indicator?roomId=${roomId}`"
              class="h-48"
              width="100%"
              style="background-color: #fff"
              border="0"></iframe>

      <!-- #ifdef H5 -->
      <RoomVideo ref="videoDom" v-if="showVideo" :model="anchorRoomInfoModel"/>
      <!-- #endif -->

      <!-- #ifdef APP-PLUS -->
            <diy-video  class="flex-1" v-if="showVideo" :roomId="roomId" :src="anchorRoomInfoModel.pullm3u8"/>
      <!-- <diy-video  :roomId="roomId" class="flex-1" v-if="showVideo" src="https://hls-test.gucuixiang.com/live/4968_3/playlist.m3u8?sign=39cc022a6fd33a095b7fc2d0848e2476&t=646c7aa4"/>-->
      <!-- #endif -->
      <NoVideo v-else :otherLive="otherLive"/>
      <ChangeTabs @changeChatType="changeChatType"/>
      <view class="flex-1 overflow-hidden ">
        <ChatRoom v-show=!showChatType :model="anchorRoomInfoModel"
                  :roomType="true"
                  :socketLiveType="socketLiveType"
                  :roomId="roomId"
                  :otherLive="otherLive"
                  @changePopupType="changePopupType"/>
        <ChangeTabsContent v-show="showChatType" :anchorRoomInfoModel="anchorRoomInfoModel"
                           :showChatType="showChatType"/>

      </view>
      <diy-svga v-if="showSvga" class="absolute top-0 left-0 z-10" :model="svgaSet" @finished="showSvga=false"/>
    </template>
    <!--热门主播列表    -->
    <uni-drawer ref="showRight" mode="right" :width="320" >
      <view class="h-full ">
        <diy-top/>
        <scroll-view class="h-full  " scroll-y="true">
          <PopularAnchor v-if=lists.length :lists="lists"/>
        </scroll-view>
      </view>
    </uni-drawer>
    <!--守护列表-->
    <uni-popup ref="showPopup">
      <Shouhupopup @openPopup2="showPopup2.open()" :model="shouHuData"/>
    </uni-popup>
    <!--规则说明-->
    <uni-popup ref="showPopup2">
      <Shuoming :model="shouHuData"/>
    </uni-popup>
    <!--粉丝团-->
    <uni-popup ref="showPopup3">
      <Fensituan :anchorRoomInfoModel="anchorRoomInfoModel"/>
    </uni-popup>
    <!--贡献榜-->
    <uni-popup ref="showPopup4">
      <Gongxianbang :anchorRoomInfoModel="anchorRoomInfoModel"/>
    </uni-popup>
    <!--主播预约-->
    <uni-popup ref="showPopup5">
      <Zhuboyuyue :anchorRoomInfoModel="anchorRoomInfoModel"/>
    </uni-popup>
    <!--赛况情报-->
    <uni-popup ref="showPopup6">
      <Zhuboyuyue :anchorRoomInfoModel="anchorRoomInfoModel"/>
    </uni-popup>
  </view>
</template>

<!--/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
import {getCurrentInstance, onMounted, ref, reactive, toRefs, watch} from 'vue'
import {get_anchor_room_info, getPhp} from "@/api";
import ChatRoom from '../../componts/chatRoom'
import RoomVideo from '@/pages/componts/video/video.nvue'
import Up from './up'
import Shouhupopup from './shouhuPopup'
import Shuoming from './shouhuPopup/shuoming.vue'
import PopularAnchor from '../../componts/popularAnchor'
import Fensituan from './shouhuPopup/fensituan.vue'
import Gongxianbang from './shouhuPopup/gongxianbang.vue'
import Zhuboyuyue from './shouhuPopup/zhuboyuyue.vue'
import NoVideo from '../../componts/noVideo'
import ChangeTabs from './changeTabs'
import session from "@/stores";
import ChangeTabsContent from './changeTabs/content.vue'
import socketFunc from "@/utils/socketFunc";
import config from '@/config'
import DiySvga from "@/components/diy-svga/diy-svga.vue";
import {onLoad, onShow} from "@dcloudio/uni-app";
import {nextDom} from '@/utils'

const {liveType, ovenSvgaList} = socketFunc
const {userInfo} = toRefs(session())

let showPlay = ref(false)//显示页面结构
let showVideo = ref(false)//显示video
let anchorRoomInfoModel = reactive({})//直播间房间消息
let showZhiShu = ref(false)//显示指数
let socketLiveType = ref(false)//直播间状态
let shouHuData = reactive({})//守护数据
let roomId = 0;//房间号
let showRight = ref()//Drawer抽屉dom
let lists = reactive([])//热门主播列表
let otherLive = reactive([])//其他热门直播间数据
let showChatType = ref(0)/*切换chatType*/
let showPopup = ref()//Popup守护列表dom
let showPopup2 = ref()//Popup守护详情dom
let showPopup3 = ref();//PopupDom
let showPopup4 = ref();//PopupDom
let showPopup5 = ref();//PopupDom
let showPopup6 = ref();//PopupDom
let videoDom = ref()//videoDom
let showSvga = ref(false)//显示svga
let svgaSet = reactive({
  loops:1,
  src:''
})

/*直播间 直播状态*/
watch(() => liveType.value, (e) => {
  socketLiveType.value = e
  console.log('直播间 直播状态', e)
}, {deep: true})

/*直播间 svga穿云箭礼物*/
watch(() => ovenSvgaList, (e) => {
  console.log('svga穿云箭礼物', e,showSvga.value)
  playSvga()
}, {deep: true})

/*播放svga动画*/
function playSvga() {
  if(ovenSvgaList.length&&!showSvga.value){
    svgaSet.src=ovenSvgaList[0]['ct']['svga_file']||'https://mp-99973cd6-4799-4f4d-8f02-14c480d8a6a2.cdn.bspapp.com/cloudstorage/c22d05d6-54c9-4d88-85b2-5bb00668167f.svga'
   nextDom( showSvga)
  }
}

async function init(roomId: number) {
  let result1 = getPhp({'g': 'front', 'm': 'show', 'a': 'endRecommend'});/*获取其他推荐直播间*/
  let result2 = get_anchor_room_info({roomId})//获取直播间信息
  const [res1, res2]: any = await Promise.all([result1, result2])
  if (res1['data']) {
    otherLive = res1['data']
  }
  if (res2['success']) {
    anchorRoomInfoModel = res2['data']['anchorRoomInfo']
    showVideo.value = !!res2['data']['anchorRoomInfo']['pullm3u8']
  }
  showPlay.value = true
}

/*获取守护数据*/
async function getShouHu() {
  const {data}: any = await getPhp({'g': 'front', 'm': 'Spend', 'a': 'guard_gift', 'roomId': 2})
  if (data.code === 200) {
    shouHuData = data
  }
}

getShouHu()

/*获取热门主播列表*/
async function getAnchorList() {
  const res: any = await getPhp({'g': 'Front', 'm': 'anchor', 'a': 'indexApi'})
  if (res && res['lists']) {
    lists = res['lists']
    showRight.value.open()
  }
}

/*更改聊天栏tab*/
function changeChatType(e: number) {
  showChatType.value = e
}

/*更改popup*/
function changePopupType(e: string, v: any) {
  switch (e) {
    case '守护位':
      showPopup.value.open('bottom')
      break
    case '指数':
      showZhiShu.value = !showZhiShu.value
      break
    case '粉丝团':
      showPopup3.value.open('bottom')
      break
    case '贡献榜':
      showPopup4.value.open('bottom')
      break
    case '主播预约':
      showPopup5.value.open('bottom')
      break
    case '赛况情报':
      showPopup6.value.open('bottom')
      break
    case '金豆抽奖':
      showPopup6.value.open('bottom')
      break
    case '金豆竞猜':
      showPopup6.value.open('bottom')
      break
    case '本场推单':
      showPopup6.value.open('bottom')
      break
    case '玩':
      showPopup6.value.open('bottom')
      break
    case '免费时长':
      showVideo.value = false
      break
    case '添加弹幕':
      //  #ifdef H5
      videoDom.value.addDanMu(v)
      //  #endif
      break

  }
}

onShow(() => {
  const {attrs}: any = getCurrentInstance()
  roomId = attrs.uid || attrs['__pageInstance']['options']['uid']
  init(attrs.uid || attrs['__pageInstance']['options']['uid'])
})
</script>


<style scoped lang="scss">
.anchorLiveRoom {
  background-image: url("@/static/img/18.png");
  background-repeat: no-repeat;
  background-size: cover;
}


</style>
