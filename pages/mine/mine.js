// pages/mine/mine.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
     user:{
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
    //===========================验证该用户是否进行过信息绑定=======================
   this.setData({
     hasJoin:true
   })
        var imgUrl = e.detail.userInfo.avatarUrl;
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
                        imgUrl: imgUrl
                      },
                      success: function (res) {
                        console.log('查询到该用户是否绑定过本系统===', res.data);

                        if (res.data.code == '0000') {
                          wx.setStorageSync('userId', res.data.data.id);
                          wx.navigateTo({
                            url: '../telbook/detail/summary?pId=' + res.data.data.id,
                          })
                        } else {
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
  },

  more: function () {
    wx.navigateTo({
      url: '../telbook/data/others?pId='+wx.getStorageSync('userId'),
    })
  },

  toTel:function(){
    
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
              console.log('保存的openid为=====', wx.getStorageSync('openId') ,that.data.userInfo.avatarUrl);

              if (wx.getStorageSync('openId') != null && wx.getStorageSync('openId') != undefined) {

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
                      let result = res.data.data;
                      // user: {
                      //   name: "郝南",
                      //     gender: "male",
                      //       depmt: "媒体宣传部",
                      //         depmtSub: "新媒体部",
                      //           college: "经济学院",
                      //             tel: "1550021008"
                      // }
                      console.log(result.tel.split('.')[0]);
                      let user = { name: result.name, gender: result.gender, depmt: app.globalData.sdepMap[result.sDep], depmtSub: app.globalData.mdepMap[result.mDep], college: result.institute, tel: result.tel.split('.')[0], level: result.level == 1 ? '主席' : (result.level == 2 ? '副主席' : (result.level == 3 ? '部长' : (result.level == 4 ? '副部长' : '部员'))),gender:(result.gender==0?'/image/male.png':'/image/female.png') };

                      that.setData({
                        hasJoin: true,
                        user: user
                      })
                      wx.navigateTo({
                  url: '../telbook/detail/summary1',
                })
                    } else {
                      wx.showToast({
                        title: '请先加入组织',
                        icon: 'none',
                        duration: 2000
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
    // if (wx.getStorageSync('userId') != null && 
    // wx.getStorageSync('userId') != undefined && wx.getStorageSync('openId') != undefined 
    //   && wx.getStorageSync('openId') != null ){
    //   console.log('=====userId与openId不为空======',wx.getStorageSync('userId') , wx.getStorageSync('openId'));
    //             wx.navigateTo({
    //               url: '../telbook/detail/summary1',
    //             })
    //   }else{
    //       wx.showToast({
    //         content: '请先加入组织',
    //         icon:'none',
    //         duration:2000
    //       })
    //   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
    var that=this;

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
          console.log('userInfo调用成功');
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  console.log('mine中的load函数中得到的userInfo===',that.data.userInfo);
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
    var that=this;
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
          wx.setStorageSync('isJoin', true)
          wx.setStorageSync('userId', res.data.data.id);
          console.log('  wx.setStorageSync()',wx.getStorageSync('isJoin'))
          let result = res.data.data;
          // user: {
          //   name: "郝南",
          //     gender: "male",
          //       depmt: "媒体宣传部",
          //         depmtSub: "新媒体部",
          //           college: "经济学院",
          //             tel: "1550021008"
          // }
          let user = { name: result.name, gender: result.gender, depmt: app.globalData.sdepMap[result.sDep], depmtSub: app.globalData.mdepMap[result.mDep], college: result.institute, tel: result.tel.split('.')[0], level: result.level == 1 ? '主席' : (result.level == 2 ? '副主席' : (result.level == 3 ? '部长' : (result.level == 4 ? '副部长' : '部员'))), gender: (result.gender == 1 ? '/image/male.png' : '/image/female.png')  };

          that.setData({
            hasJoin: true,
            user: user
          })
        } else {
          wx.showToast({
            title: '请先加入组织',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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
                      imgUrl: imgUrl
                    },
                    success: function (res) {
                      console.log('查询到该用户是否绑定过本系统===', res.data);

                      if (res.data.code == '0000') {
                        wx.setStorageSync('userId', res.data.data.id);
                        wx.navigateTo({
                          url: '../telbook/detail/summary1?pId=' + res.data.data.id,
                        })
                        that.setData({
                          hasJoin: true
                        })
                      } else {
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