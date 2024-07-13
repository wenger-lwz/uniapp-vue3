<template>
  <view class="h-screen  flex flex-col bg-gray-800 bg-opacity-10 ">
    <diy-title class="bg-white">
      <template v-slot:left>
        <navigator class="w-14" :delta="1" open-type="navigateBack" hover-class="navigator-hover">
          <uni-icons type="left" size="24"/>
        </navigator>
      </template>
      <template v-slot:center>
        <text class="font-bold text-sm">消息中心</text>
      </template>
      <template v-slot:right>
        <text class="w-14"></text>
      </template>
    </diy-title>

    <template v-if="showDom">
      <view class="bg-white mt-0.5 grid grid-cols-3 text-center" @click="changTabs">
        <view v-for="(item,index) in tabsList" class="px-4 py-2 whitespace-nowrap " :data-id="index+1"
              :class="{'current':selectOne===index+1}">
          <text :data-id="index+1">{{ item['label'] }}</text>
          <text v-if="userNoticeCountData[item['value']]" :data-id="index+1"
                class="text-xs rounded-full px-1 bg-yellow-500 text-white relative -top-2"
          >{{ userNoticeCountData[item['value']] }}
          </text>

        </view>
      </view>
      <view class="flex-1 overflow-y-scroll">
        <template v-if="selectOne===1">
          <template v-if="messageInfoListData.length">
            <view v-for="(item,index) in messageInfoListData" :key="index">
              <view class="text-center text-gray-800 text-xs py-1.5">
                <text v-if="item.type===4">
                  {{ item.discountMessageInfo.createTime }}
                </text>
                <text v-if="item.type===3">
                  {{ item.anchorLiveMessageInfo.createTime }}
                </text>
              </view>
              <view class="bg-white p-2">
                <view class="flex items-center">
                  <image class="w-5 h-5 mr-1" src="@img/57.png" alt=""/>
                  <text v-if="item.type===4">{{ item.discountMessageInfo.noticeTitle }}</text>
                  <text v-if="item.type===3">{{ item.anchorLiveMessageInfo.noticeTitle }}</text>
                </view>
                <template v-if="item.type===4">
                  <diy-image class="w-full h-52 rounded my-2" v-if="item.discountMessageInfo.discountImgUrl"
                             :src="item.discountMessageInfo.discountImgUrl" alt="/static/img/default.png"/>
                  <view v-else class="bg-gray-800 bg-opacity-10 p-2 rounded my-2 text-xs truncate"
                        v-html="item.discountMessageInfo.noticeContent"></view>
                </template>
                <template v-if="item.type===3">
                  <view class="bg-gray-800 bg-opacity-10 p-2 rounded my-2 text-xs"
                        v-html="item.anchorLiveMessageInfo.noticeContent"></view>
                </template>

                <view class="flex items-center justify-between  text-xs  text-gray-400">
                  <text>点击查看详情</text>
                  <uni-icons type="right" size="18"/>
                </view>
              </view>
            </view>
          </template>
          <diy-none v-else/>
        </template>
        <template v-if="selectOne===2">
          <template v-if="messageInfoListData.length">
            <view v-for="(item,index) in messageInfoListData" :key="index">
              <template v-if="item.type === 1">
                <view class="text-center text-gray-800 text-xs py-1.5">{{
                    item.interactionNoticeInfo.createTime
                  }}
                </view>
                <view class="bg-white p-2">
                  <view class="flex items-center">
                    <image class="w-5 h-5 mr-1" src="@img/58.png" alt=""/>
                    <text>{{ item.interactionNoticeInfo.noticeTitle }}</text>
                  </view>
                  <view class="bg-gray-800 bg-opacity-10 text-xs p-2  leading-5 rounded my-1">
                    <view v-html="item.interactionNoticeInfo.noticeContent"></view>
                    <text v-if="item.interactionNoticeInfo.noticeContent1"
                          :class="{'text-gray-400':!item.interactionNoticeInfo.noticeContent2}"
                          v-html="item.interactionNoticeInfo.noticeContent1"></text>
                    <text v-if="item.interactionNoticeInfo.noticeContent2">:</text>
                    <text v-if="item.interactionNoticeInfo.noticeContent2" class="text-gray-400 ml-1"
                          v-html="item.interactionNoticeInfo.noticeContent2"></text>
                  </view>

                  <view class="flex items-center justify-between  text-xs  text-gray-400">
                    <text>点击查看详情</text>
                    <uni-icons type="right" size="18"/>
                  </view>
                </view>
              </template>
              <template v-if="item.type === 2">
                <view class="text-center text-gray-800 text-xs py-1.5">{{ item.planNoticeInfo.createTime }}</view>
                <!--              <li class="mailItem" :key="'item-' + index" @click="detailClick(item)">-->
                <!--                <strong class="title title2">{{ item.planNoticeInfo.noticeTitle }}</strong>-->
                <!--                <div class="noticeMsg">-->
                <!--                  <div class="noticeMsg-top flexitems">-->
                <!--                    <div class="status">{{ item.planNoticeInfo.playTypeContent }}</div>-->
                <!--                    <div class="types">{{ item.planNoticeInfo.leagueMatch }}</div>-->
                <!--                    <div class="time">{{ item.planNoticeInfo.matchStartTime }}</div>-->
                <!--                  </div>-->
                <!--                  <div class="noticeMsg-text">{{ item.planNoticeInfo.homeTeam }}VS{{-->
                <!--                      item.planNoticeInfo.awayTeam-->
                <!--                    }}-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <b class="extend">点击查看详情</b>-->
                <!--              </li>-->
                <view class="bg-white p-2">
                  <view class="flex items-center">
                    <image class="w-5 h-5 mr-1" src="@img/58.png" alt=""/>
                    <text>{{ item.planNoticeInfo.noticeTitle }}</text>
                  </view>

                  <div class="noticeMsg">
                    <div class="noticeMsg-top flexitems">
                      <div class="status">{{ item.planNoticeInfo.playTypeContent }}</div>
                      <div class="types">{{ item.planNoticeInfo.leagueMatch }}</div>
                      <div class="time">{{ item.planNoticeInfo.matchStartTime }}</div>
                    </div>
                    <div class="noticeMsg-text">{{ item.planNoticeInfo.homeTeam }}VS{{
                        item.planNoticeInfo.awayTeam
                      }}
                    </div>
                  </div>


                  <view class="flex items-center justify-between   text-xs text-gray-400">
                    <text>点击查看详情</text>
                    <uni-icons type="right" size="18"/>
                  </view>
                </view>
              </template>
              <template v-if="item.type === 3">
                <view class="text-center text-gray-800 text-xs py-1.5">{{ item.circlePostNoticeInfo.createTime }}</view>
                <view class="bg-white p-2">
                  <view class="flex items-center">
                    <image class="w-5 h-5 mr-1" src="@img/58.png" alt=""/>
                    <text>{{ item.circlePostNoticeInfo.noticeTitle }}</text>
                  </view>
                  <view class="bg-gray-800 bg-opacity-10 p-2 rounded my-2  text-xs"
                        v-html="item.circlePostNoticeInfo.noticeContent"></view>
                  <view class="flex items-center justify-between   text-xs text-gray-400">
                    <text>点击查看详情</text>
                    <uni-icons type="right" size="18"/>
                  </view>
                </view>
              </template>
            </view>
          </template>
          <diy-none v-else/>
        </template>
        <template v-if="selectOne===3">
          <template v-if="messageInfoListData.length">
            <view v-for="(item,index) in messageInfoListData" :key="index">
              <view class="text-center text-gray-800 text-xs py-1.5">{{ item.createTime }}</view>
              <view class="bg-white p-2">
                <view class="flex items-center">
                  <image class="w-5 h-5 mr-1" src="@img/59.png" alt=""/>
                  <text>{{ item.noticeTitle }}</text>
                </view>
                <view class="bg-gray-800 bg-opacity-10 p-2 rounded my-2 text-xs leading-5"
                      v-html="item.noticeContent"></view>
                <view class="flex items-center justify-between  text-xs  text-gray-400">
                  <text>点击查看详情</text>
                  <uni-icons type="right" size="18"/>
                </view>
              </view>
            </view>
          </template>
          <diy-none v-else/>
        </template>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref} from 'vue'
