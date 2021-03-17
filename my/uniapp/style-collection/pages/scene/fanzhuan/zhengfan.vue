<template>
	<view>
		<view class='main'>
			<!--正面-->
			<view class="box one" :animation="animationMain" @click='rotateFn(1)'>
				<image src="/static/other/10.png"></image>
			</view>
			<!--反面-->
			<view class="box two" :animation="animationBack" @click='rotateFn(2)'>
				<image src="/static/other/3.png"></image>
			</view>
		</view>
		<view class="comm-content" style="line-height: 100rpx;">点击图片看效果</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationMain: null, //正
				animationBack: null, //反
			};
		},
		methods: {

			rotateFn(e) {
				this.animation_main = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear'
				})
				this.animation_back = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear'
				})
				// 点击正面
				if (e == 1) {
					this.animation_main.rotateY(180).step()
					this.animation_back.rotateY(0).step()
					this.animationMain = this.animation_main.export()
					this.animationBack = this.animation_back.export()
				} else {
					this.animation_main.rotateY(0).step()
					this.animation_back.rotateY(-180).step()
					this.animationMain = this.animation_main.export()
					this.animationBack = this.animation_back.export()
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.main {
		position: absolute;
		top: 30%;
		left: 50%;
		width: 400rpx;
		height: 400rpx;
		transform: translate(-50%, -50%);
		-webkit-perspective: 1000;
		-moz-perspective: 1000;
	}

	.box {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		width: 400rpx;
		height: 400rpx;
		transition: all 1s;
		backface-visibility: hidden;
		cursor: pointer;
		border-radius: 10rpx;

		image {
			width: 150rpx;
			height: 150rpx;
		}

		text {
			text-align: center;
			font-size: 30rpx;
		}
	}

	.one {
		background-color: #bfb097;
	}

	.two {
		background-color: #b8deff;
		transform: rotateY(-180deg);
	}
</style>
