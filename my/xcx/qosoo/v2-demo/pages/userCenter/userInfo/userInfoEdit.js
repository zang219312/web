// pages/userCenter/userInfo/userInfoEdit.js
const app = getApp()

import { reqpost } from '../../../utils/api.js'
var model = require('../../../model/model.js')

var show = false;
var item = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneItem_2display:"none",
    faxItem_2display:"none",

    userAccount:"",

    // input输入值
    input_userName: "",
    input_companyName: "",
    input_setionName: "",//部门
    input_userJob: "",
    input_phoneNumb: "",
    input_phoneNumb2:"",
    input_phoneNumb3:"",
    input_faxNumb: "",
    input_faxNumb2: "",
    input_faxNumb3: "",
    input_address: "",
    input_email: "",
    input_web: "",
    input_wechat: "",
    input_facebook: "",
    logoImg:'/images/userCenter/icon_ camera_1@3x.png',
    logoImgShow:true,
    nickName:'',
    sex:'',
    headImg:"",
    user_token: "",
    user_Id: "",
    company_logo:"",
    phoneItem_3display: 'none',
    faxItem_3display: 'none',
    input_addressClick:'none',
    item: {
      show: show
    },
    province:'请选择省市区'
  },
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      district: item.countys[item.value[2]].name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //var userToken = wx.getStorageSync('TOKEN');
    var user_id = wx.getStorageSync('user_id');
    var user_data = JSON.parse(options.account)
    console.log(user_data)
    if (user_data.fax){
      this.setData({
        userAccount: user_data,

        //user_token: userToken,
        user_id: user_id,
        input_userName: user_data.realName,
        input_companyName: user_data.companyName,
        input_setionName: user_data.dept,//部门
        input_userJob: user_data.job,
        input_phoneNumb: user_data.mobile[0],
        input_phoneNumb2: user_data.mobile[1],
        input_phoneNumb3: user_data.mobile[2],
        input_faxNumb: user_data.fax[0],
        input_faxNumb2: user_data.fax[1],
        input_faxNumb3: user_data.fax[2],
        input_address: user_data.address,
        input_email: user_data.email,
        input_web: user_data.website,
        input_wechat: user_data.wechat,
        input_facebook: user_data.facebook,
        nickName: user_data.nickName,
        sex: user_data.sex,
        headImg: user_data.headImg,
        logoImg: user_data.companyLogo,

      })
    } else if (user_data.fax == null){
      this.setData({
        userAccount: user_data,

        //user_token: userToken,
        user_id: user_id,
        input_userName: user_data.realName,
        input_companyName: user_data.companyName,
        input_setionName: user_data.dept,//部门
        input_userJob: user_data.job,
        input_phoneNumb: user_data.mobile[0],
        input_phoneNumb2: user_data.mobile[1],
        input_phoneNumb3: user_data.mobile[2],
        // input_faxNumb: user_data.fax[0],
        // input_faxNumb2: user_data.fax[1],
        // input_faxNumb3: user_data.fax[2],
        input_address: user_data.address,
        input_email: user_data.email,
        input_web: user_data.website,
        input_wechat: user_data.wechat,
        input_facebook: user_data.facebook,
        nickName: user_data.nickName,
        sex: user_data.sex,
        headImg: user_data.headImg,
        logoImg:user_data.companyLogo,
      })
    }
    if (user_data.companyProvince){
      this.setData({
        province: user_data.companyProvince,
        city:user_data.companyCity,
        district:user_data.companyDistrict,
      })
    }
    console.log(JSON.parse(options.account));
    var that = this;
    if (this.data.input_phoneNumb2) {
      that.setData({
        phoneItem_2display: "block"
      })
    }
    if (this.data.input_phoneNumb3) {
      that.setData({
        phoneItem_3display: "block"
      })
    }

    if (this.data.input_faxNumb2) {
      that.setData({
        faxItem_2display: "block"
      })
    }
    if (this.data.input_faxNumb3) {
      that.setData({
        faxItem_3display: "block"
      })
    }
    if (this.data.userAccount.isManage > 0) {
      that.setData({
        input_addressClick:"block"
      })
    }
  },
  wsxx_scmp:function(){
    wx.navigateTo({
      url: '/pages/userCenter/peopleAuther/peopleAuther'
    })
  },
  upLoadImage:function(){
    console.log("点击了上传头像");
    var that = this;
    if (this.data.userAccount.isManage > 0 || this.data.userAccount.companyId < 0) {
      wx.chooseImage({  //选择图片
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          //console.log(tempFilePaths);
          wx.uploadFile({
            url: app.globalData.bastUrl + '/file/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              // userId: app.globalData.userId,
              // token: app.globalData.token,
            },
            success: function (data) {
              that.setData({
                company_logo: JSON.parse(data.data).data,
                logoImg: JSON.parse(data.data).data,
              })

            }
          })
          that.setData({
            logoImg: tempFilePaths,
            logoImgShow:true
          })
        }
      })
    }else{
      wx.showToast({
        title: "您不是管理员",
        icon:'none'
      })
      return false
    }
  },

  /******* 获取input的值 *********/
  //获取用户名
  input_userNameValue: function (e) {
    this.setData({
      input_userName: e.detail.value,
    })
    console.log('输入用户名为', e.detail.value)
  },
  //获取公司名
  input_companyNameValue: function (e) {
    this.setData({
      input_companyName: e.detail.value,
    })
    console.log('输入公司名为', e.detail.value)
  },
  //获取部门
  input_setionNameValue: function (e) {
    this.setData({
      input_setionName: e.detail.value,
    })
    console.log('输入部门为', e.detail.value)
  },
  //获取职务
  input_userJobValue: function (e) {
    this.setData({
      input_userJob: e.detail.value,
    })
    console.log('输入职务为', e.detail.value)
  },
  //获取电话
  input_phoneNumbValue: function (e) {
    this.setData({
      input_phoneNumb: e.detail.value,
    })
    console.log('输入电话为', e.detail.value)
  },
  //获取电话
  input_phoneNumbValue2: function (e) {
    this.setData({
      input_phoneNumb2: e.detail.value,
    })
    console.log('输入电话为', e.detail.value)
  },
  //获取电话
  input_phoneNumbValue3: function (e) {
    this.setData({
      input_phoneNumb3: e.detail.value,
    })
    console.log('输入电话为', e.detail.value)
  },
  //获取传真
  input_faxNumbValue: function (e) {
    this.setData({
      input_faxNumb: e.detail.value,
    })
    console.log('输入传真为', e.detail.value)
  },
  input_faxNumbValue2: function (e) {
    this.setData({
      input_faxNumb2: e.detail.value,
    })
    console.log('输入传真为', e.detail.value)
  },
  input_faxNumbValue3: function (e) {
    this.setData({
      input_faxNumb3: e.detail.value,
    })
    console.log('输入传真为', e.detail.value)
  },
  //获取地址
  input_addressValue: function (e) {
    if (this.data.userAccount.isManage > 0 || this.data.userAccount.companyId < 0){
      this.setData({
        input_address: e.detail.value,
      })
      console.log('输入地址为', e.detail.value)
      
    }
  },

  //获取Email
  input_emailValue: function (e) {
    this.setData({
      input_email: e.detail.value,
    })
    console.log('输入Email为', e.detail.value)
  },
  //获取Web
  input_webValue: function (e) {
    this.setData({
      input_web: e.detail.value,
    })
    console.log('输入Web为', e.detail.value)
  },
  //获取Wechat
  input_wechatValue: function (e) {
    this.setData({
      input_wechat: e.detail.value,
    })
    console.log('输入Wechat为', e.detail.value)
  },
  //获取FaceBook
  input_facebookValue: function (e) {
    this.setData({
      input_facebook: e.detail.value,
    })
    console.log('输入FaceBook为', e.detail.value)
  },
  //获取税号
  input_taxnoValue: function(e){
    this.setData({
      input_taxnoValue: e.detail.value,
    })
  },

  // 提交保存
  commitBtnAction: function () {
    //console.log(this.data.company_logo);
    var USER_ID = wx.getStorageSync('user_id')
    if (this.data.input_userName==''
      || this.data.input_companyName == ''
      || this.data.input_setionName == ''
      || this.data.input_userJob == ''
      || this.data.input_address == ''
      || this.data.province == ''
      || this.data.city == ''
      || this.data.district == ''){
      wx.showToast({
        title: "请输入所有的必填项！",
        icon: 'none',
      })
      return;
      }
    if (this.data.input_phoneNumb2){
      this.data.input_phoneNumb += "," + this.data.input_phoneNumb2;
    }
    if (this.data.input_phoneNumb3){
      this.data.input_phoneNumb += "," + this.data.input_phoneNumb3;
    }

    if (this.data.input_faxNumb2) {
      this.data.input_faxNumb += "," + this.data.input_faxNumb2;
    }
    if (this.data.input_faxNumb3) {
      this.data.input_faxNumb += "," + this.data.input_faxNumb3;
    }
    reqpost(app.globalData.bastUrl, '/user/modify', {
      'companyLogo': this.data.logoImg,// this.data.company_logo,
      'userId': USER_ID,
      //'realName': this.data.input_userName,
      'companyName': this.data.input_companyName,
      'mobile': this.data.input_phoneNumb,
      'job': this.data.input_userJob,
      'dept': this.data.input_setionName,
      'email': this.data.input_email,
      'address': this.data.input_address,
      'website': this.data.input_web,
      'wechat': this.data.input_wechat,
      'facebook': this.data.input_facebook,
      'fax': this.data.input_faxNumb,
      'nickName': this.data.nickName,
      'sex': this.data.sex,
      'headImg': this.data.headImg,
      'taxno':this.data.input_taxnoValue,
      'province':this.data.province,
      'city':this.data.city,
      'district': this.data.district
    }, "POST", true).then(res => {
      console.log(res);
      if (res.code == 0) {

        wx.showToast({
          title: res.msg,
          duration: 15000,
          success: function () {
            setTimeout(function () {

              var pages = getCurrentPages(); // 当前页面
              var beforePage = pages[pages.length - 2];

              wx.navigateBack({
                success: function () {
                  beforePage.onLoad(); // 执行前一个页面的onLoad方法
                }
              });
            }, 1000);
          }
        })
        
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  addPhoneItemsAction:function(e){
    if (this.data.phoneItem_2display == "none"){
      this.setData({
        phoneItem_2display: 'block',
      })
      return;
    } else if (this.data.phoneItem_3display == "none"){
      this.setData({
        phoneItem_3display: 'block',
      })
      return;
    }else if(this.data.phoneItem_3display == "block"){
      wx.showToast({
        title: "最多只能添加3个电话",
        icon:'none',
      })
      return
    }
    
  },
  addFaxItemsAction:function(){
    if (this.data.faxItem_2display == "none") {
      this.setData({
        faxItem_2display: 'block',
      })
      return;
    } else if (this.data.faxItem_3display == "none") {
      this.setData({
        faxItem_3display: 'block',
      })
      return;
    } else if (this.data.faxItem_3display == "block") {
      wx.showToast({
        title: "最多只能添加3个传真",
        icon: 'none',
      })
      return
    }
  },
  minusPhoneItemsAction:function(){
    this.setData({
      phoneItem_2display: 'none',
      input_phoneNumb2: null,
    })
    console.log(this.data.input_phoneNumb2)
  },
  minusPhoneItemsAction3: function () {
    this.setData({
      phoneItem_3display: 'none',
      input_phoneNumb3: null,
    })
  },
  minusFaxItemsAction2:function(){
    this.setData({
      faxItem_2display: 'none',
      input_faxNumb2:null,
    })
  },
  minusFaxItemsAction3: function () {
    this.setData({
      faxItem_3display: 'none',
      input_faxNumb3:null,
    })
  },
  
})