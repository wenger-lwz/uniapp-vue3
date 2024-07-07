<template>
  <section class="w-full">
    <n-spin :show="loading" class="w-full">
      <div
        class="w100% items-start justify-center flex-col md:items-center px-0"
        style=""
        v-if="datas.title && carList?.line_items?.length"
      >
        <!-- {{ datas }} -->
        <div class="w-full md:hidden block">
          <div class="w-full flex py-15px px-20px b-b-1 b-#E1E3E5 justify-between items-center">
            <div class="text-center text-black text-lg font-normal">{{ $t('cart.cart') }}</div>
            <img
              data-not-lazy
              @click="router.back"
              src="@/assets/icons/quxiao.png"
              alt=""
              class="w18px h18px cursor-pointer"
            />
          </div>
        </div>
        <div class="text-28px font-600 text-center pt87px pb83px hidden md:block">{{ $t('cart.mycart') }}</div>
        <div v-if="carList?.upsell" v-html="carList?.upsell" class="w-full"></div>
        <!-- pc端 -->
        <div class="w-full md:block hidden">
          <n-table :bordered="false">
            <thead class="">
              <tr>
                <th style="background-color: transparent">{{ $t('cart.product') }}</th>
                <th style="background-color: transparent">{{ $t('cart.Price') }}</th>
                <th style="background-color: transparent">{{ $t('cart.goods_num') }}</th>
                <th style="background-color: transparent">{{ $t('cart.all') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carList.line_items" :key="index">
                <td class="flex items-center 46%" style="padding-left: 0">
                  <n-checkbox :disabled="item.status != 1" @update:checked="handleCheckedChange(item.id)" />
                  <img
                    data-not-lazy
                    class="w-118px mx-30px my-28px aspect-1/1 b-1 b-#cccc cursor-pointer"
                    @click="router.push('/products/' + item.product_id)"
                    :src="item.status != 1 ? '' : item.image.src"
                    :alt="$t('cart.goods_tips')"
                  />
                  <div class="flex-col">
                    <n-ellipsis :line-clamp="2">
                      {{ item.product_title }}
                    </n-ellipsis>
                    <p class="color-#8D8D8D mt-8px">
                      <span v-for="i in item.options" :key="i.name" class="m-r15px">{{ i.value }}</span>
                    </p>
                  </div>
                </td>
                <td class="w-20%">{{ formatPrice(item.price) }}</td>
                <td class="w-20%">
                  <n-space justify="start" style="gap: 8px" align="center">
                    <n-button
                      size="large"
                      :disabled="!item.quantity"
                      text
                      @click="changeGoodsNum(item, -1)"
                      style="height: 20px"
                      class="text-32px color-#969696 font-500"
                    >
                      -
                    </n-button>
                    <p class="text-15px color-#000 ml-15px mr-15px">{{ item.quantity }}</p>
                    <n-button
                      size="large"
                      @click="changeGoodsNum(item, 1)"
                      text
                      style="height: 22px"
                      class="text-25px color-#969696 font-500"
                    >
                      +
                    </n-button>
                  </n-space>
                </td>
                <td class="w-10%">{{ formatPrice(item.line_price) }}</td>
              </tr>
            </tbody>
          </n-table>
        </div>
        <!-- 移动 -->
        <div class="px20px md:px0 w-full md:hidden block">
          <div
            class="flex justify-around items-center mt-24px w-full"
            v-for="(item, index) in carList.line_items"
            :key="index"
          >
            <n-checkbox :disabled="item.status != 1" @update:checked="handleCheckedChange(item.id)" />
            <div class="mx-12px" @click="router.push('/products/' + item.product_id)">
              <img
                data-not-lazy
                class="w-[80px] aspect-4/5 rounded b-1 b-#cccc"
                :src="item.status != 1 ? '' : item.image.src"
                :alt="$t('cart.goods_tips')"
              />
            </div>
            <div class="flex-col items-start justify-between h-100% flex-grow">
              <n-ellipsis
                :line-clamp="1"
                @click="router.push('/products/' + item.product_id)"
                class="text-black text-sm font-normal leading-normal tracking-wide"
              >
                {{ item.product_title }}
              </n-ellipsis>
              <div class="text-zinc-500 text-sm font-normal leading-normal tracking-wide mt-6px mb15px">
                <span v-for="i in item.options" :key="i.name" class="m-r15px">{{ i.value }}</span>
              </div>
              <div class="flex justify-between items-center w-full">
                <n-space justify="start" align="center" class="b-b b-#ccc">
                  <n-button
                    text
                    :disabled="!item.quantity"
                    @click="changeGoodsNum(item, -1)"
                    style="height: 22px"
                    class="text-20px font-800"
                  >
                    -
                  </n-button>
                  <p class="text-14px color-#000">{{ item.quantity }}</p>
                  <n-button @click="changeGoodsNum(item, 1)" text style="height: 22px" class="text-20px font-800">
                    +
                  </n-button>
                </n-space>
                <div class="w-[49px] h-5 text-neutral-950 text-sm font-normal leading-normal tracking-wide">
                  {{ formatPrice(item.price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <n-space
          justify="space-between"
          align="center"
          class="px20px md:px0 md:text-16px text-14px font-400 md:font-600 mt40px w-100%"
        >
          <div>{{ $t('cart.goods_total') }}</div>
          <div>{{ formatPrice(cartotalprice) }}</div>
          <!-- <div>{{ formatPrice( discountPrice ) }}</div> -->
        </n-space>
        <div class="px20px md:px0 w-100% mt-40px flex md:justify-end justify-center">
          <n-button
            type="primary"
            :disabled="!carIds.length"
            :loading="buynowloading"
            @click="buyNow"
            class="w100% md:w-auto"
            style="height: 40px"
          >
            {{ $t('cart.buynow') }}
          </n-button>
        </div>
        <!-- <n-space justify="end" class=" w-100% mt-40px">
          <n-button type="primary" class=" w100%">立即购买</n-button>
        </n-space> -->
      </div>
      <div v-else class="w-100% flex-center flex-col">
        <icon-cart class="w-100px h-200px" />
        <div>{{ $t('cart.cart_empty') }}</div>
        <NuxtLink
          href="/"
          class="link"
          style="
            margin-top: 20px;
            font-size: 15px;
            letter-spacing: 1px;
            line-height: 18px;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            text-decoration: none solid rgb(255, 255, 255);
            border: 1px solid rgba(0, 0, 0, 0);
            background-color: rgb(18, 18, 18);
            color: rgb(255, 255, 255);
            min-width: 320px;
            min-height: 45px;
            transition: all 0.1s linear 0s;
            appearance: none;
            outline: rgb(255, 255, 255) none 0px;
          "
        >
          {{ $t('cart.cart_empty_btn') }}
        </NuxtLink>
      </div>
    </n-spin>
  </section>
</template>

<script setup lang="ts">
const {
  loading,
  buyNow,
  buynowloading,
  getcarlist,
  carIds,
  carList,
  cartotalprice,
  changeGoodsNum,
  handleCheckedChange,
} = useCart()
const router = useRouter()
// const carIds = ref([])
defineOptions({
  name: 'ShoppingCart',
})
defineProps<{
  datas: any
}>()
// const cartotalprice = ref<any>(0)
// const discountPrice = ref<any>(0)
// 购物车列表
// const carList = ref<any>([])
// const getcarlist = async () => {
//   const res = await shopCarlist({ source: 'xfproduct' })
//   carList.value = res?.data?.cart
// }
// onMounted(getcarlist)
getcarlist()
// 添加或减少物品数量
const data = ref({
  source: '',
  proid: null,
  car_id: null,
  varid: null,
  num: 0,
})
// const changeGoodsNum = async (item: any, value: any) => {
//   item.quantity += value
//   await shopAddcar({
//     source: '',
//     proid: item.product_id,
//     car_id: item.id,
//     varid: item.variant_id,
//     num: item.quantity,
//   })
//   DLayers('add_cart')
//   let nowNum = 0

//   carList.value.line_items.forEach((element) => {
//     if (carIds.value.includes(element.id)) {
//       nowNum += element.quantity * element.price
//     }
//   })
//   cartotalprice.value = nowNum

//   await getcarlist()
// }

// 选择商品

// const handleCheckedChange = (checked: any) => {
//   if (carIds.value.includes(checked)) {
//     carIds.value.splice(carIds.value.indexOf(checked), 1)
//     carList.value.line_items.map((item) => {
//       if (item.id == checked) {
//         if (cartotalprice.value != 0) {
//           cartotalprice.value = (cartotalprice.value * 1 - item.quantity * item.price).toFixed(2)
//         }
//       }
//     })
//   } else {
//     carIds.value.unshift(checked)
//     carList.value.line_items.map((item) => {
//       if (item.id == checked) {
//         if (cartotalprice.value != 0) {
//           cartotalprice.value = (cartotalprice.value * 1 + item.quantity * item.price).toFixed(2)
//         } else {
//           cartotalprice.value = (item.quantity * item.price).toFixed(2)
//         }
//       }
//     })
//   }
// }
// 立即购买
// const buynow = async () => {
//   var data = {
//     source: '',
//     key_o: '',
//     vids: '',
//   }
//   if (carList.value.line_items.length != 0) {
//     if (carIds.value.length == 0) {
//       message.info('请选择商品')
//       return
//     } else {
//       data.vids = carIds.value.join(',')
//       console.log('选中的ids', data)
//       DLayers('add_cart')

//       const res = await shopCarbuynow(data)
//       if (res.data.code == 200 && res.data.state == 'ok') {
//         navigateTo('/checkouts/' + res.data.okey)
//         // location.href = '/checkouts/' + res.data.okey
//       }
//     }
//   } else {
//     message.error('The shopping cart is empty')
//   }
// }
</script>
