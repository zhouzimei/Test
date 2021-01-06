import {request} from "./request"

//请求轮播图数据
export const reqBannerList = (type) => request("/banner",{type})

//推荐歌单
export const reqIndexRecommend = (limit) => request("/personalized",{limit})

//排行榜
export const reqTopSong = (idx) => request("/top/list",{idx})

//登录
export const reqLogin = (data) => request("/login/cellphone",data)

//请求视频导航
export const reqVideoNavs = () => request("/video/group/list")

//获取视频list
export const reqVideoList = (id) => request("/video/group",{id})

//获取用户播放记录
export const reqUserRecord = (uid) => request("/user/record",{uid})