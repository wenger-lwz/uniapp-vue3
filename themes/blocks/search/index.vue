<template>
  <section class="items-center flex flex-col" style="width: 100%">
    <!-- 移动 1-->
    <div class="w-full block md:hidden">
      <!-- <n-grid cols="4" class=" mt26px md:px0">
        <n-grid-item span="1">
          <n-button text @click="router.back">
            <icon-back class=" mr-15px w18px h18px" />
          </n-button>
        </n-grid-item>
        <n-grid-item span="2">
          <div class=" w100% font-500 text-center text-black text-18px">{{ $t('headers.search') }}</div>
        </n-grid-item>
      </n-grid> -->
      <!-- 搜索框1 -->
      <div class="w-100% h-38px flex items-center bg-#F8F8F8 rounded-4px mt20px md:hideen">
        <n-input
          :disabled="pending"
          class="flex-1 w-full h-full rounded outline-none bg-#F8F8F8 color-#8D8D8D text-xs font-normal"
          placeholder=" "
          v-model:value="searchData.q"
        >
          <template #suffix>
            <div class="w-3 h-3 mx-12px"><icon-resch class="color-#9C9C9C" /></div>
          </template>
        </n-input>
      </div>
      <!-- 排序方式 -->
      <n-grid
        v-if="albumlist?.products?.length"
        cols="3"
        x-gap="13"
        y-gap="10"
        item-responsive
        responsive="screen"
        class="my16px"
      >
        <n-grid-item v-for="nabs in sortOptions" :key="nabs.value" span="1" @click="searchData.sort_by = nabs.value">
          <n-ellipsis
            :line-clamp="1"
            :style="searchData.sort_by == nabs.value ? 'background-color: #18a058;color: #FFF;' : ''"
            class="w-full bg-#F5F5F5 text-12px color-#000 rounded-md text-center flex-center px-8px line-height-34px cursor-pointer"
          >
            {{ nabs.label }}
          </n-ellipsis>
        </n-grid-item>
      </n-grid>
    </div>
    <div
      v-if="albumlist"
      class="w-full flex items-center text-black font-medium leading-10 flec justify-center md:text-center md:text-38px text-16px whitespace-nowrap mt18px md:mt-70px mb12px md:mb-30px"
    >
      {{ $t('headers.search') }}
      <div class="md:hidden text-neutral-400 text-right text-base leading-6 tracking-wider grow whitespace-nowrap">
        {{ albumlist ? albumlist?.count : 0 }} {{ $t('album.goods') }}
      </div>
    </div>
    <div class="hidden md:block w-full max-md:mt-10">
      <div class="self-center w-full flex max-w-full justify-between gap-5 my0px mb-30px items-center flex-wrap">
        <div class="text-black text-base leading-6 tracking-wider grow whitespace-nowrap">
          {{ albumlist?.count || 0 }} {{ $t('album.goods') }}
        </div>
        <n-select
          v-model:value="searchData.sort_by"
          class="md:w-288px"
          size="large"
          :options="sortOptions"
          :placeholder="$t('album.sortingMode')"
        />
      </div>
    </div>
    <!-- 商品列表 -->
    <n-spin :show="pending">
      <n-grid :cols="4" x-gap="24 750:24" y-gap="25 750:50" item-responsive>
        <template v-if="albumlist?.products?.length">
          <n-grid-item v-for="(k, v) in albumlist.products" :key="v" span="2 750:1">
            <nuxt-link :to="`/products/${k.id}`">
              <div class="relative w-full mask_box">
                <sps-img :src="k.image.src" class="object-cover aspect-1" alt="Product Image" />
                <div class="absolute top-0 left-0 w-full h-full bg-#373737 z-1 flex-center mask">
                  <p class="w-full h52px text-14px flex-center bg-#FFFFFF bg-opacity-60 color-#000"></p>
                </div>
                <p
                  class="mask_text absolute top-50% left-50% font-600 wh-full text-14px flex-center bg-transparent color-#000 z-22"
                  style="transform: translate(-50%, -50%)"
                >
                  {{ $t('product.goods_datail') }}
                </p>
              </div>
              <div>
                <n-ellipsis
                  :line-clamp="1"
                  class="text-black text-14px md:text-16px font-normal mt8px md:mt18px md:mb-0px"
                >
                  {{ k.title }}
                </n-ellipsis>
              </div>
              <div class="color-#000 font-500">{{ formatPrice(k.price) }}</div>
            </nuxt-link>
          </n-grid-item>
        </template>
        <n-grid-item v-else span="4">
          <!-- 空内容 -->
          <n-empty :show-description="false" class="py60px w-full">
            <template #icon>
              <sps-img src="/image/emptyicon.png" alt="" />
            </template>
            <template #extra>
              <div class="text-center text-neutral-800 text-18px md:text-[32px] font-medium">
                {{ $t('album.noData') }}
              </div>
            </template>
          </n-empty>
        </n-grid-item>
      </n-grid>
    </n-spin>

    <!-- 分页 -->
    <!-- 加载更多提示或分页器 -->

    <div class="justify-center items-stretch flex-wrap self-center flex gap-1 mt-28 px-5 max-md:my-10">
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :page-count="pageCount"
        :page-sizes="[12, 24, 36, 48]"
        @update:page-size="fetchMores"
        @update:page="fetchMore"
      />
      <!-- <div v-if="isSingleColumn">
        <div v-if="pending" class=" text-center">{{ $t('album.loading') }}</div>
        <div v-else class=" text-center color-#ccc">{{ $t('album.bottomLine') }}</div>
      </div> -->
      <!-- <div v-else>
        <n-pagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :page-count="pageCount"
          :page-sizes="[12, 24, 36, 48]"
          show-quick-jumper
          show-size-picker
          @update:page-size="fetchMores"
          @update:page="fetchMore"
        />
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { getSeachlist } from '@/services/api/index'
import { watchDebounced } from '@vueuse/core'
const { t } = useI18n()
const route = useRoute()
// const querydata = ref<any>()
// const productTitle = ref(route.query?.keyword || '')
const currentPage = ref(1)
const pageSize = ref(12)
// const isSingleColumn = ref(typeof window !== 'undefined' && window.innerWidth <= 750) // 安全检查

