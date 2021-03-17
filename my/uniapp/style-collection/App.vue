<script>
	export default {
		onLaunch: function() {

			//小程序云函数初始化
			wx.cloud.init({
				dev: 'niew6',
				traceUser: true
			})

			//获取openid
			if (uni.getStorageSync('openid') == '') {
				wx.cloud.callFunction({
					name: "login",
					success: res => {
						uni.setStorageSync('openid', res.result.openid)
					}
				})
			}

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'common/zwyCss.css';

	.comm-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	
	.comm-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
