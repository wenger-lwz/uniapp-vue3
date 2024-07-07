<template>
  <section class="w100% gap-y-10px gap-x-12px py-65px">
    <div class="s-title mb-30px font-semibold">{{ datas.title }}</div>
    <div class="flex gap-y-10px gap-x-12px h-620px flex-col md:flex-row">
      <!-- 视频区域 -->
      <div class="w-full rounded overflow-hidden h-[620px] max-md:(w-full h-79.885) rounded flex-center relative">
        <video
          ref="video"
          autoplay
          muted
          loop
          controls
          class="w-full h-full absolute object-cover"
          :src="datas.videoSrc"
          :poster="datas.videoImg"
        ></video>
        <div v-if="!playing" class="md:w-[561px] h-[299px] w-full md:bg-black md:bg-opacity-50 rounded flex-center z-1">
          <div class="flex-col-center w-full">
            <n-ellipsis :line-clamp="2" class="w-full md:w-[481px] text-center s-title text-[52px] font-normal">
              {{ datas.title }}
            </n-ellipsis>
            <n-button @click="togglePlaying" text>
              <icon-playVideo class="text-4xl" />
            </n-button>
          </div>
        </div>
      </div>
      <!-- 商品区域 -->
      <div class="max-md:(gap-2.4 mt-0 justify-between) gap-20px mt-20px md:mt-0 w-full flex max-md:flex-row flex-col">
        <nuxt-link
          :to="datas.product.handle ? '/products/' + datas.product.handle : '#'"
          class="w-full max-md:w-50% block md:inline"
        >
          <n-space :wrap-item="false" class="w-full" vertical justify="start" align="left">
            <!-- 商品图片 -->
            <div class="w-full rd-4px">
              <sps-img
                :src="datas.product.thumbs"
                alt=""
                class="hover:scale-103 transition-500 w-full md:h-234px h-37.5 rd-4px object-cover"
              />
            </div>
            <div class="mt20px md:w-full text-neutral-900 text-xl font-medium leading-[30px] tracking-tight">
              {{ datas.product.title }}
            </div>
            <!-- <div class="  text-neutral-900 text-base font-600 leading-normal tracking-tight">ICONIC RATTAN BAG</div> -->
            <n-space align="center" :wrap-item="false">
              <div class="text-red-600 text-xl font-bold leading-[34.40px] tracking-wide">
                {{ formatPrice(datas.product.price) }}
              </div>
              <div class="text-#A1A1A1 text-base font-bold line-through leading-normal tracking-tight">
                {{ formatPrice(datas.product.marketPrice) }}
              </div>
            </n-space>
          </n-space>
        </nuxt-link>
        <nuxt-link
          :to="datas.classification.handle ? '/collections/' + datas.classification.handle : '#'"
          class="w-full max-md:w-50% block md:inline"
        >
          <n-flex vertical :wrap-item="true" justify="start" align="center" class="w-full">
            <div class="w-full rd-4px">
              <!-- 商品分类 -->
              <sps-img
                :src="datas.classification.image"
                alt=""
                class="hover:scale-103 transition-500 w-full md:h-234px rd-4px object-cover h-37.5"
              />
            </div>
            <div class="md:w-full text-neutral-900 text-xl font-medium leading-[30px] tracking-tight">
              {{ datas.classification.name }}
            </div>
          </n-flex>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'
import { useRouter } from 'vue-router'
const router = useRouter()

// const { playing, currentTime, duration, volume } = useMediaControls(video)
defineOptions({
  name: 'MediaSplicing',
})
defineProps<{
  datas: any
}>()
const video = ref()
const { playing } = useMediaControls(video)
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

// // 跳转商品详情
// const toGoodsDetail = (id: number) => {
//   if (!id) return
//   router.push({ path: '/products/' + id })
// }
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

// /**  路由跳转-专辑详情 */
// const routerTo = (handle: string, id: string, name: string) => {
//   if (!handle) return
//   router.push('/collections/' + handle)
// }
</script>

<style></style>