import {onShow} from "@dcloudio/uni-app";
import {
  get_notice_count,
  get_king_announcement_message_notice_info_revision,
  query_interaction_notice_revision,
  get_system_message_notice_info
} from "@/api";
import {nextDom} from "@/utils";


let tabsList = [
  {
    label: '黑白公告',
    value: 'announcementCount'
  },
  {
    label: '互动消息',
    value: 'interactiveCount'
  },
  {
    label: '系统通知',
    value: 'systemCount'
  },
]
let selectOne = ref(1)//切换tabs
let userNoticeCountData = reactive({totalCount: 0})
let showDom = ref(false);
let messageInfoListData = reactive([])

function changTabs(e: any) {
  selectOne.value = e.target.dataset.id
  messageInfoListData.length = 0
  getList()
}

async function getList() {
  let request = {
    pageSize: 100,
  };
  let result: any = {};
  switch (selectOne.value) {
    case 1 :
      request = {...request, ...{discountId: 0, eventReserveId: 0, planId: 0, postId: 0}}
      result = get_king_announcement_message_notice_info_revision
      break
    case 2 :
      request = {...request, ...{interactionId: 0, planId: 0, postId: 0}}
      result = query_interaction_notice_revision
      break
    case 3 :
      request = {...request, ...{queryId: 0}}
      result = get_system_message_notice_info
      break
  }
  const {
    success,
    data: {messageInfoList, interactionNoticeList, systemMessageList, hasNextMark}
  }: any = await result(request)
  if (success) {

    switch (selectOne.value) {
      case 1 :
        messageInfoListData = messageInfoListData.concat(messageInfoList)
        break
      case 2 :
        messageInfoListData = messageInfoListData.concat(interactionNoticeList)
        break
      case 3 :
        messageInfoListData = messageInfoListData.concat(systemMessageList)
        break
    }
  }
  nextDom(showDom)
}

async function init() {
  const {data: {userNoticeCount}}: any = await get_notice_count()
  userNoticeCountData = userNoticeCount
  await getList()

}


onMounted(() => {
  uni.hideTabBar()
  init()
})
onUnmounted(() => {
  uni.showTabBar()
})


</script>

<style scoped>
.current {
  position: relative;
}

.current::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 2px;
  background-color: red;
  bottom: 5px;
  left: 25%;
}

/deep/ .truncate p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>