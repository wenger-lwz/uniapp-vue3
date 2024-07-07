<template>
  <div class="overflow-hidden">
    <NuxtImg
      :modifiers="{
        interlace: 1,
      }"
      :src="src || 'https://imgs.chuhai-bang.com/oss/5643xcrwee3.svg'"
      format="webp"
      provider="qiniu"
      loading="lazy"
      v-bind="$attrs"
      @load="OnLoadImg"
      @error.native="onError"
      :style="{ filter }"
      class="transition-all wh-full"
      :placeholder="placeholder"
      ref="img"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string | null | undefined
}
const placeholder = ref<any>(true)
const filter = ref('blur(6px)')
const OnLoadImg = () => {
  filter.value = ' blur(0px)'
}
const img = ref()
const onError = () => {
  filter.value = ' blur(0px)'
  placeholder.value = 'https://imgs.chuhai-bang.com/oss/5643xcrwee3.svg'
}
onMounted(() => {
  img.value.$el.onerror = onError
})
defineProps<Props>()
</script>
