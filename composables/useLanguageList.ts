// import { getLanguage } from '~/services/api'

// /**  获取货币-国家语言 */
// export const useLanguageList = () => {
//   const languageList = ref(null)
//   onMounted(async () => {
//     await getLanguageList()
//   })
//   async function getLanguageList() {
//     try {
//       const { data } = await getLanguage()
//       if (data?.data) {
//         languageList.value = data?.data
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   return { languageList }
// }

export const useLanguageList = () => {
  const languageList = ref<any>(null)

  const { head_data } = storeToRefs(useThemeEditorStore())
  languageList.value = {
    currency: head_data.value?.cdatas,
    langs: head_data.value?.slangs,
  }
  return { languageList }
}
