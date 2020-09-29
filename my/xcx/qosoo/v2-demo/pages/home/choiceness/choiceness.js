// pages/home/choiceness/choiceness.js


const app = getApp()
import { req } from '../../../utils/api.js'

var time = require('../../../utils/util.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 精选数组
    choicenessArray: "",
    baseImageUrl: "",
    user_token: "",
    user_Id: "",
    currentPage: 1,



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var userToken = wx.getStorageSync('TOKEN');
    var user_id = wx.getStorageSync('USER_ID');

    this.setData({
      baseImageUrl: app.globalData.bastUrl,
      user_token: userToken,
      user_id: user_id,
    })

    //精选
    req(app.globalData.bastUrl, '/index/handpick', {
      'pageNo': this.data.currentPage,
      'pageSize': '10',
    }, "get", true).then(res => {
      console.log(res, "精选");
      for (var i = 0; i < res.rows.length; i++) {
        res.rows[i].createTime = time.formatTimeTwo(res.rows[i].createTime / 1000, "Y-M-D")
        if (res.rows[i].status == 1) {
          res.rows[i].recommend = '推荐';
        } else if ((res.rows[i].status == 2)) {
          res.rows[i].recommend = '精选';
        }
      }
      this.setData({
        choicenessArray: res.rows,
      })
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
    console.log("aaa")
    var _this = this;
    this.data.currentPage = this.data.currentPage + 1;
    req(app.globalData.bastUrl, '/index/handpick', {
      'pageNo': this.data.currentPage,
      'pageSize': '10',
    }, "get", true).then(res => {
      console.log(res, "精选");
      var tmpArray = this.data.choicenessArray
      for (var i = 0; i < res.rows.length; i++) {
        res.rows[i].createTime = time.formatTimeTwo(res.rows[i].createTime / 1000, "Y-M-D")
        if (res.rows[i].status == 1) {
          res.rows[i].recommend = '推荐';
        } else if ((res.rows[i].status == 2)) {
          res.rows[i].recommend = '精选';
        }
        tmpArray.push(res.rows[i])
      }
      
      this.setData({
        choicenessArray: tmpArray,
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //跳转到精选列表
  PushToCaseDetail: function (e) {
    console.log("这是啥：" + JSON.stringify(e));
    var choiceDetail_id = e.currentTarget.dataset.id;
    
    var itemtypeTemp = e.currentTarget.dataset.type;
    //type 1 为案例 2 产品 3资讯
    if (itemtypeTemp == 2) {
      wx.navigateTo({
        url: '/pages/home/productDetail/productDetail?param_id=' + choiceDetail_id + "&type=" + itemtypeTemp
      })
    } else if (itemtypeTemp == 1) {
      wx.navigateTo({
        url: '/pages/home/caseDetail/caseDetail?param_id=' + choiceDetail_id + "&type=" + itemtypeTemp
      })
    } else { // 这个地方是因为精选没传type类型，暂时先进去
      wx.navigateTo({
        url: '/pages/home/caseDetail/caseDetail?param_id=' + choiceDetail_id + "&type=" + itemtypeTemp
      })
    }

  },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    })
  },

})