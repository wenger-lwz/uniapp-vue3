<template>
  <section class="w-100% relative px-20px md:px-5">
    <n-grid cols="4" class="mb-24px mt26px block md:!hidden">
      <n-grid-item span="1" class="flex-center justify-start">
        <n-button text>
          <icon-back class="text-20px" @click="$router.back" />
        </n-button>
      </n-grid-item>
      <n-grid-item span="2">
        <div class="w100% font-500 text-center text-black text-18px">{{ $t('address.address') }}</div>
      </n-grid-item>
    </n-grid>

    <div class="justify-between mt-89px items-center mb-20px md:mb-40px hidden md:flex">
      <div class="text-black font-600 text-16px md:text-[28px] leading-loose">{{ $t('address.address') }}</div>
      <n-button size="large" type="primary" style="height: 40px" class="p-x24px" @click="addAddress">
        {{ $t('address.addAddress') }}
      </n-button>
    </div>
    <!-- 列表 -->
    <div class="w-full" v-if="addressList.length">
      <!-- PC端 -->
      <n-card
        class="hidden md:block rd-4px my-20px"
        style="box-shadow: none"
        v-for="item in addressList"
        :key="item?.id"
      >
        <n-grid cols="24">
          <n-grid-item span="20">
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.name') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.first_name + item.last_name }}</div>
            </div>
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.email') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.email }}</div>
            </div>
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.phone') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.tel }}</div>
            </div>
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.postal') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.zipcode }}</div>
            </div>
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.country') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.country + item.province }}</div>
            </div>
            <div class="flex justify-start p-y12px">
              <div class="text-zinc-500 text-right text-sm font-normal w-125px">{{ $t('address.fullAddress') }}：</div>
              <div class="text-black text-sm font-normal">{{ item.country + item.province + item.address }}</div>
            </div>
          </n-grid-item>
          <n-grid-item span="4">
            <div class="flex-col justify-between h-100% items-end">
              <div>
                <n-tag v-if="item.default == '1'" type="warning">{{ $t('address.defaultAddress') }}</n-tag>
              </div>

              <div>
                <n-button size="large" strong secondary text type="info" @click="editorAddres(item)">
                  {{ $t('address.edit') }}
                </n-button>
                <n-button size="large" strong secondary text type="info" @click="deleteAddres(item.id)" class="ml-15px">
                  {{ $t('address.delete') }}
                </n-button>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>

      <!-- 移动端 -->
      <n-card
        class="block md:hidden rd-4px mb-10px"
        style="box-shadow: none; border: none"
        v-for="item in addressList"
        :key="item?.id"
      >
        <div class="flex-col justify-start items-start gap-2.5">
          <div class="flex justify-start items-center gap-2.5">
            <div
              v-if="item?.default == '1'"
              class="p-x6px text-xs border border-orange-600 color-orange-600 rd-4px justify-start items-center gap-1 inline-flex"
            >
              {{ $t('address.default') }}
            </div>
            <div class="text-black text-sm font-normal">{{ item?.first_name + item?.last_name }}</div>
            <div class="text-black text-sm font-normal">{{ item?.tel }}</div>
          </div>
          <div class="text-black text-sm font-normal">{{ item?.zipcode }}</div>
          <n-ellipsis class="text-black text-sm font-normal" :line-clamp="1">
            {{ item?.country + item?.province + item?.address }}
          </n-ellipsis>
          <div class="flex justify-end w-100%">
            <icon-edit class="text-lg w-20px" @click="editorAddres(item)" />
            <icon-del2 class="ml-12px w-20px mt1px text-center" @click="deleteAddres(item?.id)" />
          </div>
        </div>
      </n-card>
    </div>
    <div v-else>
      <empty-data :loading="loading" />
    </div>
    <!-- 空内容 -->

    <div style="position: sticky" class="left-0 bottom-0 w-100% p-15px block md:hidden">
      <n-button class="w100% text-16px" style="height: 44px" type="primary" @click="addAddress">
        {{ $t('address.addAddress') }}
      </n-button>
    </div>
    <!-- 新增收货地址弹窗 -->
    <n-modal
      closable
      :mask-closable="false"
      :bordered="false"
      preset="dialog"
      :negative-text="$t('address.cancel')"
      :positive-text="$t('address.confirm')"
      style="min-width: 375px; width: 680px; border-radius: 15px"
      :title="$t('address.addr')"
      v-model:show="addopen"
      :show-icon="false"
      @positive-click="handlePositiveClick"
      @negative-click="handleNegativeClick"
    >
      <div>
        <n-form ref="formRef" :model="formData" require-mark-placement="right" inline :rules="addressRules">
          <n-grid cols="6" x-gap="24" y-gap="12" :item-responsive="true">
            <n-form-item-gi span="6" :label="$t('address.email')" path="email">
              <n-input
                :maxlength="32"
                v-model:value="formData.email"
                placeholder=""
                class="text-left h40px line-height-40px"
              />
            </n-form-item-gi>
            <n-form-item-gi span="6" :label="$t('address.phone')" path="tel">
              <n-input v-model:value="formData.tel" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6 600:3" :label="$t('address.first_name')" path="first_name">
              <n-input v-model:value="formData.first_name" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6 600:3" :label="$t('address.last_name')" path="last_name">
              <n-input v-model:value="formData.last_name" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6" :label="$t('address.addr')" path="address">
              <n-input v-model:value="formData.address" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6" :label="$t('address.city')" path="city">
              <n-input v-model:value="formData.city" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6 600:2" :label="$t('address.province')" path="province">
              <n-input v-model:value="formData.province" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6 600:2" :label="$t('address.country')" path="country">
              <n-input v-model:value="formData.country" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6 600:2" :label="$t('address.postal')" path="zipcode">
              <n-input v-model:value="formData.zipcode" placeholder="" class="text-left h40px line-height-40px" />
            </n-form-item-gi>
            <n-form-item-gi span="6" label="">
              <n-checkbox
                :disabled="formData.default == '1'"
                v-model:checked="formData.default"
                checked-value="1"
                unchecked-value="0"
              >
                {{ $t('address.setdefaultAddress') }}
              </n-checkbox>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </div>
    </n-modal>
  </section>
