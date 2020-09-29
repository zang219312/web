// pages/home/myCustomerGroup/myCustomerGroup.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'


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
    myFocusGroupArray: [],
    focusMeGroupArray: [],
    closeImg: 'https://file.qosoo.cn/files/20191021/home/25@2x.png',
    openImg: 'https://file.qosoo.cn/files/20191021/home/42@2x.png',
    isShow: 0,
    companyArray: [{
        star: "5星",
        status: 1,
        id: 1,
        imgUrl: "https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray: [{
          name: '小芒果'
        }]
      },
      {
        star: "5星",
        status: 1,
        id: 2,
        imgUrl: "https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray: [{
          name: '大芒果'
        }]
      },
      {
        star: "5星",
        status: 1,
        id: 3,
        imgUrl: "https://file.qosoo.cn/files/20191021/home/25@2x.png",
        phoneArray: [{
          name: '大芒果'
        }]
      }
    ],
    navbar: [{
        acount: 0,
        txt: '我关注的客户'
      },
      {
        acount: 0,
        txt: '关注我的客户'
      }
    ],
    currentTab: 0,
    coverViewStatus: "none", //弹出框显示属性
    pageNo: 1,
    pageNo2: 1,
    startMyfocus: 0,
    startfocusme: 0,
    bannerUrlArray: [],
    key: '',
    ljgz_id: '',
    starList: [
      'https://file.qosoo.cn/files/20191021/home/star-1.png',
      'https://file.qosoo.cn/files/20191021/home/star-2.png',
      'https://file.qosoo.cn/files/20191021/home/star-3.png',
      'https://file.qosoo.cn/files/20191021/home/star-4.png',
      'https://file.qosoo.cn/files/20191021/home/star-5.png',
    ],
    imgArray: [{
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 1
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 2
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 3
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 4
      },
      {
        imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
        imgurl2: 'https://file.qosoo.cn/files/20191122/home/contact_star.png',
        id: 5
      }
    ],
    followTxt: '关注',
    followImg: 'https://file.qosoo.cn/files/20191021/home/white-star.png',
    follow: true,
    starShow: true,
    focusMeStarShow: true,
    follow2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    // var user_id_value = wx.getStorageSync('user_id');
    // //var userToken = wx.getStorageSync('TOKEN')

    // console.log("我的用户组拿到存储的USER_ID" + user_id_value);

    // this.setData({
    //   baseImageUrl: app.globalData.bastUrl,
    //   //user_token: userToken,
    //   USER_ID: user_id_value
    // })


    //我关注的客户
    this.getMyfocusList()
    this.getFocusmeList();
    // banner
    reqpost(app.globalData.bastUrl, '/carousel/jFindAll', {
      'position': 5,
      'from': 'focus'
    }, "post", true).then(res => {
      if (res.success) {
        this.setData({
          bannerUrlArray: res.data,
        })
      }
    })

    // if(this.data.myFocusGroupArray.length < this.data.navbar[0].acount){
    //   this.getMyfocusList(false);
    // }



  },
  getMyfocusList: function (search) {
    // 没有缓存则请求
    if ((this.data.myFocusGroupArray.length != this.data.navbar[0].acount) || search) {
      reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllCompany', {
        limit: 5000,
        start: this.data.startMyfocus,
        key: this.data.key
      }, "post", true).then(res => {
        console.log('aaa');
        console.log(res);
        if (res.success) {
          // var obj = this.data.myFocusGroupArray.concat(res.data);
          var obj = res.data;
          console.log(obj);
          for (let i in obj) {
            //添加数据
            obj[i].status = 1;
            obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";

            this.getMyFocusUser(obj, obj[i].id);
          }

          // this.setData({
          //   myFocusGroupArray: obj
          // })
        }
      })
    } else {
      console.log('有myfocus');

      this.setData({
        myFocusGroupArray: wx.getStorageSync('myFocus')
      })
    }
  },
  // id cpmpayid
  getMyFocusUser(obj, id) {
    var that = this;

    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {
          obj[i].focusList = res.data
        }
      }

      wx.setStorageSync('myFocus', obj)
      that.setData({
        myFocusGroupArray: obj
      });
    })
  },

  getFocusmeList: function(search) {
    if (!wx.getStorageSync('focusMe') || search) {
      reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllCompany', {
        limit: 5000,
        start: this.data.startfocusme,
        key: this.data.key
      }, "post", true).then(res => {
        console.log(res);
        if (res.success) {
          // var obj = this.data.focusMeGroupArray.concat(res.data);
          var obj = res.data;
          console.log(obj);
          for (let i in obj) {
            //添加数据
            obj[i].status = 1;
            obj[i].imgUrl = "https://file.qosoo.cn/files/20191021/home/25@2x.png";
            this.getFocusMeUser(obj, obj[i].id);
          }
        }
      })
    } else {
      this.setData({
        focusMeGroupArray: wx.getStorageSync('focusMe')
      })
    }

  },

  getFocusMeUser(obj, id) {
    var that = this;
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == id) {
          obj[i].focusList = res.data
        }
      }

      wx.setStorageSync('focusMe', obj);
      that.setData({
        focusMeGroupArray: obj
      });
    })
  },
  focusMeFocusAction(e) {
    console.log(e);
    console.log(this);
    var companyid = e.currentTarget.dataset.companyid;
    var id = e.currentTarget.dataset.id; //用户id、
    var level = e.currentTarget.dataset.level;
    var idx = e.currentTarget.dataset.idx; // 每个公司下面的用户列表的下标
    var index = e.currentTarget.dataset.index; //focusme列表的下标
    var isamity = e.currentTarget.dataset.isamity;

    var lists = this.data.imgArray;
    // 握手
    if (isamity == 1) {
      wx.showToast({
        title: '你们已是好友',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      // 根据level显示选中状态
      // lists.forEach((item, index) => {
      //   if (index < level) {
      //     item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
      //   }
      // })
      this.setData({
        focusMeStarShow: false,
        follow2: false,
        imgArray: lists,
        ljgz_id: id,
        companyid: companyid,
        index: index,
        idx: idx,
        isamity: isamity,
        level: level
      })
    }


  },
  focusMeStar(e) {
    console.log(e);
    var that = this;
    let starNum = e.currentTarget.id; //star
    reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
      userId: this.data.ljgz_id,
      type: 0,
      level: starNum,
    }, "POST", true).then(res => {
      console.log(res);
      if (res.success && res.data == '成功') {
        that.setData({
          [`focusMeGroupArray[${that.data.index}].focusList[${that.data.idx}].isAmity`]: 1,
          [`focusMeGroupArray[${that.data.index}].level`]: starNum,
        })

        wx.setStorageSync('focusMe', that.data.focusMeGroupArray); //更新缓存
        // 更新myFocus
        that.updateMyFocus(that.data.companyid);
      }
    })
  },
  // id 公司id
  updateMyFocus(id) {
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        for (let i = 0; i < this.data.myFocusGroupArray.length; i++) {
          if (this.data.myFocusGroupArray[i].id == id) {
            this.data.myFocusGroupArray[i].focusList = res.data;
            // 更新我关注的列表
            this.setData({
              [`myFocusGroupArray[${i}].focusList`]: res.data,
            })
            wx.setStorageSync('myFocus', this.data.myFocusGroupArray)
          }
        }
      }
    })
  },

  focusMeStarHidden() {
    this.setData({
      focusMeStarShow: true,
      follow2: true
    })
  },



  getMyfocuskhmore: function() {
    var that = this;
    this.setData({
      pageNo: this.data.pageNo + 1
    });
    req(app.globalData.bastUrl, '/focusCompany/getMeFocus', {
      'pageNo': this.data.pageNo,
      'pageSize': '20',
      'id': this.data.USER_ID,
    }, "GET", true).then(res => {
      if (res.total == 0) {
        wx.showToast({
          title: "全部加载完毕",
          icon: "none"
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
      that.setData({ //改变status的值
        myFocusGroupArray: obj
      });
    })
  },
  getfoucusMemore: function() {
    var that = this;
    this.setData({
      pageNo2: this.data.pageNo2 + 1
    });
    req(app.globalData.bastUrl, '/focusCompany/getFocusMe', {
      'pageNo': this.data.pageNo2,
      'pageSize': '20',
      'id': this.data.USER_ID,
    }, "GET", true).then(res => {
      console.log(res, "关注我的")
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
      that.setData({ //改变status的值
        focusMeGroupArray: obj
      });
    })
  },
  navbarTaps: function(e) {
    // console.log("切换tab：" + e.currentTarget.dataset.idx);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })


    if (this.data.currentTab == 1) {
      // console.log("关注我的客户");
      // if (this.data.focusMeGroupArray) return;
      this.setData({
        startfocusme: 0,
        // focusMeGroupArray: []
      })

      this.getFocusmeList()
    } else if (this.data.currentTab == 0) {
      // console.log("我关注的客户");
      // if (this.data.myFocusGroupArray) return;
      this.setData({
        startMyfocus: 0,
        // myFocusGroupArray: []
      })

      this.getMyfocusList()
    }
  },
  search: function(e) {
    console.log(e)
    this.setData({
      key: e.detail.value,
      myFocusGroupArray: [],
      focusMeGroupArray: []
    })
    if (this.data.currentTab == 1) {
      // 加载关注我的客户

      this.getFocusmeList(true)
    } else {

      this.getMyfocusList(true)

    }
  },
  //关注企业
  boxShowFun: function(e) {
    var that = this;
    //console.log(e);
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status; //1
    console.log(id + ',' + status)
    var obj = that.data.myFocusGroupArray;
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == id) { //只有点击的才是true
        obj[i].status = obj[i].status + 1; //第1次点击stutas的值是2，第2次点击stutas的值是3，第3次点击stutas的值是4，第4次点击stutas的值是5
        if (obj[i].status % 2 == 0) {
          obj[i].imgUrl = that.data.openImg
        } else {
          obj[i].imgUrl = that.data.closeImg
        }
        // obj[i].focusList = res.data
      } else {
        obj[i].status = 1
        obj[i].imgUrl = that.data.closeImg
      }
    }
    console.log(obj);
    that.setData({ //改变status的值
      myFocusGroupArray: obj
    });

  },
  boxShowFun2: function(e) {
    var that = this;
    //console.log(e);
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status; //1

    var obj = that.data.focusMeGroupArray;

    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == id) { //只有点击的才是true
        obj[i].status = obj[i].status + 1; //第1次点击stutas的值是2，第2次点击stutas的值是3，第3次点击stutas的值是4，第4次点击stutas的值是5
        if (obj[i].status % 2 == 0) {
          obj[i].imgUrl = that.data.openImg
        } else {
          obj[i].imgUrl = that.data.closeImg
        }
      } else {
        obj[i].status = 1
        obj[i].imgUrl = that.data.closeImg
      }
    }

    that.setData({ //改变status的值
      focusMeGroupArray: obj
    });


    // this.setData({
    //   cardInfo: res.data
    // })

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
  clipboard: function(e) {
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
      success: function() {
        console.log("复制成功")
        wx.showToast({
          title: "微信号码已复制",
          duration: 3000
        })
      },
      fail: function() {

      }
    })
  },
  sendSms: function(e) {
    var phoneNumb = e.currentTarget.dataset.phone;
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
  callMeAction: function(e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    var realname = e.currentTarget.dataset.realname || '';
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
  out_banner() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // reqpost(app.globalData.url, '/weixin/api/accept/user/jFindByToken', {}, "post", true).then(res => {
    //   console.log(res);
    //   if (res.success) {
    //     //this.others(res.data.companyId);
    //   }
    // })
  },
  // 我关注的

  focusAction: function(e) {
    var that = this;
    console.log(e);

    var companyid = e.currentTarget.dataset.companyid;
    var id = e.currentTarget.dataset.id; //用户id、
    var level = e.currentTarget.dataset.level;
    var idx = e.currentTarget.dataset.idx; // 每个公司下面的用户列表的下标
    var index = e.currentTarget.dataset.index; //myfocus列表的下标
    var isamity = e.currentTarget.dataset.isamity;

    var lists = this.data.imgArray;
    lists.forEach((item, index) => {
      if (index < e.currentTarget.dataset.level) {
        item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
      }
    })

    this.setData({
      follow: false,
      starShow: false,
      imgArray: lists,
      ljgz_id: id,
      companyid: companyid,
      idx: idx,
      index: index,
      level: level,
      isamity: isamity
    });
  },
  unfollow: function() { //点击取消关注，执行取消关注操作
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否要取消关注？',
      confirmColor: '#FA6D21',
      success: function(res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.url + '/weixin/api/accept/user/focus',
            data: {
              'userId': that.data.ljgz_id,
              'type': 0,
              'level': 0,
              'token': wx.getStorageSync('TOKEN')
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res)
              
              if (res.data.success) {
                var lists = that.data.imgArray
                lists.forEach((item, index) => {
                  item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png';
                })
                that.setData({
                  imgArray: lists,
                  starLevel: 0
                })
                // 取消关注后删除当前数据
                let myFocus = wx.getStorageSync('myFocus');
                for (let i = 0; i < myFocus.length; i++) {
                  if (myFocus[i].id == that.data.companyid) {
                    if (myFocus[i].focusList.length > 1) {
                      console.log(1111);
                      myFocus[i].focusList.splice(that.data.idx, 1);
                      that.setData({
                        [`myFocusGroupArray[${that.data.index}].focusList`]: myFocus[that.data.index].focusList
                      })
                    } else {
                      console.log(222);
                      myFocus.splice(i, 1);
                      that.setData({
                        myFocusGroupArray: myFocus.sort(that.compare('level', false)),
                      })
                    }
                  }
                }
                console.log(myFocus)                  
                
                wx.setStorageSync('myFocus', myFocus.sort(that.compare('level', false)));
                // 更新focusMe

                that.updateFocusMe(that.data.companyid);
                that.refreash();
              }
            }
          })

        }
      }
    })
  },
  // id 公司id
  updateFocusMe(id){
    reqpost(app.globalData.url, '/weixin/api/accept/user/findFocusMeAllUser', {
      'companyId': id
    }, "post", true).then(res => {
      console.log(res);
      if(res.success){
        for (let i = 0; i < this.data.focusMeGroupArray.length; i++) {
          if (this.data.focusMeGroupArray[i].id == id) {
            this.data.focusMeGroupArray[i].focusList = res.data;
            // 更新关注我的列表
            this.setData({
              [`focusMeGroupArray[${i}].focusList`]: res.data,
            })
            wx.setStorageSync('focusMe', this.data.focusMeGroupArray)
          }
        }
      }
    })
  },
  starHidden: function(e) {
    var that = this;
    that.setData({
      starShow: true,
      follow: true,
      imgArray: [{
          imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
          id: 1
        },
        {
          imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
          id: 2
        },
        {
          imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
          id: 3
        },
        {
          imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
          id: 4
        },
        {
          imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
          id: 5
        }
      ],
    });
  },

  focusStar: function(e) {
    var that = this;
    var starNum = e.currentTarget.id;

    // console.log('未关注时选择几星后先后台传' + starNum);
    //未关注，数据不全

    reqpost(app.globalData.url, '/weixin/api/accept/user/focus', {
      'userId': this.data.ljgz_id,
      'type': 0,
      'level': starNum,
    }, "POST", true).then(res => {
      console.log(res);
      if (res.success) {
        var lists = this.data.imgArray
        lists.forEach((item, index) => {
          if (index < starNum) {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star.png';
          } else {
            item.imgUrl = 'https://file.qosoo.cn/files/20191021/home/star-un.png';
          }
        })

        this.setData({
          imgArray: lists,
        })

        // 同步修改缓存公司的星级
        let myFocus = wx.getStorageSync('myFocus');


        for (let i = 0; i < myFocus.length; i++) {
          if (myFocus[i].id == that.data.companyid) {
            myFocus[i].level = starNum
          }
        }
        let sortRule = false; //正序倒序

        wx.setStorageSync('myFocus', myFocus.sort(that.compare('level', sortRule)));
        that.setData({
          // [`myFocusGroupArray[${that.data.index}]`]: myFocus.sort(that.compare('level', sortRule))
          myFocusGroupArray: myFocus.sort(that.compare('level', sortRule)),
          imgArray: [{
              imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
              id: 1
            },
            {
              imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
              id: 2
            },
            {
              imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
              id: 3
            },
            {
              imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
              id: 4
            },
            {
              imgUrl: 'https://file.qosoo.cn/files/20191021/home/star-un.png',
              id: 5
            }
          ],
        })
      }

    })
  },
  compare(property, bol) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (bol) {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
    }
  },


  // 关注我的页面



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // if (wx.getStorageSync('myFocus')) {
    //   this.setData({
    //     myFocusGroupArray: wx.getStorageSync('myFocus')
    //   })
    // }

    // if (wx.getStorageSync('focusMe')) {
    //   this.setData({
    //     focusMeGroupArray: wx.getStorageSync('focusMe')
    //   })
    // }
    this.refreash();
    
  },
  refreash(){
    reqpost(app.globalData.url, '/weixin/api/accept/user/focusCount', {}, "post", true).then(res => {
      if (res.success) {
        var navbar = this.data.navbar
        navbar[0].acount = res.data.focusCount;
        navbar[1].acount = res.data.focusMeCount;

        this.setData({
          navbar: navbar
        })

        if (wx.getStorageSync('myFocus').length != res.data.focusCount) {
          this.getMyfocusList();
        }

        if (wx.getStorageSync('focusMe').length != res.data.focusMeCount) {
          this.getFocusmeList();
        }
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
    if (this.data.currentTab == 1) {
      // 加载关注我的客户
      this.setData({
        startfocusme: this.data.startfocusme += 30
      })
      this.getFocusmeList()
    } else {
      this.setData({
        startMyfocus: this.data.startMyfocus += 30
      })
      this.getMyfocusList()
      this.refreash();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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
  pushToCompanyDetail: function(e) {
    var company_id = e.currentTarget.dataset.id;
    console.log('传值公司ID' + company_id);
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + company_id
    })

  },


})