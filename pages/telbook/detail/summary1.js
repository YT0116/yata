// pages/telbook/detail/summary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    inputValue: '',
    hide1: true,//是否显示引导小黑框1
    hide2: false,//是否显示引导小黑框2
    myname:'郝南啊',//用户姓名
    mybumen:{
      bumen:'媒体宣传部',//主部门
      child:'媒体部'//所属子部门
    },//用户所属部门
    booktitle:{
      name:'暨南大学第36届研究生会',//通讯录名称
      num:67//通讯录总人数
    },
    chose:0,//选中第几个部门选项
    bumen: [//可以选的所有部门值
      {
        id: 0,
        hasChild: false, //有没有子部门
        num:7,//该部门人数
        name: '综合办公室'
      },
      {
        id: 1,
        hasChild: true, //有子部门
        num: 7,//该部门人数
        name: '文娱体育部',
        child: ['司仪礼仪队', '其他']//子部门
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
  search:function(){
    wx.navigateTo({
      url: '/pages/telbook/detail/search',
    })
  },
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
onLoad: function (options) {

// =======BUG:===当别的用户点击了本系统的用户分享链接之后，会跳转到这个界面，然后同时会根据本系统用户的ID来获取用户信息---导致用户信息不匹配的情况
//========================改进思路：===========================添加一个login方法，获取当前用户的id跟传过来的id相匹配，如果相同继续显示，如果不同跳转到首页
  
  
  
    console.log('传过来的用户ID=',options.pId);
    var serverUrl=app.globalData.serverUrl;
    var that=this;

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
          console.log('userInfo调用成功');
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
console.log('在load函数中获取到的userInfo信息为===',that.data.userInfo);
  wx.request({
    url: serverUrl+'/yata/queryMDepCounts',
    method:'post',
    success:function(res)
    {
      var sum=0;
      var bumen=[];
      
      if(res.data.code=='0000'){
        console.log('返回的部门人数为===',res.data.data);
        let result=res.data.data;
        for (var i in result ){
            let obj={};
            obj['num']=result[i].depCount;
            obj['id'] = result[i].depId;
            obj['name'] = result[i].depName;
            sum += result[i].depCount;
            bumen.push(obj);
        }
        let title = { 'name': '暨南大学第36届研究生会','num':sum}

      that.setData({
        bumen:bumen,
        booktitle:title
      });
        console.log('构造的部门信息为===', that.data.bumen);
      }
    }
  })


    let bumenMap={};
    bumenMap['bumen']=options.bumenName;
    if (options.childName=='未输入'){
      bumenMap['child']='';
    }else{
    bumenMap['child'] = options.childName;
    }
    console.log('summary接受到的传值为====',options);
    

  if (wx.getStorageSync('userId') != null && wx.getStorageSync('userId')!=undefined){
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
          var name=res.data.data.name;
          var mybumen = { bumen: app.globalData.mdepMap[res.data.data.mDep],
            child: app.globalData.sdepMap[res.data.data.sDep]};
          } ;
          console.log(name,mybumen);
          that.setData({
            myname:name,
            mybumen:mybumen
          });
      }
    })
  }else{
      this.setData({
        myname: options.name,
        mybumen: bumenMap
      });
  }
   

  },
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