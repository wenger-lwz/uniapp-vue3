<template>
  <view class="stream-item">
    <view class="left">
      <view class="time-match-status">
        <text class="time">{{ formatTime(stream.mstartTime) }}</text>
        <text class="match">{{ stream.eventName }}</text>
        <text class="status" v-if="stream.pastStatus">{{ stream.pastTime }}</text>
      </view>
      <view class="team-info">
        <view class="team">
          <diy-image  class="w-5 h-5  rounded-full object-scale-down overflow-hidden" :src="stream.homeLogo" alt="/static/img/default.png"></diy-image>
          <text class="team-name">{{ stream.homeName }}</text>
          <text class="team-score">{{ stream.home_score }}</text>
        </view>
        <view class="team">
          <diy-image  class="w-5 h-5  rounded-full object-scale-down overflow-hidden" :src="stream.awayLogo" alt="/static/img/default.png"></diy-image>
          <text class="team-name">{{ stream.awayName }}</text>
          <text class="team-score">{{ stream.away_score }}</text>
        </view>
      </view>
    </view>
    <navigator :url="`/pages/view/qlLiveRoom/index?id=${stream.id}&qtlsId=${stream.qtlsId}`" class="right" v-if="stream.pastStatus === 1" >
      <image class="live-icon" src="/static/img/live.gif"></image>
      <text class="live-name">直播中</text>
    </navigator>
    <view class="right" v-else>
      <image class="not-live-icon" src="/static/img/video.png"></image>
      <text class="not-live-name">暂未开始</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { StreamDataItemOfDataType } from "@/models"
import {TimeFunction} from "@/utils";
const { stream } = defineProps<{stream: StreamDataItemOfDataType}>()
const formatTime = (t:number): string => {
  return TimeFunction.format(+String(t).padEnd(13, '0'),'HM',':')
}
</script>
<style lang="scss">
.stream-item {
  @include wh(100%, 144rpx);
  @include fs;
  padding: 12rpx 0;
  padding-left: 24rpx;
  border-bottom: 2rpx solid #eee;
  .left {
    @include wh(calc(100% - 174rpx), 100%);
    @include fs;
    .time-match-status {
      @include wh(150rpx, 100%);
      font-size: 24rpx;
      line-height: 50rpx;
      color: #999;
      .time,
      .match,
      .status {
        display: block;
        @include wh(100%, 40rpx);
        @include omit(1);
      }
      .time {
        color: #333;
      }
      .status {
        color: #fc4948;
      }
    }
    .team-info {
      @include wh(426rpx, 100%);
      border-right: 2rpx solid #EEE;
      .team {
        @include wh(100%, 50%);
        @include fs;
        .team-icon {
          display: block;
          @include rwh(40, 40);
        }
        .team-name {
          display: block;
          @include rwh(266, 50);
          margin: 0 10rpx;
          font-size: 24rpx;
          color: #333;
          line-height: 50rpx;
          @include omit(1);
        }
        .team-score {
          display: block;
          @include rwh(100, 50);
          text-align: center;
          line-height: 50rpx;
          color: #fc4948;
        }
      }
    }
  }
  .right {
    @include wh(150rpx, 100%);
    @include fc;
    font-size: 24rpx;
    color: #fc4948;
    .live-icon {
      @include rwh(20, 20);
      margin-right: 10rpx;
    }
    .not-live-icon {
      @include rwh(24, 20);
      margin-right: 10rpx;
    }
    .not-live-name {
      color: #999;
    }
  }
}
</style>