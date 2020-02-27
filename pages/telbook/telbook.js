// pages/telbook/telbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    booktitle:'暨南大学第36届研究生会',//通讯录名称
    join: true, //控制按钮是否有效
    showChild:false,//显示子部门选项框
    /*
    showName: false,//显示名字选框
    */
    bumenname:'点此选择部门',//显示的部门名称
    childname: '未输入',//显示的子部门名称
    bumen: [//可以选的所有部门值
     
    ],
    index: 2,//部门默认显示位置
    
    childindex: 1//子部门默认显示位置
  },

  nextstep: function(){  //点击按钮事件

  wx.navigateTo({
   // url: '/pages/telbook/fill',
   url: '/pages/telbook/temp-name?bumenname='+this.data.bumenname+'&childname='+this.data.childname,//暂时跳转到强制的选择姓名页面
  })

  },
  bindPickerChange: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      bumenname: this.data.bumen[e.detail.value].name,
      childname: '未输入'
    })
    if (this.data.bumen[e.detail.value].hasChild==true){//有子部门
      this.setData({
        showChild: true,
        join:true
      })
   //   this.bindPickerChange2();
    }
    else{
      this.setData({
        showChild: false,
        join:false
        //showName: true
      })
    }
  },
  bindPickerChange2: function (e) {
   console.log('触发子部门的pick组件-----');
    var index = e.detail.value;
    console.log('picker2发送选择改变，携带值为', e.detail.value,'index===',index)
    this.setData({
      childindex: index,
      childname: this.data.bumen[this.data.index].child[index],
      join:false
      //showName: true
    })
  },

  /*填写姓名触发函数，先保留不用
  join: function(e) {
    this.setData({
      join:false
    })
  },
  */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var serverUrl=app.globalData.serverUrl;
    var that=this;
      wx.request({
        url: serverUrl +'/yata/getAllSDeps',
        method:'post',
        success:function(res){
          console.log(res);
          var result=res.data.data;
          console.log('AllSDeps====',result);
         
          var c=[];
          var childs=[];
          var fathers=[];
          var bumen=[];
          var obj={};
          var index = res.data.data.mdepId;
          for(var item in result){
            
            console.log(item);
                if (index == result[item].mdepId ){
                  fathers.push(result[item].mDep);
                  fathers = that.deleteSame(fathers);
                  c.push( result[item].sDep);
                  childs.push(c);
                }else{
                  c = [];
                  fathers.push(result[item].mDep);
                  c.push(result[item].sDep);
  
                  index = result[item].mdepId;
                  childs.push(c);
                }
            
            console.log("now==",result[item].mdepId,"before=="+index);
            
          }
          console.log(childs);
          var step = childs[0].length-1;
          console.log(step, childs.length);
          var c_index=0;
          var result=[];
          for(var i=0;i<childs.length;i++){
                if (step >=0 && childs[i][0]!=undefined) {
                  i += step;
                  result[c_index] = childs[i];
                  console.log(childs[i]);

                  console.log(step, i);
                  c_index++;
                } else {
                  result[c_index] = [];

                  i += step;
                  console.log(step, i, result[c_index]);

                  c_index++;
                }
                  if (childs[i + 1] == null || childs[i + 1]==undefined){
                    step =0;
                  }else{
                      step = childs[i + 1].length - 1;
                  }
          }
          var j=0;
          var i=0;
          console.log("******", fathers.length, result[0].length);
          while(i<fathers.length && j<result.length){
            console.log("----------Enter while------", result[j]);
            //       id: 6,
            //       hasChild: true,
            //       name: '旭日青年志愿者服务队',
            //       child: ['旭日青年志愿者', '心理服务部']//子部门
                  obj['id']=i;
                   obj['name']=fathers[i];
                   if(result[j].length==0 ){
                     obj['hasChild']=false;
                   }else {
                     obj['hasChild'] = true;
                     obj['child']=result[j];
                   }
                  i++;
                  j++;
                 bumen.push(obj);
                  obj={};
          }
          console.log(bumen,fathers,result);
          // that.setData({
          //   bumen:bumen
          // })
        }
      })
    // child: ["司仪礼仪队"]
    // hasChild: true
    // id: 0
    // name: "文娱体育部"
    wx.request({
      url: serverUrl + '/yata/queryDepRelation',
      method: 'post',
      success: function (res) {
        console.log('queryRelation===',res.data.data);
        var result=res.data.data
        var bumen = []

        for(var i in result){
        
          var obj = {}
          if (result[i].sDeps.length == 0){
            obj['hasChild'] = false
          }else{
            
            obj['child'] = []
            for (var j in result[i].sDeps){
              obj['child'].push(result[i].sDeps[j].sDep)  
            }
            obj['hasChild'] = true
          }
            obj['id'] = result[i].id
            obj['name'] = result[i].mDep

            bumen.push(obj)
        }
        that.setData({
          bumen: bumen
        })
        console.log('TelBook====',that.data.bumen)
      }
      })


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

  },
   deleteSame:function(array) {
    var newArr = [];
    for(var i = 0; i<array.length;i++){
  //开闭原则
  var bool = true;
  //每次都要判断新数组中是否有旧数组中的值。
  for (var j = 0; j < newArr.length; j++) {
    if (array[i] === newArr[j]) {
      bool = false;
    }
  }
  if (bool) {
    newArr[newArr.length] = array[i];
  }
}
return newArr;
    }
})