<template>
  <section class="flex flex-col px20px md:px5 w-full py-65px">
    <!-- 专辑详情 -->
    <div class="block md:hidden w-full">
      <!-- 移动 -->
      <div v-if="route.params.all[1]" class="w100% font-500 text-center text-black text-18px">
        {{ $t('album.albumDetails') }}
      </div>
      <div v-else class="w100% font-500 text-center text-black text-18px">{{ $t('album.searchResults') }}</div>
      <!-- <!== 搜索框 ==>
      <div class=" w-100% h-38px flex items-center bg-#F8F8F8 rounded-4px mt20px">
        <div class=" w-3 h-3 mx-12px">
          <n-button text>
            <icon-resch class=" color-#9C9C9C" />
          </n-button>
        </div>
        <input class=" flex-1 w-full h-full rounded outline-none bg-#F8F8F8 color-#8D8D8D text-xs font-normal" @change="searchProduct" />
      </div> -->
      <div class="w-full flex justify-between my10px items-center">
        <!-- <div class=" text-center text-4">{{ pageData?.data?.collection?.title || pageData?.data?.collection?.act || '' }}</div> -->
        <div class="text-black text-base font-medium" v-if="productTitle">{{ productTitle }}</div>
        <div class="text-neutral-400 text-xs font-normal">
          {{ albumlist?.products ? albumlist?.products.length : 0 }} {{ $t('album.goods') }}
        </div>
        <n-select
          v-model:value="sort"
          class="w-144px"
          size="medium"
          :options="sortOptions"
          :placeholder="$t('album.sortingMode')"
          @update:value="changeSort"
        />
      </div>
      <!-- 排序方式 -->
      <!-- <n-grid
        v-if="albumlist?.products && albumlist.products.length"
        cols="3"
        x-gap="13"
        y-gap="10"
        item-responsive
        responsive="screen"
        class="my16px"
      >
        <n-grid-item v-for="navs in sortOptions" :key="navs.value" span="1" @click="changeSort(navs.value)">
          <n-ellipsis
            :line-clamp="1"
            :style="sort == navs.value ? 'background-color: #18a058;color: #FFF;' : ''"
            class="w-full bg-#F5F5F5 text-12px color-#000 rounded-md text-center flex-center px-8px line-height-34px"
          >
            {{ navs.label }}
          </n-ellipsis>
        </n-grid-item>
      </n-grid> -->
    </div>
    <!-- PC头 -->
    <div class="hidden md:block w-full max-md:mt-10">
      <!-- <div class=" text-center text-9.5">{{ pageData?.data?.collection?.title || pageData?.data?.collection?.act || '' }}</div> -->
      <div class="w-full s-sub-title font-medium leading-10 text-center self-center whitespace-nowrap">
        {{ productTitle }}
      </div>
      <div class="self-center w-full flex max-w-full justify-between gap-5 my30px items-center flex-wrap">
        <div class="text-base leading-6 tracking-wider grow whitespace-nowrap">
          {{ albumlist?.products ? albumlist.products?.length : 0 }} {{ $t('album.goods') }}
        </div>
        <n-select
          v-model:value="sort"
          class="md:w-288px"
          size="large"
          :options="sortOptions"
          :placeholder="$t('album.sortingMode')"
          @update:value="changeSort"
        />
      </div>
    </div>
    <!-- 商品列表 -->
    <n-spin :show="pending" size="large">
      <div class="w-full gap-x-10px gap-y-10px md:gap-x-10px md:gap-y-20px flex flex-wrap flex-content-evenly">
        <div
          v-if="albumlist?.products && albumlist?.products?.length"
          v-for="product in albumlist.products"
          :key="product.id"
          class="w-[calc(33.33%-10px)] md:w-[calc(25%-20px)]"
        >
          <nuxt-link class="text-black text-base leading-6 tracking-wider" :to="'/products/' + product.handle || ''">
            <sps-img
              :src="product.thumbs"
              object-fit="cover"
              class="w-full aspect-[1] hover:scale-103 transition-500"
              :alt="product.title"
            />
            <n-ellipsis :line-clamp="2" class="text-14px font-400 md:text-16px mt6px md:mt18px w-100%">
              {{ product.title }}
            </n-ellipsis>
            <div class="text-16px font-600 color-price">{{ formatPrice(product.price) }}</div>
          </nuxt-link>
        </div>
        <!-- 空内容 -->
        <n-empty v-else :show-description="false" class="py60px w-full flex-center">
          <template #icon>
            <sps-img style="width: 40px; height: 40px" src="/image/emptyicon.png" alt="" />
          </template>
          <template #extra>
            <div class="text-center text-neutral-800 text-18px md:text-[32px] font-medium">
              {{ $t('album.noData') }}
            </div>
          </template>
        </n-empty>
      </div>
    </n-spin>
    <!-- 分页 -->
    <!-- 加载更多提示或分页器 -->
    <div class="justify-center items-stretch self-center flex gap-1 mt-28 px-5 max-md:my-10">
      <div v-if="isSingleColumn">
        <div v-if="isLoading" class="text-center">{{ $t('album.loading') }}</div>
        <div v-else class="text-center color-#ccc">{{ $t('album.bottomLine') }}</div>
      </div>
      <div v-else>
        <n-pagination v-model:page="currentPage" :page-count="pageCount" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getAlbumdatail, getSeachlist } from '@/services/api/index'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

defineOptions({
  name: 'AlbumDatail',
})
defineProps<{
  datas: any
}>()
/**  当前页码 */
const currentPage = ref(1)

/** 页容量  */
const pageSize = ref(12)

/**  排序规则 */
const sort = ref('views')

/**  加载状态 */
const isLoading = ref(false)

