// pages/created-sign/statistics/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,//控制签到显示
    selected2: false,//控制签退显示
    showModalStatus: false,//底部弹框是否显示
    all: true,//控制学院，选中了‘全选’，如果选了其他checkbox，就取消选中‘全选’
    part: false,//控制学院
    allDepart: true,//控制部门，选中了‘全选’，如果选了其他checkbox，就取消选中‘全选’
    partDepart: false,//控制部门
    signlist: [
      {
        info: [
          ['姓名', '郑靖宇'],
          ['学号', '1530041003'],
          ['学院', '经济学院']],
        name: '郑靖宇',
        id: '1530041003',
        college: '经济学院',
        time: '08/03 19:10',
        tag_color: 'green',
        text: '有效签到',
        tag: 1//1:有效签到，2：迟到签到，0：未加载
      },
      {
        info: [
          ['姓名', '刘明怡'],
          ['学号', '1530041009'],
          ['学院', '信息学院']],
        name: '刘明怡',
        id: '1530041009',
        college: '信息学院',
        time: '08/03 19:40',
        tag_color: 'plum',
        text: '迟到签到',
        tag: 2//1:有效签到，2：迟到签到，0：未加载
      },
      {
        info: [
          ['姓名', '张怡'],
          ['学号', '1530041004'],
          ['学院', '信息学院']],
        name: '张怡',
        id: '1530041004',
        college: '信息学院',
        time: '--',
        tag_color: '',
        text: '加载中',
        tag: 0//1:有效签到，2：迟到签到，0：未加载
      }
    ],
    quitlist: [
      {
        info: [
          ['姓名', '郑靖宇'],
          ['学号', '1530041003'],
          ['学院', '经济学院']],
        name: '郑靖宇',
        id: '1530041003',
        college: '经济学院',
        time: '08/03 19:10',
        tag_color: 'green',
        text: '有效签退',
        tag: 1//1:有效，2：迟到，0：未加载
      },
      {
        info: [
          ['姓名', '刘明怡'],
          ['学号', '1530041009'],
          ['学院', '信息学院']],
        name: '刘明怡',
        id: '1530041009',
        college: '信息学院',
        time: '08/03 19:40',
        tag_color: 'plum',
        text: '迟到签退',
        tag: 2//1:有效，2：迟到，0：未加载
      },
      {
        info: [
          ['姓名', '张怡'],
          ['学号', '1530041004'],
          ['学院', '信息学院']],
        name: '张怡',
        id: '1530041004',
        college: '信息学院',
        time: '--',
        tag_color: '',
        text: '加载中',
        tag: 0//1:有效，2：迟到，0：未加载
      }
    ],
    collegeSet: [
      {
        title: '经济学院',
        selected: false,
        value: '经济学院'
      },
      {
        title: '信息学院',
        selected: false,
        value: '信息学院'
      },
      {
        title: '管理学院',
        selected: false,
        value: '管理学院'
      },
      {
        title: '生科学院',
        selected: false,
        value: '生科学院'
      }],
    departmentSet: [
      {
        title: '文娱部',
        selected: false,
        value: '文娱部'
      },
      {
        title: '秘书部',
        selected: false,
        value: '秘书部'
      },
      {
        title: '宣传部',
        selected: false,
        value: '宣传部'
      },
      {
        title: '外招生部',
        selected: false,
        value: '外招生部'
      }],
    checkvalue: [],//记录选中的学院值
    college: ['经济学院', '信息学院', '管理学院', '生科学院'],//获取所有学院名称
    checkDepartvalue: [],//记录选中的部门值
    department: ['文娱部', '秘书部', '宣传部', '外招生部'],//获取所有学院名称
  },
  sign: function () {
    this.setData({
      selected2: false,
      selected1: true
    })
  },
  quit: function () {
    this.setData({
      selected1: false,
      selected2: true
    })
  },
  /* ///   底部弹框   /// */
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /*     点击学院的全部按钮触发事件        */
  checkall(e) {
    if (e.detail.value == '') {
      this.setData({
        all: false,
        part: true
      })
    }
    else {
      let detailValue = this.data.college;
      console.log('选中全部值：', detailValue);
      this.setData({
        all: true,
        part: false,
        checkvalue: detailValue
      })
    }
  },
  /*     点击部门的全部按钮触发事件        */
  checkallDepart(e) {
    if (e.detail.value == '') {
      this.setData({
        allDepart: false,
        partDepart: true
      })
    }
    else {
      let detailValue = this.data.department;
      console.log('选中全部值：', detailValue);
      this.setData({
        allDepart: true,
        partDepart: false,
        checkDepartvalue: detailValue
      })
    }
  },
  /*         选择学院触发的事件              */
  checkchange(e) {
    console.log('checkboxChange e:', e);
    let string = "collegeSet[" + e.target.dataset.index + "].selected"
    this.setData({
      all: false,
      [string]: !this.data.collegeSet[e.target.dataset.index].selected
    })
    if (this.data.all == true) {
      let detailValue = this.data.college;
      this.setData({
        checkvalue: detailValue   //将detailValue的值传给cardvalue，即记录所有选中的按钮值
      })
    }
    else {
      let detailValue = this.data.collegeSet.filter(it => it.selected).map(it => it.value);
      this.setData({
        checkvalue: detailValue   //将detailValue的值传给cardvalue，即记录所有选中的按钮值
      })
    }
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 300
    });
    console.log('选中的值为：', this.data.checkvalue)
    app.globalData.checkvalue = this.data.checkvalue
  },

  /*         选择部门触发的事件              */
  checkchangeDepart(e) {
    console.log('checkboxChange e:', e);
    let detailValue = null;
    let string = "departmentSet[" + e.target.dataset.index + "].selected"
    this.setData({
      allDepart: false,
      [string]: !this.data.departmentSet[e.target.dataset.index].selected
    })
    if (this.data.allDepart == true) {
      detailValue = this.data.department
    }
    else {
      detailValue = this.data.departmentSet.filter(it => it.selected).map(it => it.value)
    }
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 300
    });
    this.setData({
      checkDepartvalue: detailValue   //将detailValue的值传给cardvalue，即记录所有选中的按钮值
    })                        //新增的卡片再按照cardvalue的值渲染元素
    console.log('选中的部门值为：', detailValue)
    app.globalData.checkDepartvalue = detailValue
  },

  /*         点击确认              */
  checkconfirm: function (e) {
    if (this.data.all == true) {
      let detailValue = this.data.college;
      console.log('选中全部学院值：', detailValue);
    }
    else {
      let detailValue = this.data.checkvalue;
      console.log('所有选中的学院值为：', detailValue);
    }
    if (this.data.allDepart == true) {
      let detailValue = this.data.department;
      console.log('选中全部部门值：', detailValue);
    }
    else {
      let detailValue = this.data.checkDepartvalue;
      console.log('所有选中的部门值为：', detailValue);
    }
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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