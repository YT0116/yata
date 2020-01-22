// pages/telbook/detail/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    card: {
      name: '郝南啊',
      sex: { name: '男', src: '/image/male.png' },//女/image/female.png
      bumen: {
        name: '媒体宣传部',
        child: '媒体部'
      },
      college: '经济学院',
      tel: '15521198500',
      position: { name: '副部长', color: '#00BCD6' }//部长：00BCD6，部员：00CC00
    }
  },

  /*
  复制按钮
  */
  copy() {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.card.tel,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /*
    跳转到查看更多个人信息
  */
  more:function(){
    wx.navigateTo({
      url: '/pages/telbook/data/others',
    })
  },
  /*
    跳转到编辑个人信息
  */
  editmore: function () {
    wx.navigateTo({
      url: '/pages/telbook/data/myself',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
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