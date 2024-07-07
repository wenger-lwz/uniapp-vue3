// @ts-nocheck

// export default (ctx, inject) => {
//   const instance = new TikTok(<%= JSON.stringify(options) %>)
//   if (!instance.options.disabled) {
//     instance.enable()
//   }
//   /* eslint-enable */
//   ctx.$tiktok = instance
//   inject('tiktok', instance)
// }

function _setUp(options) {
  /* eslint-disable */
  if (typeof window !== 'undefined' && options.pixel) {
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t
      var ttq = (w[t] = w[t] || [])
      ;(ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie']),
        (ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
          }
        })
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
      ;(ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n])
        return e
      }),
        (ttq.load = function (e, n) {
          var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
          ;(ttq._i = ttq._i || {}), (ttq._i[e] = []), (ttq._i[e]._u = i), (ttq._t = ttq._t || {}), (ttq._t[e] = +new Date()), (ttq._o = ttq._o || {}), (ttq._o[e] = n || {})
          var o = document.createElement('script')
          ;(o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t)
          var a = document.getElementsByTagName('script')[0]
          a.parentNode.insertBefore(o, a)
        })
      ttq.load(options.pixel)
      ttq.page()
    })(window, document, 'ttq')
  }
}

import { defineNuxtPlugin, useRoute, useRouter, useRuntimeConfig } from '#app'

/**
 * @class Fb
 */
class Fb {
  eventsQueue: any
  fqbLoaded: boolean
  options: any
  fbq: any
  isEnabled: any
  userData: any

  constructor(options: any) {
    this.eventsQueue = []
    this.fqbLoaded = false
    this.options = options
    this.fbq = null

    this.isEnabled = !options.disabled
  }

  setFbq(fbq: any) {
    this.fbq = fbq
    this.fqbLoaded = true

    this.send()
  }

  setPixelId(pixelId: any) {
    this.options.pixelId = pixelId
    this.init()
  }

  /**
   * @method setUserData
   * Used to set user data that'll be used once the `fbq` init function is called.
   * @param {object} [userData] See https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching#reference
   */
  setUserData(userData: any) {
    this.userData = userData
  }

  /**
   * @method enable
   */
  enable() {
    this.isEnabled = true
    this.init()
    this.track()
  }

  /**
   * @method disable
   */
  disable() {
    this.isEnabled = false
  }

  /**
   * @method init
   */
  init() {
    this.query('init', this.options.pixelId, this.userData || undefined)
  }

  /**
   * @method track
   */
  track(event: any = null, parameters: any = null, eventID: any = null) {
    if (!event) {
      event = this.options.track
    }
    if (!eventID) {
      this.query('track', event, parameters)
    } else {
      this.query('track', event, parameters, eventID)
    }
  }

  /**
   * @method query
   * @param {string} cmd
   * @param {object} option
   * @param {object} parameters
   * @param {object} eventID
   */
  query(cmd: any, option: any, parameters: object = null, eventID: object = null) {
    if (this.options.debug) log('Command:', cmd, 'Option:', option, 'Additional parameters:', parameters, 'EventID:', eventID)
    if (!this.isEnabled) return

    this.eventsQueue.push({
      cmd,
      option,
      parameters,
      eventID,
    })

    this.send()
  }

  send() {
    if (!this.fqbLoaded) {
      return
    }

    while (this.eventsQueue.length) {
      let event = this.eventsQueue.shift()

      if (this.options.debug) log('Send event: ', event)

      if (event.eventID) {
        this.fbq(event.cmd, event.option, event.parameters, event.eventID)
      } else if (event.parameters) {
        this.fbq(event.cmd, event.option, event.parameters)
      } else {
        this.fbq(event.cmd, event.option)
      }
    }
  }
}

function log(...messages: any) {
  // @ts-ignore
  console.info.apply(this as any, ['[@nuxtjs/meta-pixel]', ...messages])
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const parsedOptions = runtimeConfig.public.tiktok
  const router = useRouter()

  const isDev = parsedOptions.dev && !parsedOptions.debug
  if (isDev) log('You are running in development mode. Set "debug: true" in your nuxt.config.js if you would like to trigger tracking events in local.')

  const pixelOptions = parsedOptions

  const instance = new Fb(pixelOptions)

  if (typeof window !== 'undefined') {
    _setUp(instance)
  }
  /* eslint-enable */
  if (router) {
    router.afterEach(({ path }) => {
      /**
       * Change the current pixelId according to the route.
       */
      const pixelOptions = parsedOptions
      if (pixelOptions.pixelId !== instance.options.pixelId) {
        instance.setPixelId(pixelOptions.pixelId)
      }
      _setUp(instance)

      /**
       * Automatically track PageView
       */
      if (parsedOptions.autoPageView) {
        instance.track('PageView')
      }
    })
  }

  nuxtApp.provide('tiktok', instance)
})
