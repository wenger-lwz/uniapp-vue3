<template>
	<view class="w-full h-full flex flex-col">
		<diy-top></diy-top>
		<view v-if="url">
			<web-view :webview-styles="wbStyles" :src="url" :fullscreen="false" />
		</view>
	</view>

</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';

	const url = ref(''),
		title = ref('')

	onLoad((e: any) => {
		const data = JSON.parse(decodeURIComponent(e.url))
		url.value = data
		title.value = e.title
	})
	
	/*
	  获取顶部安全区域的高度 安卓的顶部区域为0 ios的是实际大小
	*/
   const sysInfo =  uni.getSystemInfoSync()
	let safeTopArea = sysInfo.platform=='ios'? sysInfo.safeAreaInsets.top:0;
	//获取底部安全区域的高度
	let safeBoottom = sysInfo.safeAreaInsets.bottom;

	const wbStyles = {
		progress: {
			color: '#FF3333',
		},
		top: safeTopArea,  //ios的位置上移安全区域的高度
		height:sysInfo.windowHeight - safeBoottom - safeTopArea,  //高度+安全区域的高度
	}
	 //  document.addEventListener('jsLogin', function() {
		// 	console.log("login");
		// });
	
</script>
