<template>
	<view class="recode-box">
		<view class="recode" @touchstart='touchstart' @touchend='touchend'>
			<text>长按</text>
			<view class="ripple"></view>
			<view class="ripple" :class="animationStatus?'animation1':''"></view>
			<view class="ripple" :class="animationStatus?'animation2':''"></view>
			<view class="ripple" :class="animationStatus?'animation3':''"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationStatus: false
			}
		},
		onLoad() {

		},
		methods: {
			touchend() {
				this.animationStatus = false
			},
			touchstart() {
				this.animationStatus = true
			}
		}
	}
</script>

<style>
	.recode-box {
		padding-top: 500rpx;
		text-align: center;
		box-sizing: border-box;
	}

	.recode-box .recode {
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		background: #aaaaff;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		line-height: 200rpx;
		position: relative;
	}

	.ripple {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		border: 5rpx solid #f0ebc8;
	}

	.animation1 {
		animation: ripple 1s infinite linear;
	}

	.animation2 {
		animation: ripple 1s infinite linear;
		animation-delay: 0.3s;
	}

	.animation3 {
		animation: ripple 1s infinite linear;
		animation-delay: 0.6s;
	}

	@keyframes ripple {
		from {
			opacity: 1;
			transform: scale(1, 1)
		}

		to {
			opacity: 0;
			transform: scale(2, 2)
		}
	}
</style>
