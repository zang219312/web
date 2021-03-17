<template>
	<view>
		<view class="region">
			<button open-type="contact">联系作者</button>
			<view style="font-size: 28rpx;color: #007AFF;" @click="copy">邮箱：{{email}}</view>
			<view style="color: #999999;">小程序版本号: v 1.0.13</view>
		</view>
		<view style="padding: 0 20rpx;">
			<ad unit-id="adunit-09d39019966a02db"></ad>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '1228742150@qq.com'
			}
		},
		onLoad() {},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.email
				});
			}
		}
	}
</script>

<style lang="scss">
	.region {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		width: 100%;
		height: 300rpx;

		button {
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 70rpx;
			width: 80%;
		}

		view {
			display: flex;
			justify-content: center;
			line-height: 80rpx;
			font-size: 26rpx;
		}
	}
</style>
