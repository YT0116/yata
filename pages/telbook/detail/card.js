// pages/telbook/detail/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    card:{
      name:'郝南',
      sex:{name:'男',src:'/image/male.png'},//女/img/female.png
      bumen:{
        name:'媒体宣传部',
        child:'媒体部'
      },
      college:'经济学院',
      tel:'15521198500',
      position: { name: '部员', color: '#00CC00' }//部长：09BB07，副部长：0099FF，部员：00CC00
    }
  },
  more:function(){
    wx.navigateTo({
      url: '/pages/telbook/data/others',
    })
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
          success: function(res) {
          console.log(res.data) // data
          }
        })
      }
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