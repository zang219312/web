//index.js
//获取应用实例
const app = getApp()
const citys = require('../../libs/city')
Page({
  data: {
    searchLetter: [],
    isShowLetter: false,
    scrollTop:0,
    timer:null,
    anime: false,
    city:'杭州市',
    cityList:[]
  },
  onLoad: function () {
    let searchletter = citys.searchLetter;
    let cityList = citys.cityList();
    let sysInfo = wx.getSystemInfoSync();
    
    // 每一个 A 的高度
    let letterHigh = (sysInfo.windowHeight - 80) / searchletter.length;
    let tmpArr = [];

    searchletter.map((val, key) => {
      let tmp = {};
      tmp.name = val;
      tmp.tHeight = key * letterHigh;
      tmp.bHeight = (key + 1) * letterHigh;
      tmpArr.push(tmp)
    })


    this.setData({
      searchLetter: tmpArr,
      cityList:cityList,
      winHeight:sysInfo.windowHeight,
    })
  },

  clickLetter(e) {
    let showLetter = e.currentTarget.dataset.letter;

    this.setData({
      toastShowLetter: showLetter,
      scrollTopId:showLetter,
      isShowLetter: true,
      anime:true
    })

     

    this.data.timer = setTimeout(() => {
      this.setData({
        isShowLetter: false,
        // anime:false,
      })
    }, 1000)

  },




  onHide() {
    clearInterval(interval);
  }

})