<template>
  <nav class="mx-w-36 flex-col gap-5 items-start">
    <div class="font-bold font-medium leading-tight s-sub-title">{{ datas.title }}</div>
    <nuxt-link
      v-for="(i, index) in item.content?.son || []"
      :key="index"
      :href="i.url"
      class="text-sm font-normal leading-tight"
    >
      {{ i.name }}
    </nuxt-link>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'QuickNavigation',
})
defineProps<{
  datas: any
  item: any
}>()
</script>
