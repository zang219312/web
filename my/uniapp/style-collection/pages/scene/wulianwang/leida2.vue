<template>
	<view>
		<!--搜索动画-->
		<view class="comm-content">
			<view class="radar"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	
	.radar {
		margin-top: 50rpx;
		background: -webkit-radial-gradient(center,
			rgba(255, 0, 0, 1.0) 0%, rgba(32, 255, 77, 0) 2%),
			-webkit-repeating-radial-gradient(rgba(122, 99, 255, 0.0) 1%,
			rgba(32, 255, 77, 0) 18%, #12C98A 18.6%,
			rgba(32, 255, 77, 0) 18.9%);
		width: 75vw;
		height: 75vw;
		max-height: 75vh;
		max-width: 75vh;
		position: relative;
		border-radius: 50%;
		border: 1rpx solid #12C98A;
		overflow: hidden;
	}

	.radar:after {
		content: ' ';
		display: block;
		background-image: linear-gradient(45deg, rgba(0, 255, 51, 0) 50%, #12C98A 100%);
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
