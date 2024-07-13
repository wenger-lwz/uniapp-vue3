<template>
    <view>
        <diy-top/>
        <view class="title flex items-center justify-around p-2 text-gray-500 text-lg" @click="changeSelectIndex">
            <text :data-id="index" v-for="(item,index) in list" :key="item" :class="{isActive:index===selectIndex} ">{{ item }}</text>
        </view>
    </view>
</template>

<!--/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
const list = ['短视频', '主播', '赛程', '清流',]
const {selectIndex} = defineProps(['selectIndex'])
const Emit =defineEmits(['changeInit'])
function changeSelectIndex(e:any) {
  if(e.target.dataset.id){
    Emit('changeInit', e.target.dataset.id)
  }
}
</script>

<style scoped>
.isActive {
    color: #333333;
    font-weight: bold;
}
</style>
