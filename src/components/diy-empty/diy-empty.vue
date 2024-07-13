<template>
	<view class="bg-white h-full text-base text-gray-400 grid place-items-center" @click="taped">
		<view class="grid place-items-center gap-5">
			<image  mode="aspectFit" src="../../static/img/netFailed.png"></image>
			<text  v-if="model.netState===0">暂无内容</text>
			<text v-if="model.netState===1">加载中，请稍后...</text>
			<div  v-if="model.netState===2">
				<text >网络不给力，请</text>
				<text class="text-red-400">点击重试</text>
				<text >哦~~</text>
			</div>
		</view>
	</view>
</template>

<script setup lang="ts">
	
	const model = defineProps({
		emptyText: String, // 空文本
		netState: Number, // 当前 请求状态
		icon: String, // 图标
	})
	
	const Emit =defineEmits(['reloadNet'])
	function taped() {
			console.log(model,222)
		console.log(model.netState,333)
		if (model.netState === 1){
			return
		}
	  Emit('reloadNet')
	}
	
	
</script>

<style>

</style>
