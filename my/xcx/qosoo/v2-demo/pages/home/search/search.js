// pages/home/searchProduct/searchProduct.js
const app = getApp()
import { req, reqpost } from '../../../utils/api.js'
var time=require('../../../utils/util.js');   //时间戳

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImageUrl:"",
    navbar: [{ company: '公司', type: 0 }, { company: '产品', type: 2 }, { company: '找人', type: 3 }],
    currentTab: 0,
    // companyArray: [
    //   {
    //     imageUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyLogo_1@3x.png',
    //     title: '华为科技有限公司',
    //     text: '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立。'
    //   },
    //   {
    //     imageUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyLogo_1@3x.png',
    //     title: '深圳腾讯~~',
    //     text: '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立。'
    //   }
    // ],
    // productArray: [
    //   {
    //     imageUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyLogo_1@3x.png',
    //     title: '华为科技有限公司',
    //     text: '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立。'
    //   },
    //   {
    //     imageUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyLogo_1@3x.png',
    //     title: '华为科技有限公司',
    //     text: '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立。'
    //   }
    // ],
    companyArray: [],
    searchValue:'',
    tabType:0,
    offsetNum:0,
    limitNum:5,
    // 公司ID
    company_id:"",
    search_type:0,
    searchArray:[],
    gjz_dis:"none",
    gjz_data:'',
    companystart:0,
    productstart:0,
    searchPerson:[],
    personstart: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      baseImageUrl: app.globalData.bastUrl,
    })
    var that = this;
    // this.setData({
    //   currentTab: that.data.tabType
    // })

    // reqpost(app.globalData.bastUrl, "/keyWords/get", {
    //   userId: wx.getStorageSync('user_id')
    // }, "GET", true).then(res => {
    //   console.log(res);
    //   if (res.code == 0) {
    //     var obj = res.rows;
    //     this.setData({
    //       gjz_data: obj,
    //     })
    //   }

    // })
  },
  fzsearch:function(e){
    console.log(e.currentTarget.dataset.title)
    this.setData({
      searchValue: e.currentTarget.dataset.title,
      gjz_dis: "none",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  navbarTaps: function (e) {
    console.log(e.currentTarget.dataset.tab)
    var that = this
    this.setData({
      //currentTab: e.currentTarget.dataset.idx,
      search_type: e.currentTarget.dataset.idx,
      tabType: e.currentTarget.dataset.tab,
    })
    if (this.data.search_type == 0) {
      reqpost(app.globalData.bastUrl, "/company/jFindAll", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          var obj = res.data;
          for (let i in obj) {

            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            } else {
              obj[i].content = obj[i].profile
            }
          }

          this.setData({
            companyArray: obj,
            searchArray: [],
            searchPerson:[]
          })
        }

      })
    } else if (this.data.search_type == 2) {
      reqpost(app.globalData.bastUrl, "/news/jFindAll", {
        limit: 10,
        type: 2,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;

          for (let i in obj) {
            obj[i].time = time.formatTimeTwo(obj[i].createTime / 1000, 'Y-M-D');
            // if (obj[i].content === null) {
            //   obj[i].content = "无此公司产品资讯。我要提醒此伙伴发布产品和资讯，方便客户能及时获取公司更新吧！";
            // }
          }
          this.setData({
            searchArray: obj,
            companyArray: [],
            searchPerson: []
          })
        }

      })
    }else if (this.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          console.log(obj)
          this.setData({
            searchArray: obj,
            companyArray: [],
            searchPerson:[]
          })
        }

      })
    } 
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  clipboard: function (e) {
    var phoneNumb = e.currentTarget.dataset.phone;
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
      success: function () {
        console.log("复制成功")
        wx.showToast({
          title: "微信号码已复制",
          duration: 3000
        })
      },
      fail: function () {

      }
    })
  },
  callMeAction: function (e) {
    var phoneNumb = e.currentTarget.dataset.phone;
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
      url: '/pages/call/phone/phone?mobile=' + phoneNumb,
    })
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
    console.log("下拉");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    // console.log("上啦" + that.data.limitNum);
    // that.setData({
    //   limitNum: that.data.limitNum+1  
    // })
    // console.log(that.data.limitNum);

    if (this.data.search_type == 0) { 
      this.setData({
        companystart: this.data.companystart+=10
      })
    } else if (this.data.search_type == 2){
      productstart: this.data.productstart += 10
    } else if (this.data.search_type == 3) {
      personstart: this.data.personstart += 10
    }
    this.searchAction()

    //重复
    // console.log(that.data.searchValue, that.data.tabType);
    // this.setData({
    //   currentTab: that.data.tabType
    // })
    // var url = '/wechat/company/search';
    // var data = {
    //   'offset': that.data.limitNum,
    //   'limit': '5',
    //   'searchText': that.data.searchValue
    // };
    // //根据点击搜索不同类型,默认为公司
    // if (that.data.tabType != 1) {
    //   url = '/wechat/company/search';
    //   data = {
    //     'offset': that.data.limitNum,
    //     'limit': '1',
    //     'searchText': that.data.searchValue
    //   };
    //   this.setData({
    //     limitNum: data.offset + data.limit
    //   })
    // } else {
    //   url = '/wechat/product/search';
    //   data = {
    //     'offset': '0',
    //     'limit': '1',
    //     'searchText': that.data.searchValue
    //   };
    //   this.setData({
    //     limitNum: data.offset + data.limit
    //   })
    // }
    // console.log(that.data.limitNum);
    // //req(app.globalData.bastUrl, '/wechat/user/list', {
    // req(app.globalData.bastUrl, url, data, "GET", true).then(res => {
    //   console.log(res);
    //   var obj = res.data;
    //   for (let i in obj) {
    //     var date = new Date(obj[i].createTime2);
    //     //var Y = date.getFullYear()+"";
    //     var Y = date.getFullYear().toString();
    //     Y = Y.slice(2, 4);
    //     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //     var D = date.getDate() + ' ';
    //     obj[i].createTime = Y + "/" + M + "/" + D;
    //   }
    //   this.setData({
    //     companyArray: obj
    //   })
    // })
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
  },
   //去产品详情
  PushToProductDetail: function (e) {
    // if (this.data.userReg_BOOL == "yes") {
    //   wx.redirectTo({
    //     url: '/pages/public/userAuthStatus/userAuthStatus'
    //   })
    //   return;
    // }

    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id
    })
  },
  //去公司详情
  pushToCompanyDetail: function (e) {

    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id
    });
  },
  pushToCompanyDetails:function(e){
    var item_id = e.currentTarget.dataset.id;
    var user_Id = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id + '&card=1&formType=1&user_Id=' + user_Id,
    });
  },
  //产品详情
  productDetail:function(e){
    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=" + 2
    });
  },
  // 搜索
  bindKeyInput: function (e) {  //表示input
    this.setData({
      searchValue: e.detail.value,  //表示input输入值
    })
    var that = this;
    // this.setData({
    //   gjz_dis: 'none'  
    // })
    // reqpost(app.globalData.bastUrl, "/keyWords/add", {
    //   userId: wx.getStorageSync('user_id'),
    //   search: that.data.searchValue.replace(/\s+/g, "|"),
    // }, "GET", true).then(res => {
    //   console.log(res,"关键词添加");
    // })
    // this.setData({
    //   companyArray:[],
    //   searchArray:[]
    // })


    if (this.data.search_type == 0) {
      reqpost(app.globalData.bastUrl, "/company/jFindAll", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          var obj = res.data;
          for (let i in obj) {

            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            } else {
              obj[i].content = obj[i].profile
            }
          }

          this.setData({
            companyArray: obj,
            searchArray: [],
            searchPerson:[]
          })
        }

      })
    } else if (this.data.search_type == 2) {
      reqpost(app.globalData.bastUrl, "/news/jFindAll", {
        limit: 10,
        type: 2,
        start:0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          
          for (let i in obj) {
            obj[i].time = time.formatTimeTwo(obj[i].createTime / 1000, 'Y-M-D');
            // if (obj[i].content === null) {
            //   obj[i].content = "无此公司产品资讯。我要提醒此伙伴发布产品和资讯，方便客户能及时获取公司更新吧！";
            // }
          }
          this.setData({
            searchArray: obj,
            companyArray: [],
            searchPerson:[]
          })
        }

      })
    } else if (this.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          for(var i=0;i<obj.length;i++){
            if (obj[i].companyKey){
              console.log(obj[i].companyKey.split('，'))
              obj[i].companyKeys = obj[i].companyKey.split('，')
            }
          }
          
          this.setData({
            searchArray: [],
            companyArray: [],
            searchPerson: obj
          })
        }

      })
    } 

  
  },
  xsgjz:function(){
    this.setData({
      gjz_dis: "block"
    })
  },
  cleanFun: function (e) {  //清除input搜索框的内容
    this.setData({
      searchValue: '',  //表示input输入值
      gjz_dis: 'none'
    })
  },
  searchAction:function(){
    var that = this;
    // this.setData({
    //   gjz_dis: 'none'  
    // })
    // reqpost(app.globalData.bastUrl, "/keyWords/add", {
    //   userId: wx.getStorageSync('user_id'),
    //   search: that.data.searchValue.replace(/\s+/g, "|"),
    // }, "GET", true).then(res => {
    //   console.log(res,"关键词添加");
    // })
    // this.setData({
    //   companyArray:[],
    //   searchArray:[]
    // })
    if (!that.data.searchValue) return

    if (this.data.search_type == 0){
      reqpost(app.globalData.bastUrl,"/company/jFindAll",{
        limit:10,
        start: this.data.companystart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log(res);
        if (res.success ){
          var obj = this.data.companyArray.concat(res.data);
          for (let i in obj) {

            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            }else{
              obj[i].content = obj[i].profile
            }
          }

          this.setData({
            companyArray: obj,
            searchArray:[]
          })
        }
        
      })
    } else if (this.data.search_type == 2){
      reqpost(app.globalData.bastUrl, "/news/jFindAll", {
        limit: 10,
        type :2,
        start: this.data.productstart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        
        if (res.success) {
          var obj = this.data.searchArray.concat(res.data);
          for (let i in obj) {
            obj[i].time = time.formatTimeTwo(obj[i].createTime / 1000, 'Y-M-D');
            // if (obj[i].content === null) {
            //   obj[i].content = "无此公司产品资讯。我要提醒此伙伴发布产品和资讯，方便客户能及时获取公司更新吧！";
            // }
          }
          this.setData({
            searchArray: obj,
            companyArray:[]
          })
        }

      })
    } else if (this.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: this.data.personstart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = this.data.searchPerson.concat(res.data);
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].companyKey) {
              console.log(obj[i].companyKey.split('，'))
              obj[i].companyKeys = obj[i].companyKey.split('，')
            }
          }
          this.setData({
            searchArray: [],
            companyArray: [],
            searchPerson: obj
          })
        }

      })
    } 
    
  },
  searchActions: function () {
    var that = this;
    // this.setData({
    //   gjz_dis: 'none'  
    // })
    // reqpost(app.globalData.bastUrl, "/keyWords/add", {
    //   userId: wx.getStorageSync('user_id'),
    //   search: that.data.searchValue.replace(/\s+/g, "|"),
    // }, "GET", true).then(res => {
    //   console.log(res,"关键词添加");
    // })
    // this.setData({
    //   companyArray:[],
    //   searchArray:[]
    // })
    if (!that.data.searchValue) return

    if (this.data.search_type == 0) {
      reqpost(app.globalData.bastUrl, "/company/jFindAll", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          var obj = res.data;
          for (let i in obj) {

            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            } else {
              obj[i].content = obj[i].profile
            }
          }

          this.setData({
            companyArray: obj,
            searchArray: []
          })
        }

      })
    } else if (this.data.search_type == 2) {
      reqpost(app.globalData.bastUrl, "/news/jFindAll", {
        limit: 10,
        type: 2,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          for (let i in obj) {
            obj[i].time = time.formatTimeTwo(obj[i].createTime / 1000, 'Y-M-D');
            // if (obj[i].content === null) {
            //   obj[i].content = "无此公司产品资讯。我要提醒此伙伴发布产品和资讯，方便客户能及时获取公司更新吧！";
            // }
          }
          this.setData({
            searchArray: obj,
            companyArray: []
          })
        }

      })
    } else if (this.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].companyKey) {
              console.log(obj[i].companyKey.split('，'))
              obj[i].companyKeys = obj[i].companyKey.split('，')
            }
          }
          this.setData({
            searchArray: [],
            companyArray: [],
            searchPerson: obj
          })
        }

      })
    }

  }
})