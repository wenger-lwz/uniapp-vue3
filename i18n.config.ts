import bg from './locales/bg-BG.json'
import cs from './locales/cs-CZ.json'
import da from './locales/da-DK.json'
import de from './locales/de-DE.json'
import el from './locales/el-GR.json'
import ph from './locales/en-PH.json'
import en from './locales/en-US.json'
import ar from './locales/es-AR.json'
import es from './locales/es-ES.json'
import et from './locales/et-EE.json'
import fi from './locales/fi-FI.json'
import fr from './locales/fr-FR.json'
import hu from './locales/hu-HU.json'
import id from './locales/in-ID.json'
import it from './locales/it-IT.json'
import ja from './locales/ja-JP.json'
import ko from './locales/ko-KR.json'
import ms from './locales/ms-BN.json'
import mb from './locales/nb-NO.json'
import nl from './locales/nl-NL.json'
import pl from './locales/pl-PL.json'
import pt from './locales/pt-PT.json'
import ro from './locales/ro-RO.json'
import ru from './locales/ru-RU.json'
import sk from './locales/sk-SK.json'
import th from './locales/th-TH.json'
import vn from './locales/vi-VN.json'
import cn from './locales/zh-CN.json'
import tw from './locales/zh-TW.json'

// en：英语

// ar：阿拉伯语

// da：丹麦语

// de：德语

// el：希腊语

// es：西班牙语

// et：爱沙尼亚语

// fi：芬兰语

// fr：法语

// hu：匈牙利语

// id：印度尼西亚语

// it：意大利语

// ja：日语

// ko：韩语

// ms：马来语

// nl：荷兰语

// no：挪威语

// pl：波兰语

// pt：葡萄牙语

// ro：罗马尼亚语

// ru：俄语

// sk：斯洛伐克语

// sl：斯洛文尼亚语

// sv：瑞典语

// th：泰语
export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    sk,
    da,
    el,
    et,
    fi,
    hu,
    ms,
    mb,
    cs,
    bg,
    de,
    es,
    fr,
    id,
    it,
    ja,
    ko,
    nl,
    ph,
    pl,
    pt,
    ro,
    ru,
    th,
    'zh-TW': tw,
    tw,
    vn,
    ar,
    en,
    'zh-CN': cn,
    cn,
  },
}))
