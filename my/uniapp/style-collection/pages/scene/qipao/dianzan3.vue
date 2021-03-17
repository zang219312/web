<template>
	<view class="content">
		<peter-dianzan :count="count" :longPress="longPress"></peter-dianzan>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button class="dianzan" type="primary" size="mini" @click="zan" @longpress="longZan" @touchend="longZanEnd">点击或长按按钮</button>
		<view style="position: fixed;bottom: -15rpx;left: 10rpx;z-index: 1000;">
			<soure :url="url"></soure>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=3687',
				time: 0,
				count: 0,
				longPress: false
			}
		},
		onLoad() {

		},
		methods: {
			/**
			 * 单次点赞
			 */
			zan(e) {
				this.count++;
			},

			/**
			 * 长按点赞(满屏♥)
			 */
			longZan(e) {
				let self = this;
				if (e.type == 'longpress') {
					let time = setInterval(function() {
						self.count++;
						self.longPress = true;
					}, 100);
					this.time = time;
				}
			},

			/**
			 * 长按点赞结束
			 */
			longZanEnd(e) {
				clearInterval(this.time);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.dianzan {
		position: fixed;
		bottom: 30rpx;
	}
</style>
