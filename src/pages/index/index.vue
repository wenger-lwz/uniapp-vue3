<template>
    <view class=" w-full h-full">
        <text class="absolute top-10 right-5 text-white z-10 bg-gray-500 px-3 py-0.5 rounded" @click="toHome">跳过
            {{ num }}
        </text>
        <image class="absolute w-full h-full" src="@img/12.png" alt=""/>
        <image class="absolute w-24  h-24  left-1/2 top-10  transform -translate-x-1/2 " src="@img/13.png"
               alt=""/>
        <image class="absolute   h-12 w-1/2  top-36  left-1/4 " src="@img/14.png" alt=""/>
        <image class="absolute   h-8  w-3/4  top-56  left-1/2 transform -translate-x-1/2" src="@img/15.png" alt=""/>
        <image class="absolute   h-16  w-1/3  bottom-4  left-1/2 transform -translate-x-1/2" src="@img/16.png" alt=""/>
    </view>

</template>

<script setup lang="ts">
import {ref, onUnmounted} from 'vue'
import {query_pet_news_list} from '@/api'

let num = ref(5)
let timer = ref(0)

function toHome() {
    if (timer.value) {
        clearInterval(timer.value)
        timer.value = 0
    }
    uni.switchTab({url: '/pages/view/home/index'})
}

onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
        timer.value = 0
    }
})

async function init(url: string) {
    const {code, data}: any = await query_pet_news_list({
        petType: 1,
        subType: 1,
        title: url || undefined
    })
    if (code === 0) {
        if (data.petNewsInfoList.length) {
            let url = data.petNewsInfoList[0]['content']
            uni.showModal({ //提醒用户更新
                title: "更新提示",
                content: '有新版本，是否更新？',
                success: (res) => {
                    if (res.confirm) {
                        uni.setClipboardData({
                            data: '',
                            success: function () {
                                console.log('success');
                            }
                        });
                        downLoad(url)
                    }
                }
            })

        }
    } else {
        normal()
    }
}

function normal() {
    timer.value = setInterval(() => {
        num.value--
        if (num.value < 1) {
            clearInterval(timer.value)
            timer.value = 0
            toHome()
        }
    }, 1000)
}

function downLoad(url: string) {
    // #ifdef APP-PLUS
    let downloadPath = url
    uni.downloadFile({
        url: downloadPath,
        success: (downloadResult) => {
            if (downloadResult.statusCode === 200) {
                plus.runtime.install(downloadResult.tempFilePath, {
                    force: true // 强制更新
                }, function () {
                    console.log('install success...');
                    plus.runtime.restart();
                }, function (e) {
                    console.error(e);
                    console.error('install fail...');
                });
            }
        }
    })
// #endif
}

uni.getClipboardData({
    success: function (res) {
        console.log(res.data, 26);
        if (res.data) {
            init(res.data)
        } else {
            normal()
        }

    },
    fail: function (err) {
        console.log(err, 29);
        normal()
    },
});


</script>

<style>

</style>
