// pages/sign/sign.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,//底部弹框是否显示
    self: false,//是否本人参与，但需要补充名单
    other: false,//是否代替别人参与
    notchosen: true,//控制弹框按钮是否可用
    cardvalue:[
      '姓名'
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidden: true,
    havesign: false,
    confirmTimes:0,//先记录按确认的次数吧……
    path:'',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  success_sign: function(){
    this.setData({
      hidden: false,
    });
    if(this.data.confirmTimes==0){
    wx.navigateTo({
      url: '/pages/success/success'
    })
      this.setData({
        confirmTimes:1
      })
    }
    var myThis=this;
    wx.showModal({
      title: '你已成功签到',
      content: '请勿重复签到',
      confirmText: '知道了',
      confirmColor: 'green',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          myThis.setData({
            path: '/pages/success/success'
          })
          console.log('用户点击确定')
        }
        
      }
    })
    
  },
  
  confirm: function(){
    this.setData({
      hidden:true,
      havesign: true,
      path:'/pages/success/success'
    })
  },
  /* ///   失败弹框   /// */
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  /* 选择框触发事件 */
  checkself: function(e){
    this.setData({
      self: true,
      other: false
    })
    if(this.data.self == this.data.other){
      this.setData({
        notchosen:true,
      })
    }
    else{
      this.setData({
        notchosen:false,
      })
    }
  },
  checkother: function(e){
    this.setData({
      other: true,
      self: false
    })
    if (this.data.self == this.data.other) {
      this.setData({
        notchosen: true,
      })
    }
    else {
      this.setData({
        notchosen: false,
      })
    }
  },


  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
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
        hasUserInfo: true,
        cardvalue: app.globalData.cardvalue
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          cardvalue: res.cardvalue
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          app.globalData.cardvalue = res.cardvalue
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            cardvalue: app.globalData.cardvalue
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.cardvalue = e.cardvalue
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      cardvalue: e.detail.cardvalue
    })
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