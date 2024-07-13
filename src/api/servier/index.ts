/**
 @time 2023/2/17
 @version 1.0.0
 @author  Justin
 @notes  请求处理中心
 */

import config from '@/config'
import {reactive, toRefs} from "vue";
import session from "@/stores";

let requestList = reactive([])//请求集合
let pagePath: string | undefined =''
/**
 * get格式化传参
 * */
function formatData(data: any) {
    if (!data) {
        return ''
    }
    let result = '?', keys = Object.keys(data);
    keys.forEach(item => {
        if (data[item] != null && data[item] != undefined) {
            result += `${item}=${data[item]}&`
        }
    })
    return result.slice(0, -1)
}


export function server({url, method = 'GET', data, header = {}}: any) {
    var pages = getCurrentPages();
    var page = pages[pages.length - 1];
    if (page) {
        if(pagePath&&pagePath!==page.route){
            requestList.forEach((item:any)=>{
                console.log('取消请求',item,38)
                item.abort()
            })
        }
        pagePath=page.route
    }


    const {userInfo} = toRefs(session())
    let base = config.baseUrl
    if (/^\/live/.test(url)) {
        base = config.baseUrl
    }
    if (/^\/api/.test(url)) {
        base = config.baseUrl
    }
    if (/^\/index.php/.test(url)) {
        base = config.baseUrl
    }
    if (/^\/app-api/.test(url)) {
        base = config.baseUrl1
    }
    if (/^http/.test(url)) {
        base = ''
    }
    // @ts-ignore
    // let newUrl = !process.env.LOCAL ? base + url : url;
    let newUrl = base + url;
    newUrl = method === 'GET' ? newUrl + formatData(data) : newUrl
    header.token = userInfo.value ? userInfo.value.token : undefined
    return new Promise((resolve, reject) => {
        let requestItem = uni.request({
            url: newUrl,
            method,
            data,
            header,
            success: ({data}:any) => {
                if(data.code==='user_not_login'){
                    uni.navigateTo({url: '/pages/view/login/index'})
                }else{
                    resolve(data)
                }

            },
            fail: (err) => {
                console.log(err, 30)
                reject(err)
            },
            complete: () => {
                requestList.shift()
            }
        })
        // @ts-ignore
        requestList.push(requestItem)
    })
}
