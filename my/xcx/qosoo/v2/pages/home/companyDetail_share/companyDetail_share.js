// pages/home/companyDetail/companyDetail.js
const app = getApp()
import { req } from '../../../utils/api.js'
var time = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_token: "",
    user_Id: "",

    imgArray: [
      {
        imgUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png',
        id: 1
      },
      {
        imgUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png',
        id: 2
      },
      {
        imgUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png',
        id: 3
      },
      {
        imgUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png',
        id: 4
      },
      {
        imgUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png',
        id: 5
      }
    ],
    followTxt: '关注',
    followImg: '/images/home/icon_focus_0@3x.png',
    follow: false,
    starShow: true,
    followActive: false,
    starLevel: 0,  


    baseImgUrl: "",
    companyData: "",
    company_id:"",
    // 遮罩层状态
    coverViewStatus:"block",


    //公司标题
    companyTitle: "？",
    //公司名
    companyNameTitle: "",
    //公司介绍
    companyIntroduce: "",
    //产品资料
    productInfoArray: [

    ],
    //公司资讯
    InformationArray: [

    ],
    //公司案例
    companyCaseArray: [
  
    ],

    // 分享遮罩层状态
    shareCoverViewStatus: true,
    company_dj:"",
    //分享
    shareData: {
      title: '企搜小程序',
      desc: '企搜小程序分享测试',
      path: '/pages/home/home/home'
    },
    content_height: true,
    content_dis: "none",
    content_text: "查看更多",
    user_data:"",
    display_partner: false,
    display_product: true,
    display_case: true,
    display_news: true,
    title:'首页'
  },
  //接入数据 
  onLoad: function (options) {

    console.log("拿到上一次层id是：" + JSON.stringify(options));

    var pageFromStr = options.pageFrom;
    if (pageFromStr == 'company') {
      this.setData({
        company_id: options.user_id,
        //starShow: true,
        //follow: true
      })
    } else if (pageFromStr == 'qrcode') {
      this.setData({
        company_id: options.user_id,
        title:'首页',
        //starShow: false,
        //follow: false
      })
    }

    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN')
    var user_id = wx.getStorageSync('user_id')

    this.setData({
      //baseImgUrl: app.globalData.bastUrl,
      //user_token: userToken,
      user_id: user_id,
    })

  

    console.log("公司的id是：" + this.data.company_id);
    console.log(_this.data.user_id)

    // 公司详情
    req(app.globalData.bastUrl, '/company/getDetail', {
      'id': _this.data.company_id,
      'userId': _this.data.user_id,
    }, "GET", true).then(res => {
      for (var attr in res.data)
        if (res.data[attr] === null)
          res.data[attr] = '';
      console.log(res);
      var InformationArray = res.data.news;
      var companyCaseArray = res.data.cases;
      for (var i = 0; i < InformationArray.length; i++) {
        InformationArray[i].createTime = time.formatTimeTwo(InformationArray[i].createTime / 1000, 'Y-M-D');
      }
      for (var i = 0; i < companyCaseArray.length; i++) {
        companyCaseArray[i].createTime = time.formatTimeTwo(companyCaseArray[i].createTime / 1000, 'Y-M-D');
      }

      req(app.globalData.bastUrl,'/level/get',{
        'score':res.data.level
      },"get",true).then(data => {



        this.setData({
          //公司资料
          companyData: res.data,
          userLevel: res.data.userLevel,
          //公司产品
          productInfoArray: res.data.products,
          //公司资讯
          InformationArray: InformationArray,//res.data.news,
          //公司案例
          companyCaseArray: companyCaseArray,//res.data.cases,
          starLevel: res.data.userLevel,
          company_dj:data.data,
          display_product: res.data.products.length != 0,
          display_case: res.data.cases.length != 0,
          display_news: res.data.news.length != 0,
          display_partner: res.data.partner == '',

        })
        var query = wx.createSelectorQuery();
        //选择id
        query.select('#mjltest').boundingClientRect(function (res) {
          //res就是 所有标签为mjltest的元素的信息 的数组
          console.log(res);
          //取高度
          console.log(res.height);
          if (res.height >= 77) {
            that.setData({
              content_height: false,
              content_dis: "block"
            })
          } else {

          }
        }).exec()

        req(app.globalData.bastUrl, '/user/get', {
          userId: res.data.managerId,
        }, "GET", true).then(res => {
          console.log(res, "用户信息");
          Object.keys(res.data).forEach(function (key) {
            if (res.data[key] == 'null' || res.data[key] == null) {
              res.data[key] = "";
            }
            console.log(key, res.data[key]);

          });
          this.setData({
            user_data: res.data,

          })
        })
      })
      
      var that = this;
      //res.data.starLevel=3;
      req(app.globalData.bastUrl, '/focusCompany/getLevelByCompanyId', {
        'companyId': that.data.company_id,
        'userId': that.data.user_id,
      }, "GET", true).then(data => {
        //res.data.starLevel=3;
        console.log(data,"getlevel")
        if(data.code=="-1"){
          that.setData({
            follow: false,
            starShow: false
          });
          return;
        }
        if (data.data.level > 0) {  //已关注，直接显示
          var starNum = data.data.level;
          var obj = that.data.imgArray;
          //for (var i in obj) {  var和let一样
          for (let i in obj) {
            if (obj[i].id <= starNum) {   //只有点击的才是true
              obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png"
            } else {
              obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png"
            }
          }

          this.setData({
            imgArray: obj,
            followTxt: data.data.level + '星',
            followActive: true,
            followImg: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png',
            starLevel: data.data.level
          })
        }else{
          that.setData({
            follow: false,
            starShow: false
          });
        }
      })
    })
    // 广告
    req(app.globalData.bastUrl, '/adverts/list', {
      pageNo: 1,
      pageSize: 3,
      showType: 1
    }, "GET", true).then(res => {
      console.log(res, "广告");
      this.setData({
        publicizewidely: res.rows,
      })
      var timestamp = _this.data.publicizewidely;
      for (var i = 0; i < timestamp.length; i++) {
        timestamp[i].createTime = time.formatTimeTwo(timestamp[i].createTime / 1000, "Y-M-D");
      }
      this.setData({
        publicizewidely: timestamp
      })
    })

  },
  // 跳转到公司登记链接
  PushToCompanyLVAction: function () {
    /*
    console.log('跳转提示-hint：' + this.data.companyData.hint)
    console.log('跳转提示-hint：' + this.data.companyData.hint)
    console.log('跳转提示-jumpurl：' + this.data.companyData.jumpUrl)

    var remindTitleString = this.data.companyData.level;
    var hintString = this.data.companyData.hint;
    var jumpUrlString = this.data.companyData.jumpUrl;

    wx.showModal({
      title: remindTitleString,
      content: hintString,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/public/webView/webView?jumpUrl=' + jumpUrlString
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
*/
    var that = this;
    this.toast.showToast("该公司评分为" + that.data.companyData.level);
    /*
    wx.showToast({
      title: "该公司评分为" + that.data.companyData.level,//提示文字
      duration: 2000,//显示时长
      mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'none', //图标，支持"success"、"loading"  
      success: function () { },//接口调用成功
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
    })
    */

  },
  content_showmore: function () {
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
  starHidden: function (e) {
    var that = this;
    that.setData({
      starShow: true,
      follow: true
    });
  },
  // 关注
  focusAction: function () {
    var that = this;
    console.log(that.data.follow);
    console.log(that.data.starLevel);
    if (that.data.starLevel <= 0) { //当未关注时，点击关注，执行关注操作
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
    } else {
      if (that.data.follow == true) {
        that.setData({
          follow: false,
          starShow: false
        });
      } else {
        that.setData({
          follow: false,
          starShow: false
        });
      }
    }
  },
  unfollow: function () {//点击取消关注，执行取消关注操作
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否要取消关注？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.setData({
            followActive: false,
            followImg: "/images/home/icon_focus_0@3x.png",
            followTxt: "关注",
            starLevel: 0
          });
          //console.log('取消关注时向后台传' + that.data.starLevel);
          //已经关注转换为未关注，数据不全
          req(app.globalData.bastUrl, '/focusCompany/focusCompany', {
            'userId': that.data.user_id,
            'id': that.data.company_id,
            'level': -1,
          }, "GET", true).then(res => {
            console.log(res);

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
    console.log(e.currentTarget.id);
    var starNum = e.currentTarget.id;
    var that = this;
    var obj = that.data.imgArray;
    //for (var i in obj) {  var和let一样
    for (let i in obj) {
      if (obj[i].id <= e.currentTarget.id) {   //只有点击的才是true
        obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png"
      } else {
        obj[i].imgUrl = "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars.png"
      }
    }
    that.setData({
      imgArray: obj,
      followActive: true,
      followImg: "https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/stars_act.png",
      followTxt: starNum + '星'
    });
    console.log('未关注时选择几星后先后台传' + starNum);
    //未关注，数据不全
    req(app.globalData.bastUrl, '/focusCompany/focusCompany', {
      'userId': that.data.user_id,
      'id': that.data.company_id,
      'level': starNum 
    }, "GET", true).then(res => { 
      console.log(res);
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent("#toast");

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

  //跳转到公司产品更多
  pushToproductmore: function () {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?product=1&id=" + this.data.companyData.id
    })
  },
  pushTocasesmore: function () {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?cases=1&id=" + this.data.companyData.id
    })
  },
  pushTonewsmore: function () {
    wx.navigateTo({
      url: "/pages/home/companyMore/companyMore?news=1&id=" + this.data.companyData.id
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.setData({
      shareCoverViewStatus: true,
    })
    return {
      title: this.data.companyData.company,
      path: '/pages/home/home/home?companyShareShare=' + this.data.company_id,
      // imageUrl: this.data.baseImgUrl + this.data.companyData.logoUrl,
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

  // 案例详情
  PushToCaseDetail: function (e) {

    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=1" + "&company_id=" + this.data.company_id
    })
  },
  shareAction: function () {
    console.log("AAA");

  },
  //跳转产品详情
  PushToProductDetail: function (e) {
    var item_id = e.currentTarget.dataset.id;
    // var company_id = e.currentTarget.dataset.companyid
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&company_id=" + this.data.company_id
    })
  },
  //跳转到资讯详情
  PushToNewsDetail:function(e){
    var item_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/home/caseDetail/caseDetail?param_id=' + item_id + "&type=3" + "&company_id=" + this.data.company_id
    })
  },
  //查看更多
  viewMoreAction:function(){
    console.log("查看更多");
  },

  // 去掉弹窗
  coverCancleAction:function(){

  },


  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    var that = this;
    console.log(this.data.userInfoDataDic)

    wx.navigateTo({
        url: '/pages/home/home/home'
    })
  },

})