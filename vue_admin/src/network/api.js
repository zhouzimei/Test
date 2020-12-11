import { request } from "./request"
//请求登录
export const reqLogin = (data) => request({url:'login',method:'post',data})

//请求侧边栏菜单
export const reqMenus = () => request({url:'menus',method:'get'})
