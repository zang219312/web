// pages/previewImage/previewImage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tplist: [{
      img: '../../images/logo1.png'
    }, {
      img: '../../images/logo2.png'
    }, {
      img: '../../images/logo3.png'
    }, {
      img: '../../images/logo4.png'
    }],
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    console.log(options);
    that.setData({
      ylt: options.img,
      current: options.ids,
      scid: options.scid,
      imgurl: options.imgurl,
      spid: options.spid,
      price: options.price,
      quantity_p: options.quantity_p,
      title: options.title

    })
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'preview',
        scid: options.scid
      },
      success: function(res) {
        console.log(res);
        if (res.data.length > 4) {
          that.setData({
            tplist: res.data,
            multiple_item: 4
          })
        } else {
          that.setData({
            tplist: res.data,
            multiple_item: res.data.length - 1
          })
        }

      }
    })
    console.log(that);

  },


  getBg: function(e) {
    console.log('点击');
    console.log(e);
    console.log(this);
    this.setData({
      ylt: e.target.dataset.ylt,
      current: e.target.dataset.postid
    })
  },

  choose: function(e) {
    wx.navigateBack({
      delta: 1,
      success: function(res) {
        console.log(res);
      },
    })
  },
  delspan: function(e) {
    console.log(e);
    var that = this;
    var d = "dan";
    that.unlink(that.data.tplist[that.data.current].img, d);
  },
  unlink: function(pic, d) {
    var that = this;
    console.log(that);
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

              var listArr = msg.data;
              console.log(listArr);
              if (listArr == 0) { //图片删完
                wx.redirectTo({
                  url: '../upImg/upImg?imgurl=' + that.data.imgurl + '&price=' + that.data.price + '&quantity_p=' + that.data.quantity_p + '&scid=' + that.data.scid + '&spid=' + that.data.spid + '&title=' + that.data.title,
                })
              } else { //没删完
                if (listArr.length == that.data.current) {
                  that.setData({
                    tplist: listArr,
                    current: listArr.length - 1
                  })
                  console.log('==');

                }
                if (listArr.length > 4) {
                  console.log('a');
                  that.setData({
                    tplist: listArr,
                    multiple_item: 4,
                    ylt: listArr[that.data.current].img
                  })

                } else if (listArr.length > 0) {
                  console.log('b');
                  that.setData({
                    tplist: listArr,
                    multiple_item: listArr.length - 1,
                    ylt: listArr[that.data.current].img
                  })

                }

              }
            }
          })
        }
      }
    })
  },
  change: function(e) {
    console.log(e);
    let that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current,
        ylt: this.data.tplist[e.detail.current].img
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
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onhide');
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