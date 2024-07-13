/**
 @time 2023/2/17
 @version 1.0.0
 @author  Justin
 @notes
 */

import {nextTick, toRefs} from "vue";
import session from "@/stores";


/**
 *
 * socket信息解密
 * */


/*解密socket消息*/
export function decrypt(data: any) {
    if (typeof data === 'string') {
        return JSON.parse(data)
    }
    if (Array.isArray(data)) {
        if (typeof data[0] === 'string') {
            data[0] = JSON.parse(data[0])
            return data
        }
    }
}

/*检查是否登陆*/
export function checkedLogin() {
    const {userInfo} = toRefs(session())
    return new Promise((resolve, reject) => {
        if (!userInfo.value) {
            loginModal(reject)
        } else {
            resolve(true)
        }
    })
}

// /*获取引入图片地址*/
export function getImg(url: String) {
    return `/static/img/${url}`
}

/*根据等级获取颜色*/
export function getColor(level: String) {

    let str: string | any = level
    if (level.startsWith("LV")) {
        str = level.split("LV").pop()
    }
    if (str.indexOf(".") != -1) {
        str = str.split(".").pop()
    }
    if (parseInt(str) <= 0) {
        str = "1"
    }

    switch (str) {
        case 1:
            return "#58c14b"
        case 2:
            return "#6A63FF"
        case 3:
            return "#FBA422"
        case 4:
            return "#0088FF"
        case 5:
            return "#00EAEA"
        case 6:
            return "#6907FF"
        case 7:
            return "#FF1C84"
        case 8:
            return "#624AA9"
        case 9:
            return "#F0D500"
        case 10:
            return "#FE431D"
        case 11:
            return "#843504"
        case 12:
            return "#FC4F5D"
        case 13:
            return "#8341FF"
        case 14:
            return "#071EFF"
        case 15:
            return "#0E6C54"
        case 16:
            return "#CC0000"
        default:
            return "#6A63FF"
    }
}


export function judgePlatform() {
    /*js 获取状态栏高度：*/
    let safeArea = {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
    };
    // #ifdef APP-PLUS
    const {
        safeAreaInsets = {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
        }
    } = uni.getSystemInfoSync();
    safeArea = safeAreaInsets
    // #endif
    return safeArea
}

// 判断为number类型
export const isNum = (value: any): boolean => {
    return typeof value === 'number' && !isNaN(value)
}

/*是否登陆弹框*/
export function loginModal(reject: any) {
    uni.showModal({ //是否登陆弹框
        title: "登陆提示",
        content: '当前账户为登陆，是否登陆？',
        confirmText: '确认',
        cancelText: '取消',
        success: ({confirm}) => {
            if (confirm) {
                uni.navigateTo({url: '/pages/view/login/index'})
            }
            reject(false)
        }
    })
}

//下一次更新
export function nextDom(model: any) {
    model.value = false
    nextTick(() => {
        model.value = true
    })
}

/**
 * 时间方法
 * */
export const TimeFunction = {
    /**
     * 倒计时
     * */
    countdown: function (date: number) {
        let time = date - new Date().getTime(), h = 0, m = 0, s = 0, d = 0;
        if (time < 0) {
            return {}
        }
        d = Math.floor(time / 1000 / 60 / 60 / 24);
        h = Math.floor(time / 1000 / 60 / 60);
        m = Math.floor((time - h * 1000 * 60 * 60) / 1000 / 60);
        s = Math.floor((time - h * 1000 * 60 * 60 - m * 1000 * 60) / 1000);

        return {
            'day': d > 9 ? d + '' : d < 0 ? '00' : '0' + d,
            'hour': h > 24 && (h - d * 24) > 9 ? h - d * 24 + '' : h > 24 && (h - d * 24) < 10 ? '0' + (h - d * 24) : h < 10 ? '0' + h : h + '',
            'minute': String(m).padStart(2, '0'),
            'second': String(s).padStart(2, '0')
        }
    },
    /**
     * 距今时间
     * */
    getTimeInterval: function (startDate: any, endDate: any = Date.now()) {
        if (arguments.length === 0) {
            return null
        }
        let startTime;
        let endTime;
        if (typeof startDate === 'object') {
            startTime = startDate.getTime();
        } else {
            startTime = startDate;
        }
        if (typeof endDate === 'object') {
            endTime = endDate.getTime();
        } else {
            endTime = endDate;
        }
        let dateInterval = endTime - startTime;
        // //计算出相差天数
        let days = Math.floor(dateInterval / (24 * 60 * 60 * 1000));
        //计算小时数
        let hourLevel = dateInterval % (24 * 60 * 60 * 1000);
        let hours = Math.floor(hourLevel / (60 * 60 * 1000))
        //计算分钟数
        let minutesLevel = hourLevel % (60 * 60 * 1000);
        let minutes = Math.floor(minutesLevel / (60 * 1000));
        //计算秒数
        let seconds = Math.round((minutesLevel % (60 * 1000)) / 1000);
        return `${days} 天 ${hours > 9 ? hours : '0' + hours} 时 ${minutes > 9 ? minutes : '0' + minutes} 分 ${seconds > 9 ? seconds : '0' + seconds} 秒`;
    },
    /**
     * 格式化
     * */
    format: function (date: number | string, type: string = 'YMD', flag: string = '-') {
        let dat = new Date(date)
        //获取年月日，时间
        let year = dat.getFullYear();
        let mon = String(dat.getMonth() + 1).padStart(2, '0');
        let data = String(dat.getDate()).padStart(2, '0');
        let hour = String(dat.getHours()).padStart(2, '0');
        let min = String(dat.getMinutes()).padStart(2, '0');
        let seon = String(dat.getSeconds()).padStart(2, '0');

        switch (type) {
            case 'YMD':
                return `${year}${flag}${mon}${flag}${data}`
            case 'YM':
                return `${year}${flag}${mon}`
            case 'YMDHMS':
                return `${year}${flag}${mon}${flag}${data} ${hour}:${min}:${seon}`
            case 'HM':
                return `${hour}${flag}${min}`
            default :
                return `${year}${flag}${mon}${flag}${data}`

        }
    }

    /**
     * JS中的数字格式化和大位数缩写
     * new Intl.NumberFormat([locales[, options]])
     * */
}


