<template>
  <scroll-view :scroll-y="true" class="anchor-page">
    <view class="top-swiper">
      <diy-swiper :swiperList="swiperList" />
    </view>
    <view class="font-bold text-gray-900 p-2">
      <text>热门主播</text>
    </view>
    <view class="anchorList grid grid-cols-2 gap-1 p-1" >
      <view @click="toAnchorLiveRoom(item.uid)" class="anchorListItem  rounded-md overflow-hidden" v-for="(item,index) in lists" :key="index">
        <view class="h-28 relative">
          <diy-image class="w-full h-full rounded object-scale-down overflow-hidden"
                    :src="item['thumb']"
                    alt="/static/img/default.png"
          />
          <text class="bg-black text-white p-1 text-xs absolute top-0 left-0">{{
              item['zbtype_detail']
            }}
          </text>
          <diy-image class="absolute top-0 right-0 w-20 h-5 rounded object-scale-down overflow-hidden"
                    :src="item['label_icon']"
                    alt="/static/img/default.png"
          />
        </view>
        <view class="flex items-center text-xs py-1">
          <diy-image class=" w-10 h-10 rounded-full object-scale-down overflow-hidden flex-none"
                    :src="item['avatar']"
                    alt="/static/img/default2.png"
          />
          <view class="flex flex-col truncate ml-1 flex-1">
            <text class=" truncate">{{item['title']}}</text>
            <view class=" flex  items-center justify-between text-gray-400 ">
              <text class="truncate">{{item['user_nicename']}}</text>
              <view><image class="w-3 h-3" src="/static/img/17.png"/>
                {{item['pageview']}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<!--/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
import { ref } from "vue"
import {get_banner_image_list, getPhp} from "@/api"
import { ScrollView } from "@dcloudio/uni-h5";
let swiperList = ref([]), lists = ref([])
function toAnchorLiveRoom(id:unknown) {
/*检查是否登陆*/
  uni.navigateTo({url: `/pages/view/anchorLiveRoom/index?uid=${id}`})
}

async function getBanner() {
  const {data, code}: any = await get_banner_image_list({wheelPlayType: 2, terminal: 'pwa'})
  if (code === 'success') {
    swiperList.value = data.wheelPlayImages
  }
}
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

init()
</script>

<style lang="scss">
.anchor-page {
  @include wh(100%, 100%);
  /* #ifdef H5 */
  padding-bottom: 50px;
  /* #endif */
}
</style>
