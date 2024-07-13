/**
 @time 2023/2/14
 @version 1.0.0
 @author  Justin
 */


module.exports = {
    purge: false,
    content: [
        './src/pages/**/*.{vue,js,nvue}',
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
    },

    variants: {
        extend: {},
    },
    plugins: [
    ],
    corePlugins: {
        // 禁用一些小程序不支持的Class
        space: false,
        divideWidth:false,
        divideColor: false,
        divideStyle: false,
        divideOpacity:false
    }
}