// 切换排序方式
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
// const sort = ref('views')
const router = useRouter()
// const listdata = ref<any>()
const inputChange = (val: string) => {}

/**  获取搜索数据 */
const searchData = ref({
  limit: 12,
  page: 1,
  sort_by: 'views',
  q: route.query.keyword, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
})

// if (route.params.all[1]) {
//   querydata.value = route.params.all[1]
//   productTitle.value = route.query.name
//   listdata.value = {
//     key: querydata.value,
//     data: {
//       limit: pageSize.value,
//       page: currentPage.value,
//       sort_by: sort.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
//     },
//   }
// } else if (route.query.keyword) {
//   // console.log(route.query.keyword)
//   productTitle.value = route.query.keyword
//   querydata.value = route.query.keyword
//   searchData.value = {
//     limit: pageSize.value,
//     page: currentPage.value,
//     sort_by: sort.value,
//     q: querydata.value, //排序price-descending,price-ascending,manual,published-descending,best-selling,add_to_cart_count,views
//   }
// }

defineOptions({
  /**  搜索组件 */
  name: 'SearchResults',
})

defineProps<{
  datas: any
}>()

/**  获取数据 */
const {
  data: albumlist,
  pending,
  refresh,
} = await useAsyncData('searchlist', () => getSeachlist(searchData.value), {
  transform: ({ data }) => {
    return data?.data?.search?.results
  },
  lazy: process.client,
})

// const fetchProducts = async () => {
//   if (route.params.all[1]) {
//     const res: any = await getAlbumdatail(listdata.value)
//     albumlist.value = res.data.data
//   } else {
//     const { data }: any = await getSeachlist(searchData.value)
//     // console.log('搜索结果', data)

