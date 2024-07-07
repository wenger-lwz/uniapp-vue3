<template>
  <section
    class="gap-0 max-md:gap-0 flex box"
    :style="{
      'flex-direction': datas.style,
    }"
  >
    <div class="flex-col w-[50%] max-md:ml-0 max-md:w-full" :style="{ 'background-color': datas.bgColor }">
      <div
        class="flex-col self-stretch px-5 my-auto text-base text-stone-500 max-md:mt-10 max-md:max-w-full"
        :style="{
          'align-items': datas.alignItems,
          'text-align': datas.alignItems,
        }"
      >
        <h2 class="md:leading-[162.5%] text-3 md:text-4 tracking-[4.64px] max-md:max-w-full s-sub-title text-1rem">
          {{ datas.subTitle }}
        </h2>
        <h1
          class="text-base mt-0.5 md:text-9 md:mt-4 md:mt-5 text-4xl font-medium leading-10 max-md:max-w-full s-title"
        >
          {{ datas.title }}
        </h1>
        <div
          class="mt-1.5 md:mt-5 leading-7 text-3.5 md:text-4 text-stone-400 max-md:max-w-full"
          v-html="HtmlUtil.escape2Html(datas.desc)"
        ></div>
        <nuxt-link :to="datas.buttonLink">
          <n-button
            type="primary"
            class="justify-center text-3.5 w-39.5 h-10 md:(w-full) self-start px-7 py-4 mt-0.75 md:mt-5 tracking-widest whitespace-nowrap leading-[181%] md:px-5"
          >
            {{ datas.buttonName }}
          </n-button>
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
      <sps-img
        :src="datas.img"
        alt="A blue gemstone"
        class="grow w-full aspect-[1.16] max-md:mt-10 max-md:max-w-full object-cover rounded md:rounded-none"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { HtmlUtil } from '~/utils/common/htmlDecode'

defineProps<{
  datas: {
    title: string
    subTitle: string
    img: string
    desc: string
    buttonName: string
    buttonLink: string
    style: string
    alignItems: string
    bgColor: string
  }
}>()
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .box {
    flex-direction: column !important;
  }
}
</style>
