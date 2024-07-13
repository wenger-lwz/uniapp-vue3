<template>
  <view class="schedule-item">
    <view class="is-hot" v-if="event.eventInfo.eventLevel">
      <image class="hot-icon" mode="aspectFit" src="/static/img/hot-w.png"></image>
      <text class="hot-text">热门</text>
    </view>
    <view class="schedule-top">
      <view class="team">
        <text class="team-name left">{{ event.eventInfo.homeTeam }}</text>
        <diy-image  class="w-5 h-5  rounded-full object-scale-down overflow-hidden" :src="event.eventInfo.homeTeamLogoUrl" alt="/static/img/default.png"></diy-image>
      </view>
      <view class="against">
        <text class="match">{{ event.eventInfo.eventName }}</text>
        <text class="time">{{ formatTime(event.eventInfo.startTime) }}</text>
      </view>
      <view class="team">
        <diy-image  class="w-5 h-5  rounded-full object-scale-down overflow-hidden" :src="event.eventInfo.awayTeamLogoUrl" alt="/static/img/default.png"></diy-image>
        <text class="team-name">{{ event.eventInfo.awayTeam }}</text>
      </view>
    </view>
    <view class="schedule-bottom">
      <view class="anchors">
        <image class="icon" mode="aspectFit" src="https://pwa.hbzb555.com/static/img/1.75b69d6.png"></image>
        <text class="title">主播：</text>
        <template v-for="item in event.anchorReserveList" :key="item.uid">
          <navigator v-if="item.isLive === 1" class="anchor with-live" :url="`/pages/view/anchorLiveRoom/index?uid=${item.uid}`">{{ item.username }}</navigator>
          <view class="anchor" @click="showWithoutLive(1)" v-else>{{ item.username }}</view>
        </template>
      </view>
      <view class="not-live" v-if="liveNotyet" @click="showWithoutLive(2)">未开始</view>
      <navigator class="to-live" :url="`/pages/view/anchorLiveRoom/index?uid=${event.anchorReserveList[0].uid}`" v-else>
        <image class="to-live-icon" src="/static/img/1.gif"></image>
        <text class="to-live-text">观看</text>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
const { event } = defineProps(['event'])
const formatTime = (t:number): string => {
  return dayjs(t).format("HH:mm")
}
const liveNotyet = computed(() => { // 直播未开始
  // reserveMark 2为进行中，0未订阅、1已订阅(未开始)
  return event.eventInfo.reserveMark != 2
})
const showWithoutLive = (type:number) => {
  uni.showToast({title: type === 1 ? "主播未开播！" : "比赛未开始！", icon: "none"})
}
</script>
<style lang="scss">
.schedule-item {
  position: relative;
  @include wh(calc(100% - 48rpx), auto);
  margin: 0 auto;
  margin-top: 24rpx;
  background: #FFF;
  border-radius: 8rpx;
  .is-hot {
    position: absolute;
    left: 0;
    top: 0;
    @include wh(auto, 36rpx);
    border-radius: 8rpx 0 8rpx 0;
    font-size: 18rpx;
    color: #FFF;
    line-height: 36rpx;
    background: #ff4a4a;
    padding: 0 10rpx;
    @include fs;
    .hot-icon {
      @include rwh(24, 24);
      margin-right: 6rpx;
    }
  }
  .schedule-top {
    @include wh(100%, 120rpx);
    @include fs;
    padding: 24rpx 16rpx;
    .team {
      @include rwh(270, 58);
      @include fs;
      .team-icon {
        display: block;
        @include rwh(58, 58);
      }
      .team-name {
        @include rwh(200, 58);
        font-size: 28rpx;
        color: #333;
        line-height: 58rpx;
        @include omit(1);
        margin-left: 12rpx;
        &.left {
          margin-left: 0;
          margin-right: 12rpx;
          text-align: right;
        }
      }
    }
    .against {
      @include rwh(152, 78);
      margin: 0 5rpx;
      @include fs;
      flex-direction: column;
      .match {
        @include wh(100%, 28rpx);
        font-size: 18rpx;
        line-height: 28rpx;
        text-align: center;
        @include omit(1);
        color: #999
      }
      .time {
        @include wh(100%, 50rpx);
        font-size: 32rpx;
        line-height: 50rpx;
        text-align: center;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .schedule-bottom {
    @include wh(100%, auto);
    border-top: 2rpx solid #EEE;
    padding: 24rpx;
    padding-bottom: 14rpx;
    @include fs;
    .anchors {
      flex: 1;
      height: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-right: 20rpx;
      .icon {
        @include rwh(24, 24);
        vertical-align: middle;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
      .title {
        font-size: 18rpx;
        color: #999;
        line-height: 32rpx;
        margin-bottom: 10rpx;
      }
      .anchor {
        @include wh(auto, 32rpx);
        border-radius: 16rpx;
        border: 2rpx solid #AAA;
        color: #AAA;
        font-size: 18rpx;
        line-height: 28rpx;
        padding: 0 8rpx;
        margin-left: 16rpx;
        margin-bottom: 10rpx;
        &.with-live {
          border-color: #333;
          color: #333;
        }
      }
    }
    .not-live {
      @include wh(auto, 32rpx);
      border: 2rpx solid #999;
      border-radius: 16rpx;
      color: #999;
      line-height: 32rpx;
      font-size: 18rpx;
      padding: 0 16rpx;
      margin-top: -5rpx;
    }
    .to-live {
      @include wh(auto, 32rpx);
      border-radius: 16rpx;
      background: #ff4a4a;
      color: #FFF;
      line-height: 32rpx;
      font-size: 18rpx;
      padding: 0 16rpx;
      @include fc;
      margin-top: -5rpx;
      .to-live-icon {
        @include rwh(24, 24);
        margin-right: 8rpx;
      }
    }
  }
}
</style>