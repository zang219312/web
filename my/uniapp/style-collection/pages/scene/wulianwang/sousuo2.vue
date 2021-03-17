<template>
	<view style="margin-top: 50%;">
		<view class="avatar"></view>
		<view class="inner"></view>
		<view class="inner outter"></view>
		<view class="inner outter1"></view>
		<view class="inner outter2"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss">

	.inner {
		width: 100rpx;
		height: 100rpx;
		background: #aabdaf;
		border-radius: 50%;
		position: fixed;
		left: 50%;
		margin-left: -50rpx;
		margin-top: 150rpx;
		z-index: 10;
		animation-duration: 2s;
		-webkit-animation-name: state1;
		animation-name: state1;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		opacity: 0;
	}

	@keyframes state1 {
		0% {
			opacity: .5;
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		100% {
			opacity: 0;
			-webkit-transform: scale(8);
			transform: scale(8);
		}
	}

	.avatar {
		position: fixed;
		left: 50%;
		margin-left: -40rpx;
		margin-top: 160rpx;
		border-radius: 100%;
		width: 80rpx;
		height: 80rpx;
		background-color: #a4b6a9;
		z-index: 11; 
	}

	.outter {
		animation-delay: 0.5s;
	}

	.outter1 {
		animation-delay: 1s;
	}

	.outter2 {
		animation-delay: 1.5s;
	}
</style>
