//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    indicatorColor: 'rgba(255,255,255,0.3)',
    indicatorActiveColor: '#fff',
    category: [],
    goods: [],

    toView: 'inToView01',
  },

  scrollToViewFn: function(e) {
    // console.log(e);
    var _id = e.currentTarget.dataset.id;
    this.setData({
      toView: 'inToView' + _id
    })
  },

  onLoad: function() {
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId\
        if (res.code) {
          wx.request({
            //获取openid接口
            url: `${app.globalData.url}/api.php`,
            data: {
              code: res.code,
              typ: 'getopenid'
            },
            success: function(res) {
              console.log(res);
              if (res.data) {
                app.globalData.uid = res.data.uid;
                app.globalData.openid = res.data.openid;
                app.globalData.idx = res.data.idx;
              } else {
                console.log('没有获取到openID');
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // wx.request({
    //   url: `${app.globalData.url}/api.php`,
    //   data: {
    //     typ: 'index'
    //   },
    //   success: function(res) {
    //     that.setData({
    //       banner: res.data.banner,
    //       category: res.data.category,
    //       goods: res.data.goods
    //     })

    //   }
    // })

    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {

        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 360;
        that.setData({
          winHeight: calc
        });
      }
    });

  },


})