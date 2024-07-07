import { setSeoshielding } from '@/components/customplugin/setSeoshielding'
export const seoHeader = (props: any) => {
  if (props && Object.keys(props).length) {
    useHead({
      meta: props?.head_data?.meta,
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: props?.head_data?.favicon,
        },
      ],
    })

    useSeoMeta({
      title: props?.head_data?.title,
    })

    if (props?.head_data?.google_analytics_id != '') {
      useHead({
        script: [
          {
            src: 'https://www.googletagmanager.com/gtag/js?id=' + props?.head_data?.google_analytics_id,
          },

          {
            innerHTML:
              'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "' +
              props?.head_data?.google_analytics_id +
              '");',
          },
        ],
      })
    }
    if (props?.head_data?.pinterest != '') {
      useHead({
        script: [
          {
            innerHTML: `function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
             var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;
             var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");pintrk('load', ${props?.head_data?.pinterest}); pintrk('page');`,
          },
        ],
        noscript: [
          {
            innerHTML: `<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/v3/?tid=${props?.head_data?.pinterest}&noscript=1" />`,
          },
        ],
      })
    }

    /**  处理弹窗 */
    const route = useRoute()
    const path = computed(() => {
      let location = 'index'
      if (route.params?.all?.[0]) {
        location = route.params.all?.[0]
      }
      return {
        src: '/api/addon/index.js?c=' + location,
        defer: true,
        async: true,
        tagDuplicateStrategy: 'merge',
      }
    })
    useHead({
      script: [() => path.value],
    })

    setSeoshielding(props?.head_data?.seoshielding)
  }
}

export const plugins = (props: any) => {
  if (props && Object.keys(props).length) {
    /** seo meta设置 */
    var scriptcont = 'var dLayers = [];'
    if (props?.head_data?.script && props.head_data.script.length) {
      props.head_data.script.forEach((i: { name: string; content: string }) => {
        scriptcont += ' var ' + i.name + " = '" + i.content + "';"
      })
    }

    /** 增加网页保护功能开启判断 */
    if (props?.head_data?.protect) {
      /** 禁止选择 */
      if (props.head_data.protect['sel'] == 1) {
        scriptcont += '$(document).bind("selectstart", function () { return false });'
      }

      /** 禁用图片右键菜单 */
      if (props.head_data.protect['lcw'] == 1) {
        scriptcont += '$("body").on("contextmenu", "img", function (e) { return false });'
      }

      /** 禁用右键菜单 */
      if (props.head_data.protect['sbyj'] == 1) {
        scriptcont += '$(document).bind("contextmenu", function () { return false });'
      }

      /** 脚本会将文档的onkeydown事件设置为一个函数，该函数检查是否按下了Ctrl键，如果是，则将事件的keycode设置为0，并返回false */
      if (props.head_data.protect['kjzl'] == 1) {
        scriptcont +=
          'document.onkeydown = function() { if (event.ctrlKey == true) { event.keyCode = 0; event.returnValue = false } };'
      }

      /** 脚本会将文档的onkeydown事件设置为一个函数，该函数检查是否按下了F12键，如果是，则将事件的keycode设置为0，并返回false。它还定义了一个名为doCheck的函数，该函数执行一些操作和检查，并尝试使用值0执行它，捕获任何出现的错误 */
      if (props.head_data.protect['f12t'] == 1) {
        scriptcont +=
          'document.onkeydown = function(){ if(window.event && window.event.keyCode == 123) { event.keyCode = 0;event.returnValue = false;} };function doCheck(a) { if (("" + a/a)["length"] !== 1 || a % 20 === 0){ (function(){ }["constructor"]("debugger")()) }else{ (function(){}["constructor"]("debugger")()) } doCheck(++a);} try { doCheck(0); } catch (err) {}; '
      }
    }

    /** Facebook像素跟踪 */
    if (props?.head_data?.fb_pxs && Array.isArray(props?.head_data?.fb_pxs)) {
      var fbhtml = ''
      props.head_data.fb_pxs.forEach((i: string) => {
        fbhtml += 'fbq("init", "' + i + '");'
      })
      scriptcont +=
        '!function(f,b,e,v,n,t,s){ if(f.fbq)return;n=f.fbq=function(){ n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,"script","https://connect.facebook.net/en_US/fbevents.js");' +
        fbhtml +
        'fbq("track", "PageView",{page:"' +
        props.head_data.ctl +
        '",handle:"' +
        props.head_data.act +
        '"});'
    }

    /** TikTok像素跟踪 */
    if (props?.head_data?.tt_pxs && Object.keys(props?.head_data?.tt_pxs).length) {
      var tthtml = ''
      props.head_data.tt_pxs.forEach((i: string) => {
        tthtml += 'ttq.load("' + i + '");'
      })
      scriptcont +=
        '!function (w, d, t) {   w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};' +
        tthtml +
        ' ttq.page(); }(window, document, "ttq");'
    }

    scriptcont += 'var tracks = function(args){  '
    if (props?.head_data?.tracks && Object.keys(props?.head_data?.tracks).length) {
      scriptcont += ' switch (args.event) { '
      Object.keys(props.head_data.tracks).forEach((k) => {
        scriptcont += 'case ("' + k + '"): ' + props.head_data.tracks[k]
      })
      scriptcont += '  } '
    }
    scriptcont += ' }; '
    useHead({
      script: [{ innerHTML: scriptcont }],
      style: [
        {
          innerHTML:
            '.showloading{width:100%;background: url(' +
            props?.head_data?.loading +
            ') center no-repeat transparent;}.lazys{min-height:200px;width:100%}::-webkit-scrollbar {width:4px;height:1px;}::-webkit-scrollbar-thumb {border-radius:4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);background:#535353;}::-webkit-scrollbar-track {border-radius:4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);background:#fff;}img[data-href]{cursor:pointer}',
        },
      ],
    })
    useHead({
      script: [
        {
          innerHTML: ` var dLayers = new TarckArray(${Boolean(props?.head_data?.fb_pxs.length)} ? 1 : '',${Boolean(props.head_data?.google_analytics_id)} ? 1 : ''
          ,shop_url,tracks,base_id + '-' + base_name);$(function () {add_logs(shop_url, '${props?.head_data?.ctl}', '${props?.head_data?.act}')})`,
          defer: true,
        },
      ],
    })
    if (props?.head_data?.slangs && Object.keys(props?.head_data?.slangs).length) {
      useHead({
        script: [
          {
            src: '/js/plugin/translate.js',
          },

          {
            innerHTML:
              'window.TRANSLATE_CONFIG = {"is_switch_language":' +
              props?.head_data?.langs_auto +
              ',"languages":' +
              JSON.stringify(props?.head_data?.slangs) +
              ',"copywriting_show_position":"top"};',
          },
        ],
      })
    }

    if (props?.head_data?.cdatas && Object.keys(props?.head_data?.cdatas).length) {
      useHead({
        script: [
          {
            src: '/js/plugin/currency.js',
            async: 'true',
          },

          {
            innerHTML:
              'window.CURRENCY_CONFIG = {"code":"' +
              props?.head_data?.currency +
              '","list":' +
              JSON.stringify(props?.head_data?.cdatas) +
              '};',
          },
        ],
      })
    }

    if (
      props?.head_data?.review != '' &&
      (props?.head_data?.ctl == 'products' || props?.head_data?.ctl == 'index' || props?.head_data?.ctl == 'themes')
    ) {
      useHead({
        script: [
          {
            src: '/js/plugin/reviews.js',
            defer: 'true',
          },
        ],
      })
    }
  }
}
