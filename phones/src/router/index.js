import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const Home = () => import("views/home/Home")
const Cart = () => import("views/cart/Cart")
const Me = () => import("views/me/Me")
const Detail = () => import("views/detail/Detail")
const Login = () => import("views/login/Login")
const Search = () => import("views/search/Search")
const citySelect = () => import("views/cityselect/citySelect")
const OrderList = () => import("views/orderList/OrderList")
const LikeList = () => import("views/likeList/LikeList")
const AddressList = () => import("views/addressList/AddressList")
const AddressEdit = () => import("views/addressEdit/AddressEdit")
const Setting = () => import("views/setting/Setting")
const OrderConfirm = () => import("views/orderConfirm/OrderConfirm")

//处理vue-router点击两次报错


const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    name:'Home',
    meta:{
      isShowTabBar:true
    }
  },
  {
    path:'/cart',
    component:Cart,
    name:'Cart'
  },
  {
    path:'/me',
    component:Me,
    name:'Me',
    meta:{
      isShowTabBar:true
    }
  },
  {
    path:'/detail',
    component:Detail,
    name:'Detail',
    
  },
  {
    path:'/login',
    component:Login,
    name:'Login'
  },
  {
    path:'/search',
    component:Search,
    name:'Search'
  },
  {
    path:'/citySelect',
    component:citySelect,
    name:'citySelect'
  },
  {
    path:'/orderList',
    component:OrderList,
    name:'orderList',
    meta:{
      auth:true
    }
  },
  {
    path:'/likeList',
    component:LikeList ,
    name:'likeList',
    meta:{
      auth:true
    }
  },
  {
    path:'/addressList',
    component:AddressList ,
    name:'addressList',
    meta:{
      auth:true
    }
  },
  {
    path:'/addressEdit',
    component:AddressEdit ,
    name:'AddressEdit',
    meta:{
      auth:true
    }
  },
  {
    path:'/setting',
    component:Setting ,
    name:'Setting',
    meta:{
      auth:true
    }
  },
  {
    path:'/orderConfirm',
    component:OrderConfirm ,
    name:'OrderConfirm',
    meta:{
      auth:true
    }
  },
  
]

const router = new VueRouter({
  mode:'history',
  routes
})
 router.beforeEach((to,from,next) => {
  !to.meta.auth ? next() : (sessionStorage.getItem("token") ?  next() : next("/login") )
 })
export default router
