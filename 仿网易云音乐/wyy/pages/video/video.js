// pages/video/video.js
import {reqVideoNavs,reqVideoList} from "../../network/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    navList:[],
    navId:'',
    videoList:[],
    currentVid:'',

  },
  //点击图片
  vItemTap(e){
   
    this.setData({currentVid:e.currentTarget.dataset.vid})
  },
  //获取视频列表
  async getVideoList(){
    const res = await reqVideoList(this.data.navId)
    this.setData({videoList:res.datas.map(item => item.data)})
  },

  //点击导航
  navItemTap(e){
    this.setData({
      activeIndex:e.currentTarget.dataset.index,
      navId:e.currentTarget.dataset.id,
    })
    this.getVideoList()
  },
  //获取导航列表
  async getNavList(){
    const res = await reqVideoNavs()
    this.setData({
      navList:res.data.slice(0,10),
      navId:res.data[0].id
    })
    this.getVideoList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList()
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