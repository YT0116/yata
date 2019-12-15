// pages/created-sign/created-sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:[
      {
        title:'活动标题1（不签退）',
      year:2019,
      month:7,
      day:18,
      hour:13,
      min:55,
      del:false
      },
      {
        title: '活动标题2（不签退）',
        year: 2019,
        month: 10,
        day: 18,
        hour: 20,
        min: 55,
        del:false
      }
    ],
    singAndQuit:[
      {
        title: '活动标题1（签退）',
        year: 2019,
        month: 4,
        day: 18,
        hour: 13,
        min: 55,
        del:false
      },
      {
        title: '活动标题2（签退）',
        year: 2019,
        month: 6,
        day: 18,
        hour: 20,
        min: 55,
        del:false
      }
    ],
    showdel:false
  },
  del:function(){
    var del=this.data.showdel
    this.setData({
      showdel: !del
    })
  },
  navOrDelSQ:function(e){
    var del = this.data.showdel
    var that=this
    if(del==true){
    wx.showModal({
      title: '确认删除吗？',
      content: '请谨慎操作',
      confirmColor: 'green',
      success: function(res){
        if(res.confirm){
          console.log('用户点击了确认')
          let string = "singAndQuit[" + e.target.dataset.index + "].del"
          that.setData({
            [string]: true
          })
          let detailValue = that.data.singAndQuit.filter(it => it.del).map(it => it.title)
        }
        else if(res.cancel){
          console.log('用户点击了取消')
        }
      }
    });
    }
    else {
      wx.navigateTo({
        url: '/pages/invite-scan/invite-scan',
      });
    }
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