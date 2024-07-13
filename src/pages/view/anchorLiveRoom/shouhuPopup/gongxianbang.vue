<template>
  <view class="bg-white rounded-tl-2xl  w-full  rounded-tr-2xl relative  ">
    <view class="p-2 bg-white h-full w-full">
      <view class="grid grid-cols-3 gap-1 text-sm text-center" @click="select">
        <text v-for="(item,index) in tabList" :key="index"
              :data-index="index"
              class="relative   pb-3"
              :class="{'selectIndex':selectIndex===index}"
        >{{ item }}
        </text>
      </view>

      <view class="grid place-items-center text-gray-700 py-10 text-xs">
        <image class="w-20 h-20  text-xs mb-5 " src="@img/noData.png" alt=""/>
        <view>暂无数据</view>
      </view>
    </view>


  </view>
</template>

<script setup lang="ts">
const {anchorRoomInfoModel} = defineProps(['anchorRoomInfoModel'])
import {ref} from 'vue';

const tabList = ['贡献日榜', '贡献周榜', '贡献总榜'];
let selectIndex = ref(0)

function select(e:any) {
  let id=e.target.dataset.index+''
  if(id){
    selectIndex.value=e.target.dataset.index
  }
}

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