// components/floating.js
Component({
  options: {
    multipleSlots: true, // 启用多个插槽
  },

  behaviors: [], //类似于 mixins 和 traits 的组件间代码复用机制

  properties: {
    showDragableArea: {
      type: Boolean,
      value: false
    },
    // 可拖动位置
    dragableArea: {
      type: Object,
      value: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    },
    // 初始位置
    offset: {
      type: Object,
      value: {
        top: undefined,
        left: undefined
      }
    },
    // 元素宽高
    dragAttr: {
      type: Object,
      value: {
        width: 0,
        height: 0
      }
    },
    // 是否显示边距
    padding: {
      type: String || Number,
      value: 0
    },
    // 是否拖动
    controlled: {
      type: Boolean,
      value: true
    },
    
  },

  data: {},

  lifetimes: {
    ready() {
      this.systemInfo = wx.getSystemInfoSync();

      this.dragableArea = {
        top: this.data.dragableArea.top || 0,
        left: this.data.dragableArea.left || 0,
        right: this.data.dragableArea.right || 0,
        bottom: this.data.dragableArea.bottom || 0
      }

      this.dragableArea.width = this.data.dragableArea.right == 0 ? this.systemInfo.windowWidth : this.systemInfo.windowWidth - this.data.dragableArea.right - this.data.dragableArea.left;
      this.dragableArea.height = this.data.dragableArea.bottom == 0 ? this.systemInfo.windowHeight : this.systemInfo.windowHeight - this.data.dragableArea.bottom - this.data.dragableArea.top;
      var offset = this.data.offset || {};
      var top = typeof offset.top == "undefined" ? this.dragableArea.top : offset.top;
      var left = typeof offset.left == "undefined" ? this.dragableArea.left : offset.left;
      console.log(top, left);
      // padding
      this.setData({
        top: top - this.data.padding || 0,
        left: left - this.data.padding || 0,
        moveable: this.dragableArea,
        opacity:1
      })
      this._setCartAttr();
    },
    moved: function () {},
    detached: function () {},
  },

  attached: function () {},
  ready: function () {},
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  observers: {},

  /**
   * 组件的方法列表
   */
  methods: {
    clickMe(e) {
      console.log(e);
      this.triggerEvent('click', {
        url: '../../cart/cart'
      }, {
        options: 'myEventOption'
      })
    },
    start(e) {

      this._setCartAttr();
      this.setData({
        opacity: 0.8,
        transition: ''
      })
    },
    move(e) {
      let x = e.changedTouches[0].pageX,
        y = e.changedTouches[0].pageY;

      // todo 每次点击时触发了 start 和 move，待优化
      // 点击在了圆上 单点范围再小球上时不执行下文
      if (this._isPointInCircle(x, y)) return;

      if (x < this.dragableArea.left || x > this.dragableArea.width) {
        this.fixOffset = true;
      }
      if (y < this.dragableArea.top || y > this.dragableArea.height) {
        this.fixOffset = true;
      }

      x = x <= this.dragableArea.left ? this.dragableArea.left : x
      x = x >= this.dragableArea.width + this.dragableArea.left ? this.dragableArea.width + this.dragableArea.left : x
      y = y <= this.dragableArea.top ? this.dragableArea.top : y
      y = y >= this.dragableArea.height + this.dragableArea.top ? this.dragableArea.height + this.dragableArea.top : y
      // 但移动超出市，只允许超出一半，松开后复位紧贴边界
      this.offsetLeft = Math.floor(x - this.offsetWidth / 2);
      this.offsetTop = Math.floor(y - this.offsetHeight / 2);
      // console.log('offsetLeft--  ', this.offsetLeft, 'offsetTop--  ', this.offsetTop);

      this.setData({
        top: this.offsetTop,
        left: this.offsetLeft,
      })
    },
    cancel(e) {
      this._toFixOffset()
      this._setCartAttr();

    },
    end(e) {

      if (e.changedTouches[0].clientX > this.systemInfo.windowWidth / 2) {
        e.changedTouches[0].clientX = this.systemInfo.windowWidth - this.offsetWidth;
      } else if (e.changedTouches[0].clientX <= this.systemInfo.windowWidth / 2) {
        e.changedTouches[0].clientX = 0;
      }

      this.setData({
        transition: 'transition:transform 0.2s linear',
        opacity: 1,
        left: e.changedTouches[0].clientX,
      })
      this._toFixOffset();
      this._setCartAttr();
    },
    _toFixOffset() {

      if (this.fixOffset) {
        this.offsetLeft = this.offsetLeft < this.dragableArea.left ? this.dragableArea.left : this.offsetLeft;
        this.offsetLeft = this.offsetLeft >= this.dragableArea.width + this.dragableArea.left - this.offsetWidth ? this.dragableArea.width + this.dragableArea.left - this.offsetWidth : this.offsetLeft;

        this.offsetTop = this.offsetTop < this.dragableArea.top ? this.dragableArea.top : this.offsetTop;
        this.offsetTop = this.offsetTop >= this.dragableArea.height + this.dragableArea.top - this.offsetHeight ? this.dragableArea.height + this.dragableArea.top - this.offsetHeight : this.offsetTop;
        this.setData({
          top: this.offsetTop,
          left: this.offsetLeft,
          transition: 'transition:all 0.3s linear',
        })

      }
    },
    _isPointInCircle(x, y) {
      let radius = this.offsetWidth / 2;
      let centerX = this.offsetLeft + radius;
      let centerY = this.offsetTop + radius; // 圆心y坐标

      let diffX = centerX - x;
      let diffY = centerY - y;
      let inCircle = radius * radius >= diffX * diffX + diffY * diffY;
      return inCircle;
    },
    _setCartAttr() {
      const query = wx.createSelectorQuery().in(this),
        that = this;
      query.select('.xuanfu').boundingClientRect()
      query.exec(function (res) {
        that.queryExec = res;
        that.offsetWidth = res[0].width;
        that.offsetHeight = res[0].height;
        that.offsetLeft = res[0].left;
        that.offsetTop = res[0].top;
      })
      console.log('that', that);
    }
  }
})