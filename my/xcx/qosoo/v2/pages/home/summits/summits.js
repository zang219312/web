const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js';
var time = require('../../../utils/util.js');
const config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetStart: 0,
    meetlist: [],
    listType: 2,
    city: '',
    focusStart: 0,
    jfindStart: 0,
    exhibitionStart: 0,
    defaultCompanyId: '100000068',
    companyId: 0,
    popup: true,
    popup_title:'请再次确认报名'
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
    if (options.city) {
      this.setData({
        city: options.city,
      })
      this.getMeetlist() //会议列表
    } else {
      this.getLocation();
    }


  },
  getTheDiscount() {
    this.showPopup();
  },
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    console.log('hidden');
    this.setData({
      popup: flag,
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
  },
  // 隐藏通知弹窗
  hideNotify() {
    this.setData({
      showNotify: false,
      popup: true
    })
  },

  toApply(e) {
    console.log(e);
    console.log(this.data);
    if (e.currentTarget.dataset.click == 'comfirm') {
      if (this.data.str === 'sign') {
        this.setData({
          str: ''
        })
        this.hidePopup();
        return;
      }
      // 请求接口，成功显示弹窗
      reqpost(app.globalData.url, '/weixin/api/accept/scan/sc1', {
        typeCode: this.data.qrcode,
        id: this.data.id,
        token: wx.getStorageSync('TOKEN')
      }, 'post', true).then(res => {
        console.log(res);
        if (res.success) {
          this.data.meetlist[this.data.bindex].join = 2;
          this.setData({
            meetlist: this.data.meetlist
          })
          this.hidePopup();
          this.setData({
            showNotify: true,
            notifyText1: '已报名',
            notifyText2: '请注意查看报名结果'
          })
        } else {
          this.hidePopup();
        }
      })
    } else if (e.currentTarget.dataset.click == 'cancle') {
      this.hidePopup();
      this.setData({
        showNotify: false
      })
    }
  },
  registration: function(e) {
    console.log(e);
    var that = this;
    var qrcode = e.currentTarget.dataset.typecode;
    let subInfo = JSON.stringify({
      meetlist: that.data.meetlist[e.currentTarget.dataset.index],
      qrcode: qrcode
    })
    // 是否登陆
    reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {
      source: 'regi',
      subInfo: subInfo
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        that.setData({
          qrcode: qrcode,
          id: e.currentTarget.dataset.id,
          bindex: e.currentTarget.dataset.index
        })
        that.showPopup();
      }
    })


    // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {
    //   source: 'regi',
    //   subInfo: subInfo
    // }, "post", true).then(res => {

    //   if (res.success) {
    //     wx.showModal({
    //       title: '',
    //       content: '请再次确认报名',
    //       success(res) {
    //         console.log(wx.getStorageSync('TOKEN'));
    //         if (res.confirm) {
    //           console.log('用户点击确定')

    //           reqpost(app.globalData.url, '/weixin/api/accept/scan/sc1', {
    //             typeCode: qrcode,
    //             id: e.currentTarget.dataset.id,
    //             token: wx.getStorageSync('TOKEN')
    //           }, 'post', true).then(res => {
    //             console.log(res);
    //             if (res.success) {

    //               that.data.meetlist[e.currentTarget.dataset.bindex].join = 2;
    //               that.setData({
    //                 meetlist: that.data.meetlist
    //               })
    //               that.getTheDiscount();
    //             }
    //           })
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })
    //   }
    // })
  },
  sign(e) {
    this.setData({
      popup_title: '请在会议期间扫码签到',
      str: e.currentTarget.dataset.str
    })
    this.showPopup();
  },
  preApprove(){},
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
      company_id = wx.getStorageSync('mycompanyId') ? wx.getStorageSync('mycompanyId') : that.data.defaultCompanyId;
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=0'
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=1'
      })
    }
  },

  //展会会议逻辑开始
  getLocation: function() {
    console.log("正在定位城市");
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => {
            that.setData({
              city: res.data.result.ad_info.city,
            })
            if (that.data.listType == 2) {
              that.getMeetlist(); //展会列表
            }
          }
        })

      },
      fail: function(msg) {
        console.log(msg)
      }
    })
  },
  getMeetlist: function() {
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
  goMap: function(e) {
    var id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '/pages/home/lists-map/lists-map?id=' + id
    })
  },
  goHistory: function() {
    wx.navigateTo({
      url: '/pages/home/lists-history/lists-history?listType=' + this.data.listType
    })
  },
  goCity: function() {
    wx.navigateTo({
      url: '/pages/home/lists/lists-city/list-city?city=' + this.data.city + '&listType=' + this.data.listType
    })
  },
  focusItem: function(e) {
    var id = e.currentTarget.dataset.id
    var i = e.currentTarget.dataset.bindex
    console.log(i)
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

  toDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/lists-detail/lists-detail?id=' + id + '&listType=' + this.data.listType
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
  toSecretary() {
    wx.navigateTo({
      url: '/pages/secretary/secretary'
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
    if ((wx.getStorageSync('mycompanyId')) <= 0) {

    } else {
      this.setData({
        companyId: wx.getStorageSync('mycompanyId')
      })
    }
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
      meetStart: this.data.exhibitionStart += 10,
      exhibitionStart: 0,
      focusStart: 0,
      jfindStart: 0
    })
    this.getMeetlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})