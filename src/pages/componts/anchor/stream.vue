<template>
  <view class="stream   relative  h-full flex flex-col">
    <view class="stream-type-box ">
      <view class="stream-type">
        <view class="type-item" :id="item.url" :class="{current: params.class1 === item.id}" @click="changeType(item)"
              v-for="item in typeList" :key="item.id">
          <text class="type-name">{{ item.name }}</text>
          <text class="type-count" v-if="item.num">{{ item.num }}</text>
        </view>
      </view>
      <!--      </scroll-view>-->
      <view class="show-more" @click="showTypeList = !showTypeList">
        <image class="show-more-icon" :class="{show: showTypeList}" src="/static/img/more.png"></image>
      </view>
      <view class="stream-type-list" :class="{show: showTypeList}" v-if="showTypeList">
        <view class="type-item" :class="{current: params.class1 === item.id}" @click="changeType(item)"
              v-for="item in typeList" :key="item.id">
          <text class="type-name">{{ item.name }}</text>
          <text class="type-count" v-if="item.num">{{ item.num }}</text>
        </view>
      </view>
    </view>
    <uni-datetime-picker ref="datePicker" class="absolute -left-full" type="date"  :clear-icon="false" @change="changeDate" />


    <diy-scroll-more  v-if="showModel" class="flex-1" @upCallback="upCallback">
      <template v-slot:default>
        <template v-if="streamList.length">
          <template v-for="item in streamList" :key="item.info.time">
            <template v-if="item.data.length">
              <view class="text-center py-3 text-sm" @click="datePicker.show()">{{ item.info.fName }}</view>
              <StreamItem class="bg-white" v-for="stream in item.data" :stream="stream" :key="stream.id"/>
            </template>
          </template>
        </template>
      </template>
    </diy-scroll-more>




  </view>
</template>

<script setup lang="ts">
import {ref, reactive, watch, toRefs} from 'vue'
import {getQLList} from '@/api'
import type { StreamCateItemType, StreamDataItemType, StreamDataItemOfDataType} from "@/models"
import StreamItem from './stream-item.vue'
import {nextDom} from "@/utils";
import session from "@/stores";

const {userInfo}:any = toRefs(session())
let showModel = ref(true)
const datePicker=ref()//时间选择器dom

const typeListOrigin = [
  {description: "", id: 0, keywords: "", name: "全部", num: 0, sub_list: [], title: "", url: "all"},
  {description: "", id: -1, keywords: "", name: "热门", num: 0, sub_list: [], title: "", url: "hot"}
]
const typeList = reactive<StreamCateItemType[]>([]), streamList = reactive<StreamDataItemType[]>([])
const  showTypeList = ref<boolean>(false)
const params = reactive({
  sub_class: 0,
  class1: 0,
  page: 0,
  size: 10,
  date: "",
  user_id: userInfo.value?userInfo.value.id:0
})

// 上拉加载的回调: 其中num:当前页 从1开始, size:每页数据条数,默认10
const upCallback =async (mescroll:any)=>{
  params.page++
  let currentNum=0;
  const {cate_list, hot_num, cate_total_num, list, total}: any = await getQLList(params)
  typeList.splice(0, typeList.length)
  typeListOrigin.forEach((a: StreamCateItemType, i: number) => {
    a.num = !i  ? cate_total_num : Number(hot_num)
    typeList.push(a)
  })
  cate_list.forEach((a: StreamCateItemType) => {
    typeList.push(a)
  })
  if (streamList.length === 0) {
    list.forEach((a: StreamDataItemType) => {
      if (a.data.length) {
        currentNum+=a.data.length
      }
      streamList.push(a)
    })
  } else {
    list.forEach((a: StreamDataItemType, i: number) => {
      if (a.data.length) {
        currentNum+=a.data.length
        a.data.forEach((d:StreamDataItemOfDataType) => {
          //@ts-ignore
          streamList[i].data.push(d)
        })
      }
    })
  }
  mescroll.endBySize(currentNum, total); //必传参数(当前页的数据个数, 总数据量)
}


const changeType = (item: StreamCateItemType) => {
  params.class1 = item.id
  showTypeList.value = false
  streamList.length = 0
  params.page = 0
  params.date=''
  nextDom(showModel)
}


function changeDate(e:any) {
  params.date=e
  streamList.length = 0
  params.page = 0
  nextDom(showModel)
}

</script>
<style lang="scss">
.stream {
  .stream-type-box {
    position: sticky;
    top: 0;
    @include wh(100%, 80rpx);
    background: #FFF;
    border-top: 2rpx solid #EEE;
    @include fs;
    z-index: 1;

    .stream-type {
      white-space: nowrap;
      overflow-x: scroll;

      .type-item {
        position: relative;
        display: inline-block;
        @include wh(auto, 100%);
        padding: 0 24rpx;
        font-size: 28rpx;
        color: #999;
        line-height: 80rpx;
        margin-right: 15rpx;
        font-display: swap;

        &.current {
          color: #fc4948;

          &::before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            @include rwh(40, 4);
            margin-left: -20rpx;
            background: #fc4948;
            border-radius: 2rpx;
          }

          .type-count {
            background: #fc4948;
          }
        }

        .type-count {
          display: inline-block;
          @include rwh(54, 54);
          border-radius: 4rpx;
          background: #999;
          color: #FFF;
          margin-left: 10rpx;
          vertical-align: baseline;
          text-align: center;
          line-height: 54rpx;
        }
      }
    }

    .show-more {
      max-width: 100px;
      @include fc;

      .show-more-icon {
        display: block;
        width: 30px;
        height: 30px;
        transition-duration: .3s;

        &.show {
          transform: rotate(-180deg);
        }
      }
    }

    .stream-type-list {
      position: absolute;
      left: 0;
      top: 80rpx;
      @include wh(100%, auto);
      padding: 24rpx;
      display: flex;
      flex-wrap: wrap;
      background: #FFF;
      opacity: 0;
      transition-duration: 2s;

      &.show {
        opacity: 1;
      }

      .type-item {
        @include wh(auto, 60rpx);
        border: 2rpx solid #999;
        border-radius: 8rpx;
        padding: 0 24rpx;
        font-size: 28rpx;
        color: #999;
        line-height: 56rpx;
        margin-right: 15rpx;
        margin-bottom: 24rpx;
        font-display: swap;

        &.current {
          color: #fc4948;
          border-color: #fc4948;
        }

        .type-count {
          margin-left: 10rpx;
        }
      }
    }
  }

  .stream-list {
    @include wh(100%, 100%);
    background: #FFF;

    .stream-date {
      @include wh(100%, 80rpx);
      background: #EEE;
      font-size: 28rpx;
      color: #333;
      text-align: center;
      line-height: 80rpx;
    }
  }
}
</style>