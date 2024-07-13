<template>
	<div class="tab-page flex flex-col h-screen" >
		<mescroll-uni v-if="!showEmpty" :scroll-y="true" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" :down="downOption" @emptyclick="emptyClick">
			<template v-if="swiperList.length > 0 && newsList.length>0">
				<diy-swiper @clcikImg="swiperClick" :swiperList="swiperList"></diy-swiper>
			</template>
			<diy-zixun-item v-for="(item,index) in newsList" :key="index" :model="item" />
		</mescroll-uni>
		<diy-empty class="flex-1" @reloadNet="reloadNet" :netState = "netState" v-if="showEmpty"></diy-empty>
	</div>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		watch
	} from "vue";


	import {
		get_banner_image_list,
		get_news_list_info
	} from "@/api";

	import useMescroll from "@/uni_modules/mescroll-uni/hooks/useMescroll.js";
	import {dealEvent } from "@/models/EventInfo";
	// import type { HBNewsInfoHotInfoList } from "@/models/HBNewsInfo";
	
	const swiperList = ref([]), newsList = ref([]),netState = ref(0),showEmpty = ref(false)
	const subClassProp = defineProps({
		swiperIndex: Number, // 每个tab页的专属下标
		subIndex: Number, // 当前index下标
		subClass:String//当前分类
	})
	const params = reactive({
		firstFlag: 1,
		newId: 0,
		hotListId: 0,
		videoId: 0,
		pageNo: 0,
		businessType: 1,
		subclass: subClassProp.subClass
	})

	// mescroll-uni不用传onPageScroll, onReachBottom
	const { mescrollInit, getMescroll } = useMescroll() // 调用mescroll的hook
	defineExpose({ getMescroll }) // 使父组件可以通过ref调用到getMescroll方法 (必须)
		
	const downOption = {
		auto: false //是否在初始化后,自动执行downCallback; 默认true
	}
	const upOption   = {
		auto:false, // 不自动加载
		noMoreSize: 4-10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
		textNoMore: '已经全部加载完毕',
		empty:{
			tip: '~ 空空如也 ~', // 提示
			btnText: '点击重新加载',
		},
	}
	let isInit = false // 当前tab是否已初始化

	async function getBanner() {
		const {
			data,
			code
		}: any = await get_banner_image_list({
			wheelPlayType: 2,
			terminal: 'pwa'
		})
		if (code === 'success') {
			swiperList.value = data.wheelPlayImages
		}
	}

	const upCallback = (mescroll:any) => {
		console.log("==================", 111)
		params.pageNo++
		params.firstFlag = 0
		params.subclass = subClassProp.subClass
		get_news_list_info(params).then(res => {
			let code = res.code
			// let msg = res.msg
			let data = res.data

			if (code === 'success') {
				newsList.value = newsList.value.concat(data.hotInfoList)
				newsList.value.forEach(info => {
					params.newId = info.newsCollectInfo.newInfo.newId
				})
				mescroll.endSuccess(newsList.value.length, data.hasNextMark === 0 ? false : true);
			} else {
				if (params.pageNo > 0) {
					params.pageNo--
				}
				mescroll.endErr(); // 请求失败, 结束加载
			}
		}).catch((err: any) => {
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}

	// 下拉刷新
	const downCallback = (mescroll:any) => {
		isInit = true
		console.log("加载旧数据");
		if (mescroll === true ){
			uni.showLoading({
				title:"加载中"
			})
		}
		getBanner()
		params.pageNo = 0
		params.firstFlag = 1
		params.newId = 0
		params.subclass = subClassProp.subClass
		get_news_list_info(params).then(res => {
			let code = res.code
			let data = res.data
			console.log(res,100)
			if (mescroll === true ){
				uni.hideLoading()
			}
			if (code === 'success') {
				newsList.value = data.hotInfoList
				newsList.value.forEach(info => {
					params.newId = info.newsCollectInfo.newInfo.newId
				})
				console.log(newsList.value.length,101)
				netState.value = 0
				showEmpty.value = newsList.value.length === 0
				if (typeof(mescroll) === "object"){
					mescroll.endSuccess(newsList.value.length, data.hasNextMark === 0 ? false : true);
				}
			} else {
				netState.value = 2
				showEmpty.value = true
				if (typeof(mescroll) === "object"){
					mescroll.endErr(); // 请求失败, 结束加载载
				}
				
			}
		}).catch((err: any) => {
			console.log(err,104)
			if (mescroll === true){
				uni.hideLoading()
			}
			netState.value = 2
			showEmpty.value = true
			if (typeof(mescroll) === "object"){
				mescroll.endErr(); // 请求失败, 结束加载载
			}
		})
	}
	
	//点击空布局按钮的回调
	const emptyClick = ()=>{
		downCallback(false)
	}
	//轮播图点击
	 const swiperClick = (item:any) => {
	     	dealEvent(item.eventInfo)
	  }

	watch(
	()=> subClassProp.subIndex, 
	(val)=>{
		if (subClassProp.swiperIndex === val && !isInit) {
			downCallback(true)
		}
	})
	
	function reloadNet(){
		netState.value = 1
		downCallback(false)
	}
	 if (subClassProp.swiperIndex === 0 && !isInit) {
	 	downCallback(true)
	 }
</script>

<style lang="scss" scoped>
	.tab-page {
		@include wh(100%, 100%);
		overflow-y: auto;
	}
</style>
