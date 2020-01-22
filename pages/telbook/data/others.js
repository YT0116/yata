// pages/telbook/fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      name: 'null',
      sex:  'null',
      bumen: {
        name: 'null',
        child: 'null'
      },
      stuid:'null',
      school: 'null', 
      college: 'null',
      major:'null',
      tel: 'null',
      email:'null'
    }
  },

  /*选择性别的函数 */
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexindex: e.detail.value,
      sex: this.data.sexs[e.detail.value],
    })
  },
  /*选择学院的函数 */
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      colindex: e.detail.value,
      college: this.data.colleges[e.detail.value],
    })
  },
  /*选择校区的函数 */
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sclindex: e.detail.value,
      school: this.data.schools[e.detail.value],
    })
  },


  /*点击完成按钮函数 */
  nextstep: function () {
    wx.showToast({
      title: '你已加入组织',
      icon: 'success',
      duration: 800
    });
    setTimeout(function () {  //延迟跳转到通讯录页面
      wx.navigateTo({
        url: '/pages/telbook/detail/summary'
      })
    }, 900)
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