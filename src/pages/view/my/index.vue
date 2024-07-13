<template>
  <view class="mine">
		<view class="top">
			<view class="to-msg"  v-if="showDom" @click="toMail">
        <view class="bubble-num text-xs rounded-full px-1" v-if="userNoticeCountData.totalCount">{{ userNoticeCountData.totalCount }}</view>
      </view>
			<view class="to-set" @click="toSetPage"></view>
		</view>
		<my-info :initInfo="userInfo" v-if="userInfo" />
		<view class="not-login" v-else>
			<image class="not-login-icon" mode="aspectFill" src="/static/img/default.png"></image>
			<view class="not-login-info">
				<view class="not-login-text">登录领福利 关注主播 开播做万人迷</view>
				<view class="not-login-function">
					<navigator class="to-login" url="/pages/view/login/index">登录</navigator>
					<navigator class="to-register" url="/pages/view/login/index">注册</navigator>
				</view>
			</view>
		</view>
		<view class="to-withdraw" @click="comeSoon">
			<image class="withdraw-icon" mode="widthFix" src="/static/img/withdraw.png"></image>
		</view>
		<view class="mine-box   text-xs">
			<view class="vip-mission">
				<view class="vip-box">
					<image class="vip-icon" mode="heightFix" src="/static/img/vip.png"></image>
					<view class="box-info">
						<text class="fist-line">VIP俱乐部</text>
						<text class="second-line">开通尊享特权</text>
					</view>
				</view>
				<view class="mission-box">
					<image class="mission-icon" mode="heightFix" src="/static/img/mission.png"></image>
					<view class="box-info">
						<text class="fist-line">任务中心</text>
						<text class="second-line">做任务领金豆&黑豆</text>
					</view>
				</view>
			</view>
		</view>
		<view class="options   text-xs">
			<view class="option-item" v-for="item in optionList" :key="item.id">
        <diy-image  class="w-6 h-6  rounded-full object-scale-down overflow-hidden" :src="item.icon" alt="/static/img/default.png"/>
				<text class="option-name">{{ item.name }}</text>
			</view>
		</view>
		<view class="functions  text-xs">
			<text class="title  text-sm">功能中心</text>
			<view class="option-item" v-for="item in functionList" :key="item.id">
        <diy-image  class="w-6 h-6  rounded-full object-scale-down overflow-hidden" :src="item.icon" alt="/static/img/default.png" />
				<text class="option-name">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<!--/**
@time 2023/2/17
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
import {reactive, toRefs,ref} from "vue"
import MyInfo from "./userInfo/my-info.vue"
import session from "@/stores"
import {checkedLogin,nextDom} from "@/utils";
import {get_notice_count} from "@/api";
import {onShow} from "@dcloudio/uni-app";
const {userInfo} = toRefs(session())
const optionList = reactive([
	{id: "account", name: "我的账户", icon: "/static/img/mine/my_account.png", todo: ""},
	{id: "medals", name: "我的勋章", icon: "/static/img/mine/my_medal.png", todo: ""},
	{id: "fans&focus", name: "粉丝/关注", icon: "/static/img/mine/my_fansconcerns.png", todo: ""},
	{id: "myPlan", name: "我的推单", icon: "/static/img/mine/my_pushorder.png", todo: ""},
	{id: "recomend", name: "我的推荐", icon: "/static/img/mine/my_recommend.png", todo: ""},
	{id: "icons", name: "我的图标", icon: "/static/img/mine/myicon.png", todo: ""},
])
const functionList = reactive([
	{id: "account", name: "卡包", icon: "/static/img/mine/aicon@3x.png", todo: ""},
	{id: "medals", name: "竞猜大厅", icon: "/static/img/mine/my__guess.png", todo: ""},
	{id: "fans&focus", name: "黑豆乐园", icon: "/static/img/mine/my__fisheggparadise.png", todo: ""},
	{id: "myPlan", name: "我的奖品", icon: "/static/img/mine/gift.png", todo: ""},
	{id: "recomend", name: "黑白号认证", icon: "/static/img/mine/1.png", todo: ""},
	{id: "icons", name: "主播认证", icon: "/static/img/mine/8.png", todo: ""},
])
let userNoticeCountData=reactive({totalCount:0})
let showDom=ref(true)
async function init() {
  const {data:{userNoticeCount}}:any= await get_notice_count()
  userNoticeCountData=userNoticeCount
  nextDom(showDom)
}

onShow(()=>{
  init()
})

function toSetPage() {
  uni.navigateTo({url: '/pages/view/setPage/index'})
}
function toMail() {
  checkedLogin().then((res) => {
    if(res){
      uni.navigateTo({url: `/pages/view/mailCenter/index`})
    }
  })
}
const comeSoon = () => {
	// uni.showToast({
	// 	icon: "none",
	// 	title: "即将上线"
	// })
  checkedLogin().then((res) => {
    if(res){
      uni.navigateTo({url: `/pages/view/exchangeGem/index?uid=${userInfo.value.id}`})
    }
  })
}
</script>

<style lang="scss">
.mine {
	@include wh(100%, 100%);
	background: #f5f5f5;
	padding: 24rpx;
	padding-top: var(--status-bar-height);
	.top {
		@include wh(100%, 80rpx);
		@include fs;
		.to-msg {
      position: relative;
      @include rwh(40, 40);
      background: url("~@/static/img/email.png") no-repeat center/contain;
      .bubble-num {
        position: absolute;
        right: -10rpx;
        top: -8rpx;
        background: #fec300;
        color: #FFF;
      }
    }
		.to-set {
			@include rwh(40, 40);
			background: url("~@/static/img/set.png") no-repeat center/contain;
		}
	}
	.not-login {
		@include wh(100%, 170rpx);
		margin: 20rpx 0 40rpx 0;
		@include fs;
		.not-login-icon {
			@include rwh(170, 170);
			border-radius: 50%;
		}
		.not-login-info {
			flex: 1;
			height: 120rpx;
			@include fc;
			margin: 0 20rpx;
			flex-direction: column;
			.not-login-text {
				display: block;
				@include wh(100%, 60rpx);
				//font-size: 30rpx;
				color: #333;
				line-height: 60rpx;
				@include omit(1);
			}
			.not-login-function {
				@include wh(100%, 60rpx);
				@include fs;
				justify-content: flex-start;
				.to-login, .to-register {
					display: block;
					@include wh(auto, 38rpx);
					border-radius: 19rpx;
					padding: 0 20rpx;
					border: 2rpx solid #fc4948;
					//font-size: 18rpx;
					color: #FFF;
					background: #fc4948;
					line-height: 34rpx;
				}
				.to-register {
					background: transparent;
					color: #fc4948;
					margin-left: 20rpx;
				}
			}
		}
	}
	.to-withdraw {
		@include wh(100%, auto);
		background: #FFF;
		padding: 24rpx;
		border-radius: 8rpx;
		.withdraw-icon {
			display: block;
			width: 100%;
		}
	}
	.mine-box {
		@include wh(100%, auto);
		background: #FFF;
		padding: 24rpx;
		border-radius: 8rpx;
		margin-top: 20rpx;
		.vip-mission {
			@include wh(100%, 76rpx);
			@include fs;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #EEE;
			.vip-box, .mission-box {
				@include wh(50%, 100%);
				@include fs;
				.vip-icon, .mission-icon {
					height: 50rpx;
				}
				.box-info {
					flex: 1;
					height: 100%;
					//font-size: 18rpx;
					line-height: 32rpx;
					margin-left: 20rpx;
					.fist-line, .second-line {
						display: block;
						@include wh(100%, 50%);
						color: #333;
					}
					.second-line {
						color: #999;
					}
				}
			}
		}
	}
	.options, .functions {
		@include wh(100%, auto);
		@include fs;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		background: #FFF;
		border-radius: 0 0 8rpx 8rpx;
		.option-item {
			@include wh(25%, 96);
			@include fs;
			flex-direction: column;
			margin-bottom: 20rpx;
			.option-name {
				//font-size: 24rpx;
				color: #333;
				line-height: 40rpx;
			}
		}
	}
	.functions {
		margin-top: 20rpx;
		border-radius: 8rpx;
		.title {
			display: block;
			@include wh(100%, 80rpx);
			//font-size: 32rpx;
			color: #333;
			line-height: 80rpx;
			padding-left: 20rpx;
		}
	}
}
</style>