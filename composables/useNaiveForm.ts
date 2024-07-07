import type { FormInst, FormRules } from 'naive-ui'
import { ref, computed } from '#imports'
import type { Ref, ComputedRef } from '#imports'

/**
 * 返回一个对象，包含以下属性和方法：
 * - formRef: 表单引用
 * - pending: 表单是否正在提交中
 * - rules: 表单验证规则
 * - apiErrors: 表单提交后的错误信息
 * - edited: 表单是否已被编辑过
 * - reset: 重置表单
 * - onSubmit: 提交表单
 */
export function useNaiveForm(model: Ref<any> = ref({})) {
  /**  表单实例 */
  const formRef: Ref<FormInst | null> = ref<FormInst | null>(null)
  /**  表单提交状态 */
  const pending: Ref<boolean> = ref(false)
  /**  表单验证规则 */
  const rules: Ref<FormRules> = ref<FormRules>({})
  /**  表单默认值 */
  const defaultModel = ref(JSON.parse(JSON.stringify(model.value)))
  /**  服务端返回的错误 */
  const apiErrors: Ref<Record<string, boolean>> = ref<Record<string, boolean>>({})
  /**  表单是否被修改 */
  const edited: ComputedRef<boolean> = computed(() => JSON.stringify(model.value) !== JSON.stringify(defaultModel.value))

  /**  重置表单错误 */
  function resetApiErrors() {
    Object.keys(apiErrors.value).forEach((key) => (apiErrors.value[key] = false))
  }

  /**
   * 在Naive表单提交时调用，验证表单输入，如果没有发现错误，则调用回调函数
   * @param callback 应处理数据提取和错误集apiErrors
   * @note apiErrors 应该在验证器上进行检查
   */
  function onSubmit(callback: () => Promise<void>): void {
    formRef.value
      ?.validate((errors: any) => {
        if (!errors) {
          resetApiErrors()
          pending.value = true

          callback()
            .then(() => {
              defaultModel.value = JSON.parse(JSON.stringify(model.value))
            })
            .finally(() => {
              pending.value = false
              formRef.value?.validate()
              resetApiErrors()
            })
        }
      })
      .catch(() => {})
  }

  /**  重置表单 */
  function reset() {
    model.value = JSON.parse(JSON.stringify(defaultModel.value))
  }

  return {
    /**  表单实例 */
    formRef,
    /**  表单提交状态 */
    pending,
    /**  表单验证规则 */
    rules,
    /**  服务端返回的错误 */
    apiErrors,
    /**  表单是否被修改 */
    edited,
    /**  重置表单 */
    reset,
    /**  在Naive表单提交时调用，验证表单输入，如果没有发现错误，则调用回调函数 */
    onSubmit,
  }
}
