<template>
  <section class="w-full md:py-65px py-5">
    <h2
      v-if="datas.showTitle"
      class="text-5 mb-2 font-bold md:s-title font-medium mx-auto md:mb-38px font-leading-[43px]"
      :style="{
        textAlign: datas.alignItems,
      }"
    >
      {{ datas.title }}
    </h2>
    <div class="w-full flex-col md:(flex-row flex-justify-start flex-nowrap) flex-items-baseline gap-[18px] flex-wrap">
      <div
        class="flex-col w-full md:(w-1/3 gap-[30px]]) justify-start items-center gap-10px flex"
        v-for="i in datas.content"
        :key="i.id"
      >
        <sps-img class="w-full aspect-1 rounded-lg object-cover" :src="i.img" />
        <div class="flex-col justify-start items-center gap-[10px]">
          <h2 class="text-black text-4 md:s-title text-base text-center font-normal leading-relaxed ellipsis-text">
            {{ i.title }}
          </h2>
          <h4
            v-html="i.desc"
            class="w-full text-center s-sub-title text-3.5 text-zinc-400 font-normal leading-snug ellipsis-text"
          ></h4>
          <nuxt-link v-if="i.showBtn" :to="i.buttonLink">
            <n-button text class="text-center text-zinc-500 font-normal leading-snug">
              <span class="text-3.5">{{ i.buttonName }}</span>
            </n-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ImageList2',
})
defineProps<{
  datas: {
    title: string
    subTitle: string
    desc: string
    buttonName: string
    buttonLink: string
    alignItems: string
    style: string
    showTitle: boolean
    content: {
      showBtn: boolean
      id: number
      img: string
      active: boolean
      title: string
      desc: string
      buttonName: string
      buttonLink: string
    }[]
  }
}>()
</script>
