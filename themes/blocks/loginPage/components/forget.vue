<template>
  <div class="w-full flex-col justify-center items-start px-0 md:px-31.06% flex-grow">
    <!-- 忘记密码 -->
    <div class="text-black text-16px md:text-[26px] font-semibold capitalize">{{ $t('login.emailpassword') }}</div>
    <div class="text-neutral-400 text-base font-normal capitalize mt-12px">{{ $t('login.emailpassword_tip') }}</div>
    <n-space vertical class="w-full mt-50px">
      <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false" width="100%">
        <n-form-item path="email">
          <n-input
            style="--n-height: 48px"
            class="custom-input"
            v-model:value="formValue.email"
            :maxlength="50"
            :placeholder="$t('login.login_tips')"
          />
          <!-- <n-input v-model:value="formValue.email" placeholder="输入邮箱地址" /> -->
        </n-form-item>
      </n-form>
    </n-space>
    <n-button
      :loading="loading"
      :disabled="!formValue.email"
      type="primary"
      style="height: 48px"
      class="mt-40px mb-30px w-100%"
      @click="handleResetPassword"
    >
      {{ $t('login.confirm') }}
    </n-button>
    <n-button size="large" text class="mt-10px w-100%" @click="model = 'login'">{{ $t('login.gologin') }}</n-button>
  </div>
</template>

<script setup lang="ts">
import { useMessage, type FormInst, type FormRules } from 'naive-ui'
import { shopResetPassword } from '~/services/api'
const message = useMessage()
const { t } = useI18n()
const model = defineModel()

/** 表单对象  */
const formValue = defineModel<any>('form')

/**  ref */
const formRef = ref<FormInst | null>(null)

const loading = ref(false)

/**  忘记密码按钮 */
const handleResetPassword = async (e: MouseEvent) => {
  formValue.value.password = ''
  // console.log('忘记密码')
  let data = {
    email: formValue.value.email,
    source: 'send',
  }
  e.preventDefault()
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      // formValue.value.source='send'
      try {
        loading.value = true
        const res: any = await shopResetPassword(data)
        // console.log(res.data)

        if (res.data != null) {
          model.value = 'password'
          message.success(res.data.show)
        } else {
          message.error(res.error.msg)
        }
      } finally {
        loading.value = true
      }
    } else {
      // console.log(errors)
      message.error(t('login.emailErr'))
    }
  })
}

/**  验证规则 */
const rules: ComputedRef<FormRules | undefined> = computed(() => {
  return {
    email: [
      { required: true, message: t('login.login_tips'), trigger: 'blur' },
      { type: 'email', message: t('login.emailErr'), trigger: ['blur', 'change'] },
    ],
  }
})
</script>

<style lang="scss" scoped></style>
