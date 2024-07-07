<template>
  <n-space class="w-full" vertical>
    <p v-if="datas.canShowTitle" class="text-center font-bold s-title">{{ datas.title }}</p>
    <n-collapse :accordion="!!datas.effect">
      <n-collapse-item
        :style="datas.style == 2 && 'background-color: #f2f2f2'"
        v-for="(item, index) in datas.content.slice(0, datas.number)"
        :key="index"
        :title="item.question"
        :name="index"
      >
        <template v-if="datas.style == 2" #arrow="{ collapsed }">
          <div></div>
        </template>
        <template #header>
          <n-text :style="{ color: datas.question.color }" type="error">{{ item.question }}</n-text>
        </template>
        <template v-if="datas.style == 2" #header-extra="{ collapsed }">
          <div class="bg-[#f2f2f2]">
            <icon-addBtn class="text-2xl w-30px" v-show="collapsed" />
            <icon-minus class="text-2xl w-30px" v-show="!collapsed" />
          </div>
        </template>
        <div :style="{ color: datas.answer.color }" class="break-all">{{ item.answer }}</div>
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>

<script setup lang="ts">
defineProps<{
  datas: {
    style: number
    effect: boolean
    number: number
    question: {
      color: string
    }
    answer: {
      color: string
    }
    content: Array<{
      question: string
      answer: string
    }>
    type: string
    title: string
    canShowTitle: boolean
  }
}>()
</script>

<style scoped lang="scss">
:deep(.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main) {
  padding: 10px;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__header) {
  padding: 0;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
  border: 1px solid #f2f2f2;
  border-top: 0;
  padding: 10px;
}
</style>
