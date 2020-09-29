// pages/home/lists-history/lists-history.js
const app = getApp()
import { req } from '../../../utils/api.js'
import { reqpost } from '../../../utils/api.js'
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'展会记录',
    listType: 1,
    city: '',
    exhibitionStart: 0,
    exhibitionlist: [],
    meetStart: 0,
    meetlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listType: options.listType,
    })
    console.log(options)
    if (this.data.listType == 1) {
      this.getExhibitionlist()  //展会列表
      this.setData({
        title: '展会记录'
      })
    } else if (this.data.listType == 2) {
      this.getMeetlist() //会议列表
      this.setData({
        title: '会议记录'
      })
    }

  },
  back: function () {
    wx.navigateBack()
  },
  getExhibitionlist: function () {
    reqpost(app.globalData.bastUrl, '/exhibition/jFindAll', {
      limit: 10,
      start: this.data.exhibitionStart,
      type: 1
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.exhibitionlist.concat(res.data)
        list.forEach(item => {
          item.create = time.formatTimeTwo(item.createTime / 1000, 'M月D h:m');
          item.start = time.formatTimeTwo(item.startTime / 1000, 'Y.M.D ');
          item.end = time.formatTimeTwo(item.endTime / 1000, 'Y.M.D ');
        })
        console.log(list)
        this.setData({
          exhibitionlist: list
        })
      }
    })
  },
  getMeetlist: function () {
    reqpost(app.globalData.bastUrl, '/meet/jFindAll', {
      limit: 10,
      start: this.data.meetStart,
      type: 1
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.meetlist.concat(res.data)
        list.forEach(item => {
          item.create = time.formatTimeTwo(item.createTime / 1000, 'M月D h:m');
          item.start = time.formatTimeTwo(item.startTime / 1000, 'Y.M.D ');
          item.end = time.formatTimeTwo(item.endTime / 1000, 'Y.M.D ');
        })
        console.log(list)
        this.setData({
          meetlist: list
        })
      }
    })
  },
  goMap: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/home/lists-map/lists-map?id=' + id
    })
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/lists-detail/lists-detail?id=' + id + '&listType=' + this.data.listType
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
    if (this.data.listType == 1) {
      this.setData({
        exhibitionStart: this.data.exhibitionStart += 10,
        meetStart: 0
      })
      this.getExhibitionlist()
    } else if (this.data.listType == 2) {
      this.setData({
        meetStart: this.data.exhibitionStart += 10,
        exhibitionStart: 0
      })
      this.getMeetlist()
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})