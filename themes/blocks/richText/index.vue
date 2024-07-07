<template>
  <section class="py-65px w100% items-start justify-center flex-col md:items-center" style="">
    <n-space :justify="datas.text_aling" class="w-100%">
      <div class="max-w-full s-title font-semibold">{{ datas.title }}</div>
    </n-space>
    <n-space v-if="datas.dec != ''" class="mt-22px mb-26px" justify="center">
      <div class="text-wrap hidden md:block w-1160px" :style="`text-align: ${datas.text_aling}`">
        <n-ellipsis
          expand-trigger="click"
          :tooltip="false"
          :line-clamp="datas.pc_lineHeight ? 3 : ''"
          style="max-width: 100%"
          v-html="datas.dec"
          class="break-all"
        />
      </div>

      <div class="w-full text-wrap block md:hidden">
        <n-ellipsis
          expand-trigger="click"
          :tooltip="false"
          :line-clamp="datas.mob_lineHeight ? 2 : ''"
          style="max-width: 100%"
          v-html="datas.dec"
          class="break-all"
        />
      </div>
    </n-space>
    <n-space v-if="datas.buttonName != ''" :justify="datas.buttonTextheight">
      <nuxt-link :href="datas.buttonLink">
        <n-button :style="'background-color:' + datas.buttonColor + ';'" type="primary">
          {{ datas.buttonName }}
        </n-button>
      </nuxt-link>
    </n-space>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RichText',
})
defineProps<{
  datas: any
}>()
// console.log(datas)
</script>
