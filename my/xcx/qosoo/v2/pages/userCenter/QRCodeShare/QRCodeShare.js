// pages/userCenter/qrCodeView.js
const app = getApp()
import { req } from '../../../utils/api.js';
import { reqpost } from '../../../utils/api.js';
var QR = require("../../../lib/qrcode.js");



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoData: "",

    user_token: "",
    user_Id: "",


    userInfoGlobeData: "",
    userImage: "",
    userNameLabel: "小芒果vicky",
    userProfessionLabel: "销售顾问",
    userCompanyLabel: "郑州微思科技有限公司",
    userAuthStatusLabel: "",

    userCompanyAuthStatusBGColor: "",

    // qrCodeImgUrl:"https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_QRCode@3x.png",
    //生成二维码
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: 'http://wxapp-union.com',//默认二维码生成文本
    imagePath2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //var userToken = wx.getStorageSync('TOKEN');
    console.log(options, "二维码参数")
    req(app.globalData.bastUrl, '/user/get', {
      'userId': options.user_id,
    }, "GET", true).then(res => {
      console.log('用户信息' + JSON.stringify(res.data));
      this.setData({
        userInfoData: res.data,
        imagePath2: res.data.qrCode
      })
      req(app.globalData.bastUrl, '/company/getCertified', {
        'id': res.data.companyId,
      }, "GET", true).then(data => {
        console.log(data);
        if (data.data.certified == 1) {
          this.setData({
            userAuthStatusLabel: "已认证",
            userCompanyAuthStatusBGColor: "background-color: #ff6f05;color:#fff;",
          })
        } else if (data.data.certified == 0) {
          this.setData({
            userAuthStatusLabel: "未认证",
            userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
          })
        } else if (data.data.certified == 2) {
          this.setData({
            userAuthStatusLabel: "审核中",
            userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
          })
        }
      })


      // 页面初始化 options为页面跳转所带来的参数
      var QRCodeMessage = '/pages/home/companyDetail_share/companyDetail_share?pageFrom=qrcode&user_id=' + this.data.userInfoData.companyId;  // 正式

      console.log("要生成二维码的信息" + JSON.stringify(QRCodeMessage));
      var QRCodeString = JSON.stringify(QRCodeMessage);
      var size = this.setCanvasSize();//动态设置画布大小
      this.createQrCode(QRCodeMessage, "mycanvas", size.w, size.h);
    })





  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 500;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log("生成成功" + tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          canvasHidden: true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  
})