// pages/indextype/indextype.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    VerticalNavTop: String,
    MainCur: String,
    TabCur: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    load: true,
    cHeight:0
  },
  ready: function() {
    wx.getSystemInfo({
      success: res => this.setData({ cHeight: res.windowHeight })
    })
  },
/**
 * 组件的方法列表
 */
methods: {
  tabSelect(e) {
    const myEventDetail = {
      "id": e.currentTarget.dataset.id
    } // detail对象，提供给事件监听函数
    const myEventOption = {} // 触发事件的选项
    this.triggerEvent('tabSelect', myEventDetail, myEventOption)
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight =0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().in(that);
        console.log(view)
        view.select("#main-" + list[i].id).fields({
          size: true,
        }, data => {
          console.log(data)
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
      console.log(this.data.list)
    }
    let scrollTop = e.detail.scrollTop+120;
    console.log(scrollTop)
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
}
})