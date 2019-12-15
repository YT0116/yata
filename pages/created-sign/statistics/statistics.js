// pages/created-sign/statistics/statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,//控制签到显示
    selected2: false,//控制签退显示
    datatagList: [{
      value: '学院',
      selected: true,
      title: '学院',
      detail: ['经院', '管院', '信科院', '新传院'],//"学院"tag下的所有值
    }, {
      value: '部门',
      selected: false,
      title: '部门',
      detail: ['文娱部', '秘书部', '宣传部', '外招生部'],//"部门"tag下的所有值
    }, {
      value: '性别',
      selected: false,
      title: '性别',
      detail: ['男', '女']//“性别”tag下的所有值
    }],
    tag:[
      {
        value: '学院',
        detail: ['经院', '管院', '信科院', '新传院'],//"学院"tag下的所有值
      }
    ],//记录选中了什么按钮
  },
  mysign: function () {
    this.setData({
      selected2: false,
      selected1: true
    })
  },
  myquit: function () {
    this.setData({
      selected1: false,
      selected2: true
    })
  },
/* 选择饼图筛选按钮触发事件 */
  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "datatagList[" + e.target.dataset.index + "].selected";
    let length= this.data.datatagList.length;
    for (let i = 0; i < length; ++i){
      let stringtemp = "datatagList[" + i + "].selected";
      this.setData({
        [stringtemp]: false
      })
    }
    this.setData({
      [string]: !this.data.datatagList[e.target.dataset.index].selected
    })
    let detailValue = this.data.datatagList.filter(it => it.selected).map(it => it.value)
    let detailValue2 = e
    this.setData({
      //[tag.value]: detailValue2.value,
      //[tag.detail]: detailValue2.detail
      tag: detailValue2
    })
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 300
    });                  
    console.log('选中的值为：', detailValue)
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