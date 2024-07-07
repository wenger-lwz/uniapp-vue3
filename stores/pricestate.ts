import { acceptHMRUpdate, defineStore } from "pinia"

export const shopInfo = defineStore('counter', {
  state: () => ({
    symbol:'$',
    code:'USD',
    finance:1,
  }),

  getters: {
    
  },

  actions: {
    setsymbol(value1:any,value2:any,value3:any) {
        this.symbol = value1
        this.code=value2
        this.finance=value3
      }
  },
})


