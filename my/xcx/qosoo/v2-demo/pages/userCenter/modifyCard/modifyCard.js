// pages/userCenter/modifyCard/modifyCard.js
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
    phoneItem_2display: "none",
    faxItem_2display: "none",

    userAccount: "",

    // input输入值
    input_userName: "",
    input_companyName: "",
    input_setionName: "",//部门
    input_userJob: "",
    input_phoneNumb: "",
    input_phoneNumb2: "",
    input_phoneNumb3: "",
    input_faxNumb: "",
    input_faxNumb2: "",
    input_faxNumb3: "",
    input_address: "",
    input_email: "",
    input_web: "",
    input_wechat: "",
    input_facebook: "",
    input_taxnoValue: "",
    logoImg: '/images/userCenter/icon_ camera_1@3x.png',
    logoImgShow: true,
    nickName: '',
    sex: '',
    headImg: "",
    user_token: "",
    user_Id: "",
    company_logo: "",
    phoneItem_3display: 'none',
    faxItem_3display: 'none',
    input_addressClick: 'none',
    item: {
      show: show
    },
    province: '请选择省市区',
    srk_job: false,
    job_array: "",
    index: 0,
    formPickerColors: "#999999",
    val_job: "请选择从事工作的行业",
    phoneList: [
      ''
    ],
    faxList: [
      ''
    ],
    showMore: false,
    changeCard:false
  },
  showmoreitem: function () {
    this.setData({
      showMore: true
    })
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
    var user_data = JSON.parse(options.account)
    console.log(user_data)
    if (user_data.companyId>0){
      this.setData({
        userAccount: user_data,
        
        input_userName: user_data.realName,
        input_companyName: user_data.companyInfo.name,
        input_setionName: user_data.dept,//部门
        input_userJob: user_data.job,
        
        input_address: user_data.address,
        input_email: user_data.email,
        input_web: user_data.companyInfo.website,
        input_wechat: user_data.wechat,
        input_facebook: user_data.facebook,
        input_taxnoValue: user_data.companyInfo.taxno,
        nickName: user_data.nickName,
        sex: user_data.sex,
        headImg: user_data.headImg,
        logoImg: user_data.companyLogo,

      })
    
    if (user_data.companyInfo.province) {
      this.setData({
        province: user_data.companyInfo.province,
        city: user_data.companyInfo.city,
        district: user_data.companyInfo.district,
      })
    }
    if (user_data.fax){
      console.log(this.data.faxList)
      this.setData({
        faxList: user_data.fax.split(',')
      })
    }
    if (user_data.mobile) {
      this.setData({
        phoneList: user_data.mobile.split(',')
      })
    }
    }else{
      this.setData({
          userAccount: user_data,
        input_email: user_data.email,
        input_wechat: user_data.wechat,
        input_userName: user_data.realName,

      })
    }
    // var that = this;
    // if (this.data.input_phoneNumb2) {
    //   that.setData({
    //     phoneItem_2display: "block"
    //   })
    // }
    // if (this.data.input_phoneNumb3) {
    //   that.setData({
    //     phoneItem_3display: "block"
    //   })
    // }

    // if (this.data.input_faxNumb2) {
    //   that.setData({
    //     faxItem_2display: "block"
    //   })
    // }
    // if (this.data.input_faxNumb3) {
    //   that.setData({
    //     faxItem_3display: "block"
    //   })
    // }
    // if (this.data.userAccount.isManage > 0) {
    //   that.setData({
    //     input_addressClick: "block"
    //   })
    // }
    wx.request({
      url: app.globalData.bastUrl + '/industry/jFindAll', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (data) {
        var abc = [];

        abc = data.data.data;
        var name = ''
        abc.forEach(item=>{
          if (user_data.industryId == item.id){
            name = item.name
          }
        })
        _this.setData({
          job_array: abc,
          val_job:name,
          job_id: user_data.industryId
        })



      }
    })

  },
  changeInfo:function(){
    this.setData({
      changeCard:true
    })
  },
  addPhoneList: function () {
    console.log(this.data.phoneList)
    var list = this.data.phoneList.concat([''])
    var str = 'form.tel'
    this.setData({
      phoneList: list,
    })
  },
  cutPhoneList: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var lists = this.data.phoneList
    var list = lists.splice(index, 1)
    var str = 'form.tel'
    this.setData({
      phoneList: lists,
    })
  },
  addFaxList: function () {
    console.log(this.data.faxList)
    var list = this.data.faxList.concat([''])
    var str = 'form.fax'
    this.setData({
      faxList: list,
    })
  },
  cutFaxList: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var lists = this.data.faxList
    var list = lists.splice(index, 1)
    var str = 'form.fax'
    this.setData({
      faxList: lists,
    })
  },
  phoneInput: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var str = 'phoneList[' + index + ']'
    this.setData({
      [str]: e.detail.value,
    })
    console.log('输入手机号为', e.detail.value)
  },
  faxListInput: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var str = 'faxList[' + index + ']'
    this.setData({
      [str]: e.detail.value,
    })
  },
  wsxx_scmp: function () {
    wx.navigateTo({
      url: '/pages/userCenter/peopleAuther/peopleAuther'
    })
  },
  upLoadImage: function () {
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
            logoImgShow: true
          })
        }
      })
    } else {
      wx.showToast({
        title: "您不是管理员",
        icon: 'none'
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
    this.getCompanyList(e.detail.value)
  },
  getCompanyList: function (name) {
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
  choose: function (e) {
    var id = e.currentTarget.dataset.id
    reqpost(app.globalData.bastUrl, '/company/jFind', {
      'id': id
    }, "post", true).then(res => {
      console.log(res)
      if (res.success) {
        var str = 'form.companyName'
        var str_address = 'form.address'
        var name = ''
        this.data.job_array.forEach(item => {
          if (res.data.industryId == item.id) {
            name = item.name
          }
        })

        this.setData({
          input_companyName: res.data.name,
          companyList: [],
          val_job: name,
          job_id: res.data.industryId,
          province: res.data.province || '请选择省市区',
          city: res.data.city,
          district: res.data.district,
          input_address: res.data.address
        })
      }
    })
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
    if (this.data.userAccount.isManage > 0 || this.data.userAccount.companyId < 0) {
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
  input_taxnoValue: function (e) {
    this.setData({
      input_taxnoValue: e.detail.value,
    })
  },

  // 提交保存
  commitBtnAction: function () {
    //console.log(this.data.company_logo);
    if (this.data.userAccount.companyId > 0 || this.data.changeCard){
      // console.log('input_userName' + this.data.input_userName)
      // console.log('input_companyName' + this.data.input_companyName)
      // console.log('input_userJob' + this.data.input_userJob)
      // console.log('province' + this.data.province)
      // console.log('city' + this.data.city)
      // console.log('district' + this.data.district)
      // console.log('input_setionName' + this.input_setionName)
      if (this.data.input_userName == ''
        || this.data.input_companyName == ''
        || this.data.input_setionName == ''
        || this.data.input_userJob == ''
        || this.data.province == ''
        || this.data.city == ''
        || this.data.district == '') {
        wx.showToast({
          title: "请输入所有的必填项！",
          icon: 'none',
        })
        return;
      }
    }
    var list = this.data.phoneList
    var fax_list = this.data.faxList
    if (list.length > 1) {
      list = list.join(',')
    }
    if (fax_list.length > 1) {
      fax_list = fax_list.join(',')
    }
    
    reqpost(app.globalData.url, '/weixin/api/accept/user/modify', {
      'mobile': this.data.userAccount.account,

      'realName': this.data.userAccount.realName || this.data.input_userName,
      'industryId': this.data.job_id,
      'companyName': this.data.input_companyName,
      'tel': list,
      'job': this.data.input_userJob,
      'dept': this.data.input_setionName,
      'email': this.data.input_email,
      'address': this.data.input_address,
      'website': this.data.input_web,
      'wechat': this.data.input_wechat,
      'facebook': this.data.input_facebook,
      'fax': fax_list,
      'nickName': this.data.nickName,
      'taxno': this.data.input_taxnoValue,
      'province': this.data.province,
      'city': this.data.city,
      'district': this.data.district
    }, "POST", true).then(res => {
      console.log(res);
      if (res.success) {
        wx.navigateBack()
        

      } 
    })
  },
  addPhoneItemsAction: function (e) {
    if (this.data.phoneItem_2display == "none") {
      this.setData({
        phoneItem_2display: 'block',
      })
      return;
    } else if (this.data.phoneItem_3display == "none") {
      this.setData({
        phoneItem_3display: 'block',
      })
      return;
    } else if (this.data.phoneItem_3display == "block") {
      wx.showToast({
        title: "最多只能添加3个电话",
        icon: 'none',
      })
      return
    }

  },
  addFaxItemsAction: function () {
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
  minusPhoneItemsAction: function () {
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
  minusFaxItemsAction2: function () {
    this.setData({
      faxItem_2display: 'none',
      input_faxNumb2: null,
    })
  },
  minusFaxItemsAction3: function () {
    this.setData({
      faxItem_3display: 'none',
      input_faxNumb3: null,
    })
  },
  modifyAccount:function(){
    wx.navigateTo({
      url: '/pages/userCenter/modifiPhoneNumb/modifiPhoneNumb?userPhone=' + this.data.userAccount.account
    })
  },
  //选择行业的picker
  bindPickerChange: function (e) {
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
    this.setData({
      job_id: this.data.job_array[e.detail.value].id,
      formPickerColors: "black"
    })

    console.log(this.data.job_array[e.detail.value].name);
  },

})