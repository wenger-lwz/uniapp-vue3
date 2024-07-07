<script setup lang="ts">
withDefaults(
  defineProps<{
    error?: {
      statusCode: any
    }
  }>(),
  {
    error: {
      statusCode: 404,
    },
  }
)

defineOptions({
  name: 'ErrorPage',
})
</script>

<template>
  <div class="flex items-center justify-center py-48">
    <div class="flex flex-col">
      <div class="flex flex-col items-center">
        <div class="text-indigo-500 font-bold text-7xl">
          {{ error.statusCode }}
          <!-- {{ $t('error') }} -->
        </div>

        <!-- <div class=" font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
          {{ $t('setup.problems') }}
        </div> -->

        <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
          <!-- {{ errorMessage }} -->
          {{ $t('setup.problems') }}
        </div>
        <NuxtLink
          href="/"
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
