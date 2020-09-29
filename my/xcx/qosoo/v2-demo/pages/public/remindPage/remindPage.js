// pages/public/authSucceRemind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindTite: "",
    remindContent: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var remindType ="success";
    this.setData({
      remindType: options.remindType,
    }) 
   
    if (remindType = "success") {
      this.setData({
        remindTite: "请求发送成功",
        remindContent: "您的认证请求已发送给管理员，管理员通过即完成个人认证请耐心等待",
      })
    } else if (remindType = "auther") {
      this.setData({
        remindTite: "认证提交成功",
        remindContent: "您的认证请求已提交成功，平台会对提交的信息进行审核，请耐心等待",
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
    
  },
  popToLastPage:function(){
    wx.navigateBack({ changed: true });
  }
})