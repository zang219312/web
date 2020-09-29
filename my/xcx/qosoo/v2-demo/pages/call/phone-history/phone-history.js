// pages/call/phone-history/phone-history.js
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    start:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()

  },
  getList:function(){
    reqpost(app.globalData.url, '/weixin/api/open/call/jCallRec', {
      start: this.data.start,
      limit: 10
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.lists.concat(res.data)
        list.forEach(item => {
          var str = item.createTime;
          var y = time.formatTimeTwo(item.createTime / 1000, 'Y')
          var m = time.formatTimeTwo(item.createTime / 1000, 'M')
          var d = time.formatTimeTwo(item.createTime / 1000, 'D')
          var yy = new Date().getFullYear();
          var mm = new Date().getMonth()+1;
          var dd = new Date().getDate();
          console.log(y,m,d,yy,mm,dd)
          if (yy==y&&mm==m&dd==d) {
            //今天
            console.log("当天");
            item.create = time.formatTimeTwo(item.createTime / 1000, 'h:s')
          } else  {
            //之前
            console.log('之前');
            item.create = time.formatTimeTwo(item.createTime / 1000, 'Y/M/D')
          }
          
          // item.create = time.formatTimeTwo(item.createTime / 1000, 'Y/M/D');
          console.log(item.create)
         
        })
        this.setData({
          lists:list
        })
      }

    })
  },
  del:function(e){
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
        for(var i=0;i<lists.length;i++){
          if(id==lists[i].id){
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
    this.setData({
      start: this.data.start += 10,
    })
    this.getList()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})