<template>
  <div class="flex flex-col px-5 py-7 text-sm rounded border border-solid border-zinc-200 max-w-[622px] mb-5">
    <div
      class="flex gap-5 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full border-b-zinc-200 border-b pb-16px"
    >
      <div class="flex gap-5 justify-between self-start">
        <div class="tracking-wide text-black w-80px break-all">{{ $t('checkout.email') }}</div>
        <div class="flex-auto text-zinc-500">{{ formValue?.addres?.email }}</div>
      </div>
      <n-button @click="current = 1" text class="tracking-wide color-primary">{{ $t('checkout.editor') }}</n-button>
    </div>

    <div
      class="flex gap-5 justify-between mt-5 w-full max-md:flex-wrap max-md:max-w-full border-b-zinc-200 pb-16px"
      :class="current == 2 ? '' : 'border-b'"
    >
      <div class="flex gap-5 justify-between">
        <div class="self-start tracking-wide text-black w-80px break-all">{{ $t('checkout.shipping_address') }}</div>
        <div class="leading-6 text-zinc-500">
          {{ formValue?.addres?.first_name }} {{ formValue?.addres?.last_name }} {{ formValue?.addres?.phone }}
          <br />
          {{ formValue?.addres?.country }} {{ formValue?.addres?.province }} {{ formValue?.addres?.apartment }}
          {{ formValue?.addres?.city }} {{ formValue?.addres?.addr }} {{ formValue?.addres?.postal }}
          {{ formValue?.addres?.country_code }}
        </div>
      </div>
      <n-button @click="current = 1" text class="self-start tracking-wide color-primary">
        {{ $t('checkout.editor') }}
      </n-button>
    </div>

    <div v-if="current == 3" class="flex gap-5 justify-between mt-5 w-full max-md:flex-wrap max-md:max-w-full">
      <div class="flex gap-5 justify-between self-start">
        <div class="tracking-wide text-black w-80px break-all">{{ $t('checkout.mailingMethod') }}</div>
        <div class="flex-auto text-zinc-500">{{ mailing_method }}</div>
      </div>
      <n-button @click="current = 2" text class="tracking-wide color-primary">{{ $t('checkout.editor') }}</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const current = defineModel<number>('current')

defineProps<{
  formValue: any
  mailing_method: string
}>()
</script>

<style></style>
