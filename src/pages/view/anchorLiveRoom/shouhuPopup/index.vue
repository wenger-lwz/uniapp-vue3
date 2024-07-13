<template>
  <view class=" bg-white rounded-tl-2xl  rounded-tr-2xl relative ">
    <div class="absolute left-1/2 transform -translate-x-1/2 ">
      <div class="  relative text-center w-12 h-16 mx-auto -top-8 ">
        <image class="w-12 h-12   rounded-full bg-gray-800 " src="@img/20.png" alt=""/>
        <image class="w-8 h-4 absolute -top-3 object-scale-down left-2  " src="@img/21.png" alt=""/>
        <image class="w-12 h-5  absolute bottom-0  object-scale-down   left-0  " src="@img/22.png" alt=""/>
      </div>
    </div>
    <div class="text-right pr-5 pt-2">
      <uni-icons type="more-filled" size="24" @click="openPopup2"/>
    </div>
    <div class="text-center">
      <text class="text-sm">虚位以待</text>
    </div>
    <div class="text-center">
      <text class="text-sm text-gray-400">送以下任意礼物，即可守护主播～</text>
    </div>
    <div class="grid grid-cols-3 text-xs gap-2 p-4">
    <div v-for="(item,index) in model.list" :key="index"
         class="grid place-items-center py-5 bg-blue-400 rounded relative"
         :class="`litem${index}`"
    >
      <div>
        <diy-image class="w-12 h-12 rounded object-scale-down overflow-hidden"
                   :src="item['gifticon']"
                   alt="/static/img/default.png"
        />
      </div>
      <div class="py-1"><text>{{item['giftname']}}</text></div>
      <div class="py-1 text-red-400"><text>{{item['needcoin']}}金豆</text></div>
      <div class="bg-red-500 text-white rounded-xl py-1 px-2">送出抢守护</div>
      <text class="absolute top-0 right-0  px-1.5 rounded-bl rounded-tr text-xs text-white" :class="`tag${index}`">{{tagList[index]}}</text>
    </div>

    </div>


  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['openPopup2'])
const {model}=defineProps(['model'])
const tagList=['初级','中级','高级']

function openPopup2() {
  emit('openPopup2')
}


</script>

<style scoped>
.litem0 {
  background: linear-gradient(#FFEEE7, #FFF5DC);
}

.litem1 {
  background: linear-gradient(#E6EBFF, #FAEBFF);
}

.litem2 {
  background: linear-gradient(#FCE9FD, #FEF6F3);
}
.tag0 {
  background: #E0E0E0;
}

.tag1 {
  background: #FED363;
}

.tag2 {
  background: #FC3441;
}
</style>