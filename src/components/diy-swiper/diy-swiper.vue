<template>
	<swiper class="swiper-box m-2 mx-4 h-32" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
		:interval="interval" :duration="duration">
		<slot>
			<template v-if="swiperList&&swiperList.length">
				<swiper-item class="rounded overflow-hidden bg-red-100"  @click="clickAction(item)" v-for="(item,index) in swiperList" :key="index">
					<diy-image class="w-full h-full object-cover p-0 rounded overflow-hidden"
						:src="item.bannerInfo.logo" alt="/static/img/default.png" :mode="'aspectFill'"></diy-image>
				</swiper-item>
			</template>
		</slot>
	</swiper>
</template>

<!--/**
@time 2023/2/16
@version 1.0.0
@author  Justin
轮播图
*/-->

<script setup lang="ts">
	import {
		ref
	} from 'vue'

	const {
		swiperList,
		classList
	} = defineProps(['swiperList', 'classList'])
	const emits = defineEmits(['clcikImg'])
	let indicatorDots = ref(true)
	let autoplay = ref(true)
	let interval = ref(3000)
	let duration = ref(1000)

	const clickAction = (data: any): void => { // 切换标签
		// let item = data.target.dataset.item
		// console.log(item,101)
		emits("clcikImg", data)
	}
</script>

<style scoped>
	/deep/.uni-swiper-dot {
		background-color: #707070;
	}

	/deep/.uni-swiper-dot-active {
		background-color: #fff;
	}

	.swiper-box {
		border-radius: 0.25rem;
		overflow: hidden;
		/* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */
		transform: translateY(0);
	}
</style>
