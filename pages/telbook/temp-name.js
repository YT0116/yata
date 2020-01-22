// pages/telbook/telbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    booktitle: '暨南大学第36届研究生会',//通讯录名称
    join: true, //控制按钮是否有效
    legitname:['郑靖宇','郝贵南'],//合法姓名，就已经录入的研会成员姓名，这里先简单搞搞
    myname:''//用户填写的姓名
  },

  nextstep: function () {  //点击按钮事件
    var stu=this.data.legitname;
    var name=this.data.myname;
    wx.showToast({
        title: '验证中',
        icon: 'loading',
        duration: 2000
      })
    setTimeout(function () {
    if(stu.indexOf(name)>-1){//判断输入姓名是否存在于合法姓名数组stu里，合法返回下标，非法返回-1
      console.log("姓名合法，合法姓名对应数组下标：", stu.indexOf(name));
        wx.showToast({
          title: '验证成功',
          icon: 'success',
          duration: 1000
        })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/telbook/detail/summary',
        })
      }, 1000)
    }

    else{//如果用户名非法
      wx.showModal({
        title: '没有找到这个名字...',
        content: '请确认你输入了完整且准确的姓名\r\n(或联系组织负责人添加)',
        confirmText: '知道了',
        confirmColor: 'green',
        showCancel: false,
      })
    }
    }, 2000)//settimeout
  },

  join: function(e) {
    var ename=e.detail.value
    console.log("用户姓名：",ename)
    this.setData({
      join:false,
      myname:ename,
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