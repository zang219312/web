//弹窗提示统一设置
function tip(title, icon, duration) {
	uni.showToast({
		title: title || '操作成功',
		icon: icon || 'none',
		duration: duration || 1500,
		mask: true
	})
}

//获取日期  2020-12-12
function getDates() {
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	var timer = year + '-' + month + '-' + day;
	return timer;
};

//获取时间  2020-12-12 21:22:22
function getTime() {
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	return timer;
};

//防止暴力点击
function limitClick(fn, val) {
	let that = this;
	if (that.onoff || that.onoff === undefined) {
		that.onoff = false;
		fn(val);
		setTimeout(res => {
			that.onoff = true;
		}, 500)
	} else {
		console.log("点击次数间隔太快，进行防抖处理")
	}
}

export default {
	tip,
	getDates,
	getTime,
	limitClick
}
