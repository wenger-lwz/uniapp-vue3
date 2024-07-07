<template>
  <div class="flex mb-10px cursor-pointer" @click="openSizeGuideFun" v-if="isSizeShow">
    <icon-size-guide  class="w-18px h-20px ml-15px" />
    <span class="ml-10px">size guide</span>
  </div>
  <div class="max-h-400px">
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :title="productsresult.size?.title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <icon-close class="w-20px h-20px" @click="showModal = false" />
        </template>
        <div v-html="productsresult.size?.descs"></div>
        <template #footer></template>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
// import DOMPurify from 'dompurify'
// const sanitizedContent = DOMPurify.sanitize(data.value)
const { productsresult } = storeToRefs(useProductsresult())
const showModal = ref(false)

const isSizeShow = computed(() => {
  if (Object.keys(productsresult.value?.size).length === 0) {
    return false
  } else {
    return true
  }
})

const openSizeGuideFun = () => {
  showModal.value = true
}
</script>

<style>
/* .n-modal-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4); 
} */
</style>
