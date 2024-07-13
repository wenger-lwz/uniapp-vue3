<template>
	<div class="w-full  p-1 pr-2">
		<view class="w-full p-1">
			<!-- overText -->

			<text class="text-base leading-5">
				<view class="inline  float-left ">						<view class="w-max flex flex-row items-center ">
						<view class="tips h-4\/5 inline text-xs "
							v-if="relateInfo.isTopic || relateInfo.isHot ||relateInfo.isTop === 1">
							{{ relateInfo.isTopic ? '专题' : relateInfo.isHot ? '热门' : relateInfo.isTop ? '置顶' : ''  }}
						</view>
						<image class="w-8 h-5 ml-1 overflow-hidden " src="@img/newsTitleOrigin.png"
							v-if="newsCollectInfo.userInfo.isKing"></image>							</view>
					</view>
				{{ newsCollectInfo.newInfo.title }}
			</text>

			<view class="grid grid-cols-3  gap-x-1">
				<view class="h-20 relative" v-for="(item,index) in newsCollectInfo.newInfo.imageInfoList.slice(0,3)">
					<diy-image class="w-full h-full rounded object-scale-down overflow-hidden"
						:src="item['imageInfo']['imageUrl']" alt="/static/img/default.png" :mode="'aspectFill'" />
					<view class="text-xs" v-if="index === 2 && newsCollectInfo.newInfo.imageInfoList.length > 3">
						<image class="absolute bottom-0 right-0 object-scale-down overflow-hidden w-5 h-4"
							src="@img/newsCountBg.png" />
						<text class="absolute text-white right-0 bottom-0 w-5 h-3 text-center">{{
						     newsCollectInfo.newInfo.imageInfoList.length
						   }}
						</text>
					</view>
					<view v-if="index === newsCollectInfo.newInfo.imageInfoList.slice(0,3).length-1 && relateInfo.status > 0">
						<image class="absolute top-0 right-0 object-scale-down overflow-hidden w-12 h-12"
							:src="`/static/img/activityState${relateInfo.status}.png`" mode="aspectFit"/>
					</view>
				</view>
			</view>

			<view class="text-xs flex  items-center justify-between p-1">
				<view class="controlLeft">
					<text class="text-red-500 mr-2"> {{ newsCollectInfo.userInfo.username }}</text>
					<text class="mr-2 text-gray-400">{{ relateInfo.timeDistance }}</text>
				</view>
				<view class="controlRight">
					<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/10.png"></image>
					<text class="mr-2 text-gray-400">{{ relateInfo.pageView }}</text>
					<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/11.png"></image>
					<text class="mr-2 text-gray-400">{{ relateInfo.commentCount }}</text>
				</view>

			</view>
			<Comments :comment="newsCollectInfo.legendComment" v-if="newsCollectInfo.legendComment != null "></Comments>
			<diy-sep></diy-sep>
		</view>
	</div>
</template>

<script setup lang="ts">
	import Comments from "./diy-zixun-best-comment.vue"

	import type {
		HBNewsInfoHotInfoList
	} from "@/models/HBNewsInfo";
	const {
		model
	} = defineProps < {
		model: HBNewsInfoHotInfoList
	} > ()
	const newsCollectInfo = model.newsCollectInfo
	const relateInfo = newsCollectInfo.relateInfo
</script>

<style lang="scss" scoped>
	.overText {
		@include text-ellipsis-two();
	}

	.controlRight {
		right: 15rpx;
		display: flex;
		flex-direction: row;
	}

	.controlLeft {
		left: 15rpx;
		display: flex;
		flex-direction: row;
	}

	.control {
		display: flex;
		flex-direction: row;
	}

	.tips {
		color: rgba(239, 68, 68);
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		// font-size: 0.75rem;
		// line-height: 1.25rem;
		border-style: solid;
		border-color: rgba(239, 68, 68);
		border-width: 1px;
		border-radius: 0.125rem;
		box-sizing: border-box;
	}
</style>
