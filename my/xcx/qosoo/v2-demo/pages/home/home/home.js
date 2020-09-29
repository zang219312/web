const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
const config = require('../../../utils/config.js');
var time = require('../../../utils/util.js');


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
    bannerUrlArray8:[],
    bannerUrlArray9:[],
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
    companyArray: [

    ],
    publicizewidely: [],
    publicizewidely2: [],
    // 推荐公司是否关注
    isFocused: "N",
    follow: true,
    starShow: true,
    followActive: false,
    imgArray: [
      {
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
    companyId: 0,
    focusType: 0,
    navData: [
      {
        text: '精选私讯'
      },
      {
        text: '热点头条'
      },
      {
        text: '展会商讯'
      },
      {
        text: '峰会论坛'
      }
      
    ],
    currentTab: 0,
    navScrollLeft: 0,
    newLists:[],
    myFocusGroupNewLists:[],
    listType: 1,
    city: '',
    exhibitionStart: 0,
    exhibitionlist: [],
    meetStart: 0,
    meetlist: [],
    focusStart:0,
    jfindStart:0
  },
  // saoma:function(){
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success(res) {
  //       console.log(res)
  //     }
  //   })
  // },
  parserQRCode: function (qrcontent) {
    var _this = this
    wx.request({
      url: qrcontent,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.success) {
          // this.setData({
          //   companyId: res.data.companyId
          // })
          if (res.data.data.code == 'QR0008' || res.data.data.code == 'QR0009') {
            var focusType = 0
            if (res.data.data.code == 'QR0008') focusType = 1

          } else  {
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
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
      if (cur == 2) {
        this.setData({
          choicenessArray:[],
          myFocusGroupArray_1:[],
          meetlist: [],
          exhibitionStart: 0,
          focusStart: 0,
          jfindStart: 0,
          listType:1
        })
        this.getExhibitionlist()
      } else if (cur == 3) {
        this.setData({
          choicenessArray: [],
          myFocusGroupArray_1: [],
          exhibitionlist: [],
          meetStart: 0,
          focusStart: 0,
          jfindStart: 0,
          listType: 2
        })
        this.getMeetlist()
      } else if (cur == 0) {
        this.setData({
          myFocusGroupArray_1: [],
          exhibitionlist: [],
          meetlist: [],
          choicenessArray: [],
          exhibitionStart: 0,
          meetStart: 0,
          focusStart: 0
        })
        this.newJfind()
      } else if (cur == 1) {
        this.setData({
          choicenessArray: [],
          exhibitionlist: [],
          meetlist: [],
          myFocusGroupArray_1:[],
          meetStart: 0,
          exhibitionStart: 0,
          jfindStart: 0,
        })
        this.focusList()
      }

    }
  },
  getOther:function(code){
    var _this = this
    wx.request({
      url: code + '&token=' + wx.getStorageSync('TOKEN'),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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
  onLoad: function (options) {
    var user_id_value = wx.getStorageSync('user_id')
    var _this = this

    // console.log("首页拿到存储的USER_ID" + user_id_value);
    this.setData({
      baseImageUrl: app.globalData.bastUrl,
      USER_ID: user_id_value,
    })




    var qrcontent = null;
    if (options.q !== undefined) {
      qrcontent = decodeURIComponent(options.q);
      // console.log(qrcontent);
      //获取二维码信息
      this.parserQRCode(qrcontent)
      // wx.navigateTo({
      //   url: '/pages/home/companyDetail/companyDetail?q=' + options.q
      // })

    }


    this.setData({
      currentTab: options.type||0,
      listType: options.type-1 || 1,
    })

    if (options.city) {
      this.setData({
        city: options.city,
      })
      if (this.data.currentTab == 2) {
        this.getExhibitionlist()  //展会列表
        this.setData({
          listType: 1
        })
      } else if (this.data.currentTab ==3) {
        this.setData({
          listType: 2
        })
        this.getMeetlist() //会议列表
        
      }
    } else {
      this.getLocation()
    }
    // console.log(wx.getStorageSync('usercheck'), "我的天")
    // if (wx.getStorageSync('usercheck') == 0) {
    //   //判断是从分享进入还是正常进入
    //   if (options.companyShare || options.caseShare || options.QRCodeShare || options.product_id || options.companyShareShare){
    //     wx.redirectTo({
    //       url: '/pages/public/userAuthStatus/userAuthStatus?companyShare=' + options.companyShare + "&caseShare=" + options.caseShare + "&QRCodeShare=" + options.QRCodeShare + "&product_id=" + options.product_id + "&company_id=" + options.company_id +"&companyShareShare=" + options.companyShareShare+"&type="+options.type
    //     })
    //   }else{myFocusGroupArray_1
    //     // if (qrcontent){
    //     //   wx.redirectTo({
    //     //     url: '/pages/public/userAuthStatus/userAuthStatus?key=' + options.q 
    //     //   })
    //     //   return;
    //     // }
    //     // wx.redirectTo({
    //     //   url: '/pages/public/userAuthStatus/userAuthStatus'
    //     // })
    //   }

    //   return
    // } else if (wx.getStorageSync('usercheck') == 1 && wx.getStorageSync('userisReg') == 0) { //已经点过授权按钮了 自动进入首页

    // } else if (wx.getStorageSync('usercheck') == 1 && wx.getStorageSync('userisReg') == 1) {

    // }
    // if (options.companyShare){
    //   wx.navigateTo({
    //     url: '/pages/home/companyDetail/companyDetail?company_id=' + options.companyShare
    //   })
    // } else if(options.caseShare){
    //   wx.navigateTo({
    //     url: '/pages/home/caseDetail/caseDetail?param_id=' + options.caseShare + "&type=" + options.type + "&company_id=" + options.company_id
    //   })
    // } else if(options.QRCodeShare){
    //   wx.navigateTo({
    //     url: '/pages/userCenter/QRCodeShare/QRCodeShare?user_id=' + options.QRCodeShare
    //   })
    // } else if (options.product_id){
    //   wx.navigateTo({
    //     url: '/pages/home/productDetail/productDetail?param_id=' + options.product_id + "&type=" + 2 + "&company_id=" + options.company_id
    //   })
    // } else if (options.companyShareShare){
    //   wx.navigateTo({
    //     url: '/pages/home/companyDetail_share/companyDetail_share?pageFrom=qrcode&user_id=' + options.companyShareShare
    //   })

    // }
    // if (qrcontent){
    // this.parserQRCode(qrcontent);


    // }v
    
  },
  //展会会议逻辑开始
  getLocation: function () {
    // console.log("正在定位城市");

    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => {
            // console.log(res)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            that.setData({
              city: res.data.result.ad_info.city,
            })

            if (that.data.listType == 1) {
              that.getExhibitionlist()  //展会列表
            } else if (that.data.listType == 2) {
              that.getMeetlist() //会议列表
            }

          }
        })

      },
      fail: function (msg) {
        // console.log(msg)
      }
    })
  },
  getExhibitionlist: function () {
    reqpost(app.globalData.bastUrl, '/exhibition/jFindAll', {
      limit: 10,
      start: this.data.exhibitionStart,
      city: this.data.city,
      type: 0
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.exhibitionlist.concat(res.data)
        list.forEach(item => {
          item.create = time.formatTimeTwo(item.createTime / 1000, 'M月D h:m');
          item.start = time.formatTimeTwo(item.startTime / 1000, 'Y.M.D ');
          item.end = time.formatTimeTwo(item.endTime / 1000, 'Y.M.D ');
        })
        // console.log(list)
        this.setData({
          exhibitionlist: list
        })
      }
    })
  },
  getMeetlist: function () {
    reqpost(app.globalData.bastUrl, '/meet/jFindAll', {
      limit: 10,
      start: this.data.meetStart,
      city: this.data.city,
      type: 0
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.meetlist.concat(res.data)
        list.forEach(item => {
          item.create = time.formatTimeTwo(item.createTime / 1000, 'M月D h:m');
          item.start = time.formatTimeTwo(item.startTime / 1000, 'Y.M.D ');
          item.end = time.formatTimeTwo(item.endTime / 1000, 'Y.M.D ');
        })
        // console.log(list)
        this.setData({
          meetlist: list
        })
      }
    })
  },
  goMap: function (e) {
    var id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '/pages/home/lists-map/lists-map?id=' + id
    })
  },
  goHistory: function () {
    wx.navigateTo({
      url: '/pages/home/lists-history/lists-history?listType=' + this.data.listType
    })
  },
  goCity: function () {
    wx.navigateTo({
      url: '/pages/home/lists/lists-city/list-city?city=' + this.data.city + '&listType=' + this.data.listType
    })
  },
  focusItem: function (e) {
    var id = e.currentTarget.dataset.id
    var i = e.currentTarget.dataset.bindex
    // console.log(i)
    var url = '/weixin/api/accept/exhibition/focus'
    if (this.data.listType == 2) {
      url = '/weixin/api/accept/meet/focus'
    }
    reqpost(app.globalData.url, url, {
      id: id
    }, "post", true).then(res => {
      if (res.success) {
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })

        if (this.data.listType == 1) {
          var list = this.data.exhibitionlist
          var focus = list[i].focus
          list[i].focus = focus == 1 ? 0 : 1
          // console.log(list)
          this.setData({
            exhibitionlist: list
          })
          // console.log(this.data.exhibitionlist)
        } else if (this.data.listType == 2) {
          var list = this.data.meetlist
          var focus = list[i].focus
          list[i].focus = focus == 1 ? 0 : 1
          this.setData({
            meetlist: list
          })
        }

      }
    })

  },
  changType: function (e) {
    var type = e.currentTarget.dataset.type
    this.setData({
      listType: type
    })
    if (type == 1) {
      this.setData({

        meetlist: [],
        exhibitionStart: 0
      })
      this.getExhibitionlist()
    } else if (type == 2) {
      this.setData({
        exhibitionlist: [],
        meetStart: 0
      })
      this.getMeetlist()
    }
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/lists-detail/lists-detail?id=' + id + '&listType=' + this.data.listType
    })
  },
