<template>
  <uni-collapse>
    <uni-collapse-item class=" text-white">
      <template v-slot:title>
        <slot name="title">
          <text class="text">title，可自定义内容及样式</text>
        </slot>

      </template>
      <slot name="content" class="bg-transparent">
        <text class="text">折叠内容主体，可自定义内容及样式</text>
      </slot>
    </uni-collapse-item>
  </uni-collapse>
</template>

<script setup lang="ts">

</script>

<style scoped>
.uni-collapse {
  background-color: transparent;
}

.uni-collapse-item {
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
}

/deep/ .uni-collapse-item__title.uni-collapse-item-border {
  border: none;
}
</style>