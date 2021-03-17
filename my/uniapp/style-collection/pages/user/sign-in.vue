<template>
	<view class="container">
		<image class="bg" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%83%8C%E6%99%AF/%E7%AD%BE%E5%88%B0%E8%83%8C%E6%99%AF.jpg?sign=f6f228ec393b049d9d8919e3f7262800&t=1610781231"></image>
		<view class="sign-in-btn" :class="signInBtn?'':'no-sign-in'" @click="$util.limitClick(signIn)">{{signInBtn?'签到':'已签到'}}</view>
		<view class="days">
			<text>{{count}}</text>
		</view>
		<view class="receive" v-if="count>=30?true:false" @click="receiveClick">领取福利</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				signInBtn: false,
				openid: '',
			}
		},
		onLoad() {
			this.openid = uni.getStorageSync('openid')
			this.queryTodaySignIn();
			this.querySignInCount();
		},
		methods: {
			//查询签到总数
			querySignInCount() {
				const db = wx.cloud.database()
				db.collection('sign-in').where({
					_openid: this.openid
				}).count().then(res => {
					this.count = res.total
				})
			},

			//查询今日签到记录
			queryTodaySignIn() {
				this.$request.whereQuery('sign-in', {
					_openid: this.openid,
					create_date: this.$util.getDates()
				}, 20, 0, [], false).then(res => {
					this.signInBtn = res.length > 0 ? false : true
				})
			},

			//签到
			signIn() {
				uni.showLoading({
					title: '签到中',
					mask: true
				})
				this.$request.add('sign-in', {
					create_date: this.$util.getDates(),
					create_time: this.$util.getTime()
				}, false).then(res => {
					uni.hideLoading();
					if (res.errMsg == 'collection.add:ok') {
						this.$util.tip("签到成功", 'success')
						this.signInBtn = false
						this.querySignInCount();
					}
				})
			},

			//领取福利
			receiveClick() {
				uni.navigateTo({
					url: '/pages/user/project'
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

	.sign-in-btn {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 50%;
		left: 39%;
		width: 150rpx;
		height: 60rpx;
		background-color: #f48f1e;
		color: #FFFFFF;
		font-size: 30rpx;
		border-radius: 50rpx;
		box-shadow: 0 4rpx 5rpx 5rpx #b07200;

	}

	.days {
		position: fixed;
		top: 30.5%;
		left: 43%;
		width: 100rpx;
		height: 70rpx;
		font-size: 50rpx;
		font-weight: bold;

		text {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.receive {
		position: fixed;
		top: 40.5%;
		left: 41%;
		width: 150rpx;
		height: 70rpx;
		font-size: 32rpx;
		color: #007AFF;
		font-weight: bold;
	}


	.no-sign-in {
		pointer-events: none;
		background-color: #cfcfcf;
		box-shadow: 0 4rpx 5rpx 5rpx #b5b5b5;
	}
</style>
