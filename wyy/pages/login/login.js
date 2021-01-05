// pages/login/login.js
import {reqLogin} from "../../network/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
  //表单验证
  handelinput(e){
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    this.setData({[type]:value})

  },

  //点击按钮登录
  async loginBtn(){
    let {phone,password} = this.data
    if (phone.trim() === "" || password.trim() === ""){
      wx.showToast({
        title: '手机或密码不能为空',
        icon: 'none'
      })
      return
    }
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!reg.test(phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    const res = await reqLogin(phone,password)
    if(res.code !== 200){
      return wx.showToast({
        title:res.message,
        icon:'none'
      })
    }

    wx.setStorageSync('userInfo', res.profile)
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})