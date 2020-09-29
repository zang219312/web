// pages/orderDetail/orderDetail.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: [],
        add: '浙江省杭州市拱墅区小河路',
        processData: [{
            name: '未发货',
            start: '#fff',
            end: '#EFF3F6',
            icon: '../../images/icon-jt.png'
        },
            {
                name: '已发货',
                start: '#EFF3F6',
                end: '#EFF3F6',
                icon: '../../images/icon-jt.png'
            },
            {
                name: '派送中',
                start: '#EFF3F6',
                end: '#EFF3F6',
                icon: '../../images/icon-jt.png'
            },
            {
                name: '已签收',
                start: '#EFF3F6',
                end: '#fff',
                icon: '../../images/icon-jt.png'
            }
        ],
        wuliu: '还没有发货',
        ge: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(that);
        wx.request({
            url: `${app.globalData.url}/api.php`,
            data: {
                typ: "orderdetail",
                uid: app.globalData.uid,
                orderid: options.orderid
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    count: res.data.a.count,
                    order: res.data.a.dat,
                    add: res.data.a.dat[0].add,
                    id: res.data.a.dat[0].orderid,
                    time: res.data.a.dat[0].tim,
                    com: res.data.a.dat[0].com
                })
            }
        })

    },

    comp_order: function () {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '完成订单后会进入生产流程，此订单不可再追加上传',
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    wx.request({
                        url: `${app.globalData.url}/api.php`,
                        data: {
                            typ: "order_com",
                            uid: app.globalData.uid,
                            orderid: that.data.id
                        }, //e.det(商品id,数目，规格)
                        success: function (res) {
                            console.log(res)
                        }
                    })
                }
            }
        })
    },

    tz: function (e) {
        let str = {
            com: e.currentTarget.dataset.com,
            the_category: e.currentTarget.dataset.the_category,
            imgurl: e.currentTarget.dataset.imgurl,
            spid: e.currentTarget.dataset.spid,
            quantity_p: e.currentTarget.dataset.quantity_p,
            quantity_v: e.currentTarget.dataset.quantity_v,
            scid: e.currentTarget.dataset.scid,
            title: e.currentTarget.dataset.tit,
            price: e.currentTarget.dataset.price,
            num: e.currentTarget.dataset.num,
        };
        let STR = JSON.stringify(str);
        if (e.currentTarget.dataset.com == 0) {
            switch (e.currentTarget.dataset.the_category) {
                case "pic":
                    wx.redirectTo({
                        url: '../upImg/upImg?str=' + STR
                    });
                    break;
                case "video":
                    wx.redirectTo({
                        url: '../video/video?str=' + STR
                    });
                    break;
                case "pav":
                    wx.redirectTo({
                        url: '../pav/pav?str=' + STR
                    });
                    break;
            }
        } else if (e.currentTarget.dataset.com == 1) {
            wx.navigateTo({
                url: '../sucai/sucai?scid=' + e.currentTarget.dataset.scid + '&orderid=' + e.currentTarget.dataset.orderid + '&tit=' + e.currentTarget.dataset.tit,
            })
        }
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
        var that = this;
        console.log(that);
        wx.request({
            url: `${app.globalData.url}/api.php`,
            data: {
                typ: "orderdetail",
                uid: app.globalData.uid,
                orderid: that.options.orderid
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    count: res.data.a.count,
                    order: res.data.a.dat,
                    add: res.data.a.dat[0].add,
                    id: res.data.a.dat[0].orderid,
                    time: res.data.a.dat[0].tim,
                    com: res.data.a.dat[0].com
                })

                wx.request({
                    url: `${app.globalData.url}/api.php`,
                    data: {
                        typ: "wuliu",
                        id: that.data.orderid
                    },
                    success: function (res) {

                        wx.hideLoading()
                    }
                })
            }
        })
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