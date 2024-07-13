<template>
  <view class="anchor h-screen flex flex-col">
    <diy-top/>
    <view class="anchor-top">
      <view class="to-msg" @click="toMail">
        <view class="bubble-num" v-if="userNoticeCountData.totalCount">{{ userNoticeCountData.totalCount }}</view>
      </view>
      <view class="anchor-tab">
        <view class="tab-item" v-for="(item, i) in tabList" :key="item.id" :id="item.id"
              :class="{current: current === i}" @click="current = i">{{ item.name }}
        </view>
      </view>
      <navigator class="to-service" url="/pages/view/login/index">
        <image class="service-icon" mode="aspectFill" src="/static/img/littleHelper.png"></image>
        <text class="service-name">小助手</text>
      </navigator>
    </view>
    <view class="flex-1 bg-blur-500   overflow-hidden">
    <anchor v-if="current===1"/>
    <schedule v-else-if="current===2"/>
    <stream v-else-if="current===3"/>
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
import anchor from "@/pages/componts/anchor/anchor.vue"
import schedule from '@/pages/componts/anchor/schedule.vue'
import stream from '@/pages/componts/anchor/stream.vue'
import {get_notice_count} from "@/api";
import {checkedLogin} from "@/utils";
import {onShow} from "@dcloudio/uni-app";
import session from "@/stores";

const current = ref<number>(1);
const tabList = ref([
  {index: 0, name: "影院", id: "movie"},
  {index: 1, name: "主播", id: "anchor"},
  {index: 2, name: "赛程", id: "schedule"},
  {index: 3, name: "清流", id: "stream"}
])
const {userInfo} = toRefs(session())
let userNoticeCountData=reactive({totalCount:0})
function toMail() {
  checkedLogin().then((res) => {
    if(res){
      uni.navigateTo({url: `/pages/view/mailCenter/index`})
    }
  })
}
async function init() {
  if(!userInfo.value){
    return
  }
  const {data:{userNoticeCount}}:any= await get_notice_count()
  userNoticeCountData=userNoticeCount
}

onShow(()=>{
  init()
})
</script>
<style lang="scss">
.anchor {
  background: #f5f5f5;

  .anchor-top {
    @include wh(100%, 80rpx);
    background: #FFF;
    @include fs;
    padding: 0 24rpx;

    .to-msg {
      position: relative;
      @include rwh(40, 40);
      background: url("~@/static/img/email.png") no-repeat center/contain;

      .bubble-num {
        position: absolute;
        right: -8rpx;
        top: -8rpx;
        @include wh(auto, 24rpx);
        min-width: 24rpx;
        border-radius: 12rpx;
        background: #fec300;
        color: #FFF;
        font-size: 18rpx;
        line-height: 24rpx;
        padding: 0 6rpx;
      }
    }

    .anchor-tab {
      flex: 1;
      height: 100%;
      margin: 0 24rpx;
      @include fc;

      .tab-item {
        display: inline-block;
        @include wh(25%, 100%);
        font-size: 32rpx;
        color: #999;
        text-align: center;
        line-height: 80rpx;
        transition-duration: .3s;

        &.current {
          color: #333;
          font-weight: bold;
        }
      }
    }

    .to-service {
      @include wh(auto, 40rpx);
      border-radius: 20rpx;
      padding: 0 16rpx;
      background: #fc4948;
      @include fc;

      .service-icon {
        display: block;
        @include rwh(24, 24);
        margin-right: 8rpx;
      }

      .service-name {
        font-size: 24rpx;
        color: #FFF;
      }
    }
  }

  .home-swiper {
    @include wh(100%, calc(100% - 80rpx));

    .home-swiper-item, .page-box {
      @include wh(100%, 100%);
    }
  }
}
</style>