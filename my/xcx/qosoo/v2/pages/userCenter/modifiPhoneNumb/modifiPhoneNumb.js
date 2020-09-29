// pages/userCenter/modifiPhoneNumb/modifiPhoneNumb.js
const app = getApp()
import { req } from '../../../utils/api.js'
import { reqpost } from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_token: "",
    user_Id: "",

    oldPhoneNumb:"",
    newPhoneNumb:"",
    authCodeNumb:"",
    time: "获取验证码",
    currentTime: 60
  },

  /**
   * 生命周期函数--监听页面加载USER_PHONE
   */
  onLoad: function (options) {
    var _this = this;
    var userToken = wx.getStorageSync('TOKEN');
    var user_id = wx.getStorageSync('user_id');
    console.log('options', options)
    if (options.userPhone.split(",").length>0){
      options.userPhone = options.userPhone.split(",")[0]
    }
    _this.setData({
      oldPhoneNumb: options.userPhone,
      //user_token: userToken,
      user_id: user_id,
    })

  },
  handleGoBack: function () {
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
  //获取新手机号码
  newPhoneNumbInput: function (e) {
    this.setData({
      newPhoneNumb: e.detail.value,
    })
    console.log('输入新手机号码为', e.detail.value)
  },
  //获取验证码
  authCodeInput: function (e) {
    this.setData({
      authCodeNumb: e.detail.value,
    })
    console.log('输入获取验证码为', e.detail.value)
  },
  getCode: function () {
    var that = this;
    var currentTime = that.data.currentTime;
    var interval

    req(app.globalData.bastUrl, '/sms/modifyMobile', {
      'mobile': this.data.newPhoneNumb,
      
    }, "GET", true).then(res => {
      
      if (res.success) {
        console.log(currentTime)
        that.setData({
          time: currentTime + '秒',
          disabled: 'true',
        })
        interval = setInterval(function () {
          console.log(currentTime)
          that.setData({
            time: (currentTime - 1) + '秒'
          })
          currentTime--;
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新获取',
              currentTime: 60,
              disabled: false
            })
          }
        }, 1000)
      }

    })
  },
  modifyAction:function(){
    

    console.log("修改手机号码参数：" + "ID" + this.data.user_id + "oldPhone" + this.data.oldPhoneNumb + "newPhone" + this.data.newPhoneNumb);

    reqpost(app.globalData.url, '/weixin/api/accept/user/modifyMobile', {
      'smsCode': this.data.authCodeNumb,
      'mobile': this.data.newPhoneNumb,
    }, "POST", true).then(res => {
      console.log('修改手机号结果' + JSON.stringify(res));
      if (res.success) {
        wx.showToast({
          title: '修改成功！',
          // icon: 'none',
          duration: 1500,
          success: function () {
          }
        })
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];     //获取上一个页面
        var str = 'userAccount.account'
        prevPage.setData({                                      //修改上一个页面的变量
          [str]: this.data.newPhoneNumb
        })
        setTimeout(function () {
          wx.navigateBack({//返回
            delta: 1
          })
        }, 1000);
      } 
    })
  }

})