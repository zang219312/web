// pages/pav/pav.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    title: '商品名',
    title_v: '小视频',
    selectedLength: 0,
    btn: true,
    btn_v: true,
    icon_show: false,
    list: [],
    list_v: [],
    ge: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      let str = JSON.parse(options.str);
    var that = this;
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'img_show',
        imgurl: str.imgurl,
        spid: str.spid,
        quantity_p: str.quantity_p,
        uid: app.globalData.uid,
        scid: str.scid,
        the_category: str.the_category
      },
      success: function(res) {
        console.log(res);
        var listArr = [];
        var classname = '.divimg';
        for (var i = 0; i < res.data[0].length; i++) {
          listArr.push({
            img: ''
          });
          listArr[i].img = res.data[0][i]
        }
        that.setData({
          list: listArr,
          m: listArr.length,
          sc_type: res.data[1],
          title: str.title,
          imgurl: str.imgurl,
          spid: str.spid,
          quantity_p: str.quantity_p,
          quantity_v: str.quantity_v,
          price: str.price,
          scid: str.scid,
          num: str.num
        })
      }
    })
  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;
    var currentTarget = e.currentTarget.dataset.current;

    if (this.data.currentTab === currentTarget) {
      return false;
    } else {
      that.setData({
        currentTab: currentTarget
      })
    }

  },

  choose: function(e) {
    let btn = this.data.btn;
    let icon_show = this.data.icon_show;
    btn = !btn;
    icon_show = !icon_show;
    this.setData({
      btn: btn,
      icon_show: icon_show,
    })
  },

  choose_v: function(e) {
    let btn_v = this.data.btn_v;
    btn_v = !btn_v;
    this.setData({
      btn_v: btn_v,
    })
  },
  chooseImage: function() {
    var that = this;
    console.log(that);
    let cou = that.data.quantity_p - that.data.m;
    if (cou >= 10) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: 9,
        success: function(res) {
          console.log(res);
          var tempFilePaths = res.tempFilePaths;

          for (var index in res.tempFilePaths) {
            that.upload_file(`${app.globalData.url}/api.php`, tempFilePaths[index])
          }

        }
      })
    } else {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: cou,
        success: function(res) {
          console.log(res);
          var tempFilePaths = res.tempFilePaths;

          for (var index in res.tempFilePaths) {
            that.upload_file(`${app.globalData.url}/api.php`, tempFilePaths[index])
          }

        }
      })
    }
  },

  upload_file: function(url, filePath) {
    var that = this;
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'fileup',
      formData: {
        typ: 'upImg_sucai_up',
        uid: app.globalData.uid,
        spid: that.data.spid,
        imgurl: that.data.imgurl,
        scid: that.data.scid,
        quantity_p: that.data.quantity_p

      }, // HTTP 请求中其他额外的 form data
      success: function(res) {
        //console.log(res);
        //var a = JSON.stringify(res.data);
        // var b = a.replace('0\r\n\r\n', '0');
        let newData = res.data.replace(/\r\n/g, "");

        if (newData == 'upfail1') {
          wx.showModal({
            title: '提示',
            content: '请上传后缀名为.jpg的图片',
          })

        } else {
          var data = JSON.parse(res.data);
          //console.log(data);
          var listArr = [];
          var classname = '.divimg';
          for (var i = 0; i < data.length; i++) {
            listArr.push({
              img: ''
            });
            listArr[i].img = data[i]
          }
          that.setData({
            list: listArr,
            m: listArr.length
          })
        }


      }
    })
  },

  choosevideo: function() {
    var that = this;
    console.log(that);

  },

  jiesuan: function() {
    var that = this;
    var _ref_dat = "";
    _ref_dat += that.data.spid + "[|-|]" + that.data.scid + "[|-|]" + that.data.num + "[|-|]" + that.data.sc_type + "[|br|]";
    console.log(_ref_dat);
    wx.showModal({
      title: '套餐暂未上传完成，',
      content: '您可在结算后进入个人中心继续上传',
      success: res => {
        if (res.confirm) {
          wx.redirectTo({
            url: '../pay/pay?dat=' + _ref_dat
          })
        }
      }
    })
  },
  fanhui: function(e) {
    this.setData({
      btn: true,
      icon_show: false
    })
  },
  delspan: function(e) {
    var that = this;
    let list = that.data.list;

    var dat = "";
    for (var i = 0; i < list.length; i++) {
      if (list[i].checked) {
        dat += list[i]["img"] + ",";
      }
    }
    //console.log(dat);
    var d = "duoxuan";

    that.unlink(dat, d);
  },

  unlink: function(pic, d) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您是否要删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.url}/api.php`,
            data: {
              typ: 'duo_del',
              tu: pic,
              imgurl: that.data.imgurl,
              d: d,
              scid: that.data.scid
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(msg) {
              console.log(msg.data);
              var listArr = [];
              if (msg.data != 0) {
                for (var i = 0; i < msg.data[0].length; i++) {
                  listArr.push({
                    img: ''
                  });
                  listArr[i].img = msg.data[0][i]
                }
              } else if (msg.data == 0) {

              }

              that.setData({
                list: listArr,
                m: listArr.length,
                showModal: false
              })

              that.hasGoodsSelected();
            }
          })
        }

      }
    })
  },


  /**
   * 判断是否有选中的,更新按钮状态
   */
  hasGoodsSelected: function(e) {
    let selectedLength = 0;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        selectedLength++;
        //list[i].checked = false;
      }
    }
    this.setData({
      selectAllStatus: selectedLength === list.length,
      selectedLength: selectedLength,

    });

  },
  //单选
  selectList: function(e) {

    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = this.data.list; // 获取购物车列表
    const checked = list[index].checked; // 获取当前商品的选中状态
    list[index].checked = !checked; // 改变状态
    this.setData({
      list: list
    });
    console.log(this);
    this.hasGoodsSelected();

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
    this.VideoContext = wx.createVideoContext('myVideo')
  },
  play: function(e) {
    console.log(e);
    this.setData({
      curr_id: e.currentTarget.dataset.ids,
    })

    this.VideoContext.play()

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})