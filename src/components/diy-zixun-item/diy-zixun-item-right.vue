<template>
	<div class="flex items-center justify-between p-1">
		<view class="left w-64 h-24 flex flex-col justify-between p-1">
			<view class="overText m-1">
				<text class="tips" v-if="relateInfo.isTopic || relateInfo.isHot ||relateInfo.isTop === 1">
					{{ relateInfo.isTopic ? '专题' : relateInfo.isHot ? '热门' : relateInfo.isTop ? '置顶' : ''  }}</text>
				<image class="w-8 h-5 mx-0.5 -mb-1.5" src="@/static/img/newsTitleOrigin.png"
					v-if="newsCollectInfo.userInfo.isKing"></image>
				<text class="text-base text-gray-800 pl-1">
					{{ newsCollectInfo.newInfo.title }}
				</text>
			</view>

			<view class="text-xs">
				<text class="text-red-500 mr-2"> {{ newsCollectInfo.userInfo.username }}</text>
				<text class="mr-2 text-gray-400">{{ relateInfo.timeDistance }}</text>
				<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/10.png"></image>
				<text class="mr-2 text-gray-400">{{ relateInfo.pageView }}</text>
				<image class="w-4 h-4 mr-0.5 -mb-1" src="@img/11.png"></image>
				<text class="mr-2 text-gray-400">{{ relateInfo.commentCount }}</text>
			</view>
		</view>
		<view class="relative">
			<diy-image class="w-28 h-20 rounded object-scale-down overflow-hidden"
				:src="newsCollectInfo.newInfo.imageInfoList[0]['imageInfo']['imageUrl']" alt="/static/img/default.png"
				:mode="'aspectFill'">
			</diy-image>
			<view  v-if="relateInfo.status > 0">
				<image class="absolute top-0 right-0 object-scale-down overflow-hidden w-12 h-12"
					:src="`/static/img/activityState${relateInfo.status}.png`" mode="aspectFit"/>
			</view>
		</view>
	</div>
	<Comments :comment="newsCollectInfo.legendComment" v-if="newsCollectInfo.legendComment != null "></Comments>
	<diy-sep></diy-sep>
</template>

<!--/**
@time 2023/2/16
@version 1.0.0
@author  Justin
资讯列表item  showType===1
*/-->

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
	.left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.overText {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
