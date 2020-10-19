// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  go(e) {
    let obj = {
      id: 123465798,
      name: 'sdfsfs',
      packageId: 1232146735441,
      orderNo: 1324234687682313468,
      "errMsg": "getSystemInfo:ok",
      "model": "iPhone X",
      "pixelRatio": 3,
      "windowWidth": 375,
      "windowHeight": 724,
      "system": "iOS 10.0.1",
      "language": "zh_CN",
      "version": "7.0.4",
      "screenWidth": 375,
      "screenHeight": 812,
      "SDKVersion": "2.13.0",
      "brand": "devtools",
      "fontSizeSetting": 16,
      "benchmarkLevel": 1,
      "batteryLevel": 100,
      "statusBarHeight": 44,
      "safeArea": {
        "right": 375,
        "bottom": 812,
        "left": 0,
        "top": 44,
        "width": 375,
        "height": 768
      },
      "deviceOrientation": "portrait",
      "platform": "devtools",
      "devicePixelRatio": 3
    }
    let str = JSON.stringify(obj)

    //  encodeURIComponent(str)
    console.log(obj); 
    let id = e.currentTarget.dataset.id;
    const actions = new Map([
      ["1",['城市选择','../demo/city/city']],
      ["2",['购物车动画','../demo/fly/fly']],
      ["3",['三级联动','../demo/picker/picker']],
      ["4",['参数','../demo/qrcode/qrcode']],
      ["5",['抽屉栏','../demo/slide/slide']],
      ["default", ['other','index']]
    ])
    let action = actions.get(id) || actions.get('default')

    wx.navigateTo({
      url:action[1],
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

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

    }
  }
})