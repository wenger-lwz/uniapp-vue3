import { defineStore } from 'pinia'

export const useMarketingPopup = defineStore('marketingPopup', () => {
  const layoutConfig: any = ref({
    /** 遮罩背景 */
    maskColor: '#474747',
    /** 宽度 */
    width: '680px',
    /** 弹窗标识 */
    configKey: 'popup_autocoupon',
  })
  const popup_autocoupon: any = ref({
    configKey: 'popup_autocoupon',
    enabled: 1, //是否启用 0否 1是
    config: {
      // enabled: 1,
      activityId: null,
      starTime: Math.floor(Date.now() / 1000).toString(), //开始时间
      endTime: -1, //结束时间
      pageScopeType: 1, //适用页面 1全部 2指定页面
      pages: [], //指定页面
      abrogationCondition: {
        //停止条件
        triggerNum: 0, //弹出次数
        closed: 0, //关闭 0否 1是
        participated: 0, //参与活动 0否 1是
      },
      title: 'SPECIAL OFFER', //标题
      buttonName: 'COLLECT ALL', //按钮名称
      buttonLink: '', //按钮跳转
      width: '600', //宽度
      backgroundImgUrl: '', //背景图url
      content: ' -{rebate} BUY {amount}', //内容
      description: '*Discounts would automatically apply when placing an order', //说明
      color: {
        //颜色
        titleColor: '#fefefd', //标题颜色
        backgroundColorStart: '#ff6f4f', //弹框颜色
        backgroundColorEnd: '#ff274b', //弹框颜色
        buttonFontColor: '#ff274b', //按钮文字颜色
        buttonBackgroundColor: '#fff3be', //按钮背景颜色
        maskBackgroundColor: '#474747', //遮罩背景颜色
        closeColor: '#fffbf2', //关闭按钮颜色
        couponBackgroundColor: '#fffbf2', //优惠券背景颜色
      },
    },
  })

  const popup_subscribe1: any = ref({
    configKey: 'popup_subscribe1',
    enabled: 1,
    config: {
      enabled: 1, //是否启用 1是
      starTime: Math.floor(Date.now() / 1000).toString(), //开始时间
      endTime: -1, //结束时间
      pageScopeType: 1, //适用页面 1全部
      pages: [], //指定页面
      abrogationCondition: {
        //停止条件
        triggerNum: 0, //弹出次数
        closed: 0, //关闭 0否 1是
        participated: 0, //参与活动 0否 1是
      },
      title: 'Subscribe for Newsletter', //标题
      buttonName: 'subscribe', //按钮名称
      buttonLink: '', //按钮跳转
      width: '600', //宽度
      backgroundImgUrl: '', //背景图url
      // backgroundImgUrl: '/src/assets/subscription_popups/popup_subscribe1.png', //背景图url
      description: 'Join our email list to receive updates and exclusive offers directly in your inbox.', //说明
      input: 'Email', //输入框
      closeButtonName: 'No thanks', // 关闭按钮名称
      afterSubmission: {
        //提交后配置
        title: 'Thank you for subscribing', //标题
        description: 'We look forward to keeping you posted.', //说明文案
        couponCode: '', //优惠码
        copywriting: 'Click to copy', //文案
        buttonName: 'Continue Shopping', //按钮名称
        buttonLink: '', //按钮跳转
        titleColor: '#000', //标题颜色
        couponCodeColor: '#d8282b', //优惠码
        buttonFontColor: '#fff', //按钮文字颜色
        buttonBackgroundColor: '#000', //按钮背景颜色
      },
      color: {
        //颜色
        titleColor: '#000', //标题颜色
        backgroundColorStart: '#FFF', //弹框颜色
        backgroundColorEnd: '#FFF', //弹框颜色
        buttonFontColor: '#fff', //按钮文字颜色
        buttonBackgroundColor: '#000', //按钮背景颜色
        maskBackgroundColor: '#474747', //遮罩背景颜色
        closeColor: '#000', //关闭按钮颜色
        inputColor: '#000', //输入框颜色
        inputBackgroundColor: '#fff', //输入框背景颜色
      },
    },
  })

  const popup_holiday: any = ref({
    configKey: 'popup_holiday',
    enabled: 0,
    config: {
      enabled: 0, //是否启用 0否 1是
      starTime: Math.floor(Date.now() / 1000).toString(), //开始时间
      endTime: -1, //结束时间
      pageScopeType: 2, //适用页面 1全部 2指定页面
      pages: ['blog'], //指定页面
      abrogationCondition: {
        //停止条件
        triggerNum: 0, //弹出次数
        closed: 0, //关闭 0否 1是
        participated: 0, //参与活动 0否 1是
      },
      title: 'HOLIDAY SALE', //标题
      buttonName: 'SHOP NOW', //按钮名称
      buttonLink: '', //按钮跳转
      width: '600', //宽度
      backgroundImgUrl: '', //背景图url
      content: 'Use code at check out,all iteams 30% off', //内容
      couponCode: '', //优惠码
      copywriting: 'Click to copy', //文案
      color: {
        //颜色
        titleColor: '#fff', //标题颜色
        backgroundColorStart: '#212121', //弹框颜色
        backgroundColorEnd: '#212121', //弹框颜色
        buttonFontColor: '#fff', //按钮文字颜色
        buttonBackgroundColor: '#d0021b', //按钮背景颜色
        maskBackgroundColor: '#474747', //遮罩背景颜色
        closeColor: '#fff', //关闭按钮颜色
        couponCodeColor: '#fff', //优惠码颜色
      },
    },
  })

  const popup_markets: any = ref({
    configKey: 'popup_markets',
    enabled: 0,
    config: {
      enabled: 0, //是否启用 0否 1是
      starTime: Math.floor(Date.now() / 1000).toString(), //开始时间
      endTime: -1, //结束时间
      pageScopeType: 2, //适用页面 1全部 2指定页面
      pages: ['index'], //指定页面
      abrogationCondition: {
        //停止条件
        triggerNum: 0, //弹出次数
        closed: 0, //关闭 0否 1是
        participated: 0, //参与活动 0否 1是
      },
      title: 'HOLIDAY SALE', //标题
      buttonName: 'SHOW NOW', //按钮名称
      buttonLink: '', //按钮跳转
      width: '600', //宽度
      backgroundImgUrl: '', //背景图url
      content: 'Buy 2 items’ save $15', //内容
      color: {
        //颜色
        titleColor: '#fff', //标题颜色
        backgroundColorStart: '#ff6960', //弹框颜色
        backgroundColorEnd: '#ff6960', //弹框颜色
        buttonFontColor: '#fff', //按钮文字颜色
        buttonBackgroundColor: '#000', //按钮背景颜色
        maskBackgroundColor: '#474747', //遮罩背景颜色
        closeColor: '#fff', //关闭按钮颜色
        couponCodeColor: '#000', //优惠码颜色
      },
    },
  })

  const popup_discount: any = ref({
    configKey: 'popup_discount',
    enabled: 0,
    config: {
      enabled: 0, //是否启用 0否 1是
      starTime: Math.floor(Date.now() / 1000).toString(), //开始时间
      endTime: -1, //结束时间
      pageScopeType: 1, //适用页面 1全部 2指定页面
      pages: [
        //指定页面
        'index',
      ],
      abrogationCondition: {
        //停止条件
        triggerNum: 0, //弹出次数
        closed: 0, //关闭 0否 1是
        participated: 0, //参与活动 0否 1是
      },
      title: 'ALL items 50% off', //标题
      buttonName: 'SHOP NOW', //按钮名称
      buttonLink: '', //按钮跳转
      width: '600', //宽度
      backgroundImgUrl: '', //背景图url
      couponCode: '', //优惠码
      copywriting: 'click to copy', //文案
      imageUrl: '', //弹框图片url
      color: {
        //颜色
        titleColor: '#000', //标题颜色
        backgroundColorStart: '#fff', //弹框颜色
        backgroundColorEnd: '#fff', //弹框颜色
        buttonFontColor: '#ffffff', //按钮文字颜色
        buttonBackgroundColor: '#ff847d', //按钮背景颜色
        maskBackgroundColor: '#474747', //遮罩背景颜色
        closeColor: '#ccc', //关闭按钮颜色
        couponCodeColor: '#000', //优惠码颜色
      },
    },
  })

  const getCruunterFun=()=>{
    
  }


  const setlayoutConfig = (val: any) => {
    layoutConfig.value = val
  }

  return {
    layoutConfig,
    setlayoutConfig,
    popup_autocoupon,
    popup_subscribe1,
    popup_holiday,
    popup_markets,
    popup_discount,
    getCruunterFun
  }
})
