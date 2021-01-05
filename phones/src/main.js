import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/css/base.css"
import Vant from 'vant';
import 'vant/lib/index.css';

import "./util/fliters"

//获取用户信息
import {getUserInfo} from "./util/init"
getUserInfo()

//获取城市信息
store.dispatch("getCity")
store.dispatch("getCurrCity")

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
