<!-- 品牌服务 -->
<template>
  <section class="flex flex gap-5 py-65px max-md:(flex-col) max-w-full! flex-place-content-evenly" style="width: 100%">
    <div v-for="item in 4" :key="item" class="flex-col items-start w-[292px]">
      <div class="w-6 h-6 rounded-full overflow-hidden self-center">
        <sps-img :src="`https://picsum.photos/id/${item}/200/200`" />
      </div>
      <div class="s-sub-title font-medium leading-tight mt-5 mb-3.5">Worldwide Delivery</div>
      <div class="font-normal leading-tight">Free worldwide shipping on all orders of $99</div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style></style>
