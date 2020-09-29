// pages/call/phone-history/phone-history.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lists: wx.getStorageSync('callHistory') ? wx.getStorageSync('callHistory') : [],
    lists:[],
    start: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.called) {
      // 1 已拨打
      this.getList(1)
      console.log('已拨打');
    } else {
      this.setData({
        lists: wx.getStorageSync('callHistory') ? wx.getStorageSync('callHistory') : []
      })
      console.log('未拨打');
    }
    this.getList(50)

    var that = this;
    // 余额说明
    reqpost(app.globalData.url, '/weixin/api/open/call/jBalance', {}, "post", true).then(res => {
      if (res.success) {
        this.setData({
          money: res.data.money
        })
      }
    })
    // 定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log('location', res)
        let latitude = res.latitude
        let longitude = res.longitude

        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })


    let callStatus;
    reqpost(app.globalData.url, '/weixin/api/open/call/jValid', {
      callee: wx.getStorageSync('myPhone')
    }, "post", true).then(res => {
      console.log(res);
      if (res.code == 1000 || res.code == 1002) {
        callStatus = 1000;

      } else if (res.code == 1001) {
        callStatus = 1001;
      } else if (res.code == 2000) {
        callStatus = 2000;
      } else {
        callStatus = 1111;
      }

      that.setData({
        callStatus: callStatus,
        msg: res.data
      })
    })

  },
  getList: function(limit) {
    var that = this;
    reqpost(app.globalData.url, '/weixin/api/open/call/jCallRec', {
      start: that.data.start,
      limit: limit
    }, "post", true).then(res => {
      console.log(res);
      // that.setData({
      //   lists: res.data
      // })

      // var a = wx.getStorageSync('callHistory');
      // var b = res.data;
      var list ;
      if (res.success) {
        if (res.data.length == 0) return;
        if(limit !=1){
          that.setData({
            lists:''
          })
        list = res.data
        }else{
         list = res.data.concat(that.data.lists)
        }
        
        console.log(that.data.lists);
        console.log(list);

        list.forEach(item => {
          var str = item.createTime;
          var y = time.formatTimeTwo(item.createTime / 1000, 'Y')
          var m = time.formatTimeTwo(item.createTime / 1000, 'M')
          var d = time.formatTimeTwo(item.createTime / 1000, 'D')
          var yy = new Date().getFullYear();
          var mm = new Date().getMonth() + 1;
          var dd = new Date().getDate();
          console.log(y, m, d, yy, mm, dd)
          if (yy == y && mm == m & dd == d) {
            //console.log("当天");
            item.create = time.formatTimeTwo(item.createTime / 1000, 'h:s')
          } else {
            //console.log('之前');
            item.create = time.formatTimeTwo(item.createTime / 1000, 'Y/M/D')
          }
          // item.create = time.formatTimeTwo(item.createTime / 1000, 'Y/M/D');
          //console.log(item.create)
        })

        if (list.length > 50) {
          // -1
          list.splice(50, 1);
        }

        wx.setStorageSync('callHistory', list);

        that.setData({
          lists: list,
          // called: 0,
        })
      }

    })
  },
  callAction(e) {
    var mobile = e.currentTarget.dataset.phone;
    var calleeName = e.currentTarget.dataset.calleename;

    // wx.redirectTo({
    //   url: '/pages/call/phone/phone?mobile=' + mobile + '&realname=' + calleeName + '&msg=' + this.data.msg + '&callStatus=' + this.data.callStatus + '&latitude=' + this.data.latitude + '&longitude=' + this.data.longitude + '&money=' + this.data.money,
    // })
    wx.redirectTo({
      url: '/pages/call/phone/phone?mobile=' + mobile + '&realname=' + calleeName ,
    })
  },
  handleGoBack: function() {
    let pages = getCurrentPages();
    if (pages.length > 2) {
      // wx.navigateBack({
      //   delta: 1
      // })
      // wx.redirectTo({
      //   url: '/pages/call/phone/phone?msg=' + this.data.msg + '&callStatus=' + this.data.callStatus + '&latitude=' + this.data.latitude + '&longitude=' + this.data.longitude + '&money=' + this.data.money,
      // })
      wx.redirectTo({
        url: '/pages/call/phone/phone'
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/home/home',
      })
    }
  },
  del: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    reqpost(app.globalData.url, '/weixin/api/accept/call/jDelCallRec', {
      id
    }, "post", true).then(res => {
      if (res.success) {
        // this.setData({
        //   lists: this.data.lists.concat(res.data)
        // })
        var lists = this.data.lists
        for (var i = 0; i < lists.length; i++) {
          if (id == lists[i].id) {
            lists.splice(i, 1);
          }
        }
        this.setData({
          lists
        })
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
      }

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
    // this.setData({
    //   start: this.data.start += 20,
    // })
    // this.getList()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})