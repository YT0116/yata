// pages/new/edit/edit.js
const app = getApp()
var title = app.title
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '活动标题',
    t_length: 0,//已输入字数
    date: '',//签到开始日期
    time: '',//签到开始时间
    date2: '',//签到结束日期
    time2: '',//签到结束时间
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
    check: false,
    xs: true,
    nowYear: '',
    nowDate: '',
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    v: '',//记录新标签的值传递给新标签元素的value
    t: '',//同理，给title
    studentCommentList: [{
      value: '姓名',
      selected: true,
      title: '姓名'
    }, {
      value: '学号',
      selected: false,
      title: '学号'
    }, {
      value: '学院',
      selected: false,
      title: '学院'
    }],
    cardvalue: ['姓名'],//记录选择按钮都选了什么
    newcard: [],//新建的签到人卡片

  },

  nextstep: function (e) {
    var t = this.data.title;
    var xs = this.data.xs;
    wx.navigateTo({
      url: '/pages/invite/invite?title=' + t + '&xs=' + xs,
    })

  },
  bindText: function (e) {
    var t_text = e.detail.value.length;
    var t = e.detail.value;
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
  bindTimeChange: function (e) {
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
  quitChange: function (e) {
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
  addbtn: function (e) {//显示or隐藏填写新增按钮信息的模态框
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    var obj = {
      value: this.data.v,//模态框中输入的值将传入v，在此处将v传给新按钮的value
      selected: false,//默认未选中，方便后面记录已选择按钮的值
      title: this.data.t
    };//模态框中输入的值将传入t，在此处将v传给新按钮的title
    if (this.data.v.length <= 0) {//如果啥都没写就确认，不会新增空按钮
      this.setData({
        hiddenmodalput: true
      });
      return;
    };
    var newbtn = this.data.studentCommentList;
    newbtn.push(obj);//实质是添加studentCommentList数组内容，使for循环多一次
    this.setData({
      hiddenmodalput: true,
      studentCommentList: newbtn,
    })
  },
  addcard: function () {
    var newc = {};//新卡片newc
    var nowc = this.data.newcard;//nowc记录现在已有的卡片
    nowc.push(newc);
    this.setData({
      newcard: nowc,
    })

  },
  newstu: function (e) {
    this.setData({
      v: e.detail.value,//传入新按钮的值
      t: e.detail.value,
    });
    console.log(e.detail.value);
  },
  save: function () {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000   //弹框持续时间
    })
  },
  wait: function () {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    })
  },
  //选择按钮时执行下面的函数
  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "studentCommentList[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.studentCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.studentCommentList.filter(it => it.selected).map(it => it.value)
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 300
    });
    this.setData({
      cardvalue: detailValue   //将detailValue的值传给cardvalue，即记录所有选中的按钮值
    })                        //新增的卡片再按照cardvalue的值渲染元素
    console.log('所有选中的值为：', detailValue)
    app.globalData.cardvalue = detailValue
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
    console.log("接收的参数：" + e.title + " xs=" + e.xs)
    this.setData({
      title: e.title,
      xs: e.xs
    })
    console.log("title=" + this.data.title + "xs=" + this.data.xs)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var curDate = new Date();
    var year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;
    var day = curDate.getDate();
    let dddate = year + '-' + month + '-' + day;
    if (month < 10 && day < 10) {
      dddate = year + '-0' + month + '-0' + day;
    }
    else if (month < 10) {
      dddate = year + '-0' + month + '-' + day;
    }
    else if (day < 10) {
      dddate = year + '-' + month + '-0' + day;
    }
    var min = curDate.getMinutes();
    var hour = curDate.getHours();
    let ddate = hour + ':' + min;
    if (hour < 10 && min < 10) {
      ddate = '0' + hour + ':' + '0' + min;
    }
    else if (hour < 10) {
      ddate = '0' + hour + ':' + min;
    }
    else if (min < 10) {
      ddate = hour + ':' + '0' + min;
    }
    xs: (options.xs == "true" ? true : false)
    this.setData({
      nowYear: year,
      date: dddate,
      time: ddate,
      date2: dddate,
      time2: ddate,
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