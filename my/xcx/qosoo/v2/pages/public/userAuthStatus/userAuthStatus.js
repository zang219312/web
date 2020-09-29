// pages/public/userAuthStatus/userAuthStatus.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyShare: "",
    caseShare: "",
    QRCodeShare: "",
    product_id: "",
    company_id: "",
  },

  onLoad: function(options) {
    console.log(options);
    if (options.companyShare) {
      this.setData({
        companyShare: options.companyShare
      })
    }

    if (options.companyShareShare) {
      this.setData({
        companyShareShare: options.companyShareShare
      })
    }
    if (options.caseShare) {
      this.setData({
        caseShare: options.caseShare,
        company_id: options.company_id,
        type: options.type
      })
    }
    if (options.QRCodeShare) {
      this.setData({
        QRCodeShare: options.QRCodeShare
      })
    }
    if (options.product_id) {
      this.setData({
        product_id: options.product_id
      })
    }
    if (options.company_id && options.company_id != undefined) {
      this.setData({
        company_id: options.company_id
      })
    }
    if (options.key) {
      this.setData({
        key: options.key
      })
    }
  },
  handleGoBack: function() {
    let pages = getCurrentPages();
    console.log(pages);
    if (pages.length > 2) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/home/home',
        success(){},
        fail(err){console.log(err);}
      })
    }
  },

  cancleAction: function() {

  },
  getPhoneNumber: function() {
    console.log(1)
  },
  okAction: function() {

    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(JSON.stringify(res));
    //       that.setData({

    //       })
    //     wx.navigateTo({
    //       url: '/pages/home/home/home'
    //     })
    //   },
    // })
  },


  //绑定授权按钮
  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
      console.log('用户点击了授权按钮')

      this.login();

    } else {
      console.log('用户点击了取消按钮')
    }
  },
  back: function() {
    if (wx.getStorageSync('formUrl') == 'pages/secretary/secretary') {
      wx.redirectTo({
        url: '/pages/home/home/home'
      })
      return
    }
    wx.navigateBack({
      delta: 1
    })
  },
  login: function(callback) {
    let that = this;
    wx.login({
      success: function(loginRes) {
        console.log('wx：login:' + JSON.stringify(loginRes));
        // if(!that.options.subInfo){
          // wx.navigateTo({
          //   url: '/pages/home/applyForRegistration/applyForRegistration?source=' + that.options.source +'&subInfo=' + that.options.subInfo,
          // })
          // return;
        // }
        
      //  console.log('11');
        if (loginRes) {

          //获取用户信息
          wx.getUserInfo({
            withCredentials: true, //非必填  默认为true
            success: function(infoRes) {
              // console.log('授权获取用户信息:' + JSON.stringify(infoRes));
              //console.log(infoRes.userInfo)
              wx.setStorageSync("userInfo_global", infoRes.userInfo)

              //请求服务端的登录接口
              //console.log(loginRes.code);
              // wx.setStorageSync('wxCode', loginRes.code)
              wx.request({
                url: app.globalData.bastUrl + '/user/jFindByCode', //仅为示例，并非真实的接口地址
                data: {
                  code: loginRes.code,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res);

                  if (res.data.success) {
                    wx.setStorageSync('TOKEN', res.data.data.token)
                    wx.setStorageSync('myPhone', res.data.data.account); 
                    reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

                    }, "post", true).then(res => {
                      console.log(res);
                      if (res.success) {
                        wx.setStorageSync('mycompanyId', res.data.companyId || 0)
                        // this.getCompanyInfo()

                        var urls = wx.getStorageSync('formUrl')
                        console.log(urls);
                        if (urls != 'undefined') {
                          wx.removeStorageSync('formUrl')
                          wx.redirectTo({
                            url: '/' + urls
                          })
                        } else {
                          wx.redirectTo({
                            url: '/pages/home/home/home'
                          })
                        }
                      }
                    })
                  } else {
                    wx.showToast({
                      title: res.data.data,
                      icon: 'none',
                      duration: 1000
                    })
                    console.log(that);
                    if (that.options.source == 'apply') {
                      wx.navigateTo({
                        url: '/pages/home/applyForRegistration/applyForRegistration?source=' + that.options.source + '&subInfo=' + that.options.subInfo,
                      })
                    } else if (that.options.source == 'regi') {
                      wx.navigateTo({
                        url: '/pages/home/applyForRegistration/applyForRegistration?source=' + that.options.source + '&subInfo=' + that.options.subInfo,
                      })
                    } else {
                      wx.navigateTo({
                        url: '/pages/userCenter/registration/registration'
                      })
                    }

                    // that.registr()
                  }
                }
              })


            }
          });
        } else {

        }
      }
    })
  },
  registr: function() {
    var userInfo = wx.getStorageSync("userInfo_global")
    wx.login({
      success: function(loginRes) {
        console.log('wx：login:' + JSON.stringify(loginRes));
        if (loginRes) {
          wx.request({
            url: app.globalData.url + '/weixin/api/open/user/simpleRegister', //仅为示例，并非真实的接口地址
            data: {
              code: loginRes.code,
              headimgurl: userInfo.avatarUrl,
              nickname: userInfo.nickName
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              if (res.data.success) {
                wx.setStorageSync('TOKEN', res.data.data.token)
                var urls = wx.getStorageSync('formUrl')
                if (urls != 'undefined') {
                  wx.removeStorageSync('formUrl')
                  wx.redirectTo({
                    url: '/' + urls
                  })

                } else {
                  wx.redirectTo({
                    url: '/pages/home/home/home'
                  })
                }
              } else {
                wx.showToast({
                  title: '失败',
                  icon: 'none',
                  duration: 2000
                })
              }

            }

          })
        }
      }
    })
  }


})