// pages/home/lists-detail/lists-detail.js
const app = getApp()
import {
  req
} from '../../../utils/api.js'
import {
  reqpost
} from '../../../utils/api.js'
var time = require('../../../utils/util.js');
var WxParse = require('../../../lib/wxParse/wxParse.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '展会商讯',
    id: '',
    curr: 2, //nav-tab 第三个
    info: '',
    article: '',
    listType: '',
    popup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      listType: options.listType * 1 + 1,
      id: options.id
    })
    if (this.data.listType == 2) {
      this.setData({
        title: '展会商讯'
      })
    } else if (this.data.listType == 3) {
      this.setData({
        title: '峰会论坛'
      })
    }
    this.getInfo()
    console.log(this);
  },

  getInfo: function() {
    var url = '/exhibition/jFindById'
    if (this.data.listType == 3) {
      url = '/meet/jFindById'
    }
    reqpost(app.globalData.bastUrl, url, {
      id: this.data.id
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        WxParse.wxParse('article', 'html', res.data.content, this, 5);
        // res.data.create = time.formatTimeTwo(res.data.createTime / 1000, 'M月D h:m');
        res.data.start = time.formatTimeTwo(res.data.startTime / 1000, 'Y-M-D h:m');
        res.data.end = time.formatTimeTwo(res.data.endTime / 1000, 'Y-M-D h:m');
        this.setData({
          info: res.data,
          
        })
      }
    })
  },
  // 隐藏通知弹窗
  hideNotify() {
    this.setData({
      showNotify: false,
      popup: true
    })
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
  back: function() {
    // wx.navigateBack()
    console.log(this);
    wx.redirectTo({
      url: '/pages/home/home/home?type=' + this.data.listType
    })

  },
  registration: function(e) {
    console.log(e);
    var that = this;

    if (e.currentTarget.dataset.listtype === 3) {
      let subInfo = JSON.stringify({
        meetlist: {
          id: e.currentTarget.dataset.id,
          titleImg: that.data.info['titleImg']
        },
        qrcode: e.currentTarget.dataset.qrcode
      })
      reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {
        source: 'regi',
        subInfo: subInfo
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          that.showPopup();
          that.setData({
            qrcode: e.currentTarget.dataset.qrcode,
            id: e.currentTarget.dataset.id,
          })
        }
      })
    } else if (e.currentTarget.dataset.listtype === 2) {
      let subInfo = JSON.stringify({
        exhibition: {
          id: e.currentTarget.dataset.id,
          titleImg: that.data.info['titleImg']
        },
        qrcode: e.currentTarget.dataset.qrcode
      })
      reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {
        source: 'regi',
        subInfo: subInfo
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          that.setData({
            qrcode: e.currentTarget.dataset.qrcode,
            id: e.currentTarget.dataset.id,
          })
          that.showPopup();
        }else{
          // 已报名  or  报名失败
          
        }
      })
    }

  },
  toApply(e) {
    console.log(e);
    console.log(this.data);
    if (e.currentTarget.dataset.click == 'comfirm') {
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
          // this.setData({
          //   showNotify: true,
          //   notifyText1: '已报名',
          //   notifyText2: '请注意查看报名结果'
          // })
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
  seeImg: function(e) {
    var img = e.currentTarget.dataset.img
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(this);
    return {
      title: this.data.info.title,
      path: '/pages/home/lists-detail/lists-detail?listType=' + this.options.listType + '&id=' + this.data.id,
      //imageUrl: this.data.share_logo,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})