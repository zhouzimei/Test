export const request = (url,data = {}, method = "get") =>{
    const baseURL = "http://localhost:3000"
    let cookie = ""
    if (wx.getStorageSync('cookies')){
        cookie = wx.getStorageSync('cookies')[wx.getStorageSync('cookies').findIndex(item => item.indexOf("MUSIC_U")>= 0)]
    }
    wx.showLoading({
        title:'加载中',
        mask:true
    })
    return new Promise((resolve,reject) => {
        wx.request({
            url: baseURL + url,
            data,
            header:{
                cookie
            },
            success: function(res){
                if(data.isLogin){
                    wx.setStorageSync('cookies', res.cookies)
                    console.log(res.cookies)
                }
               resolve(res.data)
               wx.hideLoading()
            },
            fail: function(err) {
               reject(err)
               wx.hideLoading()
            },
            complete: function() {
                
            }
        })
    })
}