<template>
  <view class="diy-title ">
    <diy-top/>
    <view class="flex items-center justify-between p-2 ">
      <slot name="left"><navigator class="w-10" :delta="1" open-type="navigateBack" hover-class="navigator-hover">返回</navigator></slot>
      <slot name="center"></slot>
      <slot name="right"><text class="w-10"></text></slot>
    </view>
  </view>
</template>

<!--/**
@time 2023/2/17
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">

</script>

<style scoped>

</style>