const app = getApp()
import { req, reqpost } from '../../../utils/api.js'
var time = require('../../../utils/util.js');
var WxParse = require('../../../lib/wxParse/wxParse.js');
Page({
  data: {
    user_token: "",
    user_Id: "",
    productInfoArray:[],
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
    starList: [
      'https://file.qosoo.cn/files/20191021/home/star-1.png',
      'https://file.qosoo.cn/files/20191021/home/star-2.png',
      'https://file.qosoo.cn/files/20191021/home/star-3.png',
      'https://file.qosoo.cn/files/20191021/home/star-4.png',
      'https://file.qosoo.cn/files/20191021/home/star-5.png',
    ],
    followTxt: '关注',
    followImg: 'https://file.qosoo.cn/files/20191021/home/icon_focus_0@3x.png',
    follow: true,
    starShow: true,
    followActive: false,
    starLevel: 0,

    company_id:"",
    baseImgUrl:"",
    product_id:"",


    // 分享遮罩层状态
    shareCoverViewStatus: true,

    productDetailData:"",
    imgUrls: [
    ],
    gongsi_id:"",
    interval: 2000,
    articleTitle: "",
    subTitle: "",
    articlContent:"",
    publishTime: "",
    companyId:0,
    companyName:"",
    detail:'',
    article:'',
    param_id:'',
    type:'',
    title:'产品资料',
    companyData:'',
    form:'',
    jProducts:'',
    publicizewidely:[]
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN')
    var user_id = wx.getStorageSync('user_id')
    var that = this;
    console.log("拿到的参数" + JSON.stringify(options));
    this.setData({
      param_id: options.param_id,
      type:options.type,
      formType: options.formType||0,
      form: options.form || ''
    })

    if (options.type ==2){
      // wx.setNavigationBarTitle({
      //   title: '产品详情'
      // })
      this.setData({
        title: '产品服务'
      })
    } else if (options.type == 1){
      // wx.setNavigationBarTitle({
      //   title: '合作案例'
      // })
      this.setData({
        title: '公司案例'
      })
    } else if (options.type == 3) {
      // wx.setNavigationBarTitle({
      //   title: '公司资讯'
      // })
      this.setData({
        title: '公司资讯'
      })
    }

    if (this.data.form == 0){
      this.setData({
        title: '精选私讯'
      })

    } else if (this.data.form == 1) {
      this.setData({
        title: '热点头条'
      })

    }
    var id = options.param_id
    // if (options.type == 3 || options.type == 1){
    //   id = options.company_id
    // }

    reqpost(app.globalData.bastUrl, '/news/jFind', {
      'id': id,
      'type': options.type,
    }, "post", true).then(res => {
      console.log(res);
      if (res.success){
        res.data.createTime = time.formatTimeTwo(res.data.createTime / 1000, 'Y-M-D');
        WxParse.wxParse('article', 'html', res.data.content, _this, 5);
        if (res.data.carousel){
          res.data.carousel = res.data.carousel.split(",")
        }
        _this.setData({
          detail: res.data,
          companyId: res.data.companyId
        })
        _this.getCard(res.data.companyId)
        _this.getCompany(res.data.companyId)
        // if (_this.data.form == '0') {
          
        _this.getjProducts(res.data.companyId)
        // }
      }
    });
   
    // req(app.globalData.bastUrl, '/company/getDetail', {
    //   'id': options.company_id,
    //   'userId': user_id,
    // }, "GET", true).then(res => {
    //   console.log(res);
    //   that.setData({
    //     companyName: res.data.name.substring(0, 12),
    //     companyId: res.data.id,
    //   });
    // });

    // _this.setData({
    //   baseImageUrl: app.globalData.bastUrl,
    //   product_id: options.param_id,
    //   gongsi_id: options.company_id,
    //   //user_token: userToken,
    //   user_id: user_id,
    // })

    // // 获取产品详情
    // req(app.globalData.bastUrl, '/companyProduct/get', {
    //   'id': this.data.product_id,
    //   'userId': this.data.user_id,
    // }, "GET", true).then(res => {
    //   console.log(res);
    //   var publicTimeTemp = time.formatTimeTwo(res.data.createTime / 1000, 'Y-M-D');

    //   this.setData({
    //     productDetailData: res.data,
    //     articlContent:res.data.content,
    //     imgUrls: res.data.carousel.split(","),
    //     starLevel: 0,
    //     publishTime: publicTimeTemp,
    //     product_id:res.data.id
    //   })
       

    //   req(app.globalData.bastUrl, '/focusCompany/getLevelByCompanyId', {
    //     'companyId': that.data.gongsi_id,
    //     'userId': that.data.user_id,
    //   }, "GET", true).then(data => {
    //     //res.data.starLevel=3;
    //     console.log(data)
    //     if (data.data.level > 0) {  //已关注，直接显示
    //       var starNum = data.data.level;
    //       var obj = that.data.imgArray;
    //       //for (var i in obj) {  var和let一样
    //       for (let i in obj) {
    //         if (obj[i].id <= starNum) {   //只有点击的才是true
    //           obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png"
    //         } else {
    //           obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png"
    //         }
    //       }

    //       this.setData({
    //         imgArray: obj,
    //         followTxt: data.data.level + '星',
    //         followActive: true,
    //         followImg: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png',
    //         starLevel: data.data.level
    //       })
    //     }
    //   })

    // })
  },
  tolist: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.linkurl
    })
  },
  getjProducts:function(id,form){
    var that = this;
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'companyId': wx.getStorageSync('mycompanyId') || 0,
      'limit': 4,
      'type': 2,
      'start': 0
    }, "post", true).then(res => {
      // console.log(res);
      if (res.data.length == 0){
        that.getOtherList()
      }else{
        res.data.forEach(item => {
          item.createTime = time.formatTimeTwo(item.createTime / 1000, 'Y-M-D');
        })
        that.setData({
          productInfoArray: res.data
        })
      }
    })
      

  },
  getOtherList:function(){
    var that = this;
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      position: 3
    }, "post", true).then(res => {
      // console.log(res, "广告");
      this.setData({
        publicizewidely: res.data,
      })
      var timestamp = that.data.publicizewidely;
      for (var i = 0; i < timestamp.length; i++) {
        timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, "M-D");
      }
      this.setData({
        publicizewidely: timestamp
      })
    })
  },
  getCompany:function(){
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      'id': this.data.companyId
    }, "post", true).then(res => {
      this.setData({
        //公司资料
        companyData: res.data,
      })
    })
  },
  back: function () {
    console.log(this.data.formType)
    if (this.data.formType == 1) {
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + this.data.companyId +'&formType=1'
      })
    } else {
      wx.navigateBack()
    }
  },
  getCard: function (company_id){
    //名片
    reqpost(app.globalData.bastUrl, '/user/jFindByCompanyId', {
      id: company_id
    }, "post", true).then(res => {
      console.log(res);
      
      // if (res.data.focusLevel)
      var lists = this.data.imgArray
      lists.forEach((item, index) => {
        if (index < res.data.focusLevel) {
          item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png'
        }
      })
      if (res.data.focus == 1) { //已关注，直接显示
        var img = this.data.starList[res.data.focusLevel - 1]
        console.log(img)
        this.setData({
          followTxt: '关注',
          followActive: true,
          followImg: img,
          // starLevel: res.data.userLevel
        })
      } else {
        this.setData({
          followTxt: "关注",
          followActive: false,
          followImg: 'https://file.qosoo.cn/files/20191021/home/icon_focus_0@3x.png',
          // starLevel: res.data.userLevel
        })
      }
      this.setData({
        cardInfo: res.data,
        imgArray: lists
      })
    })
  },
   /**
     * 生命周期函数-转发
     */
  onShareAppMessage:function(){
    // this.setData({
    //   shareCoverViewStatus: true
    // })
   return {
     title: this.data.detail.companyName,
     path: '/pages/home/productDetail/productDetail?param_id=' + this.data.param_id + '&type=' + this.data.type +'&formType=1',
     
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  //分享按钮
  shareBtnAction: function () {
    this.setData({
      shareCoverViewStatus: false
    })
  },
  // 关闭遮罩层
  coverViewCloseAction: function () {
    this.setData({
      shareCoverViewStatus: true
    })
  },

  // 关注
  focusAction: function () {
    var that = this;
    // if (!this.data.login_user.account) {
    //   wx.navigateTo({
    //     url: '/pages/userCenter/userCenter/emptyUserCenter'
    //   })
    // //  that.wsgrxx();
    // } else{

    // if (that.data.companyData.focus == 1) return
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
      
    
  unfollow: function () { //点击取消关注，执行取消关注操作
    var that = this;

    if (this.data.cardInfo.focus != 1) {
      this.setData({
        starShow: true,
        follow: true
      })
      return
    }


    wx.showModal({
      title: '提示',
      content: '是否要取消关注？',
      confirmColor: '#FA6D21',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            followActive: false,
            followImg: "https://file.qosoo.cn/files/20191021/home/icon-1.png",
            followTxt: "关注",
            starLevel: 0
          });
          reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
            'userId': that.data.cardInfo.id,
            'type': 0,
            'level': 0,
          }, "POST", true).then(res => {
            console.log(res);
            if (res.success) {
              var lists = that.data.imgArray
              lists.forEach((item, index) => {
                item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png'
              })
              var str = that.data.cardInfo
              str.focus = 0 
              that.setData({
                imgArray: lists,
                cardInfo: str
              })
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
      followImg: this.data.starList[starNum - 1],
      followTxt: '关注'
    });
    console.log('未关注时选择几星后先后台传' + starNum);
    //未关注，数据不全

    reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
      'userId': that.data.cardInfo.id,
      'type': 0,
      'level': starNum,
    }, "POST", true).then(res => {
      console.log(res);
      if (res.success) {
        var lists = this.data.imgArray
        lists.forEach((item, index) => {
          console.log(index)
          if (index < starNum) {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png'
          }else{
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png'
          }
        })
        var str = that.data.cardInfo
        str.focus = 1 
        this.setData({
          imgArray: lists
        })

      }
      // if (res.code == 0) {

      //   wx.showToast({
      //     title: res.msg,
      //     duration: 2000,
      //     success: function () {
      //       setTimeout(function () {
      //         //要延时执行的代码
      //         req(app.globalData.bastUrl, '/company/getRecomme', {
      //           userId: that.data.USER_ID,
      //           pageNo: 1,
      //           pageSize: 6,
      //         }, "GET", true).then(res => {
      //           console.log(res, "推荐");

      //           that.setData({
      //             recomendCompanyArray: res.rows,
      //           })
      //           that.onShow()
      //         })
      //       }, 2000) //延迟时间
      //     }
      //   })
      // } else {
      //   wx.showToast({
      //     title: res.msg,
      //     icon: 'none',
      //   })
      // }
    })
  },
  //是否跳转到完善个人信息页面
  wsgrxx: function () {
    var that = this;
    wx.showModal({
      title: '',
      content: '完善信息,成就你我',
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
  },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    })
  },
  //跳转产品详情
  PushToProductDetail: function (e) {
    var item_id = e.currentTarget.dataset.id;
    var company_id = this.data.companyId
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&company_id=" + company_id + '&type=' + type
    })
  },
})