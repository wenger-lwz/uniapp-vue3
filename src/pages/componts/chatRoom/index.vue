<template>
  <view class="relative h-full ">
    <!--轮播广告位-->
    <view class="absolute bottom-40 w-36 h-32 -right-2 text-xs" @click="showInputFlag=false;showEmotionFlag=false">
      <diy-swiper :swiperList="swiperList">
        <template v-slot:default>
          <swiper-item class="p-1 flex flex-col " v-for="(item,index) in swiperList" :key="index">
            <diy-image class="w-full flex-1 object-cover rounded-xl overflow-hidden"
                       :src="item.bannerInfo.logo"
                       alt="/static/img/default.png"
            />
            <view class="bg-red-500 text-white truncate p-0.5 rounded">{{ item.eventInfo.buttonName }}</view>
          </swiper-item>
        </template>

      </diy-swiper>
    </view>

    <view class="chatRoom text-xs p-2  pb-32 pr-32 h-full  text-xs" >
      <!--聊天消息体-->
    <Message v-if="!isFull" @click="showInputFlag=false;showEmotionFlag=false" :roomId="roomId" />

      <!--底部输入框      -->
      <view class="fixed w-full  left-0  bottom-0 btnFixed">
        <view class="text-white px-2" v-for="(item,index) in welcomeInfo" :key="index">
          <text>欢迎</text>
          <text class="mx-0.5" :class="`username_level_${item['ct']['level']}`">{{
              item['ct']['unameAfterReplace']
            }}
          </text>
          <text>光临本直播间，祝您玩的开心！</text>
        </view>
        <template v-if="showInputFlag">
          <view class="flex items-center h-10 w-full bt-btn">
            <image @click="showEmotionFlag=true" class="w-5 h-5 object-scale-down    mx-3 " src="@img/41.png" alt=""/>
            <input ref="sendInput" :adjust-position="false" type="text"
                   class="uni-input flex-1 px-2 text-white h-full"
                   @keyboardheightchange="keyboardchange"
                   @focus="showEmotionFlag=false"
                   @blur="changeBlur"
                   placeholder="弹幕走一波～～"
                   v-model="addMessageValue">
            <text class="px-3 text-center  text-white h-full leading-10 bg-gray-800 "
                  :class="{'bg-red-400':addMessageValue.length}"
                  @click="sendMsg">发送
            </text>
          </view>

          <view v-if="showEmotionFlag" class="grid grid-cols-11  gap-2 w-full p-2 bg-white" @click="selectEmotion">
            <view :data-id="index" class="grid place-items-center" v-for="(item,index) in emotion" :key="index">
              <image :data-id="index" class="w-4 h-4 object-scale-down"
                     :src="getImg(`face/${index}.gif`)" alt=""/>
            </view>
          </view>

        </template>
        <template v-if="!showInputFlag">
          <view class="flex flex-row justify-between px-2">
            <view v-if="!socketLiveType"
                  class="bg-white rounded-2xl py-1 px-3 flex flex-row items-center">
              <image class="w-5 h-5 object-scale-down    mr-1 " src="@img/34.png" alt=""/>
              <text>主播已下播，</text>
              <text class="text-red-400">请移步圈子～</text>
            </view>
            <view v-if="!showInputFlag&&socketLiveType"
                  class="bg-gray-800 opacity-70 text-white rounded-2xl py-1 px-3 flex flex-row items-center">
              <image @click="showInputFlag = true;showEmotionFlag=true" class="w-5 h-5 object-scale-down    mr-2 "
                     src="@img/41.png" alt=""/>
              <text @click="showInputFlag = true">和主播聊聊天吧～</text>
            </view>
            <view class="flex flex-row items-center" v-if="roomType">
              <image class="w-8 h-8 object-scale-down mr-1 " @click="changePopupType('赛况情报')" src="@img/35.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down mr-1 " @click="opensongliwu(true)" src="@img/36.png" alt=""/>
            </view>
            <view class="pb-1 flex flex-row " v-else>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('金豆抽奖')" src="@img/37.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('金豆竞猜')" src="@img/38.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('本场推单')" src="@img/39.png"
                     alt=""/>
            </view>
          </view>
          <view class="flex flex-row justify-between p-2 items-center" v-if="roomType">
            <view class="px-3 flex flex-row ">
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('金豆抽奖')" src="@img/37.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('金豆竞猜')" src="@img/38.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('本场推单')" src="@img/39.png"
                     alt=""/>
              <image class="w-8 h-8 object-scale-down  mr-2 " @click="changePopupType('玩')" src="@img/40.png" alt=""/>
            </view>
            <view class="flex flex-row items-center w-32 " v-if="otherLive">
              <view class="relative w-full  right-2">
                <diy-collapse class="absolute bottom-0">
                  <template v-slot:title>
                    <view class="flex items-center truncate  overflow-hidden">
                      <diy-image class="w-8 h-8 mr-1 rounded-full object-scale-down overflow-hidden"
                                 :src="model.avatar"
                                 alt="/static/img/default.png"
                      />
                      <text class="text truncate">{{ model.anchorUserName }}</text>
                    </view>
                  </template>
                  <template v-slot:content>
                    <navigator :url="`/pages/view/anchorLiveRoom/index?uid=${item.uid}`" open-type="redirect"
                               hover-class="other-navigator-hover"
                               v-for="(item,index) in otherLive" :key="index" class="flex flex-row items-center "
                    >
                      <diy-image class="w-8 h-8 m-1 mb-0 rounded-full object-scale-down overflow-hidden"
                                 :src="item.avatar"
                                 alt="/static/img/default.png"
                      />
                      <text class=" truncate">{{ item.user_nicename }}</text>
                    </navigator>
                  </template>
                </diy-collapse>
              </view>
            </view>
          </view>
        </template>
        <diy-bottom></diy-bottom>
      </view>
    </view>
    <ChatNotice v-if="model['livePost']&&showChatNotice"
                @close="showChatNotice=false" :livePost="model['livePost']"
                class="absolute top-0 left-0 bg-black text-white m-2 text-xs p-2 rounded"/>
    <!--赛况情报-->
    <uni-popup ref="showPopup1">
      <Songliwu v-if="giftInfoData.length" :giftInfoData="giftInfoData" :sen_numData="sen_numData"
                @opensongliwu="opensongliwu"
                :roomId="roomId" :userInfo="userInfo" :model="model" :fensigiftInfoData="fensigiftInfoData"
                :diamondTotalData="diamondTotalData"/>
    </uni-popup>
  </view>
