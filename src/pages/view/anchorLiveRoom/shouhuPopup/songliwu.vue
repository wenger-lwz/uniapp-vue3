<template>
  <view class=" rounded-tl-2xl  w-full  rounded-tr-2xl relative   text-xs">
    <view class="p-2 pb-2 bg-black h-full w-full">
      <view class="grid  gap-1 text-sm text-center" :class="`grid-cols-${tabList.length}`" @click="select">
        <text v-for="(item,index) in tabList" :key="index"
              :data-index="index"
              class="relative   pb-3 text-gray-400"
              :class="{'selectIndex':selectIndex===index}"
        >{{ item }}
        </text>
      </view>

      <swiper class="swiper h-48">
        <template v-if="selectIndex===0">
          <swiper-item v-for="item in gitNum" :key="item">
            <div class="grid grid-cols-5 gap-1 text-white">
              <template v-for="ite in 10" :key="'ite_'+ite">
                <template v-if="giftInfoData[(item-1)*10+(ite-1)]">
                  <view class="grid place-items-center  pt-2" @click="selcetGif((item-1)*10+(ite-1))"
                  >
                    <view class="border border-transparent rounded relative"
                          :class="{'border-red-500':selectItem===(item-1)*10+(ite-1)}">
                      <diy-image class="w-12 h-12 rounded inline-block object-scale-down overflow-hidden"
                                 :data-id="(item-1)*10+(ite-1)"
                                 :src="giftInfoData[(item-1)*10+(ite-1)]['gifticon']"
                                 alt="/static/img/default.png"/>
                      <text v-if="selectNum&&selectItem===(item-1)*10+(ite-1)"
                            class="bg-red-500 text-white absolute -top-2 -left-2  px-1 rounded-full">
                        {{ selectNum }}
                      </text>
                    </view>
                    <view class="whitespace-nowrap">{{ giftInfoData[(item - 1) * 10 + (ite - 1)]['giftname'] }}</view>
                    <view class="flex items-center justify-center">
                      <image class="w-4 h-4 mr-0.5 object-scale-down " src="@img/50.png" alt=""/>
                      <text>{{ giftInfoData[(item - 1) * 10 + (ite - 1)]['needcoin'] }}</text>
                    </view>
                  </view>
                </template>
              </template>
            </div>
          </swiper-item>
        </template>
        <template v-if="selectIndex===1">
          <swiper-item v-for="item in fensigitNum" :key="item">
            <div class="grid grid-cols-5 gap-1 text-white">
              <template v-for="ite in 10" :key="'ite_'+ite">
                <template v-if="fensigiftInfoData[(item-1)*10+(ite-1)]">
                  <view class="grid place-items-center relative pt-2" @click="selcetGif((item-1)*10+(ite-1))">
                    <view class="border border-transparent rounded relative"
                          :class="{'border-red-500':selectItem===(item-1)*10+(ite-1)}">
                      <diy-image class="w-12 h-12  inline-block object-scale-down overflow-hidden"
                                 :data-id="(item-1)*10+(ite-1)"
                                 :src="fensigiftInfoData[(item-1)*10+(ite-1)]['gifticon']"
                                 alt="/static/img/default.png"/>
                      <text v-if="selectNum&&selectItem===(item-1)*10+(ite-1)"
                            class="bg-red-500 text-white absolute -top-2 -left-2  px-1 rounded-full">
                        {{ selectNum }}
                      </text>
                    </view>
                    <view>{{ fensigiftInfoData[(item - 1) * 10 + (ite - 1)]['giftname'] }}</view>
                    <view class="flex items-center justify-center">
                      <image class="w-4 h-4 mr-0.5 object-scale-down " src="@img/50.png" alt=""/>
                      <text>{{ fensigiftInfoData[(item - 1) * 10 + (ite - 1)]['needcoin'] }}</text>
                    </view>
                    <text class="bg-red-500 text-white absolute top-0 right-0  px-1 rounded-xl">
                      {{ fensigiftInfoData[(item - 1) * 10 + (ite - 1)]['fans_grade_desc'] }}
                    </text>
                  </view>
                </template>
              </template>
            </div>
          </swiper-item>
        </template>
      </swiper>

      <view v-if="inputNumFlag" class="flex flex-row justify-between items-center text-white ">
        <input class="px-5" type="number" maxlength="5" v-model.trim="selectNum" placeholder="输入礼物数量～～">
        <text class="bg-gray-300 py-0.5  px-3 ml-1 rounded-2xl" :class="{'bg-red-500':String(selectItem)}"
              @click="inputNumFlag=false">确定
        </text>
      </view>

      <view v-else class="flex flex-row justify-between items-center text-white ">
        <view class="flex flex-row items-center">
          <image class="w-4 h-4 mr-0.5 object-scale-down " src="@img/50.png" alt=""/>
          <text>{{ diamondTotalData > 9999 ? (Math.ceil(diamondTotalData / 1000) / 10) + '万' : diamondTotalData }}
          </text>
          <text class="bg-red-500 py-0.5  px-3 ml-1 rounded-xl" @click="selectNum=1;selectItem=''">清除</text>
          <text class="bg-red-500 py-0.5  px-3 ml-1 rounded-xl" @click="toExchangeGem">兑换</text>
        </view>
        <view class="flex flex-row border border-transparent  rounded-xl"
              :class="{'border-red-500':String(selectItem)}">
          <view class="relative w-20 pl-2" v-if="sen_numData.length>1&&String(selectItem)">
            <diy-collapse class="absolute bottom-0">
              <template v-slot:title>
                <view class="px-1 text-center">{{ selectNum }}</view>
              </template>
              <template v-slot:content>
                <view v-for="(item,index) in sen_numData" :key="item"
                      @click="changeSelectNum(index)"
                      class="text-center bg-black text-red-500 py-0.5 flex flex-row items-center justify-center">
                  <image v-if="!index" class="w-4 h-4 mr-0.5 object-scale-down " src="@img/51.png" alt=""/>
                  <text :class="{'text-white':!index}"> {{ item }}</text>
                </view>
              </template>
            </diy-collapse>
          </view>
          <text class="bg-gray-300 py-0.5  px-3 ml-1 rounded-xl" :class="{'bg-red-500':String(selectItem)}"
                @click="sendGif"
          >发送
          </text>
        </view>
      </view>


    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {apiPublic} from "@/api";
