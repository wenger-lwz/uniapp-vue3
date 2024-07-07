import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetAttributify, presetTypography, presetUno } from 'unocss'
export default defineConfig({
  theme: {
    extend: {
      width: 'width',
      height: 'height',
    },
    colors: {
      brand: {
        primary: '#0d588f',
        light: '#5ebbff',
        dark: '#026ebd',
      },
      primary: 'var(--primary-color)',
      primary_hover: 'rgb(var(--primary-color-hover))',
      primary_pressed: 'rgb(var(--primary-color-pressed))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_1: 'rgb(var(--primary-color1))',
      primary_2: 'rgb(var(--primary-color2))',
      primary_3: 'rgb(var(--primary-color3))',
      primary_4: 'rgb(var(--primary-color4))',
      primary_5: 'rgb(var(--primary-color5))',
      primary_6: 'rgb(var(--primary-color6))',
      primary_7: 'rgb(var(--primary-color7))',
      primary_8: 'rgb(var(--primary-color8))',
      primary_9: 'rgb(var(--primary-color9))',
      info: 'rgb(var(--info-color))',
      info_hover: 'rgb(var(--info-color-hover))',
      info_pressed: 'rgb(var(--info-color-pressed))',
      info_active: 'rgb(var(--info-color-active),0.1)',
      success: 'rgb(var(--success-color))',
      success_hover: 'rgb(var(--success-color-hover))',
      success_pressed: 'rgb(var(--success-color-pressed))',
      success_active: 'rgb(var(--success-color-active),0.1)',
      warning: 'rgb(var(--warning-color))',
      warning_hover: 'rgb(var(--warning-color-hover))',
      warning_pressed: 'rgb(var(--warning-color-pressed))',
      warning_active: 'rgb(var(--warning-color-active),0.1)',
      error: 'rgb(var(--error-color))',
      error_hover: 'rgb(var(--error-color-hover))',
      error_pressed: 'rgb(var(--error-color-pressed))',
      error_active: 'rgb(var(--error-color-active),0.1)',
      dark: '#18181c',
      subTitleColor: 'var(--sub-title-color)',
      originalPrice: 'var(--original-price)',
      buttonColor: 'var(--button-color)',
      headerBgColor: 'var(--header-bg-color)',
      footerColor: 'var(--footer-color)',
      productTitleColor: 'var(--product-title-color)',
      textColor: 'var(--text-color)',
      secondaryButtonBorder: 'var(--secondary-button-border)',
      headerColor: 'var(--header-color)',
      secondaryButtonBgColor: 'var(--secondary-button-bg-color)',
      titleColor: 'var(--title-color)',
      searchBgColor: 'var(--search-bg-color)',
      searchColor: 'var(--search-color)',
      footerBgColor: 'var(--footer-bg-color)',
      price: 'var(--price)',
      subProductTitleColor: 'var(--sub-product-title-color)',
      buttonBgColor: 'var(--button-bg-color)',
      bgColor: 'var(--bg-color)',
    },

    breakpoints: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
      xl: '1600px',
    },
  },
  presets: [
    presetUno(),
    // presetIcons({
    //   collections: {
    //     carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default),
    //   },
    // }),
    presetAttributify(),
    presetTypography(),
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'i-flex-col': 'inline-flex flex-col',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-lb': 'fixed left-0 bottom-0',
    'fixed-rt': 'fixed right-0 top-0',
    'fixed-rb': 'fixed right-0 bottom-0',
    'fixed-tl': 'fixed-lt',
    'fixed-tr': 'fixed-rt',
    'fixed-bl': 'fixed-lb',
    'fixed-br': 'fixed-rb',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'text-ellipsis line-clamp-2 break-anywhere',
    'transition-base': 'transition-all duration-300 ease-in-out',
    's-title': 'color-titleColor font-[--title] text-size-[--title-font-size]',
    's-sub-title': 'color-subTitleColor font-[--subTitle] text-size-[--subTitle-font-size]',
  },

  transformers: [
    transformerDirectives(),
    transformerCompileClass({
      classPrefix: 'sps-',
    }),
    transformerVariantGroup(),
  ],
  preflights: [
    // preflights can be used to set some base styles
    {
      getCSS: () => `
      h1 {
        line-height: 2.5rem;
        font-size: 2.25rem;
      }
      h2 {
        line-height: 2rem;
        font-size: 1.75rem;
      }
      h3 {
        line-height: 1.5rem;
        font-size: 1.25rem;
      }
      ol,
      ul,
      dl {
        list-style-type: disc;
        padding-left: 40px;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      ol {
        list-style-type: decimal;
      }
      `,
    },
  ],
})