</template>

<!--/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
import {reactive, onBeforeUnmount, ref, watch, nextTick, toRefs, onMounted,} from 'vue'
import socketFunc from '@/utils/socketFunc'
import {checkedLogin, getImg, judgePlatform} from "@/utils";
import {apiPublic, get_banner_image_list} from "@/api";
import emotion from '@/static/js/emotion'
import ChatNotice from '../chatNotice/index.vue'
import Songliwu from "@/pages/view/anchorLiveRoom/shouhuPopup/songliwu.vue";
import session from "@/stores";
import {onShow} from "@dcloudio/uni-app";
import Message from "@/pages/componts/chatRoom/message.vue";
import {isFull} from '@/config'
const {userInfo, freeDuration, upData} = toRefs(session())
const {socketInit, closeSocket, sendSocketMsg, welcomeInfo} = socketFunc
const {
  model,
  socketLiveType,
  otherLive,
  roomId,
  roomType
} = defineProps(['model', 'socketLiveType', 'otherLive', 'roomId', 'roomType'])
const emit = defineEmits(['changePopupType'])


let showChatNotice = ref(model['livePost'])//房间公告
let osHeight = ref(judgePlatform().bottom)//app底部安全距离高度
let addMessageValue = ref('')//新增消息体
let showInputFlag = ref(false)//显示输入框开关
let showEmotionFlag = ref(false)//显示表情礼物栏开关
let keyboardheight = ref('0px');//兼容iOS底部安全距离差异 输入框位置高度
let swiperList = reactive([])//轮播广告位数据
let blurNum = ref(0)//输入框光标位置
let showPopup1 = ref()//弹出层结构1
let giftInfoData = reactive([]);//GIF礼物数据
let fensigiftInfoData = reactive([]);//粉丝团礼物数据
let diamondTotalData = ref(0)//账户金币余额
let sen_numData = reactive([])//礼物数量其他数额
let freeDurationTime = 0;//免费观看时长定时器

