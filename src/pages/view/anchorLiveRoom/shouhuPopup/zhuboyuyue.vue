<template>
  <view class="bg-white rounded-tl-2xl  w-full  rounded-tr-2xl relative  ">
    <view class="p-2 bg-white h-full w-full">
      <view class="grid place-items-center text-gray-700 py-10 text-xs">
        <image class="w-20 h-20  text-xs mb-5 " src="@img/noData.png" alt=""/>
        <view>暂无数据</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const {anchorRoomInfoModel} = defineProps(['anchorRoomInfoModel'])


</script>

<style scoped>
.selectIndex::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
  border-radius: 15px;
  width: 25%;
  background-color: red;
}
</style>