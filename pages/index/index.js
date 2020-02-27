// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isJoin:false
  },

  toMine:function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  },

  toSignIn:function(){
    wx.navigateTo({
      url: '../sign-in/sign-in',
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
    console.log('wx.getStorageSync',wx.getStorageSync('isJoin'))
    if (wx.getStorageSync('isJoin') != null || wx.getStorageSync('isJoin') != undefined){
      this.setData({
        isJoin: wx.getStorageSync('isJoin')
      })
    }
     
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