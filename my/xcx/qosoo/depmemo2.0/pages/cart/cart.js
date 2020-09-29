// pages/cart/cart.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count_m: 0, //总金额
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    selectAllStatus: false, // 全选状态，默认全选
    isEdit: false, // 是否开启编辑
    showModalStatus: false, // 是否显示规格弹窗
    selectedLength: 0,
    is_del: false,
    currentColorItem: 0,
    ge: 0
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
        typ: 'carts',
        uid: app.globalData.uid
      },
      success(res) {
        console.log(res);
        if (res.data == null || res.data.length == 0) {
          that.setData({
            hasList: false,
            selectAllStatus: false
          })
        } else {
          that.setData({
            carts: res.data,
            hasList: true,
            selectAllStatus: false
          })
        }
      }
    })

  },

  tz: function(e) {
    console.log(e);
    let the_category = e.currentTarget.dataset.the_category;

    let para = {
      imgurl: e.currentTarget.dataset.imgurl,
      spid: e.currentTarget.dataset.spid,
      quantity_p: e.currentTarget.dataset.quantity_p,
      quantity_v: e.currentTarget.dataset.quantity_v,
      title: e.currentTarget.dataset.tit,
      scid: e.currentTarget.dataset.scid,
      price: e.currentTarget.dataset.price,
      the_category: e.currentTarget.dataset.the_category,
      num: e.currentTarget.dataset.num,
      filename: e.currentTarget.dataset.filename,
    };
    let PARA = JSON.stringify(para);

    switch (the_category) {
      case "pic":
        wx.navigateTo({
          url: '../upImg/upImg?str=' + PARA
        })
        break;
      case "video":
        wx.navigateTo({
          url: '../video/video?str=' + PARA
        })
        break;
      case "pav":
        wx.navigateTo({
          url: '../pav/pav?str=' + PARA
        })
        break;
      case "jiesuan":
        break;
    }
  },

  /**
   * 购物车选择
   */
  selectList: function(e) {
    console.log(this);
    console.log(e);
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取购物车列表
    const checked = carts[index].checked; // 获取当前商品的选中状态

    carts[index].checked = !checked; // 改变状态

    this.setData({
      carts: carts,
    });

    this.isCartSelected();

  },

  /**
   * 购物车全选
   */
  selectAll: function(e) {
    console.log(this);
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {

      carts[i].checked = selectAllStatus; // 改变所有商品状态
      this.setData({
        selectAllStatus: selectAllStatus,
        carts: carts
      });
    }


    this.isCartSelected();


  },


  /**
   * 购物车编辑
   */
  editCart: function(e) {
    console.log(e);

    this.setData({
      isEdit: !!e.currentTarget.dataset.value
    })
    this.isCartSelected()
  },

  /**
   * 颜色切换
   */
  tabChooseColor: function(options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    //设置当前样式
    that.setData({
      currentColorItem: id
    })
  },
  /**
   * 弹窗
   */
  actionDrawer: function(e) {
    var that = this
    console.log(e)
    // wx.request({
    //   url: app.globalData.URL,
    //   data: {
    //     "typ": "car_item",
    //     "pid": app.userId,
    //     "pro_id": e.currentTarget.dataset.pro_id,
    //     "gg": e.currentTarget.dataset.gg
    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res) {
    //     that.setData({
    //       edit_nam: res.data.name,
    //       edit_m: res.data.m,
    //       skuColorList: res.data.ys,
    //       edit_id: res.data.edit_id,
    //       currentColorItem: res.data.edit_gg
    //     })
    //     var currentStatu = e.currentTarget.dataset.statu;
    //     that.showModal(currentStatu)
    //   }
    // })

  },
  endDrawer: function(e) {
    var that = this
    // wx.request({
    //   url: app.globalData.URL,
    //   data: {
    //     "typ": "car_item_change",
    //     "pid": app.userId,
    //     "edit_id": that.data.edit_id,
    //     "gg": that.data.skuColorList[that.data.currentColorItem]['txt']
    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res) {
    //     if (res.data == "null") {
    //       that.setData({
    //         carts: res.data,
    //         hasList: false,
    //         selectAllStatus: false
    //       })
    //     } else {
    //       that.setData({
    //         carts: res.data,
    //         hasList: true,
    //         selectAllStatus: false
    //       })
    //     }
    //     var currentStatu = e.currentTarget.dataset.statu;
    //     that.showModal(currentStatu)
    //   }
    // })
  },

  showModal: function(currentStatu) {
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation

    animation.translateY(300).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })

      //关闭
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        })
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });

    }
  },


  /**
   * 跳转到付款页面
   */
  viewPay: function(e) {
    var that = this
    console.log(that);
    let carts = this.data.carts;
    var _ref_dat = "";
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].checked) {
        if (carts[i].put == 1) {
          _ref_dat += that.data.carts[i]["sp_id"] + "[|-|]" + that.data.carts[i]['scid'] + "[|-|]" + that.data.carts[i]["num"] + "[|-|]" + that.data.carts[i]["name"] + "[|br|]";
        }
      }
    }
    console.log(_ref_dat);
    console.log('aa');
    wx.navigateTo({
      url: '../pay/pay?dat=' + _ref_dat,
    })
  },


  /**
   * 增加数量
   */
  addCount: function(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = parseInt(num) + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
  },

  /**
   * 减少数量
   */
  minusCount: function(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
  },

  /**
   * 删除商品
   */
  deleteList: function(e) {

    var that = this;
    let carts = that.data.carts;
    let newCarts = [];
    wx.showModal({
      title: '您是否要删除？',
      content: '（包含商品内已上传的照片及视频）',
      success: function(res) {
        if (res.confirm) {
          for (let i = 0; i < carts.length; i++) {
            if (!carts[i].checked) {
              // 删除购物车列表里这个商品
              newCarts.push(carts[i]);
            }
          }
          that.setData({
            carts: newCarts
          });
          if (!newCarts.length) {
            // 如果购物车为空
            that.setData({
              hasList: false, // 修改标识为false，显示购物车为空页面
              is_del: true
            });

            that.isCartSelected()
          } else { // 如果不为空
            // 重新计算总价格
            that.setData({
              is_del: true
            })
            that.isCartSelected()
          }
        }

      }

    })


  },

  /**
   * 跳转到商品列表
   */
  viewGoodsList: function(e) {
    wx.navigateTo({
      url: '../goodsList/goodsList?id=0',
    })
  },

  /**
   * 判断购物车是否有选中的item,更新按钮状态
   */
  isCartSelected: function(e) {
    var that = this
    let selectedLength = 0;
    let carts = this.data.carts;
    var _m = 0;
    _m = parseFloat(_m);
    var _ref_dat = "";
    for (let i = 0; i < carts.length; i++) {
      // 改1
      if (carts[i].checked) {

        if (carts[i].put == 1) {
          _m += that.data.carts[i]['price'] * that.data.carts[i]['zhang'] * that.data.carts[i]['num']
          selectedLength++;
        } else {
          selectedLength++;
        }
      }

      _ref_dat += that.data.carts[i]["sp_id"] + "[|-|]" + that.data.carts[i]['scid'] + "[|-|]" + that.data.carts[i]["num"] + "[|-|]" + that.data.carts[i]["name"] + "[|br|]";
    }
    // console.log(_ref_dat);
    _m = Math.round(_m * 100) / 100;
    this.setData({
      selectAllStatus: selectedLength === carts.length,
      selectedLength: selectedLength,
      count_m: _m
    });
    if (_ref_dat != "" || that.data.is_del) {
      wx.request({
        url: `${app.globalData.url}/api.php`,
        data: {
          "typ": "ref_car",
          "uid": app.globalData.uid,
          "dat": _ref_dat
        },
        success: function(res) {
          that.setData({
            is_del: false
          })
        }
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
    var that = this;

    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'carts',
        uid: app.globalData.uid
      },
      success: function(res) {
        if (res.data == null || res.data.length==0) {
          that.setData({
            hasList: false,
            selectAllStatus: false
          })
        } else {
          that.setData({
            carts: res.data,
            hasList: true,
            selectAllStatus: false
          })
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
    var that = this;
    wx.stopPullDownRefresh();
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'carts',
        uid: app.globalData.uid
      },
      success: function(res) {

        if (res.data == null) {
          that.setData({
            hasList: false,
            selectAllStatus: false,
          })
        } else {
          that.setData({
            carts: res.data,
            hasList: true,
            selectAllStatus: false,
            isEdit: false
          })
        }
      }
    })
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