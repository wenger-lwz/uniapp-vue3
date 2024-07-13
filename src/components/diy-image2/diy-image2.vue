<template>
  <view class="uni-image-box" :class="{loaded, loadError, withoutBg}">
    <image :src="src" :lazy-load="lazyLoad" :mode="mode" class="uni-image" v-if="!loadError" @load="loaded = true" @error="loadError = true; loaded = true"></image>
    <image class="holder" mode="aspectFit" src="/static/img/hb-icon-gray.png" v-if="!loaded"></image>
  </view>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from "vue"
import { isNum } from "@/utils"
const props = defineProps({
  src: { // 图片地址（必传）
    type: String
  },
  width: { // 图片宽度（默认40rpx，传number类型则为rpx，传字符串则直接为字符串的值）
    type: null,
    default() {
      return 40
    }
  },
  height: { // 同width属性
    type: null,
    default() {
      return 40
    }
  },
  mode: { // 裁剪方式，详情见uniapp image组件， 默认aspectFit
    type: String,
    default() {
      return 'aspectFit'
    }
  },
  display: { // 默认inline-block
    type: String,
    default() {
      return 'block'
    }
  },
  withoutBg: { // 默认加载完不带背景，如果为false，则带一个#ececec背景
    type: Boolean,
    default() {
      return true
    }
  },
  defaultSrc: { // 加载失败后的图片，默认为灰白背景、中间灰色的黑白艺术字(以背景图的形式展示)
    type: String,
    default() {
      return 'url("/static/img/default.png") no-repeat center/contain, #ececec'
    }
  },
  round: { // 圆角属性，默认为0直角
    type: String,
    default() {
      return '0'
    }
  },
  lazyLoad: { // 是否懒加载，默认为false
    type: Boolean,
    default() {
      return false
    }
  }
})
const loaded = ref<boolean>(false), loadError = ref<boolean>(false)
const { src, mode, display, defaultSrc, round } = toRefs(props)
const width = computed(() => {
  return isNum(props.width) ? `${props.width}rpx` : props.width
})
const height = computed(() => {
  return isNum(props.height) ? `${props.height}rpx` : props.height
})
</script>
<style lang="scss">
.uni-image-box {
  position: relative;
  display: v-bind(display);
  width: v-bind(width);
  height: v-bind(height);
  @include fc;
  @include skeletonAni;
  border-radius: v-bind(round);
  &.loaded {
    animation: none;
    background: #ececec;
    &.withoutBg {
      background: transparent;
    }
    .uni-image {
      opacity: 1;
    }
  }
  &.loadError {
    background: v-bind(defaultSrc) !important;
    .uni-image {
      opacity: 0;
    }
  }
  .uni-image {
    width: v-bind(width);
    height: v-bind(height);
    opacity: 0;
    border-radius: v-bind(round);
  }
  .holder {
    position: absolute;
    left: 50%;
    top: 50%;
    @include rwh(40, 40);
    margin-left: -20rpx;
    margin-top: -20rpx;
  }
}
</style>