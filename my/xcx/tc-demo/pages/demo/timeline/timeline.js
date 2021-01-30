// pages/demo/timeline/timeline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphone_bottom: 34,
    // 快递公司
    CourierCompany: {
      name: '韵达快递',
      courierLogo: '../../../images/cart.png',
      phone: 95566,
    },
    // 物流单号
    logisticsId: '9556656235556465',
    // 物流信息
    logisticsInfo: [{
        data: '05.20',
        time: '12:23',
        status: '检验项目',
        address: "【绍兴市】已离开 浙江省诸暨市公司；发往 浙江省诸暨市山下湖分部",
      },
      {
        data: '05.20',
        time: '10:23',
        status: '',
        address: "杭州转运中心已收入",
      },
      {
        data: '05.20',
        time: '05:23',
        status: '',
        address: "杭州转运中心公司 已发出；下一站：杭州转运中心",
      },
      {
        data: '05.19',
        time: '21:23',
        status: '',
        address: "深圳转运公司 已发出，下一站，杭州转运中心公司",
      }
    ],
    // 物流当前的状态
    currentStatus: '运输中'
  },

  onImageLoad(e) {
    console.log(e);

  },
  onImageError(e) {
    console.log(e);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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