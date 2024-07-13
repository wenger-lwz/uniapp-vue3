/**
 @time 2023/2/14
 @version 1.0.0
 @author  Justin
 @notes
 */

/**
 * pinia仓库
 * */
import {createPinia} from 'pinia'

const pinia = createPinia()
// 引入 uView UI
import uView from '../uni_modules/vk-uview-ui';
/**
 * 插件集合
 * */
const pluginList = [pinia,uView   /* ...  如果有使用到别的插件，引入放在这个位置就好*/]



const plugins = {
    // @ts-ignore
    install(app: App<Element>) {
        // 批量注册插件  改用自动引入
        Object.entries(pluginList).forEach(([, v]) => {
            app.use(v)
        })

    }
}

export default plugins

