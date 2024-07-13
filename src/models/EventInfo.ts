export interface EventInfo{
    subEventInfo: SubEventInfo    
    rewardDiamond: any    
    commentCount: any    
    hitNum: any    
    type: number    
    timeDistance: any    
    eventType: any    
    pointUrl: String    
    title: String
}
export function dealEvent(event: EventInfo) {
	console.log(event.pointUrl, 222)
	switch (event.type) {
		case 1:
            // @ts-ignore
            plus.runtime.openURL(event.pointUrl)
			break
		case 2:
		case 4:
			uni.navigateTo({
				url: `/pages/custom/webinfo?url=${encodeURIComponent(JSON.stringify(event.pointUrl))}&title=${event.title}`
			})
			break
		default:
			break
	}

}

export interface SubEventInfo{
    uid: any    
    planId: any    
    qtlsId: any    
    commodityId: any    
    id: any    
    position: any    
    subType: any    
    attention: any    
    circleId: any
}
