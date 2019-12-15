// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,
    selected2: false,
   // nohistory: true,
    signHistory:[
      {
        title:'活动标题1',
        year:2019,
        month:6,
        day:8,
        hour:7,
        min:34
      },
      {
        title: '活动标题2',
        year: 2019,
        month: 8,
        day: 3,
        hour: 17,
        min: 26
      }
    ],
    quitHistory:[
      {
        title: '活动标题1',
        year: 2019,
        month: 9,
        day: 28,
        hour: 13,
        min: 30
      },
      {
        title: '活动标题2',
        year: 2019,
        month: 8,
        day: 30,
        hour: 7,
        min: 55
      }
    ],
  },
  mysign: function(){
    this.setData({
      selected2: false,
      selected1: true
    })
  },
  myquit: function(){
    this.setData({
      selected1: false,
      selected2: true
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