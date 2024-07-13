<template>
    <view class="indexBottom bg-gray-200"></view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {judgePlatform} from '@/utils'
let osHeight = ref(`${judgePlatform().bottom}px`)
</script>

<style scoped>
.indexBottom {
    height: v-bind(osHeight)
}
</style>
