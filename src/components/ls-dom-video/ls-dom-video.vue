<!-- eslint-disable -->
<template>
  <view
      v-html="videoHtml"
      id="dom-video"
      class="dom-video"
      :eventDrive="eventDrive"
      :change:eventDrive="domVideo.eventHandle"
      :videoSrc="videoSrc"
      :change:videoSrc="domVideo.srcChange"
      :videoProps="videoProps"
      :change:videoProps="domVideo.propsChange"
      :randomNum="randomNum"
      :change:randomNum="domVideo.randomNumChange"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: false
    },
    objectFit: {
      type: String,
      default: 'contain'
    },
    muted: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: ''
    },
  },

  // 数据状态
  data() {
    return {
      videoHtml: '',
      videoSrc: '',
      eventDrive: null,
      videoProps: {},
      randomNum: Math.floor(Math.random() * 100000000 + 1)
    }
  },
  watch: {
    // 监听视频资源文件更新
    src: {
      handler(val) {
        if (!val) return
        this.initVideoHtml()
        setTimeout(() => {
          this.videoSrc = val
        }, 0)
      },
      immediate: true
    },
    // 监听首次加载
    autoplay: {
      handler(val) {
        this.videoProps.autoplay = val
      },
      immediate: true
    },
  },
  // 生命周期
  mounted() {
    // this.initVideoHtml()
  },

  // 方法
  methods: {
    // 将video的事件传递给父组件
    videoEvent(data) {
      console.log('向父组件传递事件 =>', data)
      this.$emit('videoEvent',data)
    },
    // 初始化视频
    initVideoHtml() {
      this.videoHtml = `<video
          src="${this.src}"
          id="dom-html-video_${this.randomNum}"
          class="dom-html-video"
          ${this.autoplay ? 'autoplay' : ''}
          ${this.loop ? 'loop' : ''}
          ${this.controls ? 'controls' : ''}
          ${this.muted ? 'muted' : ''}
          ${this.poster ? 'poster="' + this.poster + '"' : ''}
          preload="auto"
          playsinline
          webkit-playsinline
          width="100%"
          height="100%"
          style="object-fit: ${this.objectFit};padding:0;"
        >
          <source src="${this.src}" type="video/mp4">
          <source src="${this.src}" type="video/ogg">
          <source src="${this.src}" type="video/webm">
        </video>
      `
      // console.log('视频html =>', this.videoHtml)
    },
    resetEventDrive() {
      this.eventDrive = null
    },
    // 将service层的事件/数据 => 传递给renderjs层
    play() {
      this.eventDrive = 'play'
    },
    pause() {
      this.eventDrive = 'pause'
    },
    stop() {
      this.eventDrive = 'stop'
    },
    fullScreen() {
      let currElement = document.getElementById(`dom-html-video_${this.num}`)
      if (currElement.requestFullscreen) {
        currElement.requestFullscreen()
      } else if (currElement.mozRequestFullScreen) {
        currElement.mozRequestFullScreen()
      } else if (currElement.msRequestFullscreen) {
        currElement.msRequestFullscreen()
      } else if (currElement.oRequestFullscreen) {
        currElement.oRequestFullscreen()
      } else if (currElement.webkitRequestFullscreen) {
        currElement.webkitRequestFullScreen()
      }
    }
  }
}
</script>

<script module="domVideo" lang="renderjs">
export default {
  data() {
    return {
      video: null,
      num: '',
      options: {}
    }
  },
  mounted() {
    //this.initVideoEvent()
  },
  methods: {
    initVideoEvent() {
      setTimeout(() => {
        let video = document.getElementById(`dom-html-video_${this.num}`)
        this.video = video
        // 监听视频事件
        video.addEventListener('play', () => {
          this.$ownerInstance.callMethod('videoEvent', 'play')
        })
        video.addEventListener('pause', () => {
         this.$ownerInstance.callMethod('videoEvent', 'pause')
        })
        video.addEventListener('ended', () => {
          this.$ownerInstance.callMethod('videoEvent', 'ended')
          this.$ownerInstance.callMethod('resetEventDrive')
        })
        video.addEventListener('resize', () => {
           console.log('resize',164)
        })
      }, 100)
    },
    //父组件控制子组件方法集
    eventHandle(eventType) {
     console.log('eventType',eventType,172)
      if (eventType) {
        this.video = document.getElementById(`dom-html-video_${this.num}`)
        if (eventType === 'play') {
          this.video.play()
        } else if (eventType === 'pause') {
          this.video.pause()
        } else if (eventType === 'stop') {
          this.video.stop()
        }else if (eventType === 'fullScreen') {
          this.video.requestFullScreen()
        }
        console.log('this.video',this.video.requestFullScreen,177)
      }
    },
    srcChange(val) {
    console.log('val',val,182)
    if(!val){
    return
    }
      // 实现视频的第一帧作为封面，避免视频展示黑屏
      this.initVideoEvent()
      setTimeout(() => {
        let video = document.getElementById(`dom-html-video_${this.num}`)

        video.addEventListener('loadedmetadata', () => {
          let str ='';
            if( typeof this.options === 'string'){
                str = this.options.replace('json://', '')
            }
            let obj =typeof this.options === 'string'?JSON.parse(str):this.options
          let { autoplay } = obj
          video.play()
          if (!autoplay) {
           console.log('pause',203)
            video.pause()
          }
        })
      }, 0)
    },
    propsChange(obj) {
     console.log('propsChange',obj,214)
     let str=''
     if( typeof obj === 'string'){
                str = obj.replace('json://', '')
            }
             let data =typeof obj === 'string'?JSON.parse(str):obj
      this.options = data
    },
    randomNumChange(val) {
    console.log('randomNumChange',val,218)
      this.num = val
    },
  }
}

</script>


<style lang="scss" scoped>
.dom-video {
  overflow: hidden;
  //height: 100%;
  //width: 100%;
  padding: 0;

  &-height {
    height: 100%;
  }
}
</style>
