<template>
  <div class="text-white grid grid-cols-3 text-center" @click="showChatTypeF">
    <div class="relative tab-item flex items-center justify-center py-1 opacity-70"
         v-for="(item,index) in showChatTypeList"
         :key="index"
         :data-id="index" :class="{'ChatShow':showChatType===index}">
      <image class="w-5 h-5 object-scale-down    mr-1 " :src="getImg(`${29+index}.png`)" alt=""/>
      <span :data-id="index">{{ item }}
        </span>
      <div class="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center text-center justify-center"
           :data-id="index" v-if="lqbNum&&index===2">
        {{ String(lqbNum).length > 2 ? "..." : lqbNum }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import {checkedLogin, getImg} from "@/utils";
import session from "@/stores";
import {initUnreadNum} from '@/api'

const emit=defineEmits(['changeChatType'])
const {userInfo, configUrlObj} = toRefs(session())

let showChatType = ref(0);
let lqbNum = ref(0);
const showChatTypeList = ['聊天', '主播私聊', '专属群'];

function initUnreadNumFun() {
  initUnreadNum(
      configUrlObj.value.chatMsgUrl
          .replace("[USERCENTERID]", userInfo.value ? userInfo.value.id : 0)
          .replace("[USERCENTERTOKEN]", userInfo.value ? userInfo.value.token : 0)
  ).then((res: any) => {
    lqbNum.value = res.data ? res.data : 0;
  });
}

initUnreadNumFun()

function showChatTypeF(e: any) {
  if (e.target.dataset.id) {
    if (+e.target.dataset.id === 2) {
      /*检查是否登陆*/
      checkedLogin()
      lqbNum.value = 0
    }
    showChatType.value = +e.target.dataset.id
    emit('changeChatType',+e.target.dataset.id)
  }
}


</script>

<style scoped>
.tab-item {
  background-color: #370053;
}

.ChatShow {
  background-image: url("@img/32.png");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
}
</style>