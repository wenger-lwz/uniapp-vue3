<template>
    <div class="flex items-center justify-between p-1">
        <view class="left w-64 h-20 flex flex-col justify-between p-1">
            <text class="overText ">
                【世界杯】巴西VS克罗地亚前瞻：内马尔欲成队史射手王，莫德里奇或迎最后一舞,内马尔欲成队史射手王，莫德里奇或迎最后一舞
            </text>
            <view class="text-xs  ">
                <text class="text-red-400 mr-2">食神唐牛</text>
                <text class="mr-2">刚刚</text>
                <image class="w-4 h-4 mr-0.5 -mb-1" src="@img/10.png"></image>
                <text class="mr-2">4346</text>
                <image class="w-4 h-4 mr-0.5 -mb-1" src="@img/11.png"></image>
                <text class="mr-2">6</text>
            </view>
        </view>
        <image class="w-28 h-20 rounded" src="@img/swiper/040.jpg" alt=""/>
    </div>
</template>

<!--/**
@time 2023/2/16
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.overText {
    @include text-ellipsis-two();
    font-weight: 500;
    font-size: 28rpx;
}
</style>