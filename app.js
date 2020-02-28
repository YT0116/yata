// app.js
App({
  

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    console.log("app  launch!");
    // 登录

  },
  globalData: {
    title: '标题',
    userInfo: null,
    cardvalue: ['姓名'],
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    isJoin:false,
    openid: '',
    unionid: '',
    serverUrl: 'https://www.yatatek.xyz',
    mdepMap: { 1: '文娱体育部', 2: '人资财务部', 3: '媒体宣传部', 4: '学术调研部', 5: '外招生部', 6: '旭日青年志愿者服务队', 7: '综合办公室', 8: '主席团' },
    sdepMap: { 1: '司仪礼仪队', 2: '其他', 3: '编辑部', 4: '新媒体部', 5: '宣传部', 6: '旭日青年志愿者', 7: '心理服务部' },
    mdepMap_R: { '文娱体育部': 1, '人资财务部': 2, '媒体宣传部': 3, '学术调研部': 4, '外招生部': 5, '旭日青年志愿者服务队': 6, '综合办公室': 7, '主席团': 8 },
    sdepMap_R: { '司仪礼仪队': 1, '其他': 2, '编辑部': 3, '新媒体部': 4, '宣传部': 5, '旭日青年志愿者': 6, '心理服务部': 7 }
  }

})
