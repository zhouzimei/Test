import { request } from "./request"
//请求登录
export const reqLogin = (data) => request({url:'login',method:'post',data})

//请求侧边栏菜单
export const reqMenus = () => request({url:'menus',method:'get'})

//请求用户列表(用一个对象接收数据)
export const reqUserList = (usersParams) => request({url:'users',method:'get',params:usersParams})

//修改用户状态
export const reqUpdateUserState = (uId,type) => request({url:`users/${uId}/state/${type}`,method:'put'})

//删除用户
export const reqDeletUser = (id) => request({url:`users/${id}`,method:'delete'})

//编辑用户
export const reqEditUser = (id,email,mobile) => request({url:`users/${id}`,method:'put',data:{email,mobile}})

//添加用户
export const reqAddUser = (data) => request({url:'users',method:'post',data})

//获取角色列表
export const reqRolesList = () => request({url:'roles',method:'get'})

//分配用户角色 id:用户id，rid:角色id
export const reqUpdateRole = (id,rid) => request({url:`users/${id}/role`,method:'put',data:{rid}})

//获取权限列表
export const reqRights = (type) => request({url:`rights/${type}`,method:'get'})

//删除角色权限
export const reqDelRolesRights = (roleId,rightId) => request({url:`roles/${roleId}/rights/${rightId}`,method:'delete'})

//更改角色权限
export const reqUpdateRoleRights = (roleId,rids) => request({url:`roles/${roleId}/rights`,method:'post',data:{rids}})

//删除角色
export const reqDeleRoles = (id) => request({url:`roles/${id}`,method:'delete'})

//添加角色
export const reqAddRole = (roleObj) => request({url:`roles`,method:'post',data:roleObj})

//编辑角色
export const reqEditRole = (id,roleObj) => request({url:`roles/${id}`,method:'put',data:roleObj})

//获取商品分类
export const reqCategories = (params) => request({url:'categories',method:'get',params})

//添加商品分类
export const reqAddCategories = (data) => request({url:'categories',method:'post',data})

//获取参数列表
export const reqAttrList = (id,sel) => request({url:`categories/${id}/attributes`,method:'get',params:{sel}})

//添加动态参数或静态属性
export const reqAddCateAttr = (id,data) => request({url:`categories/${id}/attributes`,method:'post',data})

//编辑动态参数或静态属性

export const reqEditCateAttr = (id,attrId,data) => request({
    url:`categories/${id}/attributes/${attrId}`,
    method:'put',
    data
   })

//删除参数
export const reqDelCateAttr = (id,attrid) => request ({url:`categories/${id}/attributes/${attrid}`,method:'delete'})

//获取商品列表
export const reqGoodsList = (params) => request({url:'goods',method:'get',params})

//添加商品
export const reqAddGoods = (data) => request({url:'goods',method:'post',data})

//删除商品
export const reqDelGoods = (id) => request({url:`goods/${id}`,method:'delete'})

//数据统计
export const reqReports = () => request({url:'reports/type/1',method:'get'})