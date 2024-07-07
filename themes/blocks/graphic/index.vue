<template>
  <!-- 图文模块 -->
  <section class="graphic_box flex-col md:flex-row">
    <div class="w-full md:p-r2 md:w-500px w-100%">
      <sps-img class="imgs block md:hidden rd-4px" :src="datas.content.mob_img" alt="" />
      <sps-img class="imgs hidden md:block rd-4px" :src="datas.content.pc_img" alt="" />
    </div>
    <div class="w-full md:w-53/100">
      <div class="content_titel s-title">
        {{ datas.content.title }}
      </div>
      <div class="content_dec s-sub-title" v-html="datas.content.dec"></div>
      <n-space>
        <nuxt-link :href="datas.content.buttonLink">
          <n-button type="primary" :style="'background:' + datas.content.color + ';'">
            {{ datas.content.buttonName }}
          </n-button>
        </nuxt-link>
      </n-space>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Graphic',
})
defineProps<{
  datas: any
}>()
</script>

<style scoped lang="scss">
.graphic_box {
  // background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* background: #F4F4F4; */
}
.img_box {
  width: 500px;
  /* padding-right:20px; */
}
.imgs {
  width: 100%;
  /* aspect-ratio: 618/320; */
}
.content_titel {
  // color: #1c1c1c;
  // font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  line-height: 46px;
}
.content_dec {
  // color: #545454;
  font-style: normal;
  font-weight: 400;
  margin: 12px 0 20px 0;
}
</style>
