// pages/userCenter/userInfo/userInfo.js
const app = getApp()
import { req } from '../../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoDataDic:"",
    userName:"",
    userSection:"",
    userDuty:"",
    companyName:"",
    contactInfoTitle_phone:"",
    contactInfoTitle_email:"",
    contactInfoTitle_address:"",
    companyLogoUrl:"",
    userAccount:"",
    phoneNumb:"",
    facsimileNumnb:"",
    webUrl:"",
    wechatNumb:"",
    facebookNumb:"",

    user_token: "",
    user_Id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //var userToken = wx.getStorageSync('TOKEN');
    var user_id = wx.getStorageSync('user_id');

    this.setData({
      //user_token: userToken,
      user_id: user_id,
    })



    // 获取个人信息 
    req(app.globalData.bastUrl, '/user/get', {
      'userId': this.data.user_id,
    }, "GET", true).then(res => {
      console.log(res.data);
      Object.keys(res.data).forEach(function (key) {
        if (res.data[key] == null) {
          res.data[key] = "";
        }
        console.log(key, res.data[key]);

      });
      if(res.data.mobile.split(",").length>0){
        res.data.mobile = res.data.mobile.split(",")
      }
      if(res.data.fax != null){
        if (res.data.fax.split(",").length > 0) {
          res.data.fax = res.data.fax.split(",")
        }
      }
      
      this.setData({
        userInfoDataDic: res.data,
      })
    })
  },
  //去编辑
  pushToEdit:function(){
    var user_account = JSON.stringify(this.data.userInfoDataDic);

    wx.navigateTo({
      url: '/pages/userCenter/userInfo/userInfoEdit?account='+user_account
    })
  }
})