<template>
	<view>
		<!--门磁动画-->
		<view class="gate-magnetism">
			<view class="left" :animation="animationData">
				<view class="icon"></view>
			</view>
			<view class="right" :animation="animationData2">
				<view class="icon"></view>
			</view>
		</view>
		<view class="comm-content">
			<button class="btn" @click="gateStart" size="mini">打开门磁</button>
			<button class="btn" @click="gateClose" size="mini">关闭门磁</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData: {},
				animationData2: {}
			}
		},
		onLoad(options) {
			this.animation = uni.createAnimation()
		},
		onUnload() {
			this.animationData = {}
			this.animationData2 = {}
		},
		methods: {

			//门磁关闭
			gateClose() {
				//门磁左边动画
				this.animation.translateX(0).step({
					duration: 500
				})
				this.animationData = this.animation.export()

				//门磁右边动画
				this.animation.translateX(0).step({
					duration: 500
				})
				this.animationData2 = this.animation.export()
			},

			//门磁开启
			gateStart() {
				//门磁左边动画
				this.animation.translateX(-40).step({
					duration: 500
				})
				this.animationData = this.animation.export()

				//门磁右边动画
				this.animation.translateX(40).step({
					duration: 500
				})
				this.animationData2 = this.animation.export()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.btn {
		width: 300rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.gate-magnetism {
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.left {
			position: relative;
			border-radius: 100rpx;
			background-color: #d1d2b5;
			width: 150rpx;
			height: 250rpx;
			box-shadow: inset 5px 5px 10px #aca8a0,
				inset -5px -5px 10px #e8e4d8;

			.icon {
				top: 110rpx;
				left: 120rpx;
				width: 10rpx;
				height: 10rpx;
				background-color: #ffffff;
				border-radius: 100%;
				position: absolute;
			}

		}

		.right {
			position: relative;
			margin-left: 20rpx;
			border-radius: 100rpx;
			background-color: #d1d2b5;
			width: 100rpx;
			height: 200rpx;
			box-shadow: inset -5px -5px 10px #aca8a0,
				inset 5px 5px 10px #e8e4d8;

			.icon {
				width: 8rpx;
				height: 8rpx;
				background-color: #ffffff;
				border-radius: 100%;
				position: absolute;
				top: 87rpx;
				left: 17rpx;
			}
		}
	}
</style>
