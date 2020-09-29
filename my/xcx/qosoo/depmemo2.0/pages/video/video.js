// pages/video/video.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m: 0,
    title: '小视频',
    list: [],
    selectedLength: 0,
    btn: true,
    icon_show: false,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let str = JSON.parse(options.str);
    var that = this;
      console.log(that);
    console.log(str);
    wx.request({
      url: `${app.globalData.url}/api.php`,
      data: {
        typ: 'img_show',
        the_category: str.the_category,
        imgurl: str.imgurl,
        filename: str.filename,
        uid: app.globalData.uid,
        spid: str.spid,
        scid: str.scid
      },
      success: res => {
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
          title: str.title,
          imgurl: str.imgurl,
          filename: str.filename,
          spid: str.spid,
          quantity_v: str.quantity_v,
          price: str.price,
          scid: str.scid,
          num: str.num,
          the_category: str.the_category
        })
      }
    })
  },
  hid: function(e) {
    var that = this;

    that.setData({
      showModal: false,
    })

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
    this.hasGoodsSelected();
  },


  choosevideo() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'], //相册，相机
      maxDuration: 60, //拍摄视频最长拍摄时间，
      camera: 'back',
      success: (res) => {
        let imgurl = that.CreateUserGetID('imgurl');
        let filename = that.CreateUserGetID('filename');
        let str = {
          idx: app.globalData.idx,
          imgurl: imgurl,
          filename: filename,
          qunatity_p: that.data.quantity_p,
          quantity_v: that.data.quantity_v,
          spid: that.data.id,
          title: that.data.name,
          price: that.data.price,
          num: that.data.num,
            the_category: that.data.the_category,
        };
        let STR = JSON.stringify(str);

        wx.uploadFile({
          url: `${app.globalData.url}/api.php`,
          filePath: res.tempFilePath,
          name: 'fileup',
          formData: {
            typ: 'sucai_video',
            filename: filename,
            imgurl: imgurl,
            idx: app.globalData.idx,
            uid: app.globalData.uid,
              the_category: that.data.the_category,
            spid: that.data.spid
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

  play: function(e) {
    console.log(e);
    var that = this;
    let ids = e.currentTarget.dataset.ids;
    this.setData({
      showModal: true,
      play: that.data.list[ids].v
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
      }
    }
    this.setData({
      selectAllStatus: selectedLength === list.length,
      selectedLength: selectedLength,
    });

  },
  //单选
  selectList: function(e) {
    var that = this;
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = that.data.list; // 获取购物车列表
    const checked = list[index].checked; // 获取当前商品的选中状态
    list[index].checked = !checked; // 改变状态
    that.setData({
      list: list
    });
   this.hasGoodsSelected();
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