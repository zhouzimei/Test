import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const Login = () => import("views/login/Login")
const Home = () => import("views/home/Home")
const Welcome = () => import("views/welcome/Welcome")
const Users = () => import("views/users/Users")
const Roles = () => import("views/roles/Roles")
const Rights = () => import("views/rights/Rights")
const Goods = () => import("views/goods/Goods")
const Params = () => import("views/params/Params")
const Categories = () => import("views/categories/Categories")
const Orders = () => import("views/orders/Orders")
const Reports = () => import("views/reports/Reports")
const GoodsAdd = () => import("views/goodsAdd/GoodsAdd")
const NotFund = () => import("views/NotFund")

const authRoutersList = {
  users : {path:'/users',component:Users, name:'Users'},
  roles : {path:'/roles',component:Roles,name:'Roles'},
  rights: {path:'/rights',component:Rights,name:'Rights'},
  goods : {path:'/goods',component:Goods,name:'Goods'},
  params : {path:'/params',component:Params,name:'Params'},
  categories : {path:'/categories',component:Categories,name:'Categories'},
  orders : {path:'/orders',component:Orders,name:'Orders'},
  reports : {path:'/reports',component:Reports,name:'Reports'},
  addGoods : {path:'/goods/add',component:GoodsAdd,name:'GoodsAdd'},
}

const routes = [
  {
    path: '/',
    redirect:'/login'
    
  },
  {
    path:'/login',
    component:Login,
    name:'Login'
  },
  {
    path:'/home',
    component:Home,
    name:'Home',
    redirect:'/welcome',
    children:[{
      path:'/welcome',
      component:Welcome,
      name:'Welcome'
    },
    {path:'/users',component:Users, name:'Users'},
    {path:'/roles',component:Roles,name:'Roles'},
    {path:'/goods',component:Goods,name:'Goods'},
    {path:'/goods/add',component:GoodsAdd,name:'GoodsAdd'},
    {path:'/rights',component:Rights,name:'Rights'},
    {path:'/params',component:Params,name:'Params'},
    {path:'/categories',component:Categories,name:'Categories'},
    {path:'/orders',component:Orders,name:'Orders'},
    {path:'/reports',component:Reports,name:'Reports'},

  ]
  },
  //404
  {
    path:'*',
    component:NotFund
  }
  
]
const router = new VueRouter({
  mode:'hash',
  routes
})
export const authDynamicRouter = () =>{
  const routes = router.options.routes
  const authMenusList = JSON.parse(sessionStorage.getItem("authMenus"))
  authMenusList.forEach(item => {
    item.children.forEach(citem => {
      if (citem.authOps.add){
        routes[2].children.push(authRoutersList['addGoods'])
      }
      routes[2].children.push(authRoutersList[citem.path])
    })
  })

  //新路由规则奇起效
  router.addRoutes(routes)
}


router.beforeEach((to,from,next) => {
  if(to.path !== '/login'){
    //验证是否登录
    if (!sessionStorage.getItem("token")){
      next("/login")
    }else{
      //已经登录
      next()

    }
  }else{
    next()
  }
})


export default router
