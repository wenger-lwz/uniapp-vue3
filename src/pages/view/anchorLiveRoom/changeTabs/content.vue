<template>
  <view class="h-full flex" v-show="showChatType===1">
    <view class="" v-if="showRoomReminder">
      <p class="flex flex-row p-5 text-white h-auto" @click="showRoomReminder=false">
        <diy-image class="w-8 h-8 flex-none object-scale-down mr-1 "
                   :src="anchorRoomInfoModel.avatar"
                   alt="/static/img/default.png"
        />
        <span class="bg text-xs" v-html="parmsUrl(anchorRoomInfoModel.roomReminder)"></span>
      </p>
    </view>
    <iframe
        v-else
        :src="configUrlObj.littleHelperUrl"
        height="100%"
        width="100%"
        style="background-color: #fff"
        frameborder="0"
    ></iframe>
  </view>

  <template v-if="showChatType===2">
    <iframe
        :src="chatUrls"
        height="100%"
        width="100%"
        style="background-color: #fff"
        frameborder="0"
    ></iframe>
  </template>
</template>

<script setup lang="ts">
import {computed, toRefs, ref} from "vue";
import session from "@/stores";


const {anchorRoomInfoModel, showChatType} = defineProps(['anchorRoomInfoModel', 'showChatType'])
const {configUrlObj, userInfo} = toRefs(session())

function parmsUrl(HTML: string) {
  let reg = /[a-zA-Z0-9][a-zA-Z0-9]{0,62}.(cn|net|com|html){1}|(www){1}(.*?)(cn|net|com|html){1}|((http(s)?:\/\/){1}(www){1}(.*?)(cn|net|com|html){1})/g;
  HTML = HTML.replace(reg, (e) => {
    let url = e.indexOf('http') !== -1 ? e : '//' + e
    return `<a href="${url}" target="_blank" style="color:#1a73e8;margin: 0 2px">${e}</a>`
  })
  return HTML
}

const chatUrls = computed(() => {
  return configUrlObj.value.chatUrl
      .replace("[UID]", userInfo.value ? userInfo.value.id : 0)
      .replace("[TOKEN]", userInfo.value.token)
      .replace("[HEIGHT]", 0)
      .replace("[SHOWICO]", 0)
      .replace("[SOURCEFROM]", 1);
})

let showRoomReminder = ref(!!anchorRoomInfoModel.roomReminder)
</script>

<style scoped>


.bg {
  background-image: url("@img/33.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: left;
  padding: 10px;
  line-height: 25px;
}

a {
  color: lightseagreen;
}

</style>