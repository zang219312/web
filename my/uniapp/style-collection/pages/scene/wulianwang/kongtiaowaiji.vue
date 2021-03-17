<template>
	<view>
		<view class="content-box">
			<image class="img" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/%E7%A9%BA%E8%B0%83%E5%A4%96%E6%9C%BA.png?sign=ec77cf5a7603e3a9a684290e0dac32a0&t=1605938190" />
			<image class="img2" :class="playing?'rotation':'rotation suspended'" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/%E6%89%87%E5%8F%B62.png?sign=5438077a5692ee528100f38f8dfa68ec&t=1608366314" />
		</view>
		<view class="comm-content" style="padding-top: 300rpx;">
			<button :disabled="playing?false:true" class="btn" @click="close" size="mini">关闭</button>
			<button :disabled="playing?true:false" class="btn" @click="open" size="mini">打开</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playing: true //可自行控制是否需要转动
			};
		},
		methods: {
			open() {
				this.playing = true
			},

			close() {
				this.playing = false
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.content-box {
		position: relative;
		top: 200rpx;
		display: flex;
		justify-content: center;

		.img {
			width: 300rpx;
			height: 200rpx;
		}

		.img2 {
			position: absolute;
			top: 33rpx;
			left: 260rpx;
			width: 120rpx;
			height: 120rpx;
		}
	}
	
	.btn {
		width: 300rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.rotation {
		-webkit-transform: rotate(360deg);
		animation: rotation 1s linear infinite;
	}

	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.suspended {
		animation-play-state: paused;
	}
</style>
