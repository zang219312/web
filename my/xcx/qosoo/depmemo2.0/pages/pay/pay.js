// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],

    add_show: "none",
    main_show: "block",
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    add: "",
    tel: "",
    nam: "",
    yf: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    console.log(that);
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        "typ": "pay_init",
        "dat": options.dat,
        "uid": app.globalData.uid
      }, //e.det(商品id,数目，规格) 
      success: function(res) {
        console.log(res)
        that.setData({
          total: Math.round(res.data.total * 100) / 100,
          nam: res.data.name,
          tel: res.data.tel,
          add: res.data.add,
          orderid: res.data.orderid,
          arr: res.data.arr,
          count: res.data.count

        })
      }
    })


  },

  add: function() {
    console.log('上传照片');

  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 验证地址
   */

  validatemobile: function(mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    return true;
  },

  /**
   * 修改地址
   */
  viewAddress: function(e) {
    this.setData({
      add_show: "block",
      main_show: "none"
    })
  },
  _dat_nam: function(e) {
    this.setData({
      "nam": e.detail.value
    })
  },
  _dat_tel: function(e) {
    this.setData({
      "tel": e.detail.value
    })
  },
  _dat_add: function(e) {
    this.setData({
      "add": e.detail.value
    })
  },
  change_add: function(e) {
    var that = this
    if (that.validatemobile(that.data.tel)) {
      this.setData({
        add_show: "none",
        main_show: "block"
      })
    }
  },

  pay: function() {
    var that = this;
    if (that.data.add == "") {
      wx.showToast({
        title: '完善收货地址',
        icon: 'loading',
        duration: 500
      })

    } else {
      wx.request({
        url: `${app.globalData.url}/api.php`,
        data: {
          typ: 'pay',
          orderid: that.data.orderid,
          name: that.data.nam,
          tel: that.data.tel,
          add: that.data.add,
          uid: app.globalData.uid,
        },
        success: function(pay) {
          console.log('aa');
          console.log(pay);
          wx.requestPayment({
            timeStamp: pay.data[0].timeStamp,
            nonceStr: pay.data[0].nonceStr,
            package: pay.data[0].package,
            signType: 'MD5',
            paySign: pay.data[0].paySign,
            'success': function(success_res) { //加入订单表做记录
              wx.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 1000
              })
              // wx.request({
              //   url: `${app.globalData.url}/api.php`,
              //   data: {
              //     typ: 'pay_t',
              //     orderid: that.data.orderid,
              //     uid: app.globalData.uid,
              //     out_trade_no: pay.data.out_trade_no
              //   },
              //   success: function(aaa) {
              //     //订单id

              //   }
              // })
              setTimeout(function() {
                wx.reLaunch({
                  url: '../PAD/PAD?orderid=' + that.data.orderid,
                })
              }, 1000)
            },
            'fail': function(fail_res) {
              wx.showToast({
                title: '您已取消支付',
                icon: 'loading',
                duration: 1000
              })
              // wx.request({
              //   url: `${app.globalData.url}/api.php`,
              //   data: {
              //     typ: 'pay_f',
              //     orderid: that.data.orderid,
              //     uid: app.globalData.uid,
              //     out_trade_no: pay.data.out_trade_no
              //   },
              //   success: function(aaa) {
              //     console.log(aaa);
              //   }
              // })
              setTimeout(function() {
                wx.reLaunch({
                  url: '../my/my',
                })
              }, 1000)
            }
          })


        }
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
    var that = this
    console.log('onshow');
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              wx.chooseAddress({
                success: function(res2) {
                  console.log(res2);
                  var add = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
                  that.setData({
                    add: res2.detailInfo,
                    region: [res2.provinceName, res2.cityName, res2.countyName],
                    nam: res2.userName,
                    tel: res2.telNumber,
                  })
                },
                fail: function(f) {
                  console.log('f');
                },
                complete: function(co) {
                  console.log('co');
                }
              })
            },
          })
        }
      }

    })
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