//过滤器
import Vue from "vue"
Vue.filter("priceFormat",(price) => {
    if(!price) return
    return `￥${price.toFixed(2)}`
})