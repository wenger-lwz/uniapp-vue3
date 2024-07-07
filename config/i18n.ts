export default {
// ar:"阿拉伯语",
// bg:"保加利亚",
// cn:"中文简体",
// cs:"捷克语",
// de:"德语",
// el:"希腊语",
// en:"英文",
// es:"西班牙语",
// fr:"法语",
// hu:"匈牙利",
// id:"印尼语",
// it:"意大利语",
// jp:"日语",
// ko:"韩语",
// nl:"荷兰语",
// ph:"菲律宾语",
// pl:"波兰语",
// pt:"葡萄牙语",
// ro:"罗马尼亚语",
// ru:"俄语",
// sk:"斯洛伐克",
// sl:"斯洛文尼亚",
// th:"泰语",
// tw:"中文繁体",
// vn:"越南语",
  strategy: 'prefix_except_default',
  defaultLocale: 'zh-CN',
  locale:'zh-CN',
  detectBrowserLanguage: false,//检测浏览器语言
  langDir: './i18n/src/langs/',
  vueI18n: './i18n/config',
  compilation: {
    jit: false,
  },
  locales: [
    {
      code: "zh-CN",
      iso: "zh-CN",
      file: "zh-CN.ts",
    },
    {
      code: "en",
      iso: "en-GB",
      file: "en.ts",
    },
    {
      code: "ar",
      iso: "en-GB",
      file: "ar.ts",
    },
    {
      code: "bg",
      iso: "en-GB",
      file: "bg.ts",
    },
    {
      code: "cs",
      iso: "zh-CN",
      file: "cs.ts",
    },
    {
      code: "de",
      iso: "zh-CN",
      file: "de.ts",
    },
    {
      code: "el",
      iso: "zh-CN",
      file: "el.ts",
    },
    {
      code: "en",
      iso: "zh-CN",
      file: "en.ts",
    },
    {
      code: "es",
      iso: "zh-CN",
      file: "es.ts",
    },
    {
      code: "fr",
      iso: "zh-CN",
      file: "fr.ts",
    },
    {
      code: "hu",
      iso: "zh-CN",
      file: "hu.ts",
    },{
      code: "id",
      iso: "zh-CN",
      file: "id.ts",
    },
    {
      code: "it",
      iso: "zh-CN",
      file: "it.ts",
    },
    {
      code: "jp",
      iso: "zh-CN",
      file: "jp.ts",
    },
    {
      code: "ko",
      iso: "zh-CN",
      file: "ko.ts",
    },
    {
      code: "nl",
      iso: "zh-CN",
      file: "nl.ts",
    },
    {
      code: "ph",
      iso: "zh-CN",
      file: "ph.ts",
    },
    {
      code: "pl",
      iso: "zh-CN",
      file: "pl.ts",
    },
    {
      code: "pt",
      iso: "en-GB",
      file: "pt.ts",
    },
    {
      code: "ro",
      iso: "pl-PL",
      file: "ro.ts",
    },
    {
      code: "ru",
      iso: "de-DE",
      file: "ru.ts",
    },
    {
      code: "sk",
      iso: "de-DE",
      file: "sk.ts",
    },
    {
      code: "sl",
      iso: "de-DE",
      file: "sl.ts",
    },
    {
      code: "th",
      iso: "de-DE",
      file: "th.ts",
    },
    {
      code: "tw",
      iso: "de-DE",
      file: "tw.ts",
    },
    {
      code: "vn",
      iso: "de-DE",
      file: "vn.ts",
    },
    {
      code: 'en-GB',
      iso: 'en-GB',
      file: 'en-GB.ts',
    },
    {
      code: 'pl-PL',
      iso: 'pl-PL',
      file: 'pl-PL.ts',
    },
    {
      code: 'de-DE',
      iso: 'de-DE',
      file: 'de-DE.ts',
    },
  ],
  experimental: {
    jsTsFormatResource: true,
  },
}