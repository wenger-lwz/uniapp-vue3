// To parse this data:
//
//   import { Convert, Settings } from "./file";
//
//   const settings = Convert.toSettings(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Settings {
  state: string
  data: Data
  pages: Pages
  headData: HeadData
  code: number
}

export interface Data {
  settings: DataSettings
  template: Template
  shop: Shop
  customer: string
}

export interface DataSettings {
  footer: Footer
  header: Header
  global: Global
  announcement: Announcement
}

export interface Announcement {
  settings: AnnouncementSettings
  blocks: AnnouncementBlock[]
  type: string
}

export interface AnnouncementBlock {
  settings: PurpleSettings
  component: string
  active: boolean
  style: string
  id: string
  text: string
  type: string
  key: number
}

export interface PurpleSettings {
  color: string
  disable: boolean
  link: string
  show: boolean
  pcDisplay: string
  title: string
  align: string
  mobDisplay: string
}

export interface AnnouncementSettings {
  pc: number
  display: string
  show: boolean
  pcDisplay: string
  mobDisplay: string
  mobile: number
}

export interface Footer {
  settings: FooterSettings
  blocks: FooterBlock[]
  type: string
}

export interface FooterBlock {
  settings: FluffySettings
  component: string
  childDetail?: null | string
  active: boolean
  style: string
  id: string
  text: string
  type: string
  content: any[]
}

export interface FluffySettings {
  blocks?: any[]
  name: string
  title: string
  menu?: number
  twitter?: string
  address?: string
  custom?: string
  wechat?: string
  telephone?: string
  email?: string
  subTitle?: string
}

export interface FooterSettings {
  additionalCopyrightText: string
  policiesMenu: PoliciesMenu
  style: string
  text: string
  cartPageDisplayFooterWidgets: boolean
  showCopyright: boolean
  showNewsletter: boolean
}

export interface PoliciesMenu {
  id: string
  type: string
  title: string
}

export interface Global {
  button: GlobalButton
  product: Product
  fontFamily: FontFamily
  color: Color
  cart: Cart
}

export interface GlobalButton {
  style: number
}

export interface Cart {
  buyNow: number
  icon: number
}

export interface Color {
  headerBgColor: string
  subTitleColor: string
  originalPrice: string
  buttonColor: string
  footerColor: string
  primaryColor: string
  productTitleColor: string
  textColor: string
  secondaryButtonBorder: string
  headerColor: string
  secondaryButtonBgColor: string
  titleColor: string
  bgColor: string
  searchBgColor: string
  searchColor: string
  price: string
  footerBgColor: string
  subProductTitleColor: string
  buttonBgColor: string
}

export interface FontFamily {
  button: ContentClass
  subTitle: ContentClass
  title: ContentClass
  content: ContentClass
}

export interface ContentClass {
  size: number
  weight: number
  family: string
}

export interface Product {
  expandOriginalPrice: boolean
  style: number
}

export interface Header {
  settings: HeaderSettings
  blocks: any[]
  mobMenuContent: any[]
  pcMenuContent: any[]
  type: string
}

export interface HeaderSettings {
  pcLogo: string
  country: boolean
  mobMenu: number
  nav: number
  resch: boolean
  language: boolean
  mobLogo: string
  selfContent: boolean
  currency: boolean
  shopCar: boolean
  pcMenu: number
}

export interface Shop {
  env: number
  locale: string
  id: string
  name: string
  review: number
  financeSymbol: string
  currency: string
  finance: string
  defaultImg: string
  loading: string
}

export interface Template {
  id: number
  type: number
  name: string
  key: string
  version: string
  page: string
}

export interface HeadData {
  title: string
  favicon: string
  ctl: string
  act: string
  addonurl: string
  meta: Meta[]
  seoshielding: null
  protect: Protect
  script: Script[]
  headMeta: string
  googleAnalyticsID: string
  fbPxs: any[]
  ttPxs: any[]
  tracks: any[]
  loading: string
  cdatas: Cdata[]
  slangs: Slang[]
  review: number
  currency: string
  langsAuto: number
  langs: string
  paymentIcon: string[]
}

