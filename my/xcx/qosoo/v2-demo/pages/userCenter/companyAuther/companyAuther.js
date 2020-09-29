// pages/userCenter/companyAuther/companyAuther.js
const app = getApp()
import { req, reqpost} from '../../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyAuth@3x.png',
    user_data:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // var user_data = JSON.parse(options.user_data)
    // console.log(user_data)
    // this.setData({
    //   user_data: user_data
    // })
    // req(app.globalData.bastUrl, '/company/getCertified', {
    //   'id': this.data.user_data.companyId,
    // }, "GET", true).then(data => {
    //   console.log(data);
    //   if (data.data.certified == 1) {
    //     this.setData({
    //       imageUrl: data.data.blImg
    //     })
    //   }

    // })
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
  
  },
  //上传
  uploadAction:function(){


    var that = this;
    wx.chooseImage({  //选择图片
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //console.log(tempFilePaths);
        that.setData({
          //imageUrl: 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_businessLicense@3x.png'
          imageUrl: tempFilePaths
        })
      }
    })
  },
  //提交
  commitActon: function () {
    // var USER_ID = wx.getStorageSync('user_id')
    
    var that=this;
    //console.log(that.data.imageUrl + ',' + app.globalData.bastUrl);
    if (that.data.imageUrl == 'https://lg-6pshrvnq-1255620684.cos.ap-shanghai.myqcloud.com/img_companyAuth@3x.png'){
      wx.showToast({
        title: '请先选择图片！',
        icon: 'none',  //图标，有效值 "success", "loading", "none"
        duration: 2000
   
      })
    }else{

      let base64 = wx.getFileSystemManager().readFileSync(that.data.imageUrl[0], "base64")

      reqpost(app.globalData.url, '/weixin/api/accept/company/uploadLicense', {
        'pic': base64,
      }, "POST", true).then(res => {

        if (res.success) {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',  //图标，有效值 "success", "loading", "none"
            duration: 2000
          })

          setTimeout(function () {
            // var pages = getCurrentPages(); // 当前页面
            // var beforePage = pages[pages.length - 1];

            wx.navigateBack({
              success: function () {
                
              }
            });
          }, 1000);
        }
      })


      // wx.uploadFile({   //提交图片
      //   url: app.globalData.bastUrl + '/file/upload',
      //   filePath: that.data.imageUrl[0],
      //   name: 'file',
      //   formData: {
          
      //   },
      //   success: function (res) {
          
      //     if (JSON.parse(res.data).code ==0){
            
      //       req(app.globalData.bastUrl, '/company/certified', {
      //         'id': that.data.user_data.companyId,
      //         'blImg': JSON.parse(res.data).data,
      //         'userId':USER_ID
      //       }, "get", true).then(data => {
      //         console.log(data)
      //         if (data.code == 0) {
      //           wx.showToast({
      //             title: data.msg,
      //             icon: "none",
      //             duration:2000,
      //             success:function(){
      //               setTimeout(function () {
      //                 var pages = getCurrentPages(); // 当前页面
      //                 var beforePage = pages[pages.length - 1];

      //                 wx.navigateBack({
      //                   success: function () {
      //                     beforePage.onLoad(); // 执行前一个页面的onLoad方法
      //                   }
      //                 });
      //               }, 1000);
      //             }
      //           })
      //         } else {
      //           wx.showToast({
      //             title: data.msg,
      //             icon: "none"
      //           })
      //         }
      //       })
      //       // wx.showToast({
      //       //   title: '提交成功！',
      //       //   icon: 'success',
      //       //   duration: 2000
      //       // })
      //     }
          
      //   }
      // })
    }
  }
})