if (!userInfo.value) {
  if (!freeDuration.value) {
    freeDuration.value = 0
  }
  freeDurationTime = setInterval(() => {
    freeDuration.value++
    if (freeDuration.value >= 30) {
      checkedLogin()
      clearTime()
    }
    upData.value('freeDuration', freeDuration.value)
  }, 1000)
}



/*兼容iOS底部安全距离差异 输入框位置高度*/
function keyboardchange(e: any) {
  keyboardheight.value = e.detail.height ? (e.detail.height - osHeight.value) + 'px' : 0 + 'px'
}

/*输入框失焦*/
function inputBlur() {
  showInputFlag.value = false
}



/*发送socket消息*/
function sendMsg() {
  checkedLogin().then(() => {
    sendSocketMsg(addMessageValue.value)
    emit('changePopupType', '添加弹幕', addMessageValue.value)
    addMessageValue.value = ''
    inputBlur()
  })
}


/*获取轮播广告*/
async function getBanner() {
  const {data, code}: any = await get_banner_image_list({wheelPlayType: 20})
  if (code === 'success') {
    swiperList = data.wheelPlayImages
  }
}

getBanner()


/*更改光标位置*/
function changeBlur(e: any) {
  blurNum.value = e.detail.cursor
}

/*选择礼物*/
function selectEmotion(e: any) {
  let id = e.target.dataset.id.toString();
  if (id) {
    let reg = `(.{${blurNum.value}})`;
    let numReg = new RegExp(reg);
    addMessageValue.value = addMessageValue.value.replace(numReg, `$1${emotion[+id]['text']}`)
    blurNum.value = blurNum.value + emotion[+id]['text'].length
  }
}

/*更改Popup*/
function changePopupType(name: string) {
  emit('changePopupType', name)
}

/*送礼物popup开关*/
function opensongliwu(e: boolean) {
  if (e) {
    showPopup1.value.open('bottom')
  } else {
    showPopup1.value.close()
  }
}


/*获取礼物*/
async function getLiWu() {
  const {data: {fansgiftlist, giftlist, coin = 0, sen_num = []}}: any = await apiPublic({
    'service': 'Live.getGiftList',
    'anchor_id': roomId,
    'uid': userInfo.value.id
  })
  giftInfoData = giftlist
  fensigiftInfoData = fansgiftlist
  //@ts-ignore
  diamondTotalData = coin ? +coin : 0
  sen_num.unshift('其他数额')
  sen_numData = sen_num
}

getLiWu()

function initSocket(){
  closeSocket()
  socketInit(model)
}



/*清除定时器*/
function clearTime() {
  if (freeDurationTime) {
    clearInterval(freeDurationTime)
    freeDurationTime = 0
    emit('changePopupType', '免费时长')
  }
}

// onShow(() => {
//   initSocket()
// })

onMounted(()=>{
  initSocket()
})

onBeforeUnmount(() => {
  closeSocket()
  clearTime()
})
</script>

<style scoped>
.btnFixed {
  bottom: v-bind(keyboardheight)
}

.bt-btn {
  background-color: #1B1329;
}

/deep/ .uni-swiper-dots-horizontal {
  bottom: 40rpx
}



</style>