/**  商品标题 */
const productTitle = ref<any>('Product album')

/**  安全检查 */
const isSingleColumn = ref(typeof window !== 'undefined' && window.innerWidth <= 750) // 安全检查

/**  查询数据 */
const querydata = ref<any>()

/**  排序选项 */
const sortOptions = computed(() => {
  return [
    { label: t('album.priceDescendingOrder'), value: 'price-descending' },
    { label: t('album.priceAscending'), value: 'price-ascending' },
    { label: t('album.Manual'), value: 'manual' },
    { label: t('address.releaseTime'), value: 'published-descending' },
    { label: t('album.bestSelling'), value: 'best-selling' },
    { label: t('album.addCart'), value: 'add_to_cart_count' },
    { label: t('album.viewVolume'), value: 'views' },
  ]
})

/**  数据列表 */
const listdata = ref<any>()

/**  搜索数据 */
const searchData = ref<any>()

/**  判断路由数据 */
if (route.params.all[1]) {
  querydata.value = route.params.all[1]
  productTitle.value = route.query.name
  listdata.value = {
    key: querydata.value,
    data: {
      limit: pageSize.value,
      page: currentPage.value,
      sort_by: sort.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
    },
  }
} else if (route.query.keyword) {
  productTitle.value = route.query.keyword
  querydata.value = route.query.keyword
  searchData.value = {
    limit: pageSize.value,
    page: currentPage.value,
    sort_by: sort.value,
    q: querydata.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
  }
}

// /**  获取上下文数据 */
// const pageData = inject<Ref<any>>('data')

// PC端
const nuxtApp = useNuxtApp()

/**  同构获取数据 */
const {
  data: albumlist,
  pending,
  refresh,
} = await useAsyncData(
  route.path,
  async () => {
    if (route.params.all[1]) {
      const res: any = await getAlbumdatail({
        key: querydata.value,
        data: {
          limit: pageSize.value,
          page: currentPage.value,
          sort_by: sort.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
        },
      })
      return res.data.data
    } else {
      const res: any = await getSeachlist({
        limit: pageSize.value,
        page: currentPage.value,
        sort_by: sort.value,
        q: querydata.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
      })
      return res.data.data.search.results
    }
  },
  {
    lazy: process.client,
    watch: [currentPage],
    getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  }
)

// albumlist.value = data.value?.list

/**  获取总页数 */
const pageCount = computed(() => {
  if (albumlist.value?.count && pageSize.value) {
    return Math.ceil(albumlist.value.count / pageSize.value)
  }
})

/**  移动端上拉加载更多数据 */
const fetchMoreProducts = async () => {
  if (!albumlist.value.has_more && isLoading.value) {
    return
  }
  isLoading.value = true
  // 模拟加载更多数据

  if (route.params.all[1]) {
    const res: any = await getAlbumdatail(listdata.value)
    if (res.data.code === 200) {
      const newProducts = res.data.data
      listdata.value.data.page = listdata.value.data.page + 1
      if (albumlist.value.products == undefined) {
        albumlist.value = newProducts
      } else {
        albumlist.value.products.push(...newProducts.products)
        albumlist.value.has_more = newProducts.has_more
      }
    }
  } else {
    const res: any = await getSeachlist(searchData.value)
    searchData.value.page = searchData.value.page + 1
    const newProducts = res.data.data.search.results

    if (albumlist.value.products == undefined) {
      albumlist.value = newProducts
    } else {
      albumlist.value.products.push(...newProducts.products)
      albumlist.value.has_more = newProducts.has_more
    }
  }

  isLoading.value = false
}

/**  窗口大小改变 */
const handleResize = debounce(() => {
  if (process.client) {
    isSingleColumn.value = window.innerWidth <= 750
  }
}, 300)

/**  滚动条事件 */
const handleScroll = debounce(() => {
  if (!isSingleColumn.value || isLoading.value || !albumlist.value.has_more) return
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    fetchMoreProducts()
  }
}, 300)

/**  监听路由参数 'keyword' */
watch(
  () => route.query.keyword,
  (newKeyword, oldKeyword) => {
    if (newKeyword !== oldKeyword) {
      location.reload()
    }
  }
)

/**  组件挂载 */
onMounted(() => {
  // fetchProducts()
  if (process.client) {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  }
})

/**  组件卸载 */
onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
  }
})

// /**  PC端分页 */
// const fetchMore = (val: any) => {
//   currentPage.value = val
//   if (route.params.all[1]) {
//     listdata.value.data.page = val
//   } else {
//     searchData.value.page = val
//   }
//   refresh()
// }

/**  加载更多 */
const fetchMores = (val: any) => {
  pageSize.value = val
  currentPage.value = 1
  if (route.params.all[1]) {
    listdata.value.data.limit = val
    listdata.value.data.page = 1
  } else {
    searchData.value.limit = val
    searchData.value.page = 1
  }
  refresh()
}

/**  切换排序方式 */
const changeSort = (val: any) => {
  sort.value = val
  if (route.params.all[1]) {
    listdata.value.data.page = 1
    listdata.value.data.sort_by = val
  } else {
    searchData.value.page = 1
    searchData.value.sort_by = val
  }
  refresh()
}

/**  搜索 */
const searchProduct = (val: any) => {
  searchData.value = {
    limit: pageSize.value,
    page: currentPage.value,
    sort_by: sort.value,
    q: val.target.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
  }
  route.query.id = null
  productTitle.value = val.target.value
  querydata.value = val.target.value
  refresh()
}
</script>

<style lang="scss" scoped>
:deep(.n-pagination .n-pagination-item:not(.n-pagination-item--disabled).n-pagination-item--active) {
  // background: var(--primary);
  color: #fff;
  // border: var(--n-item-border-active);
}
</style>