export interface Cdata {
  code: string
  title: string
  name: string
  symbol: string
  flag: string
  currencySymbolPos: CurrencySymbolPos
  format: Format
  default: number
  finance: number
}

export enum CurrencySymbolPos {
  Left = 'left',
  Right = 'right',
}

export enum Format {
  Amount = 'amount',
}

export interface Meta {
  name: string
  content: string
}

export interface Protect {
  lcw: string
  f12T: boolean
  kjzl: boolean
  sbyj: boolean
  sel: string
}

export interface Script {
  name: string
  content: Content
}

export type Content = number | string

export interface Slang {
  isDefault: boolean
  title?: string
  code?: string
  name?: string
}

export interface Pages {
  contentForPage: string[]
  sections: Sections
  templates: Templates
}

export interface Sections {
  headerPlus: null
  footerPlus: FooterPlus
}

export interface FooterPlus {
  id: string
}

export interface Templates {
  blocks: null
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toSettings(json: string): Settings {
    return cast(JSON.parse(json), r('Settings'))
  }

  public static settingsToJson(value: Settings): string {
    return JSON.stringify(uncast(value, r('Settings')), null, 2)
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ)
  const parentText = parent ? ` on ${parent}` : ''
  const keyText = key ? ` for key "${key}"` : ''
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`)
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a)
        })
        .join(', ')}]`
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal
  } else {
    return typeof typ
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val, key, parent)
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length
    for (let i = 0; i < l; i++) {
      const typ = typs[i]
      try {
        return transform(val, typ, getProps)
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent)
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val
    return invalidValue(
      cases.map((a) => {
        return l(a)
      }),
      val,
      key,
      parent
    )
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null
    }
    const d = new Date(val)
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent)
    }
    return d
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent)
    }
    const result: any = {}
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key]
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined
      result[prop.key] = transform(v, prop.typ, getProps, key, ref)
    })
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref)
      }
    })
    return result
  }

  if (typ === 'any') return val
  if (typ === null) {
    if (val === null) return val
    return invalidValue(typ, val, key, parent)
  }
  if (typ === false) return invalidValue(typ, val, key, parent)
  let ref: any = undefined
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref
    typ = typeMap[typ.ref]
  }
  if (Array.isArray(typ)) return transformEnum(typ, val)
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props')
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent)
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val)
  return transformPrimitive(typ, val)
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps)
}

function l(typ: any) {
  return { literal: typ }
}

function a(typ: any) {
  return { arrayItems: typ }
}

function u(...typs: any[]) {
  return { unionMembers: typs }
}

function o(props: any[], additional: any) {
  return { props, additional }
}

function m(additional: any) {
  return { props: [], additional }
}

function r(name: string) {
  return { ref: name }
}

