<template>
  <scroll-view  :scroll-y="true">
    <hr/>
    <view class="flex flex-row bg-white overflow-x-scroll" @click="changTabs">
      <text v-for="item in typesList" class="px-4 py-2 whitespace-nowrap text-gray-400" :data-id="item.eventType" :class="{'current':eventType===item.eventType}">{{ item.name }}</text>
    </view>
    <view class="flex flex-row bg-gray-100 bg-opacity-30 overflow-x-scroll" @click="changTabs1">
      <text v-for="item in datesList" class="px-2 py-2 whitespace-nowrap text-gray-400" :data-id="item.dateTime" :class="{'current1':eventDate===item.dateTime}">{{ item.name }}</text>
    </view>
    <view class="schedule-list">
      <template v-if="eventList.length">
      <ScheduleItem v-for="item in eventList" :key="item.eventInfo.eventId" :event="item" />
      </template>
      <diy-none v-else></diy-none>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, reactive, computed} from "vue"
import ScheduleItem from "./schedule-item.vue"
import dayjs from "dayjs"
import {scheduleTypes} from '@/config'
import {init_date, query_focus_event_list} from "@/api";




let typesList = reactive([]);//全部热门等类型
let datesList = reactive([])//时间选择
let eventType = ref(-2);//热门类型ID
let eventDate = ref(dayjs().format('MM.DD'));//时间选择类型ID
let eventList = reactive([])//列表数据
const isFirstDay = computed(() => {
  return eventDate.value === dayjs().format('MM.DD') ? 1 : 0
})//首次类型查找


/*切换热门类型*/
function changTabs(e:any) {
  eventType.value=e.target.dataset.id
  getList()
}
/*切换时间选择类型*/
function changTabs1(e:any) {
  eventDate.value=e.target.dataset.id
  getList()
}


/*获取列表数据*/
async function getList() {
  const {data} :any=await query_focus_event_list({
    eventDate: eventDate.value,
    eventType: eventType.value,
    isFirstDay: isFirstDay.value
  });
  if(data){
    const {eventList: list = [] } = data
    eventList.length=0
    list.forEach((a:any) => {
      //@ts-ignore
      eventList.push(a)
    })
  }else{
    eventList.length=0
  }
}

async function init() {
  const {data}:any=await init_date();
  if(data){
    const { dateList, eventTypeList } = data
    eventTypeList.forEach((a:any) => {
      //@ts-ignore
      typesList.push(scheduleTypes[a.eventType])
    })
    dateList.forEach((a:any) => {
      a.name = dayjs(a.timestamp).format("MM月DD日")
      a.id = `Date${a.dateTime.replace('.', '')}`
      //@ts-ignore
      datesList.push(a)
    })
  }
  await getList()
  // nextDom(showDom)
}
init()


</script>
<style lang="scss">
.current{
  color: red;
  position: relative;
}
.current::after{
  content: '';
  position: absolute;
  width: 50%;
  height: 2px;
  background-color: red;
  bottom: 0;
  left: 25%;
}
.current1{
  color: black;
}

//.schedule {
//  position: relative;
//  @include wh(100%, 100%);
//  .schedule-nav {
//    position: sticky;
//    left: 0;
//    top: 0;
//    @include wh(100%, 120rpx);
//    z-index: 10;
//    .type-nav, .date-nav {
//      @include wh(100%, 60rpx);
//      border-bottom: 2rpx solid #EEE;
//      background: #FFF;
//      padding: 0 24rpx;
//      font-size: 28rpx;
//      color: #888;
//      line-height: 58rpx;
//      white-space: nowrap;
//    }
//    .type-nav {
//      .type-item {
//        position: relative;
//        display: inline-block;
//        @include wh(auto, 100%);
//        padding: 0 40rpx;
//        &.current {
//          color: #fc4948;
//          &::before {
//            content: "";
//            position: absolute;
//            left: 50%;
//            bottom: 0;
//            @include wh(40rpx, 3rpx);
//            background: #fc4948;
//            margin-left: -20rpx;
//          }
//        }
//      }
//    }
//    .date-nav .date-item {
//      position: relative;
//      display: inline-block;
//      @include wh(auto, 100%);
//      padding: 0 20rpx;
//      &.current {
//        color: #333;
//      }
//    }
//  }
//}
</style>