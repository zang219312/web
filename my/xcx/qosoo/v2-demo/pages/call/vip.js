// pages/call/vip.js
const app = getApp()
import { req, reqpost } from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    payData:'',
    bannerImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

    // }, "post", true).then(res => {
    //   if (res.success) {
    //     this.setData({
    //       cardInfo:res.data
    //     })
    //     this.getCompany()
    //   }
    // })

    // 获取banner图片
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 4
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerImg: res.data[0].url,
        })
      }
    })


    reqpost(app.globalData.url, '/weixin/api/open/call/jCards', {
    }, "post", true).then(res => {
      if (res.success) {
        _this.setData({
          lists:res.data
        })
      }
    })
  },
  buyVip:function(e){
    var id = e.currentTarget.dataset.id
    var _this = this
    reqpost(app.globalData.url, '/weixin/api/accept/wxPay/getJsPaySign', {
      cardId:id
    }, "post", true).then(res => {
      if (res.success) {
        var prepayId = res.data.prepayId
        this.setData({
          payData:res.data
        })
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) { 
            _this.pay(prepayId)
          },
          fail(res) {
            _this.pay(prepayId)
           }
        })
      }

    })
  },
  pay:function(id){
    console.log(id)
    reqpost(app.globalData.url, '/weixin/api/accept/wxPay/callback', {
      prepayId: id
    }, "post", true).then(res => {
      if (res.success) {
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