<template>
  <n-spin :show="pending">
    <n-flex v-if="data?.articles?.length" justify="center" align="center" class="mt-10" :size="40">
      <p class="s-title font-medium leading-10 text-left w-full">{{ data?.cat?.title }}</p>
      <nuxt-link
        :href="item?.url"
        v-for="(item, index) in data.articles"
        :key="index"
        class="w-full items-start justify-center flex-col md:items-center"
        style=""
      >
        <sps-img height="600" :src="item?.image?.src" class="w-full h-600px object-cover" />
        <p class="text-black text-base text-center font-medium my-20px leading-normal">{{ item?.title }}</p>
        <n-flex align="center" justify="center">
          <div class="text-neutral-400 text-sm font-normal leading-normal">{{ articlesFormattedDate(item?.published_at) }}</div>
          <div class="w-[3px] h-[3px] bg-neutral-400 rounded-full"></div>
          <div class="text-neutral-400 text-sm font-normal leading-normal">{{ item?.author }}</div>
        </n-flex>
      </nuxt-link>
      <n-pagination v-model:page="pagination.page" :page-count="pageCount" />
    </n-flex>
    <div v-else>
      <ErrorsRoutingNotFound />
    </div>
  </n-spin>
 
</template>

<script setup lang="ts">
import { getBlogDetailListAPI } from '~/services/api/blog'

defineOptions({
  name: 'Pages',
})
defineProps<{
  datas: any
}>()

const route = useRoute()

/**  分页选择数据 */
const pagination = ref({
  page: 1,
  per_page: 4,
})

const { data, pending, error, refresh } = await useAsyncData(
  () => getBlogDetailListAPI(route.params?.all[2] as any, pagination.value),
  {
    transform(data: any) {
      return data?.data
    },
    lazy: process.client,
    watch: [pagination.value],
  }
)

/**  总页数 */
const pageCount = computed(() => {
  return Math.ceil(data.value?.count / pagination.value.per_page)
})
// console.log(data.value)

/**  格式化UTC时间 */
const articlesFormattedDate = (value: string | number | Date) => {
  const date = new Date(value);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(/\//g, '-');
};
</script>

<style lang="scss" scoped>
:deep(.n-pagination .n-pagination-item:not(.n-pagination-item--disabled).n-pagination-item--active) {
  background: #22ac35;
  color: #fff;
  border: var(--n-item-border-active);
}
</style>
