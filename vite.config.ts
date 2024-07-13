import {defineConfig, loadEnv} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import {resolve} from 'path'
import config from './src/config'
// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [uni()],
//     resolve: {
//         alias: {
//             '@': resolve('./src')
//         }
//     },
// });
let vwt;
if (process.env.LOCAL) {
    console.log('use local built webpack plugin');
    vwt = require('vite');
} else {
    vwt = require('weapp-tailwindcss-webpack-plugin/vite');
}
// import vwt from 'weapp-tailwindcss-webpack-plugin/vite';
// import postcssWeappTailwindcssRename from 'weapp-tailwindcss-webpack-plugin/postcss';

// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === 'h5';
const isApp = process.env.UNI_PLATFORM === 'app';
const WeappTailwindcssDisabled = isH5 || isApp;
// vite 插件配置
const vitePlugins = [uni()]; // Unocss()
// postcss 插件配置
const postcssPlugins = [require('autoprefixer')(), require('tailwindcss')()];

// const postcssPlugins = [require('postcss-windicss')()];

// const postcssPlugins = [];
if (!WeappTailwindcssDisabled) {
    vitePlugins.push(
        vwt({
            // customReplaceDictionary: {
            //   '[': '_',
            //   ']': '_',
            //   '(': '_',
            //   ')': '-',
            // },
        })
    );

    postcssPlugins.push(
        require('postcss-rem-to-responsive-pixel')({
            rootValue: 32,
            propList: ['*'],
            transformUnit: 'rpx',
        })
    );
}
// https://vitejs.dev/config/
export default defineConfig((config: any) => {
    const { mode } = config
    // console.log(mode) // dev 或者 pre
    // const env = loadEnv(mode, __dirname)
    // console.log(env, '配置')
    
    return {
        
        plugins: vitePlugins,
        resolve: {
            alias: {
                '@': resolve('./src'),
                '@img': resolve('./src/static/img'),
    
            }
        },
        // 假如 postcss.config.js 不起作用，请使用内联 postcss Latset
        css: {
            postcss: {
                plugins: postcssPlugins,
            },
            preprocessorOptions: {
                scss: {
                additionalData: '@import "@/style/mixin.scss";'
                }
            }
        },
        server: {
            hmr: true
        }
    }
})