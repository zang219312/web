const app = getApp()
import { req } from '../../../utils/api.js'
import { reqpost } from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCenterInfo:"",
    userAvatarUrl: "",  // 用户头像

    userPhoneStr:"",


    USER_ID:"",//用户ID
    // userNameLabel: "托尼斯达克",
    // userAuthType: 1,
    // userProfessionLabel: "项目经理",
    // userCompanyLabel: "上海创意集团江盟金融哟有限公司啊啊啊啊",
    userCompanyAuthStatus: "已认证",
    coverViewStatus:"none",
    
    userCompanyAuthStatus:"N",
    userCompanyAuthStatusBGColor:"",
    userAuthStatusImgPath:"",
    display_mobile: true,
    display_wechat: true,
    display_facebook: true,
    display_website: true,
    display_fax: true,
    display_tax: true,
    showCard:false,

  },

  /**
   * 生命周期函数--监听页面加载
   * *         

   */
  onLoad: function (options) {

    var that = this;
    console.log("on load");
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
    console.log("用户1id是：" + USER_IDStr);
    
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
        if(res.data[key] == null){
          res.data[key] = "";
        }
        //console.log(key, res.data[key]);

      });
      var mobilestr = res.data.mobile;
      if (res.data.mobile.split(",").length > 0) {
        res.data.mobile = res.data.mobile.split(",")
      }
      if (res.data.fax != null) {
        if (res.data.fax.split(",").length > 0) {
          res.data.fax = res.data.fax.split(",")
        }
      }
      console.log(res.data.companyName.length);
      if (res.data.companyName.length>10){
        
        res.data.companyName = res.data.companyName.substr(0, 10)+"..."
      }
      mobilestr= mobilestr.replace(","," ");
      this.setData({
        userCenterInfo: res.data,
        userPhoneStr: mobilestr,
        display_mobile: mobilestr == "",
        display_wechat: res.data.wechat == "",
        display_facebook: res.data.facebook == "",
        display_website: res.data.website == "",
        display_fax: res.data.fax == "",
        display_tax: res.data.taxno == ""        
      });
      
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
        } else if (data.data.certified == 2){
          this.setData({
            userCompanyAuthStatus: "审核中",
            userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
          })
        }

      })

      if (this.data.userCenterInfo.personCertified == "1") {
        this.setData({
          userAuthStatusImgPath: "/images/userCenter/7@2x.png",
        })
      } else {
        this.setData({
          userAuthStatusImgPath: "/images/userCenter/14@2x.png",
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
    //this.onLoad();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {

    return {
      title: "智慧微秘",
      path: '/pages/home/home/home?companyShareShare=' + this.data.userCenterInfo.companyId,
      //'/pages/home/companyDetail_share/companyDetail_share?pageFrom=qrcode&user_id=' + this.data.userCenterInfo.companyId, 
      
      //imageUrl: this.data.baseImgUrl + this.data.companyData.logoUrl,
      //imageUrl: '/images/home/qxgz-2.png',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  //去公司详情
  pushToCompanyDetail:function(){
    var USER_ID = wx.getStorageSync('USER_ID')
    console.log("跳转的userID：", USER_ID);

    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + this.data.userCenterInfo.companyId
    })
  },

  //二维码
  pushToQRCodePage: function () {
    wx.navigateTo({
      url: '/pages/userCenter/QRCodeInfo/QRCodeInfo'
    })
  },
  //弹出个人认证提示
  peopleAuthAction:function(){
    var coverViewDisplay = "block";

    this.setData({
      coverViewStatus: coverViewDisplay,
    })
  },
  //公司认证
  companyAuthAction: function () {
    var that = this
    wx.navigateTo({
      url: '/pages/userCenter/companyAuther/companyAuther?user_data=' + JSON.stringify(that.data.userCenterInfo)
    })
  },

  //去个人认证页面
  pushToPeopleAuth:function(){
    
    //先关掉遮罩层
    var coverViewDisplay = "none";
    this.setData({
      coverViewStatus: coverViewDisplay,
    })
    wx.navigateTo({
      url: '/pages/userCenter/peopleAuther/peopleAuther'
    })
  },
 
  //发送认证请求 ""
  sendAuthRequest:function(){
    //先关掉遮罩层
    var coverViewDisplay = "none";
    this.setData({
      coverViewStatus: coverViewDisplay,
    })

    reqpost(app.globalData.bastUrl, '/user/toCheck', {
      'userId': this.data.USER_ID,
    }, "POST", true).then(res => {
      console.log('不传图片提交认证' + JSON.stringify(res));
      if (res.code == 0) {
        wx.navigateTo({
          url: '/pages/public/remindPage/remindPage?remindType=success'
        })
      } else { 
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  //取消
  coverCancle:function(){
    var coverViewDisplay = "none";
    this.setData({
      coverViewStatus: coverViewDisplay,
    })
  },
  gotoUserInfo:function(){
    wx.navigateTo({
      url: '/pages/userCenter/userInfo/index',
    })
  },
  //去编辑
  pushToEdit: function () {
    var user_account = JSON.stringify(this.data.userCenterInfo);

    wx.navigateTo({
      url: '/pages/userCenter/modifyCard/modifyCard?account=' + user_account
    })
  },
  onPullDownRefresh: function() {
    　console.log('--------下拉刷新-------')
    wx.stopPullDownRefresh()
    　//wx.showNavigationBarLoading() //在标题栏中显示加载
      this.setData({
        showCard:true
      })
    
  },
  onReachBottom: function(){
    console.log('--------拉刷新-------')
    this.setData({
      showCard: false
    })
    //wx.stopPullDownRefresh()
  }
})