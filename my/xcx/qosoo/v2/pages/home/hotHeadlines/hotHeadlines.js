const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js';
const config = require('../../../utils/config.js');
var time = require('../../../utils/util.js');
var new_scroll = 0,
  last_scroll, i = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '智慧微秘',
    bannerUrlArray9: [],
    myFocusGroupNewLists: [],
    focusStart: 0,
    //推荐公司数组
    recomendCompanyArray: [],
    myFocusGroupArray_1: [],
    tabBarShow: false,
    companyId: 0,
    defaultCompanyId: '100000068',
    navbar: [{
      company: '公 司',
      type: 0
    }, {
      company: '产 品',
      type: 2
    }, {
      company: '找 人',
      type: 3
    }],
    currentTab: 0,
    tabType: 0,
    searchValue: '',
    search_type: 0,
    showX:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var  that = this;
    if (options.title) {
      this.setData({
        title: options.title,
      })
    }
    wx.getSystemInfo({
      success: function(res) {
        if (res.model.indexOf('X') > -1) {
          console.log('X系列');
          that.setData({
            showX: true,
            paddingTop: '184'
          })
        } else {
          that.setData({
            showX: false,
            paddingTop: '148'
          })
        }
      },
    })

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
  // 跳转到我的客户群
  pushToFocusCompany: function(e) {
    wx.navigateTo({
      url: '/pages/home/myCustomerGroup/myCustomerGroup?index=0'
    })

  },
  // 跳转到公司详情
  pushToCompanyDetail: function(e) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  navbarTaps: function(e) {
    var that = this;
    that.setData({
      // currentTab: e.currentTarget.dataset.idx,
      search_type: e.currentTarget.dataset.idx,
      tabType: e.currentTarget.dataset.tab,
    })
    console.log('search_type：     ' + that.data.search_type);
    // wx.redirectTo({
    //   url: '/pages/home/search/search?curr=' + e.currentTarget.dataset.tab,
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 焦点快讯
    this.focusList();

    if ((wx.getStorageSync('mycompanyId')) <= 0) {

    } else {
      this.setData({
        companyId: wx.getStorageSync('mycompanyId')
      })
    }

    //banner
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 9
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          bannerUrlArray9: res.data,
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
      console.log(res);
      this.setData({
        recomendCompanyArray: res.data,
      })
    })
  },
  localFlat: function(arr) {
    return arr.reduce((acc, val) => acc.concat(val), [])
  },
  focusList: function() {
    let now = (new Date).getTime();
    reqpost(app.globalData.bastUrl, '/news/jFindAll', {
      'start': this.data.focusStart,
      'status': 0,
      'limit': 17
    }, 'post', true).then(res => {
      console.log(res);
      if (res.data.length === 0) return;
      var timestamp = this.localFlat(this.data.myFocusGroupArray_1).concat(res.data);

      for (var i = 0; i < timestamp.length; i++) {
        timestamp[i].createTimes = time.formatTimeTwo(timestamp[i].createTime / 1000, 'M-D', now);
        if (timestamp[i].type === 1) {
          timestamp[i].recommend = "案例";
        } else if (timestamp[i].type === 2) {
          timestamp[i].recommend = "产品";
        } else {
          timestamp[i].recommend = "";
        }
      }
      // 二位数组
      var res = [];
      for (var i = 0; i < timestamp.length; i += 5) {
        res.push(timestamp.slice(i, i + 5))
      }
      this.setData({
        myFocusGroupArray_1: res
      })
      this.midBannerHOT()
    })
  },

  midBannerHOT: function() {
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 2
    }, 'post', true).then(res => {
      console.log(res);
      var list = this.data.myFocusGroupArray_1;
      if (res.success) {
        var newList = [];
        for (var i = 0; i < list.length; i++) {
          newList.push({
            list: list[i],
            image: res.data[i] || ''
          })
        }
        console.log(newList);
        this.setData({
          myFocusGroupNewLists: newList
        })
      }
    })
  },

  scroll(e) {},

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

  toSecretary() {
    wx.navigateTo({
      url: '/pages/secretary/secretary'
    })
  },

  tolist: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.linkurl
    })
  },
  // 搜索
  bindKeyInput: function(e) { //表示input
    var that = this;
    that.setData({
      searchValue: e.detail.value, //表示input输入值
    })
  },

  searchActions: function() {
    var that = this;
    console.log('搜索');
    console.log(that);

    // return;
    wx.navigateTo({
      url: '/pages/home/search/search?search_value=' + that.data.searchValue + '&tab_type=' + that.data.tabType + '&search_type=' + that.data.search_type,
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

  PushToProductDetail: function(e) {
    var that = this;
    var item_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id + '&from=focus&pup=1'
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 热点
    this.setData({
      focusStart: this.data.focusStart += 17,
      exhibitionStart: 0,
      meetStart: 0,
      jfindStart: 0
    })
    this.focusList()
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
    if (that.timer1 && that.timer2) {
      clearTimeout(that.timer1);
      clearTimeout(that.timer2);
    }
    if (new_scroll < last_scroll) {
      that.timer1 = setTimeout(function() {
        // console.log('aa');
        i = true;
        that.setData({
          tabBarShow: true
        })
      }, 100)
    }
    if (new_scroll > last_scroll) {
      that.timer2 = setTimeout(function() {
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