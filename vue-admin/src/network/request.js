import axios from 'axios'
export const request = (options) =>{
    const inst = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:50000
    })
    //请求拦截
    inst.interceptors.request.use(config => {
        config.headers.Authorization = sessionStorage.getItem("token")
        return config
    })
    //响应拦截
    inst.interceptors.response.use(data => {
        return data.data
    })
    return inst(options)
}