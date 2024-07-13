import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/style/tailwind.css"
/**
 * 插件
 * */
import plugins from '@/plugins'
export function createApp() {
  const app = createSSRApp(App);
  app.use(plugins)
  return {
    app,
  };
}
