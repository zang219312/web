<template>
	<view>niew</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #000000;
		width: 100%;
		height: 100%;
		overflow: hidden;
		filter: blur(3rpx) contrast(10);
	}

	view {
		position: relative;
		width: 640rpx;
		height: 200rpx;
		color: #fff;
		font-size: 100rpx;
		text-align: center;
		margin: 100rpx auto;
		border-bottom: 10rpx solid #fff;
		transform: skewY(5deg);

		&::before,
		&::after {
			position: absolute;
			content: "";
			bottom: -20rpx;
			left: 0;
			width: 10rpx;
			height: 20rpx;
			border-radius: 50%;
			background: #fff;
			transform: translate(0, 0);
			animation: move 7.5s ease-in-out infinite;
		}

		&::after {
			animation: move 7.5s ease-in-out 1s infinite;
		}
	}

	@keyframes move {
		80% {
			bottom: -30rpx;
			transform: translate(623rpx, 0);
		}

		93% {
			transform: translate(623rpx, 3rpx);
			opacity: 1;
		}

		100% {
			transform: translate(623rpx, 150rpx);
			opacity: 0;
		}
	}
</style>
