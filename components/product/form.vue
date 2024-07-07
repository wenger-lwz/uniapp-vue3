<template>
  <div class="w-full">
    <n-form
      id="checkForm"
      ref="ruleFormRef"
      require-mark-placement="left"
      :rules="rules"
      class="w-full"
      size="large"
      :model="form"
    >
      <!-- 邮箱 -->
      <n-form-item v-if="Number(codset?.xd?.mail)" path="email" :label="$t('cod.products.email')">
        <n-input v-model:value="form.email" placeholder=" " class="w-full" name="first_name" type="text" />
      </n-form-item>
      <!-- 姓名 -->
      <n-form-item path="first_name" :label="$t('cod.checkout.name')">
        <n-input v-model:value="form.first_name" placeholder=" " class="w-full" name="first_name" type="text" />
      </n-form-item>
      <n-form-item path="phone" :label="$t('cod.checkout.phone')">
        <n-input id="phone" v-model:value="form.phone" placeholder=" " class="w-full" name="phone" type="text" />
      </n-form-item>
      <!-- 国家 -->
      <n-form-item class="" path="country" :label="$t('cod.products.countries')">
        <client-only>
          <n-select
            v-model:value="form.country"
            placeholder=" "
            :options="countriesOptions"
            label-field="name"
            value-field="name"
            class="w-full"
            size="large"
            @change="countriesChange"
          ></n-select>
        </client-only>
      </n-form-item>
      <div v-if="form.country_code == 'TW'">
        <div class="boxFlexL">{{ $t('cod.products.paymentMethod') }}</div>
        <n-form-item path="cargo">
          <div class="boxFlexR1 fukuanfangshi">
            <div class="pickItem">
              <n-input id="radiocod" v-model:value="form.cargo" placeholder=" " name="cargo" value="1" />
              <label for="radiocod">
                <sps-img src="/image/icon_huo.png" />
                {{ $t('cod.products.cashOnDelivery') }}
              </label>
            </div>
            <div v-if="codset.scs && codset.scs.includes('3')" class="pickItem">
              <n-input id="radio711" v-model:value="form.cargo" placeholder=" " name="cargo" value="5" />
              <label for="radio711">
                <sps-img src="/image/icon-711.jpg" />
                {{ $t('cod.products.711Pickup') }}
              </label>
            </div>
            <div v-if="codset.scs && codset.scs.includes('4')" class="pickItem">
              <n-input id="radiofam" v-model:value="form.cargo" placeholder=" " name="cargo" value="4" />
              <label for="radiofam">
                <sps-img src="/image/icon-familyMart.png" />
                {{ $t('cod.products.familyPickup') }}
              </label>
            </div>
          </div>
        </n-form-item>
        <div class="huo_info">
          {{ $t('cod.products.title') }}
        </div>
      </div>
      <!-- 省份 -->
      <n-form-item v-if="provideOptions?.length" :label="$t('cod.products.province')">
        <n-select
          v-model:value="form.provide"
          placeholder=" "
          :options="provideOptions"
          class="w-full"
          size="large"
          @change="provideChange"
        ></n-select>
      </n-form-item>
      <n-form-item class="w-full" path="city" :label="$t('cod.checkout.city_err')">
        <template v-if="provideOptions && cityOptions?.length">
          <!-- 城市 -->
          <n-select
            v-model:value="form.city"
            placeholder=" "
            :disabled="!cityOptions"
            :options="cityOptions"
            label-field="name"
            value-field="name"
            class="w-full"
            size="large"
            @change="cityChange"
          ></n-select>
        </template>
        <n-input v-else v-model:value="form.city" placeholder=" " class="inputVal" name="addr" type="text" />
      </n-form-item>
      <!-- 地区 -->
      <div v-if="Number(codset?.xd?.apart)" class="w-full" :label="$t('cod.products.deliveryAddress')" size="large">
        <div v-if="form.country_code == 'TW' && form.cargo != 1" class="inputBox inputBox_half w-full">
          <n-form-item class="w-full" path="apartment">
            <div>
              <n-select
                v-model:value="form.apartment"
                p
                :disabled="!areaOptions"
                :options="apartmentOptions"
                label-field="name"
                value-field="name"
                class="w-full"
              ></n-select>
            </div>
          </n-form-item>
        </div>
        <div
          v-if="(form.country_code == 'TW' && form.cargo == 1) || form.country_code != 'TW'"
          class="inputBox inp_addr"
        >
          <n-form-item path="addr" :label="$t('cod.checkout.addr')">
            <n-input v-model:value="form.addr" placeholder=" " class="inputVal w-full" name="addr" type="text" />
          </n-form-item>
        </div>
      </div>
      <!-- 邮编 -->
      <div v-if="Number(codset?.xd?.postal)" class="inputBox inputBox_half w-full">
        <n-form-item class="w-full" path="postal" :label="$t('cod.products.postalCode')">
          <n-input v-model:value="form.postal" placeholder=" " class="inputVal" type="text" />
        </n-form-item>
      </div>
      <!-- 标志性建筑 -->
      <div v-if="Number(codset?.xd?.landmark)" class="inputBox inputBox_half w-full">
        <n-form-item class="w-full" path="landmark" :label="$t('cod.products.landmark')">
          <n-input v-model:value="form.landmark" placeholder=" " class="inputVal" type="text" />
        </n-form-item>
      </div>
      <!-- 保存信息 -->
      <div v-if="false">
        <n-form-item>
          <n-radio
            v-model:value="form.saveaddress"
            name="save"
            label="1"
            size="large"
            @click.native.prevent="form.saveaddress = form.saveaddress == '1' ? '0' : '1'"
          >
            <span class="text-slate-500">{{ $t('cod.checkout.save_info') }}</span>
          </n-radio>
        </n-form-item>
      </div>
      <div v-if="data?.payment_list" class="inputBox">
        <div class="checkoutD_form_title">
          {{ $t('cod.checkout.payment') }}
        </div>
        <div class="">{{ $t('cod.checkout.payment_tips') }}</div>
        <div class="inputBox payment_box" style="height: auto">
          <div v-for="({ site_pay, icons }, key) in data.payment_list" v-if="props?.data">
            <n-radio
              v-model:value="form.payment_type"
              type="radio"
              pay_t="AsiaBill"
              site_pay="0"
              name="payment_type"
              :value="key"
              class="checked_replace"
            />
            <p class="payment_icon payment_titleAsiaBill">
              {{ key }}
            </p>
            <p style="float: right; color: red">
              {{ $t('cod.products.test') }}
            </p>
            <sps-img v-for="(item, index) in icons" :key="index" :src="`/image/pay_icon/${item}.png`" :alt="item" />
            <hr class="hr_long" />
            <div v-if="!site_pay && form.payment_type == key" class="transition-all overflow-hidden">
              <sps-img class="h-[188px] m-auto" src="/image/card.png" alt="" />
            </div>
            <div v-if="site_pay && form.payment_type == key" class="transition-all overflow-hidden">
              <n-form-item path="cardno" :label="$t('cod.products.cardNum')">
                <n-input v-model:value="form.cardno" placeholder=" " class="w-full" name="Moonbacardno" type="text" />
              </n-form-item>
              <n-form-item path="cmy" style="width: 49%" :label="$t('cod.products.expirationTime')">
                <n-input
                  v-model:value="form.cmy"
                  placeholder=" "
                  class="w-full"
                  name="Moonbacvv"
                  type="text"
                  maxlength="7"
                />
              </n-form-item>
              <n-form-item path="cvv" :label="$t('cod.products.securityCode')">
                <n-input
                  v-model:value="form.cvv"
                  placeholder=" "
                  class="w-full"
                  name="Moonbacvv"
                  type="text"
                  maxlength="6"
                />
              </n-form-item>
            </div>
          </div>
        </div>
      </div>
      <iframe
        id="pay_jump"
        name="pay_jump"
        width="0"
        height="0"
        border="0"
        frameborder="0"
        scrolling="no"
        rel="noreferrer"
        referrerpolicy="no-referrer"
        style="frameborder: 0; position: absolute; top: 0; left: 0; z-index: 99999"
      ></iframe>
      <div class="inputBox">
        <div class="checkoutD_form_title">{{}}</div>
        <n-form-item :label="$t('cod.checkout.order_note')">
          <n-input id="remark" v-model:value="form.remark" placeholder=" " size="large" type="text" name="remark" />
        </n-form-item>
      </div>
    </n-form>
    <div id="callback" v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import { useDialog, type FormInst, type FormRules } from 'naive-ui'
