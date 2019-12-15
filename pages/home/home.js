// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    type1: "",
    type2: "true",
    statusBarHeight: app.globalData.statusBarHeight,
    path:'',

  },
  scan: function(e){
    var myThis = this;
    wx.scanCode({
      success(res) {
        myThis.setData({
          path: '/pages/sign/sign'
        })
      }
    })
    this.setData({
      type1:"",
      type2:"true",
    }
    )
  },
  create: function (e) {
    this.setData({
      type2:"",
      type1:"true",
    }
    )
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var serverUrl=app.globalData.serverUrl;
    console.log('ssss',serverUrl);

    

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
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


    console.log("Enter the OnloadFunction!");
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

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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

  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      var imgUrl = e.detail.userInfo.avatarUrl;
      wx.login({
        success: (res) => {
      wx.request({
        url: app.globalData.serverUrl + '/yata/getOpenId',
        data: JSON.stringify({code:res.code}),
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == "0000") {
             console.log("Login-----res====", res.data.data.openid);
            wx.setStorageSync('openId', res.data.data.openid);
            console.log('保存的openid为=====', wx.getStorageSync('openId'));
           
            if (wx.getStorageSync('openId') != null || wx.getStorageSync('openId')              !=undefined){
            wx.request({
              url: app.globalData.serverUrl + '/yata/findOpenId',
              method:'post',
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
                // 默认值
              },
              data:{
                openId: String(wx.getStorageSync('openId')),
                imgUrl:imgUrl
              },
              success:function(res){
                console.log('查询到该用户是否绑定过本系统===',res.data);
               
                if(res.data.code=='0000'){
                  wx.setStorageSync('userId', res.data.data.id);
                  wx.navigateTo({
                    url: '../telbook/detail/summary?pId='+res.data.data.id,
                  })
                }else {
                    wx.navigateTo({
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

      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})