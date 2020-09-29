const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js';
var time = require('../../../utils/util.js');
var new_scroll = 0,
  last_scroll, i = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newLists: [],
    meetStart: 0,
    jfindStart: 0,
    // 精选数组
    choicenessArray: [],
    exhibitionStart: 0,
    focusStart: 0,
    tabBarShow: false,
    userInfoDataDic: "",
    title: '智慧微秘',
    //是否需要注册标识out_banner
    userReg_BOOL: "",
    currentTab: 0,
    companyId: 0,
    defaultCompanyId: '100000068',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (options.title) {
      this.setData({
        title: options.title
      })
    }
  },
  // 跳转到我的客户群
  pushToFocusCompany: function (e) {
    wx.navigateTo({
      url: '/pages/home/myCustomerGroup/myCustomerGroup?index=0'
    })

  },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    var source; //来源 
    var that = this;
    //console.log(this.data.userInfoDataDic)
    if (company_id <= 0) {

      //获取个人公司id
      // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {}, "post", true).then(res => {
      //   console.log(res);
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
  },

  // 跳转到案例详情
  PushToCaseDetail: function(e) {
    // if (this.data.userReg_BOOL == "yes") {
    //   wx.redirectTo({
    //     url: '/pages/public/userAuthStatus/userAuthStatus'
    //   })
    //   return;
    // }
    // 拿到跳转分类
    var that = this;
    console.log(e);
    var itemtypeTemp = e.currentTarget.dataset.type;
    var item_id = e.currentTarget.dataset.id;
    var company_id = e.currentTarget.dataset.companyid;
    // console.log(e.currentTarget)

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
  toSecretary() {
    wx.navigateTo({
      url: '/pages/secretary/secretary'
    })
  },
  handleGoBack: function() {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    //精选
    _this.newJfind()

    if ((wx.getStorageSync('mycompanyId')) <= 0) {

    } else {
      _this.setData({
        companyId: wx.getStorageSync('mycompanyId')
      })
    }

  },
  localFlat: function(arr) {
    return arr.reduce((acc, val) => acc.concat(val), [])
  },
  newJfind: function() {
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
      this.midBanner()
    })
  },

  midBanner: function() {
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 2
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.choicenessArray
        var newList = []
        for (var i = 0; i < list.length; i++) {
          newList.push({
            list: list[i],
            image: res.data[i] || ''
          })
        }
        this.setData({
          newLists: newList
        })
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      jfindStart: this.data.jfindStart += 17,
      exhibitionStart: 0,
      meetStart: 0,
      focusStart: 0
    })
    this.newJfind()
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

    if (new_scroll < last_scroll) {
      setTimeout(function() {
        // console.log('aa');
        i = true;
        that.setData({
          tabBarShow: true
        })
      }, 100)
    } else {
      setTimeout(function() {
        // console.log('bb');
        i = true;
        that.setData({
          tabBarShow: false
        })
      }, 100)
    }
    new_scroll = last_scroll;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})