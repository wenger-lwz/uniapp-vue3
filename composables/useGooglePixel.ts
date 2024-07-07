// @ts-nocheck
/**
 * 使用谷歌跟踪像素
 * @param pixelId 像素ID
 * @returns setUserData() 返回 设置用户数据函数
 */
export const useGooglePixel = (pixelId: number) => {
  const nuxtApp = useNuxtApp()

  /**
   * 设置用户数据
   *
   */
  function setUserData(external_id: number, fn: string) {
    nuxtApp.$fb?.setUserData({
      external_id: external_id,
      fn,
    })
  }
  /**
   * 更改默认像素ID并触发INIT
   */
  nuxtApp.$fb?.setPixelId(pixelId)
  nuxtApp.$fb?.enable()
  return {
    setUserData,
  }
}
