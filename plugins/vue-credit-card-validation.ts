import { defineNuxtPlugin } from '#app'
import VueCreditCardValidation from '@alekseyburn/vue-credit-card-validation'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueCreditCardValidation)
})
