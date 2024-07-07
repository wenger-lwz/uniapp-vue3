export const routeRules = {
  '/': {
    isr: 60 * 60 * 24,
  },
  '/checkouts': {
    ssr: false,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },
  '/checkouts/**': {
    ssr: false,
    prerender: true,
  },

  '/account': {
    ssr: true,
  },
  '/account/**': {
    ssr: true,
  },
  '/collections': {
    ssr: true,
  },
  '/collections/**': {
    ssr: true,
  },
  '/search': {
    ssr: true,
  },
  '/search/**': {
    ssr: true,
  },
  '/sites': {
    ssr: false,
  },
  '/orders': {
    ssr: false,
  },
  '/orders/**': {
    ssr: false,
  },
  '/**': {
    isr: 60 * 60 * 24,
  },
}
