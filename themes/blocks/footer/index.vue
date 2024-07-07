<template>
  <footer class="bg-footerBgColor color-footerColor">
    <div class="border-t border-gray-200 mt-5" v-if="datas?.settings?.footer?.blocks?.length">
      <p class="w-full flex-col"></p>
      <div class="flex justify-start md:justify-center flex-wrap gap-10 flex-1 p-10">
        <template v-for="item in datas.settings.footer.blocks" :key="item.id">
          <component
            class="w-full md:w-auto"
            :id="item.id"
            :datas="item.settings"
            :item="item"
            :is="`blocks-${item.component}`"
          />
        </template>
      </div>
    </div>
    <div class="p-10px border-t border-gray-200 flex-center flex-wrap gap-5">
      <sps-img :src="item" alt="" class="h-30px object-contain" v-for="(item, index) in paymentIcons" :key="index" />
      <p>© 2024 {{ storeName }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { themeKey, paymentIcons, storeName } = storeToRefs(useThemeEditorStore())

defineOptions({
  name: 'FooterSection',
})
defineProps<{
  datas?: any
}>()
</script>

<style scoped>
:deep(.n-input__input-el) {
  height: 50px;
}
</style>
