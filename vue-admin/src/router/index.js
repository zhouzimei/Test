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
    },{
      path:'/users',
      component:Users,
      name:'Users'
    },{
      path:'/roles',
      component:Roles,
      name:'Roles'
    },
    {path:'/goods',component:Goods,name:'Goods'},
    {path:'/rights',component:Rights,name:'Rights'},
    {path:'/params',component:Params,name:'Params'},
    {path:'/categories',component:Categories,name:'Categories'},
    {path:'/orders',component:Orders,name:'Orders'},
    {path:'/reports',component:Reports,name:'Reports'},
  ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
