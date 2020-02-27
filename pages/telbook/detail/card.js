// pages/telbook/detail/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    pId:0,
    card:{
      name:'郝南',
      sex:{name:'男',src:'/image/male.png'},//女/img/female.png
      bumen:{
        name:'媒体宣传部',
        child:'媒体部'
      },
      college:'经济学院',
      tel:'15521198500',
      position: { name: '部长', color: '#00BCD6' }//副部长：0099FF，部员：00CC00
    }
  },
  more:function(){
    wx.navigateTo({
      url: '/pages/telbook/data/others?pId='+this.data.card.id,
    })
  },
  /*
  复制按钮
  */
  copy() {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.card.tel,
      success: function (res) {
        wx.getClipboardData({
          success: function(res) {
          console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

   
    var serverUrl=app.globalData.serverUrl;
    console.log(serverUrl + '/yata/queryPersonById','card界面得到的pId=', options.pId);
    wx.request({
      url: serverUrl +'/yata/queryPersonById',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        personId: options.pId
      },
      success:function(res){
        if(res.data.code=='0000'){

            console.log('返回的用户信息为===',res.data.data);
            var result=res.data.data;
            let card={};
            let bumen={};
            let position={};

            // card: {
            //   name: '郝南',
            //     sex: { name: '男', src: '/img/male.png' },//女/img/female.png
            //   bumen: {
            //     name: '媒体宣传部',
            //       child: '媒体部'
            //   },
            //   college: '经济学院',
            //     tel: '15521198500',
            //       position: { name: '部长', color: '#00BCD6' }//副部长：0099FF，部员：00CC00
            // }
          card['id']=result.id;
          card['name']=result.name;
          card['college'] = result.institute;
          card['headerImg']=result.headeimg;
          card['tel'] = result.tel.split('.')[0];
          if(result.gender==1){
            let obj = { name: '男', src: '/image/male.png' };
            card['sex']=obj;
          }else{
            let obj = { name: '女', src: '/image/female.png' };
            card['sex'] = obj;
          }
          if(result.sDep==0){
            bumen = { name: app.globalData.mdepMap[result.mDep]}
            card['bumen']=bumen;
          }else{
            bumen = { name: app.globalData.mdepMap[result.mDep], child: app.globalData.sdepMap[result.sDep] }
            card['bumen'] = bumen;
          }

          if(result.level==1){
            position = { name: '主席', color: '#00BCD6' }
            card['position']=position;
          } else if (result.level == 2) {
            position = { name: '副主席', color: '#00BCD6' }
            card['position'] = position;
          }
          else if(result.level==3){
            position = { name: '部长', color: '#00BCD6' }
            card['position'] = position;
          } else if (result.level == 4) {
            position = { name: '副部长', color: '#0099FF' }
            card['position'] = position;
          } else  {
            position = { name: '部员', color: '#00CC00' }
            card['position'] = position;
          }

          that.setData({
            card:card
          })

          console.log('card==',that.data.card);
        }
      },
      fail:function(e){
        console.log('失败信息为===', e  );
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