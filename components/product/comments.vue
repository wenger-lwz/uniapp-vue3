<template>
  <n-space v-if="comment?.list" vertical class="md:mt76px mt32px w-100% px-20px md:px-0px min-h-sm">
    <div
      class="flex-center justify-between items-start md:items-center flex-col md:flex-row border-b-1px border-color-#E1E3E5 w-100% pb16px md:p-b28px"
    >
      <p class="text-16px md:text-22px w-full color-#000 font-600">{{ $t('product.goods_comment') }}</p>
      <n-select
        v-model:value="comments"
        size="large"
        class="w130px md:w280px hidden md:block"
        :options="commentsOptions"
      />
      <div class="flex justify-start w-full mt12px md:hidden flex-wrap gap-5">
        <n-button
          v-for="(btn, index) in commentsOptions"
          :key="index"
          type="tertiary"
          strong
          secondary
          style="height: 28px"
          class="mr10px text-12px"
          @click="comments = btn.value"
        >
          {{ btn.label }}
        </n-button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="flex-center"></div>

    <!-- 评论列表 -->
    <div
      v-for="tlk in comment?.list"
      :key="tlk.id"
      class="m-t14px border-b-1px border-color-#E1E3E5 mt-0 w-100% py10px md:py-20px"
    >
      <n-spin :show="pending">
        <div class="w-100% flex">
          <div class="w26px h26px rd-13px md:w36px md:h36px md:rd-18px bg-#ccc text-25px color-#FFF flex-center">
            {{ tlk.username[0] }}
          </div>

          <!-- 评论详情 -->
          <n-space vertical class="ml10px md:m-l20px grow">
            <n-rate readonly :default-value="tlk.star * 1" />
            <div class="w-100% mb-10px text-14px">
              {{ tlk.content }}
            </div>
            <n-space v-if="tlk.img.length != 0">
              <sps-img
                v-for="(i, index) in tlk.img"
                :key="index"
                :src="i"
                class="w56px mr-5px md:w78px md:mr-10px aspect-39/37 w-full"
              />
            </n-space>

            <!-- 商品样式日期等 -->
            <div class="flex justify-between flex-col md:flex-row mt-5px text-14px color-#9C9C9C w-full">
              <div class="flex justify-start items-center"></div>
              <div>{{ tlk.created_at }}</div>
            </div>
          </n-space>
        </div>
      </n-spin>
    </div>
  </n-space>
</template>

<script lang="ts" setup>
import { shopremark } from '~/services/api'
const props = defineProps<{
  /**  商品数据 */
  gooddata: any
}>()
const { t } = useI18n()
/**  评论 */
const comments = ref('0')

/**
 * 评论选项
 * */
const commentsOptions = computed(() => {
  return [
    {
      label: t('product.defualt'),
      value: '0',
    },
    {
      label: t('product.latest'),
      value: '1',
    },
    {
      label: t('product.highest'),
      value: '2',
    },
    {
      label: t('product.lowest'),
      value: '3',
    },
  ]
})

const nuxtApp = useNuxtApp()
const route = useRoute()

const { data: comment, pending } = await useAsyncData(
  route.path + 'comment',
  () =>
    shopremark({
      dt: 'reviews',
      ctype: comments.value,
      product_id: props.gooddata.product.id,
      onlyimg: 0,
      limit: 10,
      page: 1,
    }),
  {
    watch: [comments],
    transform: (data: any) => data?.data?.data,
    lazy: process.client,
    getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  }
)
</script>

<style></style>
