<template>
  <div class="flex-col gap-5 w-full">
    <div v-for="(values, name) in skuOptions" :key="name">
      <div class="break-words">{{ name }}</div>
      <div class="flex gap-5 flex-wrap">
        <n-button
          v-for="value in values"
          :key="value"
          size="small"
          class="min-w-100px"
          :type="isSelected(name, value) ? 'primary' : 'default'"
          @click="selectOption(name, value)"
        >
          {{ value }}
        </n-button>
      </div>
    </div>
    <div v-if="selectedVariant?.inventory_quantity">
      <p>{{ $t('product.Inventory') }}: {{ selectedVariant?.inventory_quantity }}</p>
      <n-space vertical class="mb-20px">
        <n-space justify="start" align="center">
          <n-button
            size="large"
            :disabled="selectedQuantity <= 1"
            class="text-30px font-500"
            text
            @click="selectedQuantity--"
          >
            -
          </n-button>
          <p id="product_num" class="text-15px color-#000 ml-15px mr-15px">{{ selectedQuantity }}</p>
          <n-button
            :disabled="selectedQuantity >= selectedVariant?.inventory_quantity"
            size="large"
            class="text-30px font-500"
            text
            @click="selectedQuantity++"
          >
            +
          </n-button>
        </n-space>
      </n-space>
      <!-- <n-input-number v-model:value="selectedQuantity" :max="selectedVariant?.inventory_quantity" min="1" /> -->
    </div>
    <div v-else>{{ $t('product.inventoryNotEnough') }}</div>
    <custompluginSizeGuide></custompluginSizeGuide>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProductSku',
})

interface ProductVariant {
  id: string
  title: string
  price: string
  inventory_quantity: number
  options: Option[]
  // 其他可能的属性...
}

interface Option {
  name: string | null
  value: string
}

interface SKUOptions {
  [key: string]: string[]
}

interface SelectedOptions {
  [key: string]: string
}
const props = defineProps<{ variants: COD.VariantsItem[] }>()
const { variants } = toRefs(props)

const selectedOptions = reactive<SelectedOptions>({})
const selectedVariant = ref<ProductVariant | null>(null)
const selectedQuantity = ref<number>(1)

const skuOptions = computed<SKUOptions>(() => {
  const options: SKUOptions = {}
  variants.value.forEach((variant) => {
    variant.options.forEach(({ name, value }) => {
      if (name) {
        options[name] = options[name] ? Array.from(new Set([...options[name], value])) : [value]
      }
    })
  })
  return options
})

function selectOption(optionName: string | number, optionValue: string) {
  selectedOptions[optionName] = optionValue
  updateSelectedVariant()

  // 更新路由query参数
  const variantId = selectedVariant.value?.id
  if (variantId) {
    router.push({ query: { ...route.query, variant: variantId }, replace: true })
  }
}

function isSelected(name: string | number, value: string): boolean {
  return selectedOptions[name] === value
}

const emit = defineEmits(['skuChange'])

function updateSelectedVariant() {
  const variant = variants.value.find((variant) =>
    Object.entries(selectedOptions).every(([name, value]) =>
      variant.options.some((option) => option.name === name && option.value === value)
    )
  )
  selectedVariant.value = variant || null
  // selectedQuantity.value = 1
  // 通知上层组件选中的变体改变
  // console.log(selectedVariant.value)

  emit('skuChange', selectedVariant.value, selectedQuantity.value)
}

const router = useRouter()
const route = useRoute()
const initData = () => {
  // / 尝试从路由的query参数中获取variant的ID
  const variantId = route.query.variant
  if (variantId) {
    // 如果有variant参数，尝试根据ID找到对应的变体
    const variant = variants.value.find((v) => v.id === variantId)
    if (variant) {
      // 如果找到了对应的变体，根据其选项设置selectedOptions
      variant.options.forEach((option) => {
        if (option.name && option.value) {
          selectedOptions[option.name] = option.value
        }
      })
      updateSelectedVariant()
    }
  } else {
    // 如果没有variant参数或找不到对应的变体，可以设置一个默认的选中逻辑
    // 例如，选择第一个变体的所有选项作为默认选中
    const firstVariant = variants.value[0]
    if (firstVariant) {
      firstVariant.options.forEach((option) => {
        if (option.name && option.value) {
          selectedOptions[option.name] = option.value
        }
      })
      updateSelectedVariant()
    }
  }
}
initData()
watch(selectedQuantity, () => {
  updateSelectedVariant()
  // 如果需要，可以在这里处理路由逻辑
})
</script>
