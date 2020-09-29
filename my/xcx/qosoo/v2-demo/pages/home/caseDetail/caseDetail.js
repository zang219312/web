// pages/home/caseDetail/caseDetail.js
const app = getApp();
import { req } from '../../../utils/api.js';
import { reqpost } from '../../../utils/api.js';



var time = require('../../../utils/util.js');
var WxParse = require('../../../lib/wxParse/wxParse.js');


Page({
  data: {
    user_Id:"",
    gongsi_id: "",
    //关注
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
    follow: true,
    starShow: true,
    followActive: false,
    starLevel: 0,

    // 分享遮罩层状态
    shareCoverViewStatus: true,


    caseDetailData: "",     //案例详情总数据
    case_id: "",            // 案例ID
    articleTitle: "",       // 案例标题
    publishTime: "",   // 案例发布时间
    articleImageUrl: "",       // 文章头部图片
    // 文章内容，可自适应 解析
    article:'',
    type_W:"",
    companyId:0,
    companyName:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var userToken = wx.getStorageSync('TOKEN')
    var user_id = wx.getStorageSync('user_id')

    var that = this;
    console.log("拿到的参数" + JSON.stringify(options));
    req(app.globalData.bastUrl, '/company/getDetail', {
      'id': options.company_id,
      'userId': user_id,
    }, "GET", true).then(res => {
      console.log(res);
      that.setData({
        companyId: res.data.id,
        companyName: res.data.name.substring(0, 12),
      });
    });

    that.setData({
      case_id: options.param_id,
      user_id: user_id,
      type_W:options.type,
      gongsi_id: options.company_id,
    })
    console.log(that.data.type_W)
    if(that.data.type_W == 1){
      wx.setNavigationBarTitle({
        title: '合作案例'
      })
      req(app.globalData.bastUrl, '/companyCase/get', {
        'id': this.data.case_id,
        'userId': that.data.user_id,
      }, "GET", true).then(res => {
        console.log(res.data);
        var publicTimeTemp = time.formatTimeTwo(res.data.createTime/1000, 'M/D/Y');

        var articleStr = res.data.content;
        that.setData({
          caseDetailData: res.data,
          publishTime: publicTimeTemp,
          article: articleStr,
          starLevel: res.data.userLevel
        })

        WxParse.wxParse('article', 'html', this.data.article, this, 5);
        req(app.globalData.bastUrl, '/focusCompany/getLevelByCompanyId', {
          'companyId': that.data.gongsi_id,
          'userId': that.data.user_id,
        }, "GET", true).then(data => {
          //res.data.starLevel=3;
          console.log(data)
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
          }
        })
        
      }) 
    } else if (that.data.type_W == 3){
      wx.setNavigationBarTitle({
        title: '公司资讯'
      })
      req(app.globalData.bastUrl, '/companyNews/get', {
        'id': this.data.case_id,
        'userId': that.data.user_id,
      }, "GET", true).then(res => {
        console.log(res.data);
        var publicTimeTemp = time.formatTimeTwo(res.data.createTime/1000, 'M/D/Y');

        var articleStr = res.data.content;
        that.setData({
          caseDetailData: res.data,
          publishTime: publicTimeTemp,
          article: articleStr,
          starLevel: res.data.userLevel
        })

        WxParse.wxParse('article', 'html', this.data.article, this, 5);

        req(app.globalData.bastUrl, '/focusCompany/getLevelByCompanyId', {
          'companyId': that.data.gongsi_id,
          'userId': that.data.user_id,
        }, "GET", true).then(data => {
          //res.data.starLevel=3;
          console.log(data)
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
          }
        })
      }) 
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
    if (wx.getStorageSync('userisReg') == 0) {
//      that.wsgrxx();
      wx.navigateTo({
        url: '/pages/userCenter/userCenter/emptyUserCenter'
      })
    } else{
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
      } else {//当已关注时，点击关注，执行取消关注操作
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

      }
    }
    
  },
  unfollow:function(){
    var that = this;
      wx.showModal({
        title: '提示',
        content: '是否要取消关注？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.setData({
              followActive: false,
              followImg: "https://file.qosoo.cn/files/20191021/home/icon_focus_0@3x.png",
              followTxt: "关注",
              starLevel: 0
            });
            console.log('取消关注时向后台传' + that.data.starLevel);
            //已经关注转换为未关注，数据不全
            req(app.globalData.bastUrl, '/focusCompany/focusCompany', {
              'userId': that.data.user_id,
              'id': that.data.gongsi_id,
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
    var that = this;
    console.log(e.currentTarget.id);
    var starNum = e.currentTarget.id;
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
    if (that.data.starLevel <=0){
      reqpost(app.globalData.bastUrl, '/focusCompany/focusCompany', {
        'userId': that.data.user_id,
        'id': that.data.gongsi_id,
        'level': starNum,
      }, "POST", true).then(res => {
        console.log('案例关注请求结果' + JSON.stringify(res));
        if (res.code == 0) {
          wx.showToast({
            title: res.msg,
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon:"none",
          })
        }
      })
    } else if (that.data.starLevel > 0){
      reqpost(app.globalData.bastUrl, '/focusCompany/focusCompany', {
        'userId': that.data.user_id,
        'id': that.data.gongsi_id,
        'level': starNum,
      }, "POST", true).then(res => {
        console.log('案例关注请求结果' + JSON.stringify(res));
        if (res.code == 0) {
          wx.showToast({
            title: res.msg,
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon:"none",
          })
        }
      })
    }
    
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
    var that = this;
    console.log(that.data.company_id)
    this.setData({
      shareCoverViewStatus: true,
    })
    return {
      title: this.data.caseDetailData.title,
      path: '/pages/home/home/home?caseShare=' + that.data.caseDetailData.id + "&company_id=" + that.data.gongsi_id+"&type="+that.data.type_W,
      imageUrl: this.data.caseDetailData.carousel,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
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
})