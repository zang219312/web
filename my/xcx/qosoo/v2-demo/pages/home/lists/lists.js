// pages/home/lists/lists.js
const config = require('../../../utils/config.js');
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'

var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'展会峰会',
    listType:1,
    city:'',
    exhibitionStart:0,
    exhibitionlist:[],
    meetStart:0,
    meetlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      listType:options.type,
    })
    if (options.city){
      this.setData({
        city: options.city,
      })
      if (this.data.listType == 1) {
        this.getExhibitionlist()  //展会列表
        this.setData({
          title:'展会峰会'
        })
      } else if (this.data.listType == 2) {
        this.getMeetlist() //会议列表
        this.setData({
          title: '会议论坛'
        })
      }
    }else{
      this.getLocation()
    }
  },
  back: function () {
    // wx.navigateBack()
    wx.redirectTo({
      url: '/pages/home/home/home',
    })
  },
  getLocation: function () {
    console.log("正在定位城市");
    
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => {
            console.log(res)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            that.setData({
              city: res.data.result.ad_info.city,
            })

            if (that.data.listType ==1){
              that.getExhibitionlist()  //展会列表
            } else if (that.data.listType == 2){
              that.getMeetlist() //会议列表
            }

          }
        })

      },
      fail:function(msg){
        console.log(msg)
      }
    })
  },
  getExhibitionlist:function(){ 
    reqpost(app.globalData.bastUrl, '/exhibition/jFindAll', {
      limit:10,
      start: this.data.exhibitionStart,
      city: this.data.city,
      type:0
    }, "post", true).then(res => {
      if (res.success) {
        var list = this.data.exhibitionlist.concat(res.data) 
        list.forEach(item=>{
          item.create = time.formatTimeTwo(item.createTime / 1000, 'M月D h:m');
          item.start = time.formatTimeTwo(item.startTime / 1000, 'Y.M.D ');
          item.end = time.formatTimeTwo(item.endTime / 1000, 'Y.M.D ');
        })
        console.log(list)
        this.setData({
          exhibitionlist: list
        })
      }
    })
  },
  getMeetlist:function(){
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
        console.log(list)
        this.setData({
          meetlist: list
        })
      }
    })
  },
  goMap:function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/home/lists-map/lists-map?id=' + id 
    })
  },
  goHistory:function(){
    wx.navigateTo({
      url: '/pages/home/lists-history/lists-history?listType=' + this.data.listType
    })
  },
  goCity:function(){
    wx.navigateTo({
      url: '/pages/home/lists/lists-city/list-city?city=' + this.data.city + '&listType=' + this.data.listType
    })
  },
  focusItem:function(e){
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

        if (this.data.listType == 1){
          var list = this.data.exhibitionlist
          var focus = list[i].focus
          list[i].focus = focus == 1?0:1
          console.log(list)
          this.setData({
            exhibitionlist:list
          })
          console.log(this.data.exhibitionlist)
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
  changType:function(e){
    var type = e.currentTarget.dataset.type
    this.setData({
      listType: type
    }) 
    if (type ==1){
      this.setData({
        
        meetlist:[],
        exhibitionStart:0
      })
      this.getExhibitionlist()
    } else if (type == 2){
      this.setData({
        exhibitionlist: [],
        meetStart: 0
      })
      this.getMeetlist()
    }
  },
  toDetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/lists-detail/lists-detail?id=' + id + '&listType=' + this.data.listType
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
    if (this.data.listType ==1){
      this.setData({
        exhibitionStart: this.data.exhibitionStart+=10,
        meetStart:0
      })
      this.getExhibitionlist()
    } else if(this.data.listType == 2){
      this.setData({
        meetStart: this.data.exhibitionStart += 10,
        exhibitionStart:0
      })
      this.getMeetlist()
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "商业智慧专家",
      path: '/pages/home/home/home',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})