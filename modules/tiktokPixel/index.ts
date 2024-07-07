import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  pixelId?: string | null
  track?: string
  autoPageView?: boolean
  version?: string
  pixels?: any[]
  manualMode?: boolean
  disabled?: boolean
  debug?: boolean
  dev?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-tiktok-pixel',
    configKey: 'tiktok',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    pixelId: null,
    track: 'PageView',
    autoPageView: false,
    version: '2.0',
    pixels: [],
    manualMode: false,
    disabled: true,
    debug: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    ;(nuxt.options.runtimeConfig.public as any).tiktok = options
    options.dev = nuxt.options.dev

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./templates/plugin'))
  },
})
