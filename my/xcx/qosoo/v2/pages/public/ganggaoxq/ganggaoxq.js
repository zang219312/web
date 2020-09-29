// pages/public/ganggaoxq/ganggaoxq.js
const app = getApp()
import { req } from '../../../utils/api.js'
import { reqpost } from '../../../utils/api.js'
var WxParse = require('../../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessTalkInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.xq){
      req(app.globalData.bastUrl, '/adverts/get', {
        id: options.xq
      }, "GET", true).then(res => {
        console.log(res, "广告详情");
        this.setData({
          businessTalkInfo: res.data.content,
        })
        WxParse.wxParse('businessTalkInfo', 'html', this.data.businessTalkInfo, this, 5);
      })
    }else{
      req(app.globalData.bastUrl, '/carousel/getInfo', {
        id: options.banner_xq
      }, "GET", true).then(res => {
        console.log(res, "广告详情");
        this.setData({
          businessTalkInfo: res.data.articleContent,
        })
        WxParse.wxParse('businessTalkInfo', 'html', this.data.businessTalkInfo, this, 5);
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

  }
})