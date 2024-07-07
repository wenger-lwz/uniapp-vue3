<template>
  <section class="py-65px" style="width: 100%">
    <div class="mx-auto max-w-screen-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="z-10 lg:py-16">
          <div class="h-628px sm:h-80 lg:h-full">
            <sps-img
              alt="House"
              :src="datas.content.mob_img"
              class="block md:hidden h-428px rd-4px h-full w-full object-cover"
            />
            <sps-img
              alt="House"
              :src="datas.content.pc_img"
              class="hidden md:block h-628px rd-4px h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="relative flex items-center bg-gray-100">
          <span class="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

          <div class="p-8 sm:p-16 lg:p-24">
            <h2 class="font-bold s-title">{{ datas.content.title }}</h2>

            <div class="mt-4 text-gray-600" v-html="datas.content.dec"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'About',
})
defineProps<{
  datas: any
}>()
</script>

<style scoped lang="scss"></style>
