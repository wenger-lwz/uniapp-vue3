<template>
  <div :style="flagSty" class="box-border position-fixed z-99999">
    <div class="max-w-350px max-w-130px rounded-6px bg-white rounded shadow flex-center">
      <div
        class="w-100% h-100% rounded-6px flex relative box-border shadow"
        :style="`background: ${props.color.backgroundColor};`"
      >
        <img
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          class="w-100px h-100px m-15px v-middle border-style-hidden bg-#fff block"
        />
        <div class="ws-normal box-border w-200px">
          <p
            class="mt-10px lh-28px font-size-16px mb-10px box-border sales-title"
            :style="`color: ${props.color.titleColor} `"
          >
            {{
              props.color.title
                ? props.color.title.replaceAll(`{Buyer's Name}`, 'Jack').replaceAll(`{City, Country}`, 'California USA')
                : 'Someone in Somewhere purchased'
            }}
          </p>
          <p class="font-size-14px fw-600 lh-32px box-border mb-10px" :style="`color: ${props.color.productColor}`">
            Product Title-b-d
          </p>
          <p :class="['sales-product-name']" :style="`color: ${props.color.timeColor};`">5 minutes 5 minutes agoago</p>
        </div>
        <span class="color-[rgba(255,255,255,.8)] font-size-30px lh-18px absolute top-16px right-16px box-border">
          ×
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color: {
      title: string
      backgroundColor: string
      titleColor: string
      productColor: string
      timeColor: string
      iconColor: string
      mobileBackgroundColor: string
      autoplay: boolean
      interval: number
      [key: string]: any
      fx: any
    }
  }>(),
  {
    color: {
      title: '默认',
      backgroundColor: 'rgb(33, 33, 33)',
      titleColor: 'rgba(255, 255, 255, 0.8)',
      productColor: 'rgb(255, 255, 255)',
      timeColor: 'rgba(255, 255, 255, 0.8)',
      iconColor: 'rgb(249, 168, 2)',
      mobileBackgroundColor: 'rgb(249, 168, 2)',
      autoplay: false,
      interval: 5000,
      fx: 1,
    },
  }
)
const flagSty = ref({
  opacity: '1',
  left: 'initial',
  bottom: 'initial',
  top: 'initial',
  right: 'initial',
  transition: 'all 2s',
})

const flagIndex = ref(0)
// 根据 fx 值计算位置
const computedPosition = computed(() => {
  switch (props.color.fx) {
    case 1:
      return { left: '10px', bottom: '40px' } // 左下
    case 2:
      return { left: '10px', top: '40px' } // 左上
    case 3:
      return { right: '10px', bottom: '40px' } // 右下
    case 4:
      return { right: '10px', top: '40px' } // 右上
    default:
      return {}
  }
})

const switchContent2 = () => {
  flagSty.value = {
    ...flagSty.value,
    left: '10px',
    bottom: '40px',
    opacity: '1',
  }
  flagIndex.value++ //结束边界判断
  setTimeout(switchContent, props.color.interval)
}

const switchContent = () => {
    console.log(1,"----")
    flagSty.value = {
      ...flagSty.value,
      opacity: '0',
    }
    setTimeout(switchContent2, 4000) //前后两个浮窗的间隔时间
}

onBeforeMount(() => {
  flagSty.value = {
    ...flagSty.value,
    ...computedPosition.value,
  }
  setTimeout(switchContent, props.color.interval) //每个浮窗展示时间
})
</script>

<style>
.sales-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  max-width: 200px;
  word-wrap: break-word;
}
.sales-product-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 28px;
  margin-top: 0px;
  margin-bottom: 0px;
  box-sizing: border-box;
}
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
