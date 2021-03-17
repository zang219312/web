<template>
	<view class="container">
		<image class="bg" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%83%8C%E6%99%AF/%E8%8E%B7%E5%8F%96%E6%BA%90%E7%A0%81%E8%83%8C%E6%99%AF.png?sign=66a172b2883d65fb3b224636bc5012b3&t=1605200298"></image>
		<image @click="$util.limitClick(playAd)" class="get-code-btn zwyHover1" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%83%8C%E6%99%AF/%E8%8E%B7%E5%8F%96%E6%BA%90%E7%A0%81%E6%8C%89%E9%92%AE%20.png?sign=fc719fbd096fb709b9aef1fdf361f559&t=1605165865"></image>
		<view v-if="urlShow" class="url-box" @click="copy">
			<view class="url-cell">
				<view>链接地址：</view>
				<view class="url">{{url || '出错了，请重新获取源码。'}}</view>
			</view>
			<view class="code">提取码：{{code}}</view>
		</view>
	</view>
</template>

<script>
	let videoAd = null // 在页面中定义激励视频广告
	export default {
		data() {
			return {
				urlShow: false,
				url: '',
				code: '',
			}
		},
		onLoad(options) {
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
				videoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-2f9757558da0c4ed'
				})
				videoAd.onLoad(() => {})
				videoAd.onError((err) => {})
				videoAd.onClose((res) => {
					console.log(res)
					if (res && res.isEnded || res === undefined) {
						// 正常播放结束，显示源码地址
						this.urlShow = true
					} else {
						this.$util.tip("视频未播放完，不能获取源码")
					}
				})
			}
			this.query()
		},
		methods: {

			//查询源码地址
			query() {
				this.$request.query('source-code').then(res => {
					this.url = res[0].url
					this.code = res[0].code
				})
			},

			//播放激励广告视频
			playAd() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				//判断现在时间是否与缓存中在时间同一天
				let cacheLongTime = uni.getStorageSync('excitationAdTime')
				let nowLongTIme = this.$util.getDates()
				if (cacheLongTime == nowLongTIme && uni.getStorageSync('excitationAdCount') > 2) {
					uni.hideLoading()
					this.$util.tip("今天机会已用完，请明天再来")
				} else {
					if (cacheLongTime == nowLongTIme) {
						uni.setStorageSync('excitationAdCount', (uni.getStorageSync('excitationAdCount') || 0) + 1) //激励视频广告次数+1
					} else {
						uni.setStorageSync('excitationAdCount', 1) //激励视频广告次数+1
					}
					uni.setStorageSync('excitationAdTime', this.$util.getDates()) //激励视频点击时间戳
					// 用户触发广告后，显示激励视频广告
					if (videoAd) {
						uni.hideLoading()
						videoAd.show().catch(() => {
							// 失败重试
							videoAd.load()
								.then(() => videoAd.show())
								.catch(err => {
									console.log('激励视频 广告显示失败')
								})
						})
					}
				}
			},

			copy() {
				uni.setClipboardData({
					data: this.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.get-code-btn {
		position: fixed;
		top: 52%;
		left: 27%;
		width: 190rpx;
		height: 70rpx;
		box-shadow: 2rpx 2rpx 16rpx 2rpx #a79487;
	}

	.url-box {
		position: fixed;
		flex-direction: column;
		color: #FFFFFF;
		font-size: 24rpx;
		width: 330rpx;
		height: 200rpx;
		transform: skew(3deg, -3deg);
		top: 67%;
		left: 20%;
		z-index: 9;

		.url-cell {
			width: 100%;
			height: 135rpx;
			max-height: 150rpx;

			.url {
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}

		}

		.code {
			padding-left: 5rpx;
			width: 100%;
			height: 50rpx;
		}

		.hover-click {
			transform: scale(0.9, 0.9);
		}

	}
</style>