const dialog = useDialog()
const html = ref('')
/** 多语言 */
const { t: $t } = useI18n()

/** 页面数据 */
const props = defineProps<{
  data: any
  codset: COD.Codset
  buy_now: any
}>()

/** 表单 */
const form = ref({
  email: '',
  first_name: '', //姓名
  phone: '', //收机
  cargo: 1, //付款方式
  provide: '', //省份
  provide_code: '', //省份id
  city: '', //城市
  apartment: '', //地区
  addr: '', //地址
  saveaddress: '0', //保存地址
  country_code: '', //国家码
  country: '', //国家
  payment_type: 'Cod',
  ipm: '',
  Expiry: '',
  securityCode: '',
  note: '',
  remark: '',
  cardno: '',
  cmy: '',
  cvv: '',
  name: '',
  okey: useCookie('okey').value,
  fc_token: Date.now(),
})

/**  国家-省份-城市三级联动 */
const {
  apartmentOptions,
  areaOptions,
  cityOptions,
  countriesOptions,
  provideOptions,
  countriesChange,
  provideChange,
  cityChange,
} = useAreaData(form)

/** 表单验证规则 */
const rules: ComputedRef<FormRules> = computed(() => ({
  email: [
    {
      required: Number(props.codset?.xd?.mail) == 2 ? true : false,
      message: $t('message.email'),
      trigger: ['blur', 'change'],
    },
  ],
  name: [
    {
      required: true,
      message: $t('cod.products.name'),
      trigger: ['blur', 'change'],
    },
  ],
  first_name: [
    {
      required: true,
      message: $t('cod.products.name'),
      trigger: ['blur', 'change'],
    },
  ],

  addr: [
    {
      required: Number(props.codset?.xd?.apart) == 2 ? true : false,
      message: $t('checkout.address'),
      trigger: ['blur', 'change'],
    },
  ],
  apartment: [
    {
      required: Number(props.codset?.xd?.apart) == 2 ? true : false,
      message: $t('message.apartment'),
      trigger: ['blur', 'change'],
    },
  ],
  city: [
    {
      required: true,
      message: $t('message.city'),
      trigger: ['blur', 'change'],
    },
  ],
  country: [
    {
      required: true,
      message: $t('message.country'),
      trigger: ['blur', 'change'],
    },
  ],
  country_code: [
    {
      required: true,
      message: '',
      trigger: ['blur', 'change'],
    },
  ],
  province: [
    {
      required: true,
      message: $t('message.province'),
      trigger: ['blur', 'change'],
    },
  ],
  province_code: [
    {
      required: true,
      message: '',
      trigger: ['blur', 'change'],
    },
  ],
  postal: [
    {
      required: Number(props.codset?.xd?.postal) == 2 ? true : false,
      message: $t('message.postal'),
      trigger: ['blur', 'change'],
    },
  ],
  phone: [
    {
      required: true,
      message: $t('message.phone'),
      trigger: ['blur', 'change'],
    },
  ],
  billing_address: [
    {
      required: true,
      message: $t('message.address'),
      trigger: ['blur', 'change'],
    },
  ],
  payment_type: [
    {
      required: true,
      message: '',
      trigger: ['blur', 'change'],
    },
  ],
  shipping_method: [
    {
      required: true,
      message: $t('product.shipping_method'),
      trigger: ['blur', 'change'],
    },
  ],

  landmark: [
    {
      required: Number(props.codset?.xd?.landmark) == 2 ? true : false,
      message: $t('product.landmark'),
      trigger: ['blur', 'change'],
    },
  ],
}))

