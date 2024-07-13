/**
 @time 2023/2/17
 @version 1.0.0
 @author  Justin
 @notes
 */

export default {
 /*   baseUrl: 'https://c11-dev-web.kf66.live',//'https://web-api.hbapp66.live',//
    baseUrl1: 'https://pet.kol777.com',
    baseUrl9: 'https://c11-dev-mvip.kf66.live',*/

    baseUrl: 'https://c11-pre-web.kf66.live',//'https://web-api.hbapp66.live',//
    baseUrl1: 'https://pet.kol777.com',
    baseUrl2: 'https://appapi.heibai588.com',
    baseUrl9: 'https://c11-pre-mvip.kf66.live',
}

// -2全部-1热门1足球2棒球3桌球4网球5篮球6美式橄揽球7排球羽毛球9电竞1赛车11娱乐6其他
export const scheduleTypes = {
    "-2": {eventType: -2, name: '全部', id: 'Type-2'},
    "-1": {eventType: -1, name: '热门', id: 'Type-1'},
    "1": {eventType: 1, name: '足球', id: 'Type1'},
    "2": {eventType: 2, name: '棒球', id: 'Type2'},
    "3": {eventType: 3, name: '桌球', id: 'Type3'},
    "4": {eventType: 4, name: '网球', id: 'Type4'},
    "5": {eventType: 5, name: '篮球', id: 'Type5'},
    "6": {eventType: 6, name: '美式橄榄球', id: 'Type6'},
    "7": {eventType: 7, name: '排球', id: 'Type7'},
    "8": {eventType: 8, name: '羽毛球', id: 'Type8'},
    "9": {eventType: 9, name: '电竞', id: 'Type9'},
    "10": {eventType: 10, name: '赛车', id: 'Type10'},
    "11": {eventType: 11, name: '娱乐', id: 'Type11'},
    "0": {eventType: 0, name: '其他', id: 'Type0'}
}
import {ref} from 'vue'
export let isFull = ref(false)//是否全屏状态
export let isFullClick = ref(false)//是否点击全屏状态