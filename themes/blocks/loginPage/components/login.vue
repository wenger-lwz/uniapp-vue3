import type { shopLogin } from '~/services/api'
<template>
  <div class="w-full flex-col items-start px-0 mt-36px md:px-31.06%">
    <!-- 登录 -->
    <div class="text-black text-26px md:text-[46px] font-semibold capitalize">{{ $t('login.login') }}</div>
    <div class="text-neutral-400 text-14px md:text-16px font-normal capitalize mt-12px">
      {{ $t('login.login_title') }}
    </div>
    <n-space vertical class="w-full mt-50px">
      <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false" width="100%">
        <n-form-item path="email">
          <n-input
            style="--n-height: 48px"
            v-model:value="formValue.email"
            :maxlength="50"
            :placeholder="$t('login.login_tips')"
          />
          <!-- <n-input class=" email inline-block" v-model:value="formValue.email" placeholder="" maxlength="50" show-count /> -->
        </n-form-item>
        <n-form-item path="password">
          <n-input
            style="--n-height: 48px"
            type="password"
            show-password-on="click"
            :maxlength="50"
            v-model:value="formValue.password"
            :placeholder="$t('login.register_tips')"
          />
        </n-form-item>
      </n-form>
    </n-space>
    <n-button
      type="primary"
      :loading="loading"
      :disabled="loading || !formValue.email || !formValue.password"
      style="height: 48px"
      class="mt-26px w-100%"
      @click="handleSubmit"
    >
      {{ $t('login.login') }}
    </n-button>
    <n-space class="w-full mb-50px mt-36px" justify="center" align="center">
      <div class="text-neutral-400 text-sm font-normal capitalize cursor-pointer" @click="model = 'forget'">
        {{ $t('login.forget_pwd') }}
      </div>
      <div class="text-neutral-400 font-normal h-12px w0 border-l-1 border-#ABABAB ml20px mr20px"></div>
      <div class="text-neutral-400 text-sm font-normal capitalize cursor-pointer" @click="model = 'register'">
        {{ $t('login.register') }}
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { shopLogin } from '~/services/api'
const message = useMessage()
const router = useRouter()
const { t } = useI18n()

const model = defineModel()

/**  查看密码小眼睛 */
const isPasswordFocused = ref(false)
/**  登录令牌 */
const ukey = useCookie('ukey', {
  maxAge: 60 * 60 * 24 * 30,
})
/** 表单对象  */
const formValue = defineModel<any>('form')

/**  邮件输入款focus */
const isEmailFocused = ref(false)

/**  登录loading状态 */
const loading = ref(false)

/**  路由信息 */
const route = useRoute()

/**  登录 */
const handleSubmit = async () => {
  loading.value = true
  try {
    const res = await shopLogin(formValue.value)
    // 登录成功后的重定向逻辑
    //  const redirectUrl = sessionStorage.getItem('preLoginUrl') || '/';
    //   sessionStorage.removeItem('preLoginUrl'); // 清除保存的 URL
    // router.push(redirectUrl);
    if (res?.data?.statue == 1) {
      message.success(t('login.login_success'))
      // const redirectUrl = sessionStorage.getItem('preLoginUrl') || '/';
      // sessionStorage.setItem('userName', formValue.value.email)
      // sessionStorage.setItem('password', formValue.value.password)
      ukey.value = res.data.ukey
      refreshCookie('ukey')
      // sessionStorage.setItem('ukey', res.data.ukey)
      if (route.query?.redirect) {
        return router.push(toRaw(route.query?.redirect as string))
      }
      router.replace('/')
    } else {
      message.error(res.error.msg)
    }

    // console.log(window);

    //       window.location.href='/'
  } finally {
    loading.value = false
  }
}

/**  验证规则 */
const rules: ComputedRef<FormRules> = computed(() => {
  return {
    email: [
      { required: true, message: t('login.login_tips'), trigger: 'blur' },
      { type: 'email', message: t('login.emailErr'), trigger: ['blur', 'change'] },
    ],
    password: {
      required: true,
      message: t('login.passwordErr'),
      trigger: ['blur'],
    },
    verbpassword: {
      required: true,
      message: t('login.password_agin'),
      trigger: ['blur'],
    },
    code: {
      required: true,
      message: t('login.code'),
      trigger: ['blur'],
    },
  }
})
</script>
