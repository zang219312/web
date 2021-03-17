<template>
	<view style="padding: 30rpx;">
		<view class="line-dashed"></view>
		<view class="line-dashed2">中间显示文字效果</view>
		<view class="line-solid"></view>
		<view class="line-double"></view>
		<view class="line-ridge"></view>
		<view class="line-groove"></view>
		<view class="line-dotted"></view>

		<view class="line-test1"></view>
		<view class="line-test2"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.line-dashed {
		height: 100rpx;
		border-top: 5rpx dashed #395dff;
	}

	.line-solid {
		height: 100rpx;
		border-top: 5rpx solid #9d9d9d;
	}

	.line-double {
		height: 100rpx;
		border-top: 10rpx double #109937;
	}

	.line-ridge {
		height: 100rpx;
		border-top: 10rpx ridge #45D6D8;
	}

	.line-groove {
		height: 100rpx;
		border-top: 15rpx groove #ffaaff;
	}

	.line-dotted {
		height: 100rpx;
		border-top: 10rpx dotted #ff9318;
	}

	.line-test1 {
		height: 5rpx;
		background: repeating-radial-gradient(#ffaa00, #ffaa00, #ff771c 10%);
	}

	.line-test2 {
		margin-top: 100rpx;
		height: 10rpx;
		background: linear-gradient(60deg, #95aeff, #aad7ec);
	}

	.line-dashed2 {
		width: 100%;
		margin-bottom: 100rpx;
		align-self: center;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.line-dashed2:before {
		content: "";
		margin-right: 20rpx;
		height: 1px;
		border: none;
		border-top: 1px dashed #395dff;
		flex: 1 1 0rpx;
	}

	.line-dashed2::after {
		content: "";
		margin-left: 20rpx;
		height: 1px;
		border: none;
		border-top: 1px dashed #395dff;
		flex: 1 1 0rpx;
	}
</style>
