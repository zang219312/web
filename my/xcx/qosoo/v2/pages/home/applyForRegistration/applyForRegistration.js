const app = getApp()
import {
  req,
  reqpost
} from '../../../utils/api.js'

var model = require('../../../model/model.js')
var show = false;
var item = {};
Page({
  data: {
    phoneList: [],
    faxList: [],
    items: [{
        name: '1',
        value: '单位',
        checked: 'true'
      },
      {
        name: '0',
        value: '个人'
      }
    ],
    job_array: "",
    index: 0,
    formPickerColors: "#999999",
    companyClassStatus: "none", //注册类型style状态
    // input输入值
    val_phoneNumber: "",
    val_realName: "",
    val_password: "",

    val_regType: "1",
    val_companyName: "",
    val_profession: "",
    val_section: "",
    val_autherCode: "",

    val_job: "请选择行业",
    job_id: '',
    userInfoDic: "",
    userOpen_id: "",
    time: "获取验证",
    currentTime: 60,
    srk_job: false,
    form: {
      mobile: '',
      realName: '',
      type: '0',
      companyName: '',
      industryId: '',
      dept: '',
      job: '',
      province: '',
      district: '',
      city: '',
      address: '',
      email: '',
      website: '',
      tel: '',
      fax: '',
      taxno: '',
      wechat: '',
      facebook: '',
      smsCode: '',
      code: ''

    },
    province: '请选择省市',
    isHidden: false,
    showMore: false,
    nav_title: '申请',
    companyList: [],
    max: 50,
    min: 10,
    minWord: '请填写申请理由',
    len: 0,
    showArea: true,
    popup: true, //弹出框
    list: '',
    notifyText1: '',
    notifyText2: ''
    // this.data.val_realName, 真实姓名
    // this.data.val_phoneNumber, 手机号
    // this.data.val_regType, 所属行业
    // this.data.val_job, 公司名称

    // this.data.val_autherCode, 验证码
    // this.data.userInfoDic, 用户信息
    // this.data.userOpen_id, openid
  },

  onReady: function(e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function(e) {
    this.setData({
      showArea: false
    })
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function(e) {
    // console.log("id = " + e.target.dataset.id)

    model.animationEvents(this, 200, false, 400);
    this.setData({
      showArea: true
    })
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    } else if (e.target.dataset.id == 555) {
      this.setData({
        province: '请选择省市',
        city: '',
        district: ''
      })

    } else if (e.target.dataset.id == 444) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function(e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
  },
  //更新顶部展示的数据
  updateShowData: function(e) {
    item = this.data.item;
    var province = 'form.province'
    var city = 'form.city'
    var district = 'form.district'
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      district: item.countys[item.value[2]].name,
      [province]: item.provinces[item.value[0]].name,
      [city]: item.citys[item.value[1]].name,
      [district]: item.countys[item.value[2]].name,
    });
  },


  onLoad: function(options) {
    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN');
    //拿到存储的userInfo
    // wx.getStorage({
    //   key: 'userInfo_global',
    //   success: function (res) {

    //     console.log(res.data);
    //     var userInfoData = res.data;

    //     _this.setData({
    //       userInfoDic: userInfoData
    //     })
    //   }
    // })
    console.log(options);
    let subInfo = options.subInfo ? JSON.parse(options.subInfo) : '';
    console.log(subInfo);
    console.log(options);
    if (options.source && options.subInfo) {
      let list, title, notifyText1, notifyText2;
      switch (subInfo.qrcode) {
        case 'QR0002':
          title = '企业展会报名';
          notifyText1 = '企业参展已报名';
          notifyText2 = '请注意查看报名结果';
          break;
        case 'QR0004':
          title = '个人展会报名';
          notifyText1 = '已报名';
          notifyText2 = '请注意查看报名结果';
          break;
        case 'QR0006':
          title = '会议报名';
          notifyText1 = '已报名';
          notifyText2 = '请注意查看报名结果';
          break;
        default:
          title = '申请加入协会';
          notifyText1 = '你的申请已收到';
          notifyText2 = '我们会尽快联系您';
          break;
      }

      if (subInfo.meetlist) {
        list = subInfo.meetlist;
      }
      if (subInfo.exhibitionlist) {
        list = subInfo.exhibitionlist;
      }

      if (subInfo.serviceList) {
        list = subInfo.serviceList;
      }
      _this.setData({
        nav_title: title,
        list: list,
        source: options.source,
        qrcode: subInfo.qrcode || '',
        notifyText1: notifyText1,
        notifyText2: notifyText2
      })
    } else {
      this.setData({
        source: options.source,
        notifyText1: '已报名',
        notifyText2: '请注意查看报名结果'
      })
    }
    console.log(this);
    this.getWxCode()
    // this.setData({
    //   userOpen_id: wx.getStorageSync('open_id')
    // })
    // this.setData({
    //   user_token: userToken,
    // })
    /*
      获取行业
    */
    wx.request({
      url: app.globalData.bastUrl + '/industry/jFindAll', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(data) {
        console.log(data);
        var abc = [];
        abc = data.data.data;
        _this.setData({
          job_array: abc
        })
      }
    })
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
        minWord: "至少填写10个字哦～",
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
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url: 'https://你的解密地址',
          data: {
            'encryptedData': encodeURIComponent(e.detail.encryptedData),
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function(res) {
            // if (res.status == 1) {//我后台设置的返回值为1是正确
            //   //存入缓存即可
            //   wx.setStorageSync('phone', res.phone);
            // }
          },

          fail: function(err) {
            console.log(err);
          }
        })
      }
    })
  },
  getWxCode: function() {
    var _this = this
    var code = ''

    wx.login({
      success: function(loginRes) {
        console.log('wx：login:' + JSON.stringify(loginRes));
        if (loginRes) {
          //获取用户信息
          wx.getSetting({

            success(res) {
              console.log(res);
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  withCredentials: true, //非必填  默认为true
                  success: function(infoRes) {
                    // console.log('授权获取用户信息:' + JSON.stringify(infoRes));
                    //请求服务端的登录接口
                    console.log(loginRes.code);
                    var str = 'form.code'
                    _this.setData({
                      [str]: loginRes.code
                    })
                  },
                  fail(err) {
                    console.log(err);
                  },
                })
              } else {

              }
            },
            fail(err) {
              console.log(err);
            }
          })

        }
      }

    })
  },
  showmoreitem: function() {
    this.setData({
      showMore: true
    })
  },
  getCode: function() {
    var that = this;
    var currentTime = that.data.currentTime;
    var interval;
     if(!that.data.form.mobile){
        wx.showToast({
          title: '手机号不能为空',
          icon:'none'
        })
       return;
     }
  
    reqpost(app.globalData.bastUrl, '/sms/register', {
      'mobile': this.data.form.mobile
    }, "post", true).then(res => {
      console.log(res);
      wx.showToast({
        title: res.data,
        icon: 'none',
      })
      if (res.success) {
        that.setData({
          time: currentTime + '秒',
          disabled: true,
        })
        interval = setInterval(function() {
          that.setData({
            time: (currentTime - 1) + '秒'
          })
          currentTime--;
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新获取',
              currentTime: 60,
              disabled: false
            })
          }
        }, 1000)
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

    return {
      title: "企搜小程序",
      path: '/pages/home/home/home',
      // imageUrl: this.data.baseImgUrl + this.data.companyData.logoUrl,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },


  // 选择公司radio
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var str = 'form.type'
    this.setData({
      [str]: 1,
      companyClassStatus: ''
    })
    // console.log('注册类型为：', e.detail.value)

    //   if(e.detail.value == "1"){
    //     console.log("已经有公司");
    //     var displayStr = "";
    //     this.setData({
    //       companyClassStatus: displayStr,
    //     })
    //   }else{
    //     var displayStr = "none";
    //     this.setData({
    //       companyClassStatus: displayStr,
    //     })
    //   }
  },
  //选择行业的picker
  bindPickerChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.job_array[e.detail.value].name == "其他") {
      this.setData({
        srk_job: true
      })
      return
    }
    this.setData({
      val_job: this.data.job_array[e.detail.value].name,
      formPickerColors: "black"
    })
    var str = 'form.industryId'
    this.setData({
      [str]: this.data.job_array[e.detail.value].id,
      formPickerColors: "black"
    })

    // console.log(this.data.job_array[e.detail.value].name);
  },
  industry_zgc_yc: function() {
    this.setData({
      srk_job: false
    })
  },
  // translate: function(e) {
  //   model.animationEvents(this, 0, true, 400);
  // },
  industry_qdan: function() {
    var that = this;
    this.setData({
      srk_job: false
    })
    req(app.globalData.bastUrl, '/industry/add', {
      'industry': this.data.val_job
    }, "GET", true).then(res => {
      that.setData({
        job_id: res.data
      })
    })
  },
  addPhoneList: function() {
    console.log(this.data.phoneList)
    var list = this.data.phoneList.concat([''])
    var str = 'form.tel'
    this.setData({
      phoneList: list,
    })
  },
  cutPhoneList: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var lists = this.data.phoneList
    var list = lists.splice(index, 1)
    var str = 'form.tel'
    this.setData({
      phoneList: lists,
    })
  },
  addFaxList: function() {
    console.log(this.data.faxList)
    var list = this.data.faxList.concat([''])
    var str = 'form.fax'
    this.setData({
      faxList: list,
    })
  },
  cutFaxList: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var lists = this.data.faxList
    var list = lists.splice(index, 1)
    var str = 'form.fax'
    this.setData({
      faxList: lists,
    })
  },

  /* 获取值 */
  //获取手机号码
  phoneNumberInput: function(e) {
    console.log(e);
    console.log(this);
    var str = 'form.' + e.currentTarget.dataset.str
    this.setData({
      // val_phoneNumber: e.detail.value,
      [str]: e.detail.value,
    })
    if (e.currentTarget.dataset.str == 'companyName') {
      this.getCompanyList(e.detail.value)
    }
  },
  getCompanyList: function(name) {
    reqpost(app.globalData.bastUrl, "/company/jFindAll", {
      limit: 3,
      start: 0,
      key: name,
    }, "post", true).then(res => {
      console.log(res);
      if (res.success) {
        // var obj = this.data.companyArray.concat(res.data);
        // for (let i in obj) {

        //   if (!obj[i].profile) {
        //     obj[i].content = "暂无该公司更多资料，我来提醒对方上传。";
        //   } else {
        //     obj[i].content = obj[i].profile
        //   }
        // }

        this.setData({
          companyList: res.data
        })
      }

    })
  },

  bindblur() {
    this.setData({
      companyList: [],
    })
  },
  choose: function(e) {
    var id = e.currentTarget.dataset.id
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      'id': id
    }, "post", true).then(res => {
      console.log(res)
      if (res.success) {
        var str = 'form.companyName'
        var str_address = 'form.address'
        var name = ''
        var str_industryId = 'form.industryId'
        this.data.job_array.forEach(item => {
          if (res.data.industryId == item.id) {
            name = item.name
          }
        })

        this.setData({
          [str]: res.data.name,
          companyList: [],
          val_job: name,
          [str_industryId]: res.data.industryId,
          province: res.data.province || '请选择省市区',
          city: res.data.city,
          district: res.data.district,
          [str_address]: res.data.address
        })
      }
    })
  },
  phoneInput: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var str = 'phoneList[' + index + ']'
    this.setData({
      [str]: e.detail.value,
    })
    console.log('输入手机号为', e.detail.value)
  },
  faxListInput: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var str = 'faxList[' + index + ']'
    this.setData({
      [str]: e.detail.value,
    })
  },

  //获取真实姓名
  realNameInput: function(e) {
    this.setData({
      val_realName: e.detail.value,
    })
    console.log('输入真实姓名为', e.detail.value)
  },
  //获取密码
  passwordInput: function(e) {
    this.setData({
      val_password: e.detail.value,
    })
    console.log('输入密码为', e.detail.value)
  },


  //获取公司名称
  companyNameInput: function(e) {
    this.setData({
      val_companyName: e.detail.value,
    })
    console.log('输入公司名称为', e.detail.value)
  },
  //获取职业头衔
  professionInput: function(e) {
    this.setData({
      val_profession: e.detail.value,
    })
    console.log('输入职业头衔为', e.detail.value)
  },
  //获取所属部门
  sectionInput: function(e) {
    this.setData({
      val_section: e.detail.value,
    })
    console.log('输入所属部门为', e.detail.value)
  },
  //获取其他输入框所属行业
  srkjobInput: function(e) {
    this.setData({
      val_job: e.detail.value,
    })
    console.log('输入行业为', e.detail.value)
  },
  //获取验证码
  autherCodeInput: function(e) {
    this.setData({
      val_autherCode: e.detail.value,
    })
    console.log('输入验证码为', e.detail.value)
  },
  //注册 
  commitRegAction: function(e) {
    console.log(e)
    var str = 'form.tel'
    var str_fax = 'form.fax'
    var list = this.data.phoneList
    var fax_list = this.data.faxList
    console.log(list, fax_list)
    var lists = ''
    var fax_lists = ''
    if (list.length > 1) {
      lists = list.join(',')
    }
    if (fax_list.length > 1) {
      fax_lists = fax_list.join(',')
    }
    this.setData({
      [str]: lists,
      [str_fax]: fax_lists,
    })
    this.hasCompanyReg(e.currentTarget.dataset.qrcode);
  },

  // 已有公司注册
  hasCompanyReg: function() {

    var that = this;
    if (this.data.form.realName == '') {
      wx.showToast({
        title: "请输入真实姓名!",
        icon: 'none',
      })
      return;
    }
    if (this.data.form.mobile == '') {
      wx.showToast({
        title: "请输入手机号码!",
        icon: 'none',
      })

      return;
    }

    var mobile = this.data.form.mobile.replace(/\s*/g, "");

    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
      wx.showToast({
        title: '请输入正确的11位手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    // if (this.data.form.companyName == '') {
    //   wx.showToast({
    //     title: "请输入公司名称!",
    //     icon: 'none',
    //   })
    //   return;
    // }
    // if (this.data.form.job == '') {
    //   wx.showToast({
    //     title: "请输入职务!",
    //     icon: 'none',
    //   })
    //   return;
    // }
    // if (this.data.form.dept == '') {
    //   wx.showToast({
    //     title: "请输入所属部门!",
    //     icon: 'none',
    //   })
    //   return;
    // }
    if (this.data.province == '') {
      wx.showToast({
        title: "请输入省份!",
        icon: 'none',
      })
      return;
    }
    if (this.data.val_job == '请选择从事工作的行业') {
      wx.showToast({
        title: "请选择从事工作的行业!",
        icon: 'none',
      })
      return;
    }

    // if (this.data.source == 'apply' && this.data.len < 10) {
    //   // 1: 创建动画实例animation:
    //  // that.showPopup();
    //   return;
    // }
    var datas = this.data.form
    datas.province = this.data.province
    datas.city = this.data.city
    datas.district = this.data.district

    if (wx.getStorageSync('userInfo_global').nickName) {
      datas.nickname = wx.getStorageSync('userInfo_global').nickName
    }
    if (wx.getStorageSync('userInfo_global').avatarUrl) {
      datas.headimgurl = wx.getStorageSync('userInfo_global').avatarUrl
    }

    console.log(datas);
    // return;
    reqpost(app.globalData.bastUrl, '/user/register', datas, "POST", true).then(res => {
      console.log('注册请求结果' + JSON.stringify(res));

      if (res.success) {
        wx.setStorageSync('TOKEN', res.data.token)
        that.showPopup();
        wx.showToast({
          title: '注册成功',
          duration: 3000,
          success: function() {
            // wx.navigateTo({
            //   url: '/pages/home/home/home'
            // })
            var urls = wx.getStorageSync('formUrl')
            if (urls != 'undefined') {
              wx.removeStorageSync('formUrl')
              wx.redirectTo({
                url: '/' + urls
              })

            } else {
              wx.redirectTo({
                url: '/pages/home/home/home'
              })
            }
          }
        })
      }

      // if (res.code == 0) {
      //   wx.setStorage({
      //     key: "userisReg",
      //     data: 1
      //   })
      //   wx.setStorage({
      //     key: "usercheck",
      //     data: 1
      //   })
      //   wx.showToast({
      //     title: '注册成功',
      //     duration: 3000,
      //     success: function () {
      //       wx.navigateTo({
      //         url: '/pages/home/home/home'
      //       })
      //     }
      //   })
      // } else {
      //   wx.showToast({
      //     title: res.msg,
      //     icon: 'none',
      //   })
      // }
    })
  },
  share() {

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

})