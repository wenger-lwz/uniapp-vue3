<template>
    <view class="content">
        <diy-top/>
        <image class="logo" src="/static/logo.png" @click="add"/>
        <view class="text-area">
            <text class="title text-red-400">{{ title }}</text>
            <text class="title text-red-400">{{ testNum }}</text>
        </view>
        <view class="w-1/2 mx-auto my-4 text-center bg-gray-500 rounded text-white py-2" @click="remove('testNum',0)">重置</view>
    </view>
</template>

<script setup lang="ts">
import {ref, toRefs,onMounted} from 'vue'
import session from "@/stores";
const {testNum, add,remove} = toRefs(session())
let num =ref(10)
const title = ref('Hello')
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
}
</style>
