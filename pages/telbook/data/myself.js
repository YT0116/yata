// pages/telbook/fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:
    {
      name: '郝南',
      sex: '男',
      bumen: {
        name: '媒体宣传部',
        child: '媒体部'
      },
      stuid: '2017056789',
      school: '石牌校区',
      college: '经济学院',
      major: '区域经济学',
      tel: '15521198500',
      email: '1234567@qq.com'
    },
    sexindex: 0,
    sexs: ['男', '女'],
    sex: '男',
    colindex: 2,
    colleges: ['经济学院', '文学院', '管理学院', '信息学院'],
    college: '经济学院',
    sclindex: 1,
    schools: ['石牌校区', '番禺校区', '珠海校区', '华文校区', '深旅校区'],
    school: '石牌校区'
    
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


/**

  data: {
    sexindex: 0,
    sexs: ['男', '女'],
    sex: datas.sex,
    colindex: 2,
    colleges: ['经济学院', '文学院', '管理学院', '信息学院'],
    college: datas.college,
    sclindex: 1,
    schools: ['石牌校区', '番禺校区', '珠海校区', '华文校区', '深旅校区'],
    school: datas.school,
    datas: {
      name: '郝南',
      sex: '男',
      bumen: {
        name: '媒体宣传部',
        child: '媒体部'
      },
      stuid: '2017056789',
      school: '石牌校区',
      college: '经济学院',
      major: '区域经济学',
      tel: '15521198500',
      email: '1234567@qq.com'
    }
  },
 */