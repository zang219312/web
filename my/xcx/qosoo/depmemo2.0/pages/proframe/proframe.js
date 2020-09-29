// pages/proframe/proframe.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      img: '../../images/logo4.png'
    }, {
      img: '../../images/logo3.png'
    }, {
      img: '../../images/logo2.png'
    }, {
      img: '../../images/logo1.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function() {
      wx.hideLoading();
    }, 3000);
    var that = this;
    console.log(that);
    let str = JSON.parse(options.str);
    that.setData({
      idx: str.idx,
      imgurl: str.imgurl,
      filename: str.filename,
      spid: str.spid,
      the_category: str.the_category,
      num: str.num
    })
    wx.request({
      url: `${app.globalData.url}/api.php?t=1`,
      data: {
        typ: 'getframe',
        filename: that.data.filename,
      },
      success: function(res) {
        let newRes = res.data.replace(/\r\n/g, "");
        if (newRes == "imgOK") {
          wx.request({
            url: `${app.globalData.url}/api.php?t=2`,
            data: {
              typ: 'getframe',
              filename: that.data.filename,
            },
            success: (res2) => {

              var listArr = [];
              var classname = ".divimg";
              for (var i = 0; i < res2.data.list[0].length; i++) {
                listArr.push({
                  img: ''
                });
                listArr[i].img = res2.data.list[0][i].replace(/[\r\n]/g, ""); //去除回车
              }

              that.setData({
                list: listArr,
              })
              for (var index in that.data.list) {
                that.juzhong(index, that.data.list[index].img, classname);
              }

            }
          })
        }
      },
    })
  },

  /**
   * 商品选择
   */
  selectList: function(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = this.data.list; // 获取购物车列表
    const checked = list[index].checked; // 获取当前商品的选中状态
    for (var i = 0; i < list.length; i++) { //一次只能选中一个
      list[i].checked = false;
    }
    list[index].checked = !checked; // 改变状态
    this.setData({
      list: list
    });

    this.hasGoodsSelected();
    console.log(this);
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
      }
    }
    this.setData({
      selectedLength: selectedLength,
    });

  },

  juzhong: function(index, src, classname) {
    var that = this;
    var list = that.data.list;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select(classname).boundingClientRect(function(rect) {
      that.setData({
        view_w: rect.width, //view的宽
      })
    }).exec();
    wx.getImageInfo({
      src: src,
      success: function(msg) {
        let view_w = that.data.view_w;
        let img_w = msg.width;
        let img_h = msg.height;
        if (img_w > img_h) {
          img_w = (img_w / img_h) * view_w;

          list[index].img_h = view_w;
          list[index].img_w = img_w;
          list[index].L = (-(img_w - view_w) / 2);

          that.setData({
            list: list,
            da_w: img_w,
            da_h: view_w,
          })
        } else {
          img_h = (img_h / img_w) * view_w;

          list[index].img_h = img_h;
          list[index].img_w = view_w;
          list[index].T = (-(img_h - view_w) / 2);

          that.setData({
            list: list,
            da_h: img_h,
            da_w: view_w
          })
        }
      }
    })
  },

  choosevideo: function() {
    var that = this;
    console.log(that);
    wx.chooseVideo({
      sourceType: ['album', 'camera'], //相册，相机
      maxDuration: 60, //拍摄视频最长拍摄时间，
      camera: 'back',
      success: function(res) {
        wx.uploadFile({
          url: `${app.globalData.url}/api.php`,
          filePath: res.tempFilePath,
          name: 'fileup',
          formData: {
            typ: 'sucai_video',
            filename: that.data.filename,
            imgurl: that.data.imgurl,
            idx: app.globalData.idx,
            uid: app.globalData.uid
          },
          success: function(res2) {
            console.log(res2);
            let newData = res2.data.replace(/\r\n/g, "");
            if (newData == "da") {
              wx.showModal({
                title: '提示',
                content: "视频过大,建议选用美拍或微信小视频文件 ",
              })
            } else if (newData == "Mp4OK") {
              wx.showLoading({
                title: '上传中',
                mask: true
              })
              setTimeout(function() {
                wx.hideLoading();
              }, 1000)
              wx.request({
                url: `${app.globalData.url}/api.php`,
                data: {
                  typ: 'getframe',
                  t: 1,
                  filename: that.data.filename,
                },
                success: (res3) => {
                  console.log(res3);
                  let newRes = res3.data.replace(/\r\n/g, "");
                  if (newRes == "imgOK") {
                    wx.request({
                      url: `${app.globalData.url}/api.php`,
                      data: {
                        typ: 'getframe',
                        t: 2,
                        filename: that.data.filename,
                      },
                      success: (res4) => {

                        var listArr = [];
                        var classname = ".divimg";
                        for (var i = 0; i < res4.data.list[0].length; i++) {
                          listArr.push({
                            img: ''
                          });
                          listArr[i].img = res4.data.list[0][i].replace(/[\r\n]/g, ""); //去除回车
                        }

                        that.setData({
                          list: listArr,
                        })
                        for (var index in that.data.list) {
                          that.juzhong(index, that.data.list[index].img, classname);
                        }

                      }
                    })
                  }

                }
              })

            }
          }
        })
      },
      fail: function(res) {
        wx.showLoading({
          title: '请选择视频文件上传',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)

      }
    })
  },

  huan: function() {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    setTimeout(function() {
      wx.hideLoading();
    }, 1500)
    var that = this;
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'getframe',
        filename: that.data.filename,
        idx: that.data.idx,
        t: 3
      },
      success: function(res) {
        var listArr = [];
        var classname = ".divimg";
        for (var i = 0; i < res.data.list[0].length; i++) {
          listArr.push({
            img: ''
          });
          listArr[i].img = res.data.list[0][i].replace(/[\r\n]/g, "");
        }
        that.setData({
          list: listArr,
        })

        for (var index in that.data.list) {
          that.juzhong(index, that.data.list[index].img, classname);
        }
      }
    })
  },

  queren() {
    if (this.data.selectedLength) {
      for (var i = 0; i < this.data.list.length; i++) {
        if (this.data.list[i].checked) {
          this.setData({
            fmt: this.data.list[i].img
          })
        }
      }

      wx.request({
        url: `${app.globalData.url}/api.php?t=fengmian`,
        data: {
          typ: 'getframe',
          idx: this.data.idx,
          filename: this.data.filename,
          imgurl: this.data.imgurl,
          fmt: this.data.fmt,
          spid: this.data.spid,
          uid: app.globalData.uid,
          the_category: this.data.the_category,
          num: this.data.num
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          console.log(res);
          //let data = res.data.replace(/\r\n/g, "");
          let str = JSON.parse(this.options.str);
          str.scid = res.data[1];
          let STR = JSON.stringify(str)
          if (res.data[0] == 'succok') {
            wx.navigateTo({
              url: '../video/video?str=' + STR,
            })
          }
        }

      })
    } else {
      wx.showModal({
        title: '请选择',
        content: '一张图作为封面',
      })
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