const typeMap: any = {
  Settings: o(
    [
      { json: 'state', js: 'state', typ: '' },
      { json: 'data', js: 'data', typ: r('Data') },
      { json: 'pages', js: 'pages', typ: r('Pages') },
      { json: 'head_data', js: 'headData', typ: r('HeadData') },
      { json: 'code', js: 'code', typ: 0 },
    ],
    false
  ),
  Data: o(
    [
      { json: 'settings', js: 'settings', typ: r('DataSettings') },
      { json: 'template', js: 'template', typ: r('Template') },
      { json: 'shop', js: 'shop', typ: r('Shop') },
      { json: 'customer', js: 'customer', typ: '' },
    ],
    false
  ),
  DataSettings: o(
    [
      { json: 'footer', js: 'footer', typ: r('Footer') },
      { json: 'header', js: 'header', typ: r('Header') },
      { json: 'global', js: 'global', typ: r('Global') },
      { json: 'announcement', js: 'announcement', typ: r('Announcement') },
    ],
    false
  ),
  Announcement: o(
    [
      { json: 'settings', js: 'settings', typ: r('AnnouncementSettings') },
      { json: 'blocks', js: 'blocks', typ: a(r('AnnouncementBlock')) },
      { json: 'type', js: 'type', typ: '' },
    ],
    false
  ),
  AnnouncementBlock: o(
    [
      { json: 'settings', js: 'settings', typ: r('PurpleSettings') },
      { json: 'component', js: 'component', typ: '' },
      { json: 'active', js: 'active', typ: true },
      { json: 'style', js: 'style', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'text', js: 'text', typ: '' },
      { json: 'type', js: 'type', typ: '' },
      { json: 'key', js: 'key', typ: 0 },
    ],
    false
  ),
  PurpleSettings: o(
    [
      { json: 'color', js: 'color', typ: '' },
      { json: 'disable', js: 'disable', typ: true },
      { json: 'link', js: 'link', typ: '' },
      { json: 'show', js: 'show', typ: true },
      { json: 'pc_display', js: 'pcDisplay', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'align', js: 'align', typ: '' },
      { json: 'mob_display', js: 'mobDisplay', typ: '' },
    ],
    false
  ),
  AnnouncementSettings: o(
    [
      { json: 'PC', js: 'pc', typ: 0 },
      { json: 'display', js: 'display', typ: '' },
      { json: 'show', js: 'show', typ: true },
      { json: 'pc_display', js: 'pcDisplay', typ: '' },
      { json: 'mob_display', js: 'mobDisplay', typ: '' },
      { json: 'Mobile', js: 'mobile', typ: 0 },
    ],
    false
  ),
  Footer: o(
    [
      { json: 'settings', js: 'settings', typ: r('FooterSettings') },
      { json: 'blocks', js: 'blocks', typ: a(r('FooterBlock')) },
      { json: 'type', js: 'type', typ: '' },
    ],
    false
  ),
  FooterBlock: o(
    [
      { json: 'settings', js: 'settings', typ: r('FluffySettings') },
      { json: 'component', js: 'component', typ: '' },
      { json: 'childDetail', js: 'childDetail', typ: u(undefined, u(null, '')) },
      { json: 'active', js: 'active', typ: true },
      { json: 'style', js: 'style', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'text', js: 'text', typ: '' },
      { json: 'type', js: 'type', typ: '' },
      { json: 'content', js: 'content', typ: a('any') },
    ],
    false
  ),
  FluffySettings: o(
    [
      { json: 'blocks', js: 'blocks', typ: u(undefined, a('any')) },
      { json: 'name', js: 'name', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'menu', js: 'menu', typ: u(undefined, 0) },
      { json: 'twitter', js: 'twitter', typ: u(undefined, '') },
      { json: 'address', js: 'address', typ: u(undefined, '') },
      { json: 'custom', js: 'custom', typ: u(undefined, '') },
      { json: 'wechat', js: 'wechat', typ: u(undefined, '') },
      { json: 'telephone', js: 'telephone', typ: u(undefined, '') },
      { json: 'email', js: 'email', typ: u(undefined, '') },
      { json: 'subTitle', js: 'subTitle', typ: u(undefined, '') },
    ],
    false
  ),
  FooterSettings: o(
    [
      { json: 'additional_copyright_text', js: 'additionalCopyrightText', typ: '' },
      { json: 'policies_menu', js: 'policiesMenu', typ: r('PoliciesMenu') },
      { json: 'style', js: 'style', typ: '' },
      { json: 'text', js: 'text', typ: '' },
      { json: 'cart_page_display_footer_widgets', js: 'cartPageDisplayFooterWidgets', typ: true },
      { json: 'show_copyright', js: 'showCopyright', typ: true },
      { json: 'show_newsletter', js: 'showNewsletter', typ: true },
    ],
    false
  ),
  PoliciesMenu: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'type', js: 'type', typ: '' },
      { json: 'title', js: 'title', typ: '' },
    ],
    false
  ),
  Global: o(
    [
      { json: 'button', js: 'button', typ: r('GlobalButton') },
      { json: 'product', js: 'product', typ: r('Product') },
      { json: 'fontFamily', js: 'fontFamily', typ: r('FontFamily') },
      { json: 'color', js: 'color', typ: r('Color') },
      { json: 'cart', js: 'cart', typ: r('Cart') },
    ],
    false
  ),
  GlobalButton: o([{ json: 'style', js: 'style', typ: 0 }], false),
  Cart: o(
    [
      { json: 'buyNow', js: 'buyNow', typ: 0 },
      { json: 'icon', js: 'icon', typ: 0 },
    ],
    false
  ),
  Color: o(
    [
      { json: 'headerBgColor', js: 'headerBgColor', typ: '' },
      { json: 'subTitleColor', js: 'subTitleColor', typ: '' },
      { json: 'OriginalPrice', js: 'originalPrice', typ: '' },
      { json: 'buttonColor', js: 'buttonColor', typ: '' },
      { json: 'footerColor', js: 'footerColor', typ: '' },
      { json: 'primaryColor', js: 'primaryColor', typ: '' },
      { json: 'productTitleColor', js: 'productTitleColor', typ: '' },
      { json: 'textColor', js: 'textColor', typ: '' },
      { json: 'secondaryButtonBorder', js: 'secondaryButtonBorder', typ: '' },
      { json: 'headerColor', js: 'headerColor', typ: '' },
      { json: 'secondaryButtonBgColor', js: 'secondaryButtonBgColor', typ: '' },
      { json: 'titleColor', js: 'titleColor', typ: '' },
      { json: 'bgColor', js: 'bgColor', typ: '' },
      { json: 'searchBgColor', js: 'searchBgColor', typ: '' },
      { json: 'searchColor', js: 'searchColor', typ: '' },
      { json: 'price', js: 'price', typ: '' },
      { json: 'footerBgColor', js: 'footerBgColor', typ: '' },
      { json: 'subProductTitleColor', js: 'subProductTitleColor', typ: '' },
      { json: 'buttonBgColor', js: 'buttonBgColor', typ: '' },
    ],
    false
  ),
  FontFamily: o(
    [
      { json: 'button', js: 'button', typ: r('ContentClass') },
      { json: 'subTitle', js: 'subTitle', typ: r('ContentClass') },
      { json: 'title', js: 'title', typ: r('ContentClass') },
      { json: 'content', js: 'content', typ: r('ContentClass') },
    ],
    false
  ),
  ContentClass: o(
    [
      { json: 'size', js: 'size', typ: 0 },
      { json: 'weight', js: 'weight', typ: 0 },
      { json: 'family', js: 'family', typ: '' },
    ],
    false
  ),
  Product: o(
    [
      { json: 'expandOriginalPrice', js: 'expandOriginalPrice', typ: true },
      { json: 'style', js: 'style', typ: 0 },
    ],
    false
  ),
  Header: o(
    [
      { json: 'settings', js: 'settings', typ: r('HeaderSettings') },
      { json: 'blocks', js: 'blocks', typ: a('any') },
      { json: 'mob_menu_content', js: 'mobMenuContent', typ: a('any') },
      { json: 'pc_menu_content', js: 'pcMenuContent', typ: a('any') },
      { json: 'type', js: 'type', typ: '' },
    ],
    false
  ),
  HeaderSettings: o(
    [
      { json: 'pc_logo', js: 'pcLogo', typ: '' },
      { json: 'country', js: 'country', typ: true },
      { json: 'mob_menu', js: 'mobMenu', typ: 0 },
      { json: 'nav', js: 'nav', typ: 0 },
      { json: 'resch', js: 'resch', typ: true },
      { json: 'Language', js: 'language', typ: true },
      { json: 'mob_logo', js: 'mobLogo', typ: '' },
      { json: 'self_content', js: 'selfContent', typ: true },
      { json: 'currency', js: 'currency', typ: true },
      { json: 'shop_car', js: 'shopCar', typ: true },
      { json: 'pc_menu', js: 'pcMenu', typ: 0 },
    ],
    false
  ),
  Shop: o(
    [
      { json: 'env', js: 'env', typ: 0 },
      { json: 'locale', js: 'locale', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'review', js: 'review', typ: 0 },
      { json: 'finance_symbol', js: 'financeSymbol', typ: '' },
      { json: 'currency', js: 'currency', typ: '' },
      { json: 'finance', js: 'finance', typ: '' },
      { json: 'default_img', js: 'defaultImg', typ: '' },
      { json: 'loading', js: 'loading', typ: '' },
    ],
    false
  ),
  Template: o(
    [
      { json: 'id', js: 'id', typ: 0 },
      { json: 'type', js: 'type', typ: 0 },
      { json: 'name', js: 'name', typ: '' },
      { json: 'key', js: 'key', typ: '' },
      { json: 'version', js: 'version', typ: '' },
      { json: 'page', js: 'page', typ: '' },
    ],
    false
  ),
  HeadData: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'favicon', js: 'favicon', typ: '' },
      { json: 'ctl', js: 'ctl', typ: '' },
      { json: 'act', js: 'act', typ: '' },
      { json: 'addonurl', js: 'addonurl', typ: '' },
      { json: 'meta', js: 'meta', typ: a(r('Meta')) },
      { json: 'seoshielding', js: 'seoshielding', typ: null },
      { json: 'protect', js: 'protect', typ: r('Protect') },
      { json: 'script', js: 'script', typ: a(r('Script')) },
      { json: 'head_meta', js: 'headMeta', typ: '' },
      { json: 'google_analytics_id', js: 'googleAnalyticsID', typ: '' },
      { json: 'fb_pxs', js: 'fbPxs', typ: a('any') },
      { json: 'tt_pxs', js: 'ttPxs', typ: a('any') },
      { json: 'tracks', js: 'tracks', typ: a('any') },
      { json: 'loading', js: 'loading', typ: '' },
      { json: 'cdatas', js: 'cdatas', typ: a(r('Cdata')) },
      { json: 'slangs', js: 'slangs', typ: a(r('Slang')) },
      { json: 'review', js: 'review', typ: 0 },
      { json: 'currency', js: 'currency', typ: '' },
      { json: 'langs_auto', js: 'langsAuto', typ: 0 },
      { json: 'langs', js: 'langs', typ: '' },
      { json: 'payment_icon', js: 'paymentIcon', typ: a('') },
    ],
    false
  ),
  Cdata: o(
    [
      { json: 'code', js: 'code', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'symbol', js: 'symbol', typ: '' },
      { json: 'flag', js: 'flag', typ: '' },
      { json: 'currency_symbol_pos', js: 'currencySymbolPos', typ: r('CurrencySymbolPos') },
      { json: 'format', js: 'format', typ: r('Format') },
      { json: 'default', js: 'default', typ: 0 },
      { json: 'finance', js: 'finance', typ: 3.14 },
    ],
    false
  ),
  Meta: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'content', js: 'content', typ: '' },
    ],
    false
  ),
  Protect: o(
    [
      { json: 'lcw', js: 'lcw', typ: '' },
      { json: 'f12t', js: 'f12T', typ: true },
      { json: 'kjzl', js: 'kjzl', typ: true },
      { json: 'sbyj', js: 'sbyj', typ: true },
      { json: 'sel', js: 'sel', typ: '' },
    ],
    false
  ),
  Script: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'content', js: 'content', typ: u(0, '') },
    ],
    false
  ),
  Slang: o(
    [
      { json: 'is_default', js: 'isDefault', typ: true },
      { json: 'title', js: 'title', typ: u(undefined, '') },
      { json: 'code', js: 'code', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ],
    false
  ),
  Pages: o(
    [
      { json: 'content_for_page', js: 'contentForPage', typ: a('') },
      { json: 'sections', js: 'sections', typ: r('Sections') },
      { json: 'templates', js: 'templates', typ: r('Templates') },
    ],
    false
  ),
  Sections: o(
    [
      { json: 'header_plus', js: 'headerPlus', typ: null },
      { json: 'footer_plus', js: 'footerPlus', typ: r('FooterPlus') },
    ],
    false
  ),
  FooterPlus: o([{ json: 'id', js: 'id', typ: '' }], false),
  Templates: o([{ json: 'blocks', js: 'blocks', typ: null }], false),
  CurrencySymbolPos: ['left', 'right'],
  Format: ['amount'],
}
