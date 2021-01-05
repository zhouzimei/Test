import Vue from 'vue'
import Vuex from 'vuex'
import {reqCityAll} from "network/api"
import {jsonp} from "vue-jsonp"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    city:{},
    currentCity:'定位中...'
  },
  mutations: {
    //存用户信息
    saveUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    //改变likeList
    changeLikeList(state,params) {
      const {likeList} =  state.userInfo
      if (typeof params === "object"){
        likeList.push(params)
      }else {
        likeList.splice(likeList.findIndex(item => item.product_id == params),1)
      }
    },
    //保存城市
    saveCity(state,data){
      state.city = data
    },
    //改变城市
    changeCurrentCity (state,city){
      state.currentCity = city
    },
    //改变地址
    changeAddressList(state,obj){
      if (obj.typ === "add"){
        state.userInfo.addressList.push(obj.address)
      }else if (obj.type === "edit"){
        let index = state.userInfo.addressList.findIndex(item => item.id == obj.address.id)
        state.userInfo.addressList.splice(index,1,obj.address)
      }else if (obj.type === "del"){
        let index = state.userInfo.addressList.findIndex(item => item.id == obj.id)
        state.userInfo.addressList.splice(index,1)
      }
    }

  },
  getters:{
    isLogin(state){
      return !!state.userInfo.id || !!state.userInfo.nickname
    }
  },
  actions: {
    //获取城市信息
    async getCity(context){
      const res = await reqCityAll()
      context.commit("saveCity",res.data)
    },
    //获取定位
    async getCurrCity (context){
      let url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=22.560875250000002,113.88986734107806&output=json&pois=0"
      const res = await jsonp(url)
      context.commit("changeCurrentCity",res.result.addressComponent.city)
    }
  },
  modules: {
  }
})
