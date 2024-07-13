/**
 @time 2023/2/17
 @version 1.0.0
 @author  Justin
 @notes 接口中心
 */

import {server} from './servier'
import config from '@/config'
/*获取轮播图*/
export function get_banner_image_list(data: object) {
    return server({
        url: '/live/api/homepage/news_pages/get_banner_image_list',
        data
    })
}

/*获取资讯分类列表*/
export function get_news_title_info(data: object) {
    return server({
        url: '/live/api/homepage/news_pages/get_subclass_info',
        method: 'GET',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

/*获取资讯列表*/
export function get_news_list_info(data: object) {
    return server({
        url: '/live/api/homepage/news_pages/get_news_page_hot_info',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

/*获取活动列表*/
export function get_activity_list_info(data: object) {
    return server({
        url: '/live/api/homepage/news_pages/get_news_actives_info',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

/*获取热更新地址*/
export function query_pet_news_list(data: object) {
    return server({
        url: '/app-api/pet/news/query_pet_news_list',
        method: 'POST',
        data
    })
}

/*getPhp*/
export function getPhp(data: object) {
    return server({
        url: '/index.php',
        data
    })
}

/*获取主播直播间房间信息*/
export function get_anchor_room_info(data: object) {
    return server({
        url: '/live/api/play/chat/get_anchor_room_info',
        data
    })
}

/*apiPublic*/
export function apiPublic(data: object) {
    return server({
        url: '/api/public/',
        data
    })
}

/*登陆接口*/
export function userLogin(data: object) {
    return server({
        url: '/api/public/?service=Login.userLogin',
        data
    })
}
/*获取配置接口*/
export function query_common_configuration() {
    return server({
        url: '/live/api/index/query_common_configuration',
    })
}

export function initUnreadNum(url:string) {
    return server({
        url,
        headers: {'Content-Type': 'application/json', 'X-CHAT-TERMINAL': 'Client'},
    })
}

//获取礼物列表
export function getGiftList(data: object) {
    return server({
        url: '/live/api/play/chat/get_gift_list',
        data
    })
}
//获取清流room信息
export function getQlInfo(data: object) {
    return server({
        url: 'https://appapi.heibai588.com/api/index/live',
        data
    })
}
//获取清流room信息
export function get_qingliu_bulletin(data: object) {
    return server({
        url: '/live/api/liveConfig/get_qingliu_bulletin',
        data
    })
}

// 初始化赛事数据（类型、日期）
export function init_date(data: object={}) {
    return server({
        url: '/live/api/schedule/event/init_date',
        data
    })
}

// 获取赛事列表
export function query_focus_event_list(data: object) {
    return server({
        url: '/live/api/focus/event/query_focus_event_list',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 获取主播页热门赛事
export function get_hot_focus_event_list(data: object={}) {
    return server({
        url: '/live/api/homepage/live/get_hot_focus_event_list',
        data
    })
}

// 获取清流直播列表
export function getQLList(data: object={}) {
    return server({
        url: `${config.baseUrl2}/api/index/index`,
        data
    })
}

// 获取金豆兑换合作商
export function get_partner_list(data: object={}) {
    return server({
        url: `/live/api/diamond/exchange/get_partner_list`,
        data
    })
}

// 获取金豆余额
export function get_diamond_calc_info(data: object={}) {
    return server({
        url: `/live/api/diamond/conversion/get_diamond_calc_info`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
// 金豆兑换提交
export function create_exchange_diamond_info(data: object={}) {
    return server({
        url: `/live/api/diamond/exchange/create_exchange_diamond_info`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}


/*获取站内信数量*/
export function get_notice_count(data: object={}) {
    return server({
        url: `/live/api/notice/get_notice_count`,
        data
    })
}

// 获取黑白公告列表
export function get_king_announcement_message_notice_info_revision(data: object={}) {
    return server({
        url: `/live/api/notice/get_king_announcement_message_notice_info_revision`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 获取互动消息列表
export function query_interaction_notice_revision(data: object={}) {
    return server({
        url: `/live/api/notice/query_interaction_notice_revision`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 获取互动消息列表
export function get_system_message_notice_info(data: object={}) {
    return server({
        url: `/live/api/notice/get_system_message_notice_info`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 获取兑换记录列表
export function query_exchange_list(data: object={}) {
    return server({
        url: `/live/api/diamond/exchange/query_exchange_list`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 获取抽奖记录列表
export function query_lucky_info_by_date(data: object={}) {
    return server({
        url: `/live/api/turntable/query_lucky_info_by_date`,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
