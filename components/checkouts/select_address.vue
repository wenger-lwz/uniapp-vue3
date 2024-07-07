<template>
  <n-modal
    preset="card"
    @after-enter="afterEnter"
    v-model:show="show"
    :title="$t('address.address')"
    class="w-85% md:w-500px"
  >
    <div
      v-if="addressList?.length"
      class="flex flex-col text-sm leading-6 text-black whitespace-nowrap bg-white rounded max-w-full"
    >
      <n-radio-group v-model:value="selectedValue" name="radiogroup">
        <div
          v-for="(item, index) in addressList"
          class="flex gap-2.5 justify-between text-wrap px-3.5 py-4 mt-6 rounded border border-solid border-zinc-200 max-md:flex-wrap max-w-full"
          :key="index"
        >
          <n-radio :value="index" />
          <div class="flex flex-col flex-1 gap-6px">
            <div>{{ $t('address.email') }} : {{ item?.email }}</div>
            <div>{{ $t('address.phone') }} : {{ item?.tel }}</div>
            <div>{{ $t('address.fullAddress') }} : {{ item?.country + item?.province + item?.address }}</div>
          </div>
        </div>
      </n-radio-group>
    </div>
    <empty-data v-else :loading="loading" />

    <template #footer>
      <div class="flex-center">
        <n-button
          :disabled="!addressList?.length"
          @click="updateAddress"
          type="primary"
          color="#047857"
          class="flex justify-center self-center rounded-sm"
        >
          {{ $t('address.confirm') }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { useAddress } from '~/composables/useAddress'

/**  模态框显示/隐藏 */
const show = defineModel<boolean>()

/**
 * @returns 可组合是函数
 * @returns 获取地址
 */
const { addressList, getAddressList, loading } = useAddress()

/**  更新用户地址 */
const emit = defineEmits(['update:address'])

/**  模态框进入事件 */
const afterEnter = async () => {
  /**  获取地址 */
  !addressList.value?.length && (await getAddressList())
  /**  选中地址默认值 */
  selectedValue.value = addressList.value.findIndex((predicate) => predicate.default == '1') || 0
}

/**  选中的地址 */
const selectedValue = ref<number>(0)

/**  更新地址数据 */
const updateAddress = () => {
  if (selectedValue.value !== undefined) {
    emit('update:address', addressList.value[selectedValue.value])
    show.value = false
  } else {
    // Handle the case where selectedValue is undefined
  }
}
</script>

<style></style>
