<template>
  <section class="py-120px" style="width: 100%">
    <div class="s-title w-full mb-30px font-semibold">{{ datas.text }}</div>
    <!-- PC端 -->
    <div class="w-100% hidden md:block">
      <n-grid :x-gap="12" :y-gap="12" :cols="datas.columns" responsive="self">
        <n-grid-item v-for="(item, index) in datas.content" :key="index">
          <NuxtLink :to="item.handle ? '/collections/' + item.handle : '/'">
            <sps-img
              fit="cover"
              class="rd-4px hover:scale-103 transition-500 aspect-389/367"
              width="388"
              height="367"
              :src="item.image"
            />
            <div class="m-t18px m-b40px text-neutral-900 text-base font-600 leading-normal tracking-tight">
              {{ item.name }}
            </div>
          </NuxtLink>
        </n-grid-item>
      </n-grid>
    </div>
    <!-- 移动端 -->
    <div class="w-100% block md:hidden">
      <n-grid v-if="datas.slide == false" :x-gap="12" :y-gap="12" cols="2 ">
        <n-grid-item v-for="(item, index) in datas.content" :key="index">
          <NuxtLink :to="item.handle ? '/collections/' + item.handle : '/'">
            <sps-img :src="item.image" class="rd-4px" alt="" style="width: 100%; aspect-ratio: 161/152" />
            <div class="m-t22px m-b40px text-neutral-900 text-14px font-600 leading-normal tracking-tight">
              {{ item.name }}
            </div>
          </NuxtLink>
        </n-grid-item>
      </n-grid>
      <n-carousel
        v-if="datas.slide == true"
        :show-dots="false"
        draggable
        :slides-per-view="1"
        :space-between="15"
        :loop="false"
      >
        <n-carousel-item v-for="(item, index) in datas.content" :key="index">
          <NuxtLink :to="item.handle ? '/collections/' + item.handle : '/'">
            <sps-img :src="item.image" class="rd-4px" alt="" style="width: 100%; aspect-ratio: 161/152" />
            <div class="m-t1.37 m-b2.5 text-neutral-900 text-14px font-normal leading-normal tracking-tight">
              {{ item.name }}
            </div>
          </NuxtLink>
        </n-carousel-item>
      </n-carousel>
    </div>

    <NSpace justify="center">
      <nuxt-link to="/collections">
        <n-button type="primary" class="h-10 px-6 py-[9px] justify-center items-center gap-6 inline-flex">
          {{ datas.buttonText }}
        </n-button>
      </nuxt-link>
    </NSpace>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  /**  分类列表1 */
  name: 'ProductCategory1',
})
defineProps<{
  datas: ProductCategory1
}>()

interface Content {
  image: string
  name: string
  [k: string]: any
}

interface ProductCategory1 {
  blocks: any[]
  content: Content
  name: string
  text: string
  columns: number
  buttonText: string
  slide: boolean
}
</script>
