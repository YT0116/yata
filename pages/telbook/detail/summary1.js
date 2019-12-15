// pages/telbook/detail/summary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    hasUserInfo: true,
    inputValue: '',
    hide1: true,//是否显示引导小黑框1
    hide2: false,//是否显示引导小黑框2
    myname:'郝南啊',//用户姓名
    mybumen:{
      bumen:'媒体宣传部',//主部门
      child:'媒体部'//所属子部门
    },//用户所属部门
    booktitle:{
      name:'暨南大学第36届研究生会',//通讯录名称
      num:67//通讯录总人数
    },
    chose:0,//选中第几个部门选项
    bumen: [//可以选的所有部门值
      {
        id: 0,
        hasChild: false, //有没有子部门
        num:7,//该部门人数
        name: '综合办公室'
      },
      {
        id: 1,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '文娱体育部',
        child: ['司仪礼仪队', '其他']//子部门
      },
      {
        id: 2,
        hasChild: false,
        num: 7,//该部门人数
        name: '人资财务部'
      }, 
      {
        id: 3,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '媒体宣传部',
        child: ['编辑部', '媒体部', '宣传部']//子部门
      },
      {
        id: 4,
        hasChild: false,
        num: 7,//该部门人数
        name: '学术调研部'
      },
      {
        id: 5,
        hasChild: false,
        num: 7,//该部门人数
        name: '外招生部'
      },
      {
        id: 6,
        hasChild: false,
        name: '旭日青年志愿者服务队',
        num: 7,//该部门人数
        child: ['旭日青年志愿者', '心理服务部']//子部门
      }
    ],
  },
  mycard: function(){
    wx.navigateTo({
      url: '/pages/telbook/detail/mycard',
    })
  },
  /*
  隐藏引导小黑框
  */
  hideIns:function(){
    if (this.data.hide1 == true) {
      this.setData({
        hide1: false,
        hide2: true
      })
    }
    else{
      this.setData({
        hide2: false,
        hide1: false
      })
    }
  },
  // search:function(){
  //   wx.navigateTo({
  //     url: '/pages/telbook/detail/search',
  //   })
  // },
  navbranch(e)  {
    console.log('选择了', e.currentTarget.dataset.index)
    let string = "bumen[" + e.target.dataset.index + "]"
    var c = e.currentTarget.dataset.index;
    var read = true;
    this.setData({
      chose: c
    })
    wx.navigateTo({
      url: '/pages/telbook/detail/branch?chose='+c+'&read='+read
    })
    console.log('所有选中的值为：', c)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

  },
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