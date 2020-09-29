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


    userInfoGlobeData:"",
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
    imagePath2:'',
    companyInfo:'',
    cardInfo:'',
    showCavas: false,
    hidden: false,
    hideCavas: true,
    imgSrc: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //var userToken = wx.getStorageSync('TOKEN');
    // var USER_ID = wx.getStorageSync('user_id')
    // console.log(options,"二维码参数")
    // this.setData({

    //   //user_token: userToken,
    //   user_id: USER_ID,
      
    // })
    // //拿到存储的userInfo
    // wx.getStorage({
    //   key: 'userInfo_global',
    //   success: function (res) {
    //     console.log("拿到存储的用户信息" + JSON.stringify(res.data));

    //     that.setData({
    //       userInfoGlobeData: res.data
    //     })
    //   }
    // })
    

    // req(app.globalData.bastUrl, '/user/get', {
    //   'userId': this.data.user_id,
    // }, "GET", true).then(res => {
    //   console.log('用户信息' + JSON.stringify(res.data));
    //   Object.keys(res.data).forEach(function (key) {
    //     if (res.data[key] == 'null' || res.data[key] == null) {
    //       res.data[key] = "";
    //     }
    //     console.log(key, res.data[key]);

    //   });
    //   this.setData({
    //     userInfoData: res.data,
    //     imagePath2: res.data.qrCode
    //   })
    //   req(app.globalData.bastUrl, '/company/getCertified', {
    //     'id': res.data.companyId,
    //   }, "GET", true).then(data => {
    //     console.log(data);
    //     if (data.data.certified == 1) {
    //       this.setData({
    //         userAuthStatusLabel: "已认证",
    //         userCompanyAuthStatusBGColor: "background-color: #ff6f05;color:#fff;",
    //       })
    //     } else if (data.data.certified == 0){
    //       this.setData({
    //         userAuthStatusLabel: "未认证",
    //         userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
    //       })
    //     } else if (data.data.certified == 2){
    //       this.setData({
    //         userAuthStatusLabel: "审核中",
    //         userCompanyAuthStatusBGColor: "background-color: #f5f5f5;color:#666;",
    //       })
    //     }
    //   })

    //   /*
    //   // 页面初始化 options为页面跳转所带来的参数
    //   var QRCodeMessage = '/pages/home/companyDetail_share/companyDetail_share?pageFrom=qrcode&user_id=' + this.data.userInfoData.companyId;  // 正式
    //   //var QRCodeMessage = 'https://www.qosoo.cn/wechatapplet?s=1&userId=' + this.data.userInfoData.companyId;  
    //   console.log("要生成二维码的信息" + JSON.stringify(QRCodeMessage));
    //   var QRCodeString = JSON.stringify(QRCodeMessage);
    //   var size = this.setCanvasSize();//动态设置画布大小
    //   this.createQrCode(QRCodeMessage, "mycanvas", size.w, size.h);
    //   */
    // })
    
    reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
          
      // 页面初始化 options为页面跳转所带来的参数
      
      
        this.setData({
          cardInfo: res.data,
          imagePath2: res.data.qrCode
        })
        this.getCompany()
      }
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
        url: '../home/home',
      })
    }
  },
  getCompany: function () {
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      id: this.data.cardInfo.companyId
    }, "post", true).then(res => {
      if (res.success) {
        switch (res.data.certifiedStatus) {
          case 0:
            res.data.certified = '未认证'
            break
          case 1:
            res.data.certified = '已认证'
            break
          case 2:
            res.data.certified = '认证中'
            break
          case 3:
            res.data.certified = '认证失败'
            break
        }
        this.setData({
          companyInfo: res.data
        })
        this.getqrcode()

      }
    })
  },
  getqrcode: function () {
    var that = this
    const ctx = wx.createCanvasContext('myCanvas');
    // ctx.drawImage("https://file.qosoo.cn/files/20191021/home/c-1.png", 0, 0, 345, 300)
    wx.getImageInfo({
      src: 'https://file.qosoo.cn/files/img/2019/10/23/1E8D612B75804779979E64C79402D508.png',
      success: function (res) {
        ctx.drawImage(res.path, 0, 20, 340, 184)


        wx.getImageInfo({
          src: that.data.cardInfo.headImg,
          success: function (res) {

            ctx.save()//保存当前的绘图上下文。
            ctx.beginPath()//开始创建一个路径
            ctx.arc(55, 52 + 20, 25, 0, 2 * Math.PI, false)//画一个圆形裁剪区域

            ctx.clip()//裁剪
            ctx.drawImage(res.path, 30, 26 + 20, 50, 50)//绘制图片
            ctx.restore()//恢复之前保存的绘图上下文
            // ctx.draw()//绘制到canvas

            ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
            ctx.setFontSize(16)//设置字体大小，默认10
            console.log(that.data.cardInfo.realName.length)
            ctx.fillText(that.data.cardInfo.realName, 100, 40 + 20)//绘制文本
            //调用draw()开始绘制
            var text = that.data.cardInfo.dept + that.data.cardInfo.job
            ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
            ctx.setFontSize(12)//设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.dept, 100, 57 + 20)//绘制文本

            ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
            ctx.setFontSize(12)//设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.job, 100, 72 + 20)

            ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
            ctx.setFontSize(14)//设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.account, 100 + that.data.cardInfo.realName.length * 20, 42 + 20)//绘制文本
            wx.getImageInfo({
              src: 'https://file.qosoo.cn/files/img/2019/10/23/91D6180F510B4F02B88362E5F18A49AE.png',
              success: function (res) {

                ctx.drawImage(res.path, 40, 100 + 20, 16, 14)
                if (that.data.companyInfo) {
                  ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
                  ctx.setFontSize(14)//设置字体大小，默认10
                  ctx.fillText(that.data.companyInfo.name, 65, 113 + 20)//绘制文本\
                }
                wx.getImageInfo({
                  src: 'https://file.qosoo.cn/files/img/2019/10/23/553A6A62A6EB47DF9891E086FDD8FA67.png',
                  success: function (res) {
                    ctx.drawImage(res.path, 42, 125 + 20, 12, 14)
                    if (that.data.companyInfo) {
                      ctx.setFillStyle('#ffffff')//文字颜色：默认黑色
                      ctx.setFontSize(14)//设置字体大小，默认10
                      var str = that.data.companyInfo.province + that.data.companyInfo.city + that.data.companyInfo.district + that.data.companyInfo.address;
                      var lineWidth = 0;
                      var canvasWidth = ctx.width;//计算canvas的宽度
                      var initHeight = 15;//绘制字体距离canvas顶部初始的高度
                      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
                      if (str.length > 21) {
                        for (let i = 0; i < str.length; i++) {
                          lineWidth += ctx.measureText(str[i]).width;
                          if (lineWidth > 260) {
                            ctx.fillText(str.substring(lastSubStrIndex, i - 2), 65, 137 + 20);//绘制截取部分
                            initHeight += 20;//20为字体的高度
                            lineWidth = 0;
                            lastSubStrIndex = i - 2;
                          }
                          if (i == str.length - 2) {//绘制剩余部分
                            ctx.fillText(str.substring(lastSubStrIndex, i + 2), 65, 155 + 20);
                          }
                        }
                      } else {
                        ctx.fillText(str, 65, 137 + 20);
                      }
                    }
                    ctx.draw()
                  }
                })
              }
            }) 
          }
        })
      }
    })
    setTimeout(function () { that.makeImg() }, 1500)
    //   }
    // })

  },
  makeImg: function () {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 344,
      height: 300,
      destWidth: 344 * 2,
      destHeight: 300 * 2,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          imgSrc: res.tempFilePath,
        })
      }
    })
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 500;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth/scale;
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
        console.log("生成成功"+tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath2;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function () {
    var company_id = 0
    if (this.data.companyInfo) {
      company_id = this.data.companyInfo.id
    }
    return {
      title: "专业的智慧工作秘书",
      imageUrl: this.data.imgSrc,
      path: '/pages/home/companyDetail/companyDetail?card=1&company_id=' + company_id + '&from=focus&formType=1&user_Id=' + this.data.cardInfo.id+'&be=share',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
})