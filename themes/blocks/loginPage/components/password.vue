<template>
  <div class="w-full flex-col justify-center items-start px-0 md:px-31.06% flex-grow">
    <!-- 设置密码 -->
    <div class="text-black text-16px md:text-[26px] font-semibold capitalize">{{ $t('login.emailpassword') }}</div>
    <div class="text-neutral-400 text-base font-normal capitalize mt-12px">{{ $t('login.emailpassword_tip') }}</div>
    <n-space vertical class="w-full mt-50px">
      <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false" width="100%">
        <n-form-item path="password">
          <n-input
            style="--n-height: 48px"
            type="password"
            show-password-on="mousedown"
            :maxlength="20"
            @input="checkPasswordStrength"
            v-model:value="formValue.password"
            :placeholder="$t('login.register_tips')"
          />
          <!-- <n-input v-model:value="formValue.password" placeholder="输入密码" maxlength="20" /> -->
        </n-form-item>
        <n-form-item path="password">
          <n-input
            style="--n-height: 48px"
            type="password"
            show-password-on="mousedown"
            :maxlength="50"
            v-model:value="formValue.verbpassword"
            :placeholder="$t('login.password_agin')"
          />
          <!-- <n-input v-model:value="formValue.password" placeholder="确认密码" maxlength="20" /> -->
        </n-form-item>
        <n-form-item path="code">
          <div class="custom-input-container">
            <n-input
              style="--n-height: 48px"
              class="custom-input"
              show-password-on="mousedown"
              :maxlength="8"
              v-model:value="formValue.code"
              :placeholder="$t('login.code')"
            />
          </div>
          <!-- <n-input v-model:value="formValue.password" placeholder="确认密码" maxlength="20" /> -->
        </n-form-item>
      </n-form>
    </n-space>
    <n-button
      :loading="loading"
      :disabled="!formValue.password || !formValue.verbpassword || !formValue.code"
      type="primary"
      style="height: 48px"
      class="mt-26px w-100%"
      @click="setpassword"
    >
      {{ $t('login.confirm') }}
    </n-button>
    <n-space size="large" class="w-full mb-50px mt-36px" justify="center" align="center">
      <div class="text-neutral-400 text-sm font-normal capitalize cursor-pointer" @click="model = 'login'">
        {{ $t('login.gologin') }}
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useMessage, type FormInst } from 'naive-ui'
import { shopResetPassword } from '~/services/api'
const { t } = useI18n()
const message = useMessage()
const model = defineModel()

/** 表单对象  */
const formValue = defineModel<any>('form')

/**  ref */
const formRef = ref<FormInst | null>(null)

const loading = ref(false)

/**  重置密码 */
const setpassword = async (e: MouseEvent) => {
  if (formValue.value.password != formValue.value.verbpassword) {
    message.error(t('login.password_agin_Error'))
    return false
  } else {
    e.preventDefault()
    formRef.value?.validate(async (errors: any) => {
      if (!errors) {
        formValue.value.source = 'reset'
        const res: any = await shopResetPassword(formValue.value)

        if (res.data != null) {
          model.value = 'login'
          message.success(res.data.show)
        } else {
          message.error(res.error.msg)
        }
        try {
          loading.value = true
        } finally {
          loading.value = false
        }
      }
    })
  }
}

/**  获取密码长度 */
function getPasswordStrength(password: any) {
  let strength = ''
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChars = /\W/.test(password)

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

const isPasswordFocused = ref(false)
const istwoPasswordFocused = ref(false)
const iscodeFocused = ref(false)
const passwordStrength = ref('')
</script>
