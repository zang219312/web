// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityData: {},
    showDragableArea: false, // 是否显示可拖动区域
    dragableArea: { //可拖动区域
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    dragAttr: {
      width: 80,
      height: 80
    },
    offset: {
      top: 0,
      left: 0
    },
    padding: 20,
    controlled: true,
    radomheight: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  },

  go(e) {
    let obj = {
      id: 123465798,
      name: 'sdfsfs',
      packageId: 1232146735441,
      orderNo: 1324234687682313468,
      "errMsg": "getSystemInfo:ok",
      "model": "iPhone X",
      "pixelRatio": 3,
      "windowWidth": 375,
      "windowHeight": 724,
      "system": "iOS 10.0.1",
      "language": "zh_CN",
      "version": "7.0.4",
      "screenWidth": 375,
      "screenHeight": 812,
      "SDKVersion": "2.13.0",
      "brand": "devtools",
      "fontSizeSetting": 16,
      "benchmarkLevel": 1,
      "batteryLevel": 100,
      "statusBarHeight": 44,
      "safeArea": {
        "right": 375,
        "bottom": 812,
        "left": 0,
        "top": 44,
        "width": 375,
        "height": 768
      },
      "deviceOrientation": "portrait",
      "platform": "devtools",
      "devicePixelRatio": 3
    }
    let str = JSON.stringify(obj)
    //  encodeURIComponent(str)

    let id = e.currentTarget.dataset.id;

    const actions = new Map([
      ["1", ['城市选择', '../demo/city/city']],
      ["2", ['购物车动画', '../demo/fly/fly']],
      ["3", ['三级联动', '../demo/picker/picker']],
      ["4", ['参数', '../demo/qrcode/qrcode']],
      ["5", ['抽屉栏', '../demo/slide/slide']],
      ["6", ["海报", "../demo/poster/poster"]],
      ["7", ["日历", '../demo/calendar/calendar']],
      ["8", ["小球", '../demo/fab/fab']],
      ["9", ["自定义图表", '../demo/tubiao/tubiao']],
      ["10", ["时间线", '../demo/timeline/timeline']],
      ["11", ["手写板", '../demo/signature/signature']],
      ["default", ['other', 'index']]
    ])

    let action = actions.get(id) || actions.get('default')

    wx.navigateTo({
      url: action[1],
    })

  },
  click(e) {
    console.log(e.detail);
  },

  recorder() {
    const recorderManager = wx.getRecorderManager();
    console.log(recorderManager);
    this.setData({
      animeName: 'flash pulse'
    })
    clearTimeout(this.timer);
    this.stop = true
    recorderManager.onStart((res) => {
      console.log('监听录音开始', res)
    })
    recorderManager.onPause((res) => {
      console.log('监听录音暂停', res)
    })
    recorderManager.onStop((res) => {
      console.log('监听录音结束', res)
      const {
        tempFilePath
      } = res;
      this.setData({
        animeName: ''
      })
    })
    recorderManager.onFrameRecorded((res) => {
      const {
        frameBuffer
      } = res
      console.log('已录制完指定帧大小 :   frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000, // ms
      sampleRate: 44100, // 采样率
      numberOfChannels: 1, // 录音通道数
      encodeBitRate: 192000, // 编码码率
      format: 'mp3', // 音频格式 aac
      frameSize: 50, // mp3  KB
    }

    recorderManager.start(options)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sysInfo = wx.getSystemInfoSync();
    // 初始位置
    let offset = {
      left: sysInfo.windowWidth - this.data.dragAttr.width / 2,
      top: sysInfo.windowHeight - this.data.dragAttr.height / 2
    }
    this.setData({
      offset
    })
    return
    this.myradom();

  },

  myradom: function () {
    const that = this;
    var _radomheight = that.data.radomheight;
    console.log(that.data.radomheight);
    clearTimeout(this.timer);
    for (var i = 0; i < that.data.radomheight.length; i++) {
      //+1是为了避免为0
      _radomheight[i] = (100 * Math.random().toFixed(2)) + 1;
    }
    that.setData({
      radomheight: _radomheight
    });

    if (this.stop) return;
    this.timer = setTimeout(() => {
      that.myradom();
    }, 200);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {

    }
  }
})