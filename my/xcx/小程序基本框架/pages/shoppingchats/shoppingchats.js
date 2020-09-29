// pages/shoppingchats/shoppingchats.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    shanchuTap(e) {
      console.log(e)
      const myEventDetail = {
        "groupindex": e.currentTarget.dataset.groupindex,
        "index": e.currentTarget.dataset.index
      } // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('shanchuTap', myEventDetail, myEventOption)
    }
  }
})