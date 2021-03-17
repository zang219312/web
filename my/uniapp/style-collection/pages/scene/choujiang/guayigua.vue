<template>
	<view>
		<view class="scratch">
			<view class="box">
				<!-- 刮奖结果-->
				<view class="result">
					<text>iPhone12一台</text>
				</view>
				<!-- 刮奖canvas容器 -->
				<canvas class="canvas-box" canvas-id="canvas-id" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
			</view>
			<view class="tip">刮一刮</view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	import scratch from '@/util/scratch.js'
	export default {
		data() {
			return {
				url: 'https://blog.csdn.net/qq_40101922/article/details/102463778',
				scratchWidth: 350, // 绘制刮奖范围宽
				scratchHeight: 150, // 绘制刮奖范围高
				scratchSize: 10, // 触手大小
				scratchScale: 0.30, // 需刮开百分比
			}
		},
		onLoad() {
			this.initCanvas();
		},
		methods: {
			initCanvas() {
				// 刮奖初始化信息必须在onReady后，不然h5不支持（小程序可在onLoad执行）
				new scratch(this, {
					canvasId: 'canvas-id',
					width: this.scratchWidth,
					height: this.scratchHeight,
					size: this.scratchSize,
					scale: this.scratchScale
				})
			}
		}
	}
</script>

<style lang="scss">
	.scratch {
		width: 600rpx;
		height: 300rpx;
		// background: url($baseImgUrl+"luck-draw-guajiang.png") no-repeat;
		background-size: contain;
		margin: 400rpx 75rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		.box {
			width: 100%;
			height: 100%;
			background: #aaaa7f;
			border-radius: 10rpx;
			position: relative;
			overflow: hidden;

			.result {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 50rpx;
				color: #FFFFFF;
			}

			.canvas-box {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				overflow: hidden;
			}
		}

		.tip {
			position: fixed;
			text-align: center;
			top: 300rpx;
			left: 300rpx;
			width: 150rpx;
			font-size: 40rpx;
			font-weight: bold;
			z-index: 999;
		}
	}
</style>
