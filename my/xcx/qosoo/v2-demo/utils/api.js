import { request, setConfig } from './wx-promise-request';
const app = getApp()

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
}

function checkCode(res){
  var pages = getCurrentPages()    //获取加载的页面

  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  // console.log(currentPage)
  var url = currentPage.route    //当前页面url
  // console.log('页面：'+url)
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  // if (url == 'pages/home/home/home') return
  if (res.data.success === false && res.data.msgType ===1) {

    //拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
      var value = options[key]
      urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    // console.log(urlWithArgs)
    if (urlWithArgs.split('?')[0] == 'pages/secretary/secretary' || urlWithArgs.split('?')[0] =='pages/home/myCustomerGroup/myCustomerGroup') return


    wx.setStorageSync('formUrl', urlWithArgs)
    wx.showToast({
      title: res.data.data,
      icon: 'none',
      duration: 2000
    })
    wx.navigateTo({
        url: '/pages/public/userAuthStatus/userAuthStatus'
      })
   
  } else if (res.data.success === false ) {
    console.log('错误信息' + res.data.data)
    var codeList = [1000, 1001, 1002, 2000]
      if (res.data.code == 9000 || res.data.code == 9001 || res.data.code == 9002){
        if (res.data.data){
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 2000
          })
        }
    }
  }
  return res
}



// 封装请求接口
const req = (baseUrl, url, data, method, showLoadingStatus, call) => {
  return new Promise(function (resolve, reject) {
    if (!showLoadingStatus){
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    if (call) {
      var callback = call
    }
    data.token = wx.getStorageSync('TOKEN')
    request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        // 'token': wx.getStorageSync('TOKEN')
      }
    }).then(res => {
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
//         switch (res.data.status) {
//           case 1:
            checkCode(res)
            resolve(res.data)
//             break;
//           default:
//             wx.showToast({ title: res.data.info.toString(), icon: 'none', duration: 2000 })
//         }
      } else if (res.statusCode == 401) {
        // 请求登陆
        // wx_login(baseUrl)
        // 在用户登录过期后，需要回调更新页面状态
        if (callback) {
          callback()
        }
      }
    }).catch(error => {
      reject(error)
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
    })
  })
}

const reqpost = (baseUrl, url, data, method, showLoadingStatus, call) => {
  return new Promise(function (resolve, reject) {
    if (!showLoadingStatus) {
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    if (call) {
      var callback = call
    }
    data.token = wx.getStorageSync('TOKEN')
    request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: { 
        "Content-Type": "application/x-www-form-urlencoded" 
        // 'token': wx.getStorageSync('TOKEN')
        },
    }).then(res => {
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        //         switch (res.data.status) {
        //           case 1:
        checkCode(res)
        resolve(res.data)
        //             break;
        //           default:
        //             wx.showToast({ title: res.data.info.toString(), icon: 'none', duration: 2000 })
        //         }
      } else if (res.statusCode == 401) {
        // 请求登陆
        // wx_login(baseUrl)
        // 在用户登录过期后，需要回调更新页面状态
        if (callback) {
          callback()
        }
      }
    }).catch(error => {
      reject(error)
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
    })
  })
}


const uploadpost = (baseUrl, url, data,formdata, method, showLoadingStatus, call) => {
  return new Promise(function (resolve, reject) {
    if (!showLoadingStatus) {
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    if (call) {
      var callback = call
    }
    request({
      url: baseUrl + url,
      data: data,
      formData: formdata,
      method: method,
      header: { 
        "Content-Type": "multipart/form-data;" 
      },
     
    }).then(res => {
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        //         switch (res.data.status) {
        //           case 1:
        resolve(res.data)
        //             break;
        //           default:
        //             wx.showToast({ title: res.data.info.toString(), icon: 'none', duration: 2000 })
        //         }
      } else if (res.statusCode == 401) {
        // 请求登陆
        // wx_login(baseUrl)
        // 在用户登录过期后，需要回调更新页面状态
        if (callback) {
          callback()
        }
      }
    }).catch(error => {
      reject(error)
      if (!showLoadingStatus) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
    })
  })
}


module.exports = {
  req: req,
  reqpost: reqpost,
  uploadpost: uploadpost
}
