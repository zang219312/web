// pages/call/lotto/lotto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: true,
    couponList: [{
      id: '1',
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_left.png',
      title: ''
    }, {
      id: '2',
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_center.png',
      title: ''
    }, {
      id: '3',
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_right.png',
      title: ''
    }],
    phoneCradList: [{
        id: '1',
        imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/phone_card_100.png',
        type: 'phone_card',
        text: '优惠券兑换'
      },
      {
        id: '2',
        imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/phone_card_600.png',
        type: 'phone_card',
        text: '优惠券兑换'
      }, {
        id: '3',
        imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/phone_card_1200.png',
        type: 'phone_card',
        text: '优惠券兑换'
      }
    ],
    coupon: [{
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_twenty.png'
    }, {
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_eighty.png'
    }, {
      imgurl: 'https://file.qosoo.cn/files/20191122/redPacket/coupon_hundred.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getTheDiscount() {

    this.showPopup();
  },
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    console.log('hidden');
    this.setData({
      popup: flag,
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
  },
  handleGoBack: function() {
    let pages = getCurrentPages();
    if (pages.length > 2) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/home/home',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    wx.updateShareMenu({
      withShareTicket: true,
      success(res) {
        console.log(res);
      }
    })
  }
})