<template>
  <view class="h-screen flex flex-col text-xs">
    <diy-title>
      <template v-slot:left>
        <navigator class="w-14" :delta="1" open-type="navigateBack" hover-class="navigator-hover">
          <uni-icons type="left" size="24"/>
        </navigator>
      </template>
      <template v-slot:center>
        <text class="font-bold text-sm">金豆兑换</text>
      </template>
      <template v-slot:right>
        <navigator class="w-14" url="/pages/view/exchangeRecords/index"  hover-class="navigator-hover">
          <text >兑换记录</text>
        </navigator>

      </template>
    </diy-title>
    <view class="bg-gray-100 flex-1 flex flex-col" v-if="showDom">
      <view class="p-3">
        <view class="bg-red-500 bg-opacity-70 rounded p-4 grid grid-cols-3 overflow-hidden">
          <diy-image class="w-16 h-16 object-cover rounded-full overflow-hidden mx-auto"
                     :src="userInfoData.avatar"
                     alt="/static/img/default.png"
          />
          <hr class="w-16 m-auto transform rotate-90">
          <view class="grid place-items-center">
            <image src="@img/50.png" class="w-8 h-8" alt=""/>
            <text class="text-white">{{ userInfoData.coin }}</text>
          </view>
        </view>
      </view>
      <view class="p-2 bg-gray-200">
        填写存款信息
      </view>
      <view class="bg-white p-2 flex-1 flex flex-col justify-between ">
        <diy-form ref="formDom" :rules="rules" class="w-full" :model="model">
          <template v-slot:option>
            <uni-forms-item name="partner" label="合作商" required>
              <uni-data-select placeholder="请选择合作商" v-model="model.partner" :localdata="skillsRange">
              </uni-data-select>
            </uni-forms-item>
            <uni-forms-item name="partnerAccount" label="平台账号" required>
              <uni-easyinput v-model="model.partnerAccount" placeholder="请输入平台账号"/>
            </uni-forms-item>
            <uni-forms-item name="exchangeValue" label="兑换金额" required>
              <uni-easyinput type="number" maxlength="10" v-model="model.exchangeValue" placeholder="请输入兑换金额"/>
            </uni-forms-item>
            <uni-forms-item name="exchangeDate" label="存款时间" required>
              <uni-datetime-picker type="date" placeholder="请输入存款时间" :clear-icon="false"
                                   v-model="model.exchangeDate"/>
            </uni-forms-item>
            <uni-forms-item label="备注">
              <uni-easyinput type="textarea" v-model="model.userRemarks" maxlength="500" placeholder="输入备注"/>
            </uni-forms-item>
          </template>
        </diy-form>
        <view class="w-5/6 mx-auto bg-gray-400 text-white text-center py-3 rounded my-10"
              :class="{'bg-red-500':disable}"
              @click="submit">立即兑换{{ model.exchangeValue ? model.exchangeValue + '金币' : '' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {get_partner_list, get_diamond_calc_info, create_exchange_diamond_info} from "@/api";
import {onShow} from "@dcloudio/uni-app";
import {nextDom} from '@/utils'

let result1 = get_partner_list()//获取合作商列表
let result2 = get_diamond_calc_info({conversionType: 1})
let skillsRange = reactive([]);//合作商列表
let showDom = ref(true);//showDom
let formDom = ref()//formDom
let model = reactive({
  partner: null,
  partnerAccount: null,
  exchangeValue: null,
  exchangeDate: null,
  userRemarks: null,
})//表单数据
let rules = {
  partner: {
    rules: [{
      required: true,
      errorMessage: '不能为空'
    }]
  },
  partnerAccount: {
    rules: [{
      required: true,
      errorMessage: '不能为空'
    }]
  },
  exchangeValue: {
    rules: [{
      required: true,
      errorMessage: '不能为空'
    }]
  },
  exchangeDate: {
    rules: [{
      required: true,
      errorMessage: '不能为空'
    }]
  },
  userRemarks: {
    rules: [{
      required: true,
      errorMessage: '不能为空'
    }]
  },
}//表单规则
const disable = computed(() => {
  return model.partner && model.partner && model.exchangeValue && model.exchangeDate
})//按钮disable
let diamondCalcInfoData = reactive({
  tipsInfo: ""
})//提示信息数据
let userInfoData = reactive({})//用户信息数据
async function init() {
  const [{data: {partnerList}}, {data: {diamondCalcInfo, userInfo}}]: any = await Promise.all([result1, result2])
  skillsRange = partnerList.map((item: any, index: any) => {
    return {
      value: index,
      text: item
    }
  })
  diamondCalcInfoData = diamondCalcInfo
  userInfoData = userInfo
  nextDom(showDom)
}

onShow(() => {
  init()
})


async function submit() {
  const flag = await formDom.value.submit()
  //@ts-ignore
  let requestData={...model, ...{'partner': skillsRange[model['partner']]['text'],exchangeType: '默认值',diamondNumber: model['exchangeValue'] * diamondCalcInfoData.ratio}}
  if (flag) {
    const {success,msg}: any = await create_exchange_diamond_info(requestData)
  if(!success){
    uni.showToast({
      icon: "none",
      title: msg
    })
  }else{
    uni.showModal({ //提醒用户更新
      title: "温馨提示",
      content: diamondCalcInfoData.tipsInfo,
    })
    model = {
      partner: null,
      partnerAccount: null,
      exchangeValue: null,
      exchangeDate: null,
      userRemarks: null,
    }
  }
  }
}
</script>

<style scoped>
/deep/.uni-forms-item__label{
  min-width: 80px;
  white-space: nowrap;
}

/*/deep/ .is-input-border {
  !*border: none;*!
}

/deep/ .uni-forms-item {
  !*margin-top: 20px;*!
  !*border: 1px solid transparent;*!
  !*border-top-color: #d4cfcf;*!
}*/
</style>