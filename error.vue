<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message: string
    url: string
  }
}>()

const { t } = useI18n()
const localePath = useLocalePath()
// const { formatLink } = useInternationalization(localePath)

const errorMessageMap: { [key: number]: string } = {
  404: t('errorPages.404'),
  408: t('errorPages.408'),
  500: t('errorPages.500'),
  502: t('errorPages.502'),
  503: t('errorPages.503'),
}

const errorMessage =
  props.error.statusMessage || errorMessageMap[props.error.statusCode as keyof typeof errorMessageMap]

// if (props.error.statusCode === 412) {
//   // setting a timeout here to ensure we are the last error message in terminal
//   setTimeout(() => {
//     console.error('Looks like your API connection is not working. Check your nuxt configuration (shopwareEndpoint and shopwareAccessToken). 🤞')
//     console.error('For more help ➡️  https://frontends.shopware.com/resources/troubleshooting.html')
//   }, 2.0 * 1000)
// }
</script>

<script lang="ts">
export default {
  name: 'ErrorPage',
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-white py-48">
    <div class="flex flex-col">
      <div class="flex flex-col items-center">
        <div class="text-indigo-500 font-bold text-7xl">
          {{ props.error.statusCode }}
          <!-- {{ $t('error') }} -->
        </div>
        <pre style="display: none">{{ error }}</pre>
        <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
          {{ errorMessage }}
        </div>

        <!-- <div class=" font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
          {{ $t('setup.problems') }}
        </div> -->

        <NuxtLink
          href="/"
          :external="true"
          class="link"
          style="
            margin-top: 20px;
            font-size: 15px;
            letter-spacing: 1px;
            line-height: 18px;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            text-decoration: none solid rgb(255, 255, 255);
            border: 1px solid rgba(0, 0, 0, 0);
            background-color: rgb(18, 18, 18);
            color: rgb(255, 255, 255);
            min-width: 320px;
            min-height: 45px;
            transition: all 0.1s linear 0s;
            appearance: none;
            outline: rgb(255, 255, 255) none 0px;
          "
        >
          {{ $t('goBackHome') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.link:hover {
  background: #c69c6d !important;
}
</style>
