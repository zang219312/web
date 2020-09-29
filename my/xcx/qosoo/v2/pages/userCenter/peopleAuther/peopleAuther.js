// pages/userCenter/peopleAuther/peopleAuther.js

// pages/userCenter/companyAuther/companyAuther.js
const app = getApp()
import { req, reqpost  } from '../../../utils/api.js'
import { uploadpost } from '../../../utils/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'https://file.qosoo.cn/files/20191122/home/upload.png',
    imgShow:false,
    userCard:''
  },
  /*chooseImage: function () {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]

        wx.uploadFile({
          url: "https://${host}/upload",
          filePath: imageSrc,
          name: 'data', 
          success: function (res) {
            console.log('uploadImage success, res is:', res)

           

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
            wx.showToast({
              title: '上传失败',
              icon: 'loading',
              duration: 1000
            })
          }
        })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },


  commintAction:function(){
    console.log("点击了提交");
    wx.navigateTo({
      url: '/pages/public/remindPage/remindPage?remindType=auther'
    })

  },*/
  handleGoBack: function () {
    let pages = getCurrentPages();
    if (pages.length > 2) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '/pages/home/home/home',
      })
    }
  },

  //上传
  chooseImage: function () {
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
          imgShow:true,
          imageUrl: tempFilePaths
        })
      }
    })
  },
  //提交
  commintAction: function () {
    // var USER_ID = wx.getStorageSync('user_id');
    var that = this;
    if (that.data.imageUrl == '') {
      wx.showToast({
        title: '请先选择图片！',
        icon: 'none',  //图标，有效值 "success", "loading", "none"
        //image: '../../images/layer/success.png',  //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000
    
      })
    } else {
      console.log("提交认证", that.data.imageUrl[0]);
      // Base64
      let base64 = wx.getFileSystemManager().readFileSync(that.data.imageUrl[0], "base64")

      reqpost(app.globalData.url, '/weixin/api/accept/user/uploadCard', {
        'pic': base64,
      }, "POST", true).then(res => {

        if (res.success){
                wx.showToast({
                  title: '提交成功！',
                  icon: 'success',  //图标，有效值 "success", "loading", "none"
                  duration: 2000
                })

                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/public/remindPage/remindPage?remindType=auther'
                  })
                }, 1000);
        }
      })



      // wx.uploadFile({   //提交图片
      //   url: app.globalData.url + '/weixin/api/accept/user/uploadCard',
      //   filePath: that.data.imageUrl[0],
      //   name: 'file',
      //   formData: {
          
      //   },
      //   success: function (res) {
      //     if (JSON.parse(res.data).code == 0) {
            
      //       req(app.globalData.bastUrl, '/user/check', {
      //         'userId': USER_ID,
      //         'callCard': JSON.parse(res.data).data,
      //       }, "GET", true).then(data => {
      //         console.log(data);
      //         if(data.code == 0){
      //           wx.showToast({
      //             title: '提交成功！',
      //             icon: 'success',  //图标，有效值 "success", "loading", "none"
      //             duration: 2000
      //           })

      //           setTimeout(function () {
      //             wx.navigateTo({
      //               url: '/pages/public/remindPage/remindPage?remindType=auther'
      //             })
      //           }, 1000);
      //         }
              
      //       })
            

      //     }else{
      //       wx.showToast({
      //         title: '上传失败',
      //         icon: 'none',  //图标，有效值 "success", "loading", "none"
      //         duration: 2000
      //       })
      //     }
      //   },
      //   fail: function (res){
      //     console.log("提交认证" + JSON.stringify(res));
      //   }
      // })
  }
  }
})