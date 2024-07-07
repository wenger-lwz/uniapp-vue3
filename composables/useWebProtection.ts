// useWebProtection.js
import { onMounted } from 'vue'

type ProtectOptions = {
  f12t: string
  kjzl: string
  lcw: string
  sbyj: string
  sel: string
  [property: string]: any
}
/**
 * 网页保护功能组合式函数
 * @param {Object} protectOptions - 保护选项配置对象
 */
export function useWebProtection(protectOptions: ProtectOptions) {
  // 禁止文本选择
  const disableSelect = () => {
    document.addEventListener('selectstart', (event) => event.preventDefault())
  }

  // 禁止图片右键菜单
  const disableImageContextMenu = () => {
    document.addEventListener('contextmenu', (event: any) => {
      if (event.target.tagName === 'IMG') {
        event.preventDefault()
      }
    })
  }

  // 禁止右键菜单
  const disableContextMenu = () => {
    document.addEventListener('contextmenu', (event) => event.preventDefault())
  }

  // 禁止Ctrl键快捷键
  const disableCtrlKeyShortcuts = () => {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    })
  }

  // 禁止F12键打开开发者工具
  const disableF12Key = () => {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 123) {
        // F12键
        event.preventDefault()
      }
    })
  }

  // 组件挂载后添加保护功能
  onMounted(() => {
    if (protectOptions.f12t) disableSelect()
    if (protectOptions.lcw) disableImageContextMenu()
    if (protectOptions.sbyj) disableContextMenu()
    if (protectOptions.sel) disableCtrlKeyShortcuts()
    if (protectOptions.f12t) disableF12Key()
  })
}
