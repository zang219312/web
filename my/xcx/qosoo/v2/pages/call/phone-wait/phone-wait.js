// pages/call/phone-wait/phone-wait.js
var interval
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.vibrateLong()
    setTimeout(function() {
      wx.vibrateLong({
        success: function() {
          setTimeout(function() {
            wx.vibrateLong({
              success: function() {
                setTimeout(function() {
                  wx.vibrateLong();
                }, 1000)
              }
            })
          }, 1000)
        }
      })
    }, 1000)

    setTimeout(function() {
      wx.redirectTo({
        url: '/pages/call/phone-history/phone-history?called=' + options.called,
      })
    }, 4000)

    // var time = 2
    // interval = setInterval(function () {
    //   wx.vibrateLong()
    //   time--;
    //   console.log(time)
    //   if (time <= 0) {
    //     console.log('jin')
    //     clearInterval(interval)

    //   }
    // }, 1000)

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
    clearTimeout()
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

  }
})