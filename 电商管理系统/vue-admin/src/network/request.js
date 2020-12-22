import axios from 'axios'

//页面加载时的功能样式
import "nprogress/nprogress.css"
import NProgress from "nprogress"

export const request = (options) =>{
    const inst = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:50000
    })
    //请求拦截
    inst.interceptors.request.use(config => {
        NProgress.start()
        config.headers.Authorization = sessionStorage.getItem("token")
        return config
    })
    //响应拦截
    inst.interceptors.response.use(data => {
        NProgress.done()
        return data.data
    })
    return inst(options)
}