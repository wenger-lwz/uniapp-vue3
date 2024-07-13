<template>
  <view class="h-screen flex flex-col">
    <diy-title>
      <template v-slot:left>
        <navigator class="w-14" :delta="1" open-type="navigateBack" hover-class="navigator-hover">
          <uni-icons type="left" size="24"/>
        </navigator>
      </template>
      <template v-slot:center>
        <text class="font-bold text-sm">设置</text>
      </template>
      <template v-slot:right>
        <text class="w-14"></text>
      </template>
    </diy-title>

    <view class="bg-gray-200 bg-opacity-30 flex-1">
      <view class="flex items-center justify-between py-2 px-4 mt-0.5 bg-white"
            v-for="item in dataArr" :key="item">
        <text>{{ item }}</text>
        <uni-icons type="right" size="24"/>
      </view>
    </view>


    <view>
      <view class="w-11/12 mx-auto bg-red-500 py-2 text-center text-white rounded mb-4"
            @click="outLogin"
      >退出登录
      </view>
      <diy-bottom></diy-bottom>
    </view>
  </view>
</template>

<script setup lang="ts">
import session from "@/stores";

const {remove: stRemove} = session()
let dataArr = ['修改手机号', '合作联系', '意见反馈', '关于我们',]

function outLogin() {
  stRemove('userInfo', '')
  uni.navigateTo({url: '/pages/view/login/index'})
}
</script>

<style scoped>

</style>