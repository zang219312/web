// pages/secretary/secretary.js
const app = getApp()
import {
  req,
  reqpost
} from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdown: false,
    cardInfo: '',
    companyInfo: '',
    serviceInfo: '',
    isShow: false,
    serviceList: [],
    activeType: 0,
    isCoverView: false,
    userCenterInfo: '',
    cardshow: false,
    showCavas: false,
    hidden: false,
    hideCavas: true,
    imgSrc: '',
    touchS: [0, 0],
    touchE: [0, 0],
    imgSrcShare: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

    // }, "post", true).then(res => {
    //   if (res.success) {
    //     this.setData({
    //       cardInfo:res.data
    //     })
    //     this.getCompany()
    //   }
    // })

    // if (options.be == 'share') {
    //   _this.setData({
    //     from: 'share'
    //   })
    // }

    wx.getSystemInfo({
      success: function(res) {
        if (res.model.indexOf('X') > -1) {
          console.log('X系列');
          _this.setData({
            showX: true,
            paddingTop: '184'
          })
        } else {
          _this.setData({
            showX: false,
            paddingTop: '148'
          })
        }
      },
    })
    // reqpost(app.globalData.bastUrl, '/qosoo/service', {
    // }, "post", true).then(res => {
    //   console.log(res);
    //   if (res.success) {
    //     this.setData({
    //       serviceList: res.data

    //     })
    //   }
    // })
  },
  handleGoBack: function() {
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
  //公司认证
  companyAuthAction: function() {
    var that = this
    wx.navigateTo({
      url: '/pages/userCenter/companyAuther/companyAuther'
    })
  },
  newCardShare: function() {
    var that = this
    const ctx = wx.createCanvasContext('myCanvas2');
    wx.getImageInfo({
      src: 'https://file.qosoo.cn/files/img/2019/10/23/F5011F9283C04222B1E6D5D79DF4A869.png',
      success: function(res) {
        ctx.drawImage(res.path, 0, 20, 344, 232)
        console.log(res);
        wx.getImageInfo({
          src: that.data.cardInfo.callCard,
          success: function(res) {
            console.log(res);
            ctx.drawImage(res.path, 14, 33, 314, 204)
            ctx.draw()
          }
        })
      }
    })
    setTimeout(function() {
      that.makeImg2()
    }, 1300)
  },
  getqrcode: function() {
    var that = this
    const ctx = wx.createCanvasContext('myCanvas');
    //背景色为黄色
    // ctx.drawImage("https://file.qosoo.cn/files/20191021/home/c-1.png", 0, 0, 345, 300)
    wx.getImageInfo({
      src: 'https://file.qosoo.cn/files/img/2019/10/23/1E8D612B75804779979E64C79402D508.png',
      success: function(res) {
        ctx.drawImage(res.path, 0, 0 + 50, 344, 184)


        wx.getImageInfo({
          src: that.data.cardInfo.headImg,
          success: function(res) {

            ctx.save() //保存当前的绘图上下文。
            ctx.beginPath() //开始创建一个路径
            ctx.arc(55, 52 + 50, 25, 0, 2 * Math.PI, false) //画一个圆形裁剪区域

            ctx.clip() //裁剪
            ctx.drawImage(res.path, 30, 27 + 50, 50, 50) //绘制图片
            ctx.restore() //恢复之前保存的绘图上下文
            // ctx.draw()//绘制到canvas

            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(16) //设置字体大小，默认10
            console.log(that.data.cardInfo.realName.length)
            ctx.fillText(that.data.cardInfo.realName, 100, 40 + 50) //绘制文本
            //调用draw()开始绘制
            var text = that.data.cardInfo.dept + that.data.cardInfo.job
            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(12) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.dept, 100, 57 + 50) //绘制文本

            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(12) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.job, 100, 72 + 50)

            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(14) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.account, 100 + that.data.cardInfo.realName.length * 20, 42 + 50) //绘制文本
            wx.getImageInfo({
              src: 'https://file.qosoo.cn/files/img/2019/10/23/91D6180F510B4F02B88362E5F18A49AE.png',
              success: function(res) {

                ctx.drawImage(res.path, 40, 100 + 50, 16, 14)
                if (that.data.companyInfo) {
                  ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
                  ctx.setFontSize(14) //设置字体大小，默认10
                  ctx.fillText(that.data.companyInfo.name, 65, 113 + 50) //绘制文本\
                }
                wx.getImageInfo({
                  src: 'https://file.qosoo.cn/files/img/2019/10/23/553A6A62A6EB47DF9891E086FDD8FA67.png',
                  success: function(res) {
                    ctx.drawImage(res.path, 42, 125 + 50, 12, 14)
                    if (that.data.companyInfo) {
                      ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
                      ctx.setFontSize(14) //设置字体大小，默认10
                      var str = that.data.companyInfo.province + that.data.companyInfo.city + that.data.companyInfo.district + that.data.companyInfo.address;
                      var lineWidth = 0;
                      var canvasWidth = ctx.width; //计算canvas的宽度
                      var initHeight = 15; //绘制字体距离canvas顶部初始的高度
                      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
                      if (str.length > 21) {
                        for (let i = 0; i < str.length; i++) {
                          lineWidth += ctx.measureText(str[i]).width;
                          if (lineWidth > 260) {
                            ctx.fillText(str.substring(lastSubStrIndex, i - 2), 65, 137 + 50); //绘制截取部分
                            initHeight += 20; //20为字体的高度
                            lineWidth = 0;
                            lastSubStrIndex = i - 2;
                          }
                          if (i == str.length - 2) { //绘制剩余部分
                            ctx.fillText(str.substring(lastSubStrIndex, i + 2), 65, 155 + 50);
                          }
                        }
                      } else {
                        ctx.fillText(str, 65, 137 + 50);
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
    setTimeout(function() {
      that.makeImg()
    }, 1500)
    //   }
    // })

  },
  toRegister: function() {
    wx.setStorageSync('formUrl', 'pages/secretary/secretary')

    wx.navigateTo({
      url: '/pages/public/userAuthStatus/userAuthStatus'
    })
  },
  makeImg: function() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 344,
      height: 320,
      destWidth: 344 * 2,
      destHeight: 320 * 2,
      canvasId: 'myCanvas',
      success: function(res) {
        console.log(res.tempFilePath)
        that.setData({
          imgSrc: res.tempFilePath,
        })
      }
    })
  },
  makeImg2: function() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 344,
      height: 300,
      destWidth: 344 * 2,
      destHeight: 300 * 2,
      canvasId: 'myCanvas2',
      success: function(res) {
        console.log('2' + res.tempFilePath)
        that.setData({
          imgSrcShare: res.tempFilePath,
        })
      }
    })
  },
  shareNewCard: function() {
    if (this.data.cardInfo) {
      if (this.data.cardInfo.callCard) {
        let cardText = this.data.cardshow ? "电子卡片" : "纸质卡片"
        this.setData({
          cardshow: !this.data.cardshow,

          cardText: cardText
        })
      } else {
        this.showcoverView()
      }
    } else {
      var pages = getCurrentPages() //获取加载的页面

      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      // console.log(currentPage)
      var url = currentPage.route //当前页面url
      // console.log('页面：'+url)
      var options = currentPage.options //如果要获取url中所带的参数可以查看
      //拼接url的参数
      var urlWithArgs = url + '?'
      for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      wx.setStorageSync('formUrl', urlWithArgs)

      wx.navigateTo({
        url: '/pages/public/userAuthStatus/userAuthStatus'
      })
    }
  },
  //去个人认证页面
  pushToPeopleAuth: function() {
    //先关掉遮罩层
    this.setData({
      isCoverView: false
    })

    wx.navigateTo({
      url: '/pages/userCenter/peopleAuther/peopleAuther'
    })
  },

  //发送认证请求 ""
  sendAuthRequest: function() {
    //先关掉遮罩层
    this.setData({
      isCoverView: false
    })

    reqpost(app.globalData.url, '/weixin/api/accept/user/toCheck', {}, "POST", true).then(res => {
      if (res.success) {
        wx.navigateTo({
          url: '/pages/public/remindPage/remindPage?remindType=success'
        })
      }
    })
  },
  //取消
  coverCancle: function() {
    this.setData({
      isCoverView: false
    })
  },
  toQRcode: function() {
    wx.navigateTo({
      url: '/pages/userCenter/QRCodeInfo/QRCodeInfo'
    })
  },
  showcoverView: function() {
    this.setData({
      isCoverView: true
    })
  },
  pushToEdit: function() {
    var user_account = JSON.stringify(this.data.userCenterInfo);

    wx.navigateTo({
      url: '/pages/userCenter/modifyCard/modifyCard?account=' + user_account
    })
  },
  getCompany: function() {
    if (this.data.cardInfo.companyId <= 0) {
      this.getqrcode()
      return
    }
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      id: this.data.cardInfo.companyId
    }, "post", true).then(res => {
      console.log(res);
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
        this.data.userCenterInfo.companyInfo = res.data
        this.setData({
          companyInfo: res.data,
          userCenterInfo: this.data.userCenterInfo
        })
        this.getqrcode()
      }
    })
  },
  clipboard: function(e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    console.log(phoneNumb)
    wx.setClipboardData({
      data: phoneNumb, //此号并非真实电话号码，仅用于测试
      success: function() {
        console.log("复制成功")
        wx.showToast({
          title: "微信号码已复制",
          duration: 3000
        })
      },
      fail: function() {

      }
    })
  },
  callMeAction: function(e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    console.log(phoneNumb)
    wx.makePhoneCall({
      phoneNumber: phoneNumb, //此号并非真实电话号码，仅用于测试
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  },
  getService: function(e) {
    var type = e.currentTarget.dataset.type
    var lists = this.data.serviceList
    lists.forEach(item => {
      if (type == item.type) {
        this.setData({
          cardshow: false,
          serviceInfo: item,
          isShow: true,
          activeType: type
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this);
    reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          cardInfo: res.data,
          userCenterInfo: res.data
        })
        this.getCompany()
        if (res.data.callCard) {
          this.newCardShare()
        }
      }
    })
  },

  changeshow: function() {
    this.setData({
      isdown: !this.data.isdown
    })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var showcard = false
    // if(!this.data.isShow){
    //   showcard = true
    // }
    // this.setData({
    //   isShow:false,
    //   activeType:0,
    //   cardshow: showcard
    // })
    // wx.stopPullDownRefresh()
  },
  data: {
    touchS: [0, 0],
    touchE: [0, 0]
  },

  touchStart: function(e) {
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    // this.data.touchS = [sx, sy]
    this.setData({
      touchS: [sx, sy]
    })
  },
  touchMove: function(e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    // this.data.touchE = [sx, sy]
    this.setData({
      touchE: [sx, sy]
    })
  },
  touchEnd: function(e) {
    let start = this.data.touchS
    let end = this.data.touchE
    console.log(start)
    console.log(end)
    // if (end[0] == end[1]){
    //   this.pushToEdit()
    // }else{
    if (start[1] < end[1]) {
      console.log('下')
    } else {
      console.log('上')
      this.setData({
        cardshow: false
      })
    }
    // }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var company_id = 0
    if (this.data.companyInfo) {
      company_id = this.data.companyInfo.id
    }

    if (this.data.cardshow) {
      console.log(11);
      return {
        title: "小秘书收到新名片啦",
        imageUrl: this.data.imgSrcShare,
        path: '/pages/home/companyDetail/companyDetail?card=1&from=focus&company_id=' + company_id + '&formType=1&from=focus&user_Id=' + this.data.cardInfo.id + '&be=share',
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    } else {
      console.log(22);
      return {
        title: "小秘书收到新名片啦",
        imageUrl: this.data.imgSrc,
        path: '/pages/home/companyDetail/companyDetail?card=1&from=focus&company_id=' + company_id + '&formType=1&from=focus&user_Id=' + this.data.cardInfo.id + '&be=share',
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }

    console.log(33);
  }
})