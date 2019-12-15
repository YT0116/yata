// pages/telbook/detail/branch.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chose: 0, //显示第几个部门
    isRead:false,//只展示通讯录，人员名字前没有勾选框
    showlist: false,//控制显示详细人员
    selectedList:[],
    position: [
      {
        text: '主席', //0
        color: '#463D68',
      }, {
        text: '副主席',
        color: '#463D68'
      },{
        text: '部长',
        color: '#00BCD6'
      },{
        text: '副部长',
        color: '#0099FF'
      }
    ],
    member: [
      {
        name: '啊啊啊',
        level: '2',
      },
      {
        name: '哇哇哇',
        level: '3',
      },
      {
        name: '南南南',
        level: '4',
      },
      {
        name: '嘤嘤嘤',
        level: '5',
      }
    ],
    bumen: [//可以选的所有部门值
      {
        id: 0,
        hasChild: false, //没有子部门
        num: 7,//该部门人数
        name: '综合办公室',
         member:[]
      },
      {
        id: 1,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '文娱体育部',
        child: [
          {
            showlist: false,//控制显示详细人员
            name:'司仪礼仪队',
            num: 2,
            member: []
            },
          {
            showlist: false,//控制显示详细人员
            name:'其他',//文娱部除礼仪队外直接显示人员
            num:5,
            member:[]
            }
           ]//子部门
      },
      {
        id: 2,
        hasChild: false,
        num: 7,//该部门人数
        name: '人资财务部',
        member: []
      },
      {
        id: 3,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '媒体宣传部',
        child: [
          {
            showlist: false,//控制显示详细人员
            name:'编辑部',
            num: 2,
            member: []
            },
          {
            showlist: false,//控制显示详细人员
            name: '媒体部',
            num: 3,
            member: []
            } , 
          {
            showlist: false,//控制显示详细人员
            name:'宣传部',
            num: 2,
            member: []
            }
          ]//子部门
      },
      {
        id: 4,
        hasChild: false,
        num: 7,//该部门人数
        name: '学术调研部',
        member: []
      },
      {
        id: 5,
        hasChild: false,
        num: 7,//该部门人数
        name: '外招生部',
        member: []
      },
      {
        id: 6,
        hasChild: true,
        name: '旭日青年志愿者服务队',
        num: 7,//该部门人数
        child: [
          {
            showlist: false,//控制显示详细人员
            name:'旭日青年志愿者',
            num: 3,
            member: []
            }
          ,
          {
            showlist: false,//控制显示详细人员
             name:'心理服务部',
            num: 4,
            member: []
             }
           ]//子部门
      }
    ],
  },

  /*点击主部门触发事件 */
  showList:function(e) {
    var c = e.currentTarget.dataset.index;
    var t = this.data.chose;
    console.log('选择了bumen[',t,'].child[', e.currentTarget.dataset.index,']')
    console.log(e)
    let string = "bumen[" + t + "].child[" + e.currentTarget.dataset.index + "].showlist"
    this.setData({
      [string]: !this.data.bumen[t].child[e.currentTarget.dataset.index].showlist
    })
  },

  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },

  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  /*点击某一个人，跳转到个人名片 */
  viewcard:function(){
    wx.navigateTo({
      url: '/pages/telbook/detail/card',
    })
  },
  /*选择签到人*/
  checkboxChange:function(e){
    var that = this;
    var selected = e.detail.value;
    that.setData({
      selectedList:that.data.selectedList.concat(selected)
    })
    console.log(that.data.selectedList)
    
  },
  /*确认，并返回上一级菜单 */
  confirm:function(){
    let pages = getCurrentPages();
    let prePage = pages[pages.length-2];
    let selectChange = "bumen["+this.data.chose+"].selected"
    prePage.setData({
      [selectChange]:this.data.selectedList,
      selectedListAll: prePage.data.selectedListAll.concat(this.data.selectedList)
    })
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    console.log("接收的参数：" + e.chose)
    console.log("是否只读通讯录不勾选："+e.read)
    this.setData({
      chose: e.chose,
      isRead:e.read
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**
    * 设置部门默认成员，连接后台数据就不需要，只做前端演示
    */
    var member = this.data.member;
    var bumen = this.data.bumen;
    var i = 0;
    for (; i < bumen.length; i++) {
      if (bumen[i].hasChild == false) {
        bumen[i].member = member;
      }
      else {
        var cnum = bumen[i].child.length;
        var j = 0;
        for (; j < cnum; j++) {
          bumen[i].child[j].member = member;
        }
      }
    }
    this.setData({
      bumen: bumen
    }) 
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