// pages/home/myCustomerGroup/myCustomerGroup.js
const app = getApp()
import { req, reqpost} from '../../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片根路径
    baseImageUrl: "",
    //用户ID
    USER_ID: "", 
    user_token: "",

    myFocusGroupArray:[],
    focusMeGroupArray:[],

    closeImg:'https://file.qosoo.cn/files/20191021/home/25@2x.png',
    openImg:'https://file.qosoo.cn/files/20191021/home/42@2x.png',
    isShow:0,
    companyArray:[
      {
        star:"5星",
        status:1,
        id:1,
        imgUrl:"https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray:[
          {
            name:'小芒果'
          }
        ]
      },
      {
        star: "5星",
        status: 1,
        id:2,
        imgUrl: "https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray: [
          {
            name: '大芒果'
          }
        ]
      },
      {
        star: "5星",
        status: 1,
        id: 3,
        imgUrl: "https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray: [
          {
            name: '大芒果'
          }
        ]
      }
    ],
    navbar:[
      {
        acount:0,
        txt:'我关注的客户'
      },
      {
        acount:0,
        txt: '关注我的客户'
      }
    ],
    currentTab: 0,
    coverViewStatus: "none",    //弹出框显示属性
    pageNo:1,
    pageNo2:1,
    startMyfocus:0,
    startfocusme: 0,
    bannerUrlArray:[],
    key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // var user_id_value = wx.getStorageSync('user_id');
    // //var userToken = wx.getStorageSync('TOKEN')

    // console.log("我的用户组拿到存储的USER_ID" + user_id_value);

    // this.setData({
    //   baseImageUrl: app.globalData.bastUrl,
    //   //user_token: userToken,
    //   USER_ID: user_id_value
    // })
    
    reqpost(app.globalData.url, '/weixin/api/accept/user/focusCount', {
      
    }, "post", true).then(res => {
      if (res.success){
        var navbar = this.data.navbar
        navbar[0].acount = res.data.focusCount;
        navbar[1].acount = res.data.focusMeCount;
        
        this.setData({
          navbar: navbar
        })
      }
     
    })

    //我关注的客户
    this.getMyfocusList()

    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 5,
      'from':'focus'
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerUrlArray: res.data,
        })
      }
    })
    
  },
  getMyfocusList:function(){
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllCompany', {
      limit:10,
      start: this.data.startMyfocus,
      key: this.data.key
    }, "post", true).then(res => {
      if (res.success) {

        var obj = this.data.myFocusGroupArray.concat(res.data);
        for (let i in obj) {
          //添加数据
          obj[i].status = 1;
          obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
          // var focusList = obj[i].focusList;
          // for (let j in focusList) {
          //   if (focusList[j].dept)
          //     focusList[j].dept = focusList[j].dept.substring(0, 5)
          //   if (focusList[j].job) {
          //     focusList[j].job = focusList[j].job.substring(0, 4)
          //   }
          //   if (focusList[j].realName)
          //     focusList[j].realName = focusList[j].realName.substring(0, 4)
          // }
        }


        this.setData({
          myFocusGroupArray: obj
        })
        
      }

    })
  },
  getFocusmeList: function () {
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllCompany', {
      limit: 10,
      start: this.data.startfocusme,
      key: this.data.key
    }, "post", true).then(res => {
      if (res.success) {

        var obj = this.data.focusMeGroupArray.concat(res.data);
      for (let i in obj) {
        //添加数据
        obj[i].status = 1;
        obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
        
      }


      this.setData({
        focusMeGroupArray: obj
      })
      }
    })
  },
  getMyfocuskhmore:function(){
    var that = this;
    this.setData({  
      pageNo: this.data.pageNo + 1
    });
    req(app.globalData.bastUrl, '/focusCompany/getMeFocus', {
      'pageNo': this.data.pageNo,
      'pageSize': '20',
      'id': this.data.USER_ID,
    }, "GET", true).then(res => {
      if(res.total == 0){
        wx.showToast({
          title: "全部加载完毕",
          icon:"none"
        })
        return;
      }
      that.setData({
        myFocusGroupArray: that.data.myFocusGroupArray.concat(res.rows),
      })
      var obj = that.data.myFocusGroupArray;
      for (let i in obj) {
        //添加数据
        obj[i].status = 1;
        obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
        var focusList = obj[i].focusList;
        for (let j in focusList) {
          if (focusList[j].dept)
            focusList[j].dept = focusList[j].dept.substring(0, 5)
          if (focusList[j].job) {
            focusList[j].job = focusList[j].job.substring(0, 4)
          }
          if (focusList[j].realName)
            focusList[j].realName = focusList[j].realName.substring(0, 4)
        }
      }
      that.setData({  //改变status的值
        myFocusGroupArray: obj
      });
    })
  },
  getfoucusMemore: function () {
    var that = this;
    this.setData({
      pageNo2: this.data.pageNo2 + 1
    });
    req(app.globalData.bastUrl, '/focusCompany/getFocusMe', {
      'pageNo': this.data.pageNo2,
      'pageSize': '20',
      'id': this.data.USER_ID,
    }, "GET", true).then(res => {
      console.log(res,"关注我的")
      if (res.total == 0) {
        wx.showToast({
          title: "全部加载完毕",
          icon: "none"
        })
        return;
      }
      that.setData({
        focusMeGroupArray: that.data.focusMeGroupArray.concat(res.rows),
      })
      var obj = that.data.focusMeGroupArray;
      for (let i in obj) {
        //添加数据
        obj[i].status = 1;
        obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
      }
      that.setData({  //改变status的值
        focusMeGroupArray: obj
      });
    })
  },
  navbarTaps: function (e) {
    console.log("切换tab：" + e.currentTarget.dataset.idx);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })

    if (this.data.currentTab == 1){
      // 加载关注我的客户
      console.log("加载关注我的客户" );

      // 关注我的客户
      this.setData({
        startfocusme:0,
        focusMeGroupArray:[]
      })
      this.getFocusmeList()
      // req(app.globalData.bastUrl, '/focusCompany/getFocusMe', {
      //   'pageNo': this.data.pageNo2,
      //   'pageSize': '20',
      //   'id': this.data.USER_ID,
      // }, "GET", true).then(res => {
      //   console.log(res);
      //   var that = this;
      //   that.setData({
      //     focusMeGroupArray: res.rows,
      //   })
      //   var obj = that.data.focusMeGroupArray;
      //   for (let i in obj) {
      //     //添加数据
      //     obj[i].status = 1;
      //     obj[i].imgUrl = "../../../images/home/25@2x.png";
      //   }
      //   that.setData({  //改变status的值
      //     focusMeGroupArray: obj
      //   });
      // })
      


    } else if (this.data.currentTab == 0){
      // 加载我关注的客户
      console.log("加载我关注的客户");

      // 我的客户群
      this.setData({
        startMyfocus: 0,
        myFocusGroupArray:[]
      })
      this.getMyfocusList()
      // req(app.globalData.bastUrl, '/focusCompany/getMeFocus', {
      //   'pageNo': this.data.pageNo,
      //   'pageSize': '20',
      //   'id': this.data.USER_ID,
      // }, "GET", true).then(res => {
      //   console.log(res);

      //   var that = this;
      //   that.setData({
      //     myFocusGroupArray: res.rows,
      //   })
      //   var obj = that.data.myFocusGroupArray;
      //   for (let i in obj) {
      //     //添加数据
      //     obj[i].status = 1;
      //     obj[i].imgUrl = "../../../images/home/25@2x.png";
      //   }
      //   that.setData({  //改变status的值
      //     myFocusGroupArray: obj
      //   });
      // })
    }
  },
  search:function(e){
    console.log(e)
    this.setData({
      key: e.detail.value,
      myFocusGroupArray: [],
      focusMeGroupArray: []
    })
    if (this.data.currentTab == 1) {
      // 加载关注我的客户
      
      this.getFocusmeList()
    } else {
      
      this.getMyfocusList()

    }
  },
  //关注企业
  boxShowFun: function (e) {
    var that = this;
    //console.log(e);
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status;  //1
    console.log(id + ',' + status)
    var obj = that.data.myFocusGroupArray;

    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      

      for (var i = 0; i < obj.length;i++ ) {
        if (obj[i].id == id) {   //只有点击的才是true
          obj[i].status = obj[i].status + 1;   //第1次点击stutas的值是2，第2次点击stutas的值是3，第3次点击stutas的值是4，第4次点击stutas的值是5
          if (obj[i].status % 2 == 0) {
            obj[i].imgUrl = that.data.openImg
          } else {
            obj[i].imgUrl = that.data.closeImg
          }
          obj[i].focusList = res.data
        }else{
          obj[i].status = 1
          obj[i].imgUrl = that.data.closeImg
        }
      }
      console.log(obj);
      that.setData({  //改变status的值
        myFocusGroupArray: obj
      });


      // this.setData({
      //   cardInfo: res.data
      // })
    })



    

  },
  boxShowFun2: function(e) {
    var that = this;
    //console.log(e);
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status;  //1
    console.log(id + ',' + status)
    var obj = that.data.focusMeGroupArray;

    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {


      for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {   //只有点击的才是true
          obj[i].status = obj[i].status + 1;   //第1次点击stutas的值是2，第2次点击stutas的值是3，第3次点击stutas的值是4，第4次点击stutas的值是5
          if (obj[i].status % 2 == 0) {
            obj[i].imgUrl = that.data.openImg
          } else {
            obj[i].imgUrl = that.data.closeImg
          }
          obj[i].focusList = res.data
        } else {
          obj[i].status = 1
          obj[i].imgUrl = that.data.closeImg
        }
      }
      console.log(obj);
      that.setData({  //改变status的值
        focusMeGroupArray: obj
      });


      // this.setData({
      //   cardInfo: res.data
      // })
    })

  },
  clipboard:function(e){
    var phoneNumb = e.currentTarget.dataset.phone;
    if (!phoneNumb){
      wx.showToast({
        title: "无预留微信号",
        icon:'none',
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
    if (this.data.currentTab == 1) {
      // 加载关注我的客户
      this.setData({
        startfocusme: this.data.startfocusme+=10
      })
      this.getFocusmeList()
    } else {
      this.setData({
        startMyfocus: this.data.startMyfocus += 10
      })
      this.getMyfocusList()

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
  },
  // 跳转到公司详情
  pushToCompanyDetail: function (e) {
    console.log('传值公司ID' + JSON.stringify(e));

    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
      wx.navigateTo({
        url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
      })

  },


})