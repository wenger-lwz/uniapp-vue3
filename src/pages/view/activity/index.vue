<template>
  <div class="h-screen flex flex-col ">
    <TopView/>
    <diy-scroll-more class="flex-1" @upCallback="upCallback" :bNum="75">
      <template v-slot:default>
      <!--			<mescroll-uni :top = "(statusBarHeight+44)*ratio" :scroll-y="true" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" :down="downOption"-->
      <!--				@emptyclick="emptyClick">-->
      <diy-zixun-item v-for="(item,index) in actityList" :key="index" :model="item"/>
      <!--			</mescroll-uni>-->
      <!--			<diy-empty @reloadNet="reloadNet" :netState="netstate" v-if="showEmpty"></diy-empty>-->
      </template>
    </diy-scroll-more>
  </div>
</template>

<!--/**
@time 2023/2/17
@version 1.0.0
@author  Justinß
*/-->
<script setup lang="ts">
import {
  ref,
  reactive,
} from "vue";

import {
  get_activity_list_info
} from "@/api";


import TopView from "./top/index.vue"
import {onPageScroll, onReachBottom} from '@dcloudio/uni-app';
import useMescroll from "@/uni_modules/mescroll-uni/hooks/useMescroll.js";

const sysInfo = uni.getSystemInfoSync();
const statusBarHeight = sysInfo.statusBarHeight;
const ratio = sysInfo.pixelRatio

const actityList = ref([]),
    netState = ref(0),
    showEmpty = ref(false)

const params = reactive({
  firstFlag: 1,
  newId: 0,
  pageNo: 0,
  businessType: 2,
})

const {mescrollInit} = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

const downOption = {
  auto: false //是否在初始化后,自动执行downCallback; 默认true
}
const upOption = {
  auto: false, // 不自动加载
  noMoreSize: 4 - 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
  textNoMore: '已经全部加载完毕',
}

const upCallback = (mescroll: any) => {
  console.log("==================", 111)
  params.pageNo++
  params.firstFlag = 0
  get_activity_list_info(params).then(res => {
    let code = res.code
    // let msg = res.msg
    let data = res.data

    if (code === 'success') {
      actityList.value = actityList.value.concat(data.hotActivesInfoList)
      actityList.value.forEach(info => {
        params.newId = info.newsCollectInfo.newInfo.newId
      })
      mescroll.endSuccess(actityList.value.length, data.hasNextMark === 0 ? false : true);
    } else {
      if (params.pageNo > 0) {
        params.pageNo--
      }
      mescroll.endErr(); // 请求失败, 结束加载
    }
  }).catch((err: any) => {
    mescroll.endErr(); // 请求失败, 结束加载
  })
}

// 下拉刷新
const downCallback = (mescroll: any) => {
  console.log("加载旧数据");
  if (mescroll === true) {
    uni.showLoading({
      title: "加载中"
    })
  }
  params.pageNo = 0
  params.firstFlag = 1
  params.newId = 0
  get_activity_list_info(params).then(res => {
    let code = res.code
    let data = res.data
    console.log(res, 100)
    if (mescroll === true) {
      uni.hideLoading()
    }
    if (code === 'success') {
      actityList.value = data.hotActivesInfoList
      actityList.value.forEach(info => {
        params.newId = info.newsCollectInfo.newInfo.newId
      })
      console.log(actityList.value.length, 101)
      console.log(data.hasNextMark === 0 ? false : true, 102)
      netState.value = 0
      showEmpty.value = actityList.value.length === 0
      console.log(mescroll, 103)
      if (typeof (mescroll) === "object") {
        mescroll.endSuccess(actityList.value.length, data.hasNextMark === 0 ? false : true);
      }
    } else {
      netState.value = 2
      showEmpty.value = true
      if (typeof (mescroll) === "object") {
        mescroll.endErr(); // 请求失败, 结束加载载
      }

    }
  }).catch((err: any) => {
    console.log(err, 104)
    if (mescroll === true) {
      uni.hideLoading()
    }
    netState.value = 2
    showEmpty.value = true
    if (typeof (mescroll) === "object") {
      mescroll.endErr(); // 请求失败, 结束加载载
    }
  })
}

//点击空布局按钮的回调
const emptyClick = () => {
  downCallback(false)
}

function reloadNet() {
  netState.value = 1
  downCallback(false)
}

downCallback(true)
</script>

<style lang="scss" scoped>
</style>
