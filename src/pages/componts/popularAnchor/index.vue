<template>
    <view class="anchorList grid grid-cols-2 gap-1 p-1" >

<!--      <veiw @click="toAnchorLiveRoom(item.uid)" class="anchorListItem  rounded-md overflow-hidden" v-for="(item,index) in lists" :key="index">-->
      <navigator :url="`/pages/view/anchorLiveRoom/index?uid=${item.uid}`" open-type="redirect"
                 hover-class="other-navigator-hover" class="anchorListItem  rounded-md overflow-hidden" v-for="(item,index) in lists" :key="index">
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
              <text><image class="w-3 h-3" src="/static/img/17.png"/>
                {{item['pageview']}}</text>


            </view>
          </view>
        </view>
      </navigator>
<!--      </veiw>-->

    </view>
</template>

<!--/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/-->

<script setup lang="ts">
const {lists}= defineProps(['lists'])
// function toAnchorLiveRoom(id:unknown) {
//   /*检查是否登陆*/
//     uni.navigateTo({url: `/pages/view/anchorLiveRoom/index?uid=${id}`})
// }
</script>

<style scoped>

</style>
