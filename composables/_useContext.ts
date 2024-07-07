import { inject, provide, ref, unref } from 'vue'

/**
 * 内部上下文助手
 */
export function _useContext<T>(
  injectionName: string,
  params?: {
    context?: Ref<T> | T
    replace?: T
  }
) {
  const isNewContext = !!params?.context

  const _context: Ref<T> = isNewContext ? (ref(unref(params?.context)) as Ref<T>) : (inject(injectionName, ref()) as Ref<T>)
  provide(injectionName, _context)

  /**
   * 用于全局上下文，用新值替换它。 主要用于会话上下文
   */
  if (!!params?.replace) {
    _context.value = unref(params.replace)
  }

  return _context
}
