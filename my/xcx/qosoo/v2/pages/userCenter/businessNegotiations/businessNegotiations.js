// pages/userCenter/businessNegotiations.js
const app = getApp()
import { req } from '../../../utils/api.js'
var WxParse = require('../../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessTalkInfo:"",
    baseImgUrl:"",

    user_token: "",
    user_Id: "",

    // image: "../../images/13@3x.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN');
    var user_id = wx.getStorageSync('user_id');

    this.setData({
      //baseImgUrl: app.globalData.bastUrl,
      //user_token: userToken,
      user_id: user_id,
    })


    req(app.globalData.bastUrl, '/public/getTalkWork', {
      //'userId': this.data.user_id,
      //'token': this.data.user_token,
    }, "GET", true).then(res => {
      console.log(res,"洽谈业务")
      
      this.setData({
        businessTalkInfo: res.data.content,
      })
      WxParse.wxParse('businessTalkInfo', 'html', this.data.businessTalkInfo, this, 5);
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

  },
// 拨打电话
callMe: function () {
  console.log("打电话");
  console.log()
  wx.makePhoneCall({
    phoneNumber: "888888888", //此号码并非真实电话号码，仅用于测试
    success: function () {
      console.log("拨打电话成功！")
    },
    fail: function () {
      console.log("拨打电话失败！")
    }
  })
}
})