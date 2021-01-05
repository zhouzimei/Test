export const request = (url,data = {}, method = "get") =>{
    const baseURL = "http://localhost:3000"
    return new Promise((resolve,reject) => {
        wx.request({
            url: baseURL + url,
            data,
            success: function(res){
               resolve(res.data)
            },
            fail: function(err) {
               reject(err)
            },
            complete: function() {
                
            }
        })
    })
}