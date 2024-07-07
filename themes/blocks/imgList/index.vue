<template>
  <section class="py-65px" style="width: 100%">
    <div class="w-full flex-col md:(flex-row flex-nowrap flex-center) flex-1 gap-[18px] flex-wrap">
      <div
        v-for="(item, index) in datas.content"
        :key="index"
        class="md:p-2 md:flex-center flex-col flex-content-start w-full"
      >
        <sps-img class="n-img aspect-1 rounded object-cover w-full" fit="cover" :src="item.img" />
        <!-- <div
          class="md:block hidden m-t12px m-b4px color-textColor text-base font-600 leading-normal tracking-tight"
        ></div> -->
        <n-ellipsis
          :tooltip="false"
          :line-clamp="1"
          class="md:hidden block m-t12px m-b4px s-sub-title font-600 leading-normal tracking-tight"
        >
          {{ item.title }}
        </n-ellipsis>
        <div
          class="md:block hidden m-b14px text-[14px] md:text-[16px] font-normal leading-normal tracking-tight"
          v-html="item.dec"
        ></div>
        <div class="md:hidden block">
          <n-ellipsis
            :tooltip="false"
            :line-clamp="2"
            class="color-textColor w-full text-[14px] md:text-[16px] font-normal leading-normal tracking-tight"
            v-html="item.dec"
          ></n-ellipsis>
        </div>

        <nuxt-link :href="item.link">
          <n-button type="primary" class="h-40px">{{ item.buttonName }}</n-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ImageList',
})
defineProps<{
  datas: any
}>()
</script>

<style lang="scss" scoped>
:deep(.n-img) {
  overflow: hidden;
  &:hover > img {
    opacity: 0.8;
    transition: all 0.5s linear;
    transform: scale(1.1);
  }
}
</style>
