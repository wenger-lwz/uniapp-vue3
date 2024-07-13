<template>
  <diy-title>
    <template v-slot:left>
      <navigator :delta="1" open-type="navigateBack" hover-class="navigator-hover">
        <uni-icons type="left" size="24"/>
      </navigator>
    </template>
    <template v-slot:right>
      <text class="text-red-400">短信登陆</text>
    </template>
  </diy-title>

  <diy-image class="w-1/2 h-12 mx-auto my-10 rounded object-scale-down overflow-hidden" src="/static/img/logo.png"/>

  <view class="w-5/6 mx-auto">
    <diy-form ref="fiyform" :rules="rules" class="w-full" :model="model">
      <template v-slot:option>
        <uni-forms-item name="user_login">
          <view class="flex relative">
            <input type="number" class="border border-gray-200 w-full pl-14 h-10 rounded text-sm"
                   :class="{'border-blue-500':inputFocus}" @focus="inputFocus=true" @blur="inputFocus=false"
                   v-model="model.user_login" placeholder="请输入手机号码" maxlength="11">
            <view class="flex items-center text-sm absolute left-2  top-3">
              <text>+86</text>
              <uni-icons type="bottom" size="16"/>
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item name="user_pass">
          <uni-easyinput type="password" class="mt-2" errorMessage v-model.trim="model.user_pass"
                         placeholder="请输入密码"></uni-easyinput>
        </uni-forms-item>
      </template>
    </diy-form>
  </view>

  <view class="w-5/6 mx-auto bg-red-500 text-white text-center py-3 rounded my-10" @click="login">登陆</view>

  <view class="w-5/6 mx-auto  text-gray-400  py-3 rounded my-10 text-sm flex justify-between">
    <navigator  url="/pages/view/smsLogin/index" open-type="redirect"  hover-class="other-navigator-hover">
      <text>用户注册</text>
    </navigator>
    <text>忘记密码</text>
  </view>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue"
import {userLogin} from '@/api'
import session from "@/stores"
const { upData ,remove} = session()
let model = reactive({
  user_login: '',
  user_pass: ''
})
let inputFocus = ref(false)
// 自定义表单校验规则
let rules = {
  user_login: {
    rules: [{
      required: true,
      errorMessage: '手机号码不能为空'
    }]
  },
  user_pass: {
    rules: [{
      required: true,
      errorMessage: '登陆密码不能为空'
    }]
  },
}
let fiyform = ref()

async function login() {
  const flag = await fiyform.value.submit()
  if (flag) {
    const {ret, data}: any = await userLogin(model)
    if (ret != 200) {
      uni.showToast({
        icon: 'none',
        title: "请求失败，请稍后重试！"
      })
    } else {
      if (data.code != 0) {
        uni.showToast({
          icon: 'none',
          title: data.msg
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: "登录成功！"
        })
        upData('userInfo',data['info'][0])
        uni.navigateBack();
        remove('freeDuration')
      }
    }
  }
}
</script>

<style>
/deep/ .uni-forms-item__label {
  width: 0 !important;
}
</style>