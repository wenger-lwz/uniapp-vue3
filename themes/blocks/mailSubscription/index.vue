<!-- 邮箱订阅不可删除 -->
<template>
  <section class="w-full h-100 flex gap-2 flex-wrap flex-center">
    <div class="h-100 flex-col flex-center">
      <div class="font-bold s-title">{{ datas.title }}</div>
      <div
        class="left-0 top-[14px] font-normal leading-tight s-sub-title"
        v-html="HtmlUtil.escape2Html(datas.subTitle)"
      ></div>
      <div v-if="!seninfo" class="flex min-w-275px mt-30px">
        <n-input
          v-model:value="email"
          :placeholder="$t('message.placeholder')"
          class="md:w-70 w-44 md:h-[50px] h-10.5 flex-1 align-middle"
        />
        <n-button type="primary" class="md:h-[50px] min-w-25 h-10.5 !text-center" @click="successEvent">
          <p>{{ $t('subscribe') }}</p>
        </n-button>
      </div>
      <div v-else class="flex-center w-275px text-center">
        <p class="text-xl color-green-6">{{ $t('message.subscribeSuccess') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { Subscription } from '~/services/api'
import { HtmlUtil } from '~/utils/common/htmlDecode'
const { t } = useI18n()
defineOptions({
  name: 'MailSubscription',
})
const seninfo = ref(false)
defineProps<{
  datas?: any
}>()
const message = useMessage()
const email = ref<any>()

const successEvent = async () => {
  const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
  let data = { email: email.value }

  if (emailRegex.test(email.value)) {
    const res: any = await Subscription(data)
    console.log('邮件订阅', res.data.state)
    if (res.data.state == 'ok' && res.data.code == 200) {
      seninfo.value = true
      message.success(t('message.subscribeSuccess'))
    } else {
      message.error(res.error.msg)
    }
  } else {
    message.error(t('message.emailError'))
    email.value = ''
  }
}
</script>

<style scoped lang="scss">
:deep(.n-form-item.n-form-item--top-labelled.n-form-item--no-label) {
  grid-template-areas: 'blank';
  grid-template-rows: 1fr;
}
:deep(.n-input .n-input__input-el) {
  height: 100%;
}
:deep(.n-button__content) {
  justify-content: center;
}
</style>
