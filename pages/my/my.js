// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },




  toTelBook:function(){
    var that=this;
    wx.login({
      success: (res) => {
        wx.request({
          url: app.globalData.serverUrl + '/yata/getOpenId',
          data: JSON.stringify({ code: res.code }),
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code == "0000") {
              console.log("Login-----res====", res.data.data.openid);
              wx.setStorageSync('openId', res.data.data.openid);
              console.log('保存的openid为=====', wx.getStorageSync('openId'));

              if (wx.getStorageSync('openId') != null || wx.getStorageSync('openId') != undefined) {
                wx.request({
                  url: app.globalData.serverUrl + '/yata/findOpenId',
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                    // 默认值
                  },
                  data: {
                    openId: String(wx.getStorageSync('openId')),
                    imgUrl: that.data.userInfo.avatarUrl
                  },
                  success: function (res) {
                    console.log('查询到该用户是否绑定过本系统===', res.data);

                    if (res.data.code == '0000') {
                      wx.setStorageSync('userId', res.data.data.id);
                      wx.navigateTo({
                        url: '../telbook/detail/summary?pId=' + res.data.data.id,
                      })
                    } else {
                      wx.redirectTo({
                        url: '../telbook/telbook',
                      })
                    }
                  }
                })
              }
            }
          },
          fail: function () {
            wx.showToast({
              title: '失败，请重试',
              icon: 'none',
              duration: 2000
            });
          }
        })
      }
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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