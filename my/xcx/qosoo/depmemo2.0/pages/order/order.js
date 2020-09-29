// pages/order/order.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        a_lenth: 1,
        b_lenth: 1,
        c_lenth: 1,
        carts: [],
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
                typ: "order",
                uid: app.globalData.uid,
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    a_lenth: res.data.a.m,
                    b_lenth: res.data.b.m,
                    c_lenth: res.data.c.m,
                    dat_a: res.data.a.dat, //全部
                    dat_b: res.data.b.dat,
                    dat_c: res.data.c.dat,
                    winHeight: res.data.a.m * 126 + 50,
                    currentTab: options.current
                })
            }
        })
    },


    tz: function (e) {
        let str = {
            the_category: e.currentTarget.dataset.the_category,
            imgurl: e.currentTarget.dataset.imgurl,
            spid: e.currentTarget.dataset.spid,
            quantity_p: e.currentTarget.dataset.quantity_p,
            quantity_v: e.currentTarget.dataset.quantity_v,
            scid: e.currentTarget.dataset.scid,
            title: e.currentTarget.dataset.tit,
            price: e.currentTarget.dataset.price,
            num: e.currentTarget.dataset.num,
            com: e.currentTarget.dataset.com,
        };
        let STR = JSON.stringify(str);
        if (e.currentTarget.dataset.com == 0) {
            switch (e.currentTarget.dataset.the_category) {
                case "pic":
                    wx.navigateTo({
                        url: '../upImg/upImg?str=' + STR
                    })
                    break;
                case "video":
                    wx.navigateTo({
                        url: '../video/video?str=' + STR
                    })
                    break;
                case "pav":
                    wx.navigateTo({
                        url: '../pav/pav?str=' + STR
                    })
                    break;
                case "jiesuan":
                    break;
            }
        } else if (e.currentTarget.dataset.com == 1) {
            wx.navigateTo({
                url: '../sucai/sucai?scid=' + e.currentTarget.dataset.scid + '&orderid=' + e.currentTarget.dataset.orderid + '&tit=' + e.currentTarget.dataset.tit,
            })
        }

    },

    chakan: function (e) {
        console.log(e);
        wx.navigateTo({
            url: '../sucai/sucai?scid=' + e.currentTarget.dataset.scid + '&orderid=' + e.currentTarget.dataset.oid + '&tit=' + e.currentTarget.dataset.tit,
        })
    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {

        var that = this;
        var currentTarget = e.currentTarget.dataset.current;

        if (this.data.currentTab === currentTarget) {
            return false;
        } else {
            that.setData({
                currentTab: currentTarget
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
        wx.request({
            url: `${app.globalData.url}/api.php`,
            data: {
                typ: "order",
                uid: app.globalData.uid,
            },
            success: function (res) {

                that.setData({
                    a_lenth: res.data.a.m,
                    b_lenth: res.data.b.m,
                    c_lenth: res.data.c.m,
                    dat_a: res.data.a.dat, //全部
                    dat_b: res.data.b.dat,
                    dat_c: res.data.c.dat,
                    winHeight: res.data.a.m * 126 + 50,
                    currentTab: that.options.current
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