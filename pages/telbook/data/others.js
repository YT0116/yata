// pages/telbook/fill.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
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

    var that = this;

    wx.request({
      url: app.globalData.serverUrl + '/yata/queryPersonById',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        // 默认值
      },
      data: {
        personId: options.pId
      },
      success: function (res) {

        if (res.data.code == '0000') {

          console.log('返回的用户信息为===', res.data.data);
          var result = res.data.data;
          let card = {};
          let bumen = {};
          let position = {};

          // name: '郝南',
          //   sex: '男',
          //     bumen: {
          //   name: '媒体宣传部',
          //     child: '媒体部'
          // },
          // stuid: '2017056789',
          //   school: '石牌校区',
          //     college: '经济学院',
          //       major: '区域经济学',
          //         tel: '15521198500',
          //           email: '1234567@qq.com'

          card['name'] = result.name;
          card['email'] = result.email;
          card['college'] = result.institute;
          card['major'] = result.major;
          card['school'] = result.campus;
          card['stuid'] = result.student_id;
          card['tel'] = result.tel.split('.')[0];
          if (result.gender == 1) {
            let obj = { name: '男', src: '/image/male.png' };
            card['sex'] = '男';
          } else {
            let obj = { name: '女', src: '/image/female.png' };
            card['sex'] = '女';
          }
          if (result.sDep == result.mDep) {
            bumen = { name: app.globalData.mdepMap[result.mDep], child: app.globalData.mdepMap[result.mDep] }
            card['bumen'] = bumen;
          } else {
            bumen = { name: app.globalData.mdepMap[result.mDep], child: app.globalData.mdepMap[result.sDep] }
            card['bumen'] = bumen;
          }


          that.setData({
            data: card
          })

          console.log('datas==', that.data.data);
        }

      }
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