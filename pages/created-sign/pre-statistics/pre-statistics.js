// pages/created-sign/statistics/statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,//控制签到显示
    selected2: false,//控制签退显示
    presign: [//预填签到人数
        {
          classname:'de-data2',
          text:"有效签到",
          data: 12
        },//有效签到
      {
          classname: 'de-data1',
          text: "迟到签到",
          data: 2
        },//迟到签到
      {
          classname: 'de-data3',
          text: "未签到",
          data: 2
        },//未签到
    ],
    plussign: [//后来签到人数
      {
        classname: 'de-data2',
        text: "有效签到",
        data: 4
      },//有效签到
      {
        classname: 'de-data1',
        text: "迟到签到",
        data: 3
      },//迟到签到
      {
        classname: 'de-data3',
        text: "未签到",
        data: 4
      },//未签到
    ],
  },
  mysign: function () {
    this.setData({
      selected2: false, 
      selected1: true
    })
  },
  myquit: function () {
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