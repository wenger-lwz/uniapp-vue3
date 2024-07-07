<template>
  <div class="max-h-400px gdpr-cookie-layout" v-if="showCard">
    <n-card
      :style="{ width: `${gdprWidth}`, background: `${remoteData.buttonBackgroundColour}` }"
      :title="remoteData.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      class="position-fixed z-999 left-20px bottom-180px"
    >
      <template #header-extra>
        <!-- <icon-close class="w-20px h-20px" @click="showModal = false" /> -->
      </template>
      <div>
        {{ remoteData.content }}
      </div>
      <template #footer>
        <n-space>
          <n-tag
            size="large"
            :color="{
              color: `${remoteData.buttonColour}`,
              textColor: `${remoteData.buttonBackgroundColour}`,
              borderColor: 'transparent',
            }"
          >
            {{ remoteData.buttonText }}
          </n-tag>
          <n-tag
            size="large"
            :color="{
              color: `${remoteData.buttonColour}`,
              textColor: `${remoteData.buttonBackgroundColour}`,
              borderColor: 'transparent',
            }"
            @click="gdprLocalStorage"
          >
            {{ remoteData.buttonText }}
          </n-tag>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  remoteData: {
    backgroundColour: '#E13390FF'
    buttonBackgroundColour: '#ffeae4'
    buttonColour: '#ff4041'
    buttonText: 'Add To Cart'
    content: '&lt;strong>asdfasd&lt;/strong>'
    enabled: 1
    title: '88'
  }
}>()

import { useSessionStorage } from '@vueuse/core'
const showCard = ref(false)
let gdprShowCard = ref(useSessionStorage('gdpr-show-card'))

if (props.remoteData.enabled == 1 && gdprShowCard.value == null) {
  showCard.value = true
}
const gdprLocalStorage = (val: boolean) => {
  if (val) {
    gdprShowCard.value = true
    showCard.value = false
  }
}

const isClient = ref(process.client)
const gdprWidth = ref('600px')

if (isClient.value) {
  const gdpr = ref(1920)
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width } = entry.contentRect
      gdpr.value = width
    }
  })

  watchEffect(() => {
    if (gdpr.value < 768) {
      gdprWidth.value = 'calc(100% - 10%)'
    } else {
      gdprWidth.value = '600px'
    }
  })

  onMounted(() => {
    resizeObserver.observe(document.documentElement)
  })

  onUnmounted(() => {
    resizeObserver.disconnect()
  })
}
</script>

<style scoped>
.n-modal-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
}
/* ::v-deep */
</style>
