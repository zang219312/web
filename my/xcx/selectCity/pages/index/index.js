//index.js
//获取应用实例
const app = getApp()
const citys = require('../../libs/city')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchLetter: [],
    isShowLetter:false,
    timer:null,
    anime:false
  },
  onLoad: function () {
    console.log(citys);
    let searchletter = citys.searchLetter;
    let cityList = citys.cityList();
    let sysInfo = wx.getSystemInfoSync();
    // 每一个 A 的高度
    let letterHigh = sysInfo.windowHeight / searchletter.length;
    let tmpArr = [];

    searchletter.map((val, key) => {
      let tmp = {};
      tmp.name = val;
      tmp.tHeight = key * letterHigh;
      tmp.bHeight = (key+1) * letterHigh;
      tmpArr.push(tmp)
    })


    this.setData({
      searchLetter: tmpArr
    })
  },

  clickLetter(e){
    let showLetter = e.currentTarget.dataset.letter;

    this.setData({
      toastShowLetter:showLetter,
      isShowLetter:true
    })

    /* this.data.timer = setTimeout(()=>{
      this.setData({
        isShowLetter:false
      })
    },500) */

  },
  onHide(){
    // clearTimeout(this.data.timer)
  }

})