<template>
  <div class="w-full flex-col mt-36px items-start px-0 md:px-31.06% flex-grow">
    <!-- 注册 -->
    <div class="text-black text-[46px] font-semibold capitalize">{{ $t('login.register') }}</div>
    <div class="text-neutral-400 text-base font-normal capitalize mt-12px">{{ $t('login.login_title') }}</div>
    <n-space vertical class="w-full mt-50px">
      <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false" width="100%">
        <n-form-item path="email">
          <n-input
            style="--n-height: 48px"
            v-model:value="formValue.email"
            :maxlength="50"
            :placeholder="$t('login.login_title')"
          />
          <!-- <n-input v-model:value="formValue.email" placeholder="输入邮箱地址" /> -->
        </n-form-item>
        <n-form-item path="password">
          <n-input
            style="--n-height: 48px"
            type="password"
            show-password-on="mousedown"
            :maxlength="50"
            @input="checkPasswordStrength"
            v-model:value="formValue.password"
            :placeholder="$t('login.register_tips')"
          />
          <!-- <n-input v-model:value="formValue.password" type="password" show-password-on="mousedown" placeholder="输入密码" :maxlength="8" /> -->
        </n-form-item>
        <n-form-item path="verbpassword">
          <n-input
            style="--n-height: 48px"
            class="custom-input"
            type="password"
            show-password-on="mousedown"
            :maxlength="50"
            v-model:value="formValue.verbpassword"
            :placeholder="$t('login.password_agin')"
          />
          <!-- <n-input v-model:value="formValue.verbpassword" type="password" show-password-on="mousedown" placeholder="再次输入密码" :maxlength="8" /> -->
        </n-form-item>
      </n-form>
    </n-space>
    <n-button
      :loading="loading"
      type="primary"
      style="height: 48px"
      class="mt-26px w-100%"
      :disabled="!formValue.email || !formValue.password || !formValue.verbpassword"
      @click="handleRegister"
    >
      {{ $t('login.register') }}
    </n-button>
    <n-button size="large" text class="mt-10px w-100%" @click="model = 'login'">{{ $t('login.gologin') }}</n-button>

    <!-- <n-button type="primary" class=" mt-10px w-100%">
            <n-countdown ref="countdown" :duration="6000" :active="active" />
            <span>s后重新发送</span>
          </n-button> -->
  </div>
</template>

<script setup lang="ts">
import { useMessage, type FormInst } from 'naive-ui'
import { shopRegister } from '~/services/api'

const message = useMessage()

const model = defineModel()

/** 表单对象  */
const formValue = defineModel<any>('form')
const { t } = useI18n()

/**  ref */
const formRef = ref<FormInst | null>(null)

/**  加载loading */
const loading = ref(false)
/**  注册按钮 */
const handleRegister = async (e: MouseEvent) => {
  // active.value = true

  if (formValue.value.password != formValue.value.verbpassword) {
    message.error(t('login.password_Error'))
    return
  } else {
    e.preventDefault()
    formRef.value?.validate(async (errors: any) => {
      if (!errors) {
        try {
          loading.value = true
          const res: any = await shopRegister(formValue.value)
          if (res.data != null && res.data.code == 200 && res.data.statue == 1) {
            message.success(t('login.reg_success'))
            model.value = 'login'
          } else {
            message.error(res.error.msg)
          }
        } finally {
          loading.value = false
        }
      }
    })
  }
}

const passwordStrength = ref()
/**  获取密码长度 */
function getPasswordStrength(password: any) {
  let strength = ''
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChars = /\W/.test(password)
  // console.log(hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars)
  // console.log(password.length)

  const count = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length

  if (password.length >= 8 && count >= 3) {
    strength = t('login.strong')
  } else if (password.length >= 6 && count >= 2) {
    strength = t('login.medium')
  } else if (password) {
    strength = t('login.weak')
  }

  return strength
}

/**  检查秘密长度 */
const checkPasswordStrength = () => {
  const strength = getPasswordStrength(formValue.value.password)
  passwordStrength.value = strength
}
</script>
