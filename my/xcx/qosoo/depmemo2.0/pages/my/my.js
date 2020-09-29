// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderList: [],
    winHeight: 0,
    dat_a: [{
        img: '../../images/logo1.png'
      },
      {
        img: '../../images/logo2.png'
      },
      {
        img: '../../images/logo3.png'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: "my",
        uid: app.globalData.uid,
      },
      success: function(res) {
        console.log(res);
        that.setData({
          dat_a: res.data,
          dat_b: res.data.list
        })
      }
    })

  },
  order: function(e) {


    var currentTarget = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '../order/order?current=' + currentTarget,
    })
  },

  tz: function(e) {

    let the_category = e.currentTarget.dataset.the_category;
      let com = e.currentTarget.dataset.com;
    let str={
        the_category : e.currentTarget.dataset.the_category,
        imgurl : e.currentTarget.dataset.imgurl,
        spid : e.currentTarget.dataset.spid,
        quantity_p : e.currentTarget.dataset.quantity_p,
        quantity_v : e.currentTarget.dataset.quantity_v,
        scid : e.currentTarget.dataset.scid,
        title : e.currentTarget.dataset.tit,
        price : e.currentTarget.dataset.price,
        num : e.currentTarget.dataset.num,
        com : e.currentTarget.dataset.com,
    };
    let STR=JSON.stringify(str);

    if (com == 0) {
      switch (the_category) {
        case "pic":
          wx.navigateTo({
            url: '../upImg/upImg?str='+STR
          })
          break;

        case "video":
          wx.navigateTo({
            url: '../video/video?str='+STR
          })
          break;

        case "pav":
          wx.navigateTo({
            url: '../pav/pav?str=' +STR
          })
          break;

        case "jiesuan":

          break;
      }
    } else if (com == 1) {
      wx.navigateTo({
        url: '../sucai/sucai?scid=' +e.currentTarget.dataset.scid + '&orderid=' + e.currentTarget.dataset.orderid + '&tit=' + e.currentTarget.dataset.tit,
      })
    }

  },

  chakan: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../sucai/sucai?scid=' + e.currentTarget.dataset.scid + '&orderid=' + e.currentTarget.dataset.oid + '&tit=' + e.currentTarget.dataset.tit,
    })
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

  }
})