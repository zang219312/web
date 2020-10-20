// pages/demo/slide/slide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideFlag: true, //true-隐藏  false-显示
    animationData: {}, //
    state: 0, // 1 已绑定 0 未绑定
    isdisabled: false, // 是否禁用
    switchChecked: false,
    identify: false, //true 识别成功 false 识别失败
    remind: false, // 确认绑定
    title: 'ABO血型',
    msg: '您可以自助录入条码，减少等待时间',
    icon: '../../../images/icon-start.png',
    barcode: '',
    showRevoIcon: false, //false 隐藏  true 显示  
    extraClasses:'',  //动画样式 
    moni: 0
  },
  switchChange(e) {
    this.setData({
      state: e.detail.value ? 1 : 0
    })

  },

  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
    that.resetAll();
  },

  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间
      timingFunction: 'ease', //动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn(); //调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400, //动画的持续时间 默认400ms
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown(); //调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220) //先执行下滑动画，再隐藏模块
    that.resetAll()
  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.actions = new Map([
      [1, ['您可以自助录入条码，减少等待时间', '../../../images/icon-start.png']],
      [2, ['条码格式不对哦，检查一下', '../../../images/icon-validate.png']],
      [3, ['识别成功', '../../../images/icon-scan-succ.png']],
      [4, ['绑定后讲无法修改条码，请确认', '../../../images/warn.png']],
      [5, ['绑定失败，请再试一次', '../../../images/bind-failure.png']],
      [6, ['绑定成功', '../../../images/bind-success.png']]
    ])
    //  条形码识别成功 才出现底部按钮
    // 文本不能修改
  },
  // 去除空格
  trim(char) {
    return char.replace(/\s+/g, '');
  },
  validate(str){
    let val = this.trim(str);
    // 正整数，0
    let reg = /^\d+$/;
    
    if(!reg.test(val)) return false;
    // 验证长度 10位
    if(val.length===10) return true;
    return false;

  },
  // 输入完成
  bindconfirm(e) {
    console.log(e.detail.value);
    
    if(e.detail.value.length == 0) return;
    if (this.validate(e.detail.value)) {
      this.formatSucc(e.detail.value);
    }else{
      this.formatErr();
      this.addAnime();
    }
  },
  // 通过
  formatSucc(val){
    let action = this.actions.get(3);
    this.setData({
      msg: action[0],
      icon: action[1],
      identify: true,
      isdisabled: true,
      barcode: val,
      showRevoIcon: false
    })
  },
  // 格式没有通过验证
  formatErr(){
    let action = this.actions.get(2);
    this.setData({
      msg: action[0],
      icon: action[1]
    })
  },
  // 重置所有状态
  resetAll() {
    this.setData({
      isdisabled: false, // 是否禁用
      identify: false, //true 识别成功 false 识别失败
      remind: false, // 确认绑定
      title: 'ABO血型',
      msg: '您可以自助录入条码，减少等待时间',
      icon: '../../../images/icon-start.png',
      barcode: '',
      extraClasses:'',
      showRevoIcon: false,
    })
  },
  // 撤回上一步
  revocation() {
    this.resetAll()
    this.setData({
      barcode: this.data.barcode || '',
    })
  },

  queding() {
    // 确定 第一次提醒
    // 页面左上角加一个返回  返回上一步即清空数据
    this.setData({
      showRevoIcon: true,
      msg: this.actions.get(4)[0],
      icon: this.actions.get(4)[1],
      identify: false,
      remind: true,
    })
  },
  binding() {
    // 确认绑定 交互
    this.aa(this.data.moni).then(res => {
      console.log(res);
      if (res) {
        this.setData({
          state: 1,
          msg: this.actions.get(1)[0],
          icon: this.actions.get(1)[1],
          isdisabled: false,
          remind: false,
          switchChecked: true,
          showRevoIcon: false
        })
      }
    }).catch(err => {
      console.log(err);
      this.setData({
        msg: this.actions.get(5)[0],
        icon: this.actions.get(5)[1],
        remind: false,
        isdisabled: false,
        showRevoIcon: false
      })
    })
  },
  // 模拟交互
  aa(e) {
    return new Promise((resolve, reject) => {
      if (e == 1) {
        resolve(1)
      } else {
        reject('绑定失败')
      }
    })
  },


  scan() {
    let that = this;
    // 只允许相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      scanType:['barCode'],
      success: (res) => {
        wx.showLoading({
          title: '识别中...',
        })
        that.scanTimer = setTimeout(()=>{
          wx.hideLoading()
        },200)
        if(that.validate(res.result)){
          that.formatSucc(res.result)
        }else{
          that.formatErr();
        }
      },
      fail(e){
        console.error(e);
      }
    })
  },

  call() {
    this.apiCall().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },

  apiCall() {
    return new Promise((resolve, reject) => {
      wx.makePhoneCall({
        phoneNumber: '13647129407',
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  // 添加动画
  addAnime(){
    this.setData({
      extraClasses: 'shake'
    })
  },

  // 监听过度结束
  modaltransitionend(e){
    // console.log(e);
  },
  animationstart(e){
    console.log('动画开始',e);
  },

  // 监听动画结束
  animationend(e){
    console.log('动画结束',e);
    this.setData({
      extraClasses:''
    })
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
    console.log(this);
    clearTimeout(this.scanTimer)
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

  }
})