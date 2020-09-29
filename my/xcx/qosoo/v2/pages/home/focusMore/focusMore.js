// pages/home/focusMore/focusMore.js

const app = getApp()
import { req, reqpost } from '../../../utils/api.js'

var time = require('../../../utils/util.js');



Page({ 

  /**
   * 页面的初始数据 
   */
  data: {
    myFocusGroupArray_1: "",
    baseImageUrl:"",

    itemType:"",

    user_token: "",
    user_Id: "",
    currentPage: 1,
    start :0,
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userToken = wx.getStorageSync('TOKEN')
    var user_id = wx.getStorageSync('user_id')

    this.setData({
      baseImageUrl: app.globalData.bastUrl,
      user_token: userToken,
      user_id: user_id,
      type: options.type 
    })
    var type = options.type 
    if (type == 3){
      wx.setNavigationBarTitle({
        title: '头条精选'
      })
      reqpost(app.globalData.bastUrl, '/news/jFindAll', {
        'start': 0,
        'status': 2,
        'limit': 13
      }, "post", true).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].createTime = time.formatTimeTwo(res.data[i].createTime / 1000, "M-D")
          if (res.data[i].status == 1) {
            res.data[i].recommend = '推荐';
          } else if ((res.data[i].status == 2)) {
            res.data[i].recommend = '精选';
          } else {
            res.data[i].recommend = '普通';
          }
        }
        this.setData({
          myFocusGroupArray_1: res.data,
        })
      })
    }else{
    // 关注客户企业资讯
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'status': 0,
      'start': _this.data.start,
      'limit':10
      
      
    //  'myId': this.data.user_id,
    }, "post", true).then(res => {

      if (res.success){

          // this.setData({
          //   myFocusGroupArray_1: res.data,
          // })

        var timestamp = res.data;
          var news = new Array();
          for (var i = 0; i < timestamp.length; i++) {
            timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime/1000, 'M-D');
            if (timestamp[i].type == 1) {
              timestamp[i].recommend = '案例';
            } else if (timestamp[i].type == 2) {
              timestamp[i].recommend = '产品';
            } else {
              timestamp[i].recommend = '资讯';
            }
            //if (timestamp[i].type == 3 && timestamp[i].status == 0) {
              news.push(timestamp[i]);
            //}
          }
          this.setData({
            myFocusGroupArray_1: news
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
    var _this = this;
    this.data.start = this.data.start + 10
    if(this.data.type ==3){
      reqpost(app.globalData.bastUrl, '/news/jFindAll', {
        'start': this.data.start,
        'status': 2,
        'limit': 13
      }, "post", true).then(res => {
        var news = _this.data.myFocusGroupArray_1;
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].createTime = time.formatTimeTwo(res.data[i].createTime / 1000, "M-D")
          if (res.data[i].status == 1) {
            res.data[i].recommend = '推荐';
          } else if ((res.data[i].status == 2)) {
            res.data[i].recommend = '精选';
          } else {
            res.data[i].recommend = '普通';
          }
          news.push(res.data[i]);
        }
        this.setData({
          myFocusGroupArray_1: news,
        })
      })
    }else{
    req(app.globalData.bastUrl, '/news/jFindAll', {
      'start': this.data.start,
      'status ': 0,
      'limit':10
      //  'myId': this.data.user_id,
    }, "GET", true).then(res => {
      if (res.success) {
          var timestamp = res.data;
          var news = _this.data.myFocusGroupArray_1;
          for (var i = 0; i < timestamp.length; i++) {
            timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, 'M-D');
            if (timestamp[i].type == 1) {
              timestamp[i].recommend = '案例';
            } else if (timestamp[i].type == 2) {
              timestamp[i].recommend = '产品';
            } else {
              timestamp[i].recommend = '资讯';
            }
            //if (timestamp[i].type == 3 && timestamp[i].status == 0) {
            news.push(timestamp[i]);
            //}
          }
          this.setData({
            myFocusGroupArray_1: news,
          })
      }
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "商业智慧专家",
      path: '/pages/home/home/home',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  // 跳转到案例详情
  PushToCaseDetail: function (e) {
    // if (this.data.userReg_BOOL == "yes") {
    //   wx.redirectTo({
    //     url: '/pages/public/userAuthStatus/userAuthStatus'
    //   })
    //   return;
    // }
    // 拿到跳转分类
    var that = this;
    var itemtypeTemp = e.currentTarget.dataset.type;
    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid;
    console.log(e.currentTarget)

    //if (!this.data.userInfoDataDic.account) {
    //  that.wsgrxx();
    //}else {
    //type 1 为案例 2 产品 3资讯
    // if (itemtypeTemp == 2) {
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id
    })
    // } else if (itemtypeTemp == 1) {
    //   wx.navigateTo({
    //     url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id
    //   })
    // } else { // 这个地方是因为精选没传type类型，暂时先进去
    //   wx.navigateTo({
    //     url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id
    //   })
    // }  
    //}


  },

  // 去详情页面
  // PushToDetailAction:function(e){
  //   console.log('关注状态的e:' + JSON.stringify(e));

  //   var itemtypeTemp = e.currentTarget.dataset.index;
  //   var company_id = e.currentTarget.dataset.companyid;
  //   var item_id = e.currentTarget.dataset.id;

  //   console.log('itemtypeTemp:' + itemtypeTemp);
  //   console.log('item_id:' + item_id);

  //   if (itemtypeTemp == "2"){
  //     wx.navigateTo({
  //       url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=2"+ "&company_id=" + company_id
  //     })
  //   } else if (itemtypeTemp == "1"){
  //     wx.navigateTo({
  //       url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=1" + "&company_id=" + company_id
  //     })
  //   } else if (itemtypeTemp == "3") {
  //     wx.navigateTo({
  //       url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=3" + "&company_id=" + company_id
  //     })
  //   }


  // },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    })
  },



})