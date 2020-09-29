//app.js
// data数据不区分大小写
import util from './utils/util.js'
import { wx_login, req } from './utils/api.js'

App({
  onLaunch: function () {
    this.globalData.url = 'https://www.qosoo.cn';
    this.globalData.bastUrl = 'https://www.qosoo.cn/weixin/api/open';

    // 存储手机型号
    // wx.getSystemInfo({
    //   success: (res) => {
    //     this.globalData.systemInfo = res
    //     if (res.model.indexOf('iPhone X') >= 0) {
    //       this.globalData.isIphoneX = true
    //     }
    //     // 判断当前环境，填写baseUrl
    //     this.globalData.bastUrl = res.platform == 'devtools' ? 'https://api.ontheroadstore.com/' : 'https://api.ontheroadstore.com/'
    //   }
    // })

    // this.loginAction();

    // wx.setStorage({
    //   key: "userReg_BOOL",
    //   data: 'yes'
    // })

  }, 
  onShow: function () { },
  onHide: function () { },
  onError: function () { },

  loginAction: function () {
    var that = this;
    wx.login({
      success: function (loginRes) {
        console.log('login:' + JSON.stringify(loginRes));
        if (loginRes) {
          //获取用户信息
          wx.getUserInfo({
            withCredentials: true,//非必填  默认为true
            success: function (infoRes) {
              console.log('初始获取用户信息:' + JSON.stringify(infoRes));
              wx.setStorage({
                key: "userInfo_global",
                data: infoRes.userInfo
              })

              //请求服务端的登录接口

              req(that.globalData.bastUrl, '/wechat/getOpenId', {
                code: loginRes.code,//临时登录凭证
              }, "GET", true).then(res => {
                
                console.log("微信登录后台接口",res);
                wx.setStorage({
                  key: "usercheck",
                  data: res.data.check
                })
                wx.setStorage({
                  key: "userisReg",
                  data: res.data.isReg
                })
                wx.setStorage({
                  key: "open_id",
                  data: res.data.openId
                })
                wx.setStorage({
                  key: "user_id",
                  data: res.data.wechatUserId
                })
                
              })
            }
          });
        } else {
          console.log("111")
        }
      }
    })
  },
  globalData: {
    baseImageUrl: null,
    bastUrl: null,
    isIphoneX: false,
    userInfo: null,
    systemInfo: null,
    authorizationStatus: false,
    //用户信息
    userInfoDic:null
  }
})