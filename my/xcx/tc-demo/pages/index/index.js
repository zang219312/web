// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  go(e){
    console.log();
    if(e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '../demo/picker/picker',
      })
    }else if(e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '../demo/fly/fly',
      })
    }else {
      wx.navigateTo({
        url: '../demo/city/city',

      })
    }
    
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