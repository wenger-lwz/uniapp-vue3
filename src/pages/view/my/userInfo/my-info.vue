<template>
	<view class="mine-top">
		<diy-image :src="initInfo.avatar" class="w-10 h-10  rounded-full object-scale-down overflow-hidden" alt="/static/img/default.png"/>
		<view class="infos">
			<view class="name-level-tag">
				<text class="name">{{ initInfo.user_nicename }}</text>
				<view class="level" :class="`lv${initInfo.level}`">LV{{ initInfo.level }}</view>
				<image class="hb-level" mode="heightFix" :src="`/static/img/hblv/lv${tagLevel}.png`"></image>
			</view>
			<view class="coin-fishball">
				<image class="coin-icon" mode="heightFix" src="/static/img/50.png"></image>
				<text class="coin">金豆:{{ initInfo.coin > 9999 ? (Math.floor(initInfo.coin / 1000) / 10) + '万' : initInfo.coin}}</text>
				<image class="fishball-icon" mode="heightFix" src="/static/img/fishball.png"></image>
				<text class="fishball">黑豆:{{ initInfo.redDiamond||0 > 9999 ? (Math.floor(initInfo.redDiamond / 1000) / 10) + '万' : initInfo.redDiamond }}</text>
			</view>
		</view>
		<view class="more">
			<image class="more-icon" mode="aspectFit" src="/static/img/more-right.png"></image>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InitUserInfoType } from "@/models"
const { initInfo } = defineProps<{initInfo: InitUserInfoType}>()
const tagLevel = computed(() => {
	return Math.floor(Number(initInfo.vipLevelId||0) / 2) + 1
})
</script>

<style lang="scss">
.mine-top {
	@include wh(100%, 170rpx);
	margin: 20rpx 0 40rpx 0;
	@include fs;
	.infos {
		flex: 1;
		height: 120rpx;
		@include fc;
		margin: 0 20rpx;
		flex-direction: column;
		.name-level-tag {
			@include wh(100%, 60rpx);
			@include fs;
			justify-content: flex-start;
			font-size: 32rpx;
			color: #333;
			line-height: 60rpx;
			.level {
				@include wh(auto, 28rpx);
				border-radius: 14rpx;
				font-size: 18rpx;
				color: #FFF;
				line-height: 28rpx;
				padding: 0 14rpx;
				margin: 0 14rpx;
				@each $c in $colorList { // $c 为值
          $i:index($colorList,$c); // $i 为下标
          &.lv#{$i} {
            background: #{$c};
          }
        }
			}
			.hb-level {
				height: 28rpx;
			}
		}
		.coin-fishball {
			@include wh(100%, 60rpx);
			@include fs;
			justify-content: flex-start;
			font-size: 24rpx;
			color: #999;
			line-height: 60rpx;
			.coin-icon,
			.fishball-icon {
				height: 32rpx;
				margin-right: 10rpx;
			}
			.fishball-icon {
				margin-left: 20rpx;
			}
		}
	}
	.more {
		@include wh(60rpx, 100%);
		@include fc;
		.more-icon {
			@include rwh(60, 60);
		}
	}
}
</style>