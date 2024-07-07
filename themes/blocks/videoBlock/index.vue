<template>
  <section class="w-full">
    <!-- 视频区域 -->
    <div class="w-full h-[494px] rounded flex-center relative">
      <!-- :style="`background-image: url('${datas.videoImg}')`" -->
      <video
        ref="video"
        autoplay
        muted
        loop
        controls
        class="w-full h-full absolute object-fill"
        :src="datas.videoSrc"
        :poster="datas.videoImg"
      ></video>
      <div v-if="!playing" class="lg:w-[561px] h-[299px] w-full lg:bg-black lg:bg-opacity-50 rounded flex-center z-1">
        <div class="flex-col-center">
          <n-ellipsis :line-clamp="2" class="w-full text-center text-white text-[52px] font-normal">
            {{ datas.title }}
          </n-ellipsis>
          <n-button @click="togglePlaying" text>
            <icon-playVideo class="text-4xl" />
          </n-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'VideoBlock',
})
defineProps<{
  datas: any
}>()
import { useMediaControls } from '@vueuse/core'
const video = ref()
const { playing, currentTime, duration, volume } = useMediaControls(video)
let observer: IntersectionObserver | null = null

const checkIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      video.value!.play()
      // videoRef.value!.play();
    } else {
      video.value!.pause()
    }
  })
}
const togglePlaying = () => {
  if (video.value) {
    if (video.value.paused) {
      video.value.play()
    } else {
      video.value.pause()
    }
  }
}
onMounted(() => {
  if (video.value) {
    observer = new IntersectionObserver(checkIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    })

    observer.observe(video.value)
  }
})

onUnmounted(() => {
  if (observer && video.value) {
    observer.disconnect()
  }
})
</script>
