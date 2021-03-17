<template>
	<view class="box">
		<view class="copy" @click="copyUrl">复制出处地址</view>
	</view>
</template>

<script>
	export default {
		name: "sourceUrl",
		// 属性
		props: {
			url: {
				type: String, // 属性类型
				default: "" // 默认值
			}
		},
		methods: {
			async copyUrl() {
				uni.setClipboardData({
					data: this.url
				})
			}
		}
	}
</script>
<style lang="scss">
	.box {
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.copy {
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffaa7f;
			font-size: 24rpx;
			width: 200rpx;
			padding: 10rpx 20rpx;
			color: #FFFFFF;
			height: 30rpx;
			border-radius: 10rpx;
		}
	}
</style>
