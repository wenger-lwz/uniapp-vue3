<template>
    <video id="myVideo"
           class=" w-full"
           src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
           @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls
           :is-live="true" :autoplay="true"
    ></video>
</template>

<script setup>
function videoErrorCallback(e) {
    uni.showModal({
        content: e.target.errMsg,
        showCancel: false
    })
}

const danmuList = [
    {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
    },
    {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }
]
</script>


<!--
<template>
    <div id="dplayer"></div>
</template>

&lt;!&ndash;/**
@time 2023/3/19
@version 1.0.0
@author  Justin
*/&ndash;&gt;

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import Flv from "flv.js";
import DPlayer from 'dplayer';
import Hls from 'hls.js'

const {model} = defineProps(['model'])
let dp = reactive({})

function init() {
    dp = new DPlayer({
        container: document.getElementById('dplayer'),
        live: true,
        autoplay: true,
        airplay: true,
        video: {
            url: model.pullm3u8,
            type: 'customFlv',
            customType: {
                customFlv: function (video: any) {
                    const flvPlayer = Flv.createPlayer({
                        type: 'flv',
                        url: model.pullm3u8,
                    });
                    flvPlayer.attachMediaElement(video);
                    flvPlayer.load();
                },
            },
        },
        danmaku: true
    });

    /*发送弹幕*/
    // dp.danmaku.send(
    //     {
    //         text: 'dplayer is amazing',
    //         color: '#b7daff',
    //     },
    // );
    // dp.danmaku.draw(
    //     {
    //         text: 'DIYgod  is amazing',
    //         color: '#b7daff',
    //         type: 'right', // should be `top` `bottom` or `right`
    //     },
    //     function () {
    //         console.log('success',72);
    //     }
    // );
}

onMounted(() => {
    init()
})
</script>

<style scoped>

/deep/ .dplayer-danmaku-move {
    animation-name: danmaku !important;
    animation-play-state: running !important;
}

/deep/ .dplayer-notice {
    display: none !important;
}
</style>
-->
