<template>
	<view class="comm-content">
		<view class="radar"></view>
		<soure :url="url" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://segmentfault.com/q/1010000018981928'
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.radar {
		margin-top: 50rpx;
		background: -webkit-radial-gradient(center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%), -webkit-repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, #20ff4d 18.6%, rgba(32, 255, 77, 0) 18.9%), -webkit-linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(32, 255, 77, 0) 50.2%), -webkit-linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(32, 255, 77, 0) 50.2%);
		width: 75vw;
		height: 75vw;
		max-height: 75vh;
		max-width: 75vh;
		position: relative;
		top: 50%;
		border-radius: 50%;
		border: 1rpx solid #20ff4d;
		overflow: hidden;
	}

	.radar:after {
		content: ' ';
		display: block;
		background-image: linear-gradient(44deg, rgba(0, 255, 51, 0) 50%, #00ff33 100%);
		width: 50%;
		height: 50%;
		position: absolute;
		top: 0;
		left: 0;
		animation: radar-beam 5s infinite;
		animation-timing-function: linear;
		transform-origin: bottom right;
		border-radius: 100% 0 0 0;
	}

	@keyframes radar-beam {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
