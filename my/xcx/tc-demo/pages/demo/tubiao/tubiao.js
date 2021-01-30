Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasInfo: {},
    dataList: [{
      title: "17岁以下",
      value: 0
    }, {
      title: "18-24岁",
      value: 8
    }, {
      title: "25-29岁",
      value: 9
    }, {
      title: "30-39岁",
      value: 7
    }, {
      title: "40-49岁",
      value: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.messureCanvas()

  },

  messureCanvas() {
    let query = wx.createSelectorQuery().in(this);
    // 然后逐个取出navbar和header的节点信息
    // 选择器的语法与jQuery语法相同
    query.select('#columnarCanvas').boundingClientRect();
    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    var that = this
    query.exec((res) => {
      // 分别取出navbar和header的高度 
      console.log(res)
      var canvasInfo = {}
      canvasInfo.width = res[0].width
      canvasInfo.height = res[0].height
      that.setData({
        canvasInfo: canvasInfo
      })
      console.log(canvasInfo)
      that.drawColumnar()
    })
  },
  drawColumnar() {
    const ctxColumnar = wx.createCanvasContext("columnarCanvas")
    var dataList = this.data.dataList
    var canvasInfo = this.data.canvasInfo
    var columnarNum = dataList.length
    var columnarWidth = (canvasInfo.width - 30) / (2 * columnarNum + 1)
    console.log("宽度", columnarWidth)
    var maxColumnarHeight = canvasInfo.height - 60 - 20
    var maxColumnarValue = 0
    var totalValue = 0
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].value > maxColumnarValue) {
        maxColumnarValue = dataList[i].value
      }
      totalValue = totalValue + dataList[i].value
    }
    for (var i = 0; i < dataList.length; i++) {
      ctxColumnar.setFontSize(15)
      var percent = parseInt(dataList[i].value * 100 / totalValue) + "%"
      var dx = columnarWidth * (2 * i + 1)
      var dy = canvasInfo.height - (maxColumnarHeight * (dataList[i].value / maxColumnarValue) + 60) + 10
      ctxColumnar.setFillStyle('#2b2b2b')
      var percentWidth = ctxColumnar.measureText(percent)
      ctxColumnar.fillText(percent, dx + columnarWidth / 2 - percentWidth.width / 2, dy)
      ctxColumnar.setFillStyle('rgb(99, 112, 210)')
      var valueWidth = ctxColumnar.measureText(dataList[i].value + "")
      ctxColumnar.fillText(dataList[i].value + "", dx + columnarWidth / 2 - valueWidth.width / 2, dy + 20)
      ctxColumnar.fillRect(dx, dy + 22, columnarWidth, maxColumnarHeight * (dataList[i].value / maxColumnarValue))
      ctxColumnar.setFillStyle('#8a8a8a')
      var titleWidth = ctxColumnar.measureText(dataList[i].title + "")
      ctxColumnar.fillText(dataList[i].title, dx + columnarWidth / 2 - titleWidth.width / 2, canvasInfo.height - 10)
    }
    ctxColumnar.draw()
  },

})