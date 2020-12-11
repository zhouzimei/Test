import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const Login = () => import("views/login/Login")
const Home = () => import("views/home/Home")

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
    name:'Home'
  }
  
]

const router = new VueRouter({
  routes
})

export default router
