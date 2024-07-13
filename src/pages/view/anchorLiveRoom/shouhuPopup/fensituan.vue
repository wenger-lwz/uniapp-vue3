<template>
  <view class="bg-white rounded-tl-2xl  w-full  rounded-tr-2xl relative  ">
    <view class="p-5 fensituan h-full w-full">
      <view class="flex flex-row">
        <view class="relative flex flex-row ">
          <diy-image class="w-12 h-12 mr-1 rounded-full object-scale-down overflow-hidden"
                     :src="anchorRoomInfoModel.avatar"
                     alt="/static/img/default.png"
          />
          <image class=" absolute right-0 bottom-0 w-5 h-5 p-1
            object-scale-down rounded-full bg-red-500"
                 src="@img/1.gif" alt=""/>
        </view>

        <view>
          <view>{{ anchorRoomInfoModel.anchorUserName }}</view>
          <view class="text-xs text-white flex flex-row items-center">
            <image class="w-4 h-4 ml-1  " src="@img/42.png" alt=""/>
            <text class="bg-red-500 mx-1 p-0.5 pl-1 rounded-tl-full  rounded-bl-full">粉丝团</text>
            <text class="bg-red-500 p-0.5 pr-1 rounded-tr-full  rounded-br-full">本月团榜单</text>
            <text class="text-red-500 bg-white p-0.5 pl-1  rounded">0 ></text>
          </view>
        </view>

      </view>

      <view class="text-xs font-light grid grid-cols-3 gap-1 my-1">
        <span class="tab1 rounded p-1 ">
          <view>粉丝守护</view>
          <view>0人</view>
        </span>
        <span class="tab2 rounded p-1 ">
          <view>粉丝团任务</view>
          <view>开启任务</view>
        </span>
        <span class="tab3 rounded p-1 ">
          <view>开通粉丝团守护</view>
          <view>10金豆</view>
        </span>
      </view>

      <view class="flex items-center justify-between bg-gray-400 bg-opacity-30 p-3  rounded">
        <image class="w-8 h-8   " src="@img/47.png" alt=""/>
        <view class="mx-1">
          <view class="text-sm">粉丝团每日任务开启中</view>
          <view class="text-xs text-gray-700 opacity-30">立即做任务，升级粉丝登记，解锁更多特权</view>
        </view>
        <view class="text-gray-700 opacity-30">></view>
      </view>
    </view>

    <uni-section title="团成员" type="line" >

      <view class="h-20 grid place-items-center">
        <text class="text-gray-700 opacity-30">暂无数据</text>
      </view>
    </uni-section>
    <view class="py-2 px-4  flex items-center border-t-2 border-gray-100 border-b-2">
      <text class="text-xs flex-1 text-gray-700 opacity-30">加入粉丝团，和大家一起玩吧</text>
      <text class="bg-red-500 text-white py-1 px-2 rounded-2xl text-xs">开通粉丝团</text>
    </view>

  </view>
</template>

<script setup lang="ts">
const {anchorRoomInfoModel} = defineProps(['anchorRoomInfoModel'])


</script>

<style scoped>
.fensituan {
  background-image: url("@img/43.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.tab1 {
  background-image: url("@img/44.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.tab2 {
  background-image: url("@img/45.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.tab3 {
  background-image: url("@img/46.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>