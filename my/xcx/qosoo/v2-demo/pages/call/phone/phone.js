// pages/call/phone/phone.js
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mobile:'',
      money:'免费电话'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var mobile = options.mobile
    var num = this.getMoblieFormat(mobile)
      this.setData({
        mobile: num
      })

    // reqpost(app.globalData.url, '/weixin/api/accept/call/jBalance', {
    // }, "post", true).then(res => {
    //   if(res.success){
    //     this.setData({
    //       money:res.data.money 
    //     })
    //   }

    // })
  },
  getMoblieFormat: function (mobile) {
    var value = mobile;
    value = value.replace(/\s*/g, "");
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
  zhantie:function(){
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
        } else{
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
  phoneNUm:function(e){
    var num = e.currentTarget.dataset.num
    var mobile = this.data.mobile
    if(mobile.length<13){
      mobile+=num
      var nums = this.getMoblieFormat(mobile)
      this.setData({
        mobile: nums
      })
    }
  },
  del:function(){
    var mobile = this.data.mobile;
    mobile = mobile.substring(0, mobile.length - 1);  
    this.setData({
      mobile: mobile
    })
  },
  goVip:function(){
    wx.navigateTo({
      url: '/pages/call/vip',
    })
  },
  goHistory: function () {
    wx.navigateTo({
      url: '/pages/call/phone-history/phone-history',
    })
  }, 
  call:function(){
    var mobile = this.data.mobile.replace(/\s*/g, "");

    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
      wx.showToast({
        title:'请输入正确的11位手机号码',
        icon: 'none',
        duration: 2000
      })
      return
    } 

    reqpost(app.globalData.url, '/weixin/api/open/call/jValid', {
      callee: mobile
    }, "post", true).then(res => {
      // if (res.success) {
      //   wx.navigateTo({
      //     url: '/pages/call/phone-wait/phone-wait',
      //   })
      // }
      if (res.code == 1000 || res.code == 1002){
        wx.showModal({
          title: '提示',
          content: res.data,
          confirmColor:'#FA6D21',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/call/vip',
              })
              
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else if(res.code == 1001){
          wx.showModal({
            title: '提示',
            content: res.data,
            confirmColor: '#FA6D21',
            confirmText:'申请权益',
            cancelText:'手机拨打',
            cancelColor:'#FA6D21',
            success: function (res) {
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
      }else if(res.code == 2000){
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.request({
          url: app.globalData.url+ '/weixin/api/accept/call/jCall', //仅为示例，并非真实的接口地址
          data: {
            callee: mobile,
            token: wx.getStorageSync('TOKEN')
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            if (res.data.success) {
              wx.navigateTo({
                url: '/pages/call/phone-wait/phone-wait',
              })
            }else{
              wx.showModal({
                title: '提示',
                content: res.data.data,
                confirmColor: '#FA6D21',
                showCancel: false,
                success: function (res) {
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
        // reqpost(app.globalData.url, '/weixin/api/accept/call/jCall', {
        //     callee: mobile
        //   }, "post", true).then(res => {
        //     if (res.success) {
        //       wx.navigateTo({
        //         url: '/pages/call/phone-wait/phone-wait',
        //       })
        //     }else{
        //       wx.showModal({
        //         title: '提示',
        //         content: res.data,
        //         confirmColor: '#FA6D21',
        //         showCancel: false,
        //         success: function (res) {
        //           if (res.confirm) {
        //             wx.makePhoneCall({
        //               phoneNumber: mobile //仅为示例，并非真实的电话号码
        //             })

        //           } 
        //         }
        //       })
        //     }
        // })
      }

    })

    // reqpost(app.globalData.url, '/weixin/api/accept/call/jCall', {
    //   callee: mobile
    // }, "post", true).then(res => {
    //   if (res.success) {
    //     wx.navigateTo({
    //       url: '/pages/call/phone-wait/phone-wait',
    //     })
    //   }

    // })

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
    reqpost(app.globalData.url, '/weixin/api/open/call/jBalance', {
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          money: res.data.money
        })
      }

    })
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