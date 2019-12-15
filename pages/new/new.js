// pages/new/new.js
const app = getApp()
var util = require('../../utils/util.js')
var title = app.title
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    title:'活动标题',
    t_length: 0,//已输入字数
    date: '',//签到开始日期
    time:'',//签到开始时间
    date2:'',//签到结束日期
    time2:'',//签到结束时间
    date3: '',//签退开始日期
    time3: '',//签退开始时间
    date4: '',//签退结束日期
    time4: '',//签退结束时间
    disabled: false,//设置是否能点击 false可以 true不能点击
    startDate: 2019,
    endDate: 2023,
    placeholder: '请选择时间',
    logouthide: "display:none",
    value: "选中",
    check:false,
    xs: true,
    nowYear: '',
    nowDate: ''
  },
  nextstep: function(e) {
    var t=this.data.title;
    var xs=this.data.xs;
    wx.navigateTo({
        url: '/pages/invite/invite?title=' + t + '&xs=' + xs,
      })
    
  },
  bindText: function (e) {
    var t_text = e.detail.value.length;
    var t=e.detail.value;
    app.title = t;
    console.log(title)
    this.setData({
      t_length: t_text,
      title: t
    })
    
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  bindDateChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date3: e.detail.value
    })
  },
  bindTimeChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time3: e.detail.value
    })
  },
  bindDateChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date4: e.detail.value
    })
  },
  bindTimeChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time4: e.detail.value
    })
  },
  checkboxChange: function(e){
    var that = this;
    that.setData({
      xs: (!that.data.xs)
    })
    
  },
  /**
 * 日历控件绑定函数 
 * 点击日期返回
 */
  onPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      date: e.detail.dateString
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curDate = new Date();
    var year = curDate.getFullYear();
    var month = curDate.getMonth()+1;
    var day = curDate.getDate();
    let dddate = year+'-'+month+'-'+day;
    if(month<10 && day<10){
      dddate = year+'-0'+month+'-0'+day;
    }
    else if(month<10){
      dddate = year + '-0' + month + '-' + day;
    }
    else if(day<10){
      dddate = year + '-' + month + '-0' + day;
    }
    var min = curDate.getMinutes();
    var hour = curDate.getHours();
    let ddate = hour+':'+min;
    if(hour<10 && min<10){
      ddate = '0'+hour+':'+'0'+min;
    }
    else if(hour<10){
      ddate = '0' + hour + ':'  + min;
    }
    else if(min<10){
      ddate =  hour + ':' + '0' + min;
    }
    xs: (options.xs == "true" ? true : false)
    this.setData({
      nowYear: year,
      date : dddate,
      time : ddate,
      date2 : dddate,
      time2 : ddate,
      date3: dddate,
      time3: ddate,
      date4: dddate,
      time4: ddate,
    });
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