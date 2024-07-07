<template>
  <section class="flex flex-col justify-center text-sm font-medium text-white md:py-110px py-5 w-full">
    <div
      class="flex md:(aspect-[1.846] w-full rounded-none ) relative flex-col justify-center w-full max-md:max-w-full aspect-1.35 rounded overflow-hidden"
    >
      <sps-img :src="datas.backgroundImage" :alt="datas?.altText" class="object-cover absolute inset-0 w-full h-full" />
      <div
        class="flex relative flex-col items-start justify-center wh-full px-10px md:px-80px"
        :style="{ backgroundColor: `rgba(0, 0, 0, ${datas.overlayOpacity}%)` }"
      >
        <h3 class="font-normal mt-10px text-3 md:text-3.5 font-[--subTitle] leading-relaxed">
          {{ datas.subTitle }}
        </h3>
        <h2 class="leading-7 text-4 md:text-11 max-md:max-w-full font-[--title] mt-1 md:mt-3">{{ datas.title }}</h2>
        <div
          class="mt-0.1875 md:mt-4.5 mb-28 text-2.5 md:text-3.5 md:leading-6 uppercase max-md:mb-14px max-md:max-w-full"
          v-html="datas.desc"
        ></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  datas: {
    backgroundImage: string
    altText?: string
    title: string
    subTitle: string
    desc: string
    overlayOpacity?: number
  }
}

defineProps<Props>()
</script>
