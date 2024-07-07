<template>
  <n-form-item ref="el" span="6" :label="$t('checkout.addr')" path="addres.addr">
    <n-input
      @input="handleUpdateValue(formValue.addres.addr)"
      :loading="loadingAddr"
      @allow-input="onlyAllowNumber"
      :focusable="false"
      @focus="handleFocusValue()"
      v-model:value="formValue.addres.addr"
      placeholder=""
    />
    <div class="loqateauto-optionsbox" v-if="showLoqateauto">
      <div class="w100%" v-for="item in loqateautoOptions" :key="item.Id" @click="LoqateautoChildFun(item)">
        <div class="loqateauto-optionsbox-item">
          <div class="overflow-hidden">
            <span class="font-size-14px w-100% flex overflow-hidden">
              {{ item.Text }}
            </span>
            <span class="loqateauto-optionsbox-itemclor">{{ item.Description }}</span>
          </div>
          <div>
            <div
              :class="
                item.childList?.length > 0 && item.chekbox
                  ? 'loqateauto-optionsbox-item-child-active'
                  : 'loqateauto-optionsbox-item-child'
              "
            >
              <icon-back v-if="item.Type !== 'Address'" class="color-[#545454] w-22px h-22px ml-15px" />
            </div>
          </div>
        </div>
        <div
          v-if="item.childList?.length > 0 && item.chekbox"
          class="loqateauto-optionsbox-item-childbox"
          v-for="row in item.childList"
          :key="row.Id"
        >
          <div class="w100% h-35px lh-35px" @click.stop="uploadFromValue(row)">
            <span>{{ row.Text }}</span>
            <sps-img
              v-if="row.Type !== 'Address'"
              data-not-lazy
              src="@/assets/icons/quxiao.png"
              alt=""
              class="loqateauto-optionsbox-item-child w18px h18px"
            />
          </div>
        </div>
      </div>
    </div>
  </n-form-item>
</template>

<script lang="ts" setup>
import { getloqateautoData } from '~/services/api'
const formValue = defineModel<any>()
const showLoqateauto = ref(false)
const addr_id = ref('')
const loadingAddr = ref(false)
const loqateautoOptions = ref([])
interface qateautParams {
  /**
   * 地址
   */
  addr?: string
  /**
   * 地址ID
   */
  addr_id?: string
  /**
   * 国家二字码
   */
  country?: string
  /**
   * 1列表，2详情
   */
  ctype?: string | number
  [property: string]: any
}

const ctype = ref('1')

/**  获取所有Loqate地址 */
const loqateauto = async () => {
  loadingAddr.value = true
  let params: qateautParams = {
    addr: formValue.value.addres.addr,
    addr_id: addr_id.value,
    country: formValue.value.addres.country_code,
    ctype: ctype.value,
  }
  let res = await getloqateautoData(params)
  res.error?.code == 0 ? (loadingAddr.value = false) : (loadingAddr.value = true)
  if (res?.error.data?.Items.length > 0) {
    if (ctype.value == 1) {
      showLoqateauto.value = true
    }
    if (addr_id.value) {
      loqateautoOptions.value = loqateautoOptions.value.map((item: { Id: any }) => {
        if (addr_id.value == item.Id) {
          return {
            ...item,
            chekbox: true,
            childList: res?.error.data?.Items,
          }
        } else {
          return {
            ...item,
            chekbox: false,
          }
        }
      })
    } else {
      loqateautoOptions.value = res?.error.data?.Items
    }
  } else {
    showLoqateauto.value = false
  }
}
// 下旬下一级
const LoqateautoChildFun = (item: { Id: any; Type: String; Text: String }) => {
  if (item.Type !== 'Address') {
    if (addr_id.value !== item.Id) {
      addr_id.value = item.Id
      loadingAddr.value = true
      loqateauto()
    } else {
      loqateautoOptions.value = loqateautoOptions.value.map((i) => {
        if (addr_id.value == i.Id) {
          return {
            ...i,
            chekbox: !i.chekbox,
          }
        } else {
          return {
            ...i,
            chekbox: false,
          }
        }
      })
    }
  } else {
    getDitlleFun(item.Id)
    // formValue.value.addres.addr = item.Text
    showLoqateauto.value = false
  }
}

const getDitlleFun = async (id: any) => {
  let params: qateautParams = {
    addr: formValue.value.addres.addr,
    addr_id: id,
    country: formValue.value.addres.country_code || 'US',
    ctype: '2',
  }

  let res = await getloqateautoData(params)
  const row = res.error.data.Items[0]
  formValue.value.addres.addr = `${row.Line1}${row.Line2}`
  formValue.value.addres.postal = row.PostalCode
  formValue.value.addres.apartment = row.Street
  formValue.value.addres.city = row.City
  formValue.value.addres.province_code = row.ProvinceCode
  formValue.value.addres.province = row.ProvinceName
}
const uploadFromValue = (item: any) => {
  formValue.value.addres.addr = item.Text
  getDitlleFun(item.Id)
  showLoqateauto.value = false
}
const el = ref()
const close = (el: any) => {
  showLoqateauto.value = false
}
onClickOutside(el, close)

const handleFocusValue = () => {
  loqateautoOptions.value.length > 0 ? (showLoqateauto.value = true) : (showLoqateauto.value = false)
}
let timerId: number | null = null

const onlyAllowNumber = (value: string) => {
  const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  if (value) {
    return regex.test(value)
  } else {
    formValue.value.addres.addr = ''
    return ''
  }
}

const handleUpdateValue = (val: string) => {
  addr_id.value = ''
  if (val.length >= 3) {
    loqateauto()
  } else {
    showLoqateauto.value = false
    loqateautoOptions.value = []
  }
}

onUnmounted(() => {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
})
</script>

<style>
.loqateauto-optionsbox {
  width: 100%;
  min-height: 300px;
  position: absolute;
  top: 50px;
  z-index: 999;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0 6px 19px 0 rgba(0, 0, 0, 0.23);
  overflow-y: scroll;
}

.loqateauto-optionsbox-item {
  display: flex;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  padding: 0 10px;
  height: 44px;
  line-height: 44px;
  justify-content: space-between;
}
.loqateauto-optionsbox-itemclor {
  color: #9a9a9a;
}
.loqateauto-optionsbox-item-child {
  position: relative;
  top: 12px;
  right: -10px;
  transform: rotate(180deg);
  transition: all 0.2;
}
.loqateauto-optionsbox-item-child-active {
  position: relative;
  top: 20px;
  right: -0px;
  transform: rotate(270deg);
  transition: all 0.2;
}
.loqateauto-optionsbox-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.loqateauto-optionsbox-item-childbox {
  display: flex;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  height: 44px;
  line-height: 44px;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.05);
}

.loqateauto-optionsbox-item-childbox-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
