//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onReady: function() {
    // console.log(wx.getStorageSync('session_key'));
    // console.log(app.globalData.session_key);
  },

  tz: function() {
    wx.navigateTo({
      url: '../sms/sms',
    })
  },
  getPhoneNumber(e) {
    var _this = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://localhost/xcx/ocr/api.php',
        data: {
          typ: 'getPhone',
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: wx.getStorageSync('session_key'),
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log('succ');
          console.log(res);
        },
        fail(err) {
          console.log('fail'+err);
        },
        complete(com){
          console.log('已完成'+com);
          _this.addPhone(1);
        }
      })
    }
  },

  addPhone:function(id) {
    wx.addPhoneContact({
      photoFilePath: '',
      nickName: 'zang',
      lastName: 'aa',
      middleName: 'apple',
      firstName: 'dand',
      remark: '',
      mobilePhoneNumber: '',
      weChatNumber: '',
      addressCountry: '',
      addressState: '',
      addressCity: '',
      addressStreet: '',
      addressPostalCode: '',
      organization: '',
      title: '',
      workFaxNumber: '',
      workPhoneNumber: '',
      hostNumber: '',
      email: '',
      url: '',
      workAddressCountry: '',
      workAddressState: '',
      workAddressCity: '',
      workAddressStreet: '',
      workAddressPostalCode: '',
      homeFaxNumber: '',
      homePhoneNumber: '',
      homeAddressCountry: '',
      homeAddressState: '',
      homeAddressCity: '',
      homeAddressStreet: '',
      homeAddressPostalCode: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  upload: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        if (tempFilePaths) {
          wx.uploadFile({
            url: 'http://localhost/xcx/ocr/api.php',
            filePath: tempFilePaths[0],
            name: 'businessCard',
            formData: {
              typ: 'scan'
            },
            success: function(res) {
              let data = res.data;
              console.log(JSON.parse(data));

            },
            fail: function(err) {
              console.log(err);
            }
          })
        }
      }
    })

  },

  yinsi: function() {
    wx.navigateTo({
      url: '../privacy/privacy',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})