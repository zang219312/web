// components/cus-img/cus-img.js
const DEFAULT_IMG = '../../images/bind-failure.png'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    // 图片加载中，以及加载失败后的默认地址
    errSrc: {
      type: String,
      value: DEFAULT_IMG,
    },
    width: {
      type: String,
      value: '48rpx',
    },
    height: {
      type: String,
      value: '48rpx',
    },

    styleStr: {
      type: String,
      value: '',
    },
    imgMode: {
      type: String,
      value: 'widthFix',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc: '',
    isLoading: true,
  },

  ready(){
    console.log(this.data);
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载图片出错
    _onImageError(e) {
      console.log(e);
      
      this.setData({
        imgSrc: this.data.errSrc,
      })
      this.triggerEvent('onImageError', e)
    },
    // 加载图片完毕
    _onImageLoad(e) {
      console.log(e);

      this.setData({
        isLoading: false
      })
      this.triggerEvent('onImageLoad', e)
    },
  }
})