<template>
	<view @click="clickAction">
		<DiyZixunItemR v-if="model.newsCollectInfo.newInfo.showType===1" :model="model"/>
		<DiyZixunItemB v-if="model.newsCollectInfo.newInfo.showType===3" :model="model"/>
		<DiyZixunItemM v-if="model.newsCollectInfo.newInfo.showType===2 || model.newsCollectInfo.newInfo.showType===4" :model="model"/>
	</view>
</template>

<!--/**
@time 2023/2/16
@version 1.0.0
@author  Justin
资讯列表item
*/-->

<script setup lang="ts">
	import DiyZixunItemR from './diy-zixun-item-right.vue'
	import DiyZixunItemB from './diy-zixun-item-bottom.vue'
	import DiyZixunItemM from './diy-zixun-item-many.vue'
	
	import type {HBNewsInfoHotInfoList } from "@/models/HBNewsInfo";
	import {dealEvent } from "@/models/EventInfo";
	const {
		model
	} = defineProps<{model:HBNewsInfoHotInfoList}>()
	 
	const clickAction = (): void => { // 切换标签
		// const info = model.newsCollectInfo
		dealEvent(model.newsCollectInfo.eventInfo)
		// console.log(model,100)
	}
	
</script>

<style lang="scss" scoped>

</style>
