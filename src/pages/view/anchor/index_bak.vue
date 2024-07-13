<template>
  <view class="anchor relative">
    <Title :selectIndex="1" class="sticky top-0 z-10 bg-white" @changeInit="changeInit"/>
    <diy-swiper :swiperList="swiperList" />
    <view class="font-bold text-gray-900 p-2">
      <text>热门主播</text>
    </view>
    <PopularAnchor v-if=lists.length :lists="lists"/>
  </view>
</template>

<script setup lang="ts">
import Title from './title'
import PopularAnchor from '../../componts/popularAnchor'
import {ref} from "vue";
import {get_banner_image_list, getPhp} from "@/api";

let swiperList = ref([])

async function getBanner() {
  const {data, code}: any = await get_banner_image_list({wheelPlayType: 2, terminal: 'pwa'})
  if (code === 'success') {
    swiperList.value = data.wheelPlayImages
  }
}

let lists = ref([])

async function getAnchorList() {
  const res: any = await getPhp({'g': 'Front', 'm': 'anchor', 'a': 'indexApi'})
  if (res && res['lists']) {
    lists.value = res['lists']
  }
}

function init() {
  getBanner()
  getAnchorList()
}

function changeInit() {
  init()
}

init()
</script>

<style>


</style>
