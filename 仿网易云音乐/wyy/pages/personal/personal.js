
// pages/personal/personal.js
import {reqUserRecord } from "../../network/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userId:'',
    type:0,
    recordList:[]

  },
  //点击头像区域部分
  loginTap(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //获取播放记录
  async getRecord(){
    let userInfo = wx.getStorageSync('userInfo')
    let uid = userInfo.userId 
    const res = await reqUserRecord(uid)
    console.log(res.weekData.map(item => item.song))
   
    this.setData({
      recordList:res.weekData.map(item => item.song)
    })
 
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecord()
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
    //获取用户信息
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
    })

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