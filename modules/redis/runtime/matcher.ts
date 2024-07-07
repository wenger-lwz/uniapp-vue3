import { options } from '#elastic-cache-options'
import { isMatch } from 'picomatch'

export function matchPage(currentPath: string) {
  if (currentPath.includes('theme_id') || currentPath.includes('isPreview')) {
    return false
  }
  return options.pages.some((expectedPath: string | RegExp) => {
    if (typeof expectedPath === 'string') {
      return isMatch(currentPath, expectedPath)
    }
    if (expectedPath instanceof RegExp) {
      return expectedPath.test(currentPath)
    }

    return false
  })
}
