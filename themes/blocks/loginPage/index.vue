<template>
  <section class="flex-col justify-start h-100% items-center min-h-600px w-full">
    <Transition appear name="slide-right" mode="out-in">
      <component v-model:form="formValue" v-model="active" :is="activeModule!.component" />
    </Transition>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { forget, login, password, register } from './components'
type Modules = {
  key: string
  component: Component
}
const modules: Modules[] = [
  { key: 'forget', component: forget },
  { key: 'login', component: login },
  { key: 'password', component: password },
  { key: 'register', component: register },
]
const active = ref<string>('login')

const activeModule = computed(() => {
  return modules.find((item) => item.key === active.value)
})

defineOptions({
  name: 'LoginPage',
})

/** 表单对象  */
const formValue = ref<any>({
  email: '',
  password: '',
  verbpassword: '',
  source: '',
  code: '',
})
defineProps<{
  datas: any
}>()
</script>
