<template>
  <n-modal :show="showModal" :z-index="99999">
    <n-card
      :style="{ width: `${layoutConfig.width}` }"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>噢！</template>
      <div
        class="flex-center"
        :style="`
        height:340px;
        background: linear-gradient(${popup_autocoupon.config.color.backgroundColorStart}, ${popup_autocoupon.config.color.backgroundColorStart}, ${popup_autocoupon.config.color.backgroundColorEnd}) center center / cover no-repeat scroll;
        transform: scale(1);
				display:flex;
        background: rgba(0, 0, 0, 0) linear-gradient(${popup_autocoupon.config.color.backgroundColorStart}, ${popup_autocoupon.config.color.backgroundColorStart}, ${popup_autocoupon.config.color.backgroundColorEnd}) no-repeat scroll 50% 50% / cover padding-box border-box;
        transform: matrix(1, 0, 0, 1, 0, 0);
        border-radius: 4px;
        padding: 30px 0px;
        z-index: 3;
        box-sizing: border-box;
        transition:all 0.3s linear;
			  background-image: url(${popup_autocoupon.config.backgroundImgUrl}),
        background-size: 'cover', // 根据需要调整
        background-position: 'center',

      `"
      >
        <!-- 关闭按钮 -->
        <span
          :style="`font-size: 26px; position: absolute; top: 0px; right: 10px;color:${popup_autocoupon.config.color.closeColor};`"
        >
          x
        </span>

        <div class="position">
          <div
            style="
              color: rgb(255, 255, 255);
              text-align: center;
              z-index: 3;
              width: 90%;
              margin: 0px auto;
              word-break: break-word;
              box-sizing: border-box;
            "
          >
            <span
              :style="{
                fontSize: '30px',
                fontWeight: '900',
                fontFamily: 'Lato, Lato-Black',
                color: popup_autocoupon.config.color.titleColor,
                boxSizing: 'border-box',
              }"
            >
              {{ popup_autocoupon.config.title }}
            </span>
          </div>
          <div
            style="
              width: 100%;
              margin: 0px auto;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              box-sizing: border-box;
            "
          >
            <div
              style="
                width: 150px;
                height: 88px;
                position: relative;
                margin-top: 24px;
                margin-right: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 6px 12px;
                box-sizing: border-box;
              "
            >
              <span
                :style="`color:${popup_autocoupon.config.color.couponBackgroundColor}; position: absolute; display: block; height: 88px; width: 100%; top: 0px; left: 0px; box-sizing: border-box`"
              >
                <div style="box-sizing: border-box">
                  <div style="box-sizing: border-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="150"
                      height="88"
                      data-src="https://static.staticdj.com/oss/operation/d7fbdc3cdad49c043afc7521e1701801.svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="box-sizing: border-box; overflow: hidden"
                    >
                      <path
                        d="M150 0v8a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6H0v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6A5 5 0 100 8V0h150z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        style="box-sizing: border-box"
                      ></path>
                    </svg>
                  </div>
                </div>
              </span>
              <div style="transform: scale(1); z-index: 5; text-align: center; box-sizing: border-box">
                <div
                  style="
                    text-align: center;
                    font-family: Lato, Lato-Regular;
                    white-space: nowrap;
                    line-height: 14px;
                    box-sizing: border-box;
                  "
                  data-mce-style="text-align: center; font-family: Lato, Lato-Regular;white-space: nowrap;"
                >
                  <span
                    style="
                      display: block;
                      font-size: 30px;
                      font-weight: bold;
                      color: #ff2f4b;
                      font-weight: 700;
                      color: rgb(255, 47, 75);
                      line-height: 30px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 30px; font-weight: bold; color: #ff2f4b;"
                  >
                    -$1
                  </span>
                  <span
                    style="
                      display: block;
                      font-size: 18px;
                      color: #b06410;
                      margin-top: 8px;
                      color: rgb(176, 100, 16);
                      line-height: 18px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 18px; color: #b06410;margin-top: 8px;"
                  >
                    BUY $2
                  </span>
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  height: 88px;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  padding: 12px;
                  box-sizing: border-box;
                "
              ></div>
            </div>
            <div
              style="
                width: 150px;
                height: 88px;
                position: relative;
                margin-top: 24px;
                margin-right: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 6px 12px;
                box-sizing: border-box;
              "
            >
              <span
                :style="`color:${popup_autocoupon.config.color.couponBackgroundColor}; position: absolute; display: block; height: 88px; width: 100%; top: 0px; left: 0px; box-sizing: border-box`"
              >
                <div style="box-sizing: border-box">
                  <div style="box-sizing: border-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="150"
                      height="88"
                      data-src="https://static.staticdj.com/oss/operation/d7fbdc3cdad49c043afc7521e1701801.svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="box-sizing: border-box; overflow: hidden"
                    >
                      <path
                        d="M150 0v8a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6H0v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6A5 5 0 100 8V0h150z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        style="box-sizing: border-box"
                      ></path>
                    </svg>
                  </div>
                </div>
              </span>
              <div style="transform: scale(1); z-index: 5; text-align: center; box-sizing: border-box">
                <div
                  style="
                    text-align: center;
                    font-family: Lato, Lato-Regular;
                    white-space: nowrap;
                    line-height: 14px;
                    box-sizing: border-box;
                  "
                  data-mce-style="text-align: center; font-family: Lato, Lato-Regular;white-space: nowrap;"
                >
                  <span
                    style="
                      display: block;
                      font-size: 30px;
                      font-weight: bold;
                      color: #ff2f4b;
                      font-weight: 700;
                      color: rgb(255, 47, 75);
                      line-height: 30px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 30px; font-weight: bold; color: #ff2f4b;"
                  >
                    -$5
                  </span>
                  <span
                    style="
                      display: block;
                      font-size: 18px;
                      color: #b06410;
                      margin-top: 8px;
                      color: rgb(176, 100, 16);
                      line-height: 18px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 18px; color: #b06410;margin-top: 8px;"
                  >
                    BUY $11
                  </span>
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  height: 88px;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  padding: 12px;
                  box-sizing: border-box;
                "
              ></div>
            </div>
            <div
              style="
                margin-right: 0px;
                width: 150px;
                height: 88px;
                position: relative;
                margin-top: 24px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 6px 12px;
                box-sizing: border-box;
              "
            >
              <span
                :style="`color:${popup_autocoupon.config.color.couponBackgroundColor}; position: absolute; display: block; height: 88px; width: 100%; top: 0px; left: 0px; box-sizing: border-box`"
              >
                <div style="box-sizing: border-box">
                  <div style="box-sizing: border-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="150"
                      height="88"
                      data-src="https://static.staticdj.com/oss/operation/d7fbdc3cdad49c043afc7521e1701801.svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="box-sizing: border-box; overflow: hidden"
                    >
                      <path
                        d="M150 0v8a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6a5 5 0 100 10v6H0v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6a5 5 0 100-10v-6A5 5 0 100 8V0h150z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        style="box-sizing: border-box"
                      ></path>
                    </svg>
                  </div>
                </div>
              </span>
              <div style="transform: scale(1); z-index: 5; text-align: center; box-sizing: border-box">
                <div
                  style="
                    text-align: center;
                    font-family: Lato, Lato-Regular;
                    white-space: nowrap;
                    line-height: 14px;
                    box-sizing: border-box;
                  "
                  data-mce-style="text-align: center; font-family: Lato, Lato-Regular;white-space: nowrap;"
                >
                  <span
                    style="
                      display: block;
                      font-size: 30px;
                      font-weight: bold;
                      color: #ff2f4b;
                      font-weight: 700;
                      color: rgb(255, 47, 75);
                      line-height: 30px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 30px; font-weight: bold; color: #ff2f4b;"
                  >
                    -$123
                  </span>
                  <span
                    style="
                      display: block;
                      font-size: 18px;
                      color: #b06410;
                      margin-top: 8px;
                      color: rgb(176, 100, 16);
                      line-height: 18px;
                      white-space: nowrap;
                      box-sizing: border-box;
                    "
                    data-mce-style="display: block;font-size: 18px; color: #b06410;margin-top: 8px;"
                  >
                    BUY $123
                  </span>
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  height: 88px;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  padding: 12px;
                  box-sizing: border-box;
                "
              ></div>
            </div>
          </div>
          <div
            :style="`
				  background-color: ${popup_autocoupon.config.color.buttonBackgroundColor};
          border-color: ${popup_autocoupon.config.color.buttonBackgroundColor};
          border-color: ${popup_autocoupon.config.color.buttonBackgroundColor};
          width: 324px;
          height: 40px;
          border-radius: 4px;
          line-height: 40px;
          margin: 30px auto 0px;
          text-align: center;
          font-size: 16px;
          color: ${popup_autocoupon.config.color.buttonFontColor};
          cursor: pointer;
          border-width: 1px;
          border-style: solid;
          padding: 0px 20px;
          box-sizing: border-box;
				`"
          >
            <span
              :style="{
                color: popup_autocoupon.config.color.buttonFontColor,
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Lato, Lato-Regular',
                boxSizing: 'border-box',
              }"
            >
              {{ popup_autocoupon.config.buttonName }}
            </span>
          </div>
          <div
            style="
              font-size: 14px;
              padding-top: 14px;
              text-align: center;
              color: rgb(255, 255, 255);
              width: 70%;
              margin: 0px auto;
              overflow-wrap: break-word;
              box-sizing: border-box;
            "
          >
            <span
              style="
                font-size: 14px;
                color: #ffffff;
                font-family: Lato, Lato-Regular;
                color: rgb(255, 255, 255);
                box-sizing: border-box;
              "
              data-mce-style="font-size: 14px; color: #fff;font-family: Lato, Lato-Regular;"
            >
              {{ popup_autocoupon.config.description }}
            </span>
          </div>
          <i
            style="
              color: rgb(255, 255, 255);
              font-size: 14px;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              font-family: djfont;
              position: absolute;
              top: 10px;
              right: 10px;
              width: 20px;
              height: 20px;
              line-height: 16px;
              cursor: pointer;
              box-sizing: border-box;
              font-weight: 500;
            "
          ></i>
        </div>
      </div>
      <template #footer>尾部</template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
const { layoutConfig, popup_autocoupon } = storeToRefs(useMarketingPopup())

// const marketingPopup = useMarketingPopup()
// let cunter = marketingPopup.getCruunterFun('popup_markets')
// console.log(layoutConfig.value,cunter,'--=-=-')

const showModal = ref(true)
</script>

<style></style>
