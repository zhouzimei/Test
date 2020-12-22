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

//格式化时间
export const dateFormat = (time) => {
    let date = new Date(time)
    let y = date.getFullYear()
    //不足两位补零
    let m = (date.getMonth() + "").padStart(2,"0")
    let d = (date.getDate() + "").padStart(2,"0")
    let hh = (date.getHours() + "").padStart(2,"0")
    let mm = (date.getMinutes() + "").padStart(2,"0")
    let ss = (date.getSeconds() + "").padStart(2,"0")
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}