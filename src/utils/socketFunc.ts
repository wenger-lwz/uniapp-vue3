import {getPhp} from "@/api";
import {toRefs, ref, reactive} from "vue";
import session from "@/stores";
import ungzip from '@/plugins/pako'
let chatObj = {
    chatServerObj: {},
    userinfo: {},
    socket: {},

}
let socketFlag = ref(false);//socket连接状态
let liveType = ref(false)//直播间直播状态
let messageList = reactive([]); //聊天消息列表
let welcomeInfo = reactive([])//欢迎用户语，及坐骑
let reconnectionNum = 0;//重连次数
let ovenSvgaList = reactive([])//穿云箭礼物集合
let setHartTime=0//心跳定时
let damuList=reactive([])//弹幕列表

const socketInit = async function (model: object) {
    resetData()
    const {data, status}: any = await getPhp({g: 'Wwapi', m: 'Anchor', a: 'getInfoOfChatRoom'})
    if (status === 200) {
        chatObj.chatServerObj = data.config
        setNodeInfo(model, data.config)
    }
}


async function setNodeInfo(model: any, config: any) {
    const {userInfo} = toRefs(session())
    let data = {
        g: 'front',
        m: 'show',
        a: 'setNodeInfo',
        uid: userInfo.value ? userInfo.value.id : model.roomId || model['uid'],
        token: userInfo.value ? userInfo.value.token : 0,
        showid: model.roomId || model['uid'],
        stream: model.roomId ? model.liveStream : model.stream
    }
    const {userinfo}: any = await getPhp(data)
    chatObj.userinfo = userinfo
    getSocket(userinfo, config, model)
}


function setHart(pingInterval: number) {
    uni.sendSocketMessage({
        data: '2'
    });
    setHartTime=  setTimeout(() => {
        if(!socketFlag.value){
            console.log('return setHart')
            return
        }else{
            setHart(pingInterval)
        }
    }, pingInterval)
}

uni.onSocketOpen(function () {
    console.log('WebSocket连接已打开！');
});

function resetData() {
    console.log('resetData',socketFlag.value,setHartTime,chatObj.socket)
    chatObj.socket={}
    ovenSvgaList.length=0
    socketFlag.value = false
    liveType.value=false
    damuList.length=0
    messageList.length=0
    reconnectionNum = 0
    if(setHartTime){
        clearTimeout(setHartTime)
        setHartTime=0
    }
}

const closeSocket = function () {
    console.log('closeSocket',77,socketFlag.value,chatObj.socket,Object.keys(chatObj.socket).length)
    if (Object.keys(chatObj.socket).length) {
        //关闭socket
        //@ts-ignore
        chatObj.socket.close({
            code: 1000,
            success: (e: any) => {
                console.log(e, 30)
                resetData()
            },
            fail: (e: any) => {
                console.log(e, 33)
            }
        })
    }
}
uni.onSocketClose(function (res) {
    console.log('WebSocket 已关闭！',socketFlag.value,9393,chatObj.socket,Object.keys(chatObj.socket).length);
    // if (socketFlag.value) {
    //     socketFlag.value = false
    // }
});

function getSocket(userinfo: any, config: any, model: any) {
    reconnectionNum++
    let data = {
        ...config,
        ...{
            chatserver1: config.chatserver,
            chatserver2: 'wss://c11-pre-im-v3.kf66.live:4431'
        }
    }
    let str = data[`chatserver${reconnectionNum}`]
    if (!str) {
        uni.showToast({
            icon: "none",
            title: "超出聊天室重连次数！"
        })
        return
    }
    chatObj.socket = uni.connectSocket(
        {
            url: str + '/socket.io/?EIO=3&transport=websocket'
            // url: config.chatserver + '/socket.io/?EIO=3&transport=websocket'//'ws://121.40.165.18:8800'//
            , complete: () => {
            }
        });
    const againSocket = () => {
        console.log('重连中。。。',114)
        resetData()
        getSocket(userinfo, config, model)
    }
    appListenIO(chatObj.socket, userinfo, againSocket)
}

