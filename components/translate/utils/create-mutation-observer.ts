import type { ConfigurableWindow } from './configurable'
import { defaultWindow } from './configurable'
import { isSupport } from './types'

export interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}

/**
 * 注意对DOM树的更改。
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @param target
 * @param callback
 * @param options
 */
export function useMutationObserver(
  target: HTMLElement,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {}
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const isSupported = isSupport(() => window && 'MutationObserver' in window)

  const start = () => {
    if (isSupported && window && target) {
      observer = new MutationObserver(callback)
      observer!.observe(target, mutationOptions)
    }
  }

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  return {
    isSupported,
    start,
    stop,
  }
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
