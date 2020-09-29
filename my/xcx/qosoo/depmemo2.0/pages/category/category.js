// pages/category/category.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    selectAllStatus: true, // 全选状态，默认全选
    selectedLength: 0,
    m: 0,
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
        typ: 'category',
        nam: options.nam

      },
      success: function(res) {
        console.log(res);
        that.setData({
          goodsList: res.data.list,
          name: options.nam,
          selectAllStatus: false,
        })
      }
    })

  },

  viewPay: function() {
    let goodsList = this.data.goodsList;
    var dat = "";
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].checked) {
        dat += goodsList[i]["id"] + ",";
      }
    }
    // wx.request({
    //   url: app.globalData.URL,
    //   data: {
    //     "typ": "add_category",
    //     "dat": dat,
    //     "pid": app.userId
    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res) {

    //     wx.redirectTo({
    //       url: '../cart/cart',
    //     })

    //   }
    // })
  },
  /**
   * 商品选择
   */
  selectList: function(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let goodsList = this.data.goodsList; // 获取购物车列表
    const checked = goodsList[index].checked; // 获取当前商品的选中状态
    goodsList[index].checked = !checked; // 改变状态

    this.setData({
      goodsList: goodsList
    });

    this.hasGoodsSelected();

  },

  /**
   * 商品全选
   */
  selectAll: function(e) {

    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let goodsList = this.data.goodsList;

    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].checked = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      goodsList: goodsList
    });

    this.hasGoodsSelected();
  },

  /**
   * 判断是否有选中的商品,更新按钮状态
   */
  hasGoodsSelected: function(e) {
    let selectedLength = 0;
    let goodsList = this.data.goodsList;
    var _m = 0;
    _m = parseFloat(_m);
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].checked) {
        selectedLength++;
        _m += parseFloat(goodsList[i]["price"])
      }
    }

    this.setData({
      selectAllStatus: selectedLength === goodsList.length,
      selectedLength: selectedLength,
      m: _m
    });
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
    this.hasGoodsSelected();
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