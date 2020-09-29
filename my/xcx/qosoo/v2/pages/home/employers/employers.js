const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'

import time from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gdArr: ['科技·创新', '法律援助', '金融投资', '商标注册·申请专利'],
    serviceList: '',
    companyId: 0,
    defaultCompanyId: '100000068',
    popup: true,
    editText: 'suibian',
    max: 40, //限制最大输入字符数
    min: 10, //限制最小输入字符数
    minWord: '请填写申请理由', //提示语句
    len: 0,
    isDis: true,
    member: [],
    isNotExceedTheAllowTime:false    //是否没有超过允许时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // 获取广告
    var arr = [];
    reqpost(app.globalData.bastUrl, '/qosoo/service', {}, "post", true).then(res => {
      console.log(res);
      if (res.success) {

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type == options.type) {
            //res.data[i].title = this.data.gdArr[options.type];
            arr.push(res.data[i]);
          }
        }
        console.log(arr);
        this.getMemeber(arr[0]['companyId']);
        this.setData({
          serviceList: arr
        })
      }
    })

    if (options.nav_title) {
      this.setData({
        nav_title: options.nav_title
      })
    }

    console.log(this);
  },

  getMemeber(xhid){
    let now = (new Date).getTime();
    console.log(now);
    reqpost(app.globalData.url, '/weixin/api/accept/association/jFindPdSocietyMemberByUserId', {
      companyId: xhid
    }, 'post', true).then(res => {
      console.log(res);
      if (res.success) {
        if(res.data.status ==1 && now-res.data.feeTime>24*60*60*30){
          this.setData({
            member: res.data,
            isNotExceedTheAllowTime:true
          })
        }
        
      }
    })
  },

  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    console.log('hidden');
    this.setData({
      popup: flag,
      editText: ' ',
      len: 0,
      minWord: '请填写申请理由',
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
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
        minWord: "请填写申请理由",
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
          companyId: this.data.companyId,
          reason: this.data.editText
        }, 'post', true).then(res => {
          console.log(res);
        })
      }
      this.hidePopup();
    } else if (e.currentTarget.dataset.click == 'cancle') {
      this.hidePopup();
    }

  },


  applyForShowPopup: function(e) {
    console.log(e);

    var that = this;
    // 协会信息
    let subInfo = JSON.stringify({
      serviceList: that.data.serviceList[e.currentTarget.dataset.index]
    })
    that.setData({
      companyId: e.currentTarget.dataset.id
    })
    reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {
      source: 'apply',
      subInfo: subInfo
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        that.showPopup();
      }
    })
  },

  // 跳转到公司详情
  pushToCompanyDetail: function(e) {
    var company_id = e.currentTarget.dataset.id;
    var qctype = e.currentTarget.dataset.qctype;
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
      return;
      company_id = wx.getStorageSync('mycompanyId') ? wx.getStorageSync('mycompanyId') : that.data.defaultCompanyId;
      //source = 0; //默认公司的官网
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=0'
      })
    } else {
      if (qctype == 3) {
        wx.navigateTo({
          url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&qctype=3'
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id + '&source=1'
      })
    }
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
      success: function(res) {
        console.log(res)
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
    console.log(phoneNumb)
    // wx.makePhoneCall({
    //   phoneNumber: phoneNumb, //此号并非真实电话号码，仅用于测试
    //   success: function () {
    //     console.log("拨打电话成功！")
    //   },
    //   fail: function () {
    //     console.log("拨打电话失败！")
    //   }
    // })
    wx.navigateTo({
      url: '/pages/call/phone/phone?mobile=' + phoneNumb + '&realname=' + realname,
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

  }
})