</template>

<script setup lang="ts">
import { shopAddress } from '@/services/api/index'
import { useDialog, useMessage, type FormInst } from 'naive-ui'
import { useAddress } from '~/composables/useAddress'
import { addressRules } from '~/utils/form'
const message = useMessage()
const dialog = useDialog()
defineProps<{
  datas: any
}>()
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)

const { addressList, getAddressList, loading } = useAddress()

/**  选择开关 */
const addopen = ref<boolean>(false)

/**  新增地址表格数据 */
const formData = ref({
  email: '',
  tel: '',
  first_name: '',
  last_name: '',
  address: '',
  company: '',
  city: '',
  province: '',
  country: '',
  country_code: '',
  source: '',
  zipcode: '',
  default: '0',
  addrid: null,
})

/**  重置表单 */
const restData = () => {
  Object.keys(formData.value).forEach((key: string) => {
    // @ts-ignore
    formData.value[key as keyof typeof formData.value] = ''
  })
}
/**  获取地址列表 */
getAddressList()

/**  打开新增地址弹窗 */
const addAddress = () => {
  restData()
  formData.value.source = 'add'
  addopen.value = true
}

/**  新增地址弹窗取消 */
const handleNegativeClick = () => {
  addopen.value = false
}

/**  新增地址确认 */
const handlePositiveClick = async () => {
  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await shopAddress(formData.value)
      if (!res.error) {
        getAddressList()
        addopen.value = false
      }
    } else {
      message.warning(t('message.info'))
      return false
    }
  })
}

/**  删除地址 */
const deleteAddres = async (id: number) => {
  dialog.warning({
    title: t('message.warning'),
    content: t('message.deleteAdress'),
    positiveText: t('message.confirm'),
    negativeText: t('message.cancel'),
    onPositiveClick: async () => {
      var res = await shopAddress({
        addrid: id,
        source: 'delete',
      })
      if (res.error == null) {
        getAddressList()
      }
      message.success(t('message.deleteSuccess'))
    },
  })
}

/**  编辑地址 */
const editorAddres = async (item: any) => {
  formData.value = JSON.parse(JSON.stringify(item))
  addopen.value = true
  formData.value.addrid = item.id
  formData.value.source = 'edit'
}
</script>

<style scoped lang="scss">
:deep(.n-empty .n-empty__icon) {
  width: 80px;
  height: 80px;
}
:deep(.n-form-item.n-form-item--top-labelled .n-form-item-label) {
  position: absolute;
  top: -5px;
  left: 20px;
  z-index: 1;
  color: #929292;
  background-color: #fff;
  z-index: 22;
  height: 15px;
  padding: 0;
  line-height: 10px;
}
:deep(.n-form.n-form--inline .n-form-item) {
  position: relative;
}
:deep(.n-radio-group .n-radio-group__splitor) {
  width: 0;
}
:deep(.n-radio-group .n-radio-button.n-radio-button--checked) {
  background-color: rgba(0, 128, 96, 0.04);
  border-color: rgba(0, 128, 96, 0.2);
}
/* :deep(.n-form-item .n-form-item-feedback-wrapper) {
  display: none;
} */
:deep(.n-form-item .n-form-item-label) {
  min-height: auto;
}
:deep(.n-form-item.n-form-item--top-labelled) {
  grid-template-areas:
    'blank'
    'feedback';
}
/* 弹窗的标题和关闭按钮 */
:deep(.n-dialog .n-dialog__title) {
  font-size: 18px;
  font-weight: 600;
}
:deep(.n-dialog .n-dialog__close) {
  top: 29px;
}
</style>
