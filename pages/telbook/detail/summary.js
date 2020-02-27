// pages/telbook/detail/summary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countTmp:0,
    selectedListAll:[],
    inputValue: '',
    hide1: true,//是否显示引导小黑框1
    hide2: false,//是否显示引导小黑框2
    myname:'郝南啊',//用户姓名
    mybumen:{
      bumen:'媒体宣传部',//主部门
      child:'媒体部'//所属子部门
    },//用户所属部门
    chose:0,//选中第几个部门选项
    bumen: [//可以选的所有部门值
      {
        id: 0,
        hasChild: false, //有没有子部门
        num:7,//该部门人数
        name: '综合办公室',
        selected: []//该部门的已选人
      },
      {
        id: 1,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '文娱体育部',
        child: ['司仪礼仪队', '其他'],//子部门
        selected: []
      },
      {
        id: 2,
        hasChild: false,
        num: 7,//该部门人数
        name: '人资财务部',
        selected: []
      }, 
      {
        id: 3,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '媒体宣传部',
        child: ['编辑部', '媒体部', '宣传部'],//子部门
        selected: []
      },
      {
        id: 4,
        hasChild: false,
        num: 7,//该部门人数
        name: '学术调研部',
        selected: []
      },
      {
        id: 5,
        hasChild: false,
        num: 7,//该部门人数
        name: '外招生部',
        selected: []
      },
      {
        id: 6,
        hasChild: false,
        name: '旭日青年志愿者服务队',
        num: 7,//该部门人数
        child: ['旭日青年志愿者', '心理服务部'],//子部门
        selected: []
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
    this.setData({
      chose: c
    })
    wx.navigateTo({
      url: '/pages/telbook/detail/branch?chose=' + c + '&name=' + this.data.bumen[c].name + '&nums=' + this.data.bumen[c].num + '&mId=' + this.data.bumen[c].id
    })
    console.log('所有选中的值为：', c)
  },
  /*确认，并返回上一级菜单去生成签到码 */
  confirm:function(){
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    prePage.setData({
      hasSelected:true
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    


    console.log('传过来的用户ID=', options.pId);
    var serverUrl = app.globalData.serverUrl;
    var that = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.request({
      url: serverUrl + '/yata/queryMDepCounts',
      method: 'post',
      success: function (res) {
        var sum = 0;
        var bumen = [];

        if (res.data.code == '0000') {
          console.log('返回的部门人数为===', res.data.data);
          let result = res.data.data;
          for (var i in result) {
            let obj = {};
            obj['num'] = result[i].depCount;
            obj['id'] = result[i].depId;
            obj['name'] = result[i].depName;
            sum += result[i].depCount;
            bumen.push(obj);
          }
          let title = { 'name': '暨南大学第36届研究生会', 'num': sum }

          that.setData({
            bumen: bumen,
            booktitle: title
          });
          console.log('构造的部门信息为===', that.data.bumen);
        }
      }
    })


    let bumenMap = {};
    bumenMap['bumen'] = options.bumenName;
    if (options.childName == '未输入') {
      bumenMap['child'] = '';
    } else {
      bumenMap['child'] = options.childName;
    }
    console.log('summary接受到的传值为====', options);


    if (options.pId != null && options.pId != undefined) {
      wx.request({
        url: app.globalData.serverUrl + '/yata/queryPersonById',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
          // 默认值
        },
        data: {
          personId: wx.getStorageSync('userId')
        },
        success: function (res) {
          console.log('查询到该用户===', res.data);
          if (res.data.code == '0000') {
            // myname: '郝南啊',//用户姓名
            //   mybumen: {
            //   bumen: '媒体宣传部',//主部门
            //     child: '媒体部'//所属子部门
            // },//用户所属部门
            var name = res.data.data.name;
            var mybumen = {
              bumen: app.globalData.mdepMap[res.data.data.mDep],
              child: app.globalData.sdepMap[res.data.data.sDep]
            };
          };
          console.log(name, mybumen);
          that.setData({
            myname: name,
            mybumen: mybumen
          });
        }
      })
    } else {
      this.setData({
        myname: options.name,
        mybumen: bumenMap
      });
    }



  },
  onReady: function () {
    console.log(this.data.selectedListAll)
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