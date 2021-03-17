<template>
	<view>
		<view class="container">
			<view class="battery"></view>
		</view>
		<view style="padding-top: 100rpx;">
			<soure :url="url"></soure>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.baidu.com/link?url=NbQn-VBgzP85a6ME2mWyLrJGkE4C0I0VELk4DFVylbZvxYADjbVf-1lnk_oUZpneiwdGL0rNkITqs1SeZlF3N_&wd=&eqid=95c8cace0004d609000000065fd62e64'
			};
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="scss">
	.container {
		top: 100rpx;
		position: relative;
		width: 150rpx;
		margin: auto;
	}

	.battery {
		height: 220rpx;
		box-sizing: border-box;
		border-radius: 15rpx 15rpx 5rpx 5rpx;
		filter: drop-shadow(0 1rpx 3rpx rgba(0, 0, 0, 0.22));
		background: #fff;
		z-index: 1;

		&::before {
			content: "";
			position: absolute;
			width: 26rpx;
			height: 10rpx;
			left: 50%;
			top: 0;
			transform: translate(-50%, -10rpx);
			border-radius: 5rpx 5rpx 0 0;
			background: rgba(240, 240, 240, .88);
		}

		&::after {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 90%;
			background: linear-gradient(to bottom, #7abcff 0%, #00BCD4 44%, #2196F3 100%);
			border-radius: 0rpx 0rpx 5rpx 5rpx;
			box-shadow: 0 14rpx 28rpx rgba(33, 150, 243, 0), 0 10rpx 10rpx rgba(9, 188, 215, 0.08);
			animation: charging 6s linear infinite;
			filter: hue-rotate(90deg);
		}
	}

	@keyframes charging {
		50% {
			box-shadow: 0 14rpx 28rpx rgba(0, 150, 136, 0.83), 0rpx 4rpx 10rpx rgba(9, 188, 215, 0.4);
		}

		95% {
			top: 5%;
			filter: hue-rotate(0deg);
			border-radius: 0 0 5rpx 5rpx;
			box-shadow: 0 14rpx 28rpx rgba(4, 188, 213, .2), 0 10rpx 10rpx rgba(9, 188, 215, 0.08);
		}

		100% {
			top: 0%;
			filter: hue-rotate(0deg);
			border-radius: 15rpx 15rpx 5rpx 5rpx;
			box-shadow: 0 14rpx 28rpx rgba(4, 188, 213, 0), 0 10rpx 10rpx rgba(9, 188, 215, 0.4);
		}
	}
</style>
