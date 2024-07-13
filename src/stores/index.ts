import {defineStore} from 'pinia'


const store = defineStore({
    id: 'main',
    state: () => {
        return {
            testNum: uni.getStorageSync('testNum') ? uni.getStorageSync('testNum') : 0,
            firstInit: !!uni.getStorageSync('firstInit'),//首屏广告图开关
            userInfo:uni.getStorageSync('userInfo'),//用户信息
            configUrlObj:uni.getStorageSync('configUrlObj'),//默认链接配置集合
            freeDuration:uni.getStorageSync('freeDuration'),//直播间免费观看时长
        }
    },
    actions: {
        add() {
            uni.setStorageSync('testNum', this.testNum += 1)
        },
        upData(label:string,value:unknown) {
            uni.setStorageSync(label, value)
            //@ts-ignore
            this[label] = value
        },
        remove(label:any,value:unknown=undefined) {
            uni.removeStorageSync(label)
            //@ts-ignore
            this[label] = value
        }
    }
})


export default store