//     albumlist.value = data.data.search.results
//   }
// }
// const changeSort = (val: any) => {
//   searchData.value.sort_by = val
// }

// const RouterTo = (handle: any) => {
//   if (handle) {
//     router.push({ path: '/products/' + handle })
//   }
// }
// PC端分页
// watch(
//   () => searchData.value,
//   (val: any) => {
//     if (val) {
//       router.push({ path: '/search', query: { keyword: val.q }, replace: true })
//       refresh()
//     }
//   }
// )

watchDebounced(
  searchData.value,
  (val: any) => {
    if (val) {
      router.push({ path: '/search', query: { keyword: val.q }, replace: true })
      refresh()
    }
  },

  { debounce: 250, maxWait: 1000 }
)

const fetchMore = (val: any) => {
  searchData.value.page = val
  // listdata.value.data.page = val
  // searchData.value.page = val
}

const fetchMores = (val: any) => {
  searchData.value.limit = val
  searchData.value.page = 1
}

// // 移动端 值改变发送请求
// const changeIptVal = debounce(async (val: any) => {
//   const { data } = await useAsyncData('list', async () => {
//     const { data } = await getSeachlist({ q: val.srcElement.value })
//     return data.data
//   })
//   albumlist.value = data.value.search.results
// }, 800)
const pageCount = computed(() => {
  if (albumlist.value?.count && pageSize.value) {
    return Math.ceil(albumlist.value.count / pageSize.value)
  }
})
// // 移动端上拉加载更多数据
// const isLoading = ref(false)

// const fetchMoreProducts = async () => {
//   if (!albumlist.value.has_more && pending.value) {
//     return
//   }
//   isLoading.value = true
//   // 模拟加载更多数据
//   // console.log('jiazai', route.query.id)

//   if (route.params.all[1]) {
//     const res: any = await getAlbumdatail(listdata.value)
//     // console.log('模拟加载更多数据', res)
//     if (res.data.code === 200) {
//       const newProducts = res.data.data
//       listdata.value.data.page = listdata.value.data.page + 1
//       if (albumlist.value.products == undefined) {
//         albumlist.value = newProducts
//       } else {
//         albumlist.value.products.push(...newProducts.products)
//         albumlist.value.has_more = newProducts.has_more
//       }
//     }
//   } else {
//     const res: any = await getSeachlist(searchData.value)
//     searchData.value.page = searchData.value.page + 1
//     // console.log('加载更多搜索数据', res)
//     const newProducts = res.data.data.search.results

//     if (albumlist.value.products == undefined) {
//       albumlist.value = newProducts
//     } else {
//       albumlist.value.products.push(...newProducts.products)
//       albumlist.value.has_more = newProducts.has_more
//     }
//   }

//   isLoading.value = false
// }

// const handleResize = debounce(() => {
//   if (process.client) {
//     isSingleColumn.value = window.innerWidth <= 750
//   }
// }, 300)

// const handleScroll = debounce(() => {
//   if (!isSingleColumn.value || isLoading.value || !albumlist.value.has_more) return
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement
//   if (scrollTop + clientHeight >= scrollHeight - 10) {
//     fetchMoreProducts()
//   }
// }, 300)

// onMounted(() => {
//   // fetchProducts()
//   if (process.client) {
//     window.addEventListener('resize', handleResize)
//     window.addEventListener('scroll', handleScroll)
//     // 初始数据加载
//     // isSingleColumn.value ? fetchMoreProducts() : fetchProducts()
//   }
// })

// onBeforeUnmount(() => {
//   if (process.client) {
//     window.removeEventListener('resize', handleResize)
//     window.removeEventListener('scroll', handleScroll)
//   }
// })
// const router = useRouter()
// 当前页面进行数据请求
</script>

<style scoped lang="scss">
.mask,
.mask_text {
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
}
.mask_box:hover .mask {
  opacity: 0.6;
}
.mask_box:hover .mask_text {
  opacity: 1;
}
:deep(.n-card > .n-card__content) {
  padding: 0;
}
</style>
