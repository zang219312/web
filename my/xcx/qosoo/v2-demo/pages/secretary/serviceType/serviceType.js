// pages/secretary/serviceType/serviceType.js
// pages/secretary/secretary.js
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceList: [],
    activeType:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clipboard: function (e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    console.log(phoneNumb)
    wx.setClipboardData({
      data: phoneNumb, //此号并非真实电话号码，仅用于测试
      success: function () {
        console.log("复制成功")
        wx.showToast({
          title: "微信号码已复制",
          duration: 3000
        })
      },
      fail: function () {

      }
    })
  },
  callMeAction: function (e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    console.log(phoneNumb)
    wx.makePhoneCall({
      phoneNumber: phoneNumb, //此号并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  getService: function (e) {
    var type = e.currentTarget.dataset.type
    var lists = this.data.serviceList
    lists.forEach(item => {
      if (type == item.type) {
        this.setData({
          serviceInfo: item,
          isShow: true,
        })
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    reqpost(app.globalData.bastUrl, '/qosoo/service', {
    }, "post", true).then(res => {
      if (res.success) {
        
        this.setData({
          serviceList: res.data,
          serviceInfo:res.data[0]
        })
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