/*监听io事件*/
function appListenIO(socket: any, userinfo: any,  againSocket: any) {
    socket.onMessage(function (res: any) {
        if(Object.prototype.toString.call(res.data)==='[object ArrayBuffer]'){
            console.log(ungzip(res.data),114)
        }else{
        if (res.data[0] === '0') {
            let {pingInterval} = JSON.parse(res.data.slice(1))
            console.log('pingInterval setHart',socketFlag.value,123)
            if(!socketFlag.value){
                setHart(pingInterval)
            }

        }
        if (res.data === '40') {
            uni.sendSocketMessage({
                data: '42' + JSON.stringify(['conn', userinfo])
            });
        }
        if (res.data.slice(0, 2) === '42') {
            const {remove, userInfo}: any = toRefs(session())
            let [func, data] = JSON.parse(res.data.slice(2))
            // console.log(func, data,127)
            let msg = [];
            switch (func) {
                case 'conn':
                    socketFlag.value = true
                    reconnectionNum = 0
                    break
                case 'loadhistory':
                    msg = JSON.parse(data)['msg']
                    if(msg.length===1){
                        // @ts-ignore
                        damuList.push(msg[0])
                    }
                    msg.forEach((item: any) => {
                        if (item['msgtype'] === '1' && item['effects']) {
                            // @ts-ignore
                            ovenSvgaList.push(item)
                        }
                        // @ts-ignore
                        messageList.push(item)
                    })
                    break
                case 'broadcastingListen':
                    msg = JSON.parse(data[0])['msg']
                    msg.forEach((item: any) => {
                        if (item['msgtype'] === '0') {
                            welcomeInfo.shift()
                            // @ts-ignore
                            welcomeInfo.push(item)
                        }
                        if (item['msgtype'] === '4') {
                            // @ts-ignore
                            messageList.push(item)
                        }
                    })
                    break
                case 'load-ovens-gift-list'://穿云箭礼物公告

                    break
                case 'guarDianObjFun'://守护位
                    break
                case 'room-live-status-app'://直播间状态
                    liveType.value = data
                    break
                case 'PromptUser'://弹窗提醒
                    uni.showToast({
                        title: data,
                        icon: 'none'
                    });
                    break
                case 'ShutUp'://更新用户被禁言状态通知
                    let {uid, time} = JSON.parse(data)
                    if (+uid === userInfo.value.id) {
                        uni.showToast({
                            title: `您已被禁言${time}`,
                            icon: 'none'
                        });
                    }
                    break
                case 'BlackUser'://拉黑用户事件
                    let list = JSON.parse(data)
                    list.forEach((id: any) => {
                        if (+id === userInfo.value.id) {
                            uni.showModal({ //是否登陆弹框
                                title: "通知",
                                content: '您已被拉黑！',
                                confirmText: '确认',
                                cancelText: '取消',
                                success: () => {
                                    remove.value('userInfo')
                                    uni.navigateTo({url: '/pages/view/login/index'})
                                }
                            })
                        }
                    })
                    break

                case  'ReplaceUserName': //更改用户名
                    if (/_restore/.test(data)) {//恢复昵称敏感词
                        let str = data.replace('_restore', '')
                        messageList.forEach((item: any) => {
                            if (item.unameAfterReplace && item.uname.indexOf(str) !== -1) {
                                item.unameAfterReplace = item.unameAfterReplace.replaceAll('***', str)
                            }
                        })
                    }
                    if (/_ban/.test(data)) {//替换昵称敏感词
                        let str = data.replace('_ban', '')
                        messageList.forEach((item: any) => {
                            if (item.unameAfterReplace) {
                                item.unameAfterReplace = item.unameAfterReplace.replaceAll(str, '***')
                            }
                        })
                    }
                    if (/_update_/.test(data)) {//更新昵称敏感词
                        let arr = data.split('_update_')
                        messageList.forEach((item: any) => {
                            if (item.unameAfterReplace) {
                                if (item.uname.indexOf(arr[1]) !== -1) {
                                    item.unameAfterReplace = item.unameAfterReplace.replaceAll('***', arr[1])
                                }
                                item.unameAfterReplace = item.unameAfterReplace.replaceAll(arr[0], '***')
                            }
                        })
                    }
                    break
                case 'RemoveMessage': //清除指定用户的聊天记录
                    let arr = JSON.parse(JSON.stringify(messageList))
                    messageList.length=0
                    JSON.parse(data).forEach((id: any) => {
                        arr.forEach((item:any)=>{
                            if(+item.uid !== +id){
                                // @ts-ignore
                                messageList.push(item)
                            }
                        })
                    })
                    break
            }
        }
        if(res.data.slice(0, 3) === '451'){
            let [func, data] = JSON.parse(res.data.slice(4))
            console.log(240,func, data)
        }
        }
    })

    socket.onError(function (res: any) {
        console.log('onError', res, 268)
        againSocket()
    })
    socket.onClose(function (res: any) {
        console.log('onClose', res, 280)
        againSocket()
    })
}


/*滚动至底*/
/*function chatRoomToEnd() {
    let dom = document.querySelector('.chatRoom')
    if (dom) {
        dom.scrollTop = dom.clientHeight
    } else {
        setTimeout(() => {
            chatRoomToEnd()
        }, 1000)
    }
}*/

/*发送socket消息*/
function sendSocketMsg(ct: any) {
    let msg = {
        currentChannel: 'anchor',
        msg: [
            {
                _method_: "SendMsg",
                action: 0,
                ct: ct,//atUser !== null ? this.sendContent.replace(this.atUser.htmlTpl, '') : sendContent,
                msgtype: "2",
            },
        ],
        retcode: "000000",
        retmsg: "OK",
    };
    uni.sendSocketMessage({
        data: '42' + JSON.stringify(['broadcast', msg])
    });
}

export default {
    socketInit,
    chatObj,
    closeSocket,
    sendSocketMsg,
    liveType,
    welcomeInfo,
    socketFlag,
    ovenSvgaList,
    damuList,
    messageList
}
