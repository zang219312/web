<template>
	<view>
		<view class="test1 comm-center">动态背景颜色</view>
		<view class="test2 comm-center">动态动画背景颜色</view>
		<view class="test3 comm-center">动态渐变背景颜色</view>
		<view class="test4 comm-center">动态渐变背景颜色2</view>
		<view class="test5 comm-center">逼真随机背景颜色</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.cnblogs.com/coco1s/p/6603403.html'
			};
		},
		onLoad() {},
		methods: {}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.test1 {
		position: relative;
		width: 600rpx;
		height: 200rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;
		background: linear-gradient(90deg, #ffc700 0%, #e91e1e 100%);
		animation: gradientChange1 3s infinite;
	}

	@keyframes gradientChange1 {
		100% {
			background: linear-gradient(90deg, #e91e1e 0%, #6f27b0 100%);
		}
	}

	.test2 {
		position: relative;
		width: 600rpx;
		height: 200rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;
		background: #ffc700;
		animation: gradientChange2 3s infinite alternate;
	}

	@keyframes gradientChange2 {
		100% {
			background: #e91e1e;
		}
	}

	.test3 {
		position: relative;
		width: 600rpx;
		height: 200rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;
		background: linear-gradient(90deg, #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
		background-size: 200% 100%;
		background-position: 0 0;
		animation: bgposition3 2s infinite linear alternate;
	}


	@keyframes bgposition3 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: 100% 0;
		}
	}

	.test4 {
		position: relative;
		width: 600rpx;
		height: 200rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;
		background: linear-gradient(90deg, #ffc700 0%, #e91e1e 33%, #6f27b0 66%, #00ff88 100%);
		background-position: 100% 0;
		animation: bgSize 5s infinite ease-in-out alternate;

	}

	@keyframes bgSize {
		0% {
			background-size: 300% 100%;
		}

		100% {
			background-size: 100% 100%;
		}
	}


	.test5 {
		position: relative;
		overflow: hidden;
		width: 600rpx;
		height: 200rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;

		&::before {
			content: "";
			position: absolute;
			top: -100%;
			left: -100%;
			bottom: -100%;
			right: -100%;
			background: linear-gradient(45deg, #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
			background-size: 100% 100%;
			animation: bgposition5 8s infinite linear alternate;
			z-index: -1;
		}
	}


	@keyframes bgposition5 {
		0% {
			transform: translate(30%, 30%);
		}

		25% {
			transform: translate(30%, -30%);
		}

		50% {
			transform: translate(-30%, -30%);
		}

		75% {
			transform: translate(-30%, 30%);
		}

		100% {
			transform: translate(30%, 30%);
		}
	}
</style>
