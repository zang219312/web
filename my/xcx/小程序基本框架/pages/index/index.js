//index.js
//获取应用实例
var util = require("../../utils/util.js");
var pro = require('../../utils/promisify.js');
var api = require('../../utils/apiconfig.js');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page: 1,
    rows: [],
    PageCur: 1,
    swiperList: [{
        id: 0,
        type: 'image',
        url: 'https://f.zqsaas.com/4de191c9-d207-4e22-ab14-2a0753d7aa3d.jpg'
      },
      {
        id: 1,
        type: 'image',
        url: 'https://f.zqsaas.com/8074ec33-299f-4e5c-9a29-64700cc56999.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://f.zqsaas.com/69586a6e-d0e9-49c8-83fe-7863a6db7dfd.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://f.zqsaas.com/c4126dd4-3fc8-42bd-9ecc-ab74429f2f14.jpg'
      }, {
        id: 4,
        type: 'image',
        url: 'https://f.zqsaas.com/8082a8d2-179d-467f-9a18-b75a0c5477e1.jpg'
      }, {
        id: 5,
        type: 'image',
        url: 'https://f.zqsaas.com/79cbf2ef-a41a-4ffd-8ed4-36cea39ca95d.jpg'
      }
    ],
    isaddbgcolor: false,
    iconList: [{
      icon: 'newfill',
      color: 'red',
      badge: 0,
      name: '社区',
      gif: ''
    }, {
      icon: 'shopfill',
      color: 'orange',
      badge: 1,
      name: '抽奖',
      gif: ''
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '签到',
      gif: ''
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知',
      gif: ''
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜',
      gif: '../../image/new.gif'
    }],
    gridCol: 5,
    msgList: [{
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "肖凤丽领取了0.15金币"
      },
      {
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg",
        title: "走过的路脚知道领取了0.35金币"
      },
      {
        url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
        title: "妹子领取0.1金币"
      }
    ],
    VerticalNavTop: 0,
    MainCur: 0,
    TabCur: 0,
    list: [{
        id: 0,
        name: '推荐',
        chilist: [{
          id: 1,
          url: "https://f.zqsaas.com/22b2db15-8c3c-4eb1-8fee-0bcf57028a58.jpg",
          name: "居家百货"
        }, {
          id: 2,
          url: "https://f.zqsaas.com/2680c126-ef28-47ff-9ac6-ea83c47f1b91.jpg",
          name: "手表"
        }, {
          id: 1,
          url: "https://f.zqsaas.com/17bb440c-0b95-43e0-a6d3-48db4a26fea4.jpg",
          name: "不锈钢水壶"
        }, {
          id: 1,
          url: "https://f.zqsaas.com/d1ac80c4-be31-498d-97b8-e535e26fc833.jpg",
          name: "内衣内裤"
        }, {
          id: 1,
          url: "https://f.zqsaas.com/a770cca3-1ecc-4b85-b73b-029a84438fce.jpg",
          name: "婴儿洗发水护肤品"
        }]
      },
      {
        id: 1,
        name: '鞋品箱包',
        chilist: [{
          id: 1,
          url: "https://f.zqsaas.com/d885945c-a7ce-4bb6-90bf-a94071fa89d4.jpg",
          name: '女士高跟'
        }]
      }, {
        id: 2,
        name: '居家百货'
      }, {
        id: 3,
        name: '美妆配饰'
      }, {
        id: 4,
        name: '美食生鲜'
      }, {
        id: 5,
        name: '母婴用品'
      },
      {
        id: 6,
        name: '营养保健'
      }, {
        id: 7,
        name: '家庭清洁'
      }, {
        id: 8,
        name: '服装内衣'
      }
    ],
    isaddbgcolor: false,
    iconList: [{
      icon: 'newfill',
      color: 'red',
      badge: 0,
      name: '社区',
      gif: ''
    }, {
      icon: 'shopfill',
      color: 'orange',
      badge: 1,
      name: '抽奖',
      gif: ''
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '签到',
      gif: ''
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知',
      gif: ''
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜',
      gif: '../../image/new.gif'
    }],
    load: true,
    myinfoiconList: [{
      icon: 'pay',
      color: 'red',
      badge: 0,
      name: '待付款',
      gif: ''
    }, {
      icon: 'group',
      color: 'orange',
      badge: 1,
      name: '拼团中',
      gif: ''
    }, {
      icon: 'deliver',
      color: 'yellow',
      badge: 0,
      name: '待发货',
      gif: ''
    }, {
      icon: 'send',
      color: 'olive',
      badge: 22,
      name: '待收货',
      gif: ''
    }, {
      icon: 'community',
      color: 'cyan',
      badge: 0,
      name: '待评价',
      gif: ''
    }],
    myinfotwoList: [{
      icon: 'pay',
      color: 'red',
      badge: 0,
      name: '待付款',
      gif: ''
    }, {
      icon: 'group',
      color: 'orange',
      badge: 1,
      name: '拼团中',
      gif: ''
    }, {
      icon: 'deliver',
      color: 'yellow',
      badge: 0,
      name: '待发货',
      gif: ''
    }, {
      icon: 'send',
      color: 'olive',
      badge: 22,
      name: '待收货',
      gif: ''
    }],
    data: [
      {
        name: "居家百货",
        index: 0,
        state: 0,
        checkeedAll: false,
        data: [
          {
            url: "https://f.zqsaas.com/a770cca3-1ecc-4b85-b73b-029a84438fce.jpg",
            classtitle: "婴儿洗发水沐浴露全套一体纯天然护肤产品的范德萨发生反倒是",
            index: 0,
            state: 0,
            checked: true,
            price: 109.9
          }, {
            url: "https://f.zqsaas.com/22b2db15-8c3c-4eb1-8fee-0bcf57028a58.jpg",
            classtitle: "卫生用具扫帚,厨房清洁剂,雨伞等",
            index: 1,
            state: 0,
            checked: true,
            price: 39.9
          },
          {
            url: "https://f.zqsaas.com/d1ac80c4-be31-498d-97b8-e535e26fc833.jpg",
            classtitle: "内衣内裤,卫衣",
            index: 2,
            state: 0,
            checked: false,
            price: 4.9
          }
        ]
      },
      {
        name: "生活用品",
        index: 0,
        state: 0,
        checkeedAll: false,
        data: [
          {
            url: "https://f.zqsaas.com/17bb440c-0b95-43e0-a6d3-48db4a26fea4.jpg",
            classtitle: "不锈钢水壶",
            index: 0,
            state: 0,
            checked: false,
            price: 9.9
          }, {
            url: "https://f.zqsaas.com/2680c126-ef28-47ff-9ac6-ea83c47f1b91.jpg",
            classtitle: "手表",
            index: 1,
            state: 0,
            checked: false,
            price: 4.9
          }
        ]
      },
      {
        name: "女士高跟系列",
        index: 0,
        state: 0,
        checkeedAll: false,
        data: [
          {
            url: "https://f.zqsaas.com/d885945c-a7ce-4bb6-90bf-a94071fa89d4.jpg",
            classtitle: "高跟利剑能杀人",
            index: 0,
            state: 0,
            checked: false,
            price: 9.9
          }
        ]
      }
    ],
    checkedAll: false,
    count: 0,
    priceAll: 0.0,
    tablist:['推荐','关注','母婴','家居数码','美妆','时尚','书籍','其他']
  },
  NavChange(e) {
    if (e.currentTarget.dataset.cur == 3) {
      wx.navigateTo({
        url: '../addgoods/addgoods',
      })
      return;
    }
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    this.getNavTitleByNumber(e.currentTarget.dataset.cur)
  },
  onLoad: function(options) {
    let arr1 = [1, 2, 3, 4, 5]
    this.curtail(arr1);
    let testStr = 'asdasddsfdsfadsfdghdadsdfdgdasd';
    this.getMax(testStr);
    this.setData({
      PageCur: options.PageCur ? options.PageCur:1
    })
    this.getNavTitleByNumber(this.data.PageCur);
    // var that = this
    // console.log(options.id)
    // if (wx.getStorageSync('token')) {
    //   console.log('1111111')
    //   that.getlist(1)
    // } else {
    //   console.log('2222222')
    //   app.istokenCallback = token => {
    //     if (token != '') {
    //       that.getlist(1)
    //     }
    //   }
    // }
  },
  shanchuTap(e){
    console.log(e)
    var that=this
    var index=e.detail.index,groupindex=e.detail.groupindex;
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      cancelColor: "#ababab",
      confirmColor: "#027ee7",
      success(res) {
        if (res.confirm) {
          var list2 = that.data.data[groupindex].data;
          list2.splice(index, 1);
          var dataStatus = 'data[' + groupindex + '].data';
          that.setData({
            [dataStatus]: list2
          });
          wx.showToast({
            title: '删除成功',
            icon: "none",
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  getMax(str) {
    //定义一个控对象
    let obj={};
    //循环字符串长度
    for(let i in str){
      if(obj[str[i]]){
        obj[str[i]]++;
      }else{
        obj[str[i]]=1;
      }
    }
    let keys=Object.keys(obj);// 获取对象中所有key的值返回数组
    console.log(keys)
    let values=Object.values(obj);//获取对象中所有values返回的数组
    console.log(values)
    let maxVal=Math.max(...values);//获取values 数组中最大值
    console.log(maxVal)
    //打印最大值对应的key跟values
    console.log(keys[values.indexOf(maxVal)],maxVal)
    // return;
    // for (let i in str) {
    //   if (obj[str[i]]) {
    //     obj[str[i]]++;
    //   } else {
    //     obj[str[i]] = 1;
    //   }
    // }
    // let keys = Object.keys(obj); // 获取对象中所有key的值返回数组
    // let values = Object.values(obj); // 获取所有value返回数组
    // let maxVal = Math.max(...values); // Math.max可以找出传入参数的最大值，如：Math.max(1,2);这里可使用es6中的解构，
    // 　　　　　　　 //也可以使用Math.max.apply(Math,values)可认为是apply(Math.max, arr)
    // 　　　　　　　 //然后，arr是一个参数列表，对于max方法，其参数是若干个数，即Math.max(a, b, c, d, ...)
    // console.log(keys[values.indexOf(maxVal)], maxVal);
  },
  curtail(arr) {
    var res = arr.slice(0);
    res.shift(arr[0])
    console.log(res)
    return res;
  },
  async onShow() {
    console.log(9999999)
    var arr=[]
    var res=await arr.concat([1,2,3,4])
    res=await res.concat([1,2,3,4])
    console.log(res)
  },
  onReady: function() {
    console.log(3)
    // this.getlist(1)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.detail.id,
      MainCur: e.detail.id,
      VerticalNavTop: (e.detail.id - 1) * 50
    })
  },
  getlist(type) {
    var that = this;
    pro.post(app.globalData.urlPath + '/cloudcubic/company/active', {
      loginMark: wx.getStorageSync('loginMark'),
      token: wx.getStorageSync('token'),
      companyid: that.data.companyid || 0,
      state: 1,
      pagination: JSON.stringify({
        rows: 20,
        page: that.data.page,
        sidx: "isnull(sort,0),Top_Date desc,F_CreateDate",
        sord: "desc",
        records: 0,
        total: 0
      })
    }).then(res => {
      that.setData({
        isloading: false
      })
      var newList1 = that.data.rows || [];
      if (res.data.code == 200) {
        if (type == 1) {
          if (res.data.data.rows.length <= 0) {
            that.setData({
              rows: res.data.data.rows,
              isshownolist: false,
              isshowlist: true,
              total: res.data.data.total
            })
          } else {
            that.setData({
              rows: res.data.data.rows,
              isshownolist: true,
              isshowlist: false,
              total: res.data.data.total
            })
          }
        } else {
          if (res.data != '') {
            for (var i = 0; i < res.data.data.rows.length; i++) {
              newList1.push(res.data.data.rows[i]);
            }
            that.setData({
              rows: newList1,
            })
          }
        }
      } else {
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        });
      }
    })
  },
  getNavTitleByNumber(number) {
    switch (number) {
      case "1":
        wx.setNavigationBarTitle({
          title: '首页',
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
        })
        break;
      case "2":
        wx.setNavigationBarTitle({
          title: '分类',
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
        })
        break;
      case "4":
        wx.setNavigationBarTitle({
          title: '购物车',
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
        })
        break;
      case "5":
        wx.setNavigationBarTitle({
          title: '我的',
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#ff9700',
        })
        break;
      default:
        break;
    }
  },
  onPageScroll: function(e) {
    console.log(e)
    if (e.scrollTop > 0) {
      this.setData({
        isaddbgcolor: true
      })
    } else {
      this.setData({
        isaddbgcolor: false
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '1111111',
      path: `pages/index/index?id=2222&isnumber=1`,
      success: function(res) {},
      fail: function(res) {
        // 分享失败
      },
    }
  }
})