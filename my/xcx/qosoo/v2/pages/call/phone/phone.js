// pages/call/phone/phone.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
const config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    money: '免费电话',
    realname: '',
    isLogin: false,
    popup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var str = '';
    if (options.mobile) {
      if (options.mobile.indexOf('-') > -1) {
        str = options.mobile.replace('-', '');
      } else {
        str = this.getMoblieFormat(options.mobile)
      }
    }

    console.log('a'); //   

    this.setData({
      mobile: str,
      realname: options.realname || ''
    })
    var that = this;

    if (options.msg && options.callStatus && options.latitude && options.longitude && options.money) {
      that.setData({
        msg: options.msg,
        callStatus: options.callStatus,
        latitude: options.latitude,
        longitude: options.longitude,
        money: options.money,
      })
    } else {
      // 余额说明
      reqpost(app.globalData.url, '/weixin/api/open/call/jBalance', {}, "post", true).then(res => {
        if (res.success) {
          this.setData({
            money: res.data.money
          })
        }
      })

      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          console.log('location', res)
          let latitude = res.latitude
          let longitude = res.longitude
          // wx.request({
          //   url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          //   success: res => {
          //     console.log(res);
          //     that.setData({
          //       city: res.data.result.ad_info.city,
          //     })
          //   }
          // })
          that.setData({
            latitude: latitude,
            longitude: longitude
          })
        }
      })


      let callStatus;
      reqpost(app.globalData.url, '/weixin/api/open/call/jValid', {
        callee: wx.getStorageSync('myPhone')
      }, "post", true).then(res => {
        console.log('aaa');
        console.log(res);
        if (res.code == 1000 || res.code == 1002) {
          callStatus = 1000;
        } else if (res.code == 1001) {
          callStatus = 1001;
        } else if (res.code == 2000) {
          callStatus = 2000;
        } else {
          callStatus = 1111;
        }
        that.setData({
          callStatus: callStatus,
          msg: res.data
        })
      })
    }

  },

  getMoblieFormat: function(mobile) {
    var value = mobile;
    console.log(mobile);
    value = mobile.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
      if (i == 3 || i == 7) {
        // console.log(value.charAt(i));
        result.push(" " + value.charAt(i));

      } else {
        result.push(value.charAt(i));
      }
    }
    value = result.join("");
    return value

  },
  zhantie: function() {
    var _this = this
    wx.getClipboardData({
      success(res) {
        var txt = res.data
        console.log(res.data)
        if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(txt))) {
          var num = _this.getMoblieFormat(txt)
          _this.setData({
            mobile: num
          })
        } else {
          wx.showToast({
            title: '请先复制手机号码',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
    })
  },
  phoneNUm: function(e) {
    console.log(this);
    var num = e.currentTarget.dataset.num
    var mobile = this.data.mobile;


    if (mobile.length < 13) {
      mobile += num
      var nums = this.getMoblieFormat(mobile)
      let mb = this.options.mobile ? this.getMoblieFormat(this.options.mobile) : '';

      this.setData({
        mobile: nums,
        realname: nums == mb ? this.options.realname : ''
      })
      console.log(typeof mobile);
    }
  },

  del: function() {
    var mobile = this.data.mobile;
    mobile = mobile.substring(0, mobile.length - 1);
    this.setData({
      mobile: mobile,
      realname: ''
    })
  },
  goVip: function() {
    wx.navigateTo({
      url: '/pages/call/vip',
    })
  },

  goHistory: function() {
    wx.redirectTo({
      url: '/pages/call/phone-history/phone-history',
    })
  },
  getLogin() {

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
  toTel(e) {
    //let url = '/pages/call/phone-wait/phone-wait';
    let url = '/pages/call/vip';

    if (e.currentTarget.dataset.click == 'comfirm') {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.mobile.replace(/\s*/g, ""),
      })
      this.hidePopup();
    }
  },

  call: function() {
  var  that =this;
    var mobile = this.data.mobile.replace(/\s*/g, "");
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
      wx.showToast({
        title: '请输入正确的11位手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    switch (that.data.callStatus) {
      case 1000:
        that.showMsg1();
        break;
      case 1001:
        that.showMsg2();
        break;
      case 2000:
        that.showMsg3();
        break;
      case 1111:

        wx.request({
          url: app.globalData.url + '/weixin/api/accept/call/jCall', //仅为示例，并非真实的接口地址
          data: {
            callee: mobile,
            token: wx.getStorageSync('TOKEN'),
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log('ccccc');
            console.log(res);
            if (res.data.success) {
              wx.redirectTo({
                url: '/pages/call/phone-wait/phone-wait?called=1',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.data,
                confirmColor: '#FA6D21',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    wx.makePhoneCall({
                      phoneNumber: mobile //仅为示例，并非真实的电话号码
                    })
                  }
                }
              })
            }
          }
        })

    }


    // reqpost(app.globalData.url, '/weixin/api/open/call/jValid', {
    //   callee: mobile
    // }, "post", true).then(res => {
    //   console.log('aaa');
    //   console.log(res);
    //   if (res.code == 1000 || res.code == 1002) {
    //     wx.showModal({
    //       title: '提示',
    //       content: res.data,
    //       confirmColor: '#FA6D21',
    //       showCancel: false,
    //       success: function(res) {
    //         if (res.confirm) {
    //           wx.navigateTo({
    //             url: '/pages/call/vip',
    //           })

    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })
    //   } else if (res.code == 1001) {
    //     wx.showModal({
    //       title: '提示',
    //       content: res.data,
    //       confirmColor: '#FA6D21',
    //       confirmText: '申请权益',
    //       cancelText: '手机拨打',
    //       cancelColor: '#FA6D21',
    //       success: function(res) {

    //         console.log('bbb');
    //         console.log(res);
    //         if (res.confirm) {
    //           wx.navigateTo({
    //             url: '/pages/call/vip',
    //           })

    //         } else if (res.cancel) {
    //           wx.makePhoneCall({
    //             phoneNumber: mobile //仅为示例，并非真实的电话号码
    //           })
    //         }
    //       }
    //     })
    //   } else if (res.code == 2000) {
    //     wx.showToast({
    //       title: res.data,
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   } else {
    //   }
    // })
  },
  showMsg1() {
    wx.showModal({
      title: '提示',
      content: this.data.msg,
      confirmColor: '#FA6D21',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/call/vip',
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showMsg2() {
    wx.showModal({
      title: '提示',
      content: this.data.msg,
      confirmColor: '#FA6D21',
      confirmText: '申请权益',
      cancelText: '手机拨打',
      cancelColor: '#FA6D21',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/call/vip',
          })
        } else if (res.cancel) {
          wx.makePhoneCall({
            phoneNumber: mobile //仅为示例，并非真实的电话号码
          })
        }
      }
    })
  },
  showMsg3() {
    wx.showToast({
      title: res.data,
      icon: 'none',
      duration: 2000
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.hidePopup();
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