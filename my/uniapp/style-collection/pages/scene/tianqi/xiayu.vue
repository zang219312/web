<template>
	<view>
		<view class="rainy"></view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'http://www.javanx.cn/20190221/css-rain/'
			}
		},
		onLoad() {
		},
		methods: {

		}
	}
</script>

<style>
	.rainy {
		position: absolute;
		width: 3rpx;
		height: 6rpx;
		top: 30%;
		left: 50%;
		animation: rainy_rain .7s infinite linear;
	}

	.rainy:before {
		content: "";
		color: #333;
		position: absolute;
		height: 50rpx;
		width: 50rpx;
		top: 30rpx;
		left: -40rpx;
		background: #CCC;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		box-shadow: #CCC 65rpx -15rpx 0 -5rpx,
			#CCC 25rpx -25rpx,
			#CCC 30rpx 10rpx,
			#CCC 60rpx 15rpx 0 -10rpx,
			#CCC 85rpx 5rpx 0 -5rpx;
		animation: cloudy 5s ease-in-out infinite;
	}

	.rainy:after {
		content: "";
		position: absolute;
		top: 120rpx;
		left: 50%;
		height: 15rpx;
		width: 120rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		animation: cloudy_shadow 5s ease-in-out infinite;
	}

	@keyframes cloudy_shadow {
		50% {
			transform: translate(-50%, -50%) scale(0.8);
			background: rgba(0, 0, 0, .2);
		}

		100% {
			transform: translate(-50%, -50%) scale(1);
			background: rgba(0, 0, 0, .5);
		}
	}

	@keyframes cloudy {
		50% {
			transform: translate(-50%, -70%);
		}

		100% {
			transform: translate(-50%, -50%);
		}
	}


	@keyframes rainy_rain {
		0% {
			box-shadow:
				rgba(0, 0, 0, 0) -10rpx 30rpx,
				rgba(0, 0, 0, 0) 40rpx 40rpx,
				rgba(0, 0, 0, .3) -50rpx 75rpx,
				rgba(0, 0, 0, .3) 55rpx 50rpx,
				rgba(0, 0, 0, .3) -18rpx 100rpx,
				rgba(0, 0, 0, .3) 12rpx 95rpx,
				rgba(0, 0, 0, .3) -31rpx 45rpx,
				rgba(0, 0, 0, .3) 30rpx 35rpx;
		}

		25% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 45rpx,
				rgba(0, 0, 0, .3) 40rpx 60rpx,
				rgba(0, 0, 0, .3) -50rpx 90rpx,
				rgba(0, 0, 0, .3) 55rpx 65rpx,
				rgba(0, 0, 0, 0) -18rpx 120rpx,
				rgba(0, 0, 0, 0) 12rpx 120rpx,
				rgba(0, 0, 0, .3) -31rpx 70rpx,
				rgba(0, 0, 0, .3) 30rpx 60rpx;
		}

		26% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 45rpx,
				rgba(0, 0, 0, .3) 40rpx 60rpx,
				rgba(0, 0, 0, .3) -50rpx 90rpx,
				rgba(0, 0, 0, .3) 55rpx 65rpx,
				rgba(0, 0, 0, 0) -18rpx 40rpx,
				rgba(0, 0, 0, 0) 12rpx 20rpx,
				rgba(0, 0, 0, .3) -31rpx 70rpx,
				rgba(0, 0, 0, .3) 30rpx 60rpx;
		}

		50% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 70rpx,
				rgba(0, 0, 0, .3) 40rpx 80rpx,
				rgba(0, 0, 0, 0) -50rpx 100rpx,
				rgba(0, 0, 0, .3) 55rpx 80rpx,
				rgba(0, 0, 0, .3) -18rpx 60rpx,
				rgba(0, 0, 0, .3) 12rpx 45rpx,
				rgba(0, 0, 0, .3) -31rpx 95rpx,
				rgba(0, 0, 0, .3) 30rpx 85rpx;
		}

		51% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 70rpx,
				rgba(0, 0, 0, .3) 40rpx 80rpx,
				rgba(0, 0, 0, 0) -50rpx 45rpx,
				rgba(0, 0, 0, .3) 55rpx 80rpx,
				rgba(0, 0, 0, .3) -18rpx 60rpx,
				rgba(0, 0, 0, .3) 12rpx 45rpx,
				rgba(0, 0, 0, .3) -31rpx 95rpx,
				rgba(0, 0, 0, .3) 30rpx 85rpx;
		}

		75% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 95rpx,
				rgba(0, 0, 0, .3) 40rpx 100rpx,
				rgba(0, 0, 0, .3) -50rpx 60rpx,
				rgba(0, 0, 0, 0) 55rpx 95rpx,
				rgba(0, 0, 0, .3) -18rpx 80rpx,
				rgba(0, 0, 0, .3) 12rpx 70rpx,
				rgba(0, 0, 0, 0) -31rpx 120rpx,
				rgba(0, 0, 0, 0) 30rpx 110rpx;
		}

		76% {
			box-shadow:
				rgba(0, 0, 0, .3) -10rpx 95rpx,
				rgba(0, 0, 0, .3) 40rpx 100rpx,
				rgba(0, 0, 0, .3) -50rpx 60rpx,
				rgba(0, 0, 0, 0) 55rpx 35rpx,
				rgba(0, 0, 0, .3) -18rpx 80rpx,
				rgba(0, 0, 0, .3) 12rpx 70rpx,
				rgba(0, 0, 0, 0) -31rpx 25rpx,
				rgba(0, 0, 0, 0) 30rpx 15rpx;
		}

		100% {
			box-shadow:
				rgba(0, 0, 0, 0) -10rpx 120rpx,
				rgba(0, 0, 0, 0) 40rpx 120rpx,
				rgba(0, 0, 0, .3) -50rpx 75rpx,
				rgba(0, 0, 0, .3) 55rpx 50rpx,
				rgba(0, 0, 0, .3) -18rpx 100rpx,
				rgba(0, 0, 0, .3) 12rpx 95rpx,
				rgba(0, 0, 0, .3) -31rpx 45rpx,
				rgba(0, 0, 0, .3) 30rpx 35rpx;
		}
	}
</style>
