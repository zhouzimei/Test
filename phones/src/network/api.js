import {request} from "./request"

//首页分页数据
export const reqPagination = (params) => request({url:'/product/pagination',method:'get',params})

//商品详情
export const reqProductDetail = (id) => request({url:'/product',method:'get',params:{id}})

//登录注册
export const reqLogin = (data) => request({url:'/user/signin',method:'post',data})

//收藏
export const reqAddLike = (product_id) => request({url:'/product_like/create',method:'post',data:{product_id}}) 

//取消收藏
export const reqDelLike = (product_id) => request({url:'/product_like/delete',method:'get',params:{product_id}})

//获取用户信息
export const reqUserInfo = () => request({url:'/user/info',method:'get'})

//添加购物车
export const reqUpdateCart = (data) => request({url:'/cart/update',method:'post',data})

//获取购物车数据
export const reqCartAll = () => request({url:'/cart/all',method:'get'})

//删除购物车
export const reqDelCart = (product_id) => request({url:'/cart/delete',method:'get',params:{product_id}})

//获取城市信息
export const reqCityAll = () => request({
    url:'/data/city',
    method:'get',
  })

//获取订单列表
export const reqOrderList = () => request({url:'/order/pagination',method:'get',params:{page:1,size:20}})

//获取收藏列表
export const reqLikeList = () => request({url:'/product_like/all',method:'get'})

//获取省区市列表
export const reqAreaList = () => request({url:'/data/area',method:'get'})

//新增收货地址
export const reqAddAddress = (data) => request({url:'/user_address/create',method:'post',data})

//修改用户地址
export const reqEditAddress = (data) => request({url:'/user_address/update',method:'post',data})
//下单
export const reqCreateOrder = (data) => request({url:'/order/create',method:'post',data})