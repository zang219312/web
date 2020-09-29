// pages/home/lists-detail/lists-detail.js
const app = getApp()
import { req } from '../../../utils/api.js'
import { reqpost } from '../../../utils/api.js'
var time = require('../../../utils/util.js');
var WxParse = require('../../../lib/wxParse/wxParse.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'展会商讯',
    id:'',
    listType:1,
    info:'',
    article:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      listType: options.listType*1+1,
      id:options.id
    })
    if (this.data.listType == 2) {
      this.setData({
        title: '展会商讯'
      })
    } else if (this.data.listType == 3) {
      this.setData({
        title: '峰会论坛'
      })
    }
    this.getInfo()
  },
  getInfo:function(){
    var url = '/exhibition/jFindById'
    if (this.data.listType==3){
      url = '/meet/jFindById'
    }
    reqpost(app.globalData.bastUrl, url, {
      id: this.data.id
      
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        WxParse.wxParse('article', 'html', res.data.content, this, 5);
        // res.data.create = time.formatTimeTwo(res.data.createTime / 1000, 'M月D h:m');
        res.data.start = time.formatTimeTwo(res.data.startTime / 1000, 'Y-M-D h:m');
        res.data.end = time.formatTimeTwo(res.data.endTime / 1000, 'Y-M-D h:m');
        this.setData({
          info:res.data
        })
      }
    })
  },
  back:function(){
    // wx.navigateBack()
    wx.redirectTo({
      url: '/pages/home/home/home?type=' + this.data.listType
    })

  },
  seeImg:function(e){
    var img = e.currentTarget.dataset.img
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
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
    return {
      title: this.data.info.title,
      path: '/pages/home/lists-detail/lists-detail?listType=' + this.data.listType+'&id='+this.data.id,
      //imageUrl: this.data.share_logo,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})