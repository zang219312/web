// pages/goodsDetail/goodsDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    indicatorColor: 'rgba(0,0,0,0.3)',
    indicatorActiveColor: '#fff',
    num: 1,
    currentColorItem: 0,
    skuColorList: [{
        id: 3,
        txt: '红色'
      },
      {
        id: 4,
        txt: '黑色'
      },
      {
        id: 5,
        txt: '白色'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(that);
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'goodsdetail',
        id: options.id
      },
      success: function(res) {
        console.log(res);
        that.setData({
          name: res.data.detail.name,
          price: res.data.detail.price,
          material: res.data.detail.material,
          specifications: res.data.detail.specifications,
          skuColorList: res.data.detail.color,
          imgurls: res.data.detail.pic,
          the_category: res.data.detail.The_category,
          quantity_p: res.data.detail.quantity_p,
          quantity_v: res.data.detail.quantity_v,
        })
      }
    })
  },

  /**
   * 增加数量
   */
  addCount: function(e) {
    let num = this.data.num;
    num = num + 1;
    this.setData({
      num: num
    });
  },

  /**
   * 减少数量
   */
  minusCount: function(e) {
    let num = this.data.num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    this.setData({
      num: num
    });
  },

  /**
   * 颜色
   */
  tabChooseColor: function(options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    //设置当前样式
    that.setData({
      currentColorItem: id
    })
  },

  add_img: function(e) {
    var that = this;
    var imgurl = that.CreateUserGetID('imgurl');
    that.setData({
      imgurl: imgurl
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var index in res.tempFilePaths) {
          that.upload_file(`${app.globalData.url}/api.php`, tempFilePaths[index], 'pic')
        }

      },
    })

  },

  upload_file(url, filePath, category) {
    var that = this;
  
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'fileup',
      formData: {
        typ: 'sucai_pic',
        uid: app.globalData.uid,
        the_category: that.data.the_category,
        spid: that.options.id,
        imgurl: that.data.imgurl,
        num: that.data.num,

      },
      success: function(res) {
        console.log(res);
        var data = JSON.parse(res.data);
        let str = {
          uid: app.globalData.uid,
          spid: that.options.id,
          color: that.data.skuColorList[that.data.currentColorItem].txt,
          num: that.data.num,
          quantity_p: that.data.quantity_p,
          quantity_v: that.data.quantity_v,
          the_category: that.data.the_category,
          imgurl: that.data.imgurl,
          title: that.data.name,
          price: that.data.price,
          scid:data.scid
        };
        let STR = JSON.stringify(str);
        if (data == 0) {
          wx.showModal({
            title: '',
            content: '请上传后缀名为jpg的图片',
          })
        } else {
          if (category == 'pic') {
            wx.navigateTo({
              url: '../upImg/upImg?str=' + STR 
            })
          } else if (category == 'pav') {
            wx.navigateTo({
              url: '../pav/pav?str=' + STR 
            })
          }

        }
      }

    })
  },

  add_video: function(e) {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'], //相册，相机
      maxDuration: 60, //拍摄视频最长拍摄时间，
      camera: 'back',
      success: function(res) {
        let imgurl = that.CreateUserGetID('imgurl');
        let filename = that.CreateUserGetID('filename');

        that.upload_video(`${app.globalData.url}/api.php`, res.tempFilePath, imgurl, filename, 'video');
      },
      fail: function() {
        wx.showLoading({
          title: '请选择视频文件上传',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)

      }
    })

  },

  upload_video(url, filePath, imgurl, filename, category) {
    var that = this;
    let str = {
      idx: app.globalData.idx,
      imgurl: imgurl,
      filename: filename,
      qunatity_p: that.data.quantity_p,
      quantity_v: that.data.quantity_v,
      spid: that.options.id,
      title: that.data.name,
      price: that.data.price,
      num: that.data.num,
      the_category: that.data.the_category,
    };
    let STR = JSON.stringify(str);

    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'fileup',
      formData: {
        typ: 'sucai_video',
        filename: filename,
        imgurl: imgurl,
        idx: app.globalData.idx,
        uid: app.globalData.uid,
        the_category: that.data.the_category,
        spid: that.options.id
      },
      success: function(res) {
        let newData = res.data.replace(/\r\n/g, "");
        if (newData == "da") {
          wx.showModal({
            title: '提示',
            content: "视频过大,建议选用美拍或微信小视频文件 ",
          })
        } else {
          wx.showLoading({
            title: '上传中',
            mask: true
          })
          setTimeout(function() {
            wx.hideLoading();
            wx.navigateTo({
              url: '../proframe/proframe?str=' + STR,
              success: function() {
                that.setData({
                  show: false
                })
              }
            })

          }, 800)
        }
      }
    })
  },


  add_pav: function(e) {
    var that = this;
    var imgurl = that.CreateUserGetID('imgurl');
    that.setData({
      imgurl: imgurl
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var index in res.tempFilePaths) {
          that.upload_file(`${app.globalData.url}/api.php`, tempFilePaths[index], 'pav')
        }

      },
    })

  },
  add_jiesuan: function(e) {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

  CreateUserGetID: function(e) { //获取当前时间的时间戳（图包ID）or filename
    var rand = Math.floor(Math.random(100, 999) * 1000);
    var date = new Date();
    let year = date.getFullYear(); //获取当前年份
    let mon = date.getMonth() + 1; //获取当前月份
    if (mon < 10) {
      mon = '0' + mon
    }
    let da = date.getDate(); //获取当前日
    if (da < 10) {
      da = '0' + da
    }
    //let day = date.getDay(); //获取当前星期几
    let h = date.getHours(); //获取小时
    if (h < 10) {
      h = '0' + h
    }
    let m = date.getMinutes(); //获取分钟
    if (m < 10) {
      m = '0' + m
    }
    let s = date.getSeconds(); //获取秒
    if (s < 10) {
      s = '0' + s;
    }
    let ms = date.getMilliseconds(); //获取毫秒

    if (e == 'imgurl') {
      var imgurl = (year + '' + mon + '' + da + '' + h + '' + m + '' + s + rand).substring(2) + "1";
      return imgurl;

    } else if (e == 'filename') {
      var filename = (year + '' + mon + '' + da + '' + m + '' + s + ms).substring(2)
      return filename;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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