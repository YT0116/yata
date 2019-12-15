// pages/telbook/telbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    booktitle:'暨南大学第36届研究生会',//通讯录名称
    join: true, //控制按钮是否有效
    showChild:false,//显示子部门选项框
    /*
    showName: false,//显示名字选框
    */
    bumenname:'点此选择部门',//显示的部门名称
    childname: '点此选择子部门',//显示的子部门名称
    bumen: [//可以选的所有部门值
      {
        id: 0,
        hasChild: false, //有没有子部门
        name: '综合办公室'
      },
      {
        id: 1,
        hasChild: true, //有子部门
        name: '文娱体育部',
        child: ['司仪礼仪队','其他']//子部门
      },
      {
        id: 2,
        hasChild: false,
        name: '人资财务部'
      }, 
      {
        id: 3,
        hasChild: true, //有子部门
        name: '媒体宣传部',
        child: ['编辑部', '媒体部', '宣传部']//子部门
      },
      {
        id: 4,
        hasChild: false,
        name: '学术调研部'
      },
      {
        id: 5,
        hasChild: false,
        name: '外招生部'
      },
      {
        id: 6,
        hasChild: true,
        name: '旭日青年志愿者服务队',
        child: ['旭日青年志愿者', '心理服务部']//子部门
      }
    ],
    index: 2,//部门默认显示位置
    
    childindex: 1//子部门默认显示位置
  },

  nextstep: function(){  //点击按钮事件
  wx.navigateTo({
   // url: '/pages/telbook/fill',
   url: '/pages/telbook/temp-name',//暂时跳转到强制的选择姓名页面
  })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      bumenname: this.data.bumen[e.detail.value].name,
    })
    if (this.data.bumen[e.detail.value].hasChild==true){//有子部门
      this.setData({
        showChild: true,
        join:true
      })
    }
    else{
      this.setData({
        showChild: false,
        join:false
        //showName: true
      })
    }
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      childindex: e.detail.value,
      childname: this.data.bumen[this.data.index].child[e.detail.value],
      join:false
      //showName: true
    })
  },

  /*填写姓名触发函数，先保留不用
  join: function(e) {
    this.setData({
      join:false
    })
  },
  */
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