// pages/index/index.js
import {reqBannerList,reqIndexRecommend,reqTopSong} from "../../network/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recomList:[],
    topSongList:[],
  },

  //请求轮播图数据
  async getBannerList(){
      const {banners} = await reqBannerList(2)
      this.setData({banners})
      
  },

  //推荐歌单
  async getRecommendList(){
    const {result} = await reqIndexRecommend(10)
    console.log(result)
    this.setData({
      recomList:result
    })
   
  },

  //排行榜
  async getTopSongList(idx){
    const {playlist} = await reqTopSong(idx)
    let topSongList = []
    topSongList.push({
      name:playlist.name,
      tracks:playlist.tracks
    })
    this.setData({
      topSongList : [...this.data.topSongList,...topSongList]
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList()
    this.getRecommendList()
    for (var i = 0; i < 3; i++){
      this.getTopSongList(i)
    }


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