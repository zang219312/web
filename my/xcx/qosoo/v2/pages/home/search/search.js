// pages/home/searchProduct/searchProduct.js
const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'
var time = require('../../../utils/util.js'); //时间戳
const cityObjs = require('../../../utils/city.js');
const device = wx.getSystemInfoSync();
const winWidth = device.windowWidth; //设备的屏宽
const xs = winWidth / 375;
const ctx = wx.createCanvasContext('myCanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImageUrl: "",
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
    companyArray: [],
    searchValue: '',
    tabType: 0,
    offsetNum: 0,
    limitNum: 5,
    // 公司ID
    company_id: "",
    search_type: 0,
    searchArray: [],
    gjz_dis: "none",
    gjz_data: '',
    companystart: 0,
    productstart: 0,
    searchPerson: [],
    personstart: 0,
    firstname: '',
    citys: [],
    showX:false,
    placeholder:'搜 公 司'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    console.log(cityObjs);

    var that = this;
    
    that.setData({
      currentTab: that.data.tabType,
      baseImageUrl: app.globalData.bastUrl,
    })
    wx.getSystemInfo({
      success: function (res) {
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
    if (options.search_value) {
      that.setData({
        tabType: options.tab_type,
        searchValue: options.search_value,
        search_type: options.search_type
      })
      console.log(that.data.search_type);
      if (that.data.search_type == 0) {
        reqpost(app.globalData.bastUrl, "/company/jFindAll", {
          limit: 10,
          start: 0,
          key: that.data.searchValue.replace(/\s+/g, "|"),
        }, "post", true).then(res => {
          if (res.success) {
            var obj = res.data;
            for (let i in obj) {
              if (!obj[i].profile) {
                obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
              } else {
                obj[i].content = obj[i].profile
              }
              if (!obj[i].logo) {
                let a = that.getCity(obj[i].name);
                obj[i].firstName=a;
              }
            }
            that.setData({
              companyArray: obj,
              searchArray: [],
              searchPerson: []
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
      } else if (this.data.search_type == 3) {

        if (that.data.searchValue) {
          reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
            limit: 10,
            start: 0,
            key: that.data.searchValue.replace(/\s+/g, "|"),
          }, "post", true).then(res => {
            console.log(res);
            if (res.success) {
              var obj = res.data;
              this.setData({
                searchArray: [],
                companyArray: [],
                searchPerson: obj
              })
            }
          })
          that.getSurName(that.data.searchValue);
        } else {
          that.setData({
            searchArray: [],
            companyArray: [],
            searchPerson: []
          })
        }

      }
    } else {
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
              if (!obj[i].logo) {
               var a =  that.getCity(obj[i].name);
               obj[i].firstName = a;
              }
            }

            that.setData({
              companyArray: obj,
              searchArray: [],
              searchPerson: []
            })
          }
        })
      }
    }


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

    //that.roundRect(ctx, 0 * xs, 0 * xs, 116 * xs, 116 * xs, 14 * xs, '#EBF5FF', obj[i].simpleName);


    console.log(that);
  },
  getCity(name) {
    var  that=this;
    var listArr = [];
    var firstName;
    // var regex = /^[^\(\)]+$/;
    var  regex= /\（(.+?)\）/g; //中文的括号

    // console.time('循环');
    console.log(regex.test('大大（贵州）范德萨嘎的'));
    // 如果名字里有括号，只取第一个字
    if (regex.test(name)){
      
      firstName= name.substr(0,1); 
    }else{
      // 如果名字没有括号，看前两个是不是地区名
      let companyName = name.substr(0, 2);
      for (var i = 0; i < cityObjs.cityObjs.length; i++) {
        if (cityObjs.cityObjs[i].city.indexOf('自治州') > 0) {
          listArr[i] = cityObjs.cityObjs[i].city.slice(0, -3);
        } else if (cityObjs.cityObjs[i].city.indexOf('地区') > 0) {
          listArr[i] = cityObjs.cityObjs[i].city.slice(0, -2);
        } else if (cityObjs.cityObjs[i].city.indexOf('市') > 0) {
          listArr[i] = cityObjs.cityObjs[i].city.slice(0, -1);
        } else {
          listArr[i] = cityObjs.cityObjs[i].city;
        }

      }
      var res = listArr.indexOf(companyName)
  
      console.log(res);
      // 如果大于1，说明前两个是地区
      if(res > -1){
         firstName = name.substr(2,1);
      }else{
        firstName = name.substr(0, 1); 
      }
    }

    return firstName;
    // that.setData({
    //   firstName: firstName
    // })
    console.log(firstName);
    
    // console.timeEnd('循环');
  },

  getSurName(name) {
    console.log(name);
    var that = this;
    let surname = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人',
      '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶',
      '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒',
      '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙',
      '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐',
      '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪',
      '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖',
      '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑',
      '即墨', '达奚', '褚师'
    ];
    var n_length = name.length;
    var firstname = '';
    if (/^[a-z]/.test(name.substr(0, 1))) {
      firstname = name.substr(-1, 1).toUpperCase();
    } else {
      if (n_length > 2) {
        var prevTwoWords = name.substr(0, 2)
        if (surname.indexOf(prevTwoWords) < 0) {
          firstname = name.substr(-1, 1)
        } else {
          // 是复姓
          firstname = name.substr(0, 2)
        }
      } else if (n_length === 2) {
        firstname = name.substr(1, 1);
      } else {
        firstname = name;
      }
    }
    that.setData({
      firstname: firstname
    })
    //console.log(firstname);
  },
  /**
   * 绘制远角矩形
   * 
   * x 圆角矩形左上角的x坐标
   * y
   * w  宽
   * h  height
   * simpleName   公司简称                                                                                              
   */
  roundRect(ctx, x, y, w, h, r, bgcolor, simpleName) {
    var logo;
    ctx.save()
    ctx.beginPath();
    //左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    // 上边框
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // 右边框
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // 下边框
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // 左边框
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)
    console.log(simpleName);
    // 填充颜色
    ctx.setFillStyle(bgcolor);
    ctx.fill();
    // ctx.draw(true);
    ctx.restore()
    ctx.setFillStyle('#4E85FC');
    ctx.setFontSize(20)
    ctx.fillText(simpleName, 38 * xs, 60 * xs);
    ctx.draw(true, () => {

      timer = setTimeout(function() {
        wx.canvasToTempFilePath({
          fileType: 'jpg',
          canvasId: 'myCanvas',
          quality: 1,
          success: (res) => {
            //为canvas的虚拟地址
            console.log(res.tempFilePath);
          }
        })
      }, 200)

    });
    // ctx.closePath();
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
  fzsearch: function(e) {
    console.log(e.currentTarget.dataset.title)
    this.setData({
      searchValue: e.currentTarget.dataset.title,
      gjz_dis: "none",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  navbarTaps: function(e) {
    var that = this;
    that.setData({
      //currentTab: e.currentTarget.dataset.idx,
      search_type: e.currentTarget.dataset.idx,
      tabType: e.currentTarget.dataset.tab,
    })
    console.log('search_type：     ' + that.data.search_type);
    if (that.data.search_type == 0) {
      reqpost(app.globalData.bastUrl, "/company/jFindAll", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log('0', res);
        if (res.success) {
          var obj = res.data;
          for (let i in obj) {
            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            } else {
              obj[i].content = obj[i].profile
            }

            if(!obj[i].logo){
              let a = that.getCity(obj[i].name);
              obj[i].firstName = a;
            }
          }
          that.setData({
            companyArray: obj,
            searchArray: [],
            searchPerson: [],
            placeholder:'搜 公 司'
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
        console.log('2', res);
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
            searchPerson: [],
            placeholder: '搜 产 品'
          })
        }

      })
    } else if (this.data.search_type == 3) {

      if (that.data.searchValue) {
        reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
          limit: 10,
          start: 0,
          key: that.data.searchValue.replace(/\s+/g, "|"),
        }, "post", true).then(res => {
          console.log(res);
          if (res.success) {
            var obj = res.data;
            this.setData({
              searchArray: [],
              companyArray: [],
              searchPerson: obj,
              placeholder: '去 找 人'
            })
          }
        })
        that.getSurName(that.data.searchValue);
      } else {
        that.setData({
          searchArray: [],
          companyArray: [],
          searchPerson: [],
          placeholder: '去 找 人'
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  callMeAction: function(e) {
    var phoneNumb = e.currentTarget.dataset.phone;
    var realname = e.currentTarget.dataset.realname;

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
    console.log("下拉");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    // console.log("上啦" + that.data.limitNum);
    // that.setData({
    //   limitNum: that.data.limitNum+1  
    // })
    // console.log(that.data.limitNum);

    if (this.data.search_type == 0) {
      this.setData({
        companystart: this.data.companystart += 10
      })
    } else if (this.data.search_type == 2) {
      productstart: this.data.productstart += 10
    }
    else if (this.data.search_type == 3) {
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
  //去产品详情
  PushToProductDetail: function(e) {
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
  pushToCompanyDetail: function(e) {

    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id + '&from=search'
    });
  },
  pushToCompanyDetails: function(e) {
    var item_id = e.currentTarget.dataset.id;
    var user_Id = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/home/companyDetail/companyDetail?company_id=' + item_id + '&card=1&formType=1&user_Id=' + user_Id + '&from=search'
    });
  },
  //产品详情
  productDetail: function(e) {
    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/productDetail/productDetail?param_id=' + item_id + "&type=" + 2
    });
  },
  // 搜索
  bindKeyInput: function(e) { //表示input
    var that = this;
    that.setData({
      searchValue: e.detail.value, //表示input输入值
      companystart: 0
    })

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
            if (!obj[i].logo) {
              let a = that.getCity(obj[i].name);
              obj[i].firstName = a;
            }
          }
          this.setData({
            companyArray: obj,
            searchArray: [],
            searchPerson: [],
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
    } else if (this.data.search_type == 3) {
      // 无值时，不请求
      // console.log(e);
      if (!that.data.searchValue) {
        this.setData({
          searchPerson: []
        })
        return;
      };
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        if (res.success) {
          var obj = res.data;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].companyKey) {
              //console.log(obj[i].companyKey.split('，'))
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
      that.getSurName(e.detail.value);
    }


  },
  xsgjz: function() {
    this.setData({
      gjz_dis: "block"
    })
  },
  cleanFun: function(e) { //清除input搜索框的内容
    this.setData({
      searchValue: '', //表示input输入值
      gjz_dis: 'none'
    })
  },
  searchAction: function() {

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

    if (that.data.search_type == 0) {
      reqpost(app.globalData.bastUrl, "/company/jFindAll", {
        limit: 10,
        start: that.data.companystart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {
        console.log(that.data.searchValue.replace(/\s+/g, "|"));
        console.log(res);
        if (res.success) {
          var obj = that.data.companyArray.concat(res.data);
          for (let i in obj) {

            if (!obj[i].profile) {
              obj[i].content = "暂无公司详情，请登陆 www.qosoo.cn 完善资料。";
            } else {
              obj[i].content = obj[i].profile
            }
            if (!obj[i].logo) {
              let a = that.getCity(obj[i].name);
              obj[i].firstName = a;
            }
          }

          that.setData({
            companyArray: obj,
            searchArray: []
          })
        }

      })
    } else if (that.data.search_type == 2) {
      reqpost(app.globalData.bastUrl, "/news/jFindAll", {
        limit: 10,
        type: 2,
        start: that.data.productstart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = that.data.searchArray.concat(res.data);
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
    } else if (that.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: that.data.personstart,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = that.data.searchPerson.concat(res.data);
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].companyKey) {
              console.log(obj[i].companyKey.split('，'))
              obj[i].companyKeys = obj[i].companyKey.split('，')
            }
          }
          that.setData({
            searchArray: [],
            companyArray: [],
            searchPerson: obj
          })
        }

      })
    }
    that.getSurName(that.data.searchValue);
  },
  searchActions: function() {
    var that = this;
    console.log(that);
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

    if (that.data.search_type == 0) {
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
            if (!obj[i].logo) {
              let a = that.getCity(obj[i].name);
              obj[i].firstName = a;
            }
          }

          this.setData({
            companyArray: obj,
            searchArray: []
          })
        }

      })
    } else if (that.data.search_type == 2) {
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
    } else if (that.data.search_type == 3) {
      reqpost(app.globalData.bastUrl, "/user/jFindAllByKey", {
        limit: 10,
        start: 0,
        key: that.data.searchValue.replace(/\s+/g, "|"),
      }, "post", true).then(res => {

        if (res.success) {
          var obj = res.data;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].companyKey) {
              //console.log(obj[i].companyKey.split('，'))
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

    that.getSurName(that.data.searchValue);
  }
})