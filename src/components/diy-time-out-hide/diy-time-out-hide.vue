<template>
  <u-notice-bar v-if="showDom" :volume-icon="false" :list="list" type="none" font-size="12"  color="white"  padding="0 0" ></u-notice-bar>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
const{endTimeNum=10,model}=defineProps(['endTimeNum','model'])
const emit=defineEmits(['onFinished'])
const list= [
  model['ct']
]
let showDom=ref(false)
let timer=0;//定时器
let num=1;
function toStart() {
  num++
  if(timer){
    clearTimeout(timer)
    timer=0
  }
  timer= setTimeout(()=>{
    if(num>endTimeNum){
      clearTimeout(timer)
      timer=0
      emit('onFinished')
      showDom.value=false
    }else{
      toStart()
    }
  },1000)
}
onMounted(()=>{
  showDom.value=true
  toStart()
})
onUnmounted(()=>{
  if(timer){
    clearTimeout(timer)
    timer=0
    showDom.value=false
  }
})
</script>

<style scoped>

</style>