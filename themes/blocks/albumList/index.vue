<template>
  <section class="items-center flex flex-col w-full">
    <n-spin :show="pending" class="w-full h-full">
      <!-- 移动 -->
      <!-- <div class=" w-full block md:hidden">
        <div class=" w100% font-500 text-center text-black text-18px">{{ $t('album.albumList') }}</div>
        <!== 搜索框 ==>
        <div class=" w-100% h-38px flex items-center bg-#F8F8F8 rounded-4px mt20px md:hideen">
          <div class=" w-3 h-3 mx-12px"><icon-resch class=" color-#9C9C9C" /></div>
          <input class=" flex-1 w-full h-full rounded outline-none bg-#F8F8F8 color-#8D8D8D text-xs font-normal" placeholder="CHB shop" />
        </div>
      </div> -->
      <div
        class="w-full text-black font-medium leading-10 flex justify-start md:text-center md:text-38px text-16px whitespace-nowrap mt18px md:mt-113px mb12px md:mb-40px"
      >
        {{ $t('album.albumList') }}
      </div>
      <!-- 商品列表 -->
      <div v-if="data" class="gap-10px md:gap-20px flex flex-wrap flex-content-evenly w-full">
        <div v-for="(k, v) in data" :key="v" class="w-[calc(33.33%-10px)] md:w-[calc(25%-20px)]">
          <nuxt-link :to="k.handle ? '/collections/' + k.handle : '#'">
            <div class="relative w-full mask_box">
              <sps-img
                sizes="100vw sm:50vw md:400px"
                :src="k.image"
                width="100%"
                class="object-cover aspect-1 w-full hover:blur-2px transition-all"
                fit="cover"
                :alt="k.name"
              />
              <div class="absolute top-0 left-0 w-full h-full bg-#373737 z-1 flex-center mask">
                <p class="w-full h52px text-14px flex-center bg-#FFFFFF bg-opacity-60 color-#000"></p>
              </div>
              <p
                class="mask_text absolute top-50% left-50% font-600 wh-full text-14px flex-center ellipsis-text bg-transparent color-#000 z-22"
                style="transform: translate(-50%, -50%)"
              >
                {{ $t('album.vciewDetails') }}
              </p>
            </div>
            <n-ellipsis :line-clamp="2" class="s-sub-title font-normal mt8px md:mt18px md:mb-8px ellipsis-text w-100%">
              {{ k.name }}
            </n-ellipsis>
          </nuxt-link>
        </div>
      </div>
      <!-- 空内容 -->
      <n-empty v-else :show-description="false" class="py60px w-full flex-center">
        <template #icon>
          <sps-img style="width: 40px; height: 40px" src="/image/emptyicon.png" alt="" />
        </template>
        <template #extra>
          <div class="text-center text-neutral-800 text-18px md:text-[32px] font-medium">{{ $t('album.noData') }}</div>
        </template>
      </n-empty>
    </n-spin>
  </section>
</template>
<script setup lang="ts">
import { getAlbumlist } from '@/services/api/index'

const router = useRouter()
const nuxtApp = useNuxtApp()

defineOptions({
  name: 'SearchResults',
})
defineProps<{
  datas: any
}>()
const route = useRoute()
const { data, pending } = await useAsyncData(route.path, () => getAlbumlist(), {
  transform(data) {
    return data?.data?.data
  },
  default() {
    return []
  },
  lazy: process.client,
  getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
})

// const RouterTo = (handle: any) => {
//   if (handle) {
//     router.push({ path: '/collections/' + handle })
//   }
// }
</script>

<style scoped lang="scss">
.mask,
.mask_text {
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
}
.mask_box:hover .mask {
  opacity: 0.6;
}
.mask_box:hover .mask_text {
  opacity: 1;
}
:deep(.n-card > .n-card__content) {
  padding: 0;
}
</style>
