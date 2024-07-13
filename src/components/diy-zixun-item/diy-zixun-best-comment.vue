<template>
	<view class="wb_hide_2 m-2 p-1 bg-gray-100 leading-5">
		<image class="w-10 h-4 mr-0.5 -mb-1" src="@/static/img/newsBestComment.png"></image>
		<text class="p-1 text-sm text-gray-700">{{comment.userName+": "}} </text>
		<text class="text-sm text-gray-700">{{comment.comment}}</text>
	</view>
</template>

<script setup>
	const {
		comment
	} = defineProps(['comment'])
</script>

<style>
	.wb_hide_2 {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		-webkit-box-align: center;
	}
</style>
