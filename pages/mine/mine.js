// pages/mine/mine.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{
        name:"郝南",
        gender:"male",
        depmt:"媒体宣传部",
        depmtSub:"新媒体部",
        college:"经济学院",
        tel:"1550021008"
     },
     hasSignIn:false,
     hasJoin:false,

  },

  toJoin: function (e) {
   this.setData({
     hasJoin:true
   })
  },

  more: function () {
    wx.navigateTo({
      url: '/pages/telbook/data/others',
    })
  },

  toTel:function(){
    wx.navigateTo({
      url: '/pages/telbook/detail/summary1',
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