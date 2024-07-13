<template>
	<view class="home">
    <Top/>
		<view class="tabs">
			<scroll-view ref="tabBar1" class="tab-bar" :scroll-x="true" :show-scrollbar="true"
				:scroll-into-view="scrollInto">
				<view class="uni-tabs" @click="ontabtap">
					<view class="uni-tab-item" v-for="(tab,index) in actityTitles">
						<text class="px-4  text-center whitespace-nowrap text-gray-500" :data-id="index"
							:class="{activeOne: tabIndex === index}"> {{tab}}
						</text>
						<diy-sep
							style="background-color: rgba(239, 68, 68);margin-left: 1.25rem;margin-right: 1.25rem;;height: 2rpx;"
							v-if="tabIndex === index"></diy-sep>
					</view>
				</view>
			</scroll-view>
			<swiper class="tab-box" ref="swiper1" :current="tabIndex" :duration="300" @change="onswiperchange"
				@transition="onswiperscroll" @animationfinish="animationfinish" @onAnimationEnd="animationfinish">
				<swiper-item class="swiper-item" v-for="(page, index) in actityTitles" :key="index">
					<!-- <template v-if="index===tabIndex"> -->
					<homeTabPage :ref="setRef" :subClass="page" :subIndex="tabIndex" :swiperIndex="index"
						:currentSwiper="tabIndex" />
					<!-- </template> -->
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		watch
	} from 'vue'
	import HomeTabPage from './news/index.vue'
  import Top from './top'
	import {
		get_news_title_info
	} from "@/api";


	const tabIndex = ref(0),
		scrollInto = ref(''),
		tabBar1 = ref()
	let actityTitles = ref([''])

	const ontabtap = (tab: any): void => { // 切换标签
		console.log(tab, 1)
		let id = tab.target.dataset.id + ''
		if (id) {
			tabIndex.value = +id
			scrollInto.value = actityTitles[+id]
		}
	}
	const onswiperchange = (swiper: any): void => { // 内容区域切换
		tabIndex.value = swiper.detail.current
		scrollInto.value = actityTitles[swiper.detail.current]
	}
	const onswiperscroll = (swiper: any): void => { // 内容滚动中
		// console.log(swiper)
	}
	const animationfinish = (swiper: any): void => { // 内容滚动结束
		// console.log(swiper)
	}
	watch(tabIndex, (nv, od) => {
		// console.log(nv, od, tabBar1.value, '999888')
	})

	async function getTitles() {
		try{
			const {
				data,
				code
			}: any = await get_news_title_info({})
			if (code === 'success') {
				actityTitles.value = data.subclassInfoList
			} else {
				setTimeout(() => {
					// 业务逻辑	
					console.log("loadTotle",10000)
					getTitles()
				}, 2000)
			}
		}
		catch{
			setTimeout(() => {
				// 业务逻辑	
				console.log("loadTotle",10000)
				getTitles()
			}, 2000)
		}
	}

	// 获取指定下标的mescroll对象
	const mescrollItems: [any] = []
	const setRef = (e: any) => {
		e && mescrollItems.push(e)
	}
	const getMescroll = (i: any) => {
		if (mescrollItems) {
			let item = mescrollItems[i]
			if (item) return item.getMescroll()
		}
		return null
	}

	function init() {
		getTitles()
	}
	init()
</script>

<style lang="scss">
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */
	.home {
		@include wh(100%, 100%);
		display: flex;
		flex-direction: column;

		.tabs {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.tab-bar {
				width: 750rpx;

				/* #ifdef APP-PLUS */
				&::-webkit-scrollbar {
					display: none;
					width: 0 !important;
					height: 0 !important;
					-webkit-appearance: none;
					background: transparent;
				}

				/* #endif */
				// height: 55rpx;

				.uni-tabs {
					position: relative;
					@include wh(auto, 100%);
					@include fs;

					.activeOne {
						font-size: 40rpx;
						font-weight: 600;
						color: #333333;
					}
				}
			}

			.tab-box {
				flex: 1;

				.tab-page {
					@include wh(100%, 100%);
					//padding-top: 22rpx;

					.for-h5 {
						@include wh(100%, 100%);
					}
				}
			}
		}
	}
</style>
