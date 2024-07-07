import { isString } from '~/utils/common'
import {
  GOOGLE_TRANSLATE_COOKIE_NAME,
  GOOGLE_TRANSLATE_JSSDK_URL,
  GOOGLE_TRANSLATE_ORIGINAL_SELECT_CLASSNAME,
} from './languages'
import {
  createGoogleTranslateJsonpCallback,
  createNamespace,
  createScriptTag,
  createStyleTag,
  GoogleTranslateFireEvent,
  removeIcon,
  useMutationObserver,
  type CreateScriptTagReturn,
  type UseMutationObserverReturn,
} from './utils'
const ns = createNamespace('select')

// 定义组合式函数
export function useGoogleTranslate() {
  const props = {
    /** select dropdown option */
    languages: [
      'en',
      'af',
      'sq',
      'ar',
      'hy',
      'az',
      'eu',
      'be',
      'bg',
      'ca',
      'zh-CN',
      'zh-TW',
      'he',
      'hr',
      'cs',
      'da',
      'nl',
      'et',
      'tl',
      'fi',
      'fr',
      'de',
      'el',
      'hu',
      'hi',
      'gu',
      'id',
      'ga',
      'it',
      'ja',
      'ko',
      'lt',
      'ms',
      'vi',
      'no',
      'pl',
      'pt',
      'ro',
      'ru',
      'es',
      'sv',
      'th',
      'tr',
      'uk',
    ],
    /** select input default language*/
    defaultLanguageCode: 'en',
    /** page(browser) content language */
    defaultPageLanguageCode: 'enF',
    /** get browser default language  */
    fetchBrowserLanguage: true,
  }
  const selectedLanguageCode = ref<string>('')
  const jsonCallbackFnName = ref<string>('')
  const scriptTag = ref<CreateScriptTagReturn | null>(null)
  const googleTranslateOriginSelectObserve = ref<Partial<UseMutationObserverReturn> | null>({})
  const htmlAttrLangObserve = ref<Partial<UseMutationObserverReturn> | null>({})

  /**
   * Google翻译的动态插入样式
   */
  function createStyle() {
    return createStyleTag(`body { top: 0 !important; } .skiptranslate { display: none !important; }`)
  }

  /**
   * 为Google Translate创建JSONP回调，当Google翻译加载回调时将被触发
   */
  function createJsonCallback() {
    const pageLanguage = props.defaultPageLanguageCode
    const { jsonpCallbackName } = createGoogleTranslateJsonpCallback(
      {
        pageLanguage,
      },
      setSelectedLanguageCode
    )
    jsonCallbackFnName.value = jsonpCallbackName
  }

  /**
   * 将JSONP回调传递给Google翻译
   */
  function createScript() {
    return createScriptTag(`${GOOGLE_TRANSLATE_JSSDK_URL}?cb=${unref(jsonCallbackFnName)}`)
  }

  /**
   * GoogleTranslate初始化
   */
  function createGoogleTranslate() {
    createStyle()
    createJsonCallback()
    scriptTag.value = createScript()
  }

  /**
   * 通过观察Google Translate的原始Select的DOM的变化触发翻译。
   *
   * 因为只有在加载Google Translate JSSDK URL资源之后，才能在JSONP中传递的回调函数，所以
   * Google Translate JSSDK URL将导入生成原始DOM的资源，在此处使用观察。
   */
  function createGoogleTranslateOriginSelectObserve() {
    googleTranslateOriginSelectObserve.value = useMutationObserver(
      document.querySelector(GOOGLE_TRANSLATE_ORIGINAL_SELECT_CLASSNAME)!,
      (records) => {
        records.forEach((record) => {
          if (record.addedNodes[0] && (record.addedNodes[0] as HTMLOptionElement).value) {
            if (selectedLanguageCode.value === (record.addedNodes[0] as HTMLOptionElement).value) {
              triggerTranslate((record.addedNodes[0] as HTMLOptionElement).value)
            }
          }
        })
      },
      {
        childList: true,
        subtree: true,
      }
    )

    unref(googleTranslateOriginSelectObserve)!.start!()
  }

  /**
   * 当Google Translate的原始执行执行时，HTML的属性“ lang”将具有自动状态，
   * 为了覆盖自动状态，我们再次称呼“句柄翻译”
   */
  function createHtmlAttrLangObserve() {
    htmlAttrLangObserve.value = useMutationObserver(
      document.querySelector('html')!,
      (records) => {
        records.forEach((record) => {
          if (record.attributeName === 'lang') {
            const currentValue = (record.target as HTMLElement).getAttribute('lang')
            const oldValue = record.oldValue
            // 修复auto的中间状态，如果页面当中内容较多，gt会有一个翻译的过程，就会抛出lang = auto，此时我们手动再触发一次翻译覆盖掉上次未进行完的翻译操作
            if (oldValue !== currentValue && oldValue && oldValue !== 'auto' && currentValue === 'auto') {
              handleTranslate(unref(selectedLanguageCode))
            }
          }
        })
        removeIcon()
      },
      {
        attributes: true,
        attributeOldValue: true,
      }
    )

    unref(htmlAttrLangObserve)!.start!()
  }

  /**
   * 模拟select的更改事件手动触发GoogleTranslate
   *
   * @param select
   */
  function triggerTranslate(select: HTMLSelectElement | string) {
    if (!select) {
      return
    }
    const selectValue = isString(select) ? select : select.value ?? ''
    const googleTranslateOriginalSelectEl = document.querySelector(
      GOOGLE_TRANSLATE_ORIGINAL_SELECT_CLASSNAME
    ) as HTMLSelectElement | null
    // const googleTranslateSelectEl = document.querySelector(`.${ns.b()}`)
    if (
      // !googleTranslateSelectEl ||
      !googleTranslateOriginalSelectEl ||
      // googleTranslateSelectEl.innerHTML.length === 0 ||
      googleTranslateOriginalSelectEl.options.length === 0
    ) {
      createGoogleTranslateOriginSelectObserve()
    } else {
      googleTranslateOriginalSelectEl.value = selectValue
      GoogleTranslateFireEvent(googleTranslateOriginalSelectEl, 'change')
      unref(googleTranslateOriginSelectObserve) && unref(googleTranslateOriginSelectObserve)!.stop!()
    }
  }

  /**
   * 确定当前选择的语言是否存在于props.languages中
   *
   * @param code
   */
  function isLanguageCodeInLanguages(code: string) {
    // 如果 code 不存在于语言列表中默认使用英语
    const result = props.languages.find((language) => language.code === code)
    return result ? code : 'en'
  }

  /**
   * 获取浏览器语言
   */
  function getBrowserLanguage() {
    const browserLanguage = window.navigator.language || document.documentElement.lang || 'en'

    const filterLanguages = ['zh-CN', 'zh-TW']
    if (filterLanguages.every((l) => l !== browserLanguage)) {
      if (browserLanguage.indexOf('-') > -1) {
        return browserLanguage.split('-')[0]
      }
    }
    return browserLanguage
  }

  /**
   * 触发GoogleTranslate Translate后，会生成一个名为“googtrans”的cookie，如“/en/tr”
   */
  function getGoogleCookieLanguage() {
    const googleTranslateCookie = getCookie(GOOGLE_TRANSLATE_COOKIE_NAME)

    if (googleTranslateCookie) {
      const googleTranslateCookieResult = googleTranslateCookie.split('/')
      return googleTranslateCookieResult[2] ? googleTranslateCookieResult[2] : 'en'
    } else {
      return ''
    }
  }

  /**
   * 使用浏览器语言、cookie“googtrans”获取语言代码
   */
  function setSelectedLanguageCode() {
    const isFetchBrowserLanguageOpen = props.fetchBrowserLanguage
    const browserLanguage = isFetchBrowserLanguageOpen ? isLanguageCodeInLanguages(getBrowserLanguage()) : ''
    const googleCookieLanguage = getGoogleCookieLanguage()
    const isGoogleCookieLanguageExist = !!googleCookieLanguage

    const handleDefaultLanguage = () => {
      if (props.defaultLanguageCode) {
        return props.defaultLanguageCode
      } else {
        return 'en'
      }
    }

    const handleBrowserLanguageInLanguages = () => {
      const isBrowserLanguageInLanguages = !!props.languages.find((language) => language.code === browserLanguage)
      if (isBrowserLanguageInLanguages) {
        return browserLanguage
      } else {
        return handleDefaultLanguage()
      }
    }

    const handleGoogleCookieLanguageInLanguages = () => {
      const isGoogleCookieLanguageInLanguages = !!props.languages.find(
        (language) => language.code === googleCookieLanguage
      )
      if (isGoogleCookieLanguageInLanguages) {
        return googleCookieLanguage
      } else {
        return handleDefaultLanguage()
      }
    }

    let selectedCode = handleDefaultLanguage()
    if (!isGoogleCookieLanguageExist) {
      // 首次
      if (isFetchBrowserLanguageOpen) selectedCode = handleBrowserLanguageInLanguages()
    } else {
      // 非首次
      // 越过浏览器语言判断直接去列表中匹配
      selectedCode = handleGoogleCookieLanguageInLanguages()
    }

    handleTranslate(selectedCode)
  }

  function handleTranslate(code: string) {
    triggerTranslate(code)
    selectedLanguageCode.value = code
  }

  onMounted(() => {
    createGoogleTranslate()
    createHtmlAttrLangObserve()
  })

  onBeforeUnmount(() => {
    if (unref(googleTranslateOriginSelectObserve)?.stop) {
      unref(googleTranslateOriginSelectObserve)!.stop!()
    }

    if (unref(htmlAttrLangObserve)?.stop) {
      unref(htmlAttrLangObserve)!.stop!()
    }

    if (unref(scriptTag)?.unload) {
      unref(scriptTag)!.unload!()
    }
  })

  return {
    handleTranslate,
  }
}
