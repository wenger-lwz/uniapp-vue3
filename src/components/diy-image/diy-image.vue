<template>
    <view>
        <image :src="src" :mode="mode" @error="imgError"
               class="w-full h-full"
               :style="'width:'+(width<1?width*100+'%':width+'px')+'; ' +
                'height: '+(height<1?height*100+'%':height+'px')+'; background-image: url('+alt+'); ' +
                 'background-size:'+(width<1?width*100+'%':width+'px')+' '+(height<1?height*100+'%':height+'px')+';' +
                  'background-repeat: no-repeat;'+'background-size: 100% 100%;'">

        </image>
    </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'

let url = ref('')
const {src, alt, mode = 'center', width = 1, height = 1} = defineProps(['src', 'alt', 'mode', 'width', 'height'])

function imgError() {
    url.value = alt;
}

</script>

<style>

</style>
