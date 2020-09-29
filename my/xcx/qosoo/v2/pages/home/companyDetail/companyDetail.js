// pages/home/companyDetail/companyDetail.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
var time = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_token: "",
    user_Id: "",
    currentIndex: 0,
    currentIndexs: 0,
    imgArray: [{
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 1
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 2
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 3
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 4
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 5
      }
    ],
    starList: [
      'https://file.qosoo.cn/files/20191021/home/star-1.png',
      'https://file.qosoo.cn/files/20191021/home/star-2.png',
      'https://file.qosoo.cn/files/20191021/home/star-3.png',
      'https://file.qosoo.cn/files/20191021/home/star-4.png',
      'https://file.qosoo.cn/files/20191021/home/star-5.png',
    ],
    followTxt: '关注',
    followImg: 'https://file.qosoo.cn/files/20191021/home/white-star.png',
    follow: true,
    starShow: true,
    followActive: false,
    starLevel: 0,
    company_id: "",

    baseImgUrl: "",
    companyData: "",
    //公司标题
    companyTitle: "AA这个是标题么？",
    //公司名
    companyNameTitle: "华为科技有限公司",
    //公司介绍
    companyIntroduce: "华为消费者业务产品全面覆盖手机、移动宽带终端、终端云等，凭借自身的全球化网络优势、全球化运营能力，致力于将最新的科技带给消费者，让世界各地享受到技术进步的喜悦，以行践言，实现梦想。",
    //产品资料
    productInfoArray: [],
    //公司资讯
    InformationArray: [],
    //公司案例
    companyCaseArray: [],
    // 分享遮罩层状态
    shareCoverViewStatus: false,
    score: "",
    content_height: true,
    content_dis: "none",
    user_data: "",
    login_user: "",
    share_logo: "",
    content_text: "查看更多",
    display_partner: false,
    display_product: true,
    display_case: true,
    display_news: true,
    cardInfo: '',
    certifiedStatus: '未认证',
    cardShows: false,
    formType: 0,
    iSfocus: false,
    ljgz_id: '',
    showCavas: false,
    hidden: false,
    hideCavas: true,
    imgSrc: '',
    qrcode: '',
    company_url: 'www.qosoo.cn',
    from: 'search',
    contactShows: false,
    popup: true,
    max: 50, //限制最大输入字符数
    min: 10, //限制最小输入字符数
    minWord: '请填写来访事由', //提示语句
    len: 0,
    isShowContact: true,
    regi_popup: true, //扫码报名,
    regi_title: '请再次确认报名',
    isLogin: true,
    twice: false,
    startMyfocus: 0,
    key: '',
    myFocusGroupArray: [],
    minWord3: '请填写申请理由',
    em_popup: true,
    contactShow: false,
    isShowInfluence: true,
    focusMeGroupArray:[],
    startfocusme:0
  },
  parserQRCode: function(qrcontent) {
    var _this = this
    wx.request({
      url: qrcontent,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('解析')
        console.log(res)
        if (res.data.success) {
          _this.setData({
            company_id: res.data.data.companyId,
            qrcode: res.data.data.code,
            content: res.data.data.content,
            typeOfMeeting: res.data.data.type || '',
            qrcontent: qrcontent
          })
          _this.getInfo()

          //案例

          _this.getLists()

          //新闻
          _this.getNews()
          if (res.data.data.code == 'QR0008' || res.data.data.code == 'QR0009') {
            var focusType = 0
            if (res.data.data.code == 'QR0008') focusType = 1
            _this.setData({
              starShow: false,
              follow: false,
              focusType: focusType,
              ljgz_id: res.data.data.userId
            })

          } else if (res.data.data.code == 'QR0001') {
            // 前台扫码
            _this.showPopup();
          } else {

            //企业内部会议 type 1不公开  峰会论坛  0公开
            if (res.data.data.type && res.data.data.type == 1) {
              _this.getRegiCompanyDetail(res.data.data.content, res.data.data.code);
            } else {
              _this.showRegiPopup();
            }

          }


          reqpost(app.globalData.bastUrl, '/company/jFind', {
            'id': res.data.data.companyId
          }, "post", true).then(res => {
            console.log(res);
            if (res.data.certificate.length > 0) {
              res.data.certificate = [].concat(res.data.certificate.split(','))
            }
            if (res.data.partner.length > 0) {
              res.data.partner = [].concat(res.data.partner.split(','))
            }
            var txt = ''
            switch (res.data.certifiedStatus) {
              case 0:
                txt = '未认证'
                break;
              case 1:
                txt = '已认证'
                break;
              case 2:
                txt = '认证中'
                break;
              case 3:
                txt = '认证失败'
                break;
            }
            // var isShow = false
            // if (!res.data.partner) {
            //   isShow = true
            // }
            // console.log(res.data)
            _this.setData({
              //公司资料
              companyData: res.data,
              certifiedStatus: txt,
              // display_partner: isShow

            })

            var query = wx.createSelectorQuery();
            //选择id
            query.select('#mjltest').boundingClientRect(function(res) {
              //res就是 所有标签为mjltest的元素的信息 的数组
              // console.log(res);
              //取高度
              // console.log(res.height);
              if (res.height >= 100) {
                _this.setData({
                  content_height: false,
                  content_dis: "block"
                })
              } else {

              }
            }).exec()
          })

          _this.myCard(res.data.data.userId)

        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 2000
          })

        }
      }
    })

  },
  //获取内部会议的公司详情
  getRegiCompanyDetail(id, qrcode) {
    console.log('获取详情');
    var url = '';
    var that = this;
    if (['QR0006', 'QR0007'].includes(qrcode)) {
      url = '/meet/jFindById';
      reqpost(app.globalData.bastUrl, url, {
        id: id
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          that.setData({
            regi_title: res.data.title || '企业内部会议报名'
          })
          _this.showRegiPopup();
        }

      })
    }
  },
  getchange: function(e) {
    var index = e.detail.current
    this.setData({
      currentIndex: index
    })
  },
  getchanges: function(e) {
    var index = e.detail.current
    this.setData({
      currentIndexs: index
    })
  },
  getOther: function(code) {
    // 报名
    //console.log(code + '&token='+wx.getStorageSync('TOKEN'));
    var _this = this
    // 扫码报名
    wx.request({
      url: code + '&token=' + wx.getStorageSync('TOKEN'),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('报名接口')
        console.log(res)

        wx.showToast({
          title: res.data.data,
          icon: 'none',
          duration: 1000
        })
        // 未登录  token过期
        if (res.data.success === false && res.data.msgType === 1) {
          var pages = getCurrentPages() //获取加载的页面

          var currentPage = pages[pages.length - 1] //获取当前页面的对象
          console.log(currentPage)
          var url = currentPage.route //当前页面url
          console.log('页面：' + url)
          var options = currentPage.options //如果要获取url中所带的参数可以查看options
          var urlWithArgs = url + '?'
          for (var key in options) {
            var value = options[key]
            urlWithArgs += key + '=' + value + '&'
          }
          urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
          console.log(urlWithArgs)
          wx.setStorageSync('formUrl', urlWithArgs)



          wx.redirectTo({
            url: '/pages/public/userAuthStatus/userAuthStatus?source=scan'
          })

        } else {
          console.log('sasa');
          console.log(_this.data.qrcode);
          setTimeout(function() {
            if (['QR0002', 'QR0003', 'QR0004', 'QR0005'].includes(_this.data.qrcode)) {
              wx.redirectTo({
                url: '/pages/home/exhibition/exhibition?type=1',
                success(res) {
                  console.log(res);
                },
                fail(err) {
                  console.log(err);
                }
              })
            } else if (['QR0006', 'QR0007'].includes(_this.data.qrcode)) {

              wx.redirectTo({
                url: '/pages/home/summits/summits?type=2'
              })

              //内部的就不动 
              if (_this.data.typeOfMeeting == 1) {
                // wx.redirectTo({
                //   url: '/pages/home/lists-detail/lists-detail?listType=2&id=' + _this.data.content,
                // })
              }

            }
          }, 1000)
        }

        // }
      }
    })
  },
  hideInfluence(flag = true) {
    this.setData({
      isShowInfluence: flag,
    });
  },

  showInfluence() {
    this.hideInfluence(false);
  },


  hideEmPopup(flag = true) {
    this.setData({
      em_popup: flag,
    });
  },

  showEmPopup() {
    this.hideEmPopup(false);
  },


  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    console.log('hidden');
    this.setData({
      popup: flag,
      editText: ' ',
      len: 0,
      minWord: '访客事由',
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
  },

  // 隐藏报名的弹窗
  hideRegiPopup(flag = true) {
    this.setData({
      regi_popup: flag,
      regi_title: ''
    });
  },

  showRegiPopup() {
    this.hideRegiPopup(false);
  },
  getText(e) {
    console.log(e);
    if (e.type == 'confirm') {
      this.setData({
        editText: e.detail.value
      })
    }
  },
  getValueLength: function(e) {
    console.log(e);
    let value = e.detail.value
    let len = parseInt(value.length)
    //最少字数限制
    if (len <= this.data.min) {
      this.setData({
        minWord: "请填写来访事由",
        editText: e.detail.value,
        isDis: true
      })
    } else if (len > this.data.min) {
      this.setData({
        minWord: " ",
        editText: e.detail.value,
        isDis: false
      })
    }
    //最多字数限制
    if (len > 200) return;
    this.setData({
      len: len //当前字数 
    })
  },
  toApply(e) {
    console.log(e);

    console.log(this);
    // 点击确认


    if (e.currentTarget.dataset.str == 'employers') {
      if (e.currentTarget.dataset.click == 'comfirm') {
        if (this.data.len < 5) {
          wx.showToast({
            title: '不少于5个字',
            icon: 'none',
            duration: 1000
          })
          return;
        } else {
          reqpost(app.globalData.url, '/weixin/api/accept/association/apply', {
            companyId: this.data.company_id,
            reason: this.data.editText
          }, 'post', true).then(res => {
            console.log(res);
          })
        }
      }
      this.hideEmPopup();
    } else {
      if (e.currentTarget.dataset.click == 'comfirm') {

      } else {
        this.hidePopup();
      }
    }
  },

  // 
  RegiPopup(e) {
    var _this = this;
    console.log(_this);
    if (e.currentTarget.dataset.click == 'comfirm') {
      var code = _this.data.qrcontent.replace('open', 'accept/scan');
      _this.hideRegiPopup();
      _this.getOther(code)
    } else {
      _this.hideRegiPopup();
    }
  },
  //接入数据 
  onLoad: function(options) {
    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN');
    // var user_id = wx.getStorageSync('user_id');
    var qrcontent = null;
    var contactShow = false;
    console.log(options);
    if (options.q !== undefined) {
      qrcontent = decodeURIComponent(options.q);
      console.log(qrcontent);
      // return;
      this.parserQRCode(qrcontent)
      this.setData({
        cardShows: true,
        contactShows: false,
        isScan:true
      })

      //sType = time.getQueryString(scan_url, 's');
      //sParam = time.getQueryString(scan_url, 'userId');
    } else {

      var cardShow = false;

      if (options.card == 1) {
        cardShow = true
      }

      if (options.be == 'share') {
        _this.setData({
          from: 'share'
        })
      }

      if (options.from == 'search') {
        _this.setData({
          from: 'search'
        })
      }
      // source 如果有来源 显示contact way
      if (options.source == 0) {

      } else if (options.source == 1) {

        this.setData({
          contactShow: true
        })
      }
      // 区分协会
      if (options.qctype) {
        _this.setData({
          qctype: options.qctype,
          contactShow: true
        })
      }

      this.setData({
        company_id: options.company_id || 0,
        cardShows: cardShow,
        formType: options.formType || 0
        //baseImgUrl: app.globalData.bastUrl,
        //user_token: userToken,
        // user_id: user_id,
      })
      if (options.from == 'focus') {
        this.setData({
          starShow: true,
          follow: true,
          iSfocus: true
        })
      }

      if (options.from == 'focus' && options.pup == 1) {
        console.log('aaaaa');
        this.setData({
          starShow: true,
          follow: true
        })
      }
      var that = this;
      reqpost(app.globalData.bastUrl, '/company/jFind', {
        'id': this.data.company_id
      }, "post", true).then(res => {
        // console.log(res);
        if (res.data.certificate.length > 0) {
          res.data.certificate = [].concat(res.data.certificate.split(','))
        }
        if (res.data.partner.length > 0) {
          res.data.partner = [].concat(res.data.partner.split(','))
        }
        var txt = ''
        switch (res.data.certifiedStatus) {
          case 0:
            txt = '未认证'
            break;
          case 1:
            txt = '已认证'
            break;
          case 2:
            txt = '认证中'
            break;
          case 3:
            txt = '认证失败'
            break;
        }
        // var isShow = false
        // if (!res.data.partner) {
        //   isShow = true
        // }
        // console.log(res.data)
        this.setData({
          //公司资料
          companyData: res.data,
          certifiedStatus: txt,
          // display_partner: isShow
        })

        var query = wx.createSelectorQuery();
        //选择id
        query.select('#mjltest').boundingClientRect(function(res) {
          //res就是 所有标签为mjltest的元素的信息 的数组
          // console.log(res);
          //取高度
          // console.log(res.height);
          if (res.height >= 100) {
            that.setData({
              content_height: false,
              content_dis: "block"
            })
          } else {

          }
        }).exec()
      })

      if (options.user_Id) {
        this.myCard(options.user_Id)
      } else {

        reqpost(app.globalData.url, '/weixin/api/open/user/jFindByToken', {}, "post", true).then(res => {
          console.log(res)
          console.log(res.success === false, res.msgType == 0, this.data.iSfocus, wx.getStorageSync('key_' + this.data.company_id) == '');
          if (res.success) {
            console.log(options.company_id, res.data.companyId)
            if (res.data.companyId == options.company_id) {
              this.setData({
                user_Id: res.data.id,
                contactShow: true
              })
              this.myCard(res.data.id)
            } else {
              this.otherCard(options.company_id)
              this.setData({
                contactShow: false
              })
            }
          } else if (res.success === false && res.msgType == 0 && this.data.iSfocus && wx.getStorageSync('key_' + this.data.company_id) == '') {
            console.log('进来了')
            wx.setStorageSync('key_' + this.data.company_id, true)
            this.setData({
              starShow: true,
              follow: true
            })
            this.otherCard(options.company_id)
          } else {
            console.log('other');
            this.otherCard(options.company_id)
          }

        })
      }
    }

    // req(app.globalData.bastUrl, '/user/get', {
    //   userId: user_id
    // }, "GET", true).then(res => {
    //   console.log(res, "登录用户信息");
    //   if(res.code == 0){
    //     this.setData({
    //       login_user: res.data,
    //     })
    //   }
    // })

    // console.log("获取上一页公司的id是：" + this.data.company_id);

    console.log(_this);
    // 广告
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      position: 3
    }, "post", true).then(res => {
      console.log(res);
      this.setData({
        publicizewidely: res.data,
      })
      // var timestamp = _this.data.publicizewidely;
      // for (var i = 0; i < timestamp.length; i++) {
      //   timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, "Y-M-D");
      // }
      // this.setData({
      //   publicizewidely: timestamp
      // })
    })
  },
  contactCompany(e) {
    this.setData({
      isShowContact: false
    })
  },

  hideContact() {
    this.setData({
      isShowContact: true
    })
  },

  sendSms: function(e) {
    var phoneNumb = e.currentTarget.dataset.sms;
    console.log(phoneNumb);
    if (!phoneNumb) {
      wx.showModal({
        title: '无预留手机号',
        content: '请注册',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/public/userAuthStatus/userAuthStatus'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/call/sms/sms?mobile=' + phoneNumb,
      })
    }

  },
  clipboard: function(e) {
    var phoneNumb = e.currentTarget.dataset.wechat;
    if (!phoneNumb) {
      wx.showToast({
        title: "无预留微信号",
        icon: 'none',
        duration: 3000
      })
      return
    }
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
      fail: function(err) {
        console.log(err);
      }
    })
  },

  callMeAction: function(e) {
    var phoneNumb = e.currentTarget.dataset.mobile;
    var realname = e.currentTarget.dataset.realname;
    // console.log(phoneNumb)

    wx.navigateTo({
      url: '/pages/call/phone/phone?mobile=' + phoneNumb + '&realname=' + realname,
    })
  },

  handleGoBack: function() {
    let pages = getCurrentPages();

    if (this.options.from == 'focus' && this.options.formType == 1 && !this.data.twice) {
      this.setData({
        starShow: false,
        follow: false,
      })
      return;
    }

    if (pages.length > 2) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '../home/home',
      })
    }

    console.log(this);
    // if (this.data.twice) {
    //   if (pages.length > 2) {
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: '../home/home',
    //     })
    //   }
    // }


  },

  myCard: function(id) {
    reqpost(app.globalData.url, '/weixin/api/open/user/jFindById', {
      id: id
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        var lists = this.data.imgArray
        lists.forEach((item, index) => {
          if (index < res.data.focusLevel) {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
            item.imgurl2 = 'https://file.qosoo.cn/files/20191021/home/star.png';
          }
        })
        if (res.data.focus == 1) { //已关注，直接显示
          var img = this.data.starList[res.data.focusLevel - 1]
          this.setData({
            followTxt: '关注',
            followActive: true,
            followImg: img,
            // starLevel: res.data.userLevel
          })
        } else {
          if (this.data.iSfocus && wx.getStorageSync('key_' + this.data.company_id) == '') {
            console.log('aa');
            wx.setStorageSync('key_' + this.data.company_id, true)
            this.setData({
              starShow: false,
              follow: false
            })
          }
          this.setData({
            followTxt: "关注",
            followActive: false,
            followImg: 'https://file.qosoo.cn/files/20191021/home/white-star.png',
            // starLevel: res.data.userLevel
          })
        }
        this.setData({
          cardInfo: res.data,
          imgArray: lists,
          ljgz_id: res.data.id
        })
        this.getqrcode()
      }
    })
  },
  getqrcode: function() {
    var that = this
    const ctx = wx.createCanvasContext('myCanvas');
    // ctx.drawImage("https://file.qosoo.cn/files/20191021/home/c-1.png", 0, 0, 345, 300)
    wx.getImageInfo({
      src: 'https://file.qosoo.cn/files/img/2019/10/23/1E8D612B75804779979E64C79402D508.png',
      success: function(res) {
        ctx.drawImage(res.path, 0, 20, 340, 184)
        console.log(that.data.cardInfo)

        // ctx.draw()
        // ctx.drawImage("/images/home/c-2.png", 60, 20, 16, 14)
        // ctx.draw()
        // wx.getImageInfo({
        //   src: 'https://www.qosoo.cn/files/sys/2019081202.png',
        //   success: function (res) {
        // ctx.save()//保存当前的绘图上下文。
        // ctx.beginPath()//开始创建一个路径
        // ctx.arc(25, 25, 25, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
        // ctx.clip()//裁剪
        // ctx.drawImage(res.path, 0, 0, 50, 50)//绘制图片
        // ctx.restore()//恢复之前保存的绘图上下文
        // ctx.draw()//绘制到canvas
        // ctx.drawImage(res.path, 0, 0, 344, 300)
        // ctx.draw(true);
        wx.getImageInfo({
          src: that.data.cardInfo.headImg,
          success: function(res) {

            ctx.save() //保存当前的绘图上下文。
            ctx.beginPath() //开始创建一个路径
            ctx.arc(55, 52 + 20, 25, 0, 2 * Math.PI, false) //画一个圆形裁剪区域

            ctx.clip() //裁剪
            ctx.drawImage(res.path, 30, 26 + 20, 50, 50) //绘制图片
            ctx.restore() //恢复之前保存的绘图上下文
            // ctx.draw()//绘制到canvas

            ctx.setFillStyle('#fff') //文字颜色：默认黑色
            ctx.setFontSize(16) //设置字体大小，默认10
            console.log(that.data.cardInfo.realName.length)
            ctx.fillText(that.data.cardInfo.realName, 100, 40 + 20) //绘制文本
            //调用draw()开始绘制
            var text = that.data.cardInfo.dept + that.data.cardInfo.job
            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(12) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.dept, 100, 57 + 20) //绘制文本

            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(12) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.job, 100, 72 + 20)

            ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
            ctx.setFontSize(14) //设置字体大小，默认10
            ctx.fillText(that.data.cardInfo.account, 90 + that.data.cardInfo.realName.length * 20, 42 + 20) //绘制文本
            wx.getImageInfo({
              src: 'https://file.qosoo.cn/files/img/2019/10/23/91D6180F510B4F02B88362E5F18A49AE.png',
              success: function(res) {

                ctx.drawImage(res.path, 40, 100 + 20, 16, 14)
                if (that.data.companyData) {
                  ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
                  ctx.setFontSize(14) //设置字体大小，默认10
                  ctx.fillText(that.data.companyData.name, 65, 113 + 20) //绘制文本\
                }
                wx.getImageInfo({
                  src: 'https://file.qosoo.cn/files/img/2019/10/23/553A6A62A6EB47DF9891E086FDD8FA67.png',
                  success: function(res) {
                    ctx.drawImage(res.path, 42, 125 + 20, 12, 14)
                    if (that.data.companyData) {
                      ctx.setFillStyle('#ffffff') //文字颜色：默认黑色
                      ctx.setFontSize(14) //设置字体大小，默认10
                      var str = that.data.companyData.province + that.data.companyData.city + that.data.companyData.district + that.data.companyData.address;
                      var lineWidth = 0;
                      var canvasWidth = ctx.width; //计算canvas的宽度
                      var initHeight = 15; //绘制字体距离canvas顶部初始的高度
                      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
                      if (str.length > 21) {
                        for (let i = 0; i < str.length; i++) {
                          lineWidth += ctx.measureText(str[i]).width;
                          if (lineWidth > 260) {
                            ctx.fillText(str.substring(lastSubStrIndex, i - 2), 65, 137 + 20); //绘制截取部分
                            initHeight += 20; //20为字体的高度
                            lineWidth = 0;
                            lastSubStrIndex = i - 2;
                          }
                          if (i == str.length - 2) { //绘制剩余部分
                            ctx.fillText(str.substring(lastSubStrIndex, i + 1), 65, 155 + 20);
                          }
                        }
                      } else {
                        ctx.fillText(str, 65, 137 + 20);
                      }
                    }
                    ctx.draw()
                  }
                })
                // ctx.draw()
                // wx.getImageInfo({
                //   src: 'https://www.qosoo.cn/files/sys/2019081203.png',
                //   success: function (res) {
                //     ctx.drawImage(res.path, 40, 170, 16, 14)

                //     ctx.draw()
                //   }
                // })
              }
            })
          }
        })
      }
    })
    setTimeout(function() {
      that.makeImg()
    }, 1000)
    //   }
    // })

  },
  makeImg: function() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 344,
      height: 300,
      destWidth: 344 * 2,
      destHeight: 300 * 2,
      canvasId: 'myCanvas',
      success: function(res) {
        console.log(res.tempFilePath)
        that.setData({
          imgSrc: res.tempFilePath,
        })
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  otherCard: function(id) {
    //名片
    reqpost(app.globalData.bastUrl, '/user/jFindByCompanyId', {
      id: id
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        // if (res.data.focusLevel)
        var lists = this.data.imgArray
        lists.forEach((item, index) => {
          if (index < res.data.focusLevel) {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
            item.imgurl2 = 'https://file.qosoo.cn/files/20191021/home/star.png';

          }
        })
        if (res.data.focus == 1) { //已关注，直接显示
          var img = this.data.starList[res.data.focusLevel - 1]
          this.setData({
            followTxt: '关注',
            followActive: true,
            followImg: img,
            // starLevel: res.data.userLevel
          })
        } else {
          if (this.data.iSfocus && wx.getStorageSync('key_' + this.data.company_id) == '') {
            console.log('bb');
            wx.setStorageSync('key_' + this.data.company_id, true)
            this.setData({
              starShow: false,
              follow: false
            })
          }
          this.setData({
            followTxt: "关注",
            followActive: false,
            followImg: 'https://file.qosoo.cn/files/20191021/home/white-star.png',
            // starLevel: res.data.userLevel
          })
        }
        this.setData({
          cardInfo: res.data,
          imgArray: lists,
          ljgz_id: res.data.id
        })
        this.getqrcode()
      }
    })
  },
  out: function(e) {
    console.log(e.currentTarget.dataset.linktype)
    if (e.currentTarget.dataset.linktype == 1) {
      wx.navigateTo({
        url: '/pages/out/out?guangao=' + e.currentTarget.dataset.xq
      })
    } else if (e.currentTarget.dataset.linktype == 0) {
      wx.navigateTo({
        url: "/pages/public/ganggaoxq/ganggaoxq?xq=" + e.currentTarget.dataset.id
      })
    }

  },
  tolist: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.linktype
    })
  },
  // 弹窗
  coverCancleAction: function() {
    this.setData({
      coverViewStatus: "none"
    })
  },
  //跳转到公司产品更多
  pushToproductmore: function() {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?type=2&id=" + this.data.companyData.id
    })
  },
  pushTocasesmore: function() {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?type=1&id=" + this.data.companyData.id
    })
  },
  pushTonewsmore: function() {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?type=3&id=" + this.data.companyData.id
    })
  },
  // 关注
  focusAction: function() {
    var that = this;
    console.log(that);
    if (that.data.follow == true) {
      that.setData({
        follow: false,
        starShow: false
      });
    } else {
      that.setData({
        follow: true,
        starShow: true
      });
    }

    // }

  },

  unfollow: function() { //点击取消关注，执行取消关注操作
    var that = this;

    if (this.data.cardInfo.focus != 1) {
      this.setData({
        starShow: true,
        follow: true,
        twice: true
      })
      return
    }

    wx.showModal({
      title: '提示',
      content: '是否要取消关注？',
      confirmColor: '#FA6D21',
      success: function(res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.url + '/weixin/api/accept/user/focus',
            data: {
              'userId': that.data.ljgz_id,
              'type': 0,
              'level': 0,
              'token': wx.getStorageSync('TOKEN')
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res)
              if (res.data.success) {
                that.setData({
                  followActive: false,
                  followImg: "https://file.qosoo.cn/files/20191021/home/white-star.png",
                  followTxt: "关注",
                  starLevel: 0
                });
                var lists = that.data.imgArray
                lists.forEach((item, index) => {
                  item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png';
                  item.imgurl2 = 'https://file.qosoo.cn/files/20191021/home/star-un.png';

                })
                var str = that.data.cardInfo
                str.focus = 0
                that.setData({
                  imgArray: lists,
                  cardInfo: str
                })

                // 取消关注后删除当前数据
                let myFocus = wx.getStorageSync('myFocus');
                for (let i = 0; i < myFocus.length; i++) {
                  if (myFocus[i].id == that.data.company_id) {
                    myFocus.splice(i, 1);
                  }
                }
                wx.setStorageSync('myFocus', myFocus.sort(that.compare('level', false)));
                that.hideContact();
                that.updateFocusMe(that.data.company_id);
              }
            }
          })
        }
      }
    })

  },

  // id 公司id
  updateFocusMe(id) {
    let focusMeGroupArray = wx.getStorageSync('focusMe');
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      console.log(res);
     
      if (res.success) {
        for (let i = 0; i < focusMeGroupArray.length; i++) {
          if (focusMeGroupArray[i].id == id) {
            focusMeGroupArray[i].focusList = res.data;
            // 更新关注我的列表
            this.setData({
              [`focusMeGroupArray[${i}].focusList`]: res.data,
            })
            wx.setStorageSync('focusMe', focusMeGroupArray)
          }
        }
      }
    })
  },
  starHidden: function(e) {
    var that = this;
    that.setData({
      starShow: true,
      follow: true,
      twice: true
    });
  },
  focusStar: function(e) {
    var that = this;

    var starNum = e.currentTarget.id;
    var obj = that.data.imgArray;

    that.setData({
      //imgArray: obj,
      followActive: true,
      followImg: this.data.starList[starNum - 1],
      followTxt: '关注'
    });
  
    reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
      'userId': that.data.ljgz_id,
      'type': 0,
      'level': starNum,
    }, "POST", true).then(res => {
      // console.log(res);
      if (res.success) {
        var lists = this.data.imgArray
        lists.forEach((item, index) => {
          if (index < starNum) {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
            item.imgurl2 = 'https://file.qosoo.cn/files/20191021/home/star.png';
          } else {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png';
            item.imgurl2 = 'https://file.qosoo.cn/files/20191122/home/contact_star.png';
          }
        })
        var str = that.data.cardInfo
        str.focus = 1
        this.setData({
          imgArray: lists,
          cardInfo: str
        })

        // 同步修改缓存公司的星级
        let myFocus = wx.getStorageSync('myFocus');
        // 已关注，则修改
        console.log(that.data.companyData.focus);
        if(!that.data.isScan){//不是扫码加的
          if (that.data.companyData.focus) {
            for (let i = 0; i < myFocus.length; i++) {
              if (myFocus[i].id == that.data.company_id) {
                myFocus[i].level = starNum
              }
            }
            let sortRule = false; //正序倒序

            let newMyFocus = myFocus.sort(that.compare('level', false));
            wx.setStorageSync('myFocus', newMyFocus);
            that.hideContact();
            that.getMyfocusList();
            that.updateFocusMe(that.data.company_id);
          } else {
            that.getMyfocusList();
            that.updateFocusMe(that.data.company_id);
          }
        }else{
          that.getMyfocusList();
          that.updateFocusMe(that.data.company_id);
        }
        
      }

    })
  },
  compare(property, bol) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (bol) {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
    }
  },
  getMyfocusList: function() {
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllCompany', {
      limit: 5000,
      start: this.data.startMyfocus,
      key: this.data.key
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        // var obj = this.data.myFocusGroupArray.concat(res.data);
        var  obj = res.data;
        for (let i in obj) {
          //添加数据
          obj[i].status = 1;
          obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
          this.getMyFocusUser(obj, obj[i].id);
        }
      }
    })
  },
  getMyFocusUser(obj, id) {
    var that = this;

    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {
          obj[i].focusList = res.data
        }
      }
      wx.setStorageSync('myFocus', obj)
      that.setData({
        myFocusGroupArray: obj
      });
    })
  },
  getFocusmeList: function () {
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllCompany', {
      limit: 5000,
      start: this.data.startfocusme,
      key: this.data.key
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        // var obj = this.data.focusMeGroupArray.concat(res.data);
        var obj = res.data;
        console.log(obj);
        for (let i in obj) {
          //添加数据
          obj[i].status = 1;
          obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
          this.getFocusMeUser(obj, obj[i].id);
        }
      }
    })
  },

  getFocusMeUser(obj, id) {
    var that = this;
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {
          obj[i].focusList = res.data
        }
      }

      wx.setStorageSync('focusMe', obj);
      that.setData({
        focusMeGroupArray: obj
      });
    })
  },
  content_showmore: function() {
    if (this.data.content_height == false) {
      this.setData({
        content_height: true,
        content_text: "收起"
      })
    } else {
      this.setData({
        content_height: false,
        content_text: "查看更多"
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //创建节点选择器
    var that = this;
    this.toast = this.selectComponent("#toast");
    if (!wx.getStorageSync('focusMe')) {
      this.getFocusmeList();
    } 
  },
  getInfo: function() {
    var that = this;
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'companyId': this.data.company_id,
      'limit': 4,
      'type': 2,
      'start': 0
    }, "post", true).then(res => {
      // console.log(res);
      res.data.forEach(item => {
        item.createTime = time.formatTimeTwo(item.createTime / 1000, 'Y-M-D');
      })
      that.setData({
        productInfoArray: res.data
      })
    })
  },
  getLists: function() {
    var that = this;
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'companyId': this.data.company_id,
      'limit': 4,
      'type': 1,
      'start': 0
    }, "post", true).then(res => {
      // console.log(res);
      res.data.forEach(item => {
        item.createTime = time.formatTimeTwo(item.createTime / 1000, 'Y-M-D');
      })
      that.setData({
        companyCaseArray: res.data
      })
    })
  },
  getNews: function() {
    var that = this;
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'companyId': this.data.company_id,
      'limit': 4,
      'type': 3,
      'start': 0
    }, "post", true).then(res => {

      res.data.forEach(item => {
        item.createTime = time.formatTimeTwo(item.createTime / 1000, 'Y-M-D');
      })
      that.setData({
        InformationArray: res.data
      })
    })
    console.log(that);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(op) {

    // 公司详情
    var that = this;
    //产品资料
    console.log('onshow' + this.data.company_id);
    this.getInfo()
    //案例
    this.getLists()
    //新闻
    this.getNews();
    // token 过期
    wx.request({
      url: app.globalData.url + '/weixin/api/open/user/jFindByToken',
      data: {},
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.success && res.msgType == 1) {
          that.setData({
            isLogin: false
          })
        } else {
          that.setData({
            isLogin: true
          })
        }
      }
    })

    that.getMyJoinedAssociation();

  },

  getMyJoinedAssociation() {
    reqpost(app.globalData.url, '/weixin/api/accept/association/jFindPdSocietyMemberByUserId', {
      companyId: this.data.company_id
    }, 'post', true).then(res => {
      console.log(res);
      if (res.success && res.data !== null && res.data.status == 1) {

        this.setData({
          association: res.data
        })

        reqpost(app.globalData.bastUrl, '/company/jFind', {
          'id': res.data.societyCompanyId
        }, "post", true).then(res => {
          console.log(res);
          this.setData({
            isAssociation: true,
            society: res.data
          })
        })

        wx.setStorageSync('myJoinedAssociation', res.data);
      }
      if (res.data === null) {
        this.setData({
          isAssociation: false
        })
      }
    })
  },
  toAddFluence() {
    wx.navigateTo({
      url: '/pages/home/employers/employers?type=1',
    })
  },
  // clipImage: function (src, imgW, imgH, cb) {

  //   // ‘canvas’为前面创建的canvas标签的canvas-id属性值
  //   let ctx = wx.createCanvasContext('canvas');
  //   let canvasW = 640,
  //     canvasH = imgH;

  //   if (imgW / imgH > 5 / 4) {
  //     canvasW = imgH * 5 / 4;
  //   }

  //   // 将图片绘制到画布
  //   ctx.drawImage(src, (imgW - canvasW) / 2, 0, canvasW, canvasH, 0, 0, canvasW, canvasH)
  //   // draw()必须要用到，并且需要在绘制成功后导出图片
  //   ctx.draw(false, () => {
  //     setTimeout(() => {
  //       // 导出图片
  //       wx.canvasToTempFilePath({
  //         width: canvasW,
  //         height: canvasH,
  //         destWidth: canvasW,
  //         destHeight: canvasH,
  //         canvasId: 'canvas',
  //         fileType: 'jpg',
  //         success: (res) => {
  //           // res.tempFilePath为导出的图片路径
  //           typeof cb == 'function' && cb(res.tempFilePath);
  //         }
  //       })
  //     }, 1000);
  //   })
  // },
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
    var that = this;
    console.log(that.data.company_id)
    // this.setData({
    //   shareCoverViewStatus: true,
    // })
    console.log(this.data.cardShows)
    if (this.data.cardShows) {
      return {
        title: '高端商务人士的选择',
        path: '/pages/home/companyDetail/companyDetail?company_id=' + that.data.company_id + '&card=1&from=focus&formType=1&user_Id=' + this.data.user_Id + '&be=share',
        imageUrl: this.data.imgSrc,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    } else {
      return {
        title: this.data.companyData.name,
        imageUrl: this.data.imgSrc,
        path: '/pages/home/companyDetail/companyDetail?company_id=' + that.data.company_id + '&from=focus&formType=1&user_Id=' + this.data.user_Id + '&be=share',
        //imageUrl: this.data.share_logo,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }
  },
  //分享按钮
  shareBtnAction: function() {
    this.setData({
      shareCoverViewStatus: false
    })

  },
  // 关闭遮罩层
  coverViewCloseAction: function() {
    this.setData({
      shareCoverViewStatus: true
    })
  },
  back: function() {
    console.log(this.data.formType);

    if (this.data.formType == 1 || this.data.cardShows) {
      wx.navigateTo({
        url: '/pages/home/home/home'
      })
    } else {
      wx.navigateBack()
    }
  },
  // 影响力
  influence() {
    console.log(this);
    this.showInfluence();

  },
  // 跳转到公司等级链接
  PushToCompanyLVAction: function() {
    var that = this;
    if (that.data.companyData.level) {
      this.toast.showToast(100, 130, "该公司评分为" + that.data.companyData.level);
    }
    /*
    wx.showToast({
      title: "该公司评分为" + that.data.companyData.level,//提示文字
      duration: 2000,//显示时长
      mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'none', //图标，支持"success"、"loading"  
      success: function () { },//接口调用成功
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
    })*/
  },




  // 案例详情
  PushToCaseDetail: function(e) {

    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&company_id=" + company_id + '&type=' + type
    })

  },
  shareAction: function() {
    console.log("AAA");

  },
  //跳转产品详情
  PushToProductDetail: function(e) {
    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&company_id=" + company_id + '&type=' + type
    })
  },

  //跳转到公司详情分享页
  pushToCompanyDetail_share: function() {
    var remindTitleString = this.data.company_id;

    wx.navigateTo({
      url: '/pages/home/companyDetail_share/companyDetail_share?pageFrom=company&user_id=' + remindTitleString
    })
  },
  pushCard: function() {
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?card=1&company_id=' + this.data.company_id + '&be=share'
    })
  },
  //是否跳转到完善个人信息页面
  wsgrxx: function() {
    var that = this;
    wx.showModal({
      title: '',
      content: '完善信息,成就你我',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: '#000000', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: '#000000', //确定文字的颜色
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          console.log('no')
        } else {
          //点击确定
          var user_account = JSON.stringify(that.data.userInfoDataDic);

          wx.navigateTo({
            url: '/pages/userCenter/registration/registration'
          })

        }
      },
      fail: function(res) {}, //接口调用失败的回调函数
      complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  applyFor(e) {
    console.log('申请加入协会');
    // 弹窗
    this.showEmPopup();
  },

})