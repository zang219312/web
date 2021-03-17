<template>
	<view>
		<view class="circle-wrap">
			<view class="circle">
				<view class="big-circle"></view>
				<view class="small-circle"></view>
			</view>
		</view>
		<view class="test1"></view>
		<view class="test2"></view>
		<view class="test3"></view>
		<view class="comm-content">
			<soure :url="url"></soure>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.cnblogs.com/dustinsky/p/12721357.html'
			}
		},
		onLoad() {},

		methods: {


		}
	}
</script>

<style lang="scss">
	@keyframes twinkling {
		0% {
			opacity: 0.2;
			transform: scale(1);
		}

		50% {
			opacity: 0.5;
			transform: scale(1.12);
		}

		100% {
			opacity: 0.2;
			transform: scale(1);
		}
	}

	.circle-wrap {
		position: absolute;
		left: 80px;
		top: 120px;
	}

	.circle {
		position: relative;
		width: 100rpx;
		height: 100rpx;
	}

	.small-circle {
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
		background: #FF0033;
		position: absolute;
	}

	.big-circle {
		position: absolute;
		top: -25rpx;
		left: -25rpx;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #FF0033;
		animation: twinkling 1s infinite ease-in-out;
		animation-fill-mode: both;
	}

	@keyframes scale {
		0% {
			transform: scale(1)
		}

		50%,
		75% {
			transform: scale(3)
		}

		78%,
		100% {
			opacity: 0
		}
	}

	@keyframes scales {
		0% {
			transform: scale(1)
		}

		50%,
		75% {
			transform: scale(2)
		}

		78%,
		100% {
			opacity: 0
		}
	}


	.test1 {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		background-color: #aaaaff;
		border-radius: 50%;
		top: 150px;
		left: 250px;
	}

	.test1:before {
		content: '';
		display: block;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		opacity: .4;
		background-color: #aaaaff;
		animation: scale 1s infinite cubic-bezier(0, 0, .49, 1.02);
	}

	.test2 {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		opacity: .4;
		background-color: #aaaaff;
		top: 150px;
		left: 250px;
		animation: scales 1s infinite cubic-bezier(0, 0, .49, 1.02);
	}

	@keyframes scaless {
		0% {
			transform: scale(1)
		}

		50%,
		75% {
			transform: scale(3)
		}

		78%,
		100% {
			opacity: 0
		}
	}

	.test3 {
		position: absolute;
		width: 50px;
		height: 50px;
		background-color: #ffaa00;
		border-radius: 50%;
		top: 300px;
		left: 150px;
	}

	.test3:before {
		content: '';
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #ffaa00;
		animation: scaless 1s infinite cubic-bezier(0, 0, .49, 1.02);
	}
</style>
