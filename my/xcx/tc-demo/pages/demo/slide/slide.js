// pages/demo/slide/slide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: ['所有', '选项1', '选项2'],
    value: '绑定条码',
    hideFlag: true, //true-隐藏  false-显示
    animationData: {}, //
    state:0, // 1 已绑定 0 未绑定
    isdisabled:false, // 是否禁用
    switchChecked: false,
    identify:false,  //true 识别成功 false 识别失败
    remind:false, // 确认绑定
    title:'ABO血型',
    msg:'您可以自助录入条码，减少等待时间',
    icon:'../../../images/icon-start.png',
    barcode:'',
    showRevoIcon:false, //false 隐藏撤销  true 撤销显示  
    moni:0
  },
  switchChange(e){
    console.log(e.detail.value);
    this.setData({
      state: e.detail.value?1:0
    })
    
  },

  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
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
      [1,['您可以自助录入条码，减少等待时间','../../../images/icon-start.png']],
      [2,['条码格式不对哦，检查一下','../../../images/icon-validate.png']],
      [3,['识别成功','../../../images/icon-scan-succ.png']],
      [4,['绑定后讲无法修改条码，请确认','../../../images/warn.png']],
      [5,['绑定失败，请再试一次','../../../images/bind-failure.png']],
      [6,['绑定成功','../../../images/bind-success.png']]
    ])
    //  条形码识别成功 才出现底部按钮
    // 文本不能修改

    
  },
  // 去除空格
  trim (char) { return char.replace(/\s+/g, ''); },
  // 输入完成
  bindconfirm(e){
    let val = this.trim(e.detail.value);
    
    // 验证10位数
    if(val.length === 10){
      let action = this.actions.get(3) || [];
      this.setData({
        msg:action[0],
        icon:action[1],
        identify:true,
        isdisabled:true,
        barcode:val,
        showRevoIcon:false
      })
    }else{
      // 没过验证
      let action = this.actions.get(2);
      this.setData({
        msg:action[0],
        icon:action[1]
      })
    }

  },
  // 撤回上一步
  revocation(){
    let action = this.actions.get(3);
    this.setData({
      msg:action[0],
      icon:action[1],
      identify:true,
      isdisabled:true,
      remind:false,
      showRevoIcon:false,
      barcode:this.data.barcode || '',
    })
  },

  queding(){
    // 确定 第一次提醒
    // 页面左上角加一个返回  返回上一步即清空数据
    this.setData({
      msg:this.actions.get(4)[0],
      icon:this.actions.get(4)[1],
      identify:false,
      remind:true,
      showRevoIcon:true
    })
  },
  binding(){
    // 确认绑定 交互
    this.aa(this.data.moni).then(res=>{
      console.log(res);
      if(res){
        this.setData({
          state:1,
          msg:this.actions.get(1)[0],
          icon:this.actions.get(1)[1],
          isdisabled:false,
          remind:false,
          switchChecked:true,
          showRevoIcon:false
        })
      }
    }).catch(err=>{
      console.log(err);
      this.setData({
        msg:this.actions.get(5)[0],
        icon:this.actions.get(5)[1],
        remind:false,
        isdisabled:false,
        showRevoIcon:false
      })
    })
  },
  // 模拟交互
  aa(e){
    return new Promise((resolve,reject)=>{
      if(e==1){
      resolve(1)
      }else{
        reject('绑定失败')
      }
    })
  },


  scan(){
    console.log('scan');
    // 只允许相机扫码
    wx.scanCode({
      onlyFromCamera: true,  
      // scanType:['barCode'],
      success:(res)=>{
        console.log(res);
      },
      complete(e){
        console.log(e);
      }
    })
  },

  call(){
    this.apiCall().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  apiCall(){
    return new Promise((resolve,reject)=>{
      wx.makePhoneCall({
        phoneNumber: '13647129407',
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
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