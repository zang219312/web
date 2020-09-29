// pages/home/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList:Array,
    isaddbgcolor:Boolean,
    iconList:Array,
    gridCol:String,
    msgList:Array,
    tablist:Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    TabCur:0,
    scrollLeft:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  }
})