/** 提交表单 */
const onSubmit = async () => {
  return await ruleFormRef.value?.validate(async (error) => {
    if (error) {
      elFormErrorScrollIntoView()

      // const fd = new FormData()
      // Object.keys(form.value).forEach((i) => {
      //   fd.append(i, form.value[i])
      // })
      // const data=await useApi().createOrder(fd)
      // const { data } = await axios('/api/payment/createOrder', {
      //   method: 'post',
      //   data: fd,
      // })
    }
  })
}

/** 表单实例对象 */
const ruleFormRef = ref<FormInst | null>(null)

/**  暴露方法变量 */
defineExpose({
  onSubmit,
  form,
})
</script>

<style scoped lang="scss">
:deep(.n-form-item-label) {
  position: relative;
}
:deep(.__input-l),
:deep(.__internal-selection-l) {
  --n-height: 48px;
}
:deep(.n-form-item) {
  position: relative;
}
:deep(.n-form-item--top-labelled) {
  & .n-form-item-label {
    position: absolute;
    color: #929292;
    background-color: transparent;
    z-index: 22;
    height: 15px;
    font-size: 18px;
    padding: 0;
    line-height: 10px;
    top: 45px;
    left: 20px;
    transition: all 0.3s;
    cursor: text;
    pointer-events: none;
  }
  &:has(.n-input--focus) > label,
  &:has(input:not(:placeholder-shown)) > label,
  &.n-form-item-blank:has(input:not(:placeholder-shown)) > label,
  &:has(.n-base-selection-input__content:not(:empty)) > label {
    position: absolute;
    cursor: text;
    -webkit-background-clip: text;
    mix-blend-mode: difference;
    min-height: 10px;
    top: 24px;
    left: 10px;
    font-size: 16px;
    transition: all 0.3s;
    transition-duration: all 0.2s;
    transform: translate(0, 0) scale(0.9, 0.9);
  }
}
</style>
