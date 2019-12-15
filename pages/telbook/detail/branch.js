// pages/telbook/detail/branch.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chose: 0, //显示第几个部门
    showlist: false,//控制显示详细人员
    mName:'',
    nums:0,
    bumen: {//可以选的所有部门值
      // {
      //   id: 0,
      //   hasChild: false, //没有子部门
      //   num: 7,//该部门人数
      //   name: '综合办公室',
      //   member: ['啊啊啊', '哇哇哇', '南南南', '嘤嘤嘤', '困困困','次次次','嘻嘻嘻']
      // },
      // {
      //   id: 1,
      //   hasChild: true, //有子部门
      //   num: 7,//该部门人数
      //   name: '文娱体育部',
      //   child: [
      //     {
      //       showlist: false,//控制显示详细人员
      //       name:'司仪礼仪队',
      //       num: 2,
      //       member: ['啊啊啊', '哇哇哇']
      //       },
      //     {
      //       showlist: false,//控制显示详细人员
      //       name:'其他',//文娱部除礼仪队外直接显示人员
      //       num:5,
      //       member:['啊啊啊','哇哇哇','南南南','嘤嘤嘤','困困困']
      //       }
      //      ]//子部门
      // }
    },
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/telbook/detail/search',
    })
  },

  /*点击主部门触发事件 */
  showList(e) {
    var c = e.currentTarget.dataset.index;
    var t = this.data.chose;
    console.log('选择了bumen.child[', e.currentTarget.dataset.index,']')
    let string = "bumen.child[" + e.currentTarget.dataset.index + "].child.showlist"
    console.log('选择的部门信息为：==', this.data.bumen.child[e.currentTarget.dataset.index].child.showlist);
    this.setData({
      [string]: !this.data.bumen.child[e.currentTarget.dataset.index].child.showlist
    })
  },
  /*点击某一个人，跳转到个人名片 */
  viewcard:function(e){
    console.log(' 点击的学生id为==',e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/telbook/detail/card?pId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var serverUrl=app.globalData.serverUrl;
    var that=this;
    console.log("接收的参数：" + e.chose,e.mId,e.name,e.nums,e.pId);
    var mName=e.name;
    var nums=e.nums;
    var mId=e.mId;

    this.setData({
      chose: e.chose,
      mName:mName,
      nums:nums
    })


    // id: 1,
    //   hasChild: true, //有子部门
    //     num: 7,//该部门人数
    //       name: '文娱体育部',
    //         child: [
    //           {
    //             showlist: false,//控制显示详细人员
    //             name: '司仪礼仪队',
    //             num: 2,
    //             member: ['啊啊啊', '哇哇哇']
    //           },
    //           {
    //             showlist: false,//控制显示详细人员
    //             name: '其他',//文娱部除礼仪队外直接显示人员
    //             num: 5,
    //             member: ['啊啊啊', '哇哇哇', '南南南', '嘤嘤嘤', '困困困']
    //           }
    //         ]

    wx.request({
      url: serverUrl + '/yata/querySDepStructByMId',
      method: 'post',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mId:mId
      },
      success: function (res) {

        var result=res.data.data;
        if(res.data.code='0000'){
          var bumen={};
          let has = {};
          var list=[];
          console.log('是否有子部门===', res.data.data.length);
          if (res.data.data.length == 0) {
            bumen['hasChild'] = false;

            let formData={sDep:mId};
            wx.request({
              url: serverUrl + '/yata/getDepMebs',
              data: JSON.stringify(formData),  // 将 formData 转化成JSON对象
              method: 'POST',
              header: { 'Content-Type': 'application/json' },
              data: {
                mDep: mId
              },
              success: function (res) {
                  if(res.data.code=='0000')
                  {
                    console.log('返回的没有子部门的结果为==',res.data.data);
                    let obj={};
                    list.push(res.data.data);

                    bumen['child'] = list;
                    that.setData({
                      bumen: bumen
                    })
                    console.log('没有子部门-----得到的bumen列表第为===', that.data.bumen)
                    
                  }
              }
            })


          } else {
            bumen['hasChild'] = true;
         
              for(var i in result){
                  let obj={};               
                  let child=[];
                  let persons = result[i].persons;
                console.log('persons[j]===', result[i]);
                      let c_obj = {};               
                      c_obj['showlist']=false;
                      c_obj['name'] = result[i].sDep;
                      c_obj['num'] = result[i].counts;
                      c_obj['member'] = result[i].persons; 
                      

                  obj['child'] = c_obj;
                  console.log('child数组为===',child);
                list.push(obj);

              }
            bumen['child'] = list;
            that.setData({
              bumen: bumen
            })
            console.log('-得到的bumen列表第为===', that.data.bumen)
          }
            

        }

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