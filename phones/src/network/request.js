import axios from "axios"
export const request = (options) =>{
    const inst = axios.create({
        baseURL:'/api/v4',
        timeout:50000
    })
    //请求拦截
    inst.interceptors.request.use(config => {
        config.headers.authorization = sessionStorage.getItem("token")
        return config
    })
    //响应拦截
    inst.interceptors.response.use(data => {
        return data.data
    })
    return inst(options)
}