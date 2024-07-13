<template>
	<div class="w-full flex items-center justify-between p-1 pr-2">
		<view class="w-full p-1">
			<text class="text-base leading-5">
				<view class="inline  float-left ">
						<view class="w-max flex flex-row items-center ">
						<view class="tips h-4\/5 inline text-xs "
							v-if="relateInfo.isTopic || relateInfo.isHot ||relateInfo.isTop === 1">
							{{ relateInfo.isTopic ? '专题' : relateInfo.isHot ? '热门' : relateInfo.isTop ? '置顶' : ''  }}
						</view>
						<image class="w-8 h-5 ml-1 overflow-hidden " src="@img/newsTitleOrigin.png"
							v-if="newsCollectInfo.userInfo.isKing"></image>							</view>
					</view>
				{{ newsCollectInfo.newInfo.title }}
			</text>
			
			<view class="relative">
				<diy-image class="w-full h-48 object-scale-down overflow-hidden rounded"
					:src="newsCollectInfo.newInfo.imageInfoList[0]['imageInfo']['imageUrl']" alt="/static/img/default.png"
					:mode="'aspectFill'">
				</diy-image>
				<view  v-if="relateInfo.status > 0">
					<image class="absolute top-0 right-0 object-scale-down overflow-hidden w-12 h-12"
						:src="`/static/img/activityState${relateInfo.status}.png`" mode="aspectFit"/>
				</view>
			</view>

			<view class="text-xs flex  items-center justify-between p-1">
				<view class="controlLeft">
					<text class="mr-2 text-red-500"> {{ newsCollectInfo.userInfo.username }}</text>
					<text class="mr-2 text-gray-400">{{ relateInfo.timeDistance }}</text>
				</view>
				<view class="controlRight">
					<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/10.png"></image>
					<text class="mr-2 text-gray-400">{{ relateInfo.pageView }}</text>
					<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/11.png"></image>
					<text class="mr-2 text-gray-400">{{ relateInfo.commentCount }}</text>
				</view>
			</view>
			<Comments :comment="newsCollectInfo.legendComment" v-if="newsCollectInfo.legendComment != null"></Comments>
			<diy-sep></diy-sep>
		</view>
	</div>
</template>

<script setup lang="ts">
	import Comments from "./diy-zixun-best-comment.vue"

	import type { HBNewsInfoHotInfoList } from "@/models/HBNewsInfo";
	const {
		model
	} = defineProps<{model:HBNewsInfoHotInfoList}>()
	const newsCollectInfo = model.newsCollectInfo
	const relateInfo = newsCollectInfo.relateInfo
</script>

<style lang="scss" scoped>
	// .left {
	//     display: flex;
	//     flex-direction: column;
	//     justify-content: space-between;

	// }

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
		font-size: 0.75rem;
		line-height: 1rem;
		border-style: solid;
		border-color: rgba(239, 68, 68);
		border-width: 1px;
		border-radius: 0.125rem;
	}
</style>
