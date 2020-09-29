// pages/home/lists-map/lists-map.js
const config = require('../../../utils/config.js');
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'

var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'展馆地图',
    id:'',
    info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    var url = '/exhibition/jFindById'
    
    reqpost(app.globalData.bastUrl, url, {
      id: options.id
    }, "post", true).then(res => {
      if (res.success) {
        // WxParse.wxParse('article', 'html', res.data.content, this, 5);
        // // res.data.create = time.formatTimeTwo(res.data.createTime / 1000, 'M月D h:m');
        // res.data.start = time.formatTimeTwo(res.data.startTime / 1000, 'Y-M-D h:m');
        // res.data.end = time.formatTimeTwo(res.data.endTime / 1000, 'Y-M-D h:m');
        this.setData({
          info: res.data
        })
      }
    })
  },
  seeImg: function (e) {
    var img = e.currentTarget.dataset.img
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  back: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleGoBack: function () {
    let pages = getCurrentPages();
    if (pages.length > 2) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '../home/home',
      })
    }
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