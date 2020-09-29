// pages/userCenter/userInfo/index.js
const app = getApp()
import { req } from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCenterInfo: "",
    userAvatarUrl: "",  // 用户头像

    userPhoneStr: "",


    USER_ID: "",//用户ID
    // userNameLabel: "托尼斯达克",
    // userAuthType: 1,
    // userProfessionLabel: "项目经理",
    // userCompanyLabel: "上海创意集团江盟金融哟有限公司啊啊啊啊",
    userCompanyAuthStatus: "已认证",
    coverViewStatus: "none",

    userCompanyAuthStatus: "N",
    userCompanyAuthStatusBGColor: "",
    userAuthStatusImgPath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //拿到存储的userInfo
    wx.getStorage({
      key: 'userInfo_global',
      success: function (res) {
        console.log("拿到存储的用户信息" + JSON.stringify(res.data));
        that.setData({
          userAvatarUrl: res.data.avatarUrl
        })
      }
    });

    var USER_IDStr = wx.getStorageSync('user_id')
    //var userToken = wx.getStorageSync('TOKEN');
    console.log("用户id是：" + USER_IDStr);

    that.setData({
      USER_ID: USER_IDStr,
      //user_token: userToken,
    })


    // 获取用户信息 
    req(app.globalData.bastUrl, '/user/get', {
      'userId': this.data.USER_ID,
    }, "GET", true).then(res => {
      console.log(res);
      Object.keys(res.data).forEach(function (key) {
        if (res.data[key] == null) {
          res.data[key] = "";
        }
        console.log(key, res.data[key]);

      });
      that.setData({
        userCenterInfo: res.data,
        userPhoneStr: res.data.mobile,
      })

      req(app.globalData.bastUrl, '/company/getCertified', {
        'id': res.data.companyId,
      }, "GET", true).then(data => {
        console.log(data);
        if (data.data.certified == 1) {
          this.setData({
            userCompanyAuthStatus: "已认证",
            userCompanyAuthStatusBGColor: "background-color: #ff6f05;color:#fff;",
          })
        } else if (data.data.certified == 0) {

          this.setData({
            userCompanyAuthStatus: "未认证",
            userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
          })
        } else if (data.data.certified == 2) {
          this.setData({
            userCompanyAuthStatus: "审核中",
            userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
          })
        }

      })

      if (this.data.userCenterInfo.personCertified == "1") {
        this.setData({
          userAuthStatusImgPath: "/images/userCenter/userAuthType_1@3x.png",
        })
      } else {
        this.setData({
          userAuthStatusImgPath: "/images/userCenter/userAuthType_0@3x.png",
        })
      }

    })
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