import type { EventInfo } from "./EventInfo"

export interface HBNewsInfo{
    success: boolean    
    code: String    
    data: HBNewsInfoData    
    msg: String
}


export interface HBNewsInfoData{
    hotInfoList: [HBNewsInfoHotInfoList]    
    hasNextMark: number
}


export interface HBNewsInfoHotInfoList{
    topicList: any    
    newsCollectInfo: HBNewsInfoNewsCollectInfo    
    infoType: number    
    infoTimestamp: number    
    kingHotListCollectInfoList: any
}


export interface HBNewsInfoNewsCollectInfo{
    userInfo: HBNewsInfoUserInfo    
    eventInfo: EventInfo    
    relateInfo: HBNewsInfoRelateInfo    
    legendComment: any    
    createTime: number    
    newInfo: HBNewsInfoNewInfo
}


export interface HBNewsInfoUserInfo{
    isKing: number    
    attentionMark: any    
    avatar: String    
    isLive: any    
    attentionTotal: any    
    username: String    
    userH5Url: any    
    uid: number    
    isAnchor: any
}

export interface HBNewsInfoRelateInfo{
    isHot: any    
    commentCount: String    
    isTop: number    
    status: any    
    isAttention: any    
    timeDistance: String    
    isTopic: any    
    isAnchor: any    
    pageView: String
}


export interface HBNewsInfoNewInfo{
    newId: number    
    title: String    
    isTop: number    
    status: any    
    postKeywordList: [String]    
    showType: number    
    imageInfoList: [HBNewsInfoImageInfoList]    
    topicName: any    
    postExcerpt: any
}


export interface HBNewsInfoImageInfoList{
    imageInfo: HBNewsInfoImageInfo
}


export interface HBNewsInfoImageInfo{
    imageUrl: String
}