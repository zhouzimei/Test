import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

import {dateFormat} from "./util/checkRules"
Vue.filter("dateFormat",dateFormat)

//使用第三方表格
import ZkTable from 'vue-table-with-tree-grid'
// Vue.use(ZkTable)
Vue.component("ZkTable",ZkTable)

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
