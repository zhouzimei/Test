import {request} from "./request"

//请求轮播图数据
export const reqBannerList = (type) => request("/banner",{type})

//推荐歌单
export const reqIndexRecommend = (limit) => request("/personalized",{limit})

//排行榜
export const reqTopSong = (idx) => request("/top/list",{idx})

//登录
export const reqLogin = (phone,password) => request("/login/cellphone",{phone,password})