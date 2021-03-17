<template>
	<view class="loading">
		<view class="box">
			<view class="action">
				<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/%E6%9F%A5%E8%AF%A2.png?sign=46e342b1619d1afbec1e1d06d49e2838&t=1605079936" />
				<view class="children-view"></view>
				<view class="children-view"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				widthScreen: null,
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	@keyframes action {
		0% {
			top: 300rpx;
			left: 300rpx;
			width: 0;
			height: 0;
			opacity: 1;
		}

		100% {
			top: 50rpx;
			left: 50rpx;
			width: 500rpx;
			height: 500rpx;
			opacity: 0;
		}
	}

	.loading {
		position: fixed;
		top: 300rpx;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading .box {
		width: 600rpx;
		height: 600rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.loading .box .action image {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		top: 260rpx;
		left: 260rpx;
		z-index: 10;
	}

	.loading .box .action .children-view {
		position: absolute;
		border: 10rpx solid #d3d0ce;
		border-radius: 50%;
		opacity: 1;
		animation: action 1.69491525s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.loading .box .action .children-view:nth-child(2) {
		animation-delay: -0.84745763s;
	}
</style>
