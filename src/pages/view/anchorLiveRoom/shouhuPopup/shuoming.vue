<template>
  <div class=" w-64 bg-white rounded-xl px-5 pb-5  fixed bottom-12 left-1/2 transform -translate-x-1/2">
    <div class="text-center py-5">
      <text class="whitespace-nowrap text-xl">规则说明</text>
    </div>
    <text class="text-sm text-gray-400 leading-none" >
      {{model.explain}}
    </text>
  </div>
</template>

<script setup lang="ts">
const {model}=defineProps(['model'])
</script>

<style scoped>

</style>