import {checkedLogin} from "@/utils";

const {
  giftInfoData,
  fensigiftInfoData,
  diamondTotalData,
  sen_numData, roomId, userInfo,model
} = defineProps(['giftInfoData', 'fensigiftInfoData', 'diamondTotalData', 'sen_numData', 'roomId', 'userInfo','model'])
let gitNum = Math.ceil(giftInfoData.length / 10);
let fensigitNum = Math.ceil(fensigiftInfoData.length / 10);
const tabList = ['礼物', '粉丝团'];//, '卡包'
let selectIndex = ref(0)//切换tab项
let selectItem: any = ref('')//选择的礼物项集合
let selectNum: any = ref(+sen_numData.at(-1))//选择的礼物项数量
let inputNumFlag = ref(false)//输入礼物数量开关
const emit=defineEmits(['opensongliwu'])
function select(e: any) {
  let id = e.target.dataset.index + ''
  if (id) {
    if (selectIndex.value !== e.target.dataset.index) {
      selectItem.value = ''
      selectNum.value = +sen_numData.at(-1)
    }
    selectIndex.value = e.target.dataset.index
  }
}

function selcetGif(element: unknown) {
  selectItem.value = selectItem.value === element ? '' : element
}

function changeSelectNum(index: number) {
  if (index) {
    selectNum.value = sen_numData[index]
  } else {
    inputNumFlag.value = true
  }
}

async function sendMsg() {
 const res= await apiPublic({
    service:'Live.sendGift',
    uid: userInfo.id,
    token: userInfo.token,
    liveuid: roomId,
    stream: `${roomId}_2`,
    giftid: giftInfoData[selectItem.value]['id'],
    giftcount: selectNum.value,
  })
  emit('opensongliwu',false)
}

/*跳转金豆兑换*/
function toExchangeGem() {
  checkedLogin().then((res) => {
    if(res){
      uni.navigateTo({url: `/pages/view/exchangeGem/index?uid=${userInfo.id}`})
    }
  })
}

/*赠送礼物*/
function sendGif() {
  if (String(selectItem.value) === '') {
    uni.showToast({
      title: '未选择礼物',
      icon: 'none'
    });
    return;
  }
  // 主播身份
  if (+roomId === userInfo.id) {
    uni.showToast({
      title: '主播不能送自己礼物',
      icon: 'none'
    });
    return;
  }
  let num = selectIndex.value ?
      +fensigiftInfoData[selectItem.value]['needcoin'] * selectNum.value :
      +giftInfoData[selectItem.value]['needcoin'] * selectNum.value;
  if (num > diamondTotalData) { //扣费提示
    uni.showModal({
      title: "扣费提示",
      content: '余额不足，是否前往兑换金豆？',
      confirmText: '确认',
      cancelText: '取消',
      success: ({confirm}) => {
        if (confirm) {
          toExchangeGem()
        }
      }
    })
    return;
  }

  if(selectIndex.value&&!model.attentionMark){// 判断粉丝团礼物且不是粉丝
    uni.showToast({
      title: '您还不是该主播粉丝',
      icon: 'none'
    });
    return;
  }
  if(giftInfoData[selectItem.value]['type']==='3'){//穿云箭礼物
    uni.showModal({
      title: "提示",
      content: `一支穿云箭，千军万马来相见！
      此礼物将在本直播间集结全站全员抢红包！
      (本直播间主播不能收到此礼物金豆)`,
      confirmText: '同意',
      cancelText: '再考虑',
      success: (res) => {
        sendMsg()
      }
    })
    return;
  }
  sendMsg()
  console.log(num, diamondTotalData, 176)
}

</script>

<style scoped>
.selectIndex {
  color: red;
}

.selectIndex::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
  border-radius: 15px;
  width: 25%;
  background-color: red;
}

.selectItem {
  border: 1px solid red;
  border-radius: 5px;
  overflow: hidden;
}

</style>