//展会会议逻辑结束

  getCompanyInfo: function () {
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      id: this.data.companyId
    }, "post", true).then(res => {
      if (res.success) {
        var companyname = res.data.simpleName || res.data.name
        if (companyname.length > 6) {
          companyname = companyname.slice(0, 6)
        }
        this.setData({
          title: companyname
        })

      }
    })
  },
  onShow: function () {
    //精选
    this.newJfind()
    // // 焦点快讯
    this.focusList()
    var _this = this;



    
    if (wx.getStorageSync('mycompanyId') <= 0) {

      
    } else {
      this.setData({
        companyId: wx.getStorageSync('mycompanyId')
      })
      this.getCompanyInfo()
    }

    // 获取banner图片
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 1
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerUrlArray: res.data,
        })
      }
    })


    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 8
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerUrlArray8: res.data,
        })
      }
    })


    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 9
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerUrlArray9: res.data,
        })
      }
    })



    

    
    // reqpost(app.globalData.bastUrl, '/news/jFindAll', {
    //   'start': 0,
    //   'status': 0,
    //   'limit': 17
    // }, "post", true).then(res => {
      

    //   var timestamp = res.data; //_this.data.myFocusGroupArray_1;
    //   var news = new Array();
    //   for (var i = 0; i < timestamp.length; i++) {
    //     timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, 'M-D');
    //     if (timestamp[i].type == 1) {
    //       timestamp[i].recommend = '案例';
    //     } else if (timestamp[i].type == 2) {
    //       timestamp[i].recommend = '产品';
    //     } else {
    //       timestamp[i].recommend = '';
    //     }
    //     //if (timestamp[i].type == 3 && timestamp[i].status == 0){
    //     news.push(timestamp[i]);
    //     //}
    //   }
    //   var result = [];
    //   for (var i = 0; i < news.length; i += 5) {
    //     result.push(news.slice(i, i + 5));
    //   }
    //   this.setData({
    //     myFocusGroupArray_1: result
    //   })
    //   this.midBannerHOT()

    // })

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

    
    // reqpost(app.globalData.bastUrl, '/news/jFindAll', {
    //   'start': 0,
    //   'status': 2,
    //   // 'type': 3,
    //   'limit': 17
    // }, "post", true).then(res => {
    //   for (var i = 0; i < res.data.length; i++) {
    //     res.data[i].createTime = time.formatTimeTwo(res.data[i].createTime / 1000, "M-D")
    //     if (res.data[i].status == 1) {
    //       res.data[i].recommend = '推荐';
    //     } else if ((res.data[i].status == 2)) {
    //       res.data[i].recommend = '精选';
    //     } else {
    //       res.data[i].recommend = '普通';
    //     }
    //   }
    //   var result = [];
    //   for (var i = 0; i < res.data.length; i += 5) {
    //     result.push(res.data.slice(i, i + 5));
    //   }
      
    //   this.setData({
    //     choicenessArray: result,
    //   })
    //   this.midBanner()
    // })
    // 广告
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

    // 广告
    // reqpost(app.globalData.bastUrl, '/adverts/list', {
    //   pageNo: 1,
    //   pageSize: 3,
    //   showType: 2
    // }, "post", true).then(res => {
    //   console.log(res, "广告");
    //   this.setData({
    //     publicizewidely2: res.rows,
    //   })
    //   var timestamp = _this.data.publicizewidely2;
    //   for (var i = 0; i < timestamp.length; i++) {
    //     timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, "M-D");
    //   }
    //   this.setData({
    //     publicizewidely2: timestamp
    //   })
    // })
  },
  localFlat:function (arr){ 
    return arr.reduce((acc, val) => acc.concat(val), []) 
  },
  newJfind:function(){
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'start': this.data.jfindStart,
      'status': '1,2',
      // 'type': 3,
      'limit': 17
    }, "post", true).then(res => {
      if (res.data.length == 0) return
      var list = this.localFlat(this.data.choicenessArray).concat(res.data)
      for (var i = 0; i < list.length; i++) {
        // if (typeof (list[i].createTime*1) == Number) {
        list[i].createTimes = time.formatTimeTwo(list[i].createTime / 1000, "M-D")
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
  focusList:function(){
    // 焦点快讯
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'start': this.data.focusStart,
      'status': 0,
      'limit': 17
    }, "post", true).then(res => {

      if (res.data.length ==0) return

      var timestamp = this.localFlat(this.data.myFocusGroupArray_1).concat(res.data)
      for (var i = 0; i < timestamp.length; i++) {
        // if (typeof(timestamp[i].createTime*1) == Number){
        timestamp[i].createTimes = time.formatTimeTwo(timestamp[i].createTime / 1000, 'M-D');
        // }
        if (timestamp[i].type == 1) {
          timestamp[i].recommend = '案例';
        } else if (timestamp[i].type == 2) {
          timestamp[i].recommend = '产品';
        } else {
          timestamp[i].recommend = '';
        }
        //if (timestamp[i].type == 3 && timestamp[i].status == 0){
        //}
      }
      // console.log(timestamp)
      var result = [];
      for (var i = 0; i < timestamp.length; i += 5) {
        result.push(timestamp.slice(i, i + 5));
      }
      // console.log(result)
      this.setData({
        myFocusGroupArray_1: result
      })
      this.midBannerHOT()

    })
  },
  midBanner:function(){
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 2
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.choicenessArray
        var newList = []
        for(var i=0;i<list.length;i++){
          var item = {
            list : list[i],
            image: res.data[i]||''
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
  midBannerHOT: function () {
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 2
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.myFocusGroupArray_1
        var newList = []
        for (var i = 0; i < list.length; i++) {
          var item = {
            list: list[i],
            image: res.data[i] || ''
          }
          newList.push(item)
        }
        // console.log('头条'+newList)
        this.setData({
          myFocusGroupNewLists: newList
        })
      }
    })
  },
  //广告跳转
  out: function (e) {
    // console.log(e.currentTarget.dataset.linktype)
    if (e.currentTarget.dataset.linktype == 1) {
      wx.navigateTo({
        url: '/pages/out/out?guangao=' + e.currentTarget.dataset.linkurl
      })
    } else if (e.currentTarget.dataset.linktype == 0) {
      wx.navigateTo({
        url: "/pages/public/ganggaoxq/ganggaoxq?xq=" + e.currentTarget.dataset.id
      })
    }

  },
  goLists: function () {
    wx.navigateTo({
      url: "/pages/home/lists/lists"
    })
  },
  //banner跳转
  out_banner: function (e) {
    // console.log(e.currentTarget.dataset.type, e.currentTarget.dataset.linkurl)
    if (e.currentTarget.dataset.type == 2 && e.currentTarget.dataset.linkurl != "") {
      wx.navigateTo({
        url: '/pages/out/out?guangao=' + e.currentTarget.dataset.linkurl
      })
    } else if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: "/pages/public/ganggaoxq/ganggaoxq?banner_xq=" + e.currentTarget.dataset.id
      })
    }

  },
  tolist: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.linkurl
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
  //取消关注人和公司
  unfollow: function (e) {
    var that = this;
    var youid = e.currentTarget.dataset.youid;
    wx.showModal({
      title: '提示',
      content: '是否要取消关注？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          //console.log('取消关注时向后台传' + that.data.starLevel);
          //已经关注转换为未关注，数据不全
          req(app.globalData.bastUrl, '/focusCompany/focusUser', {
            'myId': that.data.USER_ID,
            'youId': youid,
            'level': -1,
          }, "GET", true).then(res => {
            console.log(res);
            that.onShow()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  link_company: function () {
    //console.log(this.data.userInfoDataDic);
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + this.data.userInfoDataDic.companyId
    })
  },
  toSecretary() {
    wx.navigateTo({
      url: '/pages/secretary/secretary'
    })
  },
  toSecretaryType() {
    wx.navigateTo({
      url: '/pages/secretary/serviceType/serviceType'
    })
  },
  //关注企业
  boxShowFun: function (e) {


    var that = this;
    //console.log(e);
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status; //1
    console.log(id + ',' + status)
    var obj = that.data.myFocusGroupArray;
    console.log(obj)
    //for (var i in obj) {  var和let一样
    for (let i in obj) {
      if (obj[i].companyId == id) { //只有点击的才是true
        obj[i].status = obj[i].status + 1; //第1次点击stutas的值是2，第2次点击stutas的值是3，第3次点击stutas的值是4，第4次点击stutas的值是5
        if (obj[i].status % 2 == 0) {
          obj[i].imgUrl = that.data.openImg
        } else {
          obj[i].imgUrl = that.data.closeImg
        }
      }
    }
    that.setData({ //改变status的值
      myFocusGroupArray: obj
    });

  },

  /*************  页面跳转  *****************/
  // 跳转到用户中心
  pushToUserCenter: function () {
    // console.log("跳转标识:" + this.data.userReg_BOOL);
    // if (this.data.userReg_BOOL == "yes"){
    //   wx.redirectTo({
    //     url: '/pages/public/userAuthStatus/userAuthStatus'
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/userCenter/userCenter/userCenter'
    //   })
    // }
    if (!this.data.userInfoDataDic.account) {
      wx.navigateTo({
        url: '/pages/userCenter/userCenter/emptyUserCenter'
      })
    } else {
      wx.navigateTo({
        url: '/pages/userCenter/userCenter/userCenter'
      })

    }
  },

  // 跳转到产品详情
  // PushToProductDetail:function(){

  //   if (this.data.userReg_BOOL == "yes") {
  //     wx.redirectTo({
  //       url: '/pages/public/userAuthStatus/userAuthStatus'
  //     })
  //   } else {
  //     wx.navigateTo({
  //       url: '/pages/home/productDetail/productDetail'
  //     })
  //   }
  // },
  // 跳转到案例详情
  PushToCaseDetail: function (e) {
    // if (this.data.userReg_BOOL == "yes") {
    //   wx.redirectTo({
    //     url: '/pages/public/userAuthStatus/userAuthStatus'
    //   })
    //   return;
    // }
    // 拿到跳转分类
    var that = this;
    var itemtypeTemp = e.currentTarget.dataset.type;
    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid;
    console.log(e.currentTarget)

    //if (!this.data.userInfoDataDic.account) {
    //  that.wsgrxx();
    //}else {
    //type 1 为案例 2 产品 3资讯
    // if (itemtypeTemp == 2) {
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id + "&form=" + this.data.currentTab
    })
    // } else if (itemtypeTemp == 1) {
    //   wx.navigateTo({
    //     url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id
    //   })
    // } else { // 这个地方是因为精选没传type类型，暂时先进去
    //   wx.navigateTo({
    //     url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=" + itemtypeTemp + "&company_id=" + company_id
    //   })
    // }  
    //}


  },
  // 跳转到搜索
  pushToSearchPage: function () {
    wx.navigateTo({
      url: '/pages/home/search/search'
    })
  },
  // 跳转到我的客户群
  pushToFocusCompany: function (e) {
    wx.navigateTo({
      url: '/pages/home/myCustomerGroup/myCustomerGroup?index=0'
    })

  },
  // 跳转到 关注更多
  FocusMoreAction: function () {
    wx.navigateTo({
      url: '/pages/home/focusMore/focusMore'
    })
  },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    //console.log('传值公司ID' + company_id);
    var that = this;
    // console.log(this.data.userInfoDataDic)
    if (company_id <= 0){ 

    //获取个人公司id
      reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {

      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          this.setData({
            companyId: res.data.companyId,

          })
          wx.setStorageSync('mycompanyId', res.data.companyId)
            // this.getCompanyInfo()
            wx.navigateTo({
              url: '/pages/home/companyDetail/companyDetail?company_id=' + res.data.companyId
            })
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
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
  wsgrxx: function () {

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
  //跳转到精选列表
  pushToChoicenessAction: function () {
    wx.navigateTo({
      url: '/pages/home/choiceness/choiceness'
    })
  },
  /****** 打电话、发短信、发邮件  *******/
  callMeAction: function (e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNumb, //此号并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },



  //扫码
  scanCode: function () {

    var that = this
    wx.scanCode({
      success: function (res) {
        console.log('扫码结果' + JSON.stringify(res));
        //扫码成功

        // that.parserQRCode(res.result);
        
        wx.navigateTo({
          url: '/pages/home/companyDetail/companyDetail?q=' + encodeURIComponent(res.result)
        })

      },
      fail: function (res) {
        wx.showToast({
          title: "扫码失败！" + res.result
        })
      }
    })
  },

  processQRCode: function (res) {
    console.log('扫码结果' + JSON.stringify(res));
    //扫码成功
    console.log(res.result + "&userId=" + that.data.USER_ID)

    var sType = null;
    var sParam = null;
    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(res.result);
      console.log(scan_url);
      sType = utils.getQueryString(scan_url, 's');
      sParam = utils.getQueryString(scan_url, 'userId');
      if (s == "1") {
        wx.navigateTo({
          url: '/pages/home/companyDetail_share/companyDetail_share?pageFrom=qrcode&user_id=' + sParam
        })
        return;
      }
    }
    wx.showToast({
      title: "该二维码不支持！"
    })
  },
  scanCodeNew: function () {

    var that = this
    wx.scanCode({
      success: function (res) {
        processQRCode(res);
      },
      fail: function (res) {
        wx.showToast({
          title: "扫码失败！" + res.result
        })
      }
    })
  },
  starHidden: function (e) {
    var that = this;
    that.setData({
      starShow: true,
      follow: true
    });
  },
  //立即关注
  focusNowAction: function (e) {

    console.log('立即关注的参数:' + JSON.stringify(e));
    var that = this;
    // if (!this.data.userInfoDataDic.account) {
    //   that.wsgrxx();
    // }else{
    that.setData({
      ljgz_id: e.target.id,
    });
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

    // wx.showModal({
    //   title: '提示',
    //   content: '是否关注？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定');
    //       // 拿到要关注企业的ID
    //       var focusUser_ID = e.currentTarget.id;
    //       console.log('关注状态的focusUser_ID:' + focusUser_ID);
    //       var itemIndex = e.currentTarget.dataset.index;
    //       //发送请求
    //       reqpost(app.globalData.bastUrl, '/wechat/user/focus', {
    //         'userId': _this.data.USER_ID,
    //         'focusObjId': focusUser_ID,
    //         'starLevel': '5',
    //         'objType': '1',
    //       }, "POST", true).then(res => {
    //         console.log('关注请求结果' + JSON.stringify(res));
    //         if (res.status == "success") {
    //           var focustamp = _this.data.recomendCompanyArray;
    //           for (var i = 0; i < focustamp.length; i++) {
    //             if (i == itemIndex) {
    //               focustamp[i].focused = "Y";
    //             }
    //           };
    //           _this.setData({
    //             recomendCompanyArray: focustamp
    //           })
    //         } else {
    //           wx.showToast({
    //             title: res.message,
    //           })
    //         }
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  focusStar: function (e) {
    var that = this;
    console.log(e.currentTarget.id);
    var starNum = e.currentTarget.id;
    var obj = that.data.imgArray;
    //for (var i in obj) {  var和let一样
    // for (let i in obj) {
    //   if (obj[i].id <= e.currentTarget.id) {   //只有点击的才是true
    //     obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png"
    //   } else {
    //     obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png"
    //   }
    // }
    that.setData({
      //imgArray: obj,
      followActive: true,
      followImg: "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png",
      followTxt: starNum + '星'
    });
    console.log('未关注时选择几星后先后台传' + starNum);
    //未关注，数据不全

    reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
      'userId': that.data.ljgz_id,
      'type': that.data.focusType,
      'level': starNum,
    }, "POST", true).then(res => {
      console.log(res);
      if (res.success) {

      }

    })
  },
  PushToProductDetail: function (e) {
    var that = this;
    var item_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id + '&from=focus&pup=1'
    });


  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.data.currentTab == 2) {
      this.setData({
        exhibitionStart: this.data.exhibitionStart += 10,
        meetStart: 0,
        focusStart:0,
        jfindStart:0,
      })
      this.getExhibitionlist()
    } else if (this.data.currentTab == 3) {
      this.setData({
        meetStart: this.data.exhibitionStart += 10,
        exhibitionStart: 0,
        focusStart:0,
        jfindStart:0
      })
      this.getMeetlist()
    } else if (this.data.currentTab == 1){
      this.setData({
        focusStart: this.data.focusStart += 17,
        exhibitionStart: 0,
        meetStart:0,
        jfindStart:0
      })
      this.focusList()
    } else if (this.data.currentTab == 0) {
      this.setData({
        jfindStart: this.data.jfindStart += 17,
        exhibitionStart: 0,
        meetStart: 0,
        focusStart:0
      })
      this.newJfind()
    }
  },
})