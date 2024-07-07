
<script setup lang="ts">


const props = defineProps<{
  customizeCodeData: any[]
}>()

const route = useRoute()
const pageArr = ref<any[]>([])
const codeList = computed(() => {
  /**  过滤开启并适用全部 */
  let allList = props.customizeCodeData.filter(
    (item: { enabled: number; pages: string | any[] }) => item.enabled == 1 && item.pages.length == 0
  )
  /**  过滤开启并指定的页面并判断是否是当前页 */
  let appointList = props.customizeCodeData.filter(
    (item: { enabled: number; pages: string | any[] }) => item.enabled == 1 && item.pages.length > 0
  )
  if (appointList.length > 0) {
    pageArr.value = appointList.filter((i: { pages: string | any[] }) => i.pages.includes(route.params?.all[0]))
  }
  return [...allList, ...pageArr.value].flat()
})

const insertScript = (row: { codes: any }) => {
  const str = row.codes
  const scriptRegex = /<script>(.*?)<\/script>/gs
  const matches = str.match(scriptRegex)
  matches.forEach((item: { match: (arg0: RegExp) => any; position: number }) => {
    const scriptRegexCHild = /<script>(.*?)<\/script>/
    const scriptMatches = item.match(scriptRegexCHild)
    useHead({
      script: [
        {
          innerHTML: scriptMatches[1],
          tagPosition: item.position == 1 ? 'bodyClose' : 'head',
        },
      ],
    })
  })
}

const insertMeta = (row: { codes: any,position:any }) => {
  const str = row.codes
  const metaRegex = /<meta\s+([^>]*)>/g
  const metaMatches = str.matchAll(metaRegex)
  const result = []
  for (const match of metaMatches) {
    const attrs = match[1].split(/\s+/)
    const attrsObj = {
      [key]:String
    }
    for (const attr of attrs) {
      const [key, value] = attr.split('=')
      attrsObj[key] = value ? value.replace(/'/g, '') : ''
    }
    result.push(attrsObj)
  }

  useHead({
    meta: result.map((i) => {
      return {
        ...i,
        tagPosition: row.position == 1 ? 'bodyClose' : 'head',
      }
    }),
  })
}

codeList.value.forEach((item: any) => {
  // 设置script
  insertScript(item)
  // 设置Meta
  insertMeta(item)
})


// 设置html
const parseHtmlString = (htmlString: string,type:string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const body = doc.body
  let scriptTags = body.getElementsByTagName('script')
  let styleTags = body.getElementsByTagName('style')
  while (scriptTags.length > 0) {
    body.removeChild(scriptTags[0])
  }
  while (styleTags.length > 0) {
    body.removeChild(styleTags[0])
  }
  let cleanedStr = body.innerHTML.replace(/[\n\r\s]+/g, '');
  let targetElement = document.getElementsByTagName('body')[0]
  targetElement.insertAdjacentHTML(`${type=='2'?'afterbegin':'beforeend'}`, `${cleanedStr}`)
  return body.innerHTML
}


onMounted(() => {
  codeList.value.map((i: { codes: string; position: string; }) => {
    parseHtmlString(i.codes,i.position)
  })
})
</script>
