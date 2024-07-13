<template>
  <view class="h-screen flex flex-col   bg-gray-800 bg-opacity-10 overflow-hidden">
    <diy-title class="bg-white">
      <template v-slot:left>
        <navigator class="w-14" :delta="1" open-type="navigateBack" hover-class="navigator-hover">
          <uni-icons type="left" size="24"/>
        </navigator>
      </template>
      <template v-slot:center>
        <text class="font-bold text-sm">兑换记录</text>
      </template>
      <template v-slot:right>
        <text class="w-14"></text>
      </template>
    </diy-title>
    <view class="bg-white mt-0.5 grid grid-cols-2 text-center text-sm" @click="changTabs">
      <view v-for="(item,index) in tabsList" class="px-4 py-3 whitespace-nowrap " :data-id="index+1"
            :class="{'current':selectOne===index+1}">
        <text :data-id="index+1">{{ item['label'] }}</text>
      </view>
    </view>
    <view class="bg-white mt-0.5 flex items-center justify-between text-center text-sm py-3 px-4">
      <text>选择时间</text>

      <view class="flex flex-row items-center">
        <text @click="showDate = true">{{ params.month }}</text>
        <uni-icons type="right" size="20"/>
      </view>
    </view>
    <u-picker v-model="showDate" mode="time" title="选择年月" :params="dataParams" @confirm="changeDate"></u-picker>


    <view class="grid grid-cols-4 text-center py-2" v-if="selectOne===1">
      <text v-for="item in List1" :key="item">{{ item }}</text>
    </view>
    <view class="grid grid-cols-4 text-center py-2" v-if="selectOne===2">
      <text v-for="item in List2" :key="item">{{ item }}</text>
    </view>

    <diy-scroll-more v-if="showDom" class="flex-1" @upCallback="upCallback">
      <template v-slot:default>
        <view class="grid grid-cols-4 gap-1 text-center py-2 bg-white text-xs"
              v-for="(item,index) in exchangeInfoListData" :key="index">
          <text>{{ TimeFunction.format(item.createTimestamp, 'YMD', '.') }}</text>
          <text>{{ item.exchangeDiamond }}.00</text>
          <text>{{ item.exchangeValue }}</text>
          <text :class="{'text-red-500':item.exchangeStatus===3}">{{ changeSta(item.exchangeStatus) }}</text>
        </view>
      </template>
    </diy-scroll-more>


  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {TimeFunction, nextDom} from "@/utils";
import {query_exchange_list, query_lucky_info_by_date} from "@/api";

let selectOne = ref(1)//切换tabs
const tabsList = [
  {
    label: '兑换记录',
    value: '兑换记录'
  },
  {
    label: '抽奖记录',
    value: '抽奖记录'
  },
]
let params = reactive({
  queryId: 0,
  pageSize: 10,
  month: TimeFunction.format(+new Date(), 'YM')
})
let showDate = ref(false)
let showDom = ref(true)

const List1 = ['兑换日期', '兑换金额', '兑换金豆', '状态']
const List2 = ['抽奖日期', '活动名称', '花费金豆', '结果']
const dataParams = {
  year: true,
  month: true,
}

function changeSta(val: number) {
  switch (Number(val)) {
    case 1:
      return '审核中';
    case 2:
      return '审核中';
    case 3:
      return '兑换成功';
    case 4:
      return '兑换失败';
    default:
      return '--';
  }
}

function changTabs(e: any) {
  selectOne.value = e.target.dataset.id
  params.month = TimeFunction.format(+new Date(), 'YM')
  nextDom(showDom)
}

function changeDate(e: any) {
  params.month = `${e.year}-${e.month}`
}

let exchangeInfoListData = reactive([])


async function upCallback(e: any) {
  if (selectOne.value === 1) {
    const {success, data: {exchangeInfoList}}: any = await query_exchange_list(params)
    if (success) {
      exchangeInfoListData = exchangeInfoList
    }
    e.endBySize(exchangeInfoListData.length, 1)
  }
  if (selectOne.value === 2) {
    const {
      success,
      data: {hasNextMark, luckyInfoList}
    }: any = await query_lucky_info_by_date({...params, ...{luckyDate: params.month}})
    if (success) {
      exchangeInfoListData = luckyInfoList
    }
    e.endSuccess(luckyInfoList.length, hasNextMark); //必传参数(当前页的数据个数, 是否有下一页true/false)
  }

}
</script>

<style scoped>
.current {
  position: relative;
}

.current::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 2px;
  background-color: red;
  bottom: 5px;
  left: 35%;
}
</style>