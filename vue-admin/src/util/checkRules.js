//验证表单邮箱
export const checkEmail = (rule,value,callback) => {
    const res = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!res.test(value)) return callback(new Error("邮箱格式不正确"))
    callback()
}

//验证手机号
export const checkMobile = (rule,value,callback) => {
    const res = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    if (!res.test(value)) return callback(new Error("手机格式不正确"))
    callback()
}