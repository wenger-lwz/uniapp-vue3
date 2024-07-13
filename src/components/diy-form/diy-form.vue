<template>
  <uni-forms ref="customForm" :rules="rules" labelWidth="80px" :modelValue="model">
    <slot name="option"></slot>
  </uni-forms>
</template>


<script>
export default {
  props:{
    rules:{
      type:Object
    },
    model:{
      type:Object
    },
  },
  methods: {
    submit(ref='customForm') {
      return new Promise((resolve)=>{
        this.$refs[ref].validate().then(res => {
          console.log('success', res);
          resolve(true)
        }).catch(err => {
          console.log('err', err);
          resolve(false)
        })
      })

    },
  }
}
</script>

<style scoped>

</style>