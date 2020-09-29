const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
const config = require('../../../utils/config.js');
var time = require('../../../utils/util.js');

var new_scroll = 0,
  last_scroll, i = true;
Page({
  data: {
    //是否需要注册标识out_banner
    userReg_BOOL: "",
    //图片根路径
    baseImageUrl: "",
    //用户ID
    USER_ID: "",
    //banner图片数组
    bannerUrlArray: [],
    bannerUrlArray1: [],
    bannerUrlArray8: [],
    bannerUrlArray9: [],
    //推荐公司数组
    recomendCompanyArray: "",
    //关注公司企业咨询
    focusCompanyNewsArray: "",
    focusCompanyNewsArray_1: "",

    //关注公司企业咨询
    myFocusGroupArray: "",
    // 精选数组
    choicenessArray: [],
    myFocusGroupArray_1: [],
    // 我的客户群下面 关注企业星级
    focusCompanyArray: [],
    //关注企业
    closeImg: 'https://file.qosoo.cn/files/20191021/home/25@2x.png',
    openImg: 'https://file.qosoo.cn/files/20191021/home/42@2x.png',
    isShow: 0,
    companyArray: [],
    publicizewidely: [],
    publicizewidely2: [],
    // 推荐公司是否关注
    isFocused: "N",
    follow: true,
    starShow: true,
    followActive: false,
    imgArray: [{
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        id: 1
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        id: 2
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        id: 3
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        id: 4
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        id: 5
      }
    ],
    ljgz_id: "",
    userInfoDataDic: "",
    title: "智慧微秘",
    defaultCompanyId: '100000068',
    companyId: 0,
    focusType: 0,
    currentTab: 0,
    navScrollLeft: 0,
    newLists: [],
    myFocusGroupNewLists: [],
    listType: 1,
    city: '',
    exhibitionStart: 0,
    exhibitionlist: [],
    meetStart: 0,
    meetlist: [],
    focusStart: 0,
    jfindStart: 0,
    tabBarShow: false,
    navigatorArr: [{
        id: 1,
        url: '../selectionOfPrivate/selectionOfPrivate',
        image: 'https://file.qosoo.cn/files/20191122/home/private.png',
        text: '精选推荐',
      },
      {
        id: 2,
        url: '../hotHeadlines/hotHeadlines',
        image: 'https://file.qosoo.cn/files/20191122/home/top-line.png',
        text: '行业商讯',
      },
      {
        id: 3,
        url: '../exhibition/exhibition',
        image: 'https://file.qosoo.cn/files/20191122/home/exhibition.png',
        text: '展会活动'
      },
      {
        id: 4,
        url: '../summits/summits',
        image: 'https://file.qosoo.cn/files/20191122/home/summit.png',
        text: '峰会论坛'
      },
      {
        id: 5,
        url: '../employers/employers',
        image: 'https://file.qosoo.cn/files/20191122/home/assoc.png',
        text: '协会资源',
        type: 1
      },
      {
        id: 6,
        url: '../employers/employers',
        image: 'https://file.qosoo.cn/files/20191122/home/enterprise_service.png',
        text: '财务法律',
        type: 2
      },
      {
        id: 7,
        url: '../employers/employers',
        image: 'https://file.qosoo.cn/files/20191122/home/finance.png',
        text: '投融资',
        type: 3
      },
      {
        id: 8,
        url: '../employers/employers',
        image: 'https://file.qosoo.cn/files/20191122/home/it.png',
        text: '互联网+',
        type: 4
      },
    ],
    searchList: [{
        title: '企搜·精准搜',
        currentTab: 3
      }, {
        title: '找 公 司',
        currentTab: 0
      },
      {
        title: '找 产 品',
        currentTab: 1
      },
      {
        title: '找 人',
        currentTab: 2
      },

    ],
  },

  parserQRCode: function(qrcontent) {
    var _this = this
    wx.request({
      url: qrcontent,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if (res.data.success) {
          // this.setData({
          //   companyId: res.data.companyId
          // })
          if (res.data.data.code == 'QR0008' || res.data.data.code == 'QR0009') {
            var focusType = 0
            if (res.data.data.code == 'QR0008') focusType = 1

          } else {
            var code = qrcontent.replace('open', 'accept/scan');
            _this.getOther(code)
          }

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

  getOther: function(code) {
    var _this = this
    wx.request({
      url: code + '&token=' + wx.getStorageSync('TOKEN'),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)

        wx.showToast({
          title: res.data.data,
          icon: 'none',
          duration: 2000
        })
        if (res.data.success === false && res.data.msgType === 1) {

          wx.redirectTo({
            url: '/pages/public/userAuthStatus/userAuthStatus'
          })

        }

        // }
      }
    })
  },
  //接入数据
  onLoad: function(options) {
    var user_id_value = wx.getStorageSync('user_id')
    var _this = this
    console.log("首页拿到存储的USER_ID" + user_id_value);
    console.log(options);
    this.setData({
      baseImageUrl: app.globalData.bastUrl,
      USER_ID: user_id_value,
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        if (res.model.indexOf('X') > -1) {
          _this.setData({
            showX: true,
            paddingTop: '184',
            windowHeight: res.windowHeight
          })
        } else {
          _this.setData({
            showX: false,
            paddingTop: '148',
            windowHeight: res.windowHeight
          })
        }
      },
    })

    var qrcontent = null;
    if (options.q !== undefined) {
      qrcontent = decodeURIComponent(options.q);
      //获取二维码信息
      this.parserQRCode(qrcontent)
    }




    this.setData({
      // currentTab: options.type || 0,
      currentTab: 0,
      listType: options.type - 1 || 1,
    })

    if (options.city) {
      this.setData({
        city: options.city,
      })
    }
    

  },
  lottery() {
    wx.navigateTo({
      url: '/pages/call/lotto/lotto',
    })
  },


  //展会会议逻辑结束

  getCompanyInfo: function() {
    var that = this;
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      id: that.data.companyId
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        var companyname = res.data.simpleName || res.data.name
        if (companyname.length > 6) {
          companyname = companyname.slice(0, 6)
        }
        that.setData({
          title: companyname,
        })

      }
    })
  },

  /**
   *  页面显示
   */
  onShow: function() {
    //精选
    this.newJfind()
    // // 焦点快讯
    //this.focusList()
    var _this = this;
    if (wx.getStorageSync('mycompanyId') <= 0) {
      console.log('conpany_id              : ' + wx.getStorageSync('mycompanyId'));

    } else {
      this.setData({
        companyId: wx.getStorageSync('mycompanyId')
      })
      console.log('获取公司信息' + wx.getStorageSync('mycompanyId'));
      this.getCompanyInfo()
    }

    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 8
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          bannerUrlArray8: res.data,
        })
      }
    })

    // 推荐公司 
    reqpost(app.globalData.bastUrl, '/company/jFindAll', {
      // 'userId': this.data.USER_ID,
      start: 0,
      status: 2,
      focus: false
    }, "post", true).then(res => {

      this.setData({
        recomendCompanyArray: res.data,
      })
    })
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      position: 3
    }, "post", true).then(res => {
      // console.log(res, "广告");
      this.setData({
        publicizewidely: res.data,
      })
      var timestamp = _this.data.publicizewidely;
      for (var i = 0; i < timestamp.length; i++) {
        timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, "M-D");
      }
      this.setData({
        publicizewidely: timestamp
      })
    })
  },
  localFlat: function(arr) {
    return arr.reduce((acc, val) => acc.concat(val), [])
  },
  newJfind: function() {
    let now = (new Date).getTime();
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      start: this.data.jfindStart,
      status: '1,2',
      // 'type': 3,
      limit: 17
    }, "post", true).then(res => {
      console.log(res);
      if (res.data.length == 0) return
      var list = this.localFlat(this.data.choicenessArray).concat(res.data)

      for (var i = 0; i < list.length; i++) {
        // if (typeof (list[i].createTime*1) == Number) {
        list[i].createTimes = time.formatTimeTwo(list[i].createTime / 1000, "M-D", now);
        // }
        if (list[i].status == 1) {
          list[i].recommend = '';
        } else if ((list[i].status == 2)) {
          list[i].recommend = '精选';
        } else {
          list[i].recommend = '普通';
        }
      }
      var result = [];
      for (var i = 0; i < list.length; i += 5) {
        result.push(list.slice(i, i + 5));
      }
      this.setData({
        choicenessArray: result,
      })
      console.log(result)
      this.midBanner()
    })
  },

  midBanner: function() {
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 2
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        var list = this.data.choicenessArray
        var newList = [];
        console.log(list);

        for (var i = 0; i < list.length; i++) {
          var item = {
            list: list[i],
            image: res.data[i] || ''
          }
          newList.push(item)
        }
        console.log(newList)
        this.setData({
          newLists: newList
        })
      }
    })
  },

  goLists: function() {
    wx.navigateTo({
      url: "/pages/home/lists/lists"
    })
  },
  //banner跳转

  tolist: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.linkurl
    })
  },

  navToPage(e) {

    let id = e.currentTarget.dataset.id;
    var url = this.data.navigatorArr[id - 1].url;
    var title = this.data.navigatorArr[id - 1].text;
    var type = this.data.navigatorArr[id - 1].type; //下面的4个广告
    if (id != 1) {
      wx.navigateTo({
        url: url + '?title=' + this.data.title + '&nav_title=' + title + '&type=' + type,
      })
    } else {
      console.log(1);
      wx.pageScrollTo({
        duration: 300,
        selector: '#article',
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(res);
        },
        complete(res) {
          console.log(res);
        }
      })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "商业智慧专家",
      path: '/pages/home/home/home',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  toSecretary() {
    wx.navigateTo({
      url: '/pages/secretary/secretary'
    })
  },


  // 跳转到案例详情
  PushToCaseDetail: function(e) {

    // 拿到跳转分类
    var that = this;
    var itemtypeTemp = e.currentTarget.dataset.type;
    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid;

    //type 1 为案例 2 产品 3资讯
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id + "&form=" + this.data.currentTab
    })
  },
  // 跳转到搜索
  pushToSearchPage: function() {
    wx.navigateTo({
      url: '/pages/home/search/search'
    })
  },
  // 跳转到我的客户群
  pushToFocusCompany: function(e) {
    wx.navigateTo({
      url: '/pages/home/myCustomerGroup/myCustomerGroup?index=0'
    })

  },

  // 跳转到公司详情
  pushToCompanyDetail: function(e) {
    var company_id = e.currentTarget.dataset.id;
    var source; //来源 
    console.log('传值公司ID' + company_id);
    var that = this;
    //console.log(this.data.userInfoDataDic)
    // 没有公司id ，展示qosoo
    if (company_id <= 0) {

      //获取个人公司id
      // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {}, "post", true).then(res => {
      //   //console.log(res);
      //   if (res.success) {
      //     this.setData({
      //       companyId: res.data.companyId,

      //     })
      //     wx.setStorageSync('mycompanyId', res.data.companyId)
      //     // this.getCompanyInfo()
      //     wx.navigateTo({
      //       url: '/pages/home/companyDetail/companyDetail?company_id=' + res.data.companyId
      //     })
      //   }
      // })

      company_id = wx.getStorageSync('mycompanyId') ? wx.getStorageSync('mycompanyId') : that.data.defaultCompanyId;
      //source = 0; //默认公司的官网
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=0'
      })
    } else {

      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=1'
      })
    }




    // if (!this.data.userInfoDataDic.account) {
    //   wx.navigateTo({
    //     url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    //   })
    //   //that.wsgrxx();
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    //   })
    // }

  },
  //是否跳转到完善个人信息页面
  wsgrxx: function() {

    wx.navigateTo({
      url: '/pages/userCenter/userCenter/emptyUserCenter'
    })
    /*
    var that = this;
    wx.showModal({
      title: '',
      content: '高效工作好秘书',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: '#000000',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: '#000000',//确定文字的颜色
      success: function (res) {
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
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
    */
  },


  //扫码
  scanCode: function() {
    console.log(1);
    var that = this
    wx.scanCode({
      success: function(res) {
        console.log('扫码结果' + JSON.stringify(res));
        //扫码成功

        // that.parserQRCode(res.result);

        wx.navigateTo({
          url: '/pages/home/companyDetail/companyDetail?q=' + encodeURIComponent(res.result) + '&source=scan'
        })

      },
      fail: function(res) {
        // wx.showToast({
        //   title: "扫码失败！" + res.result
        // })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('currentTab', this.data.currentTab);
    this.setData({
      jfindStart: this.data.jfindStart += 17,

    })
    this.newJfind()

  },
  onHide: function(e) {
    clearTimeout(this.timer);
  },

  /**
   * onPageScroll
   * 监听用户滑动页面事件。
   */

  onPageScroll: function(e) {
    var that = this;
    last_scroll = e.scrollTop;
    if (!i) {
      return
    };
    i = false;
    if (that.timer) {
      clearTimeout(that.timer);
    }
    var query = wx.createSelectorQuery();
    query.select('#plate').boundingClientRect();
    query.selectViewport().scrollOffset(); //用于获取显示区域的尺寸、滚动位置等信息
    query.exec(function(res) {
      if (res[0].top < 0) {
        if (new_scroll < last_scroll) {
          that.timer = setTimeout(function() {
            i = true;
            that.setData({
              tabBarShow: true
            })
          }, 100)
        } else {
          that.timer = setTimeout(function() {
            i = true;
            that.setData({
              tabBarShow: false
            })
          }, 100)
        }
        new_scroll = last_scroll;
      } else {
        i = true;
      }
    });
  }

})