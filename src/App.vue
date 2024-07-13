<script setup lang="ts">
import {onLaunch, onShow, onHide, onUnload} from "@dcloudio/uni-app";
import {toRefs} from 'vue'
import session from "@/stores";
import {query_common_configuration} from "@/api";

const {upData} = toRefs(session())
onLaunch(async () => {
  const {code, data}: any = await query_common_configuration()
  if (code === 'success') {
    upData.value('configUrlObj', data)
  }
// #ifdef APP-PLUS
  plus.screen.lockOrientation("portrait-primary")
// #endif
});
onShow(async () => {
  // #ifdef APP-PLUS
  // 监听新意图事件
  // plus.globalEvent.addEventListener('plusready', function(){});
  // 监听plusready事件  
  // plus.globalEvent.addEventListener( "plusready", function(){
  // 	// 扩展API加载完毕，现在可以正常调用扩展API
  // 	plus.statistic.eventTrig( "purchase", {"type":"book","quantity":"3"} );
  // 	 console.log("App Launch333");
  // }, false );
  uni.report('title', '首页')
  // #endif
});
onHide(() => {
});
onUnload(() => {
  upData.value('firstInit', true)
});
</script>
<style  lang="scss">
@import "./uni_modules/vk-uview-ui/index.scss";
::-webkit-scrollbar {
  display: none;
}

uni-page-body {
  width: 100%;
  height: 100%;
}

</style>
