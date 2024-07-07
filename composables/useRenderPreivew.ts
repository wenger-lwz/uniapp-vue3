export function useRenderPreview() {
  const route = useRoute()
  const themeStore = useThemeEditorStore()

  /**
   * 组件挂载事件
   */
  onMounted(() => {
    /** 判读是否为预览模式*/
    // const isPreview = route.query.isPreview
    if (window.top !== window.self) {
      /**  当前激活激活组件 */
      watch(
        () => themeStore.choose,
        (value: any) => {
          if (value.id != 'GlobalSettting') {
            const el = document.getElementById(value.id)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }
        }
      )

      /**  挂载向父组件传递挂载消息 */
      window.parent.postMessage(
        {
          type: 'onMounted',
          navigation: useResolvePath(route.path),
        },
        '*'
      )

      /**  监听消息 获取主题编辑器数据 */
      window.addEventListener('message', (e) => {
        // console.log(e);

        /**  vue调试工具干扰 */
        if (e.data.source === 'vue-devtools-backend-injection') {
          return
        }
        themeStore.setData(e)
      })
      watch(
        () => route.path,
        () => {
          /**  挂载向父组件传递挂载消息 */
          window.parent.postMessage(
            {
              type: 'onMounted',
              navigation: route.path,
            },
            '*'
          )
        },
        {
          immediate: true,
        }
      )
